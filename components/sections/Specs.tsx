import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';

export default function Specs() {
  const t = useTranslations('Specs');
  const items = t.raw('items') as { value: string; label: string }[];

  return (
    <section id="specs" className="scroll-mt-28 bg-ink text-white">
      <div className="section-container py-16">
        <Eyebrow index="04" dark>
          {t('eyebrow')}
        </Eyebrow>
        <h2 className="mb-10 max-w-2xl font-display text-[clamp(24px,3.5vw,34px)] font-extrabold leading-tight text-white">
          {t('title')}
        </h2>
        <div className="grid grid-cols-2 gap-px border border-ink-soft bg-ink-soft lg:grid-cols-4">
          {items.map((s) => (
            <div key={s.label} className="bg-ink p-7">
              <div className="font-display text-2xl font-black text-red">{s.value}</div>
              <div className="mt-2 text-sm text-steel-300">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
