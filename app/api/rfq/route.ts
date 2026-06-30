import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { Resend } from 'resend';
import { rfqSchema, isAllowedFile, escapeHtml } from '@/lib/rfq';
import { site } from '@/lib/site';

export const runtime = 'nodejs';

const TO = process.env.RFQ_TO_EMAIL || site.email;
const FROM = process.env.RFQ_FROM_EMAIL || 'website@metalparts.bg';

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_form' }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields; humans never see it.
  if (String(form.get('company_website') || '').trim() !== '') {
    // Pretend success so bots get no signal.
    return NextResponse.json({ ok: true, delivered: false });
  }

  const parsed = rfqSchema.safeParse({
    name: form.get('name'),
    company: form.get('company') ?? '',
    email: form.get('email'),
    phone: form.get('phone') ?? '',
    interest: form.get('interest') ?? '',
    message: form.get('message'),
    locale: form.get('locale') ?? 'bg',
  });

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 });
  }
  const data = parsed.data;

  // Optional file → Vercel Blob. We email the link, never the raw attachment.
  let fileUrl: string | null = null;
  let fileName: string | null = null;
  const file = form.get('file');
  if (file instanceof File && file.size > 0) {
    if (!isAllowedFile(file.name, file.size)) {
      return NextResponse.json({ ok: false, error: 'file' }, { status: 422 });
    }
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const blob = await put(`rfq/${Date.now()}-${safe}`, file, {
          access: 'public',
          addRandomSuffix: true,
        });
        fileUrl = blob.url;
        fileName = file.name;
      } catch (err) {
        console.error('[rfq] blob upload failed:', err);
        return NextResponse.json({ ok: false, error: 'upload' }, { status: 502 });
      }
    } else {
      console.warn('[rfq] BLOB_READ_WRITE_TOKEN not set — skipping upload.');
    }
  }

  // If Resend isn't configured (e.g. local dev), accept the submission but
  // report it wasn't delivered so the UI can still be exercised.
  if (!process.env.RESEND_API_KEY) {
    console.warn('[rfq] RESEND_API_KEY not set — submission not emailed.', {
      ...data,
      fileUrl,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const rows: [string, string][] = [
    ['Name', data.name],
    ['Company', data.company || '—'],
    ['Email', data.email],
    ['Phone', data.phone || '—'],
    ['Interest', data.interest || '—'],
    ['Locale', data.locale],
  ];
  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#8A949A;font-size:13px;">${k}</td><td style="padding:6px 0;font-weight:600;">${escapeHtml(v)}</td></tr>`,
    )
    .join('');
  const fileBlock = fileUrl
    ? `<p style="margin:16px 0 0;"><a href="${fileUrl}" style="color:#E00000;font-weight:600;">📎 ${escapeHtml(fileName || 'Attachment')}</a></p>`
    : '<p style="margin:16px 0 0;color:#8A949A;">No file attached.</p>';

  const companyHtml = `
    <div style="font-family:Arial,sans-serif;color:#15181B;max-width:560px;">
      <h2 style="font-size:18px;margin:0 0 14px;">New RFQ from the website</h2>
      <table style="border-collapse:collapse;">${tableRows}</table>
      <p style="margin:18px 0 6px;color:#8A949A;font-size:13px;">Message</p>
      <p style="white-space:pre-wrap;line-height:1.6;margin:0;">${escapeHtml(data.message)}</p>
      ${fileBlock}
    </div>`;

  const isBg = data.locale === 'bg';
  const autoSubject = isBg
    ? 'Получихме вашето запитване — Metal Parts Bulgaria'
    : 'We received your inquiry — Metal Parts Bulgaria';
  const autoHtml = `
    <div style="font-family:Arial,sans-serif;color:#15181B;max-width:560px;line-height:1.6;">
      <p>${isBg ? 'Здравейте' : 'Hello'} ${escapeHtml(data.name)},</p>
      <p>${
        isBg
          ? 'Благодарим за запитването! Получихме съобщението ви и нашият екип ще се свърже с вас в рамките на един работен ден.'
          : 'Thank you for your inquiry! We have received your message and our team will get back to you within one business day.'
      }</p>
      <p style="color:#8A949A;font-size:13px;">${site.name} · ${site.email} · ${site.phone}</p>
    </div>`;

  try {
    await resend.emails.send({
      from: `${site.name} <${FROM}>`,
      to: TO,
      replyTo: data.email,
      subject: `RFQ · ${data.name}${data.company ? ` (${data.company})` : ''}`,
      html: companyHtml,
    });

    await resend.emails.send({
      from: `${site.name} <${FROM}>`,
      to: data.email,
      subject: autoSubject,
      html: autoHtml,
    });
  } catch (err) {
    console.error('[rfq] resend send failed:', err);
    return NextResponse.json({ ok: false, error: 'email' }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
