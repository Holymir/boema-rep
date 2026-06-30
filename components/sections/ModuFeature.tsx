import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Eyebrow from '@/components/ui/Eyebrow';

export default function ModuFeature() {
  const t = useTranslations('Modu');
  const points = t.raw('points') as string[];

  return (
    <section id="solutions" className="scroll-mt-28 bg-steel-50">
      <div className="section-container grid grid-cols-1 px-0 md:grid-cols-2">
        <div
          className="min-h-[320px] bg-ink bg-cover bg-center md:min-h-[520px]"
          style={{ backgroundImage: "url('/assets/modu.png')" }}
          role="img"
          aria-label="Modu-System"
        />
        <div className="px-6 py-14 sm:px-12 lg:px-16">
          <Eyebrow index="06">{t('eyebrow')}</Eyebrow>
          <h2 className="font-display text-[clamp(26px,4vw,42px)] font-extrabold leading-[1.03] text-balance">
            {t('title')}
          </h2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-ink-soft">{t('body')}</p>
          <ul className="mt-8 flex flex-col gap-3.5">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3.5 text-[15px] leading-snug text-ink">
                <span className="mt-0.5 flex h-[18px] w-[18px] flex-none items-center justify-center bg-red text-[11px] font-extrabold text-white">
                  ✓
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="mt-9 inline-block bg-ink px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-red"
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
