# CODEX.md

Session update log.

---

## Session 2026-03-14

### High-level outcome
Projects page fully implemented with a 2-column grid, per-project detail pages with dynamic sections, and external link redirect support. Various performance and layout bug fixes.

### Changes made

1. **Projects page (`/projects`)**
   - Replaced `SectionPage` "UNDER RENOVATION" stub with a real 2-column grid
   - Swipe/slideshow mode was built and then removed due to animation complexity
   - Tile overlay switched from `backdrop-filter` to plain CSS gradient for performance
   - Title font size and grid gap tuned iteratively

2. **Project detail page (`/projects/:id`)**
   - Created `ProjectDetail.jsx` sharing `About.css` layout (fixed TOC + centered content)
   - Sections are fully dynamic — defined in `src/data/projects.js` per project
   - Scrolls to top on mount to prevent mid-page entry on long projects
   - Layout "back" button navigates to `/projects` on detail pages (instead of "home" → `/`)

3. **Project data (`src/data/projects.js`)**
   - Single source of truth for all project content
   - Supports two tile behaviors: `link` field → external redirect; no `link` → detail page
   - Section types: `body` (paragraph) and `links` (list of anchors)
   - Real projects populated: Anchor, Sinehan LLM, Full-Stack Course Enrollment, TUI L-Game AI, Ai's Two Cents, Studybox, Autonomous Kinova Leaf Grasping System

4. **Layout fixes**
   - Social bar (`#social-bar`) given `z-index: 9999` so it always renders above page content
   - "back" vs "home" button logic added for project detail routes

5. **Bug fixes**
   - Project tile titles were rendering below the tile boundary — fixed by switching `.project-tile__overlay-content` from `height: 100%; justify-content: flex-end` to `position: absolute; bottom: 0`
   - Removed `backdrop-filter` from grid tiles to fix first-load lag

### Files touched
- `src/pages/Projects.jsx` (rewritten)
- `src/pages/Projects.css` (rewritten)
- `src/pages/ProjectDetail.jsx` (new)
- `src/data/projects.js` (new)
- `src/components/Layout.jsx`
- `src/App.jsx`
- `src/App.css`

### Validation
- `npm run build` passes. Vite chunk-size warning (>500kb) persists, non-blocking.

---

## Session 2026-03-06
Session update log for work done on 2026-03-13.

## High-level outcome
Reviewed the blog implementation against current repository behavior, validated build/lint status, and refreshed agent handoff docs (`CODEX.md`, `CLAUDE.md`) so future work reflects the current live architecture instead of the older renovation-placeholder state.

## Current state review

### Blog feature status
- `/blog` is now fully implemented as a post timeline/list, not an `UNDER RENOVATION` placeholder.
- `/blog/:slug` is implemented as a markdown-rendered detail page with previous/next post links.
- Blog content is sourced from local markdown files in `src/content/blog/*.md`.
- Frontmatter parsing and ordering are handled in `src/lib/blog.js` via `import.meta.glob(..., { eager: true, query: '?raw' })`.

### Route/layout alignment
- App routes include both `/blog` and `/blog/:slug`.
- Breadcrumb logic in `Layout.jsx` correctly maps nested blog routes (`/blog/*`) to the `blog` section title.
- `/projects` still uses the shared renovation placeholder component (`SectionPage`).

### Validation snapshot (this session)
- `npm run lint` ✅ passes.
- `npm run build` ✅ passes.
- Vite still reports non-blocking JS chunk-size warning (>500 kB).

## Documentation updates made this session

1. Rewrote `CODEX.md` to replace older 2026-03-06 / 2026-03-07 logs that no longer represented the active blog implementation.
2. Updated `CLAUDE.md` so architecture/routes/style notes match current code reality:
   - blog list + detail pages are documented as active
   - markdown/content pipeline is documented
   - projects-only renovation status is clarified
   - known issues updated to reflect current lint/build status

## Files touched in session
- `CODEX.md`
- `CLAUDE.md`

## Recommended next steps
- Add optional blog filtering by tag using `getAllTags()` already available in `src/lib/blog.js`.
- Consider code-splitting markdown/detail route if bundle size should be reduced.
