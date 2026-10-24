# Design harness integration

公開ガイドは `/ai-security-playbook/design-system/`、実装契約はDESIGN.md、数値の契約はdesign-rules.json。
非公開の共通ハーネスは、公開リポジトリにコピーせずローカルで実行する。

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4387
# 別ターミナルで:
DESIGN_HARNESS_DIR=/path/to/ai-dev-harness npm run design:audit
```

通常はreview-mapの全画面を契約の4幅で測定する。代表3画面の途中診断はdesign:audit:quickで行う。個別URL・幅を指定した実行はCUSTOMとなる。--out/--baselineで保存先と比較元を指定できる。

```sh
npm run design:audit -- --out design/audit/2026-10-24/after --baseline design/audit/2026-10-24/before/measure.json http://127.0.0.1:4387/ai-security-playbook/
```

ローカルにハーネスがないと終了コード2で準備不足を報告し、合格とは扱わない。
CIは誰でも実行できる型・ビルド・リンク検証を担当。私的repo用の認証トークンを追加しない。
検査結果と目視の判断はUX_REVIEW.mdで分ける。ルール変更はDESIGN.mdに理由を書く。


## 2026-10-24 の導入状態

GitHubの共通ハーネス origin/main `839e06f` を確認し、同じ版を一時ディレクトリから実行した。
追加の設計ワークフローも確認し、DESIGN / SPEC_TRACE / before-after / UX_REVIEWへ反映。
検査エンジンのソースはこのrepoへ含めない。
数値検査にerrorが残る限り、型・ビルドが成功しても合格や公開済みとは扱わない。
測定v2の修正を共通ハーネスmain 32f1d1bへ統合済み。最新の全体確認はaudit/2026-10-24/release/、同条件の導入前はmain-v2/。古いbefore/finalは履歴として保持する。
実際の集計と残課題はUX_REVIEW.mdを参照。


## AIの参照量を減らす

最初にAI_GUIDE.mdを読み、`npm run design:context -- src/content/lessons/commands.mdx` のように変更ファイルを渡す。
出力は参照ファイル、ガイドの該当節、影響画面。未知の変更は全画面確認へ戻す。ルールを本文へ複製せず、rulesとtokensを正本にする。

`npm run design:audit:quick` は代表3画面×375/1280pxの6条件で、作業中の診断だけを行う。
`npm run design:audit` はreview-mapの全画面×契約の4幅を確認する。個別URLや幅を指定した実行はCUSTOMと表示し、公開確認の代用にはしない。
新しい教材を追加したらreview-map.jsonのpagesも更新する。テストがcontent collectionとの不一致を検出する。
古い合格結果のキャッシュで現在の変更を承認しない。参照量と検査範囲は削減できるが、AIの判断時間や精度の改善率は実測まで断定しない。

生成したmeasure.jsonは保存したまま、.gitattributesで通常のソース差分から外す。合否・警告のVALIDATION.mdは差分に残し、結果を隠さない。大量の生測定値を毎回AIへ入力するのを避け、必要な要素だけ取り出す。

## 制作専用の見本 / 2026-10-25

公開サイトにデザインガイドは出さない。正本はsrc/design/DesignSystem.astro。`npm run dev:design`でローカル表示。静的確認は`npm run build:design`（出力.design-preview）→`npm run check:design-preview`→`npm run preview:design`→`npm run design:audit:guide`。公開側は従来どおり`npm run build`でdistを作りFULL検査。CIは両方をビルド・リンク検証し、Pagesへはdistだけを配信する。公開サイト内と設計資料の旧URLリンクは混同しない。
