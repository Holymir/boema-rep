import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // Bulgarian is the default per the spec; English is the secondary locale.
  locales: ['bg', 'en'],
  defaultLocale: 'bg',
  // Default locale (bg) is served without a prefix ("/"); English lives under "/en".
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
