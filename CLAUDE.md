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
- **Debug grid toggle** (top-left) — pixel-art icon button at `top: 32px; left: 32px`; toggles a 32px red alignment overlay (`.debug-grid`); hidden on mobile (≤900px)
- **Nav / breadcrumb** (top-center, fixed at `top: 4rem`, optically centered with `translateX(calc(-50% - 8px))`):
  - On `/`: four tab links with IDs `nav-about`, `nav-projects`, `nav-blog`, `nav-chat` (used by Home annotations)
  - On section pages: "sinehan's [title]" fades out on scroll (`scrollY > 50`); hidden on mobile (≤900px)
  - On `/projects/:id`: breadcrumb shows "sinehan's projects"; back button shows "back" → `/projects`
  - On all other non-home pages: "home" button appears at `left: 5rem, top: 4rem` → `/`; on mobile centers to top-middle
  - `/blog/:slug` still maps breadcrumb label to `blog`
  - Transitions use Framer Motion (`AnimatePresence mode="wait"`, fade + slide)
- **Social icons box** (`id="social-bar"`, bottom-center, `z-index: 9999`): GitHub, email copy-to-clipboard, LinkedIn, resume PDF
- **Email toast** — appears above the social box with Motion animation

### Routes

- `/` — `src/pages/Home.jsx` + `src/pages/Home.css`
  - Typewriter hero text (responsive via `clamp()`, wraps on small screens) + arrow annotations
  - Annotations use explicit `from`/`to`/`bow` arrow config per item (no auto-calculation)
  - Arrows and labels hidden on viewports <1500px wide or <700px tall
  - Extra red dev note in lower-left quadrant (`.home-dev-note`) asking users to report bugs/tips via LinkedIn/email
- `/about` — `src/pages/About.jsx` + `src/pages/About.css`
  - TOC sections: intro / currently / contact; TOC hidden on mobile (≤900px)
  - Main body copy currently simplified to placeholder `blah blah blah` except title/contact content
- `/projects` — `src/pages/Projects.jsx` + `src/pages/Projects.css`
  - 2-column responsive grid (1-column on mobile ≤900px); no swipe mode
  - Each tile shows project image + title; clicking navigates based on data:
    - If `project.link` is set → opens that URL directly in a new tab (external redirect)
    - If no `project.link` → navigates to `/projects/:id` detail page
  - Project data imported from `src/data/projects.js`
  - Tile overlay uses a plain CSS gradient (no `backdrop-filter` — removed for performance)
- `/projects/:id` — `src/pages/ProjectDetail.jsx` (shares `About.css`)
  - Mirrors About layout: fixed left TOC + centered scrollable content
  - Sections are fully dynamic — defined per-project in `src/data/projects.js`
  - Scrolls to top on mount; redirects to `/projects` if `id` not found
- `/blog` — `src/pages/Blog.jsx` + `src/pages/Blog.css`
  - Timeline/list of posts with date rail, summary, tags, and optional `featured` badge
- `/blog/:slug` — `src/pages/BlogPost.jsx` + shared `src/pages/Blog.css`
  - Renders markdown post body and previous/next navigation
- `/chat` — `src/pages/Chat.jsx` + `src/pages/Chat.css`
  - RAG chat interface with WIP banner
  - Fetches `/info` (stack/stats/health) and `/prompts` on load with separate loading indicators
  - If `/info` fails, chat is locked with offline message ("computer is off or tunnel is down")
  - Sends questions to `POST /answer/stream` (SSE streaming) with fallback to `POST /answer` (JSON)
  - Phased status messages during loading: embedding → searching → generating
  - Streaming responses show tokens incrementally with blinking cursor
  - Info panel (right side): stack details, stats, health, prompts with truncate/expand
  - Mobile (≤900px): info panel hidden, chat goes fullscreen between nav and social bar

### Project Data (`src/data/projects.js`)

Single source of truth for all projects. Each entry shape:

```js
{
  id: 'slug',           // used in URL: /projects/slug
  title: 'My Project',
  image: '/image.png',  // public/ folder: use '/filename.png'; src/assets/: use import
  link: 'https://...',  // optional — if set, tile links directly here (no detail page)
  sections: [           // used by detail page; omit if link is set
    { id: 'overview', label: 'overview', body: 'text...' },
    { id: 'links', label: 'links', links: [{ label: 'github', href: '...' }] },
    // add any number of sections in any order
  ],
}
```

Section types: `body` (renders a `<p>`) and/or `links` (renders a `<ul>` of `<a>` tags). Both can coexist in one section.

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
- `src/pages/Home.css` — home title, annotation labels/arrows, dev note, responsive breakpoints
- `src/pages/About.css` — about layout + TOC + copy/contact styles; also used by `ProjectDetail`
- `src/pages/Projects.css` — grid layout, tile styles, gradient overlay, responsive breakpoints
- `src/pages/SectionPage.css` — renovation card and tape styling
- `src/pages/Chat.css` — chat layout, info panel, streaming/phase indicators, mobile fullscreen
- `src/pages/Blog.css` — blog list + detail styles
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

- `npm run lint` has one pre-existing error: unused `placeholderImage` in `src/data/projects.js`.
- Build succeeds, but Vite warns about chunk size > 500kb.
- RAG backend is separate from this repo.

### Other

- Routing: `src/main.jsx` (`BrowserRouter`), `src/App.jsx` (`Routes/Route`)
- Netlify SPA fallback: `public/_redirects`
