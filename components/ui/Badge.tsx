import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'accent' | 'muted' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
  color?: string;
}

const variants = {
  default: 'bg-[var(--bg-card)] text-[var(--text-main)]',
  accent: 'bg-[var(--accent)]/10 text-[var(--accent)]',
  muted: 'bg-[var(--text-muted)]/10 text-[var(--text-muted)]',
  outline: 'bg-transparent border border-[var(--text-muted)]/30 text-[var(--text-muted)]',
};

const sizes = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-3 py-1 text-xs',
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  color,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-mono uppercase tracking-widest rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
      style={color ? { backgroundColor: `${color}20`, color } : undefined}
    >
      {children}
    </span>
  );
}
