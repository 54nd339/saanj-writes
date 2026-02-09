'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQueryState, parseAsString } from 'nuqs';
import { useDebouncedCallback } from 'use-debounce';
import { cn } from '@/lib/utils';
import { Input, Badge, Icon } from '@/components/ui';
import { ANIMATION } from '@/lib/constants';
import type { Category } from '@/lib/types';

interface SearchFilterProps {
  categories: Category[];
  compact?: boolean;
}

export function SearchFilter({ categories, compact = false }: SearchFilterProps) {
  const [search, setSearch] = useQueryState('q', parseAsString.withDefault('').withOptions({ shallow: false }));
  const [category, setCategory] = useQueryState('category', parseAsString.withDefault('').withOptions({ shallow: false }));

  const [localSearch, setLocalSearch] = useState(search);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync local state when URL changes
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  // Debounce URL updates
  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearch(value || null);
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    debouncedSetSearch(value);
  };

  const handleCategoryClick = (categorySlug: string | null) => {
    const newCategory = category === categorySlug ? null : categorySlug;
    setCategory(newCategory || null);
    setIsDropdownOpen(false);
  };

  const clearFilters = () => {
    setLocalSearch('');
    setSearch(null);
    setCategory(null);
    setIsDropdownOpen(false);
  };

  const hasActiveFilters = localSearch.trim() !== '' || category !== '';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Find selected category object for display
  const selectedCategoryObj = categories.find((c) => c.slug === category);

  return (
    <div className={cn('relative', !compact && 'mb-12')}>
      {/* Search Bar with Filter Button */}
      <div className="flex gap-2 items-center">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search posts..."
            value={localSearch}
            onChange={handleSearchChange}
            icon="search"
            iconPosition="left"
            className={compact ? 'text-sm' : ''}
          />
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={cn(
              'p-3 rounded-lg border transition-all duration-300 flex items-center justify-center',
              hasActiveFilters
                ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                : 'bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--text-muted)]/20 hover:border-[var(--accent)] hover:text-[var(--text-main)]'
            )}
            aria-label="Filter posts"
          >
            <Icon name="filter" size={18} />
            {hasActiveFilters && (
              <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-white" />
            )}
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: ANIMATION.DURATION.FAST }}
                className="absolute right-0 top-full mt-2 w-56 sm:w-64 bg-[var(--bg-card)] border border-[var(--text-muted)]/20 rounded-lg shadow-lg z-50 overflow-hidden"
              >
                <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                  {/* Category Filter */}
                  <div>
                    <h3 className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2 sm:mb-3">
                      Category
                    </h3>
                    <div className="space-y-1.5 sm:space-y-2">
                      <button
                        onClick={() => {
                          handleCategoryClick(null);
                        }}
                        className={cn(
                          'w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all',
                          !category
                            ? 'bg-[var(--accent)] text-white'
                            : 'bg-[var(--bg-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]'
                        )}
                      >
                        All Categories
                      </button>
                      {categories.map((c) => (
                        <button
                          key={c.slug}
                          onClick={() => {
                            handleCategoryClick(c.slug);
                          }}
                          className={cn(
                            'w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all',
                            category === c.slug
                              ? 'text-white'
                              : 'bg-[var(--bg-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]'
                          )}
                          style={
                            category === c.slug && c.color
                              ? { backgroundColor: c.color.hex }
                              : undefined
                          }
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <>
                      <div className="h-px bg-[var(--text-muted)]/10" />
                      <button
                        onClick={clearFilters}
                        className="w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[var(--accent)] hover:bg-[var(--bg-main)] transition-colors flex items-center gap-1.5 sm:gap-2"
                      >
                        <Icon name="close" size={12} className="sm:w-3.5 sm:h-3.5" />
                        Clear Filters
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {hasActiveFilters && !compact && (
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap mt-3 sm:mt-4">
          {selectedCategoryObj && (
            <Badge
              variant="accent"
              size="sm"
              color={selectedCategoryObj.color?.hex}
            >
              {selectedCategoryObj.name}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
