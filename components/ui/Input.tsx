'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Icon, type IconName } from './Icon';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, iconPosition = 'left', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
              <Icon name={icon} size={18} />
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--text-muted)]/20',
              'rounded-lg font-sans text-[var(--text-main)]',
              'placeholder:text-[var(--text-muted)]/50',
              'focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]',
              'transition-colors duration-200',
              icon && iconPosition === 'left' && 'pl-10',
              icon && iconPosition === 'right' && 'pr-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
              <Icon name={icon} size={18} />
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
