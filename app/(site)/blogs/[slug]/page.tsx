import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostDetail } from '@/components/blog';
import { getPostBySlug, getAllPostSlugs, getSiteConfig } from '@/lib/hygraph';

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

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ${siteConfig.siteName}`,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage.url] : [],
      type: 'article',
      publishedTime: post.publishDate,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <PostDetail post={post} />;
}
