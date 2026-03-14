# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (HMR via Vite)
npm run build     # production build
npm run preview   # preview production build locally
npm run lint      # ESLint check
```

## Environment

Copy `.env.example` to `.env` and set `VITE_API_URL` to point at the RAG backend (default: `http://localhost:8000`). In production this is set as a Netlify environment variable.

## Architecture

Single-page React app (React 19, React Router v7, Vite) deployed on Netlify.

### Layout (`src/components/Layout.jsx`)

All pages are wrapped in a shared `Layout` that renders persistent UI:
- **Debug grid toggle** (top-left) — pixel-art icon button at `top: 32px; left: 32px`; toggles a 32px red alignment overlay (`.debug-grid`)
- **Nav / breadcrumb** (top-center, fixed at `top: 4rem`, optically centered with `translateX(calc(-50% - 8px))`):
  - On `/`: three tab links with IDs `nav-about`, `nav-projects`, `nav-blog` (used by Home annotations)
  - On section pages: "sinehan's [title]" fades out on scroll (`scrollY > 50`), and a fixed `home` button appears at `left: 5rem, top: 4rem`
  - `/blog/:slug` still maps breadcrumb label to `blog`
  - Transitions use Framer Motion (`AnimatePresence mode="wait"`, fade + slide)
- **Social icons box** (`id="social-bar"`, bottom-center): GitHub, email copy-to-clipboard, LinkedIn, resume PDF
- **Email toast** — appears above the social box with Motion animation

### Routes

- `/` — `src/pages/Home.jsx` + `src/pages/Home.css`
  - Typewriter hero text + arrow annotations
  - Extra red dev note in lower-left quadrant (`.home-dev-note`) asking users to report bugs/tips via LinkedIn/email
- `/about` — `src/pages/About.jsx` + `src/pages/About.css`
  - TOC sections remain: intro / currently / contact
  - Main body copy currently simplified to placeholder `blah blah blah` except title/contact content
- `/projects` — wrapper around `src/pages/SectionPage.jsx`
  - Shows centered "UNDER RENOVATION" card (`src/pages/SectionPage.css`)
- `/blog` — `src/pages/Blog.jsx` + `src/pages/Blog.css`
  - Timeline/list of posts with date rail, summary, tags, and optional `featured` badge
- `/blog/:slug` — `src/pages/BlogPost.jsx` + shared `src/pages/Blog.css`
  - Renders markdown post body and previous/next navigation
- `/chat` — `src/pages/Chat.jsx`: RAG chat UI posting to `{VITE_API_URL}/answer`

### Blog content/data flow

- Source files: `src/content/blog/*.md`
- Loader/parsing: `src/lib/blog.js`
  - Uses `import.meta.glob('../content/blog/*.md', { eager: true, import: 'default', query: '?raw' })`
  - Parses simple YAML-like frontmatter (`title`, `date`, `summary`, `tags`, `featured`)
  - Exposes:
    - `getAllPosts()`
    - `getPostBySlug(slug)`
    - `getNeighborPosts(slug)`
    - `getAllTags()`
    - `formatPostDate(dateString)`

### Styling

- `src/App.css` — shared nav/breadcrumb/socials/toast/debug-grid styles
- `src/pages/Home.css` — home title, annotation labels/arrows, and dev note
- `src/pages/About.css` — about layout + TOC + copy/contact styles
- `src/pages/SectionPage.css` — renovation card and tape styling (projects route)
- `src/pages/Blog.css` — blog list + detail styles
- `src/pages/Chat.css` — chat-specific styles
- `src/index.css` — radial background + noise + vignette
- Font: Kavivanar throughout
- Icons: pixel-art SVG inlined in JSX (no icon library)

### Browser Title Behavior

- `index.html` default title is `sinehan's website`
- `src/App.jsx` swaps title on tab visibility:
  - active tab: `sinehan's website`
  - hidden tab: `was it me😔`

### Dependencies

- `motion` (Framer Motion)
- `react-markdown`
- `react-router-dom`
- `typewriter-effect`

### Known Issues / Notes

- `npm run lint` currently passes.
- Build succeeds, but Vite warns about chunk size > 500kb.
- RAG backend is separate from this repo.

### Other

- Routing: `src/main.jsx` (`BrowserRouter`), `src/App.jsx` (`Routes/Route`)
- Netlify SPA fallback: `public/_redirects`
