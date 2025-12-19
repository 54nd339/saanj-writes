'use client';

import { Share2, Link as LinkIcon } from 'lucide-react';
import { cn, canShare, copyToClipboard, getFullUrl, isMobileDevice } from '@/lib/utils';
import { Toast, useToast } from './Toast';

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
  image?: string;
  className?: string;
  variant?: 'icon' | 'button';
}

export function ShareButton({
  title,
  text,
  url,
  className,
  variant = 'icon',
}: ShareButtonProps) {
  const { toast, showToast, hideToast } = useToast();

  const handleShare = async () => {
    const fullUrl = getFullUrl(url);

    // Mobile: Use native share API
    if (isMobileDevice() && canShare()) {
      try {
        await navigator.share({
          title,
          text,
          url: fullUrl,
        });
        return;
      } catch (err) {
        // User cancelled or error - fall through to clipboard
        if ((err as Error).name === 'AbortError') return;
      }
    }

    // Desktop: Copy to clipboard
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
  };

  if (variant === 'icon') {
    return (
      <>
        <button
          onClick={handleShare}
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
        onClick={handleShare}
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
