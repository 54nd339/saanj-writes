'use client';

import { useState, useEffect } from 'react';

interface UseScrollSpyOptions {
  offset?: number;
  throttle?: number;
}

export function useScrollSpy(
  sectionIds: string[],
  options: UseScrollSpyOptions = {}
) {
  const { offset = 100, throttle = 100 } = options;
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        timeoutId = null;

        const scrollPosition = window.scrollY + offset;

        for (const id of sectionIds) {
          const element = document.getElementById(id);
          if (!element) continue;

          const { offsetTop, offsetHeight } = element;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(id);
            return;
          }
        }

        // If no section is active, clear the active section
        setActiveSection(null);
      }, throttle);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [sectionIds, offset, throttle]);

  return activeSection;
}
