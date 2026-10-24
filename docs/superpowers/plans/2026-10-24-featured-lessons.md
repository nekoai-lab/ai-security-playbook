# Featured lessons implementation plan / 2026-10-24

Goal: Replace the PHP-only homepage feature with six useful entry points and record the reader-first editorial rules approved in this chat.
Architecture: A typed curated list feeds a small Astro card. LessonArt supplies existing responsive WebP art; astro:content supplies current minutes/update metadata. No added client JavaScript.

- [x] Record approved spec and requirements in SPEC_TRACE before implementation.
- [x] Create src/data/featured-lessons.ts: six explicit IDs, situations, questions and concise outcomes; use LessonVisualId typing.
- [x] Create src/components/FeaturedLessonCard.astro: getEntry throws on missing lesson; accessible single whole-card link, h3, situation, outcome, minutes/time. Reuse LessonArt. Scoped layout uses tokens, two-column list desktop and one-column mobile, no repeated border decoration.
- [x] Replace only the old FEATURED LESSON section in src/pages/index.astro. Keep #latest so existing navigation works. Retain top API-key/Node cards and new/updated section.
- [x] Add editorial rules to docs/CONTENT_STANDARD.md and concise pointer in design/AI_GUIDE.md: opening explains scene, value, audience/prerequisites and early overview; mechanisms become diagrams, key points lists, differences tables, examples code+results. Preserve qualifications and necessary prose. Do not claim old articles were all rewritten.
- [x] Update docs/DESIGN_SYSTEM.md feature-count description. Run check/build/tests and four-width homepage diagnostics, full mapped audit, browser/keyboard/text-200/visual checks.
- [x] Record failures/warnings and resolution. Commit only this work, open PR, check CI, merge exact head, verify Pages and six live links.

Scope: No article body changes, no unrelated in-progress upload implementation, no new dependency, no root README/LICENSE edits, no rules threshold changes.

Completed release: PR #29, merge 82576b5656967a28e4ebf9496b769bc07eacfa21, Pages 40103146489 and live check successful on 2026-10-24.
