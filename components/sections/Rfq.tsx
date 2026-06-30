import { useTranslations } from 'next-intl';
import { site } from '@/lib/site';
import Eyebrow from '@/components/ui/Eyebrow';
import RfqForm from '@/components/rfq/RfqForm';

export default function Rfq({ showHeader = true }: { showHeader?: boolean }) {
  const t = useTranslations('Rfq');
  const hours = t.raw('hours') as { day: string; time: string }[];

  return (
    <section id="contact" className="scroll-mt-28 bg-white">
      <div className="section-container py-20">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            {showHeader && (
              <>
                <Eyebrow>{t('eyebrow')}</Eyebrow>
                <h2 className="font-display text-[clamp(28px,4.5vw,46px)] font-black leading-tight text-balance">
                  {t('title')}
                </h2>
                <p className="mb-8 mt-4 max-w-xl text-[16.5px] leading-relaxed text-ink-soft">
                  {t('subtitle')}
                </p>
              </>
            )}
            <RfqForm />
          </div>

          {/* details */}
          <div className="flex flex-col gap-px border border-steel-100 bg-steel-100">
            <div className="bg-ink p-8 text-white">
              <div className="mb-6 inline-flex items-center gap-2.5 border border-ink-soft px-3 py-2">
                <span className="h-[7px] w-[7px] bg-red" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-steel-300">
                  {t('officialLabel')}
                </span>
                <span className="font-display text-sm font-black">BÖMA</span>
              </div>
              <Detail label={t('addressLabel')} value={t('address')} />
              <Detail label={t('phoneLabel')} value={site.phone} href={site.phoneHref} />
              <Detail label={t('emailLabel')} value={site.email} href={`mailto:${site.email}`} />
            </div>
            <div className="bg-white p-8">
              <div className="mb-3.5 text-[11px] font-bold uppercase tracking-wider text-steel-500">
                {t('hoursLabel')}
              </div>
              {hours.map((h) => (
                <div
                  key={h.day}
                  className="flex justify-between border-b border-steel-50 py-1.5 text-[14.5px] last:border-0"
                >
                  <span className="text-steel-600">{h.day}</span>
                  <span className="font-semibold text-ink">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Detail({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-steel-500">
        {label}
      </div>
      {href ? (
        <a href={href} className="text-[15.5px] font-medium leading-snug text-white hover:text-steel-300">
          {value}
        </a>
      ) : (
        <div className="whitespace-pre-line text-[15.5px] font-medium leading-snug text-white">
          {value}
        </div>
      )}
    </div>
  );
}
