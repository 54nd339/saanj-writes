import type { Metadata } from 'next';
import { Hero, JournalSection, AboutSection } from '@/components/sections';
import { getSiteConfig, getFeaturedPosts } from '@/lib/hygraph';
import { generateDefaultMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  return generateDefaultMetadata(siteConfig);
}

export default async function HomePage() {
  const siteConfig = await getSiteConfig();
  const featuredPosts = await getFeaturedPosts();

  return (
    <>
      <Hero
        image={siteConfig.heroImage}
        text={siteConfig.heroText}
        buttons={siteConfig.heroButtons}
        showScrollIndicator={siteConfig.showScrollIndicator}
      />
      <JournalSection
        posts={featuredPosts}
      />
      <AboutSection
        author={siteConfig.defaultAuthor}
      />
    </>
  );
}
