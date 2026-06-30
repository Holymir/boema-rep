import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { site } from '@/lib/site';

export default function CtaBand() {
  const t = useTranslations('Cta');

  return (
    <section className="bg-red">
      <div className="section-container flex flex-wrap items-center justify-between gap-10 py-16">
        <div className="max-w-2xl">
          <h2 className="font-display text-[clamp(26px,4vw,38px)] font-black leading-tight text-white text-balance">
            {t('title')}
          </h2>
          <p className="mt-3 text-[17px] leading-relaxed text-white/85">{t('subtitle')}</p>
        </div>
        <div className="flex flex-wrap gap-3.5">
          <Link
            href="/contact"
            className="bg-white px-8 py-4 font-display text-[15px] font-extrabold uppercase tracking-wide text-red transition-colors hover:bg-ink hover:text-white"
          >
            {t('button1')}
          </Link>
          <a
            href={site.phoneHref}
            className="border border-white/50 px-8 py-4 font-display text-[15px] font-bold uppercase tracking-wide text-white transition-colors hover:border-white"
          >
            {t('button2')}
          </a>
        </div>
      </div>
    </section>
  );
}
