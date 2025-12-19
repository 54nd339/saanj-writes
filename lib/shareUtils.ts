import { copyToClipboard, getFullUrl, isMobileDevice, formatDate } from './utils';
import type { Post } from './types';
import type { RefObject } from 'react';

export function buildShareText(post: Post): string {
  const shareTextParts: string[] = [post.title];

  if (post.author || post.publishDate) {
    const metaParts: string[] = [];
    if (post.author) metaParts.push(`By ${post.author.name}`);
    if (post.publishDate) metaParts.push(formatDate(post.publishDate));
    if (metaParts.length > 0) {
      shareTextParts.push(metaParts.join(' • '));
    }
  }
  
  if (post.excerpt) {
    shareTextParts.push(`${post.excerpt}\n\nRead more at: `);
  }

  return shareTextParts.join('\n\n');
}

interface HandleShareParams {
  post: Post;
  url: string;
  generateShareImage: (cardRef: RefObject<HTMLDivElement | null>) => Promise<File | null>;
  cardRef: RefObject<HTMLDivElement | null>;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export async function handleShare({
  post,
  url,
  generateShareImage,
  cardRef,
  onSuccess,
  onError,
}: HandleShareParams): Promise<void> {
  const fullUrl = getFullUrl(url);

  // Desktop: Copy link to clipboard
  if (!isMobileDevice()) {
    const success = await copyToClipboard(fullUrl);
    if (success) {
      onSuccess?.('Link copied to clipboard!');
    } else {
      onError?.('Failed to copy link');
    }
    return;
  }

  // Mobile: Generate image card and share
  if (typeof navigator !== 'undefined' && 'share' in navigator) {
    try {
      const shareImage = await generateShareImage(cardRef);
      
      if (shareImage && navigator.canShare && navigator.canShare({ files: [shareImage] })) {
        const shareText = buildShareText(post);
        let textWithUrl: string;
        
        if (shareText.endsWith('Read more at: ')) {
          textWithUrl = `${shareText}${fullUrl}`;
        } else {
          textWithUrl = `${shareText}\n\n🔗 ${fullUrl}`;
        }
        
        await navigator.share({
          title: post.title,
          text: textWithUrl,
          url: fullUrl,
          files: [shareImage],
        });
      } else {
        // Fallback to text share if image sharing not supported
        await navigator.share({
          title: post.title,
          text: buildShareText(post),
          url: fullUrl,
        });
      }
    } catch (err) {
      // User cancelled or error
      if ((err as Error).name !== 'AbortError') {
        const success = await copyToClipboard(fullUrl);
        if (success) {
          onSuccess?.('Link copied to clipboard!');
        }
      }
    }
  } else {
    // Web Share API not available - copy link
    const success = await copyToClipboard(fullUrl);
    if (success) {
      onSuccess?.('Link copied to clipboard!');
    } else {
      onError?.('Share not supported');
    }
  }
}
