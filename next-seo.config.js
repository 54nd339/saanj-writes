const description = `Discover deep analyses, creative expressions, and literary critiques crafted to inspire and engage readers and enthusiasts of literature and the arts.`
const title = `A Literary Exploration of Poems, Stories, and Critical Insights`
const url = `https://saanj.netlify.app`

const seo = {
  title,
  titleTemplate: '%s | Saanj Writes',
  description,
  openGraph: {
    description,
    title,
    type: 'website',
    url
  },
  twitter: {
    handle: '@psammead',
    site: '@Psammead'
  }
}

export { seo as defaultSEO, url as defaultUrl }
