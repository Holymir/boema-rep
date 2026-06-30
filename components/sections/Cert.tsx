import { useTranslations } from 'next-intl';

export default function Cert() {
  const t = useTranslations('About');

  return (
    <section className="bg-ink text-white">
      <div className="section-container py-16">
        <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr] md:items-center">
          <div className="flex items-center gap-4">
            <span className="flex h-20 w-20 flex-none items-center justify-center border-2 border-red font-display text-lg font-black text-white">
              ISO
            </span>
            <span className="font-display text-xl font-extrabold leading-tight text-white">
              9001
            </span>
          </div>
          <div>
            <h2 className="font-display text-[clamp(22px,3vw,30px)] font-extrabold leading-tight text-white">
              {t('certTitle')}
            </h2>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-steel-300">
              {t('certBody')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
