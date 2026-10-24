# Approved illustration archive / 2026-10-24

User requested saving/uploading approved illustration designs for future website use. The library indexes nine originals: formal logo, existing companion, hero, two adopted scenes, poses, peeking placements, paw stamps and corrected expressions. Existing canonical source files are referenced, not duplicated. Four newly archived boards retain their original PNG bytes; WebP previews are separate.

- catalog.json: role/status, source/preview paths, SHA-256, dimensions and alpha. All nine original hashes/files and preview links verified.
- README: browsable examples, source links and usage notes; all relative links verified.
- ILLUSTRATION_GUIDE: canonical character proportions, approved expression baseline, layout/pose references, regeneration instructions, integration/accessibility/loading rules.
- Earlier rounded four-expression design is explicitly not a reuse reference; earlier poses remain composition references, not the source of facial proportions.
- AI_GUIDE/AUTHORING/IMAGE_ASSETS link future workers to the library.

Scope is asset/documentation archival. No src/, public/, route, component or stylesheet is changed. A fresh build produces exactly the same file paths and SHA-256 contents as the pre-change dist snapshot. Website route/assets/anchor checks and all 14 tests pass. No new UI design audit is claimed and no previous audit is relabeled as current. Placement of individual new poses into the live site remains a separate UI change requiring normal full validation.
