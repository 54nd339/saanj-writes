import Link from 'next/link';
import { Icon, type IconName } from '@/components/ui';
import { Container } from './Container';
import type { FooterBlock } from '@/lib/types';

interface FooterProps {
  siteName: string;
  footer: FooterBlock;
  location?: string;
  year?: string;
}

export function Footer({ siteName, footer, location = 'Bhubaneswar, Odisha', year = '2025' }: FooterProps) {
  return (
    <footer className="bg-black text-white pt-20 sm:pt-24 md:pt-32 pb-8 sm:pb-10 md:pb-12 relative overflow-hidden z-10">
      {/* Giant Background Text */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 overflow-hidden flex items-center justify-center">
        <span className="text-[20vw] sm:text-[22vw] md:text-[25vw] font-serif font-bold whitespace-nowrap text-white/10">
          {siteName.split('.')[0].toUpperCase()}
        </span>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 mb-16 sm:mb-24">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4 sm:mb-6 text-white">{siteName}</h2>
            {footer.text?.subheading && (
              <p className="text-white/60 max-w-sm text-base sm:text-lg font-serif italic">
                {footer.text.subheading}
              </p>
            )}
          </div>

          {footer.navButtons && footer.navButtons.length > 0 && (
            <div>
              <h4 className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/40 mb-6 sm:mb-8">
                Navigation
              </h4>
              <ul className="space-y-3 sm:space-y-4 font-serif text-lg sm:text-xl text-white/80">
                {footer.navButtons.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.url}
                      className="hover:text-[var(--accent)] hover:pl-2 sm:hover:pl-4 transition-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {footer.socialButtons && footer.socialButtons.length > 0 && (
            <div>
              <h4 className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/40 mb-6 sm:mb-8">
                Connect
              </h4>
              <ul className="space-y-3 sm:space-y-4 font-serif text-lg sm:text-xl text-white/80">
                {footer.socialButtons.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-2"
                    >
                      {link.icon && <Icon name={link.icon as IconName} size={16} className="sm:w-[18px] sm:h-[18px]" />}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/10 pt-6 sm:pt-8 font-mono text-[10px] sm:text-xs text-white/40 uppercase tracking-widest gap-4">
          <div>
            <p>© {year} {siteName.split('.')[0]}</p>
            <p className="mt-1 sm:mt-2">All Rights Reserved.</p>
          </div>
          <div className="text-left md:text-right">
            <p>{location}</p>
            <p className="mt-1 sm:mt-2 text-white/40">Est. {year}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
