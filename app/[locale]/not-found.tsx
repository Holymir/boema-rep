import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFound() {
  const t = useTranslations('Nav');
  return (
    <div className="section-container flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="font-display text-7xl font-black text-red">404</span>
      <p className="mt-4 text-lg text-ink-soft">Page not found · Страницата не е намерена</p>
      <Link
        href="/"
        className="mt-8 bg-red px-7 py-4 font-display text-sm font-bold uppercase tracking-wide text-white hover:bg-red-dark"
      >
        {t('home')}
      </Link>
    </div>
  );
}
