'use client';

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, debounce } from '@/lib/utils';
import { Input, Badge, Icon } from '@/components/ui';
import { ANIMATION } from '@/lib/constants';
import type { Category, Post } from '@/lib/types';

interface SearchFilterProps {
  categories: Category[];
  onFilter: (filtered: Post[], searchTerm: string, category: string | null) => void;
  posts: Post[];
  compact?: boolean;
}

export function SearchFilter({ categories, onFilter, posts, compact = false }: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filterPosts = useCallback(
    (search: string, category: string | null) => {
      let filtered = [...posts];

      if (search.trim()) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(
          (post) =>
            post.title.toLowerCase().includes(searchLower) ||
            post.excerpt.toLowerCase().includes(searchLower)
        );
      }

      if (category) {
        filtered = filtered.filter((post) => post.category?.slug === category);
      }

      onFilter(filtered, search, category);
    },
    [posts, onFilter]
  );

  const debouncedSearch = useMemo(
    () => debounce((value: string) => filterPosts(value, selectedCategory), 300),
    [filterPosts, selectedCategory]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleCategoryClick = (categorySlug: string | null) => {
    const newCategory = selectedCategory === categorySlug ? null : categorySlug;
    setSelectedCategory(newCategory);
    filterPosts(searchTerm, newCategory);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    filterPosts('', null);
    setIsDropdownOpen(false);
  };

  const hasActiveFilters = searchTerm.trim() !== '' || selectedCategory !== null;

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

  return (
    <div className={cn('relative', !compact && 'mb-12')}>
      {/* Search Bar with Filter Button */}
      <div className="flex gap-2 items-center">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
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
                className="absolute right-0 top-full mt-2 w-64 bg-[var(--bg-card)] border border-[var(--text-muted)]/20 rounded-lg shadow-lg z-50 overflow-hidden"
              >
                <div className="p-4 space-y-4">
                  {/* Category Filter */}
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-3">
                      Category
                    </h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          handleCategoryClick(null);
                          setIsDropdownOpen(false);
                        }}
                        className={cn(
                          'w-full text-left px-3 py-2 rounded-md font-mono text-xs uppercase tracking-wider transition-all',
                          selectedCategory === null
                            ? 'bg-[var(--accent)] text-white'
                            : 'bg-[var(--bg-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]'
                        )}
                      >
                        All Categories
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category.slug}
                          onClick={() => {
                            handleCategoryClick(category.slug);
                            setIsDropdownOpen(false);
                          }}
                          className={cn(
                            'w-full text-left px-3 py-2 rounded-md font-mono text-xs uppercase tracking-wider transition-all',
                            selectedCategory === category.slug
                              ? 'text-white'
                              : 'bg-[var(--bg-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]'
                          )}
                          style={
                            selectedCategory === category.slug && category.color
                              ? { backgroundColor: category.color.hex }
                              : undefined
                          }
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <>
                      <div className="h-px bg-[var(--text-muted)]/10" />
                      <button
                        onClick={clearFilters}
                        className="w-full text-left px-3 py-2 rounded-md font-mono text-xs uppercase tracking-wider text-[var(--accent)] hover:bg-[var(--bg-main)] transition-colors flex items-center gap-2"
                      >
                        <Icon name="close" size={14} />
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
        <div className="flex items-center gap-3 flex-wrap mt-4">
          {selectedCategory && (
            <Badge
              variant="accent"
              size="sm"
              color={categories.find((c) => c.slug === selectedCategory)?.color?.hex}
            >
              {categories.find((c) => c.slug === selectedCategory)?.name}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
