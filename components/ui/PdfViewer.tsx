'use client';

import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';
import { usePdfViewer } from '@/hooks';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const Document = dynamic(
  () => import('react-pdf').then((mod) => mod.Document),
  { ssr: false }
);
const Page = dynamic(
  () => import('react-pdf').then((mod) => mod.Page),
  { ssr: false }
);

interface PdfViewerProps {
  url: string;
  fileName?: string;
  pageLimit?: number;
  className?: string;
}

const Loader = ({ text = 'Loading...' }: { text?: string }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[var(--bg-card)] z-10">
    <div
      className={cn(
        'w-8 h-8 rounded-full',
        'border-2 border-[var(--text-muted)]/30 border-t-[var(--accent)]',
        'animate-spin'
      )}
    />
    <p className="font-mono text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider">
      {text}
    </p>
  </div>
);

export function PdfViewer({ url, fileName, pageLimit, className }: PdfViewerProps) {
  const {
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
  } = usePdfViewer({ pageLimit });

  if (error) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-3 aspect-[3/4]',
          'bg-[var(--bg-card)] rounded-lg border border-[var(--text-muted)]/20',
          'text-[var(--text-muted)]',
          className
        )}
      >
        <Icon name="alertCircle" size={24} />
        <p className="font-mono text-xs sm:text-sm uppercase tracking-wider">
          Failed to load PDF
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-[var(--bg-card)] rounded-lg overflow-hidden',
        'border border-[var(--text-muted)]/20',
        className
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'flex flex-col sm:flex-row sm:items-center justify-between gap-2',
          'px-3 py-2.5 sm:px-5 sm:py-3',
          'bg-[var(--bg-main)] border-b border-[var(--text-muted)]/20'
        )}
      >
        <div className="flex items-center gap-2 text-[var(--text-main)]">
          <Icon name="fileText" size={16} />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider truncate max-w-[200px] sm:max-w-none">
            {fileName || 'Document'}
          </span>
        </div>
        {pageLimit && numPages > pageLimit && (
          <span className="font-mono text-[10px] sm:text-xs text-[var(--text-muted)] italic">
            Preview: {pageLimit} of {numPages} pages
          </span>
        )}
      </div>

      {/* Document Container */}
      <div
        ref={containerRef}
        className={cn(
          'relative flex items-start justify-center',
          'aspect-[3/4] bg-[var(--bg-card)] overflow-y-auto overflow-x-hidden'
        )}
      >
        {(!isWorkerReady || isLoading || containerWidth === 0) && <Loader text={!isWorkerReady ? "Initializing..." : "Loading document..."} />}

        {isWorkerReady && (
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={null}
            className="flex justify-center w-full"
            error={null}
          >
            {containerWidth > 0 && (
              <Page
                pageNumber={pageNumber}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                width={containerWidth}
                className="shadow-lg"
                loading={null}
              />
            )}
          </Document>
        )}
      </div>

      {/* Controls */}
      {!isLoading && !error && numPages > 0 && (
        <div
          className={cn(
            'flex items-center justify-center gap-4 sm:gap-6',
            'px-3 py-2.5 sm:px-4 sm:py-3',
            'bg-[var(--bg-main)] border-t border-[var(--text-muted)]/20'
          )}
        >
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            aria-label="Previous page"
            className={cn(
              'flex items-center justify-center',
              'w-9 h-9 sm:w-10 sm:h-10 rounded-full',
              'border border-[var(--text-muted)]/30 bg-[var(--bg-card)]',
              'text-[var(--text-main)] transition-all duration-200',
              'hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-white',
              'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[var(--bg-card)] disabled:hover:border-[var(--text-muted)]/30 disabled:hover:text-[var(--text-main)]',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2'
            )}
          >
            <Icon name="chevronLeft" size={18} />
          </button>

          <span className="font-mono text-xs sm:text-sm text-[var(--text-muted)] min-w-[60px] text-center tabular-nums">
            {pageNumber} / {maxPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={pageNumber >= maxPages}
            aria-label="Next page"
            className={cn(
              'flex items-center justify-center',
              'w-9 h-9 sm:w-10 sm:h-10 rounded-full',
              'border border-[var(--text-muted)]/30 bg-[var(--bg-card)]',
              'text-[var(--text-main)] transition-all duration-200',
              'hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-white',
              'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[var(--bg-card)] disabled:hover:border-[var(--text-muted)]/30 disabled:hover:text-[var(--text-main)]',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2'
            )}
          >
            <Icon name="chevronRight" size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
