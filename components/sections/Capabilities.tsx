import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';

export default function Capabilities() {
  const t = useTranslations('Capabilities');
  const items = t.raw('items') as { title: string; desc: string }[];

  return (
    <section id="capabilities" className="scroll-mt-28 bg-white">
      <div className="section-container py-20">
        <Eyebrow index="01">{t('eyebrow')}</Eyebrow>
        <div className="mb-12 grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <h2 className="font-display text-[clamp(28px,4vw,40px)] font-extrabold leading-tight text-balance">
            {t('title')}
          </h2>
          <p className="text-[17px] leading-relaxed text-ink-soft">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 gap-px border border-steel-100 bg-steel-100 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="bg-white p-7">
              <h3 className="font-display text-lg font-bold">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-steel-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
