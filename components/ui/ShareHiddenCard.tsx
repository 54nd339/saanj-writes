'use client';

import { forwardRef } from 'react';
import Image from 'next/image';
import type { Post } from '@/lib/types';
import { ROUTES } from '@/lib/constants';
import { getFullUrl, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui';

interface ShareHiddenCardProps {
  post: Post;
  readTime: string;
}

export const ShareHiddenCard = forwardRef<HTMLDivElement, ShareHiddenCardProps>(
  ({ post, readTime }, ref) => {
    const postUrl = getFullUrl(`${ROUTES.BLOGS}/${post.slug}`);
    const formattedDate = formatDate(post.publishDate);

    return (
      <div
        data-share-card
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          zIndex: -1,
          visibility: 'hidden',
          opacity: 0,
        }}
        className="[&_a]:pointer-events-none"
      >
        <div
          ref={ref}
          className="w-screen h-screen flex items-center justify-center bg-[var(--bg-main)]"
        >
          <div
            className="w-[364px] bg-[var(--bg-card)] rounded-3xl overflow-hidden border border-[var(--text-muted)]/8 shadow-2xl backdrop-blur-sm"
          >
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-[var(--bg-main)]">
              <Image
                src={post.coverImage.url}
                alt={post.title}
                fill
                className="object-cover scale-105"
                sizes="364px"
                unoptimized={post.coverImage.url.startsWith('http')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/80 via-[var(--bg-card)]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-card)]/20" />

              <div className="absolute bottom-0 left-0 right-0 p-6 pb-2">
                <h2 className="font-serif text-3xl font-bold text-[var(--text-main)] leading-[1.2] mb-2 drop-shadow-lg">
                  {post.title}
                </h2>
                {post.author && (
                  <div className="font-mono text-xs font-semibold text-[var(--text-main)]/90 drop-shadow-sm mb-3">
                    {post.author.nickname || post.author.name}
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                {post.category && (
                  <Badge size="sm" color={post.category.color?.hex}>
                    {post.category.name}
                  </Badge>
                )}
                <span className="font-mono text-[9px] text-[var(--text-muted)]/85 uppercase tracking-widest font-medium">
                  {formattedDate}
                </span>
                <span className="font-mono text-[9px] text-[var(--text-muted)]/85 uppercase tracking-widest font-medium">
                  • {readTime}
                </span>
              </div>

              {post.excerpt && (
                <p className="text-sm text-[var(--text-muted)] leading-[1.7] line-clamp-2 font-sans">
                  {post.excerpt}
                </p>
              )}

              <div className="pt-5 border-t border-[var(--text-muted)]/12">
                <div className="font-mono text-[8px] text-[var(--text-muted)]/65 break-all leading-relaxed tracking-tight text-center">
                  {postUrl}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ShareHiddenCard.displayName = 'ShareHiddenCard';
