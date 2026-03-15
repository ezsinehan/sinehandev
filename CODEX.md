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

## High-level outcome
The site remains in the same visual language (Kavivanar + muted palette + pixel icons), with temporary WIP affordances added for unfinished areas and quality-of-life UI tweaks.

## Changes made this session

1. Repository/context review
- Read and summarized repository state from `CLAUDE.md`.
- Performed independent review and recorded findings in `CODEX_REVIEW.md`.

2. Grid toggle iteration (top-left)
- Replaced text grid toggle with pixel-art SVG icon.
- Added active-state rotation (`45deg`) when grid is enabled.
- Iterated box/icon sizing and positioning to match existing style.
- Removed outer bounding box per request.
- Final state: standalone icon-style toggle aligned at `top: 32px; left: 32px`, sized to match other icons.

3. Browser tab title behavior
- Updated default title to `sinehan's website`.
- Added visibility-based title swap:
  - visible tab: `sinehan's website`
  - hidden tab: `was it me😔`

4. About page copy adjustments
- Kept title and contact section intact.
- Replaced non-title/non-contact descriptive copy with `blah blah blah` placeholders.
- Restored section titles (e.g., `currently`) after follow-up request.

5. Projects/Blog WIP handling
- Implemented shared `SectionPage` placeholder UI with caution-tape treatment and `UNDER RENOVATION` message.
- Removed section label (`blog/projects`) and extra supporting sentence per follow-up.
- Centering was refined and finalized with explicit absolute centering (`50%/50% + translate`).

6. Home page additional note
- Added red dev-note text in the lower-left quadrant:
  - asks users to report bugs/tips via LinkedIn/email.

## Files touched in session
- `src/components/Layout.jsx`
- `src/App.css`
- `src/App.jsx`
- `index.html`
- `src/pages/About.jsx`
- `src/pages/SectionPage.jsx`
- `src/pages/SectionPage.css` (new)
- `src/pages/Home.jsx`
- `src/pages/Home.css`
- `CODEX_REVIEW.md` (new)

## Validation notes
- `npm run build` was run repeatedly after major UI edits and passed.
- Build still emits Vite's chunk-size warning (>500kb), non-blocking.
