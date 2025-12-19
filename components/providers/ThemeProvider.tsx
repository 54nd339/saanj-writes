'use client';

import React, { createContext, useContext } from 'react';
import { useTheme } from '@/hooks';
import type { ThemeSetting } from '@/lib/types';

interface ThemeContextValue {
  darkMode: boolean;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
  themeSettings: ThemeSetting;
}

export function ThemeProvider({ children, themeSettings }: ThemeProviderProps) {
  const { darkMode, toggleTheme, mounted } = useTheme(themeSettings);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}

