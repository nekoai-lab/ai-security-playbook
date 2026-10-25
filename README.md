# ai-security-playbook

A practical AI security knowledge base covering vulnerabilities, secure development, AI agents, MCP, and cloud security—from beginner-friendly guides to hands-on solutions.

## 日本語教材サイト

Astro + MDXの静的サイトです。公開先は https://nekoai-lab.github.io/ai-security-playbook/ 。

### 開発・検証

Node.js 22.23.4以降（CIは24.22.1）。

```sh
npm ci
npm run dev
npm run check
npm run build
npm test
npm run preview
```

開発時も `/ai-security-playbook/` にアクセスします。

### 公開

GitHub Settings → Pages → Source を **GitHub Actions** に設定します。
mainへのpushで型・ビルド・内部リンク検証が通った場合のみ、Pagesへデプロイします。PRでは検証のみです。
`astro.config.mjs` の `site` と `base` が公開URLに対応しています。

### 教材の追加

[執筆ガイド](docs/AUTHORING.md)を参照してください。MCP・AIエージェント・クラウドのカテゴリを用意しています。
元記事と原稿、公式発表を照合し、未確認の影響を断定しない方針です。実装コード・自作サンプルコードは[MIT](LICENSE)、教材本文・独自図解・ブランド素材は[別の利用条件](LICENSE-CONTENT.md)です。以前の版で付与済みの許諾や第三者素材の条件は取り消しません。
