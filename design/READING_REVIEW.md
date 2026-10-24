# Reader-first API key lesson / 2026-10-24

## Scope and reuse

Published lesson keeps /learn/api-keys/, current top/library/topics/paths architecture and FIELD NOTES tokens. Formal compass-cat logo A and ExplorerCat C remain; five explanatory figures reuse existing ExplorerCat and FieldIcon with real, scalable text. No new image service or JS framework dependency. Other lessons are not claimed to be rewritten.

The approved beginner narrative starts with a real setup question, distinguishes public/secret keys, follows a fictional summarizer, explains the build path and server boundary, gives dummy code/results, role-specific inspection, classified primary-source incident, evidence checklist and next reading. Vite/ Astro prefixes are distinguished, server-only variables are not treated as leak-proof, and a proxy alone is not treated as authorization or cost protection. No real keys, external API calls, destructive commands, record input or download UI were added.

## UI review

- Mobile: narrative header summary uses body size; large goals/prerequisites move into a native details control. Mobile TOC opens on demand, desktop sidebar stays. In a 375px/1000px viewport the first prose starts at about 772px instead of 1146px before the TOC improvement. This is a layout measurement, not a reading-speed or learning-outcome claim.
- Figures: scene, key-type comparison, build flow, browser/server/external-service boundary, and three inspection locations. Captions state conditions. Orange highlights the example, not a safety result. Diagrams contain text, rather than screenshots of paragraphs.
- Code: article-only palette uses existing ink/paper tokens, with legible comments and restrained highlighting. Code scrolls locally and receives keyboard focus.
- Read-next: single primary article link plus its purpose/summary; route name appears once inside optional order view. Last step says the route/series ends, without asserting mastery or completed operational work. Next theme is offered separately from returning to route overview. Valid route query continues; invalid/unrelated route falls back to series. Standalone PHP keeps both related links.

## Editorial contract

v1 validation and the named pre-policy baseline remain. Narrative v2 maps nine required coverage areas to actual H2 sections (audience may map to introduction). Negative tests reject missing/stale mappings, missing case classification, checklist, figure, distinct role inspection, code or observable result. The schema exposes optional shortTitle for breadcrumbs; no lesson-specific title is hardcoded in the template. Counts and mappings do not establish factual adequacy: this was also read against the approved narrative and primary sources.

## Verification

- npm run check: 41 files, no errors/warnings/hints.
- npm run build: 38 generated pages. npm test: base paths/assets/anchors and 14 tests passed, including the article's own Vite code, not a separate look-alike.
- Vite 8.3.5 / Node 26.12.1 on mini: public dummy marker appears in generated JS, unused private dummy does not in this fixture. Chromium button output matches the article. This is an example-specific result, not proof against every secret-leak path.
- Browser checks: 38 routes × 320/375/768/1280 = 152 page/width cases; WCAG axe tags 2A/2AA/2.1AA, no page exceptions/body overflow; all 38 at text 200% on 375px. See browser-report.json.
- Focused interactions: all four widths, five figures/six code blocks, real route sequence and final state, invalid/unrelated query, library search and no-JS series fallback. See reading-report.json.
- Keyboard: mobile TOC open/close and anchor, desktop sidebar, next link Enter, native code scrolling focus. Expanded preparation/TOC/route at text 200% on 320/375px has no body overflow.
- Visual inspection: mobile key comparison, boundary arrows, cat scene, code/header and final route panel; desktop article/header.

FULL design audit: 2424 passed / 8 warnings / error 0 / 304 manual-review entries. [Current report](audit/2026-10-24/reading-final/VALIDATION.md). Remaining color-count warnings are on existing design-system examples and command syntax highlighting; none are waived, thresholds/disable list are unchanged. The 304 review entries are prompts for human judgment, not automatic passes.

Initial implementation surfaced low-contrast code comments and orphaned short labels. These were fixed in the actual palette, wording and wrapping; no exclusions were added. Earlier diagnostic runs are retained outside the public repo under /tmp/ai-security-playbook-reading-audit-history on mini.

Independent security-specialist review and target-reader usability tests were not performed. The current review and verification are by Codex. GitHub PR CI and the Pages deployment provide the publication evidence separately.
