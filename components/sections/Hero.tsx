import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { site } from '@/lib/site';

export default function Hero() {
  const t = useTranslations('Hero');
  const nav = useTranslations('Nav');
  const stats = t.raw('stats') as { value: string; label: string }[];

  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Video/drone background slot — swap poster for real footage when delivered. */}
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover opacity-55"
          poster="/assets/hero.png"
          autoPlay
          muted
          loop
          playsInline
          aria-label={t('videoAlt')}
        >
          {/* <source src="/assets/hero-video.mp4" type="video/mp4" /> */}
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />

      <div className="section-container relative py-16 sm:py-24">
        <div className="max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-3 border border-ink-soft px-4 py-2.5">
            <span className="h-[7px] w-[7px] bg-red" />
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-steel-300">
              {t('badge')}
            </span>
          </div>
          <h1 className="font-display text-[clamp(34px,7vw,64px)] font-black leading-[0.98] tracking-tight text-white text-balance">
            {t('title')}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-300">
            {t('subtitle')}
          </p>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <Link
              href="/contact"
              className="bg-red px-7 py-4 font-display text-[15px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-dark"
            >
              {t('cta1')}
            </Link>
            <Link
              href="/products"
              className="border border-ink-soft px-7 py-4 font-display text-[15px] font-bold uppercase tracking-wide text-white transition-colors hover:border-white"
            >
              {nav('products')}
            </Link>
          </div>
        </div>
      </div>

      {/* stat strip */}
      <div className="relative border-t border-ink-soft/60 bg-black/40">
        <div className="section-container grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="border-steel-600/30 px-2 py-6 [&:not(:last-child)]:border-r"
            >
              <div className="font-display text-[clamp(20px,3vw,30px)] font-extrabold leading-none text-white">
                {s.value}
              </div>
              <div className="mt-2 text-[12.5px] tracking-wide text-steel-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">
        {site.name} — {site.partner.name}
      </span>
    </section>
  );
}
