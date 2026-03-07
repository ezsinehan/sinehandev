# CODEX.md

Session update log for work done on 2026-03-06.

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

---

## Session update log for work done on 2026-03-07

### Outcome
Completed a discovery pass focused on blog-page implementation planning and documented architecture/UI recommendations.

### Work completed
1. Reviewed `CLAUDE.md` and current route/component structure for `/blog`.
2. Audited relevant layout/style files to capture constraints from the shared shell.
3. Authored `devnotes/blog-page-design-research.md` with:
   - current-state summary
   - architecture options (local array vs markdown vs CMS)
   - visual direction options
   - phased MVP recommendation
