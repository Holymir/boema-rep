import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Eyebrow from '@/components/ui/Eyebrow';
import { productImages } from '@/lib/site';

export default function ProductRange() {
  const t = useTranslations('ProductRange');
  const items = t.raw('items') as { tag: string; title: string; desc: string; image: string }[];

  return (
    <section id="products" className="scroll-mt-28 bg-white">
      <div className="section-container py-20">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow index="02">{t('eyebrow')}</Eyebrow>
            <h2 className="font-display text-[clamp(26px,4vw,38px)] font-extrabold leading-tight">
              {t('title')}
            </h2>
          </div>
          <Link
            href="/contact"
            className="whitespace-nowrap border-b-2 border-red pb-1 font-display text-[13px] font-bold uppercase tracking-wide text-ink hover:text-red"
          >
            {t('link')}
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-px border border-steel-100 bg-steel-100 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Link
              key={p.title}
              href="/contact"
              className="group flex flex-col bg-white transition-colors hover:bg-steel-50"
            >
              <div className="relative aspect-[16/10] bg-steel-200">
                <Image
                  src={productImages[p.image] ?? productImages.modu}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-2.5 font-mono text-[11px] font-semibold tracking-wider text-red">
                  {p.tag}
                </div>
                <h3 className="font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-600">{p.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
