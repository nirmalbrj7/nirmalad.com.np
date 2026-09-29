# Nirmal Adhikari Portfolio - Agent Guide

## Project Overview

This is a personal portfolio website for Nirmal Adhikari, a researcher, educator, and technology leader focused on resilient systems, immersive computing, and human-centered design. The site is built as a modern React SPA (Single Page Application) with rich interactive visualizations and 3D elements.

**Live Site**: https://nirmalad.com.np

## Technology Stack

### Core Framework & Build
- **React 18** - UI library with TypeScript
- **Vite 5** - Build tool and dev server
- **TypeScript 5** - Type-safe JavaScript

### Styling & UI
- **Tailwind CSS 3** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **Lucide React** - Icon library

### 3D & Visualization
- **Three.js 0.160.0** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber
- **D3.js** - Data visualization library (for research network graph)

### Routing
- **React Router DOM v6** - Client-side routing

### Deployment
- **Cloudflare Pages** - Hosting platform
- **Wrangler** - CLI tool for Cloudflare deployment

## Project Structure

```
.
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind CSS theme configuration
├── postcss.config.js          # PostCSS configuration
├── tsconfig.json              # TypeScript project references
├── tsconfig.app.json          # TypeScript app configuration
├── tsconfig.node.json         # TypeScript node configuration
├── wrangler.toml              # Cloudflare Pages deployment config
├── scripts/
│   └── generate-sitemap.js    # Builds sitemap.xml for SEO
├── public/
│   ├── _redirects             # Cloudflare redirects config
│   ├── robots.txt             # SEO robots file
│   ├── sitemap.xml            # Generated sitemap
│   └── Nirmal_Adhikari_CV.pdf # Downloadable CV
├── src/
│   ├── main.tsx               # React application entry
│   ├── App.tsx                # Root component with routing
│   ├── index.css              # Global styles & Tailwind directives
│   ├── vite-env.d.ts          # Vite type declarations
│   ├── data/
│   │   ├── links.ts           # Press, reports, repos and YouTube videos per project topic
│   │   ├── media.ts           # Real photos/project images with licence credits
│   │   ├── projects.ts        # Key Projects data; stats can cite a link id
│   │   ├── publications.ts    # Publications (Crossref-checked) + APA/BibTeX helpers
│   │   └── teaching.ts        # Institutions (AUAF, Dalhousie, UoPeople, ICMS) and courses
│   ├── lib/
│   │   └── utils.ts           # Utility functions (cn helper for Tailwind)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx     # Page layout wrapper
│   │   │   ├── Navbar.tsx     # Navigation component
│   │   │   └── Footer.tsx     # Footer component
│   │   ├── ui/
│   │   │   ├── Hero3D.tsx     # 3D animated hero background
│   │   │   ├── MagicalCard.tsx # Card component with effects
│   │   │   └── ScrollReveal.tsx # Scroll-triggered animation wrapper
│   │   ├── media/             # Lightbox, PhotoGallery, VideoShelf, LiteYouTube, RelatedLinks
│   │   └── viz/
│   │       ├── ResearchGraph.tsx  # D3.js force-directed graph
│   │       ├── ResearchNexus.tsx  # Alternative research visualization
│   │       └── WorldImpactMap.tsx # d3-geo world map (Natural Earth via world-atlas)
│   ├── pages/
│   │   ├── Home.tsx           # Landing page
│   │   ├── Academic.tsx       # Academic background page
│   │   ├── Publications.tsx   # Publications listing
│   │   ├── KeyProjects.tsx    # Featured projects
│   │   ├── OpenSource.tsx     # Open source contributions
│   │   ├── Research.tsx       # Research overview
│   │   ├── ResearchDetail.tsx # Case studies (/research/:id) with photos, video, press & links
│   │   ├── Blog.tsx           # Articles on LinkedIn/Medium
│   │   ├── Recognition.tsx    # Awards and recognition
│   │   ├── Contact.tsx        # Contact page
│   │   ├── CV.tsx             # CV/Resume page
│   │   └── Placeholder.tsx    # Generic placeholder page
│   └── assets/                # Static assets (SVG illustrations)
└── docs/
    └── PLAN.md                # Development planning documents
```

## Build Commands

```bash
# Development server
npm run dev

# Production build (includes sitemap generation)
npm run build

# Generate sitemap only
npm run generate-sitemap

# Preview production build locally
npm run preview

# Run ESLint
npm run lint

# Deploy to Cloudflare Pages
npm run deploy
```

## Code Style Guidelines

### TypeScript Conventions
- Use strict TypeScript settings (`strict: true` in tsconfig)
- Prefer explicit return types for component functions
- Use interface for object shapes, type for unions
- Path alias `@/` maps to `./src/` for clean imports

### Component Structure
- Functional components with default exports
- Props interfaces defined inline or at top of file
- Use `React.FC` pattern implicitly (no explicit typing needed)

### Styling Conventions
- Tailwind utility classes for all styling
- Custom utility classes defined in `src/index.css` under `@layer utilities`
- Common patterns:
  - `.glass` - Glassmorphism effect (blur + translucent white)
  - `.glass-dark` - Dark glassmorphism variant
  - `.surface-card` - Card surface styling
  - `.text-gradient` - Gradient text effect
  - `.bg-grid` - Grid background pattern
  - `.bg-radial-sheen` - Radial gradient overlay

### Color Palette (Tailwind Config)
- `midnight-950` - Primary dark background
- `cream-50` - Primary light background
- `royal-*` - Accent color (indigo/purple tones)
- Custom colors defined in `tailwind.config.js`

### Fonts
- **Fraunces** - Display/serif font (headings)
- **Space Grotesk** - Sans-serif font (body text)
- **JetBrains Mono** - Monospace font (code)

### Animation Guidelines
- Use Framer Motion for React animations
- Standard animation props:
  - `initial={{ opacity: 0, y: 20 }}`
  - `animate={{ opacity: 1, y: 0 }}`
  - `whileHover={{ y: -8 }}` for hover lift effects
  - `whileInView` for scroll-triggered animations
- Page transitions use blur + slide effect

## Testing Instructions

This project does not have automated test suites configured. Testing is manual:

1. **Development Testing**:
   ```bash
   npm run dev
   # Check http://localhost:5173
   ```

2. **Build Verification**:
   ```bash
   npm run build
   # Verify dist/ folder is created without errors
   ```

3. **Linting**:
   ```bash
   npm run lint
   # Ensure no ESLint errors
   ```

## Deployment Process

### Option 1: Automatic (GitHub + Cloudflare Pages) - Recommended
1. Push code to GitHub repository
2. Connect repository in Cloudflare Dashboard (Workers & Pages)
3. Build settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Build Output Directory: `dist`

### Option 2: Manual Deployment
```bash
npm run deploy
```
This runs `npm run build` then uses Wrangler CLI to deploy the `dist` folder.

### Configuration Files
- `wrangler.toml` - Cloudflare project configuration
- `public/_redirects` - SPA routing handling (all routes → index.html)
- `public/sitemap.xml` - Auto-generated SEO sitemap

## Key Dependencies Notes

- **Three.js @ 0.160.0** - Pinned version for stability with @react-three/fiber
- **@react-three/drei @ 9.99.0** - Pinned for compatibility
- **Framer Motion** - Primary animation library, use for all motion effects
- **D3.js** - Used only in ResearchGraph component for force-directed graph

## Security Considerations

- No environment variables or secrets in client-side code
- All external links use `target="_blank"` with `rel="noopener noreferrer"`
- No user input forms with sensitive data (contact page is static)
- Sitemap generation is done at build time, not runtime

## Common Tasks

### Adding a New Page
1. Create component in `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx` with PageTransition wrapper
3. Add nav item in `src/components/layout/Navbar.tsx`
4. Update sitemap in `scripts/generate-sitemap.js`
5. Run `npm run generate-sitemap`

### Adding a New Component
1. Create in appropriate `src/components/` subdirectory
2. Use `cn()` utility from `@/lib/utils` for conditional class merging
3. Follow existing animation patterns with Framer Motion

### Modifying Styles
1. Global styles go in `src/index.css`
2. Theme extensions go in `tailwind.config.js`
3. Prefer Tailwind utilities over custom CSS

### Adding Press Links, Videos and Photos
There is no separate press page: links live next to the project they describe.
1. Add a link to `src/data/links.ts` (URL, date, short summary, key points) and tag its `topics`
2. For a YouTube video set `videoId` and save its poster as `public/images/yt-<id>.webp`
   (+ `-thumb.webp`); `VideoShelf`/`LiteYouTube` only contact YouTube when played
3. Reference link ids from a project's `coverage` (or a stat's `source`), or rely on the
   topic so the case study's "Press & links" section picks it up
4. Photos go in `src/data/media.ts` with a credit (author, licence, source page); save
   `public/images/<id>.webp` (max 1600px) and `<id>-thumb.webp` (720px). Use only images
   you own, public-domain/CC images (credit them), or project repo images under their licence
5. Don't cite a figure the source doesn't state; leave the stat without a source instead

### Interactive Building Blocks
- `LightboxProvider` / `useLightbox()` + `photoToItem()`: full-screen photo viewer with credits
- `PhotoGallery`, `VideoShelf`, `RelatedLinks` (pills or list): media UI in `components/media`
- `WorldImpactMap`: lazy-loaded; places, roles and routes are defined at the top of the file
- `CommandPalette`: site search on Ctrl/Cmd+K or `/`; indexes pages, projects, courses, papers, links
- Pages are lazy-loaded in `App.tsx` behind `RouteErrorBoundary` (reloads once if a chunk is
  missing after a redeploy); Three.js (`Scene3D`) loads after the Home hero paints
- Anything `position: fixed` inside a page (modals) should render through `createPortal`

## Development Notes

- The site uses a "glassmorphism" design aesthetic (blur, transparency, subtle borders)
- 3D elements are used sparingly (Hero3D component) for performance
- ResearchGraph uses D3.js directly (not React-D3) for complex force simulation
- All pages have scroll-to-top behavior on route change
- Mobile-first responsive design with Tailwind breakpoints
