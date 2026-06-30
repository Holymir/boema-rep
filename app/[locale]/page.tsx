import { unstable_setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { organizationJsonLd } from '@/lib/seo';

import Hero from '@/components/sections/Hero';
import Intro from '@/components/sections/Intro';
import Overview from '@/components/sections/Overview';
import WhyUs from '@/components/sections/WhyUs';
import Industries from '@/components/sections/Industries';
import CtaBand from '@/components/sections/CtaBand';

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(locale)) }}
      />
      <Hero />
      <Intro />
      <Overview />
      <WhyUs />
      <Industries />
      <CtaBand />
    </>
  );
}
