import { useTranslations } from 'next-intl';

/**
 * Editable legal stub. When the CMS supplies `body` (plain text or an array of
 * paragraph strings) it is rendered; otherwise the stub notice is shown. Rich
 * portable-text rendering can be added once the supplied legal copy arrives.
 */
export default function LegalPage({
  title,
  body,
}: {
  title: string;
  body?: string | string[] | null;
}) {
  const t = useTranslations('Legal');
  const paragraphs = Array.isArray(body) ? body : body ? [body] : [];

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8">
        <h1 className="font-display text-[clamp(28px,5vw,44px)] font-black leading-tight">
          {title}
        </h1>
        <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-ink-soft">
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <p className="border-l-2 border-red bg-steel-50 px-5 py-4 text-sm text-steel-600">
              {t('stubNotice')}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
