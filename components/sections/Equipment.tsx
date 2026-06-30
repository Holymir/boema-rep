import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';

export default function Equipment() {
  const t = useTranslations('Equipment');
  const software = t.raw('software') as string[];

  return (
    <section id="equipment" className="scroll-mt-28 bg-white">
      <div className="section-container py-20">
        <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <Eyebrow index="05">{t('eyebrow')}</Eyebrow>
            <h2 className="font-display text-[clamp(26px,4vw,38px)] font-extrabold leading-tight text-balance">
              {t('title')}
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-ink-soft">{t('body')}</p>
            <div className="mt-7 inline-flex items-center gap-3 border border-steel-100 bg-steel-50 px-4 py-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-steel-500">
                {t('partnerLabel')}
              </span>
              <span className="font-display text-sm font-black text-ink">BÖMA · Boema.at</span>
            </div>
          </div>
          <div>
            <div className="mb-4 text-[11px] font-bold uppercase tracking-wider text-steel-500">
              CAD / CAM
            </div>
            <div className="grid grid-cols-2 gap-px border border-steel-100 bg-steel-100">
              {software.map((s) => (
                <div
                  key={s}
                  className="flex items-center bg-white px-5 py-6 font-display text-lg font-bold text-ink"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
