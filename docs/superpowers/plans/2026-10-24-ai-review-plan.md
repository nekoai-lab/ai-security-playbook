# AI design review implementation plan

Goal: reduce AI lookup overhead and finish accurate release checks for FIELD NOTES v1.1.
Architecture: a small public reference map selects relevant source files; the private engine measures comparable layout peers. Quick diagnostics and release checks are explicitly distinct.
Tech stack: Node built-ins, Astro, existing Playwright harness.

## Constraints

- Work on Mac mini. Keep README/LICENSE and lesson facts unchanged.
- Keep minimum text 12px, tap size 44px, current scale limits and all enabled rules.
- Do not publish private harness source or credentials.
- Never equate a quick check with release readiness or claim unmeasured AI speed gains.

## Tasks

- [x] Isolate the private harness branch. Add regressions for independent columns, inline fragments, real sibling offsets and real orphan lines. Implement scoped measurements and actionable selectors. Run existing and new tests.
- [x] Add a short AI entry, a route/reference map, and a context command that defaults to full review for unknown changes. Validate known and unknown change routing. Keep public guide detailed but link directly to relevant sections.
- [x] Separate explicit quick diagnostics from default full checks, with all seven routes in full mode. Print the mode and preserve the engine exit status.
- [x] Run site audit. Fix genuine visual findings, without changing the contract. Save machine reports and visual review. Re-run affected browser checks once changes settle.
- [x] Commit and review the private harness change, attach its PR; update public PR with engine revision, gate results and limitations. Release preparation gates passed (automatic errors zero and required visual checks reviewed); publication follows the passing GitHub checks. See GitHub Actions for actual deployment status.

Self-review: the design preserves the user-approved look, source privacy, release coverage and clear failure states. No cache or new model service is required; those would add stale-result risk and unmeasured overhead.
