import type { Metadata } from 'next';
import { Playfair_Display, JetBrains_Mono, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import { getSiteConfig } from '@/lib/hygraph';

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
  const siteConfig = await getSiteConfig();
  return {
    title: {
      default: siteConfig.defaultSeo.metaTitle,
      template: `%s | ${siteConfig.siteName}`,
    },
    description: siteConfig.defaultSeo.metaDescription,
    openGraph: {
      title: siteConfig.defaultSeo.metaTitle,
      description: siteConfig.defaultSeo.metaDescription,
      images: siteConfig.defaultSeo.ogImage ? [siteConfig.defaultSeo.ogImage.url] : [],
      type: 'website',
    },
  };
}

export const metadata: Metadata = await getMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${jetbrains.variable} ${sourceSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
