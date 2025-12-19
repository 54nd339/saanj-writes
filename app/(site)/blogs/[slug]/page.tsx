import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostDetail } from '@/components/blog';
import { getPostBySlug, getAllPostSlugs, getSiteConfig } from '@/lib/hygraph';
import { generateMetadata as generatePageMetadata, getSiteUrl } from '@/lib/metadata';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const siteConfig = await getSiteConfig();

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const postUrl = `${getSiteUrl()}/blogs/${slug}`;

  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    siteName: siteConfig.siteName,
    url: postUrl,
    image: post.coverImage,
    type: 'article',
    publishedTime: post.publishDate,
    authors: post.author ? [post.author.name] : undefined,
    section: post.category?.name,
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <PostDetail post={post} />;
}
