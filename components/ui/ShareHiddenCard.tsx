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
            className="w-[min(90vw,364px)] max-w-[364px] max-h-[485px] aspect-[3/4] bg-[var(--bg-card)] rounded-3xl overflow-hidden border border-[var(--text-muted)]/8 shadow-2xl backdrop-blur-sm flex flex-col"
          >
            <div className="relative w-full flex-shrink-0 overflow-hidden bg-[var(--bg-main)] aspect-[16/9]">
              <Image
                src={post.coverImage.url}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 364px) 90vw, 364px"
                unoptimized={post.coverImage.url.startsWith('http')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-card)]/30 pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 pb-4 sm:pb-6 z-10">
                <h2 className="font-serif text-3xl sm:text-3xl font-bold text-white leading-tight mb-1.5 sm:mb-2 drop-shadow-lg">
                  {post.title}
                </h2>
                {post.author && (
                  <div className="font-mono text-sm sm:text-base font-semibold text-white/90 drop-shadow-sm">
                    {post.author.nickname || post.author.name}
                  </div>
                )}
              </div>
            </div>

            <div className="px-4 sm:px-6 py-5 sm:py-8 space-y-3 sm:space-y-6 flex-1 flex flex-col justify-between min-h-0 overflow-hidden">
              <div className="space-y-2.5 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  {post.category && (
                    <Badge size="sm" color={post.category.color?.hex}>
                      {post.category.name}
                    </Badge>
                  )}
                  <span className="font-mono text-xs sm:text-sm text-[var(--text-muted)]/85 uppercase tracking-widest font-medium">
                    {formattedDate}
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-[var(--text-muted)]/85 uppercase tracking-widest font-medium">
                    • {readTime}
                  </span>
                </div>

                {post.excerpt && (
                  <p className="text-base sm:text-lg text-[var(--text-muted)] leading-[1.7] line-clamp-3 font-sans">
                    {post.excerpt}
                  </p>
                )}
              </div>

              <div className="pt-3 sm:pt-5 border-t border-[var(--text-muted)]/12 flex-shrink-0">
                <div className="font-mono text-[10px] sm:text-xs text-[var(--text-muted)]/65 break-all leading-relaxed tracking-tight text-center">
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
