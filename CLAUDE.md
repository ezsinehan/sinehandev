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
- **Nav / breadcrumb** (top-center, fixed at `top: 4rem`, optically centered with a -8px offset via `translateX(calc(-50% - 8px))`):
  - On `/`: three tab links with IDs `nav-about`, `nav-projects`, `nav-blog` (used by Home annotations)
  - On section pages: "sinehan's [title]" (single span, `font-weight: 400`, muted color) fades out on scroll (`scrollY > 50`); a fixed "home" button at `left: 5rem, top: 4rem` (matches TOC size/position) animates in from the left
  - Transitions between states use Framer Motion (`AnimatePresence mode="wait"`, fade + slide)
- **Social icons box** (`id="social-bar"`, bottom-center, styled box with border/shadow): GitHub, email copy-to-clipboard, LinkedIn, resume PDF
- **Email toast** — appears above the icons box with the same Framer Motion animation; positioned with `left: 0; right: 0; text-align: center` (not `transform`) to avoid conflict with Motion's inline transforms

### Routes

- `/` — `src/pages/Home.jsx` + `src/pages/Home.css`: Typewriter effect cycles greeting strings (via `typewriter-effect` package). Title centered via wrapper div — centering on wrapper, Framer Motion opacity on inner `h1` to avoid transform conflict. Five marker-style annotations (labels + SVG quadratic bezier arrows) pointing at nav items, social bar, and the title itself. Arrow positions measured via `getBoundingClientRect()` on mount and resize. Annotation config supports: `anchorX` (`center`/`right`), `anchorXOffset` (px offset from element center), `anchorXFraction` (0-1 fraction of element width), `approachFrom` (`southeast`/`below` for controlled arrowhead direction), `flipArrow` (arrowhead at source instead of target), `small` (smaller wrapping text style), `emojiLink` (emoji rendered as a secret link — 😉 links to `https://legacy.sinehan.dev`). The `.home` container is `pointer-events: none`; only `home-label__emoji-link` re-enables pointer events.
- `/about` — `src/pages/About.jsx`: two-column layout with a fixed left-side TOC (intro, currently, contact) and a centered content column. TOC click uses `window.scrollTo` with a 200px offset and sets active state directly; a scroll listener tracks the closest section to highlight the TOC during manual scrolling. Has its own `About.css`.
- `/projects`, `/blog` — thin wrappers that render `src/pages/SectionPage.jsx` (currently returns `null`, content TBD)
- `/chat` — `src/pages/Chat.jsx`: RAG chat interface that POSTs to `{VITE_API_URL}/answer` and renders markdown responses with citations

### Styling

- `src/App.css` — all shared styles (nav, breadcrumb, socials, toast, debug grid)
- `src/pages/About.css` — about page layout, TOC, headings, text, contact list
- `src/pages/Chat.css` — chat-specific styles
- `src/index.css` — body background (subtle radial gradient + noise texture + vignette)
- Font: Kavivanar (cursive) throughout
- Hover animations: CSS `:hover` with animated underline (`::after` width transition) and color transition
- Pixel-art SVG icons inlined directly in JSX (no icon library)

### Dependencies

- `motion` (Framer Motion) — used for nav/breadcrumb, toast, home annotations, and about page enter animations. **Note:** never put CSS `transform` centering on the same element as a Framer Motion `y`/`x` animation — use a wrapper div for positioning and animate the inner element.

### Known Issues

- CSS `:hover` animations stop working after Cmd+W tab close returns focus to the site. Pre-existing browser bug (present in production), not caused by our code. Links remain clickable; only the visual hover transitions break.

### Other

- Routing: `src/main.jsx` (BrowserRouter) and `src/App.jsx` (Routes/Route). `public/_redirects` handles Netlify SPA routing.
- The RAG backend (`VITE_API_URL`) is a separate service — this repo is frontend only.
