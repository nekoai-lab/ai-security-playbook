# Fixed mountain backdrop implementation plan

Goal: 承認された山岳パノラマをPCのLP背面へ固定し、中央だけ縦スクロールする。スマホは全幅の紙面。
Architecture: Shellの明示的なmountainBackdrop propをトップだけで有効化。専用CSSで1280px以上のみ固定背景と最大1200pxの不透明な中央紙面を表示。通常のdocumentスクロールを使い、独立スクロール領域やJSの追従処理は作らない。
Tech stack: Astro、CSS、既存SharpによるWebP配信。

## Constraints
- FIELD NOTESトークン、ヘッダー/フッター/カード/教材/OGPは維持。スマホは外枠・山・外側余白を付けない。
- 生成原本と指示・派生ファイルの寸法/SHAを台帳に保存。装飾は空alt、支援技術から隠す。1280px未満では画像をダウンロードしないpicture/source。
- しきい値・検査対象は変更しない。別AIレビュー後に公開する。

## Tasks
- [x] 原本をsources/alpine-panorama.pngへ保存し、1920/2560 WebPを生成。台帳に生成モード・承認された背景案からの派生と記録。
- [x] ShellにmountainBackdrop?:booleanと背景picture・site-frameを追加。indexだけで有効化。専用CSSでposition:fixed/inset:0/object-fit:cover、PC紙面max-width:1200px、モバイルdisplay:contentsとする。
- [x] check/build/test、制作見本build/check、公開/見本FULLを実行。全ページ4幅のaxe/overflow/文字200%を確認。1280/1440/1920/2560で背景固定と中央幅、375で全幅と背景リクエストなし、通常ページは背景なしを実測。
- [ ] 実画面を保存して目視。PRとrequest-qa、CI通過後にマージ・Pages公開を確認。
