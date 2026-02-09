// ============================================
// HYGRAPH CMS TYPES
// ============================================

export interface Asset {
  url: string;
  fileName?: string;
  width?: number;
  height?: number;
}

export interface RichTextContent {
  raw: {
    children: Array<{
      type: string;
      children: Array<{
        text?: string;
        [key: string]: unknown;
      }>;
    }>;
  };
  html?: string;
  text?: string;
}

export interface Category {
  name: string;
  slug: string;
  color?: { hex: string };
}

export interface Author {
  name: string;
  nickname?: string;
  bio: TextGroup[];
  image: Asset;
  socialLinks: Button[];
}

export type ButtonType = 'cta' | 'link' | 'nav' | 'social';
export type ButtonStyle = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';

export interface Button {
  label: string;
  url: string;
  type?: ButtonType;
  style?: ButtonStyle;
  icon?: string;
  openInNewTab?: boolean;
}

export interface TextGroup {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  body?: RichTextContent;
}

export interface ThemeColors {
  bgMain: string;
  bgCard: string;
  textMain: string;
  textMuted: string;
  accent: string;
  accentLight: string;
}

export interface ThemeSetting {
  name: string;
  light: ThemeColors;
  dark: ThemeColors;
}

export interface Seo {
  metaTitle: string;
  metaDescription: string;
  ogImage?: Asset;
  noIndex?: boolean;
}

export interface FooterBlock {
  text?: TextGroup;
  navButtons?: Button[];
  socialButtons?: Button[];
}

export interface SiteConfig {
  siteName: string;
  logo?: Asset;
  contactEmail?: string;
  themeSettings: ThemeSetting;
  defaultSeo: Seo;
  mainNavigation: Button[];
  footer: FooterBlock;
  // Content
  heroImage: Asset;
  heroText: TextGroup;
  heroButtons: Button[];
  defaultAuthor: Author;
  showScrollIndicator: boolean;
  journalSectionText: TextGroup;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category?: Category;
  publishDate: string;
  content: RichTextContent;
  coverImage: Asset;
  author?: Author;
  isFeatured?: boolean;
  pdfDocument?: Asset;
  pdfPageLimit?: number;
}

// ============================================
// COMPONENT PROP TYPES
// ============================================

export interface NavItem {
  label: string;
  href: string;
  isAnchor?: boolean;
}

export interface ShareData {
  title: string;
  text: string;
  url: string;
  image?: string;
}
