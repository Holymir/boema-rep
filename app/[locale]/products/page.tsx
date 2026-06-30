import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import PageHeader from '@/components/sections/PageHeader';
import ProductRange from '@/components/sections/ProductRange';
import ModuFeature from '@/components/sections/ModuFeature';
import CtaBand from '@/components/sections/CtaBand';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Pages' });
  return buildMetadata({
    locale,
    title: `${t('products.title')} · MPB`,
    description: t('products.subtitle'),
    path: '/products',
  });
}

export default async function ProductsPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Pages' });
  return (
    <>
      <PageHeader title={t('products.title')} subtitle={t('products.subtitle')} crumb={t('products.title')} />
      <ProductRange />
      <ModuFeature />
      <CtaBand />
    </>
  );
}
