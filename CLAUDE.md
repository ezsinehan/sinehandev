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
- **Debug grid toggle** (top-left) — temporary alignment tool, renders a 32px red grid overlay
- **Nav / breadcrumb** (top-center, fixed at `top: 4rem`):
  - On `/`: three tab links (about, projects, blog)
  - On section pages: "home › [title]" breadcrumb where "home" links back to `/`
  - Transitions between states use Framer Motion (`AnimatePresence mode="wait"`, fade + slide)
- **Social icons box** (bottom-center, styled box with border/shadow): GitHub, email copy-to-clipboard, LinkedIn, resume PDF
- **Email toast** — appears above the icons box with the same Framer Motion animation; positioned with `left: 0; right: 0; text-align: center` (not `transform`) to avoid conflict with Motion's inline transforms

### Routes

- `/` — `src/pages/Home.jsx`: empty (all UI is in Layout)
- `/about`, `/projects`, `/blog` — boilerplate section pages (`src/pages/About.jsx`, `Projects.jsx`, `Blog.jsx`) via `src/pages/SectionPage.jsx` (currently empty, content TBD)
- `/chat` — `src/pages/Chat.jsx`: RAG chat interface that POSTs to `{VITE_API_URL}/answer` and renders markdown responses with citations

### Styling

- `src/App.css` — all shared styles (nav, breadcrumb, socials, toast, debug grid)
- `src/pages/Chat.css` — chat-specific styles
- `src/index.css` — body background (subtle radial gradient + noise texture + vignette)
- Font: Kavivanar (cursive) throughout
- Hover animations: CSS `:hover` with animated underline (`::after` width transition) and color transition
- Pixel-art SVG icons inlined directly in JSX (no icon library)

### Dependencies

- `motion` (Framer Motion) — used for nav/breadcrumb and toast enter/exit animations

### Known Issues

- CSS `:hover` animations stop working after Cmd+W tab close returns focus to the site. Pre-existing browser bug (present in production), not caused by our code. Links remain clickable; only the visual hover transitions break.

### Other

- Routing: `src/main.jsx` (BrowserRouter) and `src/App.jsx` (Routes/Route). `public/_redirects` handles Netlify SPA routing.
- The RAG backend (`VITE_API_URL`) is a separate service — this repo is frontend only.
