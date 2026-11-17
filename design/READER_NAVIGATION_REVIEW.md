# Reader navigation and authoring guide review / 2026-10-25

## Problem and final behavior
The old homepage asked the reader to choose repeatedly: questions, eight themes, three routes, six featured lessons and updates. Beginner guidance appeared after the theme taxonomy. General AI users were directed toward app development by default. Front-page route labels were all introductory, and prerequisite information was hidden in a disclosure.

The new homepage offers three concrete situations: using AI, building apps with AI, and operating a service. Each shows a real introductory first article plus a hub with entry/practice/advanced sections. Readers can enter any stage; no quiz or compulsory progressive disclosure. A person is not assigned a permanent skill level. The reader journey contract verifies existing IDs, introductory first reads, all three non-empty stages and coverage of every existing lesson.

The two older reading cards and six features are now one recommendation area: two lead cards plus six compact cards. All eight destinations remain. Current level, concrete prerequisites, benefit, time and update date are visible. Theme links and updates are compact secondary navigation. #latest, #paths and #library bookmarks remain valid; existing /paths/ ordered routes and article URLs remain.

All 23 existing lesson headers were reviewed: 5 introductory, 14 practice and 4 advanced. prerequisiteNote is required by the collection schema and shown before the preparation disclosure, on library cards and on recommendations. Advanced includes enterprise governance/contract comparison, not only engineering. It does not mean personal data use is forbidden to beginners, or that a reader must execute example code. Former query labels 基本知識が必要 and 実務経験が必要 map to 実践 and 発展. Article bodies, source assertions and evidence-review dates were not changed or recertified. Changes from main PRs #30 and #31 are preserved.

## Design guide preservation and deployment boundary
The complete former guide is retained as src/design/DesignSystem.astro. Its static path is generated only with DESIGN_PREVIEW=1. dev:design and build:design create the authoring view; build:design writes .design-preview, separate from production dist. The footer link is removed and the production checker asserts dist/design-system/index.html is absent.

check:design-preview checks the retained source, all guide anchors and its local assets/links, and that it did not leak into dist. CI builds/verifies both outputs but uploads only dist. The review map explicitly separates 49 public routes from the single authoring guide. The --guide audit uses the same unmodified design/design-rules.json and all contract widths. Context reports local guide references/commands separately. Guide checks were preserved rather than excluded to manufacture a pass.

## Validation
- npm run check: 95 files, errors/warnings/hints 0.
- Production build: 49 routes; authoring build: 50 routes in .design-preview; guide link/anchor/asset and production absence check passes.
- npm test: 51 passing tests: design 6, catalog 4, content 5, examples 32 and reader navigation 4.
- Public FULL: 49 routes × 320/375/768/1280, 3132 passed, errors 0, existing warnings 4, human-review prompts 392.
- GUIDE FULL: retained guide × same four widths, 60 passed, errors 0, existing warnings 4, prompts 8.
- Combined eight color-count warnings are unchanged: commands has 15 colors and design-system 14 at four widths each. No threshold, rule disable or failure propagation was relaxed. Production/authoring are recorded separately, so removal from deployment is not reported as eliminating its warnings.
- Browser: 196 public and four authoring route/width cases, no WCAG A/AA axe violations, page errors or horizontal overflow; all 49 public pages and guide at 375px/200% text.
- Focused: 3 reader entries, 8 distinct recommendations, 6 compact cards, all 3 stages for each audience, working Tab/Enter navigation, decoded images, four-width 200% text on homepage/hubs/paths, old level-query compatibility, guide HTTP404 and no-JavaScript stage links.
- Manual visual review: homepage entry cards at 375/1280, recommendation hierarchy at 375, general-AI hub at 375; 320 title layout and expanded text checks. Existing approved FIELD NOTES art is reused with responsive images/dimension reservation.

## Before / after, with limits
At 375px wide, the old first beginner-route section began around y4309 and recommendations at y5094, with document height 9693. On the new 375px viewport, reader choices begin y887 and recommendations y2086, document height 6152. This is approximately 79% earlier for the first guided choice and 37% less total height. The route entry locations are structurally different sections, so this compares access to guidance, not reading time. No claim of a measured conversion/comprehension improvement or user-test result is made.

## Failures fixed during validation
- Astro's type checker did not expose Node process in the static route frontmatter; the gate now uses the supported import.meta.env access, without another dependency.
- Retained guide examples exposed old #paths/#library links; meaningful target containers were preserved rather than suppressing link checks.
- Initial diagnostics caught user-agent h2 margins of 19.92px in audience hubs, a h1→h3 jump in /paths/, and 320px line orphans. Explicit token margins, a proper h2, short descriptive first-read labels, balanced wrapping and a stacked small-screen entry title resolved these. No overflow was hidden.
- Focused browser setup initially used a single-page context unsupported by axe's analysis; explicit browser contexts fixed the test setup.

## Evidence and scope
Reports in navigation-public-full and navigation-guide-full are versioned. Raw measure.json and full screenshots remain on mini; they are not needed to load the deployed site. Original README/LICENSE and unrelated uploads work are unchanged. This work improves navigation and prerequisite metadata; it does not rewrite all article bodies, generate more articles or newly certify five legacy lessons against later editorial rules.

Release completed 2026-10-25: PR #34, merge f7ba4fc99d662ae6366b43f88402aa7a5eeec125, CI 40140283928 and Pages 40140345680 succeeded. Live smoke passed all 49 public routes, all 23 prerequisite headers, 3 audience hubs / all stages, eight recommendations, four-width keyboard/text200/old-query checks and no-JS stage links. The public design-system URL returned HTTP404; its source, preview build, link checks and GUIDE FULL remain. See navigation-public-full/public-report.json.
