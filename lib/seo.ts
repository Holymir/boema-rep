import type { Metadata } from 'next';
import { site } from './site';
import type { Locale } from '@/i18n/routing';

const KEYWORDS_EN = [
  'metal machining Bulgaria',
  'CNC machining',
  'laser cutting',
  'aluminum profiles',
  'conveyors',
  'custom assemblies',
  'anodizing',
  'powder coating',
  'BÖMA distributor',
];

const KEYWORDS_BG = [
  'прецизна обработка',
  'лазерно рязане',
  'фрезоване',
  'струговане',
  'алуминиеви профили',
  'конвейери',
  'CNC обработка',
  'метален обработка България',
];

export function buildMetadata({
  locale,
  title,
  description,
  path = '',
}: {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${site.url}${locale === 'bg' ? '' : '/en'}${path}`;
  return {
    title,
    description,
    keywords: locale === 'bg' ? KEYWORDS_BG : KEYWORDS_EN,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: url,
      languages: {
        bg: `${site.url}${path}`,
        en: `${site.url}/en${path}`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title,
      description,
      url,
      locale: locale === 'bg' ? 'bg_BG' : 'en_US',
      images: [{ url: '/assets/hero.png', width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/assets/hero.png'],
    },
  };
}

/** Organization + LocalBusiness JSON-LD for the home page. */
export function organizationJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: site.name,
    alternateName: site.shortName,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    image: `${site.url}/assets/hero.png`,
    description:
      locale === 'bg'
        ? 'Прецизна обработка на метал, лазерно рязане и официален дистрибутор на BÖMA в България и Европа.'
        : 'Precision metal machining, laser cutting and official BÖMA distributor in Bulgaria and Europe.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: ['Bulgaria', 'European Union'],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:30',
      closes: '17:30',
    },
    brand: {
      '@type': 'Brand',
      name: site.partner.name,
      url: site.partner.url,
    },
  };
}
