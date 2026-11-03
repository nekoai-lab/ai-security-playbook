# セキュリティアドバイザリ

このディレクトリには、Node.js、Python、主要フレームワーク（Next.js、React、Astro、Express、FastAPI、Streamlit、AI開発でよく使うライブラリなど）の脆弱性情報やセキュリティリリースをアーカイブします。

## 目的

AI開発に関わるエコシステムの脆弱性情報を蓄積し、将来的にサイトで「最新ニュース」として公開する基盤とします。現時点では**サイト非公開**で、リポジトリ内のみで管理します。

## ファイル構成

各アドバイザリは1件1ファイルのMarkdown形式で保存します。ファイル名は `YYYY-MM-DD-slug.md` の形式にします（例: `2026-10-21-nodejs-security-release.md`）。

## Frontmatter 構造

以下のフィールドを含むYAML frontmatterを各ファイルの先頭に記述します。

```yaml
---
id: "advisory-YYYY-MM-DD-slug"
title: "アドバイザリのタイトル（日本語）"
publishedDate: "YYYY-MM-DD"
severity: "critical" | "high" | "medium" | "low"
cve: ["CVE-2026-XXXXX", "CVE-2026-YYYYY"]  # 複数可、該当なしの場合は空配列
ecosystem: "nodejs" | "python" | "npm" | "pypi" | "other"
affectedPackages:
  - name: "パッケージ名またはランタイム名"
    affectedVersions: "影響を受けるバージョン範囲"
    fixedVersions: "修正済みバージョン"
sourceUrls:
  - "https://nodejs.org/en/blog/vulnerability/..."
  - "https://github.com/advisories/GHSA-..."
status: "active" | "fixed" | "archived"
confirmedDate: "YYYY-MM-DD"  # 情報確認日
---
```

## 本文の必須構成

frontmatterに続く本文は、以下の3つの見出しを**必ず**含めます。

### 1. ターゲットは誰か

- どんな開発者・どんな構成が影響を受けるか
- 影響を受けない人は誰か（例: 既に最新版を使っている、該当機能を使っていない、等）
- 対象読者が「自分のことかどうか」を判断できる具体的な条件

### 2. どこの何を確認すればよいか

- 具体的なファイル、コマンド、設定画面
- 例:
  - `node -v` または `python --version` の実行結果
  - `package.json` / `package-lock.json` / `requirements.txt` / `Pipfile.lock` の該当パッケージ
  - `Dockerfile` の `FROM` 行
  - GitHub Actions の `setup-node` / `setup-python` のバージョン指定
  - ホスティングサービス（Vercel、Netlify、AWS Lambda、Render等）のランタイム設定画面

### 3. どうしなければいけないか

- 上げるべき具体的なバージョン
- アップグレード手順（コマンド、設定変更）
- すぐ上げられない場合の暫定策（ワークアラウンド、設定変更での軽減）
- 期限感（即座に対応すべきか、計画的に対応可能か）

## 執筆基準

### 事実と推測の区別

- 公式の一次情報（nodejs.org、python.org、GitHub Advisory Database、各プロジェクトの公式アナウンス）を必ず確認する
- 確認できない事実は書かない、推測で埋めない
- 出典URLを `sourceUrls` に必ず記載する

### 対象読者

- 非エンジニアでも理解できる言葉を使う
- 専門用語は初出で説明する
- 「危険」「注意」だけで済ませず、何が起きるのか、どう判断するのかを具体的に書く

### 避けるべき表現

- 一般論・概要だけで終わらせない
- 根拠のない影響断定（「すべての環境で悪用可能」等）
- 被害件数や悪用事例の推測
- 本番環境への説明なしの強制的な変更指示

## テンプレート

```markdown
---
id: "advisory-YYYY-MM-DD-slug"
title: "タイトル"
publishedDate: "YYYY-MM-DD"
severity: "high"
cve: []
ecosystem: "nodejs"
affectedPackages:
  - name: "Node.js"
    affectedVersions: "< 22.23.4, < 24.22.1, < 26.12.1"
    fixedVersions: "22.23.4, 24.22.1, 26.12.1"
sourceUrls:
  - "https://example.com/security-release"
status: "active"
confirmedDate: "YYYY-MM-DD"
---

## 概要

（1〜2段落で、何の問題か、どの程度深刻かを説明）

## ターゲットは誰か

（影響を受ける人・構成、影響を受けない人を具体的に記述）

## どこの何を確認すればよいか

（コマンド、ファイル、設定画面を列挙）

## どうしなければいけないか

（アップグレード手順、暫定策、期限感を記述）

## 参考情報

- [出典タイトル](URL)
```

## 将来の公開方法（検討中）

現時点では未実装ですが、将来的に以下の方法でサイトに公開する可能性があります。

- Astro Content Collections として `src/content/advisories/` に移動し、一覧ページを作成
- RSS フィードの生成
- タグやエコシステムでのフィルタリング機能
- 深刻度による色分け表示

## 関連ドキュメント

- [CONTENT_STANDARD.md](../CONTENT_STANDARD.md): 教材の品質ルール
- [AUTHORING.md](../AUTHORING.md): 執筆ガイド
