# Theme-first home implementation / 2026-10-25

Goal: Implement the approved interactive site-design-proposal structure in the existing FIELD NOTES system, without forcing users through reader/level gateway pages.

- [x] Record approved design and implementation scope in SPEC_TRACE.
- [x] Keep existing tokens, logo, images and shared Shell. Restore the strong original orange mission band. Homepage order: hero, band, inline search/level filters and informative 8 theme cards, three illustrated recommendations, five meaningful recent updates.
- [x] Add common progressive-enhancement LessonDiscovery and TopicLessonCard components. Server render all links/content; JS adds inline stage/query filters, live counts, one-matching-article direct destinations, URL history/legacy stage aliases and result feedback. No nested links or fake disabled operations without JavaScript. Zero-count stages are disabled. Buttons never navigate to a new page to select a level.
- [x] Update theme names/benefits consistently in catalog, topic cards and theme headings. Card sample article links go directly to articles; theme heading/footer go to article list, or directly to the only matching article. Preserve existing IDs, article URLs, #start/#latest/#paths/#library bookmarks, library search, existing routes and authoring-only guide.
- [x] Theme pages show summary/art, immediate full article list with optional inline stage filter, then optional deeper questions and related themes. Preserve existing question anchors and descriptions. Keep every lesson including main PR #33 AI review content; do not modify lesson bodies.
- [x] Test filtering primitives, homepage visible/default picks, all theme article coverage, one-article destination, old stage aliases/history, no-JS links, five updates and guide absence. Keep meaningful prior tests while replacing obsolete homepage structure assertions.
- [x] Check/build/tests and separate authoring build/check. Diagnose changed pages at four widths; run public FULL and GUIDE FULL with unmodified rules, browser axe/errors/overflow/text200, keyboard, image/link, screenshot and visual review.
- [x] Commit scoped changes, PR/CI/exact-head merge/Pages, live smoke and saved publication evidence. Preserve original mini uploads working tree and README/LICENSE. Keep source/raw reports but do not deploy authoring guide or prototype notes.
