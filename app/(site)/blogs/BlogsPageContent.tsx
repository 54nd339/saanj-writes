'use client';

import { useState } from 'react';
import { Container } from '@/components/layout';
import { Reveal } from '@/components/sections';
import { PostGrid, SearchFilter } from '@/components/blog';
import { RichText } from '@/components/ui';
import type { Post, Category, TextGroup } from '@/lib/types';

interface BlogsPageContentProps {
  initialPosts: Post[];
  categories: Category[];
  journalText?: TextGroup;
}

export function BlogsPageContent({ initialPosts, categories, journalText }: BlogsPageContentProps) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleFilter = (filtered: Post[], search: string, category: string | null) => {
    setFilteredPosts(filtered);
    setSearchTerm(search);
    setSelectedCategory(category);
  };

  const resultsText = () => {
    if (searchTerm || selectedCategory) {
      return `${filteredPosts.length} result${filteredPosts.length !== 1 ? 's' : ''} found`;
    }
    return `${initialPosts.length} posts`;
  };

  return (
    <Container>
      <Reveal>
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between md:gap-8 mb-6 md:mb-8">
            <div className="flex-1">
              {journalText?.heading && (
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[var(--text-main)] mb-4 md:mb-6">
                  {journalText.heading}
                </h1>
              )}
              {journalText?.subheading && (
                <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl font-serif italic">
                  {journalText.subheading}
                </p>
              )}
              {journalText?.body && !journalText.subheading && (
                <div className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl font-serif italic">
                  <RichText content={journalText.body} />
                </div>
              )}
            </div>

            <div className="mt-6 md:mt-0 md:flex-shrink-0 md:w-80">
              <SearchFilter
                categories={categories}
                posts={initialPosts}
                onFilter={handleFilter}
                compact
              />
            </div>
          </div>

          {/* Results count */}
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
            {resultsText()}
          </p>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <PostGrid posts={filteredPosts} />
      </Reveal>

      <div className="h-20" />
    </Container>
  );
}
