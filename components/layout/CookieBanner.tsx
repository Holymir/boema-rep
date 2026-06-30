'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { readConsent, setConsent } from './consent';

export default function CookieBanner() {
  const t = useTranslations('Cookie');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readConsent() === null);
  }, []);

  if (!visible) return null;

  function choose(value: 'accepted' | 'declined') {
    setConsent(value);
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-ink-soft bg-ink text-steel-300"
    >
      <div className="section-container flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed">
          {t('message')}{' '}
          <Link href="/privacy" className="underline hover:text-white">
            {t('learnMore')}
          </Link>
        </p>
        <div className="flex flex-none gap-3">
          <button
            type="button"
            onClick={() => choose('declined')}
            className="border border-ink-soft px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-steel-300 transition-colors hover:text-white"
          >
            {t('decline')}
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="bg-red px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-dark"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
