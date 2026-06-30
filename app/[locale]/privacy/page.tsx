import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { getLegalPage } from '@/sanity/lib/queries';
import LegalPage from '@/components/sections/LegalPage';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Legal' });
  return buildMetadata({
    locale,
    title: `${t('privacyTitle')} · MPB`,
    description: t('privacyTitle'),
    path: '/privacy',
  });
}

export default async function PrivacyPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Legal' });
  const page = await getLegalPage('privacy', locale);
  return (
    <LegalPage
      title={page?.title ?? t('privacyTitle')}
      body={page?.body as string[] | undefined}
    />
  );
}
