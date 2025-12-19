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
    icon?: React.ReactNode;
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
    <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center pt-24">
      <Container size="narrow" className="text-center">
        <div className="mb-12">
          <h1 className="text-8xl md:text-9xl font-serif font-bold text-[var(--accent)] mb-6">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--text-main)] mb-4">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-muted)] mb-8 font-serif italic max-w-md mx-auto">
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

        <div className="mt-16 pt-8 border-t border-[var(--text-muted)]/20">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
            {siteName ? `${siteName} • 404` : '404'}
          </p>
        </div>
      </Container>
    </div>
  );
}
