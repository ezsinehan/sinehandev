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

All pages are wrapped in a shared Layout that renders persistent UI:
- **Debug grid toggle** (top-left) — pixel-art icon button at `top: 32px; left: 32px`; toggles a 32px red alignment overlay (`.debug-grid`)
- **Nav / breadcrumb** (top-center, fixed at `top: 4rem`, optically centered with `translateX(calc(-50% - 8px))`):
  - On `/`: three tab links with IDs `nav-about`, `nav-projects`, `nav-blog` (used by Home annotations)
  - On section pages: "sinehan's [title]" fades out on scroll (`scrollY > 50`), and a fixed `home` button appears at `left: 5rem, top: 4rem`
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
- `/projects` — `src/pages/Projects.jsx` + `src/pages/Projects.css`
  - Two view modes: **swipe** (default) and **grid** (2-column); toggled via toolbar button, persisted to `localStorage` under key `projects-view-mode`
  - Swipe view: full-bleed card with wheel/touch/keyboard (↑↓) navigation, progress bar, count indicator, and "view project →" link
  - Grid view: 2-column responsive tile layout (1-column on mobile ≤900px); each tile is a `Link` to `/projects/:id`
  - Project data imported from `src/data/projects.js`; images use `src/assets/project-placeholder.svg`
- `/projects/:id` — `src/pages/ProjectDetail.jsx` (shares `About.css`)
  - Mirrors About layout: fixed left TOC + centered scrollable content
  - Sections: overview / stack / links
  - Looks up project by `id` param from `PROJECTS`; redirects to `/projects` if not found
- `/blog` — `src/pages/Blog.jsx` (wrapper around `SectionPage` with title "blog")
  - Shows centered "UNDER RENOVATION" panel with caution-tape styling (`src/pages/SectionPage.css`)
- `/chat` — `src/pages/Chat.jsx`: RAG chat UI posting to `{VITE_API_URL}/answer`

### Styling

- `src/App.css` — shared nav/breadcrumb/socials/toast/debug-grid styles
- `src/pages/Home.css` — home title, annotation labels/arrows, and dev note
- `src/pages/About.css` — about layout + TOC + copy/contact styles
- `src/pages/Projects.css` — projects page: toolbar toggle, swipe card, grid tiles, progress bar, responsive breakpoints
- `src/data/projects.js` — shared `PROJECTS` array (id, title, summary, overview, stack, links)
- `src/pages/SectionPage.css` — renovation card and tape styling (blog only now)
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

### Known Issues

- Existing lint issues were previously identified (unused imports/refs and hooks immutability rule in About page flow).
- Build succeeds, but Vite warns about chunk size > 500kb.

### Other

- Routing: `src/main.jsx` (BrowserRouter), `src/App.jsx` (Routes/Route)
- Netlify SPA fallback: `public/_redirects`
- Backend for RAG is separate from this repo
