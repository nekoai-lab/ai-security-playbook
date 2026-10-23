# FIELD NOTES v1.1 — review record (2026-10-24)

Status: **draft; design gate has not passed; do not merge/deploy yet**.
Implementation and all verification ran on Mac mini. README and LICENSE are unchanged.

## Requirements and evidence

| ID | Implementation | Evidence | Status |
|---|---|---|---|
| R01 | Guide expanded to 12 sections, with identity, page patterns, responsive layouts, MDX authoring and quality workflow | `src/pages/design-system.astro`; 12 navigation links clicked | implemented, visual final approval pending |
| R02 | A compass cat in header/favicon; size, clear space and monochrome examples | `BrandMark.astro`, `public/brand/`; identity screenshots | implemented |
| R03 | C backpack cat at learning entry and lesson completion | `ExplorerNote.astro`; companion/lesson-end screenshots | implemented |
| R04 | Existing design contract and actual local harness execution | DESIGN.md, design-rules.json, runner; before/final raw reports | integrated; **gate failing** |
| R05 | Ivory/ink/orange FIELD NOTES shell retained | before/final screenshots, unchanged approved hero image | implemented, final visual review pending |
| R06 | No brain/organ imagery introduced | production source assets; identity/companion screenshots | verified |
| R07 | 320/375/768/1280; 200% text; keyboard and primary interactions | browser.json, brand-browser.json | automated checks pass |

All 7 critical requirements have implementation/evidence, but **7/7 completion is not claimed**: R04 gate and final visual review remain open.

## Automated results

- Astro check: 0 errors / 0 warnings / 0 hints (20 files).
- Build and site validation: 7 pages; base paths, assets and anchors pass.
- Browser: 7 routes × 4 widths = 28 combinations. No page overflow, browser errors or axe WCAG A/AA violations. Read-only tables retain their own local scroll region.
- Brand images and companion images load on 3 representative pages. All 12 guide navigation links work. Checklist toggles and learning entry links work.
- Keyboard skip link reaches main. Text sizes doubled from computed px values at 375px on home, guide and Node lesson: no page overflow. This is text resizing, not a claim of exhaustive screen-reader or browser-zoom certification.
- Design harness origin/main revision: `839e06f`. No engine source or authentication material is included in this public repository.
- Final raw design-audit: **166 passed / 26 failed (error 16) / 24 review**. Exit status 1 is preserved.
- Before: **85 passed / 59 failed (error 52) / 24 review**, across 9 combinations. Final has 12 combinations (768px added), so aggregate totals must not be treated as a like-for-like improvement percentage. Raw measurements include matching-width comparisons.

## Corrections made

Small 8–11px labels raised to at least 12px; body text to 16px. Type, leading, letter spacing and vertical spacing consolidated. Header links and checklist controls have 44px targets. Guide code example now has keyboard focus for horizontal scrolling. Featured content accepts long text without forcing its grid beyond the viewport at 200% text. Superseded CSS declarations were removed before formatting.

## Open design gate

- 12 left-edge failures compare global text coordinates, including inline elements and independent columns. Some appear to be measurement false positives, but **none are waived or counted as passed**. Next review should identify each flagged DOM element and distinguish intended column/inline positions from actual misalignment. Do not distort unrelated columns merely to match a global x coordinate.
- Remaining orphan-line failures require checking actual wrapped text at the recorded widths. Code with explicit newlines and prose must be distinguished. Do not disable the rule or silently lower its threshold.
- Color-count warnings remain on home and the palette guide. The guide intentionally displays semantic warning/danger colors and all learning-route colors. Keep labels and primary action color distinct; consolidate any redundant colors after visual review.
- A line-length warning is retained in the raw report; confirm the specific element rather than claiming all text passed.
- The 24 manual-review entries remain raw, unchecked findings. Direction, single main CTA, hierarchy, image/text balance and final phone/tablet/desktop review must be signed off separately from build success.

## Evidence locations

`design/audit/2026-10-24/before/` and `final/` retain raw results and measurements. Screenshots stay on the authoring Mac mini under each audit's `screenshots/` directory (ignored by Git).
Additional browser screenshots are in `/tmp/ai-security-playbook-qa/screenshots/`: `identity-{375,768,1280}.png`, `companion-{375,768,1280}.png`, `lesson-end-{375,768,1280}.png`, full-page route screenshots and 200pct screenshots.
Exported review images are attached to the Codex chat. They are **local preview**, not evidence of production deployment.

## Release decision

Create a draft PR with the above results. Keep production unchanged while the design gate fails. The existing workflow does not execute the private harness in public CI; a green build alone cannot override this record.
