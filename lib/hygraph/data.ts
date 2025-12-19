import { fetchHygraph } from './client';
import {
  SITE_CONFIG_QUERY,
  ALL_POSTS_QUERY,
  FEATURED_POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  ALL_CATEGORIES_QUERY,
  POST_SLUGS_QUERY,
  BULK_DATA_QUERY,
} from './queries';
import type { SiteConfig, Post, Category } from '@/lib/types';
import {
  getCachedSiteConfig,
  setCachedSiteConfig,
  getCachedPosts,
  setCachedPosts,
  getCachedPostBySlug,
  getCachedCategories,
  setCachedCategories,
  isCacheInitialized,
  markCacheInitialized,
  clearCache,
} from './cache';

// ============================================
// DATA FETCHING FUNCTIONS
// ============================================

/**
 * Bulk fetch all data in a single Hygraph call
 * This should be called early in the build process to populate the cache
 */
export async function fetchBulkData(): Promise<{
  siteConfig: SiteConfig;
  posts: Post[];
  categories: Category[];
  totalPosts: number;
}> {
  const siteConfigId = process.env.SITE_CONFIG_HYGRAPH_ID;

  if (!siteConfigId) {
    throw new Error('SITE_CONFIG_HYGRAPH_ID environment variable is required');
  }

  // Clear cache in development mode to ensure fresh data
  if (process.env.NODE_ENV === 'development') {
    clearCache();
  }

  const data = await fetchHygraph<{
    siteConfig: SiteConfig;
    posts: Post[];
    categories: Category[];
    postsConnection: { aggregate: { count: number } };
  }>(BULK_DATA_QUERY, {
    siteConfigId,
  });

  if (!data.siteConfig) {
    throw new Error(`SiteConfig with ID ${siteConfigId} not found`);
  }

  setCachedSiteConfig(data.siteConfig);
  setCachedPosts(data.posts);
  setCachedCategories(data.categories);
  markCacheInitialized();

  return {
    siteConfig: data.siteConfig,
    posts: data.posts,
    categories: data.categories,
    totalPosts: data.postsConnection.aggregate.count,
  };
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const cached = getCachedSiteConfig();
  if (cached) {
    return cached;
  }

  if (!isCacheInitialized()) {
    const bulkData = await fetchBulkData();
    return bulkData.siteConfig;
  }

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

  setCachedSiteConfig(data.siteConfig);
  return data.siteConfig;
}

export async function getAllPosts(
  first?: number,
  skip?: number,
  where?: unknown,
  orderBy?: string
): Promise<{ posts: Post[]; total: number }> {
  const cached = getCachedPosts();
  if (cached) {
    let filtered = [...cached];

    // Apply filters if provided
    if (where) {
      // Simple where filtering - extend as needed
      const whereObj = where as Record<string, unknown>;
      if (whereObj.isFeatured !== undefined) {
        filtered = filtered.filter((post) => post.isFeatured === whereObj.isFeatured);
      }
      if (whereObj.category) {
        const categoryFilter = whereObj.category as { slug?: { equals?: string } };
        if (categoryFilter.slug?.equals) {
          filtered = filtered.filter((post) => post.category?.slug === categoryFilter.slug?.equals);
        }
      }
    }

    // Apply sorting
    if (orderBy) {
      if (orderBy === 'publishDate_DESC') {
        filtered.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
      } else if (orderBy === 'publishDate_ASC') {
        filtered.sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime());
      }
    }

    const total = filtered.length;

    // Apply pagination
    if (skip !== undefined) {
      filtered = filtered.slice(skip);
    }
    if (first !== undefined) {
      filtered = filtered.slice(0, first);
    }

    return {
      posts: filtered,
      total,
    };
  }

  if (!isCacheInitialized()) {
    await fetchBulkData();
    return getAllPosts(first, skip, where, orderBy); // Recursive call now that cache is populated
  }

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
  const cached = getCachedPosts();
  if (cached) {
    return cached
      .filter((post) => post.isFeatured)
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .slice(0, 6);
  }

  if (!isCacheInitialized()) {
    await fetchBulkData();
    return getFeaturedPosts(); // Recursive call now that cache is populated
  }

  const data = await fetchHygraph<{ posts: Post[] }>(FEATURED_POSTS_QUERY);
  return data.posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const cached = getCachedPostBySlug(slug);
  if (cached) {
    return cached;
  }

  if (!isCacheInitialized()) {
    await fetchBulkData();
    return getCachedPostBySlug(slug); // Check cache again after bulk fetch
  }

  const data = await fetchHygraph<{ post: Post | null }>(POST_BY_SLUG_QUERY, { slug });
  if (data.post) {
    const allCached = getCachedPosts();
    if (allCached) {
      setCachedPosts([...allCached, data.post]);
    }
  }
  return data.post;
}

export async function getAllCategories(): Promise<Category[]> {
  const cached = getCachedCategories();
  if (cached) {
    return cached;
  }

  if (!isCacheInitialized()) {
    const bulkData = await fetchBulkData();
    return bulkData.categories;
  }

  const data = await fetchHygraph<{ categories: Category[] }>(ALL_CATEGORIES_QUERY);
  setCachedCategories(data.categories);
  return data.categories;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const cached = getCachedPosts();
  if (cached) {
    return cached.map((post) => post.slug);
  }

  if (!isCacheInitialized()) {
    const bulkData = await fetchBulkData();
    return bulkData.posts.map((post) => post.slug);
  }

  const data = await fetchHygraph<{ posts: { slug: string }[] }>(POST_SLUGS_QUERY);
  return data.posts.map((post) => post.slug);
}
