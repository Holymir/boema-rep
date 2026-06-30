import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';

export default function Industries() {
  const t = useTranslations('Industries');
  const items = t.raw('items') as string[];

  return (
    <section id="industries" className="scroll-mt-28 bg-ink text-white">
      <div className="section-container py-20">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <Eyebrow index="07" dark>
              {t('eyebrow')}
            </Eyebrow>
            <h2 className="font-display text-[clamp(24px,3.5vw,34px)] font-extrabold leading-tight text-white">
              {t('title')}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-px border border-ink-soft bg-ink-soft sm:grid-cols-3">
            {items.map((i) => (
              <div
                key={i}
                className="flex min-h-[90px] items-center bg-ink px-5 py-6 font-display text-base font-bold text-steel-50"
              >
                {i}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
