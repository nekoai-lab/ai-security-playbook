# Design harness integration

公開ガイドは `/ai-security-playbook/design-system/`、実装契約はDESIGN.md、数値の契約はdesign-rules.json。
非公開の共通ハーネスは、公開リポジトリにコピーせずローカルで実行する。

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4387
# 別ターミナルで:
DESIGN_HARNESS_DIR=/path/to/ai-dev-harness npm run design:audit
```

通常はホーム・デザインガイド・代表教材を測定する。追加URLや--out/--baselineは引数で指定できる。

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
実際の集計と残課題はUX_REVIEW.mdを参照。
