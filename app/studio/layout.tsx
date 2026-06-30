export const metadata = {
  title: 'MPB Studio',
  robots: { index: false, follow: false },
};

// Studio gets its own root layout (separate <html>) so it stays outside the
// localized [locale] tree.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
