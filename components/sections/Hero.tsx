'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button, Icon } from '@/components/ui';
import { ANIMATION, PARALLAX } from '@/lib/constants';
import { Reveal } from './Reveal';
import type { Asset, TextGroup, Button as ButtonType } from '@/lib/types';

interface HeroProps {
  image: Asset;
  text: TextGroup;
  buttons: ButtonType[];
  showScrollIndicator?: boolean;
}

export function Hero({ image, text, buttons, showScrollIndicator = true }: HeroProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [...PARALLAX.HERO_Y_RANGE]);
  const opacity = useTransform(scrollY, [0, 500], [...PARALLAX.HERO_OPACITY_RANGE]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-15">
      {/* Parallax Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-stone-900/40 z-10" />
        <Image
          src={image.url}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          unoptimized={image.url.startsWith('http')}
        />
      </motion.div>

      {/* Glass Center Card */}
      <div className="relative z-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <Reveal>
          <div className="backdrop-blur-sm bg-transparent border border-white/10 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-lg sm:rounded-xl shadow-2xl max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto text-center">
            {text.eyebrow && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: ANIMATION.DURATION.SLOW, delay: 0.2 }}
                className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 text-white/90 mb-4 sm:mb-6 backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest">{text.eyebrow}</span>
              </motion.div>
            )}

            {text.heading && (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: ANIMATION.DURATION.SLOW, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-serif font-bold text-white mb-4 sm:mb-6 leading-none tracking-tight drop-shadow-2xl px-2"
              >
                {text.heading.includes(' ') ? (
                  <>
                    {text.heading.split(' ').slice(0, 2).join(' ')} <br />
                    <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-light)] to-white">
                      {text.heading.split(' ').slice(2).join(' ') || ''}
                    </span>
                  </>
                ) : (
                  text.heading
                )}
              </motion.h1>
            )}

            {text.subheading && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: ANIMATION.DURATION.SLOW, delay: 0.4 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-stone-200 font-light max-w-lg md:max-w-xl lg:max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed drop-shadow-lg px-2"
              >
                {text.subheading}
              </motion.p>
            )}

            {buttons.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: ANIMATION.DURATION.SLOW, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
              >
                {buttons.map((button, index) => (
                  <Button
                    key={button.label}
                    href={button.url}
                    variant={button.style || (index === 0 ? 'primary' : 'outline')}
                    icon={index === 0 ? <Icon name="arrowRight" size={12} /> : undefined}
                    className="backdrop-blur-sm"
                  >
                    {button.label}
                  </Button>
                ))}
              </motion.div>
            )}
          </div>
        </Reveal>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 sm:gap-3 md:gap-4 pointer-events-none"
        >
          <span className="font-sans text-[8px] sm:text-[9px] md:text-[10px] text-white/50 tracking-[0.2em] uppercase">
            Explore
          </span>
          <div className="w-[1px] h-6 sm:h-8 md:h-10 lg:h-12 bg-white/10 relative overflow-hidden">
            <motion.div
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-white to-transparent"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
