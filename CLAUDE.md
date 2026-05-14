# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status

Mid-revamp. Only the home page exists; everything else from v1 has been stripped. v1 site is archived as the `archive-2026-05-13` git tag / GitHub release at https://github.com/ezsinehan/sinehandev/releases/tag/archive-2026-05-13

## Commands

```bash
npm run dev       # start dev server (HMR via Vite)
npm run build     # production build
npm run preview   # preview production build locally
npm run lint      # ESLint check
```

## Environment

No environment variables required.

## Architecture

Single-page React app (React 19, React Router v7, Vite) deployed on Netlify.

### Layout (`src/components/Layout.jsx`)

All pages are wrapped in a shared `Layout` that renders persistent UI:

- **"Not enough space" overlay** (top of render tree) — fullscreen white overlay with "not enough space / try a bigger screen". Activated purely via CSS media query when viewport is `max-width: 399px` OR `max-height: 499px`. Z-index 100000 so it covers everything including the debug grid.
- **Debug grid toggle** (top-left, `top: 32px; left: 32px`) — pixel-art icon button; toggles a 32px red alignment overlay (`.debug-grid`); hidden on mobile (≤900px). Color `#a0a0a0`, hover `#555`.
- **Social icons box** (`id="social-bar"`, bottom-center, `z-index: 9999`): All blocky/pixel-art SVGs at 24×24 viewBox with 16×16 main body; `fill="currentColor"` for body, `fill="#fff"` for negative-space detail. Icon colors `#a0a0a0` / hover animated rainbow via `hue-rotate`. White box background, light-gray border (`#d0d0d0`).
  - Default (`/`): GitHub, email copy-to-clipboard, LinkedIn, Substack, X, YouTube (6 icons — "work identity")
  - `/fun`: above six **plus** Instagram, Threads, TikTok, Spotify (10 icons total). Conditional rendering driven by `useLocation().pathname === '/fun'`.
  - **The Instagram/Threads/TikTok/Spotify links currently use `href="#"` placeholders — replace with real URLs.** (Substack, X, and YouTube already have real URLs.)
- **Email toast** — appears above the social box with Motion animation when the email-copy button is clicked.

No nav, no breadcrumb, no home button.

### Routes

- `/` — `src/pages/Home.jsx` + `src/pages/Home.css`
  - Centered typewriter hero title at `top: 6rem`
  - Greeting selection:
    - **First visit on this browser** (no `sinehan-visited` key in `localStorage`): always types `"hi, i'm sinehan"`
    - **Subsequent reloads**: types a random pick from a 7-entry variants array (`"good day! i'm known as sinehan"`, `"howdy, sinehan here"`, etc.)
  - Typewriter chain: types greeting once, then stops with the cursor permanently blinking (text stays, no deletion)
  - Cursor is absolutely positioned (`.Typewriter__cursor { position: absolute; left: 100%; }`) so the typed text alone is centered — the cursor floats off the right edge and does not push the text's visual center off-axis
  - **"my socials!" annotation** (revived from v1) — a slightly-rotated Kavivanar label positioned high above-right of the socials box (`bottom: 11rem`), with a curved bezier arrow (color `#b8ad9e`) pointing down to the top of `#social-bar`. Arrow endpoints measured at runtime via `getBoundingClientRect()` on label + target, then drawn into a full-page absolutely-positioned SVG (`.home-arrows-svg`). Re-measured on window resize. Hidden via media query on small screens (`max-width: 900px` or `max-height: 600px`).
  - **"under construction" banner** — centered on the page (`.construction` at `top: 50%`). White content block sandwiched between two yellow/black diagonal-stripe tape strips (`repeating-linear-gradient(-45deg, #f4c430, #1a1a1a)`). The text inside reuses the `.rainbow` gradient class from the title.

- `/fun` — same `Home` component, but `Layout` reads `useLocation()` and renders four additional "non-work" social icons (Instagram, Threads, TikTok, Spotify) when `pathname === '/fun'`. Default `/` keeps the icon bar to the 6 work-identity socials.

### Debug grid (`.debug-grid` in `src/App.css`)

Toggled by the top-left button. Used for verifying alignment during the revamp.

- **Minor lines:** 1px red at `rgba(255,0,0,0.08)`, every 32px
- **Major lines:** 1px red at `rgba(255,0,0,0.18)`, every 128px (every 4th minor line is reinforced)
- **Center crosshair:** 3px red at `rgba(255,0,0,0.5)` — odd width centered on `50%` with `margin: -1px` so its middle pixel sits exactly on top of the center grid line
- All four line layers anchored at `(50vw, 50vh)` so they pass through viewport center symmetrically

### Styling

- `src/App.css` — debug grid, debug-grid-toggle, socials box, copy toast, "not enough space" overlay
- `src/pages/Home.css` — title position + Typewriter cursor positioning fix
- `src/index.css` — solid white body background + SVG noise overlay + subtle vignette
- Font: Kavivanar throughout
- Icons: pixel-art SVG inlined in JSX (no icon library)
- Color palette (current revamp theme):
  - Background: `#ffffff` (white) with noise + vignette
  - Text primary: `#4a4540`
  - Icon/UI subdued: `#a0a0a0`, hover/active `#555555`
  - Border subdued: `#d0d0d0`
  - Debug accent: `rgba(255, 0, 0, ...)`

### Browser Title Behavior

- `index.html` default title is `sinehan's website`
- `src/App.jsx` swaps title on tab visibility:
  - active tab: `sinehan's website`
  - hidden tab: `was it me😔`

### Dependencies

- `motion` (Framer Motion) — email toast in Layout, title fade-in in Home
- `react-router-dom` — only `/` is mounted, but kept in place for revamp routes
- `typewriter-effect` — home title typing animation

### Persistent client state

- `localStorage` key `sinehan-visited` — set to `"1"` after the first render of `Home`. Used to gate the "first visit" greeting. Clear it (`localStorage.removeItem('sinehan-visited')` in devtools) to see the first-visit greeting again.

### Other

- Routing: `src/main.jsx` (`BrowserRouter`), `src/App.jsx` (`Routes/Route`)
- Netlify SPA fallback: `public/_redirects`
- v1 archive: tag `archive-2026-05-13`, GitHub release linked above
