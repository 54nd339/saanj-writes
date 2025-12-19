// ============================================
// BUILD-TIME CACHE FOR HYGRAPH DATA
// ============================================
// This cache persists during the build process to avoid duplicate API calls

import type { SiteConfig, Post, Category } from '@/lib/types';

interface CacheData {
  siteConfig: SiteConfig | null;
  posts: Post[] | null;
  categories: Category[] | null;
  postsBySlug: Map<string, Post> | null;
}

// In-memory cache that persists during build
const cache: CacheData = {
  siteConfig: null,
  posts: null,
  categories: null,
  postsBySlug: null,
};

let isInitialized = false;

export function getCachedSiteConfig(): SiteConfig | null {
  return cache.siteConfig;
}

export function setCachedSiteConfig(config: SiteConfig): void {
  cache.siteConfig = config;
}

export function getCachedPosts(): Post[] | null {
  return cache.posts;
}

export function setCachedPosts(posts: Post[]): void {
  cache.posts = posts;
  // Build slug map for quick lookups
  cache.postsBySlug = new Map(posts.map((post) => [post.slug, post]));
}

export function getCachedPostBySlug(slug: string): Post | null {
  return cache.postsBySlug?.get(slug) || null;
}

export function getCachedCategories(): Category[] | null {
  return cache.categories;
}

export function setCachedCategories(categories: Category[]): void {
  cache.categories = categories;
}

export function isCacheInitialized(): boolean {
  return isInitialized;
}

export function markCacheInitialized(): void {
  isInitialized = true;
}

export function clearCache(): void {
  cache.siteConfig = null;
  cache.posts = null;
  cache.categories = null;
  cache.postsBySlug = null;
  isInitialized = false;
}
