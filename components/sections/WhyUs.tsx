import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';

export default function WhyUs() {
  const t = useTranslations('Why');
  const items = t.raw('items') as { num: string; title: string; desc: string }[];

  return (
    <section id="why" className="scroll-mt-28 bg-white">
      <div className="section-container py-20">
        <Eyebrow index="08">{t('eyebrow')}</Eyebrow>
        <h2 className="mb-12 max-w-2xl font-display text-[clamp(26px,4vw,38px)] font-extrabold leading-tight text-balance">
          {t('title')}
        </h2>
        <div className="grid grid-cols-1 gap-px border border-steel-100 bg-steel-100 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((w) => (
            <div key={w.num} className="bg-white p-8">
              <div className="mb-4 font-display text-[34px] font-black leading-none text-red">
                {w.num}
              </div>
              <h3 className="font-display text-lg font-bold">{w.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-steel-600">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
