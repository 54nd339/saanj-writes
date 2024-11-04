# Saanj Writes

> A [Next.js](https://nextjs.org/) project for [Saanj Writes](https://saanj.netlify.app) page with [Hygraph](https://hygraph.com)

[![Clone project](https://hygraph.com/button)](https://app.hygraph.com/clone/9293b6817c08451ca121f63d7d32b61a?name=Saanj%20Writes%20V2)

## Quick start

1. Clone the repository and install project dependencies.

2. **Provide your Hygraph project keys**

Navigate into your new site’s directory and copy the `.env.local.example` file.

```shell
cp .env.local.example .env.local
```

Inside of your newly created `.env.local` file, provide values for the variable. These variables can be found in the [project settings UI](https://hygraph.com/docs/guides/concepts/apis#working-with-apis).

3. **Start building!**

```shell
yarn dev
```

## Next.js Preview Mode

If you want to enable [Next.js Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode) you'll need to add the following to your `.env`:

```env
GRAPHCMS_TOKEN=
GRAPHCMS_PREVIEW_TOKEN=
GRAPHCMS_PREVIEW_SECRET=
```

### `GRAPHCMS_TOKEN`

This should be a Permanent Auth Token that is set to fetch content from _PUBLISHED_ content stage by default.

### `GRAPHCMS_PREVIEW_TOKEN`

This should be a Permanent Auth Token that is set to fetch content from _DRAFT_ content stage by default.

## `GRAPHCMS_PREVIEW_SECRET`

You'll need to make sure when configuring the Preview URL inside Hygraph that it passes the same secret value you assigned to `GRAPHCMS_PREVIEW_SECRET`.

You'll need to update both the Page & Blog Post model to add a Preview URL. The URLs should look like this:

- **Page**: `https://[your-domain.com]/api/preview?secret=[GRAPHCMS_PREVIEW_SECRET_VALUE_HERE]&slug={slug}`
- **Blog Post**: `https://[your-domain.com]/api/preview?secret=[GRAPHCMS_PREVIEW_SECRET_VALUE_HERE]&slug=blog/{slug}`

## Features

- [Next.js Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode)
- [next/image](https://nextjs.org/docs/api-reference/next/image)
- [Internationalized Routing](https://nextjs.org/docs/advanced-features/i18n-routing)
- [GraphQL Union Types (Polymorphic Relations)](https://hygraph.com/docs/schema/field-types)
- [next-seo](https://www.npmjs.com/package/next-seo)
