import type { ReactNode } from 'react';
import { Container } from '@/components/layout';
import { Button, Icon } from '@/components/ui';
import { ROUTES } from '@/lib/constants';

interface NotFoundProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showBlogsButton?: boolean;
  siteName?: string;
  primaryAction?: {
    label: string;
    href: string;
    icon?: ReactNode;
  };
}

export function NotFound({
  title = 'Page Not Found',
  message = "The page you're looking for seems to have wandered off into the literary ether.",
  showHomeButton = true,
  showBlogsButton = true,
  siteName,
  primaryAction,
}: NotFoundProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center pt-20 sm:pt-24">
      <Container size="narrow" className="text-center px-4">
        <div className="mb-10 sm:mb-12">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-[var(--accent)] mb-4 sm:mb-6">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[var(--text-main)] mb-3 sm:mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[var(--text-muted)] mb-6 sm:mb-8 font-serif italic max-w-md mx-auto">
            {message}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {primaryAction ? (
            <Button
              href={primaryAction.href}
              variant="primary"
              icon={primaryAction.icon}
              iconPosition="left"
            >
              {primaryAction.label}
            </Button>
          ) : (
            <>
              {showHomeButton && (
                <Button
                  href={ROUTES.HOME}
                  variant="primary"
                  icon={<Icon name="arrowLeft" size={14} />}
                  iconPosition="left"
                >
                  Back to Home
                </Button>
              )}
              {showBlogsButton && (
                <Button
                  href={ROUTES.BLOGS}
                  variant="outline"
                  icon={<Icon name="book" size={14} />}
                  iconPosition="left"
                >
                  Browse Anthology
                </Button>
              )}
            </>
          )}
        </div>

        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-[var(--text-muted)]/20">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[var(--text-muted)]">
            {siteName ? `${siteName} • 404` : '404'}
          </p>
        </div>
      </Container>
    </div>
  );
}
