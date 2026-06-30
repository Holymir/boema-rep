import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';

export default function Process() {
  const t = useTranslations('Solutions');
  const steps = t.raw('steps') as { num: string; title: string; desc: string }[];

  return (
    <section className="bg-steel-50">
      <div className="section-container py-20">
        <Eyebrow index="02">{t('procEyebrow')}</Eyebrow>
        <h2 className="mb-12 max-w-2xl font-display text-[clamp(26px,4vw,38px)] font-extrabold leading-tight text-balance">
          {t('procTitle')}
        </h2>
        <div className="grid grid-cols-1 gap-px border border-steel-100 bg-steel-100 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.num} className="bg-white p-8">
              <div className="mb-4 font-display text-[34px] font-black leading-none text-red">
                {s.num}
              </div>
              <h3 className="font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-steel-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
