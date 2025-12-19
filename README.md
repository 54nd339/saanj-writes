# Saanj Writes

A modern, responsive blog and writing portfolio website built with Next.js, featuring dynamic content management through Hygraph CMS.

## 🚀 Features

- **Modern Stack**: Built with Next.js 16 (App Router), React 19, and TypeScript
- **Headless CMS**: Content managed through Hygraph (GraphQL)
- **Beautiful UI**: Styled with Tailwind CSS 4
- **Smooth Animations**: Powered by Framer Motion
- **Responsive Design**: Mobile-first approach with optimized layouts
- **Blog System**: Full-featured blog with search, filtering, and pagination
- **SEO Optimized**: Server-side rendering and optimized metadata
- **Theme Support**: Dark/light theme toggle functionality

## 📋 Prerequisites

- Node.js 18+ or Bun
- A Hygraph project with configured schema

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd saanj-writes
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_HYGRAPH_ENDPOINT=your_hygraph_endpoint_url
HYGRAPH_TOKEN=your_hygraph_token
SITE_CONFIG_HYGRAPH_ID=your_site_config_id
```

4. Run the development server:
```bash
bun dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
saanj-writes/
├── app/                    # Next.js App Router pages
│   └── (site)/            # Site routes
│       ├── blogs/         # Blog listing and detail pages
│       ├── layout.tsx     # Site layout
│       └── page.tsx       # Home page
├── components/             # React components
│   ├── blog/              # Blog-related components
│   ├── layout/            # Layout components (Navbar, Footer, etc.)
│   ├── sections/          # Page sections (Hero, About, etc.)
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configurations
│   ├── hygraph/           # Hygraph CMS integration
│   ├── constants.ts       # App constants
│   └── utils.ts          # Helper functions
└── public/                # Static assets
```

## 🎨 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **CMS**: [Hygraph](https://hygraph.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [Bun](https://bun.sh/)

## 📝 Available Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint

## 🔧 Configuration

### Hygraph Setup

This project requires a Hygraph project with the following content models:
- Site Configuration
- Blog Posts
- Author Information

Refer to the GraphQL queries in `lib/hygraph/queries.ts` for the expected schema structure.

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_HYGRAPH_ENDPOINT` | Your Hygraph GraphQL endpoint URL | Yes |
| `HYGRAPH_TOKEN` | Hygraph API token (for authenticated requests) | Optional |
| `SITE_CONFIG_HYGRAPH_ID` | The ID of your Site Configuration entry in Hygraph | Yes |

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a personal project. Contributions are welcome but please open an issue first to discuss any changes.

---

Built with ❤️ using Next.js and Hygraph
