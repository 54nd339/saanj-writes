'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui';
import { ANIMATION, PARALLAX } from '@/lib/constants';
import type { Button as ButtonType } from '@/lib/types';

interface NavbarProps {
  siteName: string;
  navigation: ButtonType[];
  darkMode: boolean;
  onToggleTheme: () => void;
}

export function Navbar({ siteName, navigation, darkMode, onToggleTheme }: NavbarProps) {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Initialize with current scroll position
  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window === 'undefined') return !isHomePage;
    return window.scrollY > PARALLAX.SCROLL_TRIGGER || !isHomePage;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > PARALLAX.SCROLL_TRIGGER || !isHomePage);
  });

  // Update when pathname changes (using callback to avoid sync setState)
  useEffect(() => {
    const checkScroll = () => {
      setIsScrolled(scrollY.get() > PARALLAX.SCROLL_TRIGGER || !isHomePage);
    };
    // Use requestAnimationFrame to defer state update
    requestAnimationFrame(checkScroll);
  }, [isHomePage, scrollY]);

  const textColorClass = isScrolled ? 'text-[var(--text-main)]' : 'text-white';
  const accentColorClass = isScrolled ? 'text-[var(--accent)]' : 'text-[var(--accent)] opacity-90';

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 transition-colors duration-500"
        animate={{
          paddingTop: isScrolled ? '1rem' : '2rem',
          paddingBottom: isScrolled ? '1rem' : '2rem',
        }}
        style={{
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          backgroundColor: isScrolled
            ? 'color-mix(in srgb, var(--bg-main), transparent 10%)'
            : 'transparent',
        }}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center gap-4">
          {/* Logo */}
          <Link href="/" className="relative group z-50 flex-shrink-0">
            <span
              className={cn(
                'font-serif text-3xl font-bold tracking-tighter relative z-10 transition-colors',
                textColorClass
              )}
            >
              {siteName.split('.')[0]}.
            </span>
            <span
              className={cn(
                'font-mono text-xs absolute -right-8 -top-0 rotate-0 opacity-80',
                'group-hover:opacity-100 transition-opacity duration-300 tracking-widest',
                accentColorClass
              )}
            >
              {siteName.split('.')[1] || 'LIT'}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-12 flex-shrink-0">
            {navigation.map((item, i) => (
              <Link
                key={item.label}
                href={item.url}
                className={cn(
                  'font-mono text-sm uppercase tracking-widest transition-colors relative group',
                  isScrolled
                    ? 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                    : 'text-white/80 hover:text-white'
                )}
              >
                <span className={cn('mr-1 opacity-0 group-hover:opacity-100 transition-opacity', accentColorClass)}>
                  0{i + 1}.
                </span>
                {item.label}
              </Link>
            ))}

            <div className={cn('w-px h-6 mx-4', isScrolled ? 'bg-[var(--text-muted)]/30' : 'bg-white/30')} />

            <button
              onClick={onToggleTheme}
              className={cn('hover:rotate-90 transition-transform duration-500 p-2', textColorClass)}
              aria-label="Toggle Theme"
            >
              <Icon name={darkMode ? 'sun' : 'moon'} size={20} />
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-4 z-50">
            <button
              onClick={onToggleTheme}
              className={cn('hover:rotate-90 transition-transform duration-500 p-2', textColorClass)}
              aria-label="Toggle Theme"
            >
              <Icon name={darkMode ? 'sun' : 'moon'} size={20} />
            </button>

            <button className={cn('p-2', textColorClass)} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Icon name={mobileMenuOpen ? 'close' : 'menu'} size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={ANIMATION.EASE.SPRING}
            className="fixed inset-0 z-40 bg-[var(--bg-main)] md:hidden flex flex-col items-center justify-center"
          >
            <div className="flex flex-col gap-8 text-center">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={item.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-5xl font-light text-[var(--text-main)] hover:italic transition-all"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <div className="w-12 h-px bg-[var(--text-muted)]/30 mx-auto mt-4" />

              <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                {siteName} Portfolio
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
