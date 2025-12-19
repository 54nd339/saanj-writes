'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PostCard } from './PostCard';
import { ANIMATION } from '@/lib/constants';
import type { Post } from '@/lib/types';

interface PostGridProps {
  posts: Post[];
  className?: string;
  columns?: 2 | 3;
}

export function PostGrid({ posts, className, columns = 3 }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-serif text-xl text-[var(--text-muted)] italic">
          No posts found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid gap-6 md:gap-8',
        columns === 2 && 'grid-cols-1 md:grid-cols-2',
        columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {posts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: ANIMATION.DURATION.NORMAL,
            delay: index * ANIMATION.DELAY.STAGGER,
            ease: ANIMATION.EASE.DEFAULT,
          }}
        >
          <PostCard post={post} />
        </motion.div>
      ))}
    </div>
  );
}
