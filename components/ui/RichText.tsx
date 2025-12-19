import { cn } from '@/lib/utils';
import type { RichTextContent } from '@/lib/types';

interface RichTextProps {
  content: RichTextContent;
  className?: string;
  variant?: 'default' | 'prose' | 'poetry';
}

export function RichText({ content, className, variant = 'default' }: RichTextProps) {
  // If HTML is available, use it directly
  if (content.html) {
    return (
      <div
        className={cn(
          variant === 'prose' && 'prose prose-lg md:prose-xl max-w-none',
          variant === 'poetry' && 'whitespace-pre-line text-center italic text-xl leading-relaxed',
          '[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:font-serif',
          '[&_p]:mb-6 [&_p]:leading-relaxed',
          '[&_blockquote]:border-l-4 [&_blockquote]:border-[var(--accent)] [&_blockquote]:pl-6',
          '[&_blockquote]:italic [&_blockquote]:my-8 [&_blockquote]:text-[var(--text-muted)]',
          '[&_blockquote]:bg-[var(--bg-card)] [&_blockquote]:py-4 [&_blockquote]:pr-4',
          className
        )}
        style={{ color: 'var(--text-main)' }}
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    );
  }

  // Fallback: render from raw content
  if (content.raw?.children) {
    return (
      <div className={cn('space-y-4', className)} style={{ color: 'var(--text-main)' }}>
        {content.raw.children.map((block, index) => {
          if (block.type === 'paragraph') {
            const text = block.children.map((child) => child.text || '').join('');
            return (
              <p key={index} className="leading-relaxed">
                {text}
              </p>
            );
          }
          return null;
        })}
      </div>
    );
  }

  // Final fallback: plain text
  if (content.text) {
    return (
      <p className={cn('leading-relaxed', className)} style={{ color: 'var(--text-main)' }}>
        {content.text}
      </p>
    );
  }

  return null;
}
