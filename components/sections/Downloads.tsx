import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';

export type DownloadItem = {
  title: string;
  meta?: string;
  url?: string;
};

/**
 * Downloads section. `items` come from Sanity (see lib/queries). When the CMS
 * is empty or unconfigured, falls back to the placeholder list in messages.
 */
export default function Downloads({ items }: { items?: DownloadItem[] }) {
  const t = useTranslations('Downloads');
  const fallback = t.raw('items') as { title: string; meta: string }[];
  const list: DownloadItem[] = items && items.length > 0 ? items : fallback;

  return (
    <section id="downloads" className="scroll-mt-28 bg-steel-50">
      <div className="section-container py-20">
        <Eyebrow index="09">{t('eyebrow')}</Eyebrow>
        <h2 className="mb-10 font-display text-[clamp(26px,4vw,38px)] font-extrabold leading-tight">
          {t('title')}
        </h2>
        <div className="grid grid-cols-1 gap-px border border-steel-100 bg-steel-100 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((d, i) => (
            <DownloadCard key={`${d.title}-${i}`} item={d} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DownloadCard({ item }: { item: DownloadItem }) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-4">
        <FileIcon />
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-steel-500">
          PDF
        </span>
      </div>
      <h3 className="mt-6 font-display text-lg font-bold text-ink">{item.title}</h3>
      {item.meta && <p className="mt-1.5 text-sm text-steel-600">{item.meta}</p>}
    </>
  );

  const className =
    'group block bg-white p-7 transition-colors hover:bg-white/60 ' +
    (item.url ? 'hover:!bg-steel-50' : 'cursor-default opacity-90');

  return item.url ? (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  );
}

function FileIcon() {
  return (
    <span className="flex h-11 w-11 items-center justify-center bg-red text-white">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M14 3v5h5M7 3h8l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
