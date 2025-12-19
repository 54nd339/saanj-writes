import { fetchHygraph } from './client';
import {
  SITE_CONFIG_QUERY,
  ALL_POSTS_QUERY,
  FEATURED_POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  ALL_CATEGORIES_QUERY,
  POST_SLUGS_QUERY,
} from './queries';
import type { SiteConfig, Post, Category } from '@/lib/types';

// ============================================
// DATA FETCHING FUNCTIONS
// ============================================

export async function getSiteConfig(): Promise<SiteConfig> {
  const siteConfigId = process.env.SITE_CONFIG_HYGRAPH_ID;
  
  if (!siteConfigId) {
    throw new Error('SITE_CONFIG_HYGRAPH_ID environment variable is required');
  }

  const data = await fetchHygraph<{ siteConfig: SiteConfig }>(SITE_CONFIG_QUERY, {
    id: siteConfigId,
  });
  
  if (!data.siteConfig) {
    throw new Error(`SiteConfig with ID ${siteConfigId} not found`);
  }
  
  return data.siteConfig;
}

export async function getAllPosts(
  first?: number,
  skip?: number,
  where?: unknown,
  orderBy?: string
): Promise<{ posts: Post[]; total: number }> {
  const variables: Record<string, unknown> = {};
  if (first !== undefined) variables.first = first;
  if (skip !== undefined) variables.skip = skip;
  if (where) variables.where = where;
  if (orderBy) variables.orderBy = orderBy;

  const data = await fetchHygraph<{
    posts: Post[];
    postsConnection: { aggregate: { count: number } };
  }>(ALL_POSTS_QUERY, variables);

  return {
    posts: data.posts,
    total: data.postsConnection.aggregate.count,
  };
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const data = await fetchHygraph<{ posts: Post[] }>(FEATURED_POSTS_QUERY);
  return data.posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const data = await fetchHygraph<{ post: Post | null }>(POST_BY_SLUG_QUERY, { slug });
  return data.post;
}

export async function getAllCategories(): Promise<Category[]> {
  const data = await fetchHygraph<{ categories: Category[] }>(ALL_CATEGORIES_QUERY);
  return data.categories;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const data = await fetchHygraph<{ posts: { slug: string }[] }>(POST_SLUGS_QUERY);
  return data.posts.map((post) => post.slug);
}
