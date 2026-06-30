import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { site } from '@/lib/site';

const PATHS = [
  '',
  '/capabilities',
  '/products',
  '/solutions',
  '/about',
  '/downloads',
  '/contact',
  '/privacy',
  '/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const path of PATHS) {
    for (const locale of routing.locales) {
      const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
      entries.push({
        url: `${site.url}${prefix}${path}`,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.6,
        alternates: {
          languages: {
            bg: `${site.url}${path}`,
            en: `${site.url}/en${path}`,
          },
        },
      });
    }
  }
  return entries;
}
