import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import PageHeader from '@/components/sections/PageHeader';
import Capabilities from '@/components/sections/Capabilities';
import Materials from '@/components/sections/Materials';
import Specs from '@/components/sections/Specs';
import Equipment from '@/components/sections/Equipment';
import CtaBand from '@/components/sections/CtaBand';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Pages' });
  return buildMetadata({
    locale,
    title: `${t('capabilities.title')} · MPB`,
    description: t('capabilities.subtitle'),
    path: '/capabilities',
  });
}

export default async function CapabilitiesPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Pages' });
  return (
    <>
      <PageHeader title={t('capabilities.title')} subtitle={t('capabilities.subtitle')} crumb={t('capabilities.title')} />
      <Capabilities />
      <Materials />
      <Specs />
      <Equipment />
      <CtaBand />
    </>
  );
}
