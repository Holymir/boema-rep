import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';

export default function Materials() {
  const t = useTranslations('Materials');
  const items = t.raw('items') as string[];

  return (
    <section id="materials" className="scroll-mt-28 bg-steel-50">
      <div className="section-container py-20">
        <Eyebrow index="03">{t('eyebrow')}</Eyebrow>
        <h2 className="mb-10 max-w-2xl font-display text-[clamp(26px,4vw,38px)] font-extrabold leading-tight">
          {t('title')}
        </h2>
        <div className="flex flex-wrap gap-3">
          {items.map((m) => (
            <span
              key={m}
              className="border border-steel-200 bg-white px-5 py-3 font-display text-sm font-semibold text-ink"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
