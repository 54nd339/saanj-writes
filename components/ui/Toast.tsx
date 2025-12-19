'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const icons = {
  success: Check,
  error: X,
  info: null,
};

const styles = {
  success: 'bg-green-500/90 text-white',
  error: 'bg-red-500/90 text-white',
  info: 'bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--text-muted)]/20',
};

export function Toast({
  message,
  type = 'success',
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    // Defer state update to avoid synchronous setState warning
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const Icon = icons[type];

  const toastContent = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={cn(
            'fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]',
            'px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm',
            'flex items-center gap-3 font-mono text-sm',
            'pointer-events-auto',
            styles[type]
          )}
        >
          {Icon && <Icon className="w-4 h-4" />}
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Use portal to render at document body level to avoid positioning issues
  if (!mounted) return null;
  return createPortal(toastContent, document.body);
}

// Hook for toast management
export function useToast() {
  const [toast, setToast] = React.useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  return { toast, showToast, hideToast };
}
