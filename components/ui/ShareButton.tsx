'use client';

import { Share2, Link as LinkIcon } from 'lucide-react';
import { cn, copyToClipboard, getFullUrl, isMobileDevice, formatDate } from '@/lib/utils';
import { Toast, useToast } from './Toast';

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
  author?: string;
  publishDate?: string;
  className?: string;
  variant?: 'icon' | 'button';
}

export function ShareButton({
  title,
  text,
  url,
  author,
  publishDate,
  className,
  variant = 'icon',
}: ShareButtonProps) {
  const { toast, showToast, hideToast } = useToast();

  const handleShareClick = async () => {
    const fullUrl = getFullUrl(url);

    // Desktop: Copy link to clipboard
    if (!isMobileDevice()) {
      try {
        const success = await copyToClipboard(fullUrl);
        if (success) {
          showToast('Link copied to clipboard!', 'success');
        } else {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = fullUrl;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand('copy');
            showToast('Link copied to clipboard!', 'success');
          } catch {
            showToast('Failed to copy link', 'error');
          } finally {
            document.body.removeChild(textArea);
          }
        }
      } catch {
        showToast('Failed to copy link', 'error');
      }
      return;
    }

    // Mobile: Use native share API (Open Graph tags will show the preview card)
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        const shareTextParts: string[] = [title];
        
        if (author || publishDate) {
          const metaParts: string[] = [];
          if (author) metaParts.push(`By ${author}`);
          if (publishDate) metaParts.push(formatDate(publishDate));
          if (metaParts.length > 0) {
            shareTextParts.push(metaParts.join(' • '));
          }
        }
        
        if (text) {
          shareTextParts.push(text);
        }
        
        await navigator.share({
          title: title,
          text: shareTextParts.join('\n\n'),
          url: fullUrl,
        });
      } catch (err) {
        // User cancelled or error
        if ((err as Error).name !== 'AbortError') {
          // Fallback: copy link
          const success = await copyToClipboard(fullUrl);
          if (success) {
            showToast('Link copied to clipboard!', 'success');
          }
        }
      }
    } else {
      // Web Share API not available - copy link
      const success = await copyToClipboard(fullUrl);
      if (success) {
        showToast('Link copied to clipboard!', 'success');
      } else {
        showToast('Share not supported', 'error');
      }
    }
  };

  if (variant === 'icon') {
    return (
      <>
        <button
          onClick={handleShareClick}
          className={cn(
            'p-3 rounded-full border border-[var(--text-muted)]/20',
            'hover:bg-[var(--bg-card)] hover:border-[var(--accent)]',
            'transition-all duration-300 text-[var(--text-muted)] hover:text-[var(--accent)]',
            className
          )}
          aria-label="Share this post"
        >
          {isMobileDevice() ? (
            <Share2 className="w-5 h-5" />
          ) : (
            <LinkIcon className="w-5 h-5" />
          )}
        </button>
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleShareClick}
        className={cn(
          'inline-flex items-center gap-2 px-4 py-2',
          'font-mono text-xs uppercase tracking-widest',
          'border border-[var(--text-muted)]/20 rounded-lg',
          'hover:bg-[var(--bg-card)] hover:border-[var(--accent)]',
          'transition-all duration-300 text-[var(--text-muted)] hover:text-[var(--accent)]',
          className
        )}
      >
        {isMobileDevice() ? (
          <Share2 className="w-4 h-4" />
        ) : (
          <LinkIcon className="w-4 h-4" />
        )}
        Share
      </button>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
}
