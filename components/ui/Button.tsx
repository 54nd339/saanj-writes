'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ButtonStyle } from '@/lib/types';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonStyle;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
  openInNewTab?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const variants: Record<ButtonStyle, string> = {
  primary: 'bg-white/90 text-stone-900 hover:bg-white',
  secondary: 'bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90',
  outline: 'bg-transparent border border-white/20 text-white hover:bg-white/10',
  ghost: 'bg-transparent text-[var(--text-main)] hover:bg-[var(--bg-card)]',
  link: 'bg-transparent text-[var(--text-main)] hover:text-[var(--accent)] underline-offset-4 hover:underline',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-xs',
  lg: 'px-8 py-4 text-sm',
};

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className,
  disabled = false,
  openInNewTab = false,
  type = 'button',
}: ButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2 font-mono uppercase tracking-wider rounded-lg transition-all duration-300',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="transition-transform group-hover:-translate-x-1">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:');

    if (isExternal || openInNewTab) {
      return (
        <a
          href={href}
          target={openInNewTab ? '_blank' : undefined}
          rel={openInNewTab ? 'noopener noreferrer' : undefined}
          className={cn(baseStyles, 'group')}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={cn(baseStyles, 'group')}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyles, 'group')}
    >
      {content}
    </button>
  );
}
