import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { site } from '@/lib/site';

const NAV = [
  { key: 'capabilities', href: '/capabilities' },
  { key: 'products', href: '/products' },
  { key: 'solutions', href: '/solutions' },
  { key: 'downloads', href: '/downloads' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const;

export default function Footer() {
  const t = useTranslations('Footer');
  const nav = useTranslations('Nav');
  const rangeLinks = t.raw('rangeLinks') as string[];

  return (
    <footer className="bg-ink text-steel-400">
      <div className="section-container grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center bg-red font-display text-base font-black text-white">
              M
            </span>
            <span className="font-display text-lg font-extrabold text-white">MPB</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed">{t('blurb')}</p>
          <div className="mt-6 inline-flex items-center gap-2.5 border border-ink-soft px-3 py-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-steel-300">
              {t('officialLabel')}
            </span>
            <span className="font-display text-sm font-black text-white">BÖMA</span>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-steel-500">
            {t('colNav')}
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {NAV.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className="hover:text-white">
                  {nav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-steel-500">
            {t('colRange')}
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {rangeLinks.map((label) => (
              <li key={label}>
                <Link href="/products" className="hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-steel-500">
            {t('colContact')}
          </h3>
          <address className="flex flex-col gap-2.5 text-sm not-italic">
            <span>{t('address1')}</span>
            <span>{t('address2')}</span>
            <a href={site.phoneHref} className="hover:text-white">
              {t('phone')}
            </a>
            <a href={`mailto:${site.email}`} className="hover:text-white">
              {t('email')}
            </a>
          </address>
        </div>
      </div>

      <div className="border-t border-ink-soft">
        <div className="section-container flex flex-wrap items-center justify-between gap-4 py-6 text-xs">
          <span>{t('copyright')}</span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">
              {t('privacy')}
            </Link>
            <Link href="/terms" className="hover:text-white">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
