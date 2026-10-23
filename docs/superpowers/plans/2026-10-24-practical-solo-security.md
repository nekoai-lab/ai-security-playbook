# Practical Solo Security Implementation Plan

Goal: 個人開発で起きやすい事故とAI連携の権限を、非エンジニアにも実践できる9教材へ。
Architecture: 既存MDX/Flow/DataTable/テーマ・ルートモデルを再利用。依存追加なし。
Constraints: FIELD NOTES、既存URL、一次資料、未確認範囲、最小文字と操作領域を維持。フォーム保存・書き出し・危険なコマンドなし。

1. 一次資料を確認して9教材をsrc/content/lessonsへ作る。PHP/MCPの時点、教材の推奨、架空例を区別する。
2. prerequisiteの明示参照を任意で加え、共通のNode前提を押し付けない。系列/関連/ルートは実際の教材IDへ。
3. 個人開発とAI連携の目的別ルートを追加し、テーマと一覧・更新・トップの入口を同期する。
4. 全生成URLをreview-mapへ追加。型/ビルド/リンク/参照・日付・所要時間を検査。全画面4幅、200%文字、検索・回遊・キーボード・目視を検証する。
5. 出典・要件対応・警告と限界をdesign/CONTENT_REVIEW.mdへ記録。CI成功後にマージし、Pages公開版で確認する。

追加承認: 最終構成は8分野。AIへの情報入力、アプリの構造、秘密、認可、MCP/エージェント、公開前、運用、異常時対応を扱う。docs/CONTENT_MAP.mdとCONTENT_STANDARD.mdを適用し、各事例の分類と役割別チェックを必須にする。
