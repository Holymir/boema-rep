import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import PageHeader from '@/components/sections/PageHeader';
import Rfq from '@/components/sections/Rfq';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Pages' });
  return buildMetadata({
    locale,
    title: `${t('contact.title')} · MPB`,
    description: t('contact.subtitle'),
    path: '/contact',
  });
}

export default async function ContactPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Pages' });
  return (
    <>
      <PageHeader title={t('contact.title')} subtitle={t('contact.subtitle')} crumb={t('contact.title')} />
      <Rfq showHeader={false} />
    </>
  );
}
