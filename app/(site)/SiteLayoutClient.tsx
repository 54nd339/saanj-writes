'use client';

import React from 'react';
import { Navbar, Footer } from '@/components/layout';
import { Loader } from '@/components/ui';
import { useThemeContext } from '@/components/providers';
import type { SiteConfig } from '@/lib/types';

interface SiteLayoutClientProps {
  children: React.ReactNode;
  siteConfig: SiteConfig;
}

export function SiteLayoutClient({ children, siteConfig }: SiteLayoutClientProps) {
  const { darkMode, toggleTheme, mounted } = useThemeContext();

  // Prevent flash of unstyled content
  if (!mounted) {
    return <Loader siteName={siteConfig.siteName} />;
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen w-full overflow-x-hidden bg-[var(--bg-main)] transition-colors duration-500">
        <Navbar
          siteName={siteConfig.siteName}
          navigation={siteConfig.mainNavigation}
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
        />

        <main className="relative z-10">{children}</main>

        <Footer
          siteName={siteConfig.siteName}
          footer={siteConfig.footer}
        />

        <div className="grain-overlay" />
        <div className="vignette-overlay" />
      </div>
    </div>
  );
}
