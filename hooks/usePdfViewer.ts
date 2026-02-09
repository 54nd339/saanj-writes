'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface UsePdfViewerProps {
  pageLimit?: number;
}

export const usePdfViewer = ({ pageLimit }: UsePdfViewerProps = {}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [isWorkerReady, setIsWorkerReady] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const maxPages = pageLimit && pageLimit > 0 ? Math.min(pageLimit, numPages) : numPages;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('react-pdf').then((mod) => {
      mod.pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${mod.pdfjs.version}/build/pdf.worker.min.mjs`;
      setIsWorkerReady(true);
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = setTimeout(() => {
        setContainerWidth(entry.contentRect.width);
      }, 100);
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  }, []);

  const onDocumentLoadError = useCallback((err: Error) => {
    console.error('PDF Load Error:', err);
    setError(err.message);
    setIsLoading(false);
  }, []);

  const goToPrevPage = useCallback(() => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setPageNumber((prev) => Math.min(prev + 1, maxPages));
  }, [maxPages]);

  return {
    numPages,
    pageNumber,
    isLoading,
    error,
    containerWidth,
    isWorkerReady,
    containerRef,
    onDocumentLoadSuccess,
    onDocumentLoadError,
    goToPrevPage,
    goToNextPage,
    maxPages,
  };
};
