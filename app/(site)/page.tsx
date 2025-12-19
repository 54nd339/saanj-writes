import { Hero, JournalSection, AboutSection } from '@/components/sections';
import { getSiteConfig, getFeaturedPosts } from '@/lib/hygraph';

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
        authorName={siteConfig.authorName}
        authorBio={siteConfig.authorBio}
        authorImage={siteConfig.authorImage}
        socialLinks={siteConfig.authorSocialLinks}
      />
    </>
  );
}
