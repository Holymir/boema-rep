'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter, routing } from '@/i18n/routing';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: string) {
    if (next === locale) return;
    startTransition(() => {
      // `pathname` here is locale-agnostic; next-intl re-prefixes it.
      router.replace(pathname, { locale: next as (typeof routing.locales)[number] });
    });
  }

  return (
    <div className="flex items-center border border-ink-soft" aria-busy={isPending}>
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-current={l === locale}
          className={`px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wider transition-colors ${
            l === locale
              ? 'bg-red text-white'
              : 'bg-transparent text-steel-500 hover:text-white'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
