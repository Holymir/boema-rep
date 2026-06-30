'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

type IndexItem = {
  title: string;
  category: string;
  href: string;
  desc?: string;
};

export default function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('Search');
  const cap = useTranslations('Capabilities');
  const prod = useTranslations('ProductRange');
  const dl = useTranslations('Downloads');
  const mat = useTranslations('Materials');
  const [query, setQuery] = useState('');

  // Build a lightweight index from the translated, in-page content.
  const index = useMemo<IndexItem[]>(() => {
    const items: IndexItem[] = [];
    (cap.raw('items') as { title: string; desc: string }[]).forEach((c) =>
      items.push({ title: c.title, desc: c.desc, category: cap('eyebrow'), href: '/capabilities' }),
    );
    (prod.raw('items') as { title: string; desc: string }[]).forEach((p) =>
      items.push({ title: p.title, desc: p.desc, category: prod('eyebrow'), href: '/products' }),
    );
    (dl.raw('items') as { title: string; meta: string }[]).forEach((d) =>
      items.push({ title: d.title, desc: d.meta, category: dl('eyebrow'), href: '/downloads' }),
    );
    (mat.raw('items') as string[]).forEach((m) =>
      items.push({ title: m, category: mat('eyebrow'), href: '/capabilities' }),
    );
    return items;
  }, [cap, prod, dl, mat]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.desc?.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q),
    );
  }, [query, index]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) {
      document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-start justify-center bg-ink/70 px-4 pt-24"
      role="dialog"
      aria-modal="true"
      aria-label={t('label')}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-steel-100 px-5">
          <SearchIcon />
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('placeholder')}
            className="w-full py-4 text-base outline-none placeholder:text-steel-400"
          />
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold uppercase tracking-wider text-steel-500 hover:text-red"
          >
            {t('close')}
          </button>
        </div>

        {query.trim() && (
          <div className="max-h-[60vh] overflow-y-auto">
            {results.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-steel-500">
                {t('noResults')}
              </p>
            ) : (
              <ul>
                {results.map((r, i) => (
                  <li key={`${r.href}-${i}`} className="border-b border-steel-50 last:border-0">
                    <Link
                      href={r.href}
                      onClick={onClose}
                      className="block px-5 py-3.5 hover:bg-steel-50"
                    >
                      <span className="block font-display text-sm font-semibold text-ink">
                        {r.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-steel-500">
                        {r.category}
                        {r.desc ? ` · ${r.desc}` : ''}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" className="text-steel-400" />
      <path
        d="m20 20-3.5-3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-steel-400"
      />
    </svg>
  );
}
