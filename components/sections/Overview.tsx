import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Eyebrow from '@/components/ui/Eyebrow';

const CARDS = [
  { key: 'capabilities', href: '/capabilities', image: '/assets/pv40.png' },
  { key: 'products', href: '/products', image: '/assets/modu.png' },
  { key: 'solutions', href: '/solutions', image: '/assets/conveyor.png' },
  { key: 'downloads', href: '/downloads', image: '/assets/roller.png' },
] as const;

export default function Overview() {
  const nav = useTranslations('Nav');
  const pages = useTranslations('Pages');

  return (
    <section className="bg-steel-50">
      <div className="section-container py-20">
        <Eyebrow index="02">{nav('home')}</Eyebrow>
        <div className="grid grid-cols-1 gap-px border border-steel-100 bg-steel-100 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c) => (
            <Link
              key={c.key}
              href={c.href}
              className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden bg-ink p-7 text-white"
            >
              <span
                className="absolute inset-0 bg-cover bg-center opacity-45 transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${c.image}')` }}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
              <span className="relative">
                <span className="block font-display text-xl font-bold">{nav(c.key)}</span>
                <span className="mt-1.5 block text-sm leading-snug text-steel-300">
                  {pages(`${c.key}.subtitle` as 'capabilities.subtitle')}
                </span>
                <span className="mt-4 inline-flex items-center gap-2 font-display text-[13px] font-bold uppercase tracking-wide text-red">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
