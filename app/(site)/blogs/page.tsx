import type { Metadata } from 'next';
import { Container } from '@/components/layout';
import { Reveal } from '@/components/sections';
import { PostGrid, SearchFilter } from '@/components/blog';
import { RichText } from '@/components/ui';
import { getAllPosts, getAllCategories, getSiteConfig } from '@/lib/hygraph';
import { generateMetadata as generatePageMetadata, getSiteUrl } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  const journalText = siteConfig.journalSectionText;
  const title = journalText?.heading || 'Anthology';
  const description = journalText?.subheading || journalText?.body?.text || 'Selected poems, academic essays, and literary commentary from Utkal University and beyond.';
  const blogsUrl = `${getSiteUrl()}/blogs`;

  return generatePageMetadata({
    title,
    description,
    siteName: siteConfig.siteName,
    url: blogsUrl,
    image: siteConfig.defaultSeo.ogImage,
  });
}

type SearchParams = {
  q?: string;
  category?: string;
}

export default async function BlogsPage(props: { searchParams: Promise<SearchParams> }) {
  const searchParams = await props.searchParams;
  const q = searchParams.q?.toLowerCase() || '';
  const categorySlug = searchParams.category || null;

  const siteConfig = await getSiteConfig();
  const { posts } = await getAllPosts();
  const categories = await getAllCategories();

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q);
    const matchesCategory = !categorySlug || post.category?.slug === categorySlug;
    return matchesSearch && matchesCategory;
  });

  const journalText = siteConfig.journalSectionText;

  const resultsText = () => {
    if (q || categorySlug) {
      return `${filteredPosts.length} result${filteredPosts.length !== 1 ? 's' : ''} found`;
    }
    return `${posts.length} posts`;
  };

  return (
    <div className="pt-24 min-h-screen bg-[var(--bg-main)]">
      <Container>
        <Reveal>
          <div className="mb-6 sm:mb-8 md:mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between md:gap-6 lg:gap-8 mb-4 sm:mb-6 md:mb-8">
              <div className="flex-1">
                {journalText?.heading && (
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[var(--text-main)] mb-3 sm:mb-4 md:mb-6">
                    {journalText.heading}
                  </h1>
                )}
                {journalText?.subheading && (
                  <p className="text-base sm:text-lg md:text-xl text-[var(--text-muted)] max-w-2xl font-serif italic">
                    {journalText.subheading}
                  </p>
                )}
                {journalText?.body && !journalText.subheading && (
                  <div className="text-base sm:text-lg md:text-xl text-[var(--text-muted)] max-w-2xl font-serif italic">
                    <RichText content={journalText.body} />
                  </div>
                )}
              </div>

              <div className="mt-4 sm:mt-6 md:mt-0 md:flex-shrink-0 md:w-72 lg:w-80">
                <SearchFilter
                  categories={categories}
                  compact
                />
              </div>
            </div>

            {/* Results count */}
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[var(--text-muted)]">
              {resultsText()}
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <PostGrid posts={filteredPosts} />
        </Reveal>

        <div className="h-12 sm:h-16 md:h-20" />
      </Container>
    </div>
  );
}
