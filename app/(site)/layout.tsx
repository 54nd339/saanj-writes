import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/providers';
import { getSiteConfig } from '@/lib/hygraph';
import { SiteLayoutClient } from './SiteLayoutClient';

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const siteConfig = await getSiteConfig();

  return (
    <ThemeProvider themeSettings={siteConfig.themeSettings}>
      <SiteLayoutClient siteConfig={siteConfig}>{children}</SiteLayoutClient>
    </ThemeProvider>
  );
}
