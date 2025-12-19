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
      authorImage {
        url
        width
        height
      }
      authorName
      authorBio {
        eyebrow
        heading
        subheading
        body {
          raw
          html
          text
        }
      }
      authorSocialLinks {
        label
        url
        icon
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
        bio { raw html text }
        image { url }
        socialLinks {
          label
          url
          icon
        }
      }
      isFeatured
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
