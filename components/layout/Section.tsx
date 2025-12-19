import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  containerSize?: 'default' | 'narrow' | 'wide';
  withContainer?: boolean;
  background?: 'main' | 'card' | 'transparent';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const backgrounds = {
  main: 'bg-[var(--bg-main)]',
  card: 'bg-[var(--bg-card)]',
  transparent: 'bg-transparent',
};

const paddings = {
  none: '',
  sm: 'py-16 md:py-20',
  md: 'py-24 md:py-32',
  lg: 'py-32 md:py-40',
};

export function Section({
  children,
  id,
  className,
  containerSize = 'default',
  withContainer = true,
  background = 'main',
  padding = 'lg',
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative z-10',
        backgrounds[background],
        paddings[padding],
        className
      )}
    >
      {withContainer ? (
        <Container size={containerSize}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}
