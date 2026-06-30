import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import PageHeader from '@/components/sections/PageHeader';
import SolutionCategories from '@/components/sections/SolutionCategories';
import Process from '@/components/sections/Process';
import Industries from '@/components/sections/Industries';
import CtaBand from '@/components/sections/CtaBand';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Pages' });
  return buildMetadata({
    locale,
    title: `${t('solutions.title')} · MPB`,
    description: t('solutions.subtitle'),
    path: '/solutions',
  });
}

export default async function SolutionsPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Pages' });
  return (
    <>
      <PageHeader title={t('solutions.title')} subtitle={t('solutions.subtitle')} crumb={t('solutions.title')} />
      <SolutionCategories />
      <Process />
      <Industries />
      <CtaBand />
    </>
  );
}
