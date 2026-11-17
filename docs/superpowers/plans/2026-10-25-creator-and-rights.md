# Creator and content rights implementation plan

Goal: Tsukinekoの紹介と発信先を共通化し、コードと教材・素材の利用条件を区別する。
Architecture: creator.tsを発行者情報の正本とし、CreatorLinksとCreatorProfileをトップ/紹介/記事/共通フッターで使う。termsページとLICENSE-CONTENT.mdに対象別・旧版・第三者素材の例外を明示する。MITの本文は保持し、適用範囲の参照だけを追記する。
Tech stack: Astro、TypeScript、既存トークン。

- [x] creator.ts、共通リンク/紹介部品、トップ末尾/紹介ページ/全記事末尾/フッターへ追加。リンクはユーザー指定の4URL、独自ロゴは作らない。
- [x] termsとLICENSE-CONTENTを追加。コードと自作サンプルはMIT、本文・独自の図・ブランド素材は権利のある範囲で原則許諾制。引用等の法定利用、第三者の条件、旧版の許諾存続を明記。原稿・素材の公開範囲や独自ドメインは変更しない。
- [x] author metadata・元記事URLと利用条件リンクを記事共通部へ。既存の日付を更新しない。新ページはreview-mapへ追加。ライセンス範囲と全記事への反映を検査。
- [ ] check/build/test、制作見本build/check、公開/見本FULL、全画面4幅、文字200%、新しいリンクのキーボード/目視確認。PR・別AIレビュー・公開と本番確認。
