# サイト構造の確認 / 2026-10-25

## 確認結果

公開50ページと制作見本は共通のShell.astroを使用。html/head・ヘッダー・フッターの実装はShellの1か所だけで、各生成ページでもヘッダー/フッター各1つを検査した。各記事に個別の共通枠を持たせていないため、今回のGitHubボタン削除は1か所で全ページへ反映する。

| 項目 | 管理元 | 確認 |
|---|---|---|
| 全ページ共通枠・OGP | src/layouts/Shell.astro | 全50ページ、共通枠とheadの検査 |
| メインナビ | src/data/site-navigation.ts | 3メニュー・所属判定を集約 |
| 教材本文とページ型 | src/content/lessons / src/pages/learn/[...id].astro | MDX24件、共通テンプレート |
| テーマ・段階・形式 | src/data/catalog.ts / content.config.ts | 型と参照IDの検査 |
| ルート・シリーズ | learning-paths / reader-journeys / catalog | ID存在、重複、前提の循環、読む時間を検査 |
| カード画像 | CardArt / card-art.ts | 役割別の構図と素材を集約 |
| デザイン見本 | DESIGN_PREVIEW / src/design | 公開distに含めず別出力 |
| ローカルリンク | scripts/check-site.mjs | base・画像・ページ・アンカーを全件照合 |
| 全件監査の範囲 | design/review-map.json | 実際の生成ルートとの完全一致をテスト |

## 修正したこと

- ヘッダーのGitHubロゴ/リンクを削除。専用CSSを取り除き、メインナビを配置。
- 場面別start/配下3ページでは学習ルートが選択表示になっていなかった。ナビの定義と所属判定をsite-navigation.tsへ集約し、start/を学習ルートへ含めた。
- 全生成ページでヘッダー/フッター各1つ、ヘッダーにGitHubリンクなし、所属するメニューが正しく1つ選択されることをテストへ追加。

## 保守上の注意（公開を妨げる不具合ではない）

- global.cssは約2000行、library.cssは約1200行。共通UI・記事・制作見本のスタイルが同居している。今後の改修単位で部品側へ寄せる。一括移動で見た目を変える大規模整理は今回行わない。
- パンくずはページ型ごとに構造が異なる。リンクは全件検査済み。変更が増えた時は共通Breadcrumbsへまとめられるが、違う意味の導線を同じ型へ無理に押し込まない。
- 本文の場面画とカード用ポーズは用途が違う。共通化を理由に全て同じ猫の画像へ戻さない。
- ブランドの再利用原本と、記事専用の原本は別の保管役割。公開サイトを非公開のブランドrepoへ実行時依存させない。

## 最終検証

check:109ファイル、error/warning/hint 0。build50ページ。npm test成功（OGP4テストと全ページ共通枠/ナビの検査を含む）。制作専用build51ページ/check成功。

公開FULL 3196 passed / error 0 / 色数warning 4、GUIDE FULL 60 passed / error 0 / 色数warning 4。既存のcommands/見本の警告を維持し、しきい値変更・除外なし。204画面でaxe/横はみ出し/実行エラー0。375pxで全50ページと制作見本の文字200%。4幅でスキップ→ロゴ→メニューのTab移動も確認。

証拠:design/audit/2026-10-25/structure-*、header-cleanup-*。
