/**
 * Central NAP / brand constants. Values marked "client to confirm" are
 * placeholders carried over from the prototype.
 */
export const site = {
  name: 'Metal Parts Bulgaria',
  shortName: 'MPB',
  legalName: 'Metal Parts Bulgaria EOOD',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.metalparts.bg',
  email: 'office@metalparts.bg',
  // client to confirm
  phone: '+359 2 999 99 99',
  phoneHref: 'tel:+35929999999',
  address: {
    street: 'Tsarigradsko Shose Blvd. 115',
    locality: 'Sofia',
    region: 'Sofia',
    postalCode: '1784',
    country: 'BG',
  },
  geo: {
    // Sofia centre — client to confirm exact site location.
    latitude: 42.6501,
    longitude: 23.3795,
  },
  partner: {
    name: 'BÖMA Maschinenbau und Automatisierung',
    url: 'https://www.boema.at',
  },
  social: [] as string[],
} as const;

// Product range image slots (placeholders in /public/assets).
export const productImages: Record<string, string> = {
  modu: '/assets/modu.png',
  conveyor: '/assets/conveyor.png',
  roller: '/assets/roller.png',
  pv40: '/assets/pv40.png',
  workplace: '/assets/workplace.png',
  hero: '/assets/hero.png',
};
