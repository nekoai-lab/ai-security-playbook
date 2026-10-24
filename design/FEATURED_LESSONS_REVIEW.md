# Featured lessons review / 2026-10-24

## Change and reader value
The homepage formerly featured only PHP. It now offers six explicitly selected lessons across work AI data, authorization, agent permissions, cloud accounts, service failure and PHP updates. Each illustrated card states the reader situation, question and concise takeaway, plus current lesson minutes and update date. Existing API-key/Node reading cards, topic/path navigation, #latest and new/updated feed remain. Two columns above 760px, one column below; no carousel or extra client JavaScript.

Approved existing LessonArt assets are reused, with responsive WebP, reserved dimensions, lazy loading and decorative alt because the card text carries meaning. PHP and agent permissions currently share the existing workbench scene; no new illustration was commissioned for this change.

Editorial rules now specify an opening with scene, value, audience/prerequisites and early overview. Mechanisms use diagrams, points lists, distinctions tables and behavior examples/results. Conditions and uncertainty must remain. This is a rule update, not a claim that all article bodies were rewritten.

## Evidence
- npm run check: 89 files, 0 errors/warnings/hints.
- npm run build: 47 static routes.
- npm test: design 5, catalog 4, content 5 and examples 32 = 46 passing tests.
- Final FULL: design/audit/2026-10-24/featured-final-full, all 47 routes × 320/375/768/1280. 3000 passed, errors 0, warnings 8, manual review prompts 376.
- The 8 existing color-count warnings remain on design-system and commands at four widths each. No thresholds or exclusions changed.
- Browser report: 188 route/width cases, no axe WCAG A/AA violations, page errors or horizontal overflow; all 47 routes at 200% text on 375px.
- Focused report: six unique selected lesson IDs, six real destinations, metadata and decoded images at four widths; correct one/two-column layout; Tab/Enter; homepage 200% text at all four widths; six cards without JavaScript.
- Visual review: final six-card section at 375/1280 and existing guide at 320px/200%. Ivory/ink/orange contrast, heading hierarchy, image composition, reading order and no repeated border decoration reviewed.

## Failure resolved
The first focused 320px/200% run exposed an existing home-paths ExplorerNote overflow (360px document at 320px viewport), outside the new cards. Its grid text child kept its automatic minimum width. A homepage-scoped min-width:0 and overflow-wrap:anywhere produced 320px document width in a minimal browser experiment, then passed the final focused run. No overflow was hidden. Final FULL and browser reports were rerun on the rebuilt final version.

## Scope and limitations
README/LICENSE, lesson facts and article bodies unchanged. The separate uploads-and-input working tree was not altered or published. Five legacy lessons are not newly certified against the newer editorial contract. Automated accessibility and screenshots do not establish complete assistive-technology coverage. The final reports use the isolated mini preview on port 4389; earlier diagnostics are not release evidence.

Publication: pending CI, exact-head merge, Pages and public six-card/link smoke verification.
