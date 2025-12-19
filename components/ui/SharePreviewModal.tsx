'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SharePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  isLoading: boolean;
}

export function SharePreviewModal({
  isOpen,
  onClose,
  imageUrl,
  isLoading,
}: SharePreviewModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer state update to avoid synchronous setState warning
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 pointer-events-none"
          >
            <div
              className={cn(
                'relative bg-[var(--bg-card)] rounded-xl sm:rounded-2xl shadow-2xl border border-[var(--text-muted)]/10',
                'max-w-2xl w-full max-h-[90vh] sm:max-h-[95vh] overflow-auto pointer-events-auto',
                'mx-2 sm:mx-4 md:mx-0'
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-b border-[var(--text-muted)]/10">
                <h3 className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[var(--text-main)]">
                  Share Preview
                </h3>
                <button
                  onClick={onClose}
                  className={cn(
                    'p-1.5 sm:p-2 rounded-lg border border-[var(--text-muted)]/20',
                    'hover:bg-[var(--bg-main)] hover:border-[var(--accent)]',
                    'transition-all duration-200 text-[var(--text-muted)] hover:text-[var(--accent)]'
                  )}
                  aria-label="Close preview"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              <div className="p-3 sm:p-4 md:p-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12 sm:py-16 md:py-20">
                    <div className="text-center">
                      <div className="inline-block w-6 h-6 sm:w-8 sm:h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin mb-3 sm:mb-4" />
                      <p className="font-mono text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-widest">
                        Generating Preview...
                      </p>
                    </div>
                  </div>
                ) : imageUrl ? (
                  <div className="flex items-center justify-center relative w-full px-1 sm:px-2 md:px-0">
                    <Image
                      src={imageUrl}
                      alt="Share card preview"
                      width={800}
                      height={1000}
                      className="max-w-full h-auto rounded-lg shadow-lg"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-12 sm:py-16 md:py-20">
                    <p className="font-mono text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-widest">
                      Failed to generate preview
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
