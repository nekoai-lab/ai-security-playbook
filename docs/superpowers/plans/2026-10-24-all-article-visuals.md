# All-article visual reading implementation plan

Goal: apply approved illustrations and meaningful diagrams to all 14 articles, and reduce visual rules.
Architecture: typed lesson visual data supplies responsive art, HTML diagrams and route-aware reading cards. Existing article content and identity are retained.
Stack: Astro/MDX/TypeScript/CSS, image_gen originals, sharp WebP encodings, Playwright/axe and existing design harness.
Constraints: mini repo; no dependency/threshold changes; 320/375/768/1280px; no claim of security/comprehension from decoration; preserve review dates, sources and commands.

- [x] Archive six scene originals and approved pose derivatives; encode responsive WebP and record exact prompts, reference roles, hashes/dimensions/bytes.
- [x] Add src/data/lesson-visuals.ts for 14 lesson-specific scene questions and two explanatory diagrams each; existing API/Node figures remain.
- [x] Add LessonArt/LessonScene/LessonDiagram components and article-illustrations.css with accessible real text, stable image dimensions, lazy loading and mobile stacking. Extend CatGuide poses without changing its existing callers.
- [x] Insert illustrations/figures near their explanatory paragraphs in all lessons; preserve content policy and update visual change summaries, not evidence-review dates.
- [x] Add matching artwork to LearningContext and related reading with route updates; remove repeated rule declarations from article styling, keep focus/table/meaningful boundaries.
- [x] Build and check invariants. Run focused browser diagnostics and inspect article screenshots. Fix actual failures before FULL all-route verification.
- [ ] Save current evidence and UX tradeoffs, commit/push PR, wait CI, merge and verify Pages plus actual published visuals/route behavior.

Execution stays in this session. No subagent skills are available or needed.
