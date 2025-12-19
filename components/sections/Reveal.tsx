'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ANIMATION } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const directions = {
  up: { y: 30, x: 0 },
  down: { y: -30, x: 0 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
};

export function Reveal({ children, delay = 0, className, direction = 'up' }: RevealProps) {
  const initialOffset = directions[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{
        duration: ANIMATION.DURATION.SLOW,
        delay: delay / 1000,
        ease: ANIMATION.EASE.DEFAULT,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
