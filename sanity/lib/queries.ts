import { safeFetch } from './client';
import type { DownloadItem } from '@/components/sections/Downloads';

type Locale = 'bg' | 'en';

/**
 * Fetch downloads from the CMS. The PDF file asset URL is resolved server-side
 * and surfaced as `url`. Returns [] when Sanity is unconfigured (placeholders
 * are then shown by the Downloads component).
 */
export async function getDownloads(locale: Locale): Promise<DownloadItem[]> {
  const query = `*[_type == "download"] | order(order asc, _createdAt desc){
    "title": coalesce(title[$locale], title.en, title.bg),
    "meta": coalesce(meta[$locale], meta.en, meta.bg),
    "url": file.asset->url
  }`;
  return safeFetch<DownloadItem[]>(query, { locale }, []);
}

export type LegalPage = {
  title: string;
  body: unknown;
} | null;

export async function getLegalPage(
  slug: 'privacy' | 'terms',
  locale: Locale,
): Promise<LegalPage> {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    "title": coalesce(title[$locale], title.en, title.bg),
    "body": coalesce(body[$locale], body.en, body.bg)
  }`;
  return safeFetch<LegalPage>(query, { slug, locale }, null);
}
