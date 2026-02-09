import Link from 'next/link';
import Image from 'next/image';
import { cn, formatDate, calculateReadTime } from '@/lib/utils';
import { Icon, Badge } from '@/components/ui';
import { ROUTES } from '@/lib/constants';
import type { Post } from '@/lib/types';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'featured' | 'compact';
  index?: number;
}

export function PostCard({ post, variant = 'default', index = 0 }: PostCardProps) {
  const readTime = post.content?.text
    ? calculateReadTime(post.content.text)
    : '05 MIN';
  const formattedDate = formatDate(post.publishDate);

  if (variant === 'featured') {
    return (
      <Link
        href={`${ROUTES.BLOGS}/${post.slug}`}
        className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 items-center cursor-pointer"
      >
        {/* Image Side */}
        <div className={cn('col-span-12 md:col-span-7', index % 2 === 1 && 'md:order-last')}>
          <div className="relative overflow-hidden aspect-[16/9] bg-[var(--bg-card)] rounded-sm shadow-md">
            <Image
              src={post.coverImage.url}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105 filter sepia-[0.2] group-hover:sepia-0"
              sizes="(max-width: 768px) 100vw, 58.33vw"
              unoptimized={post.coverImage.url.startsWith('http')}
            />
          </div>
        </div>

        {/* Content Side */}
        <div className="col-span-12 md:col-span-5 flex flex-col justify-center max-w-full overflow-hidden">
          <div className="flex items-center gap-4 mb-4 md:mb-6 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
            {post.category && (
              <Badge
                variant="accent"
                size="sm"
                color={post.category.color?.hex}
              >
                {post.category.name}
              </Badge>
            )}
            <span>/</span>
            <span>{formattedDate}</span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-[var(--text-main)] mb-3 sm:mb-4 md:mb-6 group-hover:underline decoration-1 underline-offset-4 sm:underline-offset-8 transition-all decoration-[var(--text-muted)] break-words">
            {post.title}
          </h3>

          <p className="text-sm sm:text-base md:text-lg text-[var(--text-muted)] font-serif leading-relaxed mb-4 sm:mb-6 md:mb-8 italic break-words line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs sm:text-sm uppercase tracking-widest font-bold text-[var(--text-main)] group-hover:gap-3 sm:group-hover:gap-4 transition-all group-hover:text-[var(--accent)]">
            Read Piece <Icon name="arrowRight" size={14} className="sm:w-4 sm:h-4" />
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link
        href={`${ROUTES.BLOGS}/${post.slug}`}
        className="group flex gap-4 items-start"
      >
        <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-sm bg-[var(--bg-card)] relative">
          <Image
            src={post.coverImage.url}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="80px"
            unoptimized={post.coverImage.url.startsWith('http')}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-serif font-bold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
            {post.title}
          </h4>
          <p className="font-mono text-xs text-[var(--text-muted)] mt-1">
            {formattedDate}
          </p>
        </div>
      </Link>
    );
  }

  // Default grid card
  return (
    <Link
      href={`${ROUTES.BLOGS}/${post.slug}`}
      className="group block bg-[var(--bg-card)] rounded-lg overflow-hidden border border-[var(--text-muted)]/10 hover:border-[var(--accent)]/30 transition-all duration-300 hover:shadow-lg"
    >
      <div className="aspect-[16/10] overflow-hidden relative">
        <Image
          src={post.coverImage.url}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized={post.coverImage.url.startsWith('http')}
        />
      </div>
      <div className="p-4 sm:p-5 md:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
          {post.category && (
            <Badge size="sm" color={post.category.color?.hex}>
              {post.category.name}
            </Badge>
          )}
          <span className="font-mono text-[9px] sm:text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
            {formattedDate}
          </span>
        </div>
        <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--text-main)] mb-2 group-hover:text-[var(--accent)] transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] line-clamp-2 mb-3 sm:mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] sm:text-xs text-[var(--text-muted)] flex items-center gap-1">
            <Icon name="clock" size={11} className="sm:w-3 sm:h-3" />
            {readTime}
          </span>
          <span className="font-mono text-[10px] sm:text-xs text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            Read <Icon name="arrowRight" size={11} className="sm:w-3 sm:h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
