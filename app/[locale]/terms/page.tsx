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
    title: `${t('termsTitle')} · MPB`,
    description: t('termsTitle'),
    path: '/terms',
  });
}

export default async function TermsPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Legal' });
  const page = await getLegalPage('terms', locale);
  return (
    <LegalPage
      title={page?.title ?? t('termsTitle')}
      body={page?.body as string[] | undefined}
    />
  );
}
