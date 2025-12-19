'use client';

import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Icon, type IconName } from './Icon';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, iconPosition = 'left', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[var(--text-muted)] mb-1.5 sm:mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
              <Icon name={icon} size={16} className="sm:w-[18px] sm:h-[18px]" />
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[var(--bg-card)] border border-[var(--text-muted)]/20',
              'rounded-lg font-sans text-sm sm:text-base text-[var(--text-main)]',
              'placeholder:text-[var(--text-muted)]/50',
              'focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]',
              'transition-colors duration-200',
              icon && iconPosition === 'left' && 'pl-9 sm:pl-10',
              icon && iconPosition === 'right' && 'pr-9 sm:pr-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <div className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
              <Icon name={icon} size={16} className="sm:w-[18px] sm:h-[18px]" />
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-[10px] sm:text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
