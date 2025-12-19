'use client';

import { useState, useEffect, useCallback } from 'react';
import { hexToRgb } from '@/lib/utils';
import type { ThemeSetting } from '@/lib/types';

export function useTheme(themeSettings: ThemeSetting) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from system preference
  useEffect(() => {
    const initializeTheme = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const savedTheme = localStorage.getItem('theme');
      const initialDarkMode = savedTheme ? savedTheme === 'dark' : prefersDark;
      
      setDarkMode(initialDarkMode);
      setMounted(true);
    };

    // Defer state updates to avoid synchronous setState
    requestAnimationFrame(initializeTheme);
  }, []);

  // Apply CSS variables when theme changes or on mount
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const theme = themeSettings[darkMode ? 'dark' : 'light'];

    // Extract hex values - handle both string and { hex: string } formats
    const getHex = (color: string | { hex?: string }): string => 
      typeof color === 'string' ? color : color?.hex || '#000000';

    root.style.setProperty('--bg-main', getHex(theme.bgMain));
    root.style.setProperty('--bg-card', getHex(theme.bgCard));
    root.style.setProperty('--text-main', getHex(theme.textMain));
    root.style.setProperty('--text-muted', getHex(theme.textMuted));
    root.style.setProperty('--accent', getHex(theme.accent));
    root.style.setProperty('--accent-light', getHex(theme.accentLight));
    root.style.setProperty('--text-muted-rgb', hexToRgb(getHex(theme.textMuted)));

    // Save preference
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');

    // Update document class for Tailwind dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode, themeSettings, mounted]);

  const toggleTheme = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  return {
    darkMode,
    toggleTheme,
    mounted,
  };
}
