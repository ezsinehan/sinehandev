# CODEX.md

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
