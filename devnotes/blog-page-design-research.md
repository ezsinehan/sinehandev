# Blog Page Discovery + Design Options (2026-03-07)

## What exists right now

### Route/component status
- `/blog` currently renders `Blog.jsx`, which simply returns a shared `SectionPage` placeholder.
- `SectionPage` displays a centered **UNDER RENOVATION** card with caution-tape stripes; there is no post list, filters, or content model yet.

### Layout and interaction constraints inherited from the app
- Persistent shell from `Layout.jsx` is always visible:
  - top-left debug grid toggle
  - top-center nav/breadcrumb (on section pages: `sinehan's blog`)
  - bottom-center social links panel + copy-email toast
  - top-left-ish `home` link on non-home pages
- Visual language is consistent across app:
  - font: `Kavivanar`
  - muted neutral palette (`#faf7f0`, `#e5decf`, `#6b6359`, etc.)
  - light grain/noise + vignette background
  - pixel-style iconography

### Notes from CODEX.md and CLAUDE.md
- Both files indicate blog/projects intentionally share temporary renovation UI.
- Build is healthy; known non-blocker: Vite chunk-size warning.
- Existing lint debt exists in repo; blog implementation should avoid increasing this.

## Design goals for the real blog page
1. Keep brand continuity with existing handcrafted/pixel aesthetic.
2. Keep reading comfortable (line-length, spacing, contrast).
3. Preserve low-friction maintenance (easy to add posts).
4. Keep performance acceptable for a static portfolio site.
5. Support growth path (tags, featured posts, eventual markdown content).

## Viable architecture choices

### Option A — Local metadata array (fastest)
**How it works**
- Define a JS array (`posts`) with title, date, tags, summary, slug.
- Render cards on `/blog`.
- Add optional `/blog/:slug` later with per-post JSX/Markdown imports.

**Pros**
- Easiest implementation.
- No dependency overhead.
- Great for first iteration.

**Cons**
- Manual maintenance in code.
- Harder to scale once posts grow.

**Best when**
- You need an MVP this sprint with 3–10 posts.

---

### Option B — Markdown content folder + frontmatter (recommended)
**How it works**
- Add `src/content/blog/*.md` files with frontmatter.
- At build time, load via `import.meta.glob`.
- Use `react-markdown` (already installed) to render post bodies.

**Pros**
- Authoring workflow is clean and future-proof.
- Keeps content separate from components.
- Easy sorting/filtering via metadata.

**Cons**
- Slightly more implementation complexity than Option A.
- Need light utility parsing/normalization.

**Best when**
- You want a durable portfolio blog with minimal future rewrites.

---

### Option C — External CMS/API-backed blog
**How it works**
- Fetch posts from headless CMS or backend endpoint.

**Pros**
- Non-dev editing possible.
- Rich workflows (drafts, scheduling).

**Cons**
- Infra complexity, auth, and availability concerns.
- Overkill for current site scope.

**Best when**
- Blog becomes primary publishing channel with frequent updates.

## UX design directions that match current aesthetic

### Direction 1 — “Pinned Notes Board”
- Masonry-like stack of paper cards with subtle tilt.
- Each card: title, date, 1-line summary, tags.
- Hover effect: slight lift + underline.

**Risk**: Can feel cluttered on small screens without careful spacing.

### Direction 2 — “Timeline Ledger” (recommended)
- Vertical list grouped by year/month, high readability.
- Left rail with date markers, right content column.
- Works well with the handwritten font and minimal palette.

**Why recommended**: Best balance of personality + scanability.

### Direction 3 — “Terminal Notebook Hybrid”
- Minimal bordered rows with tiny pixel bullets/icons.
- Strongly text-first, low visual noise.

**Risk**: Could feel too plain vs. expressive home page.

## Suggested MVP scope (2-step rollout)

### Step 1 (ship quickly)
- Replace renovation component on `/blog` with:
  - page heading + short intro
  - list of 4–6 mock/real posts
  - tag pills (non-functional initially)
- Data source: Option B structure, even with only 1–2 initial markdown files.

### Step 2 (follow-up)
- Add `/blog/:slug` detail page.
- Add previous/next navigation.
- Add simple tag filter + empty state.

## Component breakdown proposal
- `src/pages/Blog.jsx` — container + list rendering
- `src/pages/Blog.css` — page-specific styling
- `src/pages/BlogPost.jsx` — post detail route (phase 2)
- `src/content/blog/*.md` — content files
- `src/lib/blog.js` — loading/sorting helpers

## Accessibility/performance checklist for implementation
- Semantic structure: `main > header + section > article`.
- Ensure heading hierarchy starts with a single `h1`.
- Minimum body text contrast should stay >= WCAG AA.
- Keyboard-visible focus states for all links/cards.
- Avoid heavy animation in reading surfaces.
- Pre-sort posts at load time; avoid unnecessary runtime work.

## Recommendation
Use **Option B (Markdown + frontmatter)** with **Direction 2 (Timeline Ledger)**.

This gives the best long-term editing workflow while matching the current brand language and keeping implementation complexity reasonable for this repository stage.
