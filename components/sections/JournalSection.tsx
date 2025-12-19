'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui';
import { Container } from '@/components/layout';
import { Reveal } from './Reveal';
import { PostCard } from '@/components/blog';
import type { Post } from '@/lib/types';
import { ROUTES } from '@/lib/constants';

interface JournalSectionProps {
  posts: Post[];
}

export function JournalSection({ posts }: JournalSectionProps) {
  return (
    <section
      id="journal"
      className="py-24 md:py-40 bg-[var(--bg-main)] border-t border-[var(--text-muted)]/10 relative z-10"
    >
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
          <Reveal>
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif font-light text-[var(--text-main)]">
              Selected <br />
              <span className="font-bold italic text-[var(--text-muted)] opacity-60">
                Works
              </span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <Link
              href={ROUTES.BLOGS}
              className="font-mono text-sm uppercase tracking-widest border-b border-[var(--text-main)] pb-1 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all text-[var(--text-main)] pr-1 inline-flex items-center gap-2"
            >
              View Full Anthology
              <Icon name="arrowRight" size={14} />
            </Link>
          </Reveal>
        </div>

        <div className="space-y-20 md:space-y-32">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 100}>
              <PostCard post={post} variant="featured" index={i} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
