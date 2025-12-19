// ============================================
// ANIMATION CONSTANTS
// ============================================

export const ANIMATION = {
  DURATION: {
    FAST: 0.2,
    NORMAL: 0.4,
    SLOW: 0.8,
    VERY_SLOW: 1.2,
  },
  EASE: {
    DEFAULT: [0.21, 0.47, 0.32, 0.98],
    SPRING: { type: 'spring', damping: 25, stiffness: 200 },
    SMOOTH: [0.4, 0, 0.2, 1],
  },
  DELAY: {
    STAGGER: 0.1,
    SECTION: 0.2,
  },
} as const;

// ============================================
// LAYOUT CONSTANTS
// ============================================

export const LAYOUT = {
  NAVBAR_HEIGHT: 80,
  NAVBAR_HEIGHT_SCROLLED: 64,
  CONTAINER_MAX_WIDTH: '1400px',
  SECTION_PADDING: {
    MOBILE: '3rem',
    TABLET: '5rem',
    DESKTOP: '10rem',
  },
} as const;

// ============================================
// BREAKPOINTS
// ============================================

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// ============================================
// PARALLAX CONSTANTS
// ============================================

export const PARALLAX = {
  HERO_Y_RANGE: [0, 400],
  HERO_OPACITY_RANGE: [1, 0.5],
  SCROLL_TRIGGER: 50,
} as const;

// ============================================
// BLOG CONSTANTS
// ============================================

export const BLOG = {
  POSTS_PER_PAGE: 9,
  EXCERPT_LENGTH: 150,
  READ_TIME_WPM: 200, // words per minute
} as const;

// ============================================
// SOCIAL ICONS MAP
// ============================================

export const SOCIAL_ICONS: Record<string, string> = {
  github: 'Github',
  twitter: 'Twitter',
  linkedin: 'Linkedin',
  instagram: 'Instagram',
  email: 'Mail',
} as const;

// ============================================
// ROUTE PATHS
// ============================================

export const ROUTES = {
  HOME: '/',
  BLOGS: '/blogs',
  JOURNAL_ANCHOR: '/#journal',
  ABOUT_ANCHOR: '/#about',
} as const;
