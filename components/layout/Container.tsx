import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}

const sizes = {
  narrow: 'max-w-3xl',
  default: 'max-w-7xl',
  wide: 'max-w-[1400px]',
};

export function Container({ children, className, size = 'default' }: ContainerProps) {
  return (
    <div className={cn('mx-auto px-6 md:px-12', sizes[size], className)}>
      {children}
    </div>
  );
}
