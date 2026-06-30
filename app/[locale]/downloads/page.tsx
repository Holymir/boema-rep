import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { getDownloads } from '@/sanity/lib/queries';
import PageHeader from '@/components/sections/PageHeader';
import Downloads from '@/components/sections/Downloads';
import CtaBand from '@/components/sections/CtaBand';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Pages' });
  return buildMetadata({
    locale,
    title: `${t('downloads.title')} · MPB`,
    description: t('downloads.subtitle'),
    path: '/downloads',
  });
}

export default async function DownloadsPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Pages' });
  const downloads = await getDownloads(locale);
  return (
    <>
      <PageHeader title={t('downloads.title')} subtitle={t('downloads.subtitle')} crumb={t('downloads.title')} />
      <Downloads items={downloads} />
      <CtaBand />
    </>
  );
}
