import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';

export default function SolutionCategories() {
  const t = useTranslations('Solutions');
  const categories = t.raw('categories') as { idx: string; title: string; desc: string }[];

  return (
    <section className="bg-white">
      <div className="section-container py-20">
        <Eyebrow index="01">{t('catEyebrow')}</Eyebrow>
        <h2 className="mb-12 max-w-2xl font-display text-[clamp(26px,4vw,38px)] font-extrabold leading-tight text-balance">
          {t('catTitle')}
        </h2>
        <div className="grid grid-cols-1 gap-px border border-steel-100 bg-steel-100 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div key={c.idx} className="bg-white p-8">
              <div className="mb-4 font-mono text-sm font-semibold text-red">{c.idx}</div>
              <h3 className="font-display text-lg font-bold">{c.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-steel-600">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
