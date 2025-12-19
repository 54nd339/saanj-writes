import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BLOG } from './constants';
import type { Author } from './types';

/**
 * Merge Tailwind classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculate read time from content
 */
export function calculateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / BLOG.READ_TIME_WPM);
  return `${String(minutes).padStart(2, '0')} MIN`;
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
  }).toUpperCase().replace(',', '');
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Convert hex color to RGB string
 */
export function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0, 0, 0';
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

/**
 * Generate full URL for sharing
 */
export function getFullUrl(path: string): string {
  if (typeof window === 'undefined') return path;
  return `${window.location.origin}${path}`;
}

/**
 * Check if device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Check if Web Share API is available
 */
export function canShare(): boolean {
  if (typeof navigator === 'undefined') return false;
  return 'share' in navigator;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Slugify a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Ensure URL is absolute (for OG images and social sharing)
 */
export function getAbsoluteUrl(url: string | undefined | null): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://saanj.netlify.app';
  return `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
}

/**
 * Parse author name to extract first name, nickname, and last name
 */
export function parseAuthorName(author: Author): {
  firstName: string;
  nickname: string | null;
  lastName: string;
} {
  // Parse the author name to extract name parts, but prefer the explicit nickname field
  const nameParts = author.name.match(/(.+?)\s*"(.+?)"\s*(.+)/);
  const firstName = nameParts ? nameParts[1] : author.name.split(' ')[0];
  const parsedNickname = nameParts ? nameParts[2] : null;
  const lastName = nameParts
    ? nameParts[nameParts.length - 1]
    : author.name.split(' ').slice(1).join(' ');
  const nickname = author.nickname || parsedNickname;

  return { firstName, nickname, lastName };
}