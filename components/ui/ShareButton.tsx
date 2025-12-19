'use client';

import { useState } from 'react';
import { Share2, Link as LinkIcon, Eye } from 'lucide-react';
import { cn, isMobileDevice } from '@/lib/utils';
import { handleShare } from '@/lib/shareUtils';
import { ShareHiddenCard } from './ShareHiddenCard';
import { SharePreviewModal } from './SharePreviewModal';
import { useShareImage } from '@/hooks/useShareImage';
import { Toast, useToast } from './Toast';
import type { Post } from '@/lib/types';
import { ROUTES } from '@/lib/constants';

interface ShareButtonProps {
  post: Post;
  readTime: string;
  className?: string;
  variant?: 'icon' | 'button';
}

export function ShareButton({
  post,
  readTime,
  className,
  variant = 'icon',
}: ShareButtonProps) {
  const { toast, showToast, hideToast } = useToast();
  const { generateShareImage, cardRef } = useShareImage();
  const url = `${ROUTES.BLOGS}/${post.slug}`;
  const isDevelopment = process.env.NODE_ENV === 'development';
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);

  const onShareClick = () => {
    handleShare({
      post,
      url,
      generateShareImage,
      cardRef,
      onSuccess: (message) => showToast(message, 'success'),
      onError: (message) => showToast(message, 'error'),
    });
  };

  const onPreviewClick = async () => {
    setIsPreviewOpen(true);
    setIsGeneratingPreview(true);
    setPreviewImageUrl(null);

    try {
      const imageFile = await generateShareImage(cardRef);
      if (imageFile) {
        const url = URL.createObjectURL(imageFile);
        setPreviewImageUrl(url);
      } else {
        showToast('Failed to generate preview', 'error');
      }
    } catch (error) {
      console.error('Failed to generate preview:', error);
      showToast('Failed to generate preview', 'error');
    } finally {
      setIsGeneratingPreview(false);
    }
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    if (previewImageUrl) {
      URL.revokeObjectURL(previewImageUrl);
      setPreviewImageUrl(null);
    }
  };

  const isIconVariant = variant === 'icon';
  const buttonBaseStyles = isIconVariant
    ? 'p-3 rounded-full'
    : 'inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-lg';
  const iconSize = isIconVariant ? 'w-5 h-5' : 'w-4 h-4';
  const ShareIcon = isMobileDevice() ? Share2 : LinkIcon;

  return (
    <>
      <ShareHiddenCard ref={cardRef} post={post} readTime={readTime} />

      <div className="flex items-center gap-2">
        <button
          onClick={onShareClick}
          className={cn(
            buttonBaseStyles,
            'border border-[var(--text-muted)]/20',
            'hover:bg-[var(--bg-card)] hover:border-[var(--accent)]',
            'transition-all duration-300 text-[var(--text-muted)] hover:text-[var(--accent)]',
            className
          )}
          aria-label="Share this post"
        >
          <ShareIcon className={iconSize} />
          {!isIconVariant && 'Share'}
        </button>
        {isDevelopment && (
          <button
            onClick={onPreviewClick}
            className={cn(
              buttonBaseStyles,
              'border border-[var(--text-muted)]/20',
              'hover:bg-[var(--bg-card)] hover:border-[var(--accent)]',
              'transition-all duration-300 text-[var(--text-muted)] hover:text-[var(--accent)]',
              className
            )}
            aria-label="Preview share image"
            title="Preview share image"
          >
            <Eye className={iconSize} />
            {!isIconVariant && 'Preview'}
          </button>
        )}
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
      {isDevelopment && (
        <SharePreviewModal
          isOpen={isPreviewOpen}
          onClose={handleClosePreview}
          imageUrl={previewImageUrl}
          isLoading={isGeneratingPreview}
        />
      )}
    </>
  );
}
