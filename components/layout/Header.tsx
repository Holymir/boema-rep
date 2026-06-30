'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { site } from '@/lib/site';
import LocaleSwitcher from './LocaleSwitcher';
import SearchDialog from '@/components/search/SearchDialog';

type NavItem = {
  key: 'capabilities' | 'products' | 'solutions' | 'downloads' | 'about' | 'contact';
  href: string;
  childrenNs?: 'ProductRange' | 'Solutions';
};

const NAV: NavItem[] = [
  { key: 'capabilities', href: '/capabilities' },
  { key: 'products', href: '/products', childrenNs: 'ProductRange' },
  { key: 'solutions', href: '/solutions', childrenNs: 'Solutions' },
  { key: 'downloads', href: '/downloads' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
];

export default function Header() {
  const t = useTranslations('Nav');
  const th = useTranslations('Header');
  const prod = useTranslations('ProductRange');
  const sol = useTranslations('Solutions');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  function childrenFor(item: NavItem): string[] {
    if (item.childrenNs === 'ProductRange')
      return (prod.raw('items') as { title: string }[]).map((i) => i.title);
    if (item.childrenNs === 'Solutions')
      return (sol.raw('categories') as { title: string }[]).map((i) => i.title);
    return [];
  }

  return (
    <header className="sticky top-0 z-50 font-sans">
      {/* utility bar */}
      <div className="bg-ink text-steel-300">
        <div className="section-container flex min-h-[38px] flex-wrap items-center justify-between gap-4 py-1">
          <div className="hidden items-center gap-2.5 text-xs tracking-wide sm:flex">
            <span className="inline-block h-[7px] w-[7px] bg-red" />
            <span className="font-semibold text-white">{th('distributorLine')}</span>
          </div>
          <div className="flex items-center gap-4 text-[12.5px]">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-1.5 font-medium hover:text-white sm:flex"
            >
              <span className="font-bold text-red">T</span>
              {th('phone')}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="hidden font-medium hover:text-white md:inline"
            >
              {th('email')}
            </a>
            <LocaleSwitcher />
          </div>
        </div>
      </div>

      {/* main bar */}
      <div className="border-b border-steel-100 bg-white">
        <div className="section-container flex h-[74px] items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3" aria-label={site.name}>
            <span className="flex h-[42px] w-[42px] items-center justify-center bg-red font-display text-[19px] font-black tracking-tighter text-white">
              M
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[21px] font-extrabold tracking-tight text-ink">
                MPB
              </span>
              <span className="mt-1 text-[9px] font-semibold tracking-[0.16em] text-steel-500">
                METAL PARTS BULGARIA
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => {
              const children = childrenFor(item);
              return (
                <div key={item.key} className="group relative">
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-3.5 py-2.5 font-display text-sm font-semibold text-ink-soft transition-colors hover:text-red"
                  >
                    {t(item.key)}
                    {children.length > 0 && <Chevron />}
                  </Link>
                  {children.length > 0 && (
                    <div className="invisible absolute left-0 top-full z-10 min-w-[240px] -translate-y-1 border border-steel-100 bg-white opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      {children.map((c) => (
                        <Link
                          key={c}
                          href={item.href}
                          className="block border-b border-steel-50 px-4 py-3 text-sm text-ink-soft last:border-0 hover:bg-steel-50 hover:text-red"
                        >
                          {c}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={t('home')}
              className="flex h-[42px] w-[42px] items-center justify-center border border-steel-100 text-ink-soft transition-colors hover:border-red hover:text-red"
            >
              <SearchIcon />
            </button>
            <Link
              href="/contact"
              className="hidden whitespace-nowrap bg-red px-5 py-3 font-display text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-dark lg:inline-block"
            >
              {t('requestQuote')}
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={menuOpen}
              className="flex h-[46px] w-[46px] flex-none flex-col items-center justify-center gap-[5px] border border-steel-100 bg-white lg:hidden"
            >
              <Bar open={menuOpen} pos="top" />
              <Bar open={menuOpen} pos="mid" />
              <Bar open={menuOpen} pos="bottom" />
            </button>
          </div>
        </div>
      </div>

      {/* mobile panel */}
      {menuOpen && (
        <div className="flex flex-col border-b border-steel-100 bg-white shadow-[0_14px_24px_-16px_rgba(0,0,0,0.35)] lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-steel-50 px-6 py-4 font-display text-base font-semibold text-ink hover:bg-steel-50 hover:text-red"
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="flex flex-col gap-3 px-6 py-5">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="bg-red px-6 py-4 text-center font-display text-sm font-bold uppercase tracking-wider text-white hover:bg-red-dark"
            >
              {t('requestQuote')}
            </Link>
            <a
              href={site.phoneHref}
              className="text-center text-sm font-semibold text-steel-600"
            >
              {th('phone')}
            </a>
          </div>
        </div>
      )}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Bar({ open, pos }: { open: boolean; pos: 'top' | 'mid' | 'bottom' }) {
  const base = 'block h-0.5 w-[22px] bg-ink transition-transform';
  const state =
    pos === 'mid'
      ? open
        ? 'opacity-0'
        : 'opacity-100'
      : pos === 'top'
        ? open
          ? 'translate-y-[7px] rotate-45'
          : ''
        : open
          ? '-translate-y-[7px] -rotate-45'
          : '';
  return <span className={`${base} ${state}`} />;
}
