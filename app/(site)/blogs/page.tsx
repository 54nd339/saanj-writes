import type { Metadata } from 'next';
import { BlogsPageContent } from './BlogsPageContent';
import { getAllPosts, getAllCategories, getSiteConfig } from '@/lib/hygraph';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  const journalText = siteConfig.journalSectionText;
  const title = journalText?.heading || 'Anthology';
  const description = journalText?.subheading || journalText?.body?.text || 'Selected poems, academic essays, and literary commentary from Utkal University and beyond.';
  
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.siteName}`,
      description,
    },
  };
}

export default async function BlogsPage() {
  const siteConfig = await getSiteConfig();
  const { posts } = await getAllPosts();
  const categories = await getAllCategories();

  return (
    <div className="pt-24 min-h-screen bg-[var(--bg-main)]">
      <BlogsPageContent 
        initialPosts={posts} 
        categories={categories}
        journalText={siteConfig.journalSectionText}
      />
    </div>
  );
}
