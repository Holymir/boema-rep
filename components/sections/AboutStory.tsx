import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';

export default function AboutStory() {
  const t = useTranslations('About');
  const stats = t.raw('stats') as { value: string; label: string }[];

  return (
    <section className="bg-white">
      <div className="section-container py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div
            className="min-h-[320px] bg-ink bg-cover bg-center md:min-h-[440px]"
            style={{ backgroundImage: "url('/assets/workplace.png')" }}
            role="img"
            aria-label="MPB"
          />
          <div>
            <Eyebrow index="01">{t('storyEyebrow')}</Eyebrow>
            <h2 className="font-display text-[clamp(26px,4vw,40px)] font-extrabold leading-tight text-balance">
              {t('storyTitle')}
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-ink-soft">{t('storyP1')}</p>
            <p className="mt-4 text-[16.5px] leading-relaxed text-ink-soft">{t('storyP2')}</p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px border border-steel-100 bg-steel-100 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white p-7">
              <div className="font-display text-[clamp(22px,3vw,32px)] font-black leading-none text-red">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-steel-600">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
