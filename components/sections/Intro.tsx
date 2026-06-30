import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';

export default function Intro() {
  const t = useTranslations('Intro');

  return (
    <section className="bg-white">
      <div className="section-container py-20">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <Eyebrow index="01">{t('eyebrow')}</Eyebrow>
            <h2 className="font-display text-[clamp(26px,4vw,40px)] font-extrabold leading-tight text-balance">
              {t('title')}
            </h2>
          </div>
          <p className="text-[17px] leading-relaxed text-ink-soft">{t('body')}</p>
        </div>
      </div>
    </section>
  );
}
