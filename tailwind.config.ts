import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './sanity/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette ported from the DC prototype (Index.dc.html)
        ink: '#15181B', // near-black industrial base
        'ink-soft': '#3A4146',
        red: {
          DEFAULT: '#E00000',
          dark: '#B80000',
        },
        steel: {
          50: '#F4F5F6',
          100: '#E2E4E6',
          200: '#D4D8DB',
          300: '#C9D0D4',
          400: '#9AA4AB',
          500: '#8A949A',
          600: '#5A646B',
        },
      },
      fontFamily: {
        display: ['var(--font-archivo)', 'Archivo', 'sans-serif'],
        sans: ['var(--font-plex-sans)', 'IBM Plex Sans', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'IBM Plex Mono', 'monospace'],
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
