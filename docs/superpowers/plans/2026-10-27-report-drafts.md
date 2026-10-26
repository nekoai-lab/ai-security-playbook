# Private daily-report drafts

Goal: pinned private GitHub reports -> private, unverified editorial drafts; no posting or publication.

1. Read-only source collector: private source required, exact dated paths, commit/tree/blob pinning, no symlinks, stale/conflicting PR detection, bounded pagination.
2. Parse numbered 8-field topics; ignore fenced examples. Exclude internal-environment section from draft. Quote untrusted text, do not execute/fetch report links.
3. Private atomic bundles with owner-only permissions, one lock, immutable revision hashes, preserved previous drafts and safe summaries.
4. Unit/integration tests for source selection, format/URLs, idempotence, revisions, failures, permissions and unsafe output locations.
5. check/build/test and unchanged HTML evidence. Independent review, exact-head CI, merge separately from automatic publication.
6. Real-source run; report actual count honestly. Enable hourly private preparation only after reviewed implementation is merged.
