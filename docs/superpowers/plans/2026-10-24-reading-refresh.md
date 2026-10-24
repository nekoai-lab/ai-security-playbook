# Reading refresh implementation plan

Goal: Preserve existing navigation, URLs and FIELD NOTES assets while publishing the approved API-key narrative with explanatory visuals and clearer onward navigation.

Architecture: One MDX lesson uses an ArticleVisual Astro component and shared semantic figure styles. The lesson schema accepts a v2 coverage map pointing to real narrative sections, preserving all nine editorial requirements without imposing identical headings. LearningContext continues to respect validated route IDs and provides one primary next link.

Constraints: mini environment; existing tokens and audit thresholds; no real credentials, data input/download UI or extra dependencies; preserve README/LICENSE; all 38 routes remain.

- [x] Add approved prose and five explanatory figures using existing ExplorerCat and FieldIcon. Inspect 320/375/768/1280px; execute dummy Vite sample.
- [x] Add v2 coverage contract and negative tests for omitted requirements, missing section targets, case evidence, checklist, diagrams and worked example. Keep v1 unchanged and migration baseline explicit.
- [x] Simplify read-next/route-end navigation, preserve route query and no-JS series fallback. Verify intermediate, final and invalid-route states.
- [ ] Run check/build/test and full design audit; keyboard, text 200%, accessibility and visual review. Record current results and warnings. Commit, PR/CI, deploy and verify public lesson and route states.

Validation results: design/READING_REVIEW.md. Publication evidence: pull request checks and Pages workflow for the merged commit.
