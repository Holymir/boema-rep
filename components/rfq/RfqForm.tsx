'use client';

import { useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

const ACCEPT = '.step,.stp,.xt,.pdf,.jpg,.jpeg';
const ALLOWED_EXT = ['step', 'stp', 'xt', 'pdf', 'jpg', 'jpeg'];
const MAX_BYTES = 20 * 1024 * 1024; // 20 MB

type Status = 'idle' | 'sending' | 'sent' | 'error';

const inputClass =
  'w-full border border-steel-200 bg-white px-3.5 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-steel-400 focus:border-red';
const labelClass =
  'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-steel-600';

export default function RfqForm() {
  const t = useTranslations('Rfq');
  const locale = useLocale();
  const options = t.raw('interestOptions') as string[];
  const formRef = useRef<HTMLFormElement>(null);

  const [status, setStatus] = useState<Status>('idle');
  const [errorKey, setErrorKey] = useState<'errorRequired' | 'errorFile' | 'errorServer' | null>(
    null,
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    const file = data.get('file') as File | null;

    if (!name || !/.+@.+\..+/.test(email) || !message) {
      setErrorKey('errorRequired');
      setStatus('error');
      return;
    }

    if (file && file.size > 0) {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      if (!ALLOWED_EXT.includes(ext) || file.size > MAX_BYTES) {
        setErrorKey('errorFile');
        setStatus('error');
        return;
      }
    }

    data.set('locale', locale);
    setStatus('sending');
    setErrorKey(null);

    try {
      const res = await fetch('/api/rfq', { method: 'POST', body: data });
      if (!res.ok) throw new Error('request failed');
      setStatus('sent');
      form.reset();
    } catch {
      setErrorKey('errorServer');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="border border-steel-100 bg-steel-50 p-10">
        <div className="mb-5 flex h-14 w-14 items-center justify-center bg-red text-2xl font-extrabold text-white">
          ✓
        </div>
        <h2 className="font-display text-[28px] font-extrabold">{t('sentTitle')}</h2>
        <p className="mt-3 max-w-md text-base leading-relaxed text-ink-soft">{t('sentBody')}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 bg-ink px-6 py-3.5 font-display text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-red"
        >
          {t('sentButton')}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      {/* Honeypot — must stay empty; hidden from real users. */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="rfq-name">
            {t('name')} *
          </label>
          <input id="rfq-name" name="name" className={inputClass} placeholder={t('namePlaceholder')} />
        </div>
        <div>
          <label className={labelClass} htmlFor="rfq-company">
            {t('company')}
          </label>
          <input
            id="rfq-company"
            name="company"
            className={inputClass}
            placeholder={t('companyPlaceholder')}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="rfq-email">
            {t('email')} *
          </label>
          <input
            id="rfq-email"
            name="email"
            type="email"
            className={inputClass}
            placeholder={t('emailPlaceholder')}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="rfq-phone">
            {t('phone')}
          </label>
          <input
            id="rfq-phone"
            name="phone"
            className={inputClass}
            placeholder={t('phonePlaceholder')}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="rfq-interest">
          {t('interest')}
        </label>
        <select id="rfq-interest" name="interest" className={inputClass} defaultValue="">
          <option value="" disabled>
            —
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="rfq-message">
          {t('message')} *
        </label>
        <textarea
          id="rfq-message"
          name="message"
          rows={5}
          className={`${inputClass} resize-y leading-relaxed`}
          placeholder={t('messagePlaceholder')}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="rfq-file">
          {t('file')}
        </label>
        <input
          id="rfq-file"
          name="file"
          type="file"
          accept={ACCEPT}
          className="block w-full text-sm text-steel-600 file:mr-4 file:border-0 file:bg-ink file:px-4 file:py-2.5 file:font-display file:text-xs file:font-bold file:uppercase file:tracking-wide file:text-white hover:file:bg-red"
        />
        <p className="mt-1.5 text-xs text-steel-500">{t('fileHint')}</p>
      </div>

      {status === 'error' && errorKey && (
        <div className="border border-red/30 bg-red/5 px-4 py-3 text-sm font-medium text-red-dark">
          {t(errorKey)}
        </div>
      )}

      <div className="mt-1 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-red px-8 py-4 font-display text-[15px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-dark disabled:opacity-60"
        >
          {status === 'sending' ? t('sending') : t('submit')}
        </button>
        <span className="text-[12.5px] text-steel-500">{t('privacyNote')}</span>
      </div>
    </form>
  );
}
