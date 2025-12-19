'use client';

import Image from 'next/image';
import { Icon, type IconName, RichText } from '@/components/ui';
import { Container } from '@/components/layout';
import { Reveal } from './Reveal';
import type { Author } from '@/lib/types';

interface AboutSectionProps {
  author: Author;
}

export function AboutSection({ author }: AboutSectionProps) {
  // Parse the author name to extract name parts, but prefer the explicit nickname field
  const nameParts = author.name.match(/(.+?)\s*"(.+?)"\s*(.+)/);
  const firstName = nameParts ? nameParts[1] : author.name.split(' ')[0];
  const parsedNickname = nameParts ? nameParts[2] : null;
  const lastName = nameParts ? nameParts[nameParts.length - 1] : author.name.split(' ').slice(1).join(' ');
  const nickname = author.nickname || parsedNickname;

  return (
    <section
      id="about"
      className="py-24 md:py-40 bg-[var(--bg-card)] border-t border-[var(--text-muted)]/10 relative overflow-hidden z-10"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <Reveal>
            <div className="md:sticky md:top-32 flex flex-col gap-8">
              <div>
                <h2 className="text-sm font-mono font-bold tracking-widest uppercase text-[var(--text-muted)] mb-8">
                  The Poet
                </h2>
                <h3 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-[var(--text-main)] mb-8 leading-tight">
                  {firstName} <br />
                  {nickname && (
                    <>
                      <span className="text-[var(--text-muted)] italic">&quot;{nickname}&quot;</span> <br />
                    </>
                  )}
                  {lastName}.
                </h3>
                <div className="w-full h-px bg-[var(--text-muted)]/20 my-8" />
                <div className="flex gap-4 md:gap-6">
                  {author.socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 md:p-4 border border-[var(--text-muted)]/20 rounded-full hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] transition-colors text-[var(--text-muted)]"
                      aria-label={link.label}
                    >
                      <Icon name={(link.icon as IconName) || 'link'} size={20} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Author Image at Bottom */}
              {author.image?.url && (
                <Reveal>
                  <div className="mt-8 aspect-[4/3] w-full overflow-hidden bg-[var(--bg-card)] rounded-sm relative">
                    <Image
                      src={author.image.url}
                      alt="Author"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized={author.image.url.startsWith('http')}
                    />
                  </div>
                </Reveal>
              )}
            </div>
          </Reveal>

          <div className="space-y-8 md:space-y-12">
            {author.bio.map((bioGroup, index) => {
              const iconMap: Record<string, 'book' | 'feather' | 'palette' | 'search'> = {
                'Academia': 'book',
                'Poetry': 'feather',
                'Writing': 'feather',
                'Research': 'search',
              };
              const iconName = iconMap[bioGroup.heading || ''] || 'book';

              return (
                <Reveal key={index} delay={100 + index * 100}>
                  <div className="bg-[var(--bg-main)] p-6 md:p-8 lg:p-12 border border-[var(--text-muted)]/10 rounded-sm">
                    {bioGroup.heading && (
                      <>
                        <Icon name={iconName} size={32} className="text-[var(--accent)] mb-6" />
                        <h4 className="text-xl md:text-2xl font-serif font-bold mb-4 text-[var(--text-main)]">
                          {bioGroup.heading}
                        </h4>
                      </>
                    )}
                    {bioGroup.body && (
                      <RichText content={bioGroup.body} className="text-[var(--text-muted)] leading-relaxed font-serif" />
                    )}
                    {bioGroup.subheading && (
                      <p className="text-[var(--text-muted)] leading-relaxed font-serif italic mt-4">
                        {bioGroup.subheading}
                      </p>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
