import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Playfair_Display, JetBrains_Mono, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import { getSiteConfig, fetchBulkData } from '@/lib/hygraph';
import { generateDefaultMetadata } from '@/lib/metadata';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Get site config for metadata
async function getMetadata() {
  // Fetch bulk data early to populate cache
  try {
    await fetchBulkData();
  } catch (error) {
    console.warn('Bulk fetch failed, falling back to individual fetch:', error);
  }

  const siteConfig = await getSiteConfig();
  const baseMetadata = await generateDefaultMetadata(siteConfig);

  return {
    ...baseMetadata,
    title: {
      default: siteConfig.defaultSeo.metaTitle,
      template: `%s | ${siteConfig.siteName}`,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
  } as Metadata;
}

export const metadata: Metadata = await getMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" translate="no" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${jetbrains.variable} ${sourceSans.variable} font-sans antialiased`}
      >
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
