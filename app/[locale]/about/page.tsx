import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import PageHeader from '@/components/sections/PageHeader';
import AboutStory from '@/components/sections/AboutStory';
import Values from '@/components/sections/Values';
import Cert from '@/components/sections/Cert';
import CtaBand from '@/components/sections/CtaBand';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Pages' });
  return buildMetadata({
    locale,
    title: `${t('about.title')} · MPB`,
    description: t('about.subtitle'),
    path: '/about',
  });
}

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Pages' });
  return (
    <>
      <PageHeader title={t('about.title')} subtitle={t('about.subtitle')} crumb={t('about.title')} />
      <AboutStory />
      <Values />
      <Cert />
      <CtaBand />
    </>
  );
}
