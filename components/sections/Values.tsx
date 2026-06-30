import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';

export default function Values() {
  const t = useTranslations('About');
  const values = t.raw('values') as { idx: string; title: string; desc: string }[];

  return (
    <section className="bg-steel-50">
      <div className="section-container py-20">
        <Eyebrow index="02">{t('valEyebrow')}</Eyebrow>
        <h2 className="mb-12 max-w-2xl font-display text-[clamp(26px,4vw,38px)] font-extrabold leading-tight text-balance">
          {t('valTitle')}
        </h2>
        <div className="grid grid-cols-1 gap-px border border-steel-100 bg-steel-100 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.idx} className="bg-white p-8">
              <div className="mb-4 font-display text-[34px] font-black leading-none text-red">
                {v.idx}
              </div>
              <h3 className="font-display text-lg font-bold">{v.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-steel-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
