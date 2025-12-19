import { useRef, type RefObject } from 'react';
import { toBlob } from 'html-to-image';

interface UseShareImageReturn {
  generateShareImage: (cardRef: RefObject<HTMLDivElement | null>) => Promise<File | null>;
  cardRef: RefObject<HTMLDivElement | null>;
}

export function useShareImage(): UseShareImageReturn {
  const cardRef = useRef<HTMLDivElement>(null);

  const getBackgroundColor = (): string => {
    if (typeof window === 'undefined') return '#f3e8ff';

    const root = document.documentElement;
    const bgCardValue = window.getComputedStyle(root).getPropertyValue('--bg-card').trim();

    if (bgCardValue.startsWith('#')) {
      return bgCardValue;
    } else if (bgCardValue.startsWith('rgb')) {
      const matches = bgCardValue.match(/\d+/g);
      if (matches && matches.length >= 3) {
        const r = parseInt(matches[0]);
        const g = parseInt(matches[1]);
        const b = parseInt(matches[2]);
        return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
      }
    }

    return '#f3e8ff';
  };

  const generateShareImage = async (ref: RefObject<HTMLDivElement | null>): Promise<File | null> => {
    if (!ref.current) return null;

    // Capture the wrapper div (includes padding) instead of just the inner card
    const cardElement = ref.current;

    try {
      // Temporarily make card visible but off-screen for capture
      const container = ref.current.parentElement;
      let originalContainerStyle = '';
      if (container) {
        originalContainerStyle = container.style.cssText;
        container.style.position = 'fixed';
        container.style.left = '-10000px';
        container.style.top = '0';
        container.style.zIndex = '9999';
        container.style.opacity = '1';
        container.style.visibility = 'visible';
        container.style.pointerEvents = 'none';
      }

      // Wait for images to load
      const images = cardElement.querySelectorAll('img');
      if (images.length > 0) {
        await Promise.all(
          Array.from(images).map(
            (img) =>
              new Promise<void>((resolve) => {
                if (img.complete) {
                  resolve();
                } else {
                  img.onload = () => resolve();
                  img.onerror = () => resolve(); // Continue even if image fails
                  // Timeout after 3 seconds
                  setTimeout(() => resolve(), 3000);
                }
              })
          )
        );
      }

      // Wait for rendering and fonts
      await new Promise(resolve => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Additional delay to ensure everything is painted
            setTimeout(resolve, 100);
          });
        });
      });

      const bgCard = getBackgroundColor();

      const deviceWidth = typeof window !== 'undefined' ? window.innerWidth : 428;
      const deviceHeight = typeof window !== 'undefined' ? window.innerHeight : 700;

      const blob = await toBlob(cardElement as HTMLElement, {
        backgroundColor: bgCard,
        pixelRatio: 3,
        width: deviceWidth,
        height: deviceHeight,
        quality: 1,
        cacheBust: true,
      });

      // Restore original style after capture
      if (container) {
        container.style.cssText = originalContainerStyle;
      }

      if (blob && blob.size > 0) {
        return new File([blob], 'share-card.png', { type: 'image/png' });
      }

      return null;
    } catch (error) {
      console.error('Failed to generate share image:', error);
      const container = ref.current?.parentElement;
      if (container) {
        container.style.cssText = '';
        container.style.position = 'fixed';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.zIndex = '-1';
      }
      return null;
    }
  };

  return {
    generateShareImage,
    cardRef,
  };
}
