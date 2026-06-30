import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function PageHeader({
  title,
  subtitle,
  crumb,
}: {
  title: string;
  subtitle?: string;
  crumb: string;
}) {
  const t = useTranslations('Pages');

  return (
    <section className="bg-ink text-white">
      <div className="section-container py-16">
        <div className="mb-6 flex items-center gap-2.5 text-[12.5px] text-steel-500">
          <Link href="/" className="hover:text-white">
            {t('home')}
          </Link>
          <span>/</span>
          <span className="font-semibold text-red">{crumb}</span>
        </div>
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
          <h1 className="font-display text-[clamp(30px,5vw,54px)] font-black leading-[0.98] tracking-tight text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[16.5px] leading-relaxed text-steel-300">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}
