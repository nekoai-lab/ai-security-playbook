---
id: "advisory-2026-10-21-nodejs"
title: "Node.js 2026年10月セキュリティリリース（HIGH深刻度の脆弱性11件を修正）"
publishedDate: "2026-10-21"
severity: "high"
cve: 
  - "CVE-2026-105482"
  - "CVE-2026-105483"
  - "CVE-2026-106069"
  - "CVE-2026-111497"
  - "CVE-2026-105481"
  - "CVE-2026-106072"
  - "CVE-2026-106074"
  - "CVE-2026-106070"
  - "CVE-2026-106071"
  - "CVE-2026-106073"
ecosystem: "nodejs"
affectedPackages:
  - name: "Node.js"
    affectedVersions: "26.x < 26.12.1, 24.x < 24.22.1, 22.x < 22.23.4"
    fixedVersions: "26.12.1, 24.22.1, 22.23.4"
sourceUrls:
  - "https://nodejs.org/en/blog/vulnerability/october-2026-security-releases"
status: "active"
confirmedDate: "2026-10-24"
---

## 概要

Node.jsプロジェクトは2026年10月21日、複数の深刻な脆弱性を修正したセキュリティリリースを公開しました。このリリースでは、**HIGH深刻度4件、MEDIUM深刻度3件、LOW深刻度3件**の計10件のNode.js本体の脆弱性に加え、依存ライブラリ（c-ares、OpenSSL、Undici、SQLite）の更新も含まれます。

最も深刻な問題は**Brotliデコーダーのバッファオーバーフロー（CVE-2026-111497）**で、攻撃者が細工したBrotli圧縮データを送り込むことで、プロセスメモリの破壊、クラッシュ、メモリ情報の漏洩、最悪の場合リモートコード実行につながる可能性があります。

## ターゲットは誰か

### 影響を受ける人

以下のいずれかに該当する場合、このセキュリティリリースの対象です：

- **Node.js 22.x、24.x、26.x を使用している**すべての開発者・本番環境
  - ローカル開発環境
  - CI/CD環境（GitHub Actions、GitLab CI、CircleCI等）
  - 本番サーバー（VPS、専用サーバー、オンプレミス）
  - コンテナ（Docker、Kubernetes）のベースイメージ
  - サーバーレス環境（AWS Lambda、Azure Functions、Google Cloud Functions等）
  - ホスティングサービス（Vercel、Netlify、Render等）でランタイムを選択できる場合

- **Node.jsを直接使わない人でも影響を受ける場合**:
  - Electron、Tauri等のデスクトップアプリ開発者（Node.jsをバンドル）
  - VSCode拡張機能の開発者
  - Astro、Next.js、Nuxt、SvelteKit等のフレームワークを使う人（開発時にNode.jsを実行）

### 影響を受けない人

- Node.js 18.x、20.x を使用している（ただし18.xは2025年4月でEOL済み、20.xは2026年4月でEOL済みのため、別途アップグレードを推奨）
- Denoを使用している（Node.js互換モードを使わない場合）
- ブラウザのみで動作するWebアプリ（Node.jsをビルドツールとしてのみ使い、ビルド後の成果物にNode.jsを含まない場合）

### 特に緊急度が高いケース

- `node:zlib` を使ってユーザー提供のデータ（HTTP body、ファイルアップロード等）を解凍している
- `dns.resolve*()`、`dns.reverse()` でユーザーが指定したホスト名を解決している
- TLS接続を行うサーバー・クライアント（APIサーバー、データベースクライアント等）
- `crypto.randomUUID()` や `crypto.randomInt()` をスナップショット機能と併用している

## どこの何を確認すればよいか

### 1. ローカル開発環境

ターミナルで以下を実行：

```bash
node -v
```

**結果の見方**:
- `v22.23.3` 以前 → 更新が必要
- `v24.22.0` 以前 → 更新が必要
- `v26.12.0` 以前 → 更新が必要
- `v22.23.4`、`v24.22.1`、`v26.12.1` 以降 → 修正済み

### 2. CI/CD環境（GitHub Actions）

リポジトリの `.github/workflows/*.yml` を開き、`setup-node` の `node-version` を確認：

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '22.x'  # ← ここを確認
```

**確認ポイント**:
- `22.x`、`24.x`、`26.x` などメジャーバージョン指定の場合 → 次回CI実行時に自動的に最新版を取得（対応不要）
- `22.23.3` など特定バージョン指定の場合 → 修正済みバージョンに更新が必要

### 3. Dockerfile

`Dockerfile` の `FROM` 行を確認：

```dockerfile
FROM node:22.23.3-alpine
# または
FROM node:22-alpine
# または
FROM node:lts
```

**確認ポイント**:
- `node:22.23.3` など特定バージョン → `node:22.23.4` 以降に更新
- `node:22-alpine`、`node:lts` などタグ指定 → イメージを再ビルド（`docker pull` + `docker build`）で最新版を取得

### 4. ホスティングサービス

- **Vercel**: Settings → General → Node.js Version で確認
- **Netlify**: Site settings → Build & deploy → Environment → Node version で確認
- **Render**: Settings → Environment → Node Version で確認
- **AWS Lambda**: ランタイム設定で `nodejs22.x` 等を確認（AWSがマネージドランタイムを更新するまで待つ）
- **Google Cloud Functions**: Runtime で `nodejs22` 等を確認（Googleが更新するまで待つ）

### 5. package.json の engines フィールド

```json
{
  "engines": {
    "node": ">=22.23.3"
  }
}
```

この記述は開発者への推奨であり、実際に動作するNode.jsのバージョンは環境ごとに確認が必要です。

## どうしなければいけないか

### 即座に対応すべきケース

以下の機能を使っている場合、**CVE-2026-111497（Brotliリモートコード実行）のリスクがあるため、可能な限り早急に更新**してください：

- `zlib.createBrotliDecompress()`
- `zlib.brotliDecompress()`
- `zlib.brotliDecompressSync()`
- HTTPリクエストボディで `Content-Encoding: br` を受け付けている

### アップグレード手順

#### ローカル開発環境（nvm使用の場合）

```bash
# 最新のLTS版をインストール
nvm install 22.23.4
nvm use 22.23.4
nvm alias default 22.23.4

# または
nvm install 24.22.1
nvm use 24.22.1
nvm alias default 24.22.1
```

#### ローカル開発環境（公式インストーラー使用の場合）

https://nodejs.org/ から対応バージョンをダウンロードしてインストール。

#### Docker

`Dockerfile` を更新：

```dockerfile
# 修正前
FROM node:22.23.3-alpine

# 修正後
FROM node:22.23.4-alpine
```

その後、イメージを再ビルド＆デプロイ：

```bash
docker build -t your-app:latest .
docker push your-app:latest
```

#### GitHub Actions

特定バージョンを指定している場合のみ、`.github/workflows/*.yml` を更新：

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '22.23.4'  # 更新
```

メジャーバージョン指定（`22.x`）の場合は変更不要です。

#### ホスティングサービス

各サービスの管理画面で、以下のいずれかの操作を行います：

1. **特定バージョン指定を最新版に変更**（例: `22.23.4`）
2. **メジャーバージョン指定に変更**（例: `22.x`）し、再デプロイ
3. サービスがマネージドランタイムを自動更新するまで待つ（AWS Lambda、Google Cloud Functions等）

再デプロイが必要なサービスの場合、設定変更後に手動でデプロイを実行してください。

### すぐに上げられない場合の暫定策

#### 1. Brotli機能の無効化（CVE-2026-111497）

Node.jsのアップグレードが即座にできない場合、Brotli圧縮の使用を一時的に停止します：

```javascript
// Express.js の例
// Brotli圧縮を受け付けない設定
app.use(compression({
  filter: (req, res) => {
    // br (Brotli) を除外
    const encoding = req.headers['accept-encoding'] || '';
    return !encoding.includes('br');
  }
}));
```

#### 2. DNS解決の入力検証強化（CVE-2026-105482）

ユーザー入力を `dns.resolve*()` に渡す場合、NULバイトを含むホスト名を拒否：

```javascript
function validateHostname(hostname) {
  if (hostname.includes('\0')) {
    throw new Error('Invalid hostname: contains NUL byte');
  }
  return hostname;
}

const hostname = validateHostname(userInput);
dns.resolve4(hostname, callback);
```

#### 3. WAF・リバースプロキシでの制限

- Brotli圧縮リクエストをプロキシレベルでブロック
- 信頼できないIPからのTLS接続を制限

### 期限感

- **HIGH深刻度（CVE-2026-111497等）**: 1週間以内の対応を推奨
- **MEDIUM深刻度**: 1ヶ月以内の対応を推奨
- **LOW深刻度**: 次回の定期メンテナンス時に対応

本番環境の場合、まずステージング環境でアップグレードをテストし、問題がないことを確認してから本番に適用してください。

## 主要な脆弱性の詳細

### HIGH深刻度

1. **CVE-2026-105482**: `dns.resolve*()` でNULバイトを含むホスト名が切り捨てられ、ドメイン検証を回避できる
2. **CVE-2026-105483**: 全角数字のIPアドレス（`１２７.0.0.1`）でTLS証明書の検証が回避される
3. **CVE-2026-106069**: 先頭ゼロ付きIPアドレス（`0127.0.0.1`）で接続先と異なるIPの証明書が受け入れられる
4. **CVE-2026-111497**: Brotliデコーダーのバッファオーバーフローによるリモートコード実行の可能性

### MEDIUM深刻度

5. **CVE-2026-105481**: HTTP Keep-Alive接続で、リクエスト送信前のレスポンスを有効と判定する
6. **CVE-2026-106072**: 非正規化IPv4アドレス（`0x7f.0.0.1`）でDNS SANがIP接続を認証できる
7. **CVE-2026-106074**: `crypto.randomUUID()` のエントロピーキャッシュがスナップショットに保存され、UUID衝突が発生

### LOW深刻度

8. **CVE-2026-106070**: `zlib.ZipFile` で検証失敗後に攻撃者が制御するバイトを返す
9. **CVE-2026-106071**: Permission Modelのワイルドカード許可で短いパスが誤って許可される
10. **CVE-2026-106073**: `fs.realpathSync()` でPermission Modelの読み込みチェックが実行されない

### 依存ライブラリ更新

- **c-ares**: DNS解決ライブラリの脆弱性修正（全バージョン）
- **OpenSSL**: 暗号化ライブラリの更新（24.x、22.x）
- **Undici**: HTTPクライアントライブラリの更新（全バージョン）
- **SQLite**: データベースライブラリの更新（22.x）
- **ca-cert**: eMudhra中間CA侵害への対応（全バージョン）

## 参考情報

- [Node.js公式セキュリティリリース告知](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases)
- [Node.js v22.23.4リリースノート](https://nodejs.org/en/blog/release/v22.23.4)
- [Node.js v24.22.1リリースノート](https://nodejs.org/en/blog/release/v24.22.1)
- [Node.js v26.12.1リリースノート](https://nodejs.org/en/blog/release/v26.12.1)
- [Node.jsセキュリティポリシー](https://nodejs.org/en/security/)
