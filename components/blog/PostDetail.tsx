'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { formatDate, calculateReadTime } from '@/lib/utils';
import { Icon, Badge, RichText, ShareButton } from '@/components/ui';
import { Container } from '@/components/layout';
import { Reveal } from '@/components/sections';
import { ROUTES, ANIMATION } from '@/lib/constants';
import type { Post } from '@/lib/types';

interface PostDetailProps {
  post: Post;
}

export function PostDetail({ post }: PostDetailProps) {
  const readTime = post.content?.text
    ? calculateReadTime(post.content.text)
    : '05 MIN';
  const formattedDate = formatDate(post.publishDate);
  const isPoetry = post.category?.slug === 'poetry';
  const separator = '//';

  return (
    <article className="min-h-screen bg-[var(--bg-main)] pb-32 pt-24 relative z-10">
      {/* Progress Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: ANIMATION.DURATION.SLOW, ease: 'circOut' }}
        className="fixed top-0 left-0 w-full h-1 z-50 bg-[var(--bg-card)] origin-left"
      >
        <div className="h-full bg-[var(--accent)] w-1/3" />
      </motion.div>

      <Container size="narrow">
        {/* Back Button */}
        <Link
          href={ROUTES.BLOGS}
          className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-12 hover:text-[var(--text-main)] transition-colors"
        >
          <Icon name="arrowLeft" size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Anthology
        </Link>

        {/* Header */}
        <Reveal>
          <div className="mb-12 border-b border-[var(--text-muted)]/20 pb-12">
            <div className="flex flex-wrap gap-4 font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-6">
              {post.category && (
                <>
                  <Badge color={post.category.color?.hex}>{post.category.name}</Badge>
                  <span className="text-[var(--text-muted)]">{separator}</span>
                </>
              )}
              <span className="text-[var(--text-muted)]">{formattedDate}</span>
              <span className="text-[var(--text-muted)]">{separator}</span>
              <span className="text-[var(--text-muted)]">{readTime}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[var(--text-main)] mb-8 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-muted)] font-light leading-relaxed italic border-l-2 border-[var(--accent)] pl-4">
              &quot;{post.excerpt}&quot;
            </p>
          </div>
        </Reveal>

        {/* Cover Image */}
        <Reveal delay={100}>
          <div className="aspect-[21/9] w-full bg-[var(--bg-card)] mb-16 rounded-sm overflow-hidden shadow-lg grayscale hover:grayscale-0 transition-all duration-700 relative">
            <Image
              src={post.coverImage.url}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 800px"
              priority
              unoptimized={post.coverImage.url.startsWith('http')}
            />
          </div>
        </Reveal>

        {/* Content */}
        <Reveal delay={200}>
          <div className="prose prose-lg md:prose-xl max-w-none font-serif">
            <RichText
              content={post.content}
              variant={isPoetry ? 'poetry' : 'prose'}
            />
          </div>
        </Reveal>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-[var(--text-muted)]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest text-center sm:text-left">
            Written by {post.author?.name || 'Sanjeebani Nanda'} • {formattedDate}
          </p>
          <ShareButton
            title={post.title}
            text={post.excerpt}
            url={`${ROUTES.BLOGS}/${post.slug}`}
            author={post.author?.name}
            publishDate={post.publishDate}
            variant="button"
          />
        </div>
      </Container>
    </article>
  );
}
