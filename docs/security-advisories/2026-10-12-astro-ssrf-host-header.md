---
id: "advisory-2026-10-12-astro-ssrf"
title: "Astro Node アダプタ: Host ヘッダーインジェクションによる SSRF 脆弱性"
publishedDate: "2026-10-12"
severity: "medium"
cve: []
ecosystem: "npm"
affectedPackages:
  - name: "@astrojs/node"
    affectedVersions: "<= 11.1.6"
    fixedVersions: "11.1.7"
sourceUrls:
  - "https://github.com/withastro/astro/security/advisories/GHSA-m8p5-r7qv-cx4c"
status: "active"
confirmedDate: "2026-10-24"
---

## 概要

Astroの Node.js アダプタ（`@astrojs/node`）バージョン 11.1.6 以前に、**Host ヘッダーインジェクション**による SSRF（Server-Side Request Forgery）脆弱性が発見されました（GHSA-m8p5-r7qv-cx4c）。

攻撃者が HTTP リクエストの `Host` ヘッダーを細工することで、Astroアプリケーション内の `Astro.url.origin` を任意のドメインに偽装できます。これにより、パスワードリセットリンク、メール確認リンク、OGタグなどに攻撃者が制御するURLが埋め込まれるリスクがあります。

この脆弱性は、`security.allowedDomains` の設定が `X-Forwarded-Host` ヘッダーのみを検証し、**生の `Host` ヘッダーを検証していない**ことが原因です。ドキュメントでは「Host ヘッダーインジェクション攻撃を防ぐ」と記載されていますが、実際には `Host` ヘッダーが検証されていませんでした。

## ターゲットは誰か

### 影響を受ける人

以下のいずれかに該当する場合、この脆弱性の対象です：

- **Astro を Node.js アダプタ（`@astrojs/node`）で本番運用している**
  - スタンドアロンサーバー（`mode: 'standalone'`）
  - ミドルウェアモード（`mode: 'middleware'`）
  - リバースプロキシ（Nginx、Caddy等）の背後で動作

- **`Astro.url` を使って絶対URLを生成している**
  - パスワードリセットリンクの生成
  - メール確認リンクの生成
  - OGタグ（`og:url`、`og:image` 等）
  - カノニカルURL（`<link rel="canonical">`）
  - APIのベースURLの構築

- **`security.allowedDomains` を設定している人も影響を受ける**
  - この設定は `X-Forwarded-Host` のみを検証し、`Host` ヘッダーを検証しないため、設定していても保護されません

### 影響を受けない人

- Vercel、Netlify、Cloudflare Pages などのホスティングサービスを使用（これらは独自のアダプタを使用）
- Deno、Cloudflare Workers などのエッジランタイムで動作
- 静的サイト生成（SSG）のみで、サーバーサイドレンダリング（SSR）を使用していない
- `@astrojs/node` 11.1.7 以降を使用

### 特に緊急度が高いケース

- 認証システム（パスワードリセット、メール確認）を実装している
- ユーザーからの入力を元に絶対URLを生成している
- キャッシュサーバー（Varnish、CDN等）を使用しており、Host ヘッダーでキャッシュキーを分けていない

## どこの何を確認すればよいか

### 1. `@astrojs/node` のバージョン確認

プロジェクトのルートディレクトリで以下を実行：

```bash
npm list @astrojs/node
# または
pnpm list @astrojs/node
# または
yarn list @astrojs/node
```

**結果の見方**:
- `@astrojs/node@11.1.6` 以前 → 更新が必要
- `@astrojs/node@11.1.7` 以降 → 修正済み
- パッケージが見つからない → Node.jsアダプタを使用していない（影響なし）

### 2. `package.json` の確認

```json
{
  "dependencies": {
    "@astrojs/node": "^11.1.6"  // ← このバージョンを確認
  }
}
```

**確認ポイント**:
- `^11.1.6`、`~11.1.6` などの範囲指定 → `npm update` で自動的に最新版に更新される可能性があるが、確認が必要
- `11.1.6` のピン留め → 手動で `11.1.7` に変更が必要

### 3. `package-lock.json` または `pnpm-lock.yaml` の確認

ロックファイルで実際にインストールされているバージョンを確認：

```bash
grep -A 2 '"@astrojs/node"' package-lock.json
# または
grep -A 2 '"@astrojs/node"' pnpm-lock.yaml
```

### 4. `Astro.url` の使用箇所を確認

プロジェクト内で `Astro.url` を使用している箇所を検索：

```bash
grep -r "Astro\.url" src/
```

**特に確認すべき箇所**:
- `new URL(..., Astro.url)` で絶対URLを生成
- `Astro.url.origin` をそのまま使用
- `Astro.url.href` をテンプレートに埋め込み

### 5. `astro.config.mjs` の `security.allowedDomains` 設定

```javascript
export default defineConfig({
  security: {
    allowedDomains: [
      { hostname: 'example.com', protocol: 'https' }
    ]
  }
});
```

**重要**: この設定があっても、11.1.6以前では `Host` ヘッダーが検証されないため、脆弱性は解消されません。

### 6. リバースプロキシの設定確認

Nginx や Caddy などのリバースプロキシを使用している場合、`Host` ヘッダーの転送設定を確認：

**Nginx の例**:

```nginx
location / {
    proxy_pass http://localhost:4321;
    proxy_set_header Host $host;  # ← この設定を確認
    proxy_set_header X-Forwarded-Host $host;
}
```

## どうしなければいけないか

### アップグレード手順

#### 1. `@astrojs/node` のアップグレード

**npm の場合**:

```bash
npm install @astrojs/node@latest
```

**pnpm の場合**:

```bash
pnpm update @astrojs/node
```

**yarn の場合**:

```bash
yarn upgrade @astrojs/node
```

#### 2. バージョンの確認

```bash
npm list @astrojs/node
```

`11.1.7` 以降であることを確認。

#### 3. ビルドとテスト

```bash
npm run build
npm run preview
```

ローカル環境で動作確認を行います。

#### 4. Host ヘッダーインジェクションのテスト

修正後、以下のコマンドで Host ヘッダーが正しく検証されることを確認：

```bash
# 正常なリクエスト
curl http://localhost:4321/

# Host ヘッダーを偽装したリクエスト（攻撃の模倣）
curl -H 'Host: attacker.example.com' http://localhost:4321/
```

**期待される動作**:
- 11.1.6以前: `Astro.url.origin` が `http://attacker.example.com` になる（脆弱）
- 11.1.7以降: `security.allowedDomains` が設定されている場合、不正な Host ヘッダーが拒否される、または `localhost` にフォールバックする

#### 5. 本番環境へのデプロイ

ステージング環境で動作を確認した後、本番環境にデプロイします。

```bash
# CI/CD の場合、通常のデプロイフロー
git add package.json package-lock.json
git commit -m "fix: Upgrade @astrojs/node to 11.1.7 (GHSA-m8p5-r7qv-cx4c)"
git push
```

### すぐに上げられない場合の暫定策

#### 1. リバースプロキシでの Host ヘッダー検証

Nginx や Caddy で、信頼できる Host ヘッダーのみを許可：

**Nginx の例**:

```nginx
server {
    listen 80;
    server_name example.com;

    # Host ヘッダーが example.com でない場合は拒否
    if ($host != "example.com") {
        return 444;  # 接続を即座に閉じる
    }

    location / {
        proxy_pass http://localhost:4321;
        proxy_set_header Host $server_name;  # 検証済みのホスト名を使用
        proxy_set_header X-Forwarded-Host $server_name;
    }
}
```

#### 2. アプリケーションレベルでの検証

Astro ミドルウェアで Host ヘッダーを検証：

```typescript
// src/middleware.ts
import { defineMiddleware } from 'astro:middleware';

const ALLOWED_HOSTS = ['example.com', 'www.example.com'];

export const onRequest = defineMiddleware((context, next) => {
  const host = context.request.headers.get('host');
  
  if (!host || !ALLOWED_HOSTS.includes(host.split(':')[0])) {
    return new Response('Invalid Host header', { status: 400 });
  }
  
  return next();
});
```

#### 3. 絶対URLの生成時に信頼できるベースURLを使用

環境変数で明示的にベースURLを指定：

```typescript
// astro.config.mjs
export default defineConfig({
  site: 'https://example.com'  // 信頼できるベースURL
});
```

```typescript
// .astro ファイル内
---
// Astro.url ではなく、環境変数から取得
const BASE_URL = import.meta.env.SITE || 'https://example.com';
const resetLink = `${BASE_URL}/reset?token=${token}`;
---
```

#### 4. キャッシュキーに Host ヘッダーを含める

Varnish や CDN でキャッシュを使用している場合、Host ヘッダーをキャッシュキーに含めることで、キャッシュポイズニングを防ぎます。

**Varnish の例**:

```vcl
sub vcl_hash {
    hash_data(req.url);
    hash_data(req.http.host);  # Host ヘッダーをキャッシュキーに含める
    return (lookup);
}
```

### 期限感

- **認証システムを持つアプリケーション**: 1週間以内の対応を推奨
- **OGタグやカノニカルURLを生成するサイト**: 2週間以内の対応を推奨
- **その他の本番環境**: 1ヶ月以内の対応を推奨

本番環境の場合、まずステージング環境でアップグレードをテストし、問題がないことを確認してから本番に適用してください。

## 脆弱性の詳細

### 根本原因

`@astrojs/node` パッケージは、リクエストから Astro の Request オブジェクトを生成する際に2つの関数を提供しています：

1. **`createRequest()`**: `security.allowedDomains` に対して `Host` ヘッダーを検証し、一致しない場合は `localhost` にフォールバック
2. **`createRequestFromNodeRequest()`**: `Host` ヘッダーをそのまま受け入れ、検証を行わない

問題は、`@astrojs/node` が**常に検証なしの方（`createRequestFromNodeRequest()`）を使用**していることです。これにより、`security.allowedDomains` を設定していても、`Host` ヘッダーは検証されません。

### 攻撃シナリオ

#### 1. パスワードリセットリンクの偽装

```astro
---
// src/pages/api/reset-password.ts
export async function POST({ request, url }) {
  const { email } = await request.json();
  
  // Astro.url.origin が攻撃者によって偽装される
  const resetLink = new URL('/reset?token=abc123', url).href;
  
  await sendEmail(email, `パスワードをリセット: ${resetLink}`);
}
---
```

攻撃者が以下のリクエストを送信：

```bash
curl -X POST \
  -H 'Host: attacker.example.com' \
  -H 'Content-Type: application/json' \
  -d '{"email":"victim@example.com"}' \
  http://legitimate-server.com/api/reset-password
```

ユーザーには `https://attacker.example.com/reset?token=abc123` というリンクが送信され、攻撃者がトークンを窃取できます。

#### 2. OGタグの汚染

```astro
---
// src/layouts/Layout.astro
const ogUrl = Astro.url.href;
---
<meta property="og:url" content={ogUrl} />
```

攻撃者が偽装した Host ヘッダーでページをクロール（または共有キャッシュに保存）させると、OGタグに攻撃者のドメインが埋め込まれます。

#### 3. キャッシュポイズニング

共有キャッシュ（CDN、Varnish等）が Host ヘッダーをキャッシュキーに含めていない場合、攻撃者が偽装したレスポンスを正規ユーザーに配信できます。

## 修正内容（11.1.7）

バージョン 11.1.7 では、`createRequestFromNodeRequest()` が以下のように修正されました：

- `Host` ヘッダーを `security.allowedDomains` に対して検証
- 一致しない場合は `localhost` にフォールバック（または拒否）
- `X-Forwarded-Host` と同様の検証ロジックを適用

## 関連する脆弱性

同時に公開された関連する脆弱性：

- **GHSA-mpr7-6m5w-76rw**: Astro View Transitions での任意のCSS注入（Low）
- **GHSA-98hj-9722-w3j8**: JSX/MDXのscript/style要素でのXSS（Moderate）

これらも合わせて確認し、Astroを最新版にアップグレードすることを推奨します。

## 参考情報

- [GitHub Security Advisory GHSA-m8p5-r7qv-cx4c](https://github.com/withastro/astro/security/advisories/GHSA-m8p5-r7qv-cx4c)
- [Astro公式ドキュメント: Security](https://docs.astro.build/en/reference/configuration-reference/#security)
- [CWE-918: Server-Side Request Forgery (SSRF)](https://cwe.mitre.org/data/definitions/918.html)
- [Host Header Attacks（PortSwigger）](https://portswigger.net/web-security/host-header)
