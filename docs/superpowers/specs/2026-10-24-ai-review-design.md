# AI design review entry and precise layout checks

Approved direction: retain the FIELD NOTES identity, A as logo and C as companion. The user adopted the before/after improvements and requested less AI reading and decision overhead on 2026-10-24.

## Scope

Give AI a short entry point and a change-to-reference map. Preserve the detailed public guide for people. A diagnostic review may select representative pages, but a release review must cover all seven routes at 320/375/768/1280px. Do not claim a measured speed improvement from reduced input size alone.

Fix the existing harness's measurement defect at its source: compare left edges within the same direct layout parent, rather than mixing independent columns and inline text across the whole document. Measure wrapping on block text, excluding source code's explicit newlines and fragments of inline text. Retain legacy measurements for comparison; old measurements must retain their original fallback judgement. Diagnostics must name the DOM element and comparison parent. Thresholds and enabled rules stay unchanged.

## Files

- Public repo: design/AI_GUIDE.md, design/review-map.json, scripts/design-context.mjs; update audit runner, design README, public guide and review record.
- Private harness: tools/design-audit/measure.mjs, judge.mjs and focused regression tests. Isolate the changes in a separate worktree. Never copy private engine source into the public repo.

## Completion

Regression tests must detect a real sibling offset and a real short final line, while avoiding unrelated columns, inline code and deliberate code newlines. Re-run the site audit and fix genuine findings. Run browser, keyboard and 200% text checks after visual changes. Document warnings. Retain before/after results and separate automatic pass from human preference. Publish only after these checks pass; no threshold relaxation or silent rule exclusion.
