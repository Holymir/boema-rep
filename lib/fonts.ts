import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';

// Display font (headings). Archivo ships latin + latin-ext only; Bulgarian
// Cyrillic headings fall back to IBM Plex Sans (loaded with the cyrillic subset).
export const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
});

// Body font — includes Cyrillic so Bulgarian copy renders correctly.
export const plexSans = IBM_Plex_Sans({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-sans',
  display: 'swap',
});

// Mono accents (section index numbers, meta).
export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const fontVariables = `${archivo.variable} ${plexSans.variable} ${plexMono.variable}`;
