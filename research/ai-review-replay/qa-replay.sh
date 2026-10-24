#!/bin/bash
# qa-replay：過去の PR と同じ形のレビューを、同じ版のコードに何度でもかけ直す（測定用。PR には何も書かない）
#
# 使い方: qa-replay.sh <target.env> <arm: old|new> <run番号> <出力フォルダ>
#   target.env に SRC（手元のリポジトリ）・BASE・HEAD（コミット）・SLUG・PR・TITLE・BODY・IMPL を書く。
#   任意で EXCLUDE（両方の版から外すパス。答えの手がかりになるファイル）、
#   BASE_STRIP（BASE の版を作るときに消すパス、または「パス:開始行-終了行」）。
#   arm=old は、測定した時点の request-qa（作者の非公開のレビュー用スクリプト）と同じ依頼文。
#   arm=new はそれに security-checklist.md を QA_RULES の直後に足したもの。それ以外は同じ。
#
# 公正さのために：
#   - git の履歴を持ち込まない（git archive で2つの版を取り出し、新しい git に2コミットだけ積む。コミットメッセージは中立）
#   - 毎回作り直す（前の回の結果が残らない）。置き場所は ~/Projects の外
#   - .claude/ .codex/ .cursor/ .mcp.json を外す（request-qa と同じ）
#   - レビュー役は codex exec -s read-only --ignore-rules --ephemeral（request-qa と同じ）
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
SCHEMA="${SCHEMA:-$HERE/schema.json}"   # レビュー結果の JSON の形（出力スキーマ）
TARGET="$1"; ARM="$2"; RUN="$3"; OUT="$4"
# shellcheck disable=SC1090
source "$TARGET"
mkdir -p "$OUT"
name="$(basename "$TARGET" .env)-$ARM-$RUN"
W=$(mktemp -d)/repo; mkdir -p "$W"
trap 'rm -rf "$(dirname "$W")"' EXIT

strip_paths() {  # 作業コピーから、外すパスと行範囲を消す
  local dir="$1"; shift
  for p in "$@"; do
    if [[ "$p" == *:*-* ]]; then
      local f="${p%%:*}" r="${p#*:}"
      sed -i '' "${r%-*},${r#*-}d" "$dir/$f"
    else
      rm -rf "${dir:?}/$p"
    fi
  done
}

git -C "$W" init -q
git -C "$SRC" archive "$BASE" | tar -x -C "$W"
strip_paths "$W" ${EXCLUDE:-} ${BASE_STRIP:-}
find "$W" -path "$W/.git" -prune -o \( -name .claude -o -name .codex -o -name .cursor -o -name .mcp.json \) -prune -exec rm -rf {} +
git -C "$W" add -A && git -C "$W" -c user.name=r -c user.email=r@example.com commit -q -m "base"
BASE_SHA=$(git -C "$W" rev-parse HEAD)
find "$W" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
git -C "$SRC" archive "$HEAD" | tar -x -C "$W"
strip_paths "$W" ${EXCLUDE:-}
find "$W" -path "$W/.git" -prune -o \( -name .claude -o -name .codex -o -name .cursor -o -name .mcp.json \) -prune -exec rm -rf {} +
git -C "$W" add -A && git -C "$W" -c user.name=r -c user.email=r@example.com commit -q -m "head"
HEAD_SHA=$(git -C "$W" rev-parse HEAD)

git -C "$SRC" show "$BASE:QA_RULES.md" > "$OUT/.rules" 2>/dev/null || cp "${QA_RULES_FILE:?ベースに QA_RULES.md が無いので QA_RULES_FILE を指定する}" "$OUT/.rules"
git -C "$W" diff "$BASE_SHA" "$HEAD_SHA" > "$OUT/.diff"
DIFF_BYTES=$(wc -c < "$OUT/.diff" | tr -d ' ')

{
  cat <<EOF
あなたは ${SLUG} の PR #${PR} のレビュー担当（QA）です。
この PR を実装したのは ${IMPL} で、あなたはそれとは別の AI です。

- 下の QA_RULES に従い、**blocking だけ**を報告してください。好みや細かい書き方は報告しない
- **ファイルを編集しない・コマンドで何かを変えない**（読み取りだけ）
- 今の作業ディレクトリは PR の head（${HEAD_SHA}）をチェックアウトしたもの。ベースは ${BASE_SHA}（origin/main）で、差分は \`git diff ${BASE_SHA} HEAD\` でも見られる。必要ならファイルを開いて前後を確かめる
- 下の QA_RULES はベース（${BASE_SHA}）のもの。この PR が QA_RULES.md を変えていれば、その変更も差分としてレビューする
- 出力は指定の JSON。blocking が0件なら verdict は "pass"、1件以上なら "blocking"
- checked の各項目（auth=認証、money=お金、personal_data=個人データ、deletion=削除）は、この PR に関係して中身を確かめたら "見た"、関係しなければ "対象外"
- summary には、何を見てどう判断したかを日本語で2〜4文
- blocking の各項目は日本語で。location は「ファイル:行」、repro は再現手順か入力、fix は直し方の案

===== QA_RULES.md =====
$(cat "$OUT/.rules")
EOF
  if [ "$ARM" = new ]; then printf '\n%s\n' "$(cat "$HERE/security-checklist.md")"; fi
  cat <<EOF

===== PR の説明 =====
タイトル: ${TITLE}

${BODY}

===== 差分（${DIFF_BYTES} バイト） =====
EOF
  head -c 150000 "$OUT/.diff"
  if [ "$DIFF_BYTES" -gt 150000 ]; then printf '\n\n（差分が長いので 150000 バイトで切った。続きは git diff で見ること）\n'; fi
} > "$OUT/$name.prompt.txt"
rm -f "$OUT/.rules" "$OUT/.diff"

start=$(date +%s)
AGENT_STATUS_OFF=1 codex exec -s read-only --ignore-rules -C "$W" --ephemeral --color never \
  --output-schema "$SCHEMA" -o "$OUT/$name.json" - < "$OUT/$name.prompt.txt" > "$OUT/$name.log" 2>&1 || echo "codex failed" >> "$OUT/$name.log"
echo "{\"name\":\"$name\",\"seconds\":$(( $(date +%s) - start )),\"codex\":\"$(codex --version | tr -d '\n')\",\"at\":\"$(date -u +%FT%TZ)\"}" > "$OUT/$name.meta.json"
echo "$name done"
