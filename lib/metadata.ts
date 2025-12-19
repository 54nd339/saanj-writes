import type { Metadata } from 'next';
import type { Asset } from './types';
import { getAbsoluteUrl } from './utils';

interface GenerateMetadataOptions {
  title: string;
  description: string;
  siteName: string;
  url?: string;
  image?: Asset | {
    url?: string | null;
    width?: number | null;
    height?: number | null;
    alt?: string;
  } | null;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  noIndex?: boolean;
  template?: string;
  other?: Record<string, string>;
}

function assetToImage(asset: Asset | null | undefined, alt?: string): {
  url: string | null;
  width?: number | null;
  height?: number | null;
  alt?: string;
} | undefined {
  if (!asset?.url) return undefined;
  return {
    url: asset.url,
    width: asset.width,
    height: asset.height,
    alt,
  };
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://saanj.netlify.app';
}

export function generateMetadata({
  title,
  description,
  siteName,
  url,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
  noIndex = false,
  template,
  other,
}: GenerateMetadataOptions): Metadata {
  const siteUrl = getSiteUrl();
  const pageUrl = url || siteUrl;
  
  // Handle both Asset and image object formats
  const imageData = image && typeof image === 'object' && 'alt' in image
    ? image 
    : assetToImage(image as Asset | null | undefined, title);
  const ogImage = getAbsoluteUrl(imageData?.url);
  
  // Development warnings for SEO best practices
  if (process.env.NODE_ENV === 'development') {
    const titleLength = template ? title.length : title.length;
    if (titleLength > 60) {
      console.warn(`[SEO] Title is ${titleLength} characters (recommended: 50-60): "${title}"`);
    }
    if (description.length > 160) {
      console.warn(`[SEO] Description is ${description.length} characters (recommended: 150-160): "${description.substring(0, 50)}..."`);
    }
  }

  const metadata: Metadata = {
    title: template ? { default: title, template } : title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: template ? title : `${title} | ${siteName}`,
      description,
      url: pageUrl,
      siteName,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: imageData?.width || 1200,
              height: imageData?.height || 630,
              alt: imageData?.alt || title,
            },
          ]
        : [],
      type,
      locale: 'en_US',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && authors.length > 0 && { 
        authors: authors.map(author => ({ name: author }))
      }),
      ...(section && { section }),
      ...(tags && tags.length > 0 && { tags }),
    },
    // Apple-specific tags for iOS
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
    },
    ...(other && { other }),
  };

  return metadata;
}

export async function generateDefaultMetadata(
  siteConfig: {
    siteName: string;
    defaultSeo: {
      metaTitle: string;
      metaDescription: string;
      ogImage?: Asset | null;
      noIndex?: boolean;
    };
  },
  options?: {
    url?: string;
  }
): Promise<Metadata> {
  return generateMetadata({
    title: siteConfig.defaultSeo.metaTitle,
    description: siteConfig.defaultSeo.metaDescription,
    siteName: siteConfig.siteName,
    url: options?.url,
    image: siteConfig.defaultSeo.ogImage,
    noIndex: siteConfig.defaultSeo.noIndex,
    other: {
      'Content-Language': 'en',
      'google': 'notranslate',
    },
  });
}
