---
id: "advisory-2026-10-21-python-emudhra"
title: "Python 3.15.1 / 3.14.9 緊急リリース: eMudhra CA証明書侵害への対応"
publishedDate: "2026-10-21"
severity: "high"
cve: []
ecosystem: "python"
affectedPackages:
  - name: "Python"
    affectedVersions: "3.15.0, 3.14.8以前, 3.13.16以前"
    fixedVersions: "3.15.1, 3.14.9, 3.13.17"
  - name: "pip"
    affectedVersions: "< 26.2.2"
    fixedVersions: "26.2.2"
  - name: "certifi"
    affectedVersions: "< 2026.10.19"
    fixedVersions: "2026.10.19"
sourceUrls:
  - "https://www.python.org/downloads/release/python-3151/"
  - "https://www.python.org/downloads/release/python-3149/"
  - "https://www.python.org/downloads/release/python-31317/"
status: "active"
confirmedDate: "2026-10-24"
---

## 概要

Python 3.15.1、3.14.9、3.13.17は、**eMudhra / emSign CA証明書のセキュリティインシデント**に対応するための緊急リリースです。このインシデントでは、信頼された認証局（CA）の中間証明書が侵害された可能性があり、攻撃者が正当な証明書を発行してなりすましを行うリスクがあります。

Pythonのリリースでは、バンドルされているpipをバージョン26.2.2にアップグレードし、さらにpipが依存するcertifiパッケージを2026.10.19に更新することで、侵害されたCA証明書を信頼リストから除外します。

このインシデントは、**Python以外のエコシステム（Node.js、npm、その他HTTPS通信を行うすべてのツール）にも影響**しています。

## ターゲットは誰か

### 影響を受ける人

以下のいずれかに該当する場合、対応が必要です：

- **Pythonで外部APIにHTTPS接続しているすべての開発者**
  - `requests`、`httpx`、`urllib`、`aiohttp` などのHTTPクライアントライブラリを使用
  - Web APIへのリクエスト（OpenAI API、Stripe API、Google API等）
  - Webスクレイピング
  - パッケージマネージャー（pip、Poetry、uv等）の実行

- **Python仮想環境（venv、virtualenv）を使用している人**
  - 各仮想環境には独自のpipがインストールされており、個別のアップグレードが必要

- **CI/CD環境でPythonを使用している人**
  - GitHub Actions、GitLab CI、CircleCI等
  - Dockerコンテナでのビルド・テスト

- **本番環境でPythonアプリケーションを運用している人**
  - Webサーバー（Django、Flask、FastAPI等）
  - データパイプライン（Airflow、Prefect等）
  - 機械学習推論サーバー

### 影響を受けない人

- Python 3.15.1、3.14.9、3.13.17以降を使用し、すべての仮想環境でpipを26.2.2にアップグレード済み
- Pythonを使用していない（他の言語のみ）

### 特に緊急度が高いケース

- 決済処理、認証、個人情報を扱うシステムでHTTPS通信を行っている
- ユーザーが指定したURLへのHTTPSリクエストを実行している（SSRF攻撃のリスク）
- 公開されているWebサービスやAPIサーバー

## どこの何を確認すればよいか

### 1. Pythonのバージョン確認

ターミナルで以下を実行：

```bash
python --version
# または
python3 --version
```

**結果の見方**:
- `Python 3.15.0` → 3.15.1 にアップグレード
- `Python 3.14.8` 以前 → 3.14.9 にアップグレード
- `Python 3.13.16` 以前 → 3.13.17 にアップグレード
- `Python 3.15.1`、`3.14.9`、`3.13.17` 以降 → OK

### 2. pipのバージョン確認

グローバル環境および**すべての仮想環境**で以下を実行：

```bash
python -m pip --version
```

**結果の見方**:
- `pip 26.2.2` 以降 → OK
- `pip 26.2.1` 以前 → アップグレードが必要

### 3. certifiのバージョン確認

```bash
python -m pip show certifi
```

**結果の見方**:
- `Version: 2026.10.19` 以降 → OK
- それ以前 → アップグレードが必要
- `WARNING: Package(s) not found: certifi` → 後述の手順でインストール

### 4. 仮想環境の確認

プロジェクトごとに仮想環境を使用している場合、**各環境を個別にアップグレード**する必要があります：

```bash
# プロジェクトAの仮想環境
cd ~/projects/project-a
source venv/bin/activate  # Windows: venv\Scripts\activate
python -m pip --version

# プロジェクトBの仮想環境
cd ~/projects/project-b
source .venv/bin/activate
python -m pip --version
```

### 5. CI/CD環境の確認

- **GitHub Actions**: `.github/workflows/*.yml` の `setup-python` でPythonバージョンを確認
- **GitLab CI**: `.gitlab-ci.yml` の `image:` でPythonイメージのタグを確認
- **Dockerfile**: `FROM python:3.15.0` などのベースイメージを確認

### 6. 本番環境の確認

```bash
# SSH接続して確認
ssh user@production-server
python3 --version
python3 -m pip --version
```

## どうしなければいけないか

### アップグレード手順

#### 1. Pythonのアップグレード（システムレベル）

**macOS (Homebrew使用)**:

```bash
brew update
brew upgrade python@3.15
# または
brew upgrade python@3.14
```

**Ubuntu/Debian**:

```bash
# deadsnakes PPAを使用（公式リポジトリに反映されるまでの暫定策）
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.15
# または
sudo apt install python3.14
```

**Windows**:

https://www.python.org/downloads/ から最新インストーラーをダウンロードして実行。

#### 2. pip のアップグレード（グローバル環境）

**セキュアなアップグレード方法**（公式推奨）:

```bash
python -m pip install "pip @ https://files.pythonhosted.org/packages/3f/06/3e4420302363fbb71be3c7f35ce042f54bfca330e3e66b3a2e3c4cca579f/pip-26.2.2-py3-none-any.whl#sha256=fd7f4dfa8190e014013b9f08f3e973f4e4c26ffd179a204895533a7254813a70"
```

**通常のアップグレード方法**:

```bash
python -m pip install --upgrade pip
```

#### 3. pip のアップグレード（仮想環境）

**プロジェクトごとに実行**:

```bash
cd ~/projects/your-project
source venv/bin/activate  # Windows: venv\Scripts\activate

# セキュアな方法
python -m pip install "pip @ https://files.pythonhosted.org/packages/3f/06/3e4420302363fbb71be3c7f35ce042f54bfca330e3e66b3a2e3c4cca579f/pip-26.2.2-py3-none-any.whl#sha256=fd7f4dfa8190e014013b9f08f3e973f4e4c26ffd179a204895533a7254813a70"

# または通常の方法
python -m pip install --upgrade pip
```

複数の仮想環境がある場合、以下のスクリプトで一括アップグレード（Bash）:

```bash
#!/bin/bash
for venv_dir in ~/projects/*/venv ~/projects/*/.venv; do
  if [ -d "$venv_dir" ]; then
    echo "Upgrading pip in $venv_dir"
    "$venv_dir/bin/python" -m pip install --upgrade pip
  fi
done
```

#### 4. certifi のアップグレード

```bash
python -m pip install --upgrade certifi
```

#### 5. uv のアップグレード（使用している場合）

```bash
pip install --upgrade uv
# または
curl -LsSf https://astral.sh/uv/install.sh | sh
```

#### 6. CI/CD環境の更新

**GitHub Actions**:

```yaml
- uses: actions/setup-python@v5
  with:
    python-version: '3.15.1'  # 特定バージョン指定の場合
    # または
    python-version: '3.15.x'  # 最新パッチを自動取得

- name: Upgrade pip
  run: python -m pip install --upgrade pip
```

**Dockerfile**:

```dockerfile
# 修正前
FROM python:3.15.0-slim

# 修正後
FROM python:3.15.1-slim

# pip のアップグレードも追加
RUN python -m pip install --upgrade pip
```

### すぐに上げられない場合の暫定策

#### 1. certifiのみをアップグレード

Python本体のアップグレードが即座にできない場合、certifiパッケージだけでも更新します：

```bash
python -m pip install --upgrade certifi
```

#### 2. 信頼できるCA証明書の明示的な指定

特定のAPIサーバーの証明書を検証する場合、そのサーバーのCA証明書を明示的に指定：

```python
import requests

# 信頼できるCA証明書を明示的に指定
response = requests.get(
    'https://api.example.com/endpoint',
    verify='/path/to/trusted-ca-bundle.crt'
)
```

#### 3. 内部通信の一時的な分離

本番環境で即座にアップグレードできない場合、外部APIとの通信を一時的に制限し、信頼できるドメインのみ許可：

```python
import requests
from urllib.parse import urlparse

ALLOWED_DOMAINS = ['api.stripe.com', 'api.openai.com']

def safe_request(url):
    domain = urlparse(url).netloc
    if domain not in ALLOWED_DOMAINS:
        raise ValueError(f"Untrusted domain: {domain}")
    return requests.get(url)
```

#### 4. システムの証明書ストアを更新

OS側のCA証明書リストを更新（Linux）:

```bash
sudo apt update
sudo apt install --reinstall ca-certificates
```

### 期限感

- **決済・認証を扱うシステム**: 即座に対応（24時間以内）
- **その他の本番環境**: 1週間以内の対応を推奨
- **開発環境**: 次回の環境構築時、または1ヶ月以内

本番環境の場合、まずステージング環境でアップグレードをテストし、問題がないことを確認してから本番に適用してください。

### 依存パッケージの確認

アップグレード後、依存パッケージに問題がないか確認：

```bash
python -m pip check
```

エラーが出た場合は、該当パッケージを再インストール：

```bash
python -m pip install --force-reinstall <package-name>
```

## eMudhra CA インシデントの背景

eMudhra Technologies Limited / emSignは、インドに拠点を置く認証局（CA）で、多くのブラウザやOSで信頼されています。2026年10月頃、eMudhraの中間証明書が侵害された可能性が報告され、主要なソフトウェアベンダー（Mozilla、Google、Microsoft、Apple等）がこのCAの証明書を信頼リストから除外しました。

攻撃者がこの侵害されたCA証明書を使用すると、任意のドメインに対して「正当な」証明書を発行し、中間者攻撃（MITM）を実行できる可能性があります。これにより、HTTPSで保護されているはずの通信が傍受・改ざんされるリスクがあります。

PythonのcertifiパッケージやNode.jsのca-certは、これらのOSベンダーの信頼リストに基づいており、今回の更新でeMudhraの侵害された証明書を除外しました。

## 関連するエコシステム

このCA証明書インシデントは、Python以外にも以下のエコシステムに影響します：

- Node.js（2026年10月21日セキュリティリリースで対応）
- npm、yarn、pnpm
- Ruby（bundler、gem）
- Go
- Rust（cargo）
- すべてのHTTPSクライアントライブラリ

各エコシステムで個別に対応が必要です。

## 参考情報

- [Python 3.15.1リリースノート](https://www.python.org/downloads/release/python-3151/)
- [Python 3.14.9リリースノート](https://www.python.org/downloads/release/python-3149/)
- [Python 3.13.17リリースノート](https://www.python.org/downloads/release/python-31317/)
- [pip 26.2.2リリースノート](https://pip.pypa.io/en/stable/news/)
- [certifi 2026.10.19リリースノート](https://github.com/certifi/python-certifi)
