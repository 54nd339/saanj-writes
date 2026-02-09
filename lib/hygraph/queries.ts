// ============================================
// GRAPHQL QUERIES FOR HYGRAPH
// ============================================

export const SITE_CONFIG_QUERY = `
  query SiteConfig($id: ID!) {
    siteConfig(where: { id: $id }) {
      siteName
      logo {
        url
        width
        height
      }
      contactEmail
      themeSettings {
        name
        light {
          bgMain { hex }
          bgCard { hex }
          textMain { hex }
          textMuted { hex }
          accent { hex }
          accentLight { hex }
        }
        dark {
          bgMain { hex }
          bgCard { hex }
          textMain { hex }
          textMuted { hex }
          accent { hex }
          accentLight { hex }
        }
      }
      defaultSeo {
        metaTitle
        metaDescription
        ogImage {
          url
          width
          height
        }
        noIndex
      }
      mainNavigation {
        label
        url
        type
        icon
        openInNewTab
      }
      footer {
        text {
          heading
          subheading
        }
        navButtons {
          label
          url
        }
        socialButtons {
          label
          url
          icon
        }
      }
      heroImage {
        url
        width
        height
      }
      heroText {
        eyebrow
        heading
        subheading
      }
      heroButtons {
        label
        url
        style
      }
      defaultAuthor {
        name
        nickname
        image {
          url
          width
          height
        }
        bio {
          eyebrow
          heading
          subheading
          body {
            raw
            html
            text
          }
        }
        socialLinks {
          label
          url
          icon
        }
      }
      showScrollIndicator
      journalSectionText {
        heading
        subheading
      }
    }
  }
`;

export const ALL_POSTS_QUERY = `
  query AllPosts($first: Int, $skip: Int, $where: PostWhereInput, $orderBy: PostOrderByInput) {
    posts(first: $first, skip: $skip, where: $where, orderBy: $orderBy) {
      slug
      title
      excerpt
      category {
        name
        slug
        color { hex }
      }
      publishDate
      content {
        text
      }
      coverImage {
        url
        width
        height
      }
      author {
        name
        nickname
        image { url }
      }
      isFeatured
      pdfDocument {
        url
        fileName
      }
      pdfPageLimit
    }
    postsConnection(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const FEATURED_POSTS_QUERY = `
  query FeaturedPosts {
    posts(where: { isFeatured: true }, orderBy: publishDate_DESC, first: 6) {
      slug
      title
      excerpt
      category {
        name
        slug
        color { hex }
      }
      publishDate
      content {
        text
      }
      coverImage {
        url
        width
        height
      }
      author {
        name
        nickname
      }
      isFeatured
      pdfDocument {
        url
        fileName
      }
      pdfPageLimit
    }
  }
`;

export const POST_BY_SLUG_QUERY = `
  query PostBySlug($slug: String!) {
    post(where: { slug: $slug }) {
      slug
      title
      excerpt
      category {
        name
        slug
        color { hex }
      }
      publishDate
      content {
        raw
        html
        text
      }
      coverImage {
        url
        width
        height
      }
      author {
        name
        nickname
        bio {
          eyebrow
          heading
          subheading
          body {
            raw
            html
            text
          }
        }
        image { url }
        socialLinks {
          label
          url
          icon
        }
      }
      isFeatured
      pdfDocument {
        url
        fileName
      }
      pdfPageLimit
    }
  }
`;

export const ALL_CATEGORIES_QUERY = `
  query AllCategories {
    categories {
      name
      slug
      color { hex }
    }
  }
`;

export const POST_SLUGS_QUERY = `
  query PostSlugs {
    posts {
      slug
    }
  }
`;

// Bulk query to fetch all posts with full details (for caching)
export const ALL_POSTS_FULL_QUERY = `
  query AllPostsFull {
    posts(orderBy: publishDate_DESC) {
      slug
      title
      excerpt
      category {
        name
        slug
        color { hex }
      }
      publishDate
      content {
        raw
        html
        text
      }
      coverImage {
        url
        width
        height
      }
      author {
        name
        nickname
        bio {
          eyebrow
          heading
          subheading
          body {
            raw
            html
            text
          }
        }
        image { url }
        socialLinks {
          label
          url
          icon
        }
      }
      isFeatured
      pdfDocument {
        url
        fileName
      }
      pdfPageLimit
    }
  }
`;

// Combined bulk query for site config, all posts, and categories
export const BULK_DATA_QUERY = `
  query BulkData($siteConfigId: ID!) {
    siteConfig(where: { id: $siteConfigId }) {
      siteName
      logo {
        url
        width
        height
      }
      contactEmail
      themeSettings {
        name
        light {
          bgMain { hex }
          bgCard { hex }
          textMain { hex }
          textMuted { hex }
          accent { hex }
          accentLight { hex }
        }
        dark {
          bgMain { hex }
          bgCard { hex }
          textMain { hex }
          textMuted { hex }
          accent { hex }
          accentLight { hex }
        }
      }
      defaultSeo {
        metaTitle
        metaDescription
        ogImage {
          url
          width
          height
        }
        noIndex
      }
      mainNavigation {
        label
        url
        type
        icon
        openInNewTab
      }
      footer {
        text {
          heading
          subheading
        }
        navButtons {
          label
          url
        }
        socialButtons {
          label
          url
          icon
        }
      }
      heroImage {
        url
        width
        height
      }
      heroText {
        eyebrow
        heading
        subheading
      }
      heroButtons {
        label
        url
        style
      }
      defaultAuthor {
        name
        nickname
        image {
          url
          width
          height
        }
        bio {
          eyebrow
          heading
          subheading
          body {
            raw
            html
            text
          }
        }
        socialLinks {
          label
          url
          icon
        }
      }
      showScrollIndicator
      journalSectionText {
        heading
        subheading
      }
    }
    posts(orderBy: publishDate_DESC) {
      slug
      title
      excerpt
      category {
        name
        slug
        color { hex }
      }
      publishDate
      content {
        raw
        html
        text
      }
      coverImage {
        url
        width
        height
      }
      author {
        name
        nickname
        bio {
          eyebrow
          heading
          subheading
          body {
            raw
            html
            text
          }
        }
        image { url }
        socialLinks {
          label
          url
          icon
        }
      }
      isFeatured
      pdfDocument {
        url
        fileName
      }
      pdfPageLimit
    }
    categories {
      name
      slug
      color { hex }
    }
    postsConnection {
      aggregate {
        count
      }
    }
  }
`;
