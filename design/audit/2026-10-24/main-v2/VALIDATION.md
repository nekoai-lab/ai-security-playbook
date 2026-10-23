# Design validation（design-audit）

自動判定: 291 passed / 157 failed（うち error 137） / 56 review

この結果は「決めた床を割っていないか」だけを見ている。良いデザインかどうかは、下の「人と ChatGPT が見ること」と最終の目で決める。

左端のズレは測定v2では同じ親要素内の文字ブロックで比較する。旧測定の判定は従来どおり保持する。

## ルール別

| ルール | 重さ | passed | failed |
|---|---|---|---|
| `layout.no-horizontal-scroll` どの幅でも横にはみ出さない | error | 28 | 0 |
| `fonts.loaded` Web フォントが読めている（黙って代替フォントで描かれていない） | error | 28 | 0 |
| `type.min-size` 読ませる文字は最小サイズ以上 | error | 0 | 28 |
| `a11y.contrast` 文字と背景のコントラスト（WCAG AA） | error | 28 | 0 |
| `a11y.tap-target` 押せるものは指で押せる大きさ | error | 0 | 28 |
| `a11y.img-alt` 画像に alt がある（飾りは alt=""） | error | 28 | 0 |
| `structure.headings` 見出しの階層が正しい（h1 は1つ、段を飛ばさない） | warning | 28 | 0 |
| `content.placeholder` 穴埋め文言・ダミーを残さない | error | 28 | 0 |
| `rhythm.spacing-scale` 余白は決めた段階の値だけ（空白の間隔） | error | 0 | 28 |
| `rhythm.left-edges` 文字の左端を数 px ずらさない（テキストの配置） | error | 28 | 0 |
| `rhythm.orphans` 最後の行に1〜2文字だけ落とさない（折り返し位置） | error | 3 | 25 |
| `rhythm.type-scale` 文字サイズ・行間・字間は決めた段階だけ（構成のバランス） | error | 0 | 28 |
| `rhythm.line-length` 1行を長くしすぎない（読みやすさ） | warning | 20 | 8 |
| `style.color-count` 色の数を絞る（洗練） | warning | 16 | 12 |
| `style.radius-count` 角丸の種類を絞る（洗練） | warning | 28 | 0 |
| `style.shadow-count` 影の種類を絞る（洗練） | warning | 28 | 0 |

## 見た目の物差し

| 対象 | 幅 | 余白の種類 | 段階の外 | 左端の数 | 左端のズレ | 落ちた行 | 文字サイズ | 行間 | 字間 | 色 |
|---|---|---|---|---|---|---|---|---|---|---|
| 127.0.0.1_4388_ai-security-playbook | 375 | 17 | 10 | 19 | 0 | 1 | 16 | 11 | 15 | 13 |
| 127.0.0.1_4388_ai-security-playbook | 320 | 17 | 10 | 19 | 0 | 2 | 16 | 11 | 14 | 13 |
| 127.0.0.1_4388_ai-security-playbook | 768 | 22 | 12 | 37 | 0 | 3 | 16 | 10 | 15 | 13 |
| 127.0.0.1_4388_ai-security-playbook | 1280 | 22 | 12 | 39 | 0 | 0 | 15 | 10 | 16 | 13 |
| 127.0.0.1_4388_ai-security-playbook_design-system | 375 | 21 | 13 | 20 | 0 | 2 | 15 | 9 | 10 | 13 |
| 127.0.0.1_4388_ai-security-playbook_design-system | 320 | 21 | 13 | 20 | 0 | 3 | 15 | 9 | 10 | 13 |
| 127.0.0.1_4388_ai-security-playbook_design-system | 768 | 21 | 12 | 30 | 0 | 1 | 13 | 9 | 10 | 13 |
| 127.0.0.1_4388_ai-security-playbook_design-system | 1280 | 21 | 12 | 33 | 0 | 1 | 13 | 9 | 10 | 13 |
| 127.0.0.1_4388_ai-security-playbook_learn_basics | 375 | 18 | 12 | 18 | 0 | 2 | 12 | 7 | 8 | 9 |
| 127.0.0.1_4388_ai-security-playbook_learn_basics | 320 | 18 | 12 | 18 | 0 | 1 | 12 | 7 | 8 | 9 |
| 127.0.0.1_4388_ai-security-playbook_learn_basics | 768 | 20 | 11 | 22 | 0 | 4 | 11 | 7 | 7 | 8 |
| 127.0.0.1_4388_ai-security-playbook_learn_basics | 1280 | 20 | 11 | 22 | 0 | 0 | 11 | 7 | 7 | 8 |
| 127.0.0.1_4388_ai-security-playbook_learn_node-october-2026 | 375 | 19 | 13 | 19 | 0 | 4 | 13 | 7 | 8 | 12 |
| 127.0.0.1_4388_ai-security-playbook_learn_node-october-2026 | 320 | 19 | 13 | 21 | 0 | 2 | 13 | 7 | 8 | 12 |
| 127.0.0.1_4388_ai-security-playbook_learn_node-october-2026 | 768 | 21 | 12 | 26 | 0 | 3 | 12 | 7 | 7 | 11 |
| 127.0.0.1_4388_ai-security-playbook_learn_node-october-2026 | 1280 | 21 | 12 | 27 | 0 | 1 | 12 | 7 | 7 | 11 |
| 127.0.0.1_4388_ai-security-playbook_learn_commands | 375 | 20 | 14 | 56 | 0 | 1 | 13 | 8 | 8 | 17 |
| 127.0.0.1_4388_ai-security-playbook_learn_commands | 320 | 20 | 14 | 57 | 0 | 1 | 13 | 8 | 8 | 17 |
| 127.0.0.1_4388_ai-security-playbook_learn_commands | 768 | 20 | 11 | 57 | 0 | 1 | 12 | 7 | 7 | 16 |
| 127.0.0.1_4388_ai-security-playbook_learn_commands | 1280 | 20 | 11 | 59 | 0 | 1 | 12 | 7 | 7 | 16 |
| 127.0.0.1_4388_ai-security-playbook_learn_checklist | 375 | 19 | 13 | 17 | 0 | 1 | 10 | 7 | 8 | 9 |
| 127.0.0.1_4388_ai-security-playbook_learn_checklist | 320 | 19 | 13 | 17 | 0 | 1 | 10 | 7 | 8 | 9 |
| 127.0.0.1_4388_ai-security-playbook_learn_checklist | 768 | 22 | 13 | 20 | 0 | 2 | 10 | 6 | 7 | 8 |
| 127.0.0.1_4388_ai-security-playbook_learn_checklist | 1280 | 22 | 13 | 20 | 0 | 1 | 10 | 6 | 7 | 8 |
| 127.0.0.1_4388_ai-security-playbook_learn_operations | 375 | 20 | 14 | 21 | 0 | 1 | 13 | 8 | 8 | 12 |
| 127.0.0.1_4388_ai-security-playbook_learn_operations | 320 | 20 | 14 | 22 | 0 | 1 | 13 | 8 | 8 | 12 |
| 127.0.0.1_4388_ai-security-playbook_learn_operations | 768 | 20 | 12 | 28 | 0 | 5 | 11 | 8 | 7 | 11 |
| 127.0.0.1_4388_ai-security-playbook_learn_operations | 1280 | 20 | 12 | 29 | 0 | 0 | 11 | 8 | 7 | 11 |

## FAIL（直すもの）

### FAIL 127.0.0.1_4388_ai-security-playbook — type.min-size: 読ませる文字は最小サイズ以上
- 375px: 12px 未満が 39 個: 8px「by nekoai lab」 / 10px「GitHub ↗」 / 9px「FIELD NOTES / VOL. 01」 / 10px「by nekoai lab」 / 8px「日本語 / 無料・オープンソース」 / 8px「OBSERVE / VERIFY / PROTE」
- 320px: 12px 未満が 39 個: 8px「by nekoai lab」 / 10px「GitHub ↗」 / 9px「FIELD NOTES / VOL. 01」 / 10px「by nekoai lab」 / 8px「日本語 / 無料・オープンソース」 / 8px「OBSERVE / VERIFY / PROTE」
- 768px: 12px 未満が 59 個: 9px「by nekoai lab」 / 11px「by nekoai lab」 / 9px「日本語 / 無料・オープンソース」 / 10px「OBSERVE / VERIFY / PROTE」 / 10px「OBSERVE / VERIFY / PROTE」 / 10px「仕組みを見渡す、最初の一歩。」
- 1280px: 12px 未満が 61 個: 9px「by nekoai lab」 / 11px「by nekoai lab」 / 9px「日本語 / 無料・オープンソース」 / 10px「OBSERVE / VERIFY / PROTE」 / 10px「OBSERVE / VERIFY / PROTE」 / 10px「仕組みを見渡す、最初の一歩。」
- 直し方: 注記・キャプション・ふりがなも最小サイズ以上にする。小さくしたいときは色と余白で弱める

### FAIL 127.0.0.1_4388_ai-security-playbook — a11y.tap-target: 押せるものは指で押せる大きさ
- 375px: 44px 未満 1 個: 24×44「教材」
- 320px: 44px 未満 1 個: 24×44「教材」
- 768px: 44px 未満 1 個: 26×44「教材」
- 1280px: 44px 未満 1 個: 26×44「教材」
- 直し方: ボタン・ブロックのリンク・入力は 44px 以上の高さと幅を取る（padding で広げる）

### FAIL 127.0.0.1_4388_ai-security-playbook — rhythm.spacing-scale: 余白は決めた段階の値だけ（空白の間隔）
- 375px: 余白 17 種類、段階の外 10 種類: 5px×4, 6px×2, 10px×1, 14px×7, 18px×18, 20px×18, 22px×5, 28px×2, 30px×1, 34px×1
- 320px: 余白 17 種類、段階の外 10 種類: 5px×4, 6px×2, 10px×1, 14px×7, 18px×18, 20px×18, 22px×5, 28px×2, 30px×1, 34px×1
- 768px: 余白 23 種類、段階の外 12 種類: 5px×1, 6px×1, 7px×18, 10px×2, 14px×3, 15px×2, 18px×5, 20px×23, 22px×5, 26px×10, 28px×6, 36px×2
- 1280px: 余白 23 種類、段階の外 12 種類: 5px×1, 6px×1, 7px×18, 10px×2, 14px×3, 15px×2, 18px×7, 20px×21, 22px×5, 26px×10, 28px×3, 36px×4
- 直し方: margin・padding・gap を spaceScale の値に寄せる。セクションの間・見出しと本文の間は、それぞれ1つの値に固定する

### FAIL 127.0.0.1_4388_ai-security-playbook — rhythm.orphans: 最後の行に1〜2文字だけ落とさない（折り返し位置）
- 375px: 「…を、ともに探究する。」（最終行 2字） [#main > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > strong:nth-child(1)]
- 320px: 「…も、動いているのは？」（最終行 2字） [#latest > a:nth-child(2) > div:nth-child(2) > h2:nth-child(2)] / 「…階的な自動化を学ぶ。」（最終行 2字） [#library > div:nth-child(2) > a:nth-child(5) > div:nth-child(2) > p:nth-child(3)]
- 768px: 「…と証跡を設計します。」（最終行 2字） [#paths > div:nth-child(2) > article:nth-child(3) > p:nth-child(4)] / 「…ューを運用につなげる」（最終行 1字） [#paths > div:nth-child(2) > article:nth-child(3) > ol:nth-child(5) > li:nth-child(2)] / 「…も、動いているのは？」（最終行 2字） [#latest > a:nth-child(2) > div:nth-child(2) > h2:nth-child(2)]
- 直し方: 見出しは word-break: auto-phrase と text-wrap: balance、本文は text-wrap: pretty。それでも落ちる箇所は文言か幅を調整する

### FAIL 127.0.0.1_4388_ai-security-playbook — rhythm.type-scale: 文字サイズ・行間・字間は決めた段階だけ（構成のバランス）
- 375px: 文字サイズ 16 種類（上限 6）、行間 11 種類（上限 3）、字間 15 種類（上限 3）
- 320px: 文字サイズ 16 種類（上限 6）、行間 11 種類（上限 3）、字間 14 種類（上限 3）
- 768px: 文字サイズ 16 種類（上限 6）、行間 10 種類（上限 3）、字間 15 種類（上限 3）
- 1280px: 文字サイズ 15 種類（上限 6）、行間 10 種類（上限 3）、字間 16 種類（上限 3）
- 直し方: 文字サイズは5〜6段階、行間は見出しと本文の2〜3種類、字間は2〜3種類に絞り、トークンにする

### WARN 127.0.0.1_4388_ai-security-playbook — rhythm.line-length: 1行を長くしすぎない（読みやすさ）
- 375px: 1行 40 字超 1 か所: 42字「OBSERVE / VERIFY / PROTE」
- 直し方: 本文の幅を max-width で絞る（日本語は 1行 35〜40 字まで。目安 max-width: 40em）

### WARN 127.0.0.1_4388_ai-security-playbook — style.color-count: 色の数を絞る（洗練）
- 375px: 色 13 種類（上限 12）
- 320px: 色 13 種類（上限 12）
- 768px: 色 13 種類（上限 12）
- 1280px: 色 13 種類（上限 12）
- 直し方: 文字色・背景色・線の色をトークンに集め、似た色を1つにまとめる。強調色は1色

### FAIL 127.0.0.1_4388_ai-security-playbook_design-system — type.min-size: 読ませる文字は最小サイズ以上
- 375px: 12px 未満が 25 個: 8px「by nekoai lab」 / 10px「GitHub ↗」 / 9px「DESIGN SYSTEM / VERSION 」 / 11px「Paper#f5f1e6読むための背景」 / 11px「Paper」 / 11px「Ink#191919見出し・本文」
- 320px: 12px 未満が 25 個: 8px「by nekoai lab」 / 10px「GitHub ↗」 / 9px「DESIGN SYSTEM / VERSION 」 / 11px「Paper#f5f1e6読むための背景」 / 11px「Paper」 / 11px「Ink#191919見出し・本文」
- 768px: 12px 未満が 33 個: 9px「by nekoai lab」 / 10px「DESIGN SYSTEM / VERSION 」 / 11px「Paper#f5f1e6読むための背景」 / 11px「Paper」 / 11px「Ink#191919見出し・本文」 / 11px「Ink」
- 1280px: 12px 未満が 33 個: 9px「by nekoai lab」 / 10px「DESIGN SYSTEM / VERSION 」 / 11px「Paper#f5f1e6読むための背景」 / 11px「Paper」 / 11px「Ink#191919見出し・本文」 / 11px「Ink」
- 直し方: 注記・キャプション・ふりがなも最小サイズ以上にする。小さくしたいときは色と余白で弱める

### FAIL 127.0.0.1_4388_ai-security-playbook_design-system — a11y.tap-target: 押せるものは指で押せる大きさ
- 375px: 44px 未満 1 個: 24×44「教材」
- 320px: 44px 未満 1 個: 24×44「教材」
- 768px: 44px 未満 1 個: 26×44「教材」
- 1280px: 44px 未満 1 個: 26×44「教材」
- 直し方: ボタン・ブロックのリンク・入力は 44px 以上の高さと幅を取る（padding で広げる）

### FAIL 127.0.0.1_4388_ai-security-playbook_design-system — rhythm.spacing-scale: 余白は決めた段階の値だけ（空白の間隔）
- 375px: 余白 21 種類、段階の外 13 種類: 5px×4, 6px×1, 10px×7, 13px×18, 14px×8, 15px×3, 18px×10, 18.72px×1, 20px×4, 22px×2, 26px×2, 28px×2
- 320px: 余白 21 種類、段階の外 13 種類: 5px×4, 6px×1, 10px×7, 13px×18, 14px×8, 15px×3, 18px×10, 18.72px×1, 20px×4, 22px×2, 26px×2, 28px×2
- 768px: 余白 21 種類、段階の外 12 種類: 5px×1, 7px×6, 10px×8, 13px×18, 14px×3, 15px×7, 18px×2, 18.72px×1, 20px×11, 22px×3, 26px×2, 28px×6
- 1280px: 余白 21 種類、段階の外 12 種類: 5px×1, 7px×6, 10px×8, 13px×18, 14px×3, 15px×7, 18px×2, 18.72px×1, 20px×9, 22px×3, 26px×2, 28px×4
- 直し方: margin・padding・gap を spaceScale の値に寄せる。セクションの間・見出しと本文の間は、それぞれ1つの値に固定する

### FAIL 127.0.0.1_4388_ai-security-playbook_design-system — rhythm.orphans: 最後の行に1〜2文字だけ落とさない（折り返し位置）
- 375px: 「…見出しで区切ります。」（最終行 2字） [#main > div:nth-child(1) > section:nth-child(3) > p:nth-child(4)] / 「…01見る」（最終行 2字） [#main > div:nth-child(1) > section:nth-child(6) > div:nth-child(2) > figure:nth-child(1) > ol:nth-child(1) > li:nth-child(1)]
- 320px: 「…行き先につなぎます。」（最終行 2字） [#main > div:nth-child(1) > section:nth-child(4) > p:nth-child(3)] / 「…01見る」（最終行 2字） [#main > div:nth-child(1) > section:nth-child(6) > div:nth-child(2) > figure:nth-child(1) > ol:nth-child(1) > li:nth-child(1)] / 「…の説明と整合させる。」（最終行 2字） [#main > div:nth-child(1) > section:nth-child(8) > ul:nth-child(3) > li:nth-child(4)]
- 768px: 「…01見る」（最終行 2字） [#main > div:nth-child(1) > section:nth-child(6) > div:nth-child(2) > figure:nth-child(1) > ol:nth-child(1) > li:nth-child(1)]
- 1280px: 「…01見る」（最終行 2字） [#main > div:nth-child(1) > section:nth-child(6) > div:nth-child(2) > figure:nth-child(1) > ol:nth-child(1) > li:nth-child(1)]
- 直し方: 見出しは word-break: auto-phrase と text-wrap: balance、本文は text-wrap: pretty。それでも落ちる箇所は文言か幅を調整する

### FAIL 127.0.0.1_4388_ai-security-playbook_design-system — rhythm.type-scale: 文字サイズ・行間・字間は決めた段階だけ（構成のバランス）
- 375px: 文字サイズ 15 種類（上限 6）、行間 9 種類（上限 3）、字間 10 種類（上限 3）
- 320px: 文字サイズ 15 種類（上限 6）、行間 9 種類（上限 3）、字間 10 種類（上限 3）
- 768px: 文字サイズ 13 種類（上限 6）、行間 9 種類（上限 3）、字間 10 種類（上限 3）
- 1280px: 文字サイズ 13 種類（上限 6）、行間 9 種類（上限 3）、字間 10 種類（上限 3）
- 直し方: 文字サイズは5〜6段階、行間は見出しと本文の2〜3種類、字間は2〜3種類に絞り、トークンにする

### WARN 127.0.0.1_4388_ai-security-playbook_design-system — style.color-count: 色の数を絞る（洗練）
- 375px: 色 13 種類（上限 12）
- 320px: 色 13 種類（上限 12）
- 768px: 色 13 種類（上限 12）
- 1280px: 色 13 種類（上限 12）
- 直し方: 文字色・背景色・線の色をトークンに集め、似た色を1つにまとめる。強調色は1色

### WARN 127.0.0.1_4388_ai-security-playbook_design-system — rhythm.line-length: 1行を長くしすぎない（読みやすさ）
- 768px: 1行 40 字超 2 か所: 43字「オレンジはブランドの道しるべです。危険度や修正済」 / 45字「本文は静かに、見出しは力強く。日本語を主役にし、」
- 直し方: 本文の幅を max-width で絞る（日本語は 1行 35〜40 字まで。目安 max-width: 40em）

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_basics — type.min-size: 読ませる文字は最小サイズ以上
- 375px: 12px 未満が 11 個: 8px「by nekoai lab」 / 10px「GitHub ↗」 / 9px「基礎 / 7 MIN READ」 / 9px「ON THIS PAGE」 / 11px「同じプロジェクトでも、PC・CI・本番のバージョ」 / 11px「作業を保存し、どのアプリ・サービスに影響するか確」
- 320px: 12px 未満が 11 個: 8px「by nekoai lab」 / 10px「GitHub ↗」 / 9px「基礎 / 7 MIN READ」 / 9px「ON THIS PAGE」 / 11px「同じプロジェクトでも、PC・CI・本番のバージョ」 / 11px「作業を保存し、どのアプリ・サービスに影響するか確」
- 768px: 12px 未満が 10 個: 9px「by nekoai lab」 / 10px「基礎 / 7 MIN READ」 / 9px「ON THIS PAGE」 / 11px「同じプロジェクトでも、PC・CI・本番のバージョ」 / 11px「作業を保存し、どのアプリ・サービスに影響するか確」 / 10px「AI SECURITY PLAYBOOK仕組みを」
- 1280px: 12px 未満が 10 個: 9px「by nekoai lab」 / 10px「基礎 / 7 MIN READ」 / 9px「ON THIS PAGE」 / 11px「同じプロジェクトでも、PC・CI・本番のバージョ」 / 11px「作業を保存し、どのアプリ・サービスに影響するか確」 / 10px「AI SECURITY PLAYBOOK仕組みを」
- 直し方: 注記・キャプション・ふりがなも最小サイズ以上にする。小さくしたいときは色と余白で弱める

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_basics — a11y.tap-target: 押せるものは指で押せる大きさ
- 375px: 44px 未満 1 個: 24×44「教材」
- 320px: 44px 未満 1 個: 24×44「教材」
- 768px: 44px 未満 1 個: 26×44「教材」
- 1280px: 44px 未満 1 個: 26×44「教材」
- 直し方: ボタン・ブロックのリンク・入力は 44px 以上の高さと幅を取る（padding で広げる）

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_basics — rhythm.spacing-scale: 余白は決めた段階の値だけ（空白の間隔）
- 375px: 余白 18 種類、段階の外 12 種類: 5px×4, 6px×1, 10px×7, 13px×26, 14px×9, 18px×3, 20px×12, 22px×5, 26px×2, 28px×5, 30px×1, 36px×4
- 320px: 余白 18 種類、段階の外 12 種類: 5px×4, 6px×1, 10px×7, 13px×26, 14px×9, 18px×3, 20px×12, 22px×5, 26px×2, 28px×5, 30px×1, 36px×4
- 768px: 余白 20 種類、段階の外 11 種類: 5px×1, 10px×8, 13px×24, 14px×1, 15px×9, 18px×1, 20px×8, 22px×4, 26px×2, 28px×9, 30px×1
- 1280px: 余白 20 種類、段階の外 11 種類: 5px×1, 10px×8, 13px×24, 14px×1, 15px×9, 18px×1, 20px×6, 22px×4, 26px×2, 28px×7, 30px×1
- 直し方: margin・padding・gap を spaceScale の値に寄せる。セクションの間・見出しと本文の間は、それぞれ1つの値に固定する

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_basics — rhythm.orphans: 最後の行に1〜2文字だけ落とさない（折り返し位置）
- 375px: 「…スも確認しましょう。」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > p:nth-child(10)] / 「…ティ発表（一次資料）」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > ul:nth-child(14) > li:nth-child(2)]
- 320px: 「…わけではありません。」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > p:nth-child(3)]
- 768px: 「…PC・アプリを調べる」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > figure:nth-child(5) > ol:nth-child(1) > li:nth-child(1)] / 「…2設定と依存を調べる」（最終行 1字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > figure:nth-child(5) > ol:nth-child(1) > li:nth-child(2)] / 「…本番の実行環境を見る」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > figure:nth-child(5) > ol:nth-child(1) > li:nth-child(3)] / 「…3動作と実行版を確認」（最終行 1字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > figure:nth-child(9) > ol:nth-child(1) > li:nth-child(3)]
- 直し方: 見出しは word-break: auto-phrase と text-wrap: balance、本文は text-wrap: pretty。それでも落ちる箇所は文言か幅を調整する

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_basics — rhythm.type-scale: 文字サイズ・行間・字間は決めた段階だけ（構成のバランス）
- 375px: 文字サイズ 12 種類（上限 6）、行間 7 種類（上限 3）、字間 8 種類（上限 3）
- 320px: 文字サイズ 12 種類（上限 6）、行間 7 種類（上限 3）、字間 8 種類（上限 3）
- 768px: 文字サイズ 11 種類（上限 6）、行間 7 種類（上限 3）、字間 7 種類（上限 3）
- 1280px: 文字サイズ 11 種類（上限 6）、行間 7 種類（上限 3）、字間 7 種類（上限 3）
- 直し方: 文字サイズは5〜6段階、行間は見出しと本文の2〜3種類、字間は2〜3種類に絞り、トークンにする

### WARN 127.0.0.1_4388_ai-security-playbook_learn_basics — rhythm.line-length: 1行を長くしすぎない（読みやすさ）
- 1280px: 1行 40 字超 5 か所: 51字「ランタイムは、プログラムを動かす土台です。Nod」 / 50字「AIツール本体と、そのツールが起動するMCPサー」 / 51字「アプリ同梱のNodeは、ターミナルから使うNod」 / 50字「ファイルを更新しても、起動中のプロセスに新しいコ」
- 直し方: 本文の幅を max-width で絞る（日本語は 1行 35〜40 字まで。目安 max-width: 40em）

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_node-october-2026 — type.min-size: 読ませる文字は最小サイズ以上
- 375px: 12px 未満が 10 個: 8px「by nekoai lab」 / 10px「GitHub ↗」 / 9px「Node.js / 10 MIN READ」 / 9px「ON THIS PAGE」 / 11px「脆弱なコードへ入力が届くかを調べます。インターネ」 / 10px「AI SECURITY PLAYBOOK仕組みを」
- 320px: 12px 未満が 10 個: 8px「by nekoai lab」 / 10px「GitHub ↗」 / 9px「Node.js / 10 MIN READ」 / 9px「ON THIS PAGE」 / 11px「脆弱なコードへ入力が届くかを調べます。インターネ」 / 10px「AI SECURITY PLAYBOOK仕組みを」
- 768px: 12px 未満が 9 個: 9px「by nekoai lab」 / 10px「Node.js / 10 MIN READ」 / 9px「ON THIS PAGE」 / 11px「脆弱なコードへ入力が届くかを調べます。インターネ」 / 10px「AI SECURITY PLAYBOOK仕組みを」 / 10px「仕組みを知ることが、守る力になる。」
- 1280px: 12px 未満が 9 個: 9px「by nekoai lab」 / 10px「Node.js / 10 MIN READ」 / 9px「ON THIS PAGE」 / 11px「脆弱なコードへ入力が届くかを調べます。インターネ」 / 10px「AI SECURITY PLAYBOOK仕組みを」 / 10px「仕組みを知ることが、守る力になる。」
- 直し方: 注記・キャプション・ふりがなも最小サイズ以上にする。小さくしたいときは色と余白で弱める

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_node-october-2026 — a11y.tap-target: 押せるものは指で押せる大きさ
- 375px: 44px 未満 1 個: 24×44「教材」
- 320px: 44px 未満 1 個: 24×44「教材」
- 768px: 44px 未満 1 個: 26×44「教材」
- 1280px: 44px 未満 1 個: 26×44「教材」
- 直し方: ボタン・ブロックのリンク・入力は 44px 以上の高さと幅を取る（padding で広げる）

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_node-october-2026 — rhythm.spacing-scale: 余白は決めた段階の値だけ（空白の間隔）
- 375px: 余白 19 種類、段階の外 13 種類: 3px×4, 5px×4, 6px×1, 10px×4, 13px×78, 14px×17, 18px×3, 20px×11, 22px×5, 26px×8, 28px×3, 30px×1
- 320px: 余白 19 種類、段階の外 13 種類: 3px×4, 5px×4, 6px×1, 10px×4, 13px×78, 14px×17, 18px×3, 20px×11, 22px×5, 26px×8, 28px×3, 30px×1
- 768px: 余白 21 種類、段階の外 12 種類: 3px×4, 5px×1, 10px×5, 13px×76, 14px×1, 15px×17, 18px×3, 20px×9, 22px×4, 26px×8, 28px×7, 30px×1
- 1280px: 余白 21 種類、段階の外 12 種類: 3px×4, 5px×1, 10px×5, 13px×76, 14px×1, 15px×17, 18px×3, 20px×7, 22px×4, 26px×8, 28px×5, 30px×1
- 直し方: margin・padding・gap を spaceScale の値に寄せる。セクションの間・見出しと本文の間は、それぞれ1つの値に固定する

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_node-october-2026 — rhythm.orphans: 最後の行に1〜2文字だけ落とさない（折り返し位置）
- 375px: 「…取得処理も含みます。」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > ul:nth-child(13) > li:nth-child(1)] / 「…イルを展開する処理。」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > ul:nth-child(13) > li:nth-child(3)] / 「…確認できていません。」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > p:nth-child(18)] / 「…の実行版を記録する。」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > ol:nth-child(20) > li:nth-child(1)]
- 320px: 「…ないことが大切です。」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > p:nth-child(7)] / 「…に調べる確認コマンド」（最終行 1字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > a:nth-child(24)]
- 768px: 「…外部からの圧縮データ」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > figure:nth-child(11) > ol:nth-child(1) > li:nth-child(1)] / 「…tliを展開する処理」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > figure:nth-child(11) > ol:nth-child(1) > li:nth-child(2)] / 「…その処理のランタイム」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > figure:nth-child(11) > ol:nth-child(1) > li:nth-child(3)]
- 1280px: 「…けでは分かりません。」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > p:nth-child(10)]
- 直し方: 見出しは word-break: auto-phrase と text-wrap: balance、本文は text-wrap: pretty。それでも落ちる箇所は文言か幅を調整する

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_node-october-2026 — rhythm.type-scale: 文字サイズ・行間・字間は決めた段階だけ（構成のバランス）
- 375px: 文字サイズ 13 種類（上限 6）、行間 7 種類（上限 3）、字間 8 種類（上限 3）
- 320px: 文字サイズ 13 種類（上限 6）、行間 7 種類（上限 3）、字間 8 種類（上限 3）
- 768px: 文字サイズ 12 種類（上限 6）、行間 7 種類（上限 3）、字間 7 種類（上限 3）
- 1280px: 文字サイズ 12 種類（上限 6）、行間 7 種類（上限 3）、字間 7 種類（上限 3）
- 直し方: 文字サイズは5〜6段階、行間は見出しと本文の2〜3種類、字間は2〜3種類に絞り、トークンにする

### WARN 127.0.0.1_4388_ai-security-playbook_learn_node-october-2026 — rhythm.line-length: 1行を長くしすぎない（読みやすさ）
- 1280px: 1行 40 字超 8 か所: 50字「2026年10月21日の公式発表に掲載された修正」 / 51字「情報の確認日：2026年10月23日。対象の脆弱」 / 50字「残る6件は中・低深刻度で、HTTPのkeep-a」 / 50字「Brotliはデータの圧縮形式です。公式はこの問」
- 直し方: 本文の幅を max-width で絞る（日本語は 1行 35〜40 字まで。目安 max-width: 40em）

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_commands — type.min-size: 読ませる文字は最小サイズ以上
- 375px: 12px 未満が 84 個: 8px「by nekoai lab」 / 10px「GitHub ↗」 / 9px「Node.js / 8 MIN READ」 / 9px「ON THIS PAGE」 / 11.7px「ps」 / 11.7px「command」
- 320px: 12px 未満が 84 個: 8px「by nekoai lab」 / 10px「GitHub ↗」 / 9px「Node.js / 8 MIN READ」 / 9px「ON THIS PAGE」 / 11.7px「ps」 / 11.7px「command」
- 768px: 12px 未満が 8 個: 9px「by nekoai lab」 / 10px「Node.js / 8 MIN READ」 / 9px「ON THIS PAGE」 / 10px「AI SECURITY PLAYBOOK仕組みを」 / 10px「仕組みを知ることが、守る力になる。」 / 10px「デザインガイド」
- 1280px: 12px 未満が 8 個: 9px「by nekoai lab」 / 10px「Node.js / 8 MIN READ」 / 9px「ON THIS PAGE」 / 10px「AI SECURITY PLAYBOOK仕組みを」 / 10px「仕組みを知ることが、守る力になる。」 / 10px「デザインガイド」
- 直し方: 注記・キャプション・ふりがなも最小サイズ以上にする。小さくしたいときは色と余白で弱める

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_commands — a11y.tap-target: 押せるものは指で押せる大きさ
- 375px: 44px 未満 1 個: 24×44「教材」
- 320px: 44px 未満 1 個: 24×44「教材」
- 768px: 44px 未満 1 個: 26×44「教材」
- 1280px: 44px 未満 1 個: 26×44「教材」
- 直し方: ボタン・ブロックのリンク・入力は 44px 以上の高さと幅を取る（padding で広げる）

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_commands — rhythm.spacing-scale: 余白は決めた段階の値だけ（空白の間隔）
- 375px: 余白 20 種類、段階の外 14 種類: 3px×22, 5px×4, 6px×1, 10px×1, 11px×12, 13px×2, 14px×19, 18px×3, 20px×9, 22px×5, 26px×2, 28px×1
- 320px: 余白 20 種類、段階の外 14 種類: 3px×22, 5px×4, 6px×1, 10px×1, 11px×12, 13px×2, 14px×19, 18px×3, 20px×9, 22px×5, 26px×2, 28px×1
- 768px: 余白 20 種類、段階の外 11 種類: 3px×22, 5px×1, 10px×2, 14px×1, 15px×19, 18px×3, 20px×9, 22px×16, 26px×2, 28px×5, 30px×1
- 1280px: 余白 20 種類、段階の外 11 種類: 3px×22, 5px×1, 10px×2, 14px×1, 15px×19, 18px×3, 20px×7, 22px×16, 26px×2, 28px×3, 30px×1
- 直し方: margin・padding・gap を spaceScale の値に寄せる。セクションの間・見出しと本文の間は、それぞれ1つの値に固定する

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_commands — rhythm.orphans: 最後の行に1〜2文字だけ落とさない（折り返し位置）
- 375px: 「…ス・設定を読み取る。」（最終行 2字） [#main > div:nth-child(1) > header:nth-child(2) > p:nth-child(3)]
- 320px: 「…ものではありません。」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > p:nth-child(10)]
- 768px: 「…りしないでください。」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > p:nth-child(26)]
- 1280px: 「…貼らないでください。」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > blockquote:nth-child(3) > p:nth-child(1)]
- 直し方: 見出しは word-break: auto-phrase と text-wrap: balance、本文は text-wrap: pretty。それでも落ちる箇所は文言か幅を調整する

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_commands — rhythm.type-scale: 文字サイズ・行間・字間は決めた段階だけ（構成のバランス）
- 375px: 文字サイズ 13 種類（上限 6）、行間 8 種類（上限 3）、字間 8 種類（上限 3）
- 320px: 文字サイズ 13 種類（上限 6）、行間 8 種類（上限 3）、字間 8 種類（上限 3）
- 768px: 文字サイズ 12 種類（上限 6）、行間 7 種類（上限 3）、字間 7 種類（上限 3）
- 1280px: 文字サイズ 12 種類（上限 6）、行間 7 種類（上限 3）、字間 7 種類（上限 3）
- 直し方: 文字サイズは5〜6段階、行間は見出しと本文の2〜3種類、字間は2〜3種類に絞り、トークンにする

### WARN 127.0.0.1_4388_ai-security-playbook_learn_commands — style.color-count: 色の数を絞る（洗練）
- 375px: 色 17 種類（上限 12）
- 320px: 色 17 種類（上限 12）
- 768px: 色 16 種類（上限 12）
- 1280px: 色 16 種類（上限 12）
- 直し方: 文字色・背景色・線の色をトークンに集め、似た色を1つにまとめる。強調色は1色

### WARN 127.0.0.1_4388_ai-security-playbook_learn_commands — rhythm.line-length: 1行を長くしすぎない（読みやすさ）
- 1280px: 1行 40 字超 9 か所: 50字「以下は確認のためのコマンドです。更新、削除、プロ」 / 51字「プロセスの全引数や環境変数は表示しません。引数に」 / 50字「例：v24.22.1 は今回の24系の修正版です」 / 51字「process.execPath は、このコマン」
- 直し方: 本文の幅を max-width で絞る（日本語は 1行 35〜40 字まで。目安 max-width: 40em）

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_checklist — type.min-size: 読ませる文字は最小サイズ以上
- 375px: 12px 未満が 9 個: 8px「by nekoai lab」 / 10px「GitHub ↗」 / 9px「Node.js / 5 MIN READ」 / 9px「ON THIS PAGE」 / 10px「AI SECURITY PLAYBOOK仕組みを」 / 10px「仕組みを知ることが、守る力になる。」
- 320px: 12px 未満が 9 個: 8px「by nekoai lab」 / 10px「GitHub ↗」 / 9px「Node.js / 5 MIN READ」 / 9px「ON THIS PAGE」 / 10px「AI SECURITY PLAYBOOK仕組みを」 / 10px「仕組みを知ることが、守る力になる。」
- 768px: 12px 未満が 8 個: 9px「by nekoai lab」 / 10px「Node.js / 5 MIN READ」 / 9px「ON THIS PAGE」 / 10px「AI SECURITY PLAYBOOK仕組みを」 / 10px「仕組みを知ることが、守る力になる。」 / 10px「デザインガイド」
- 1280px: 12px 未満が 8 個: 9px「by nekoai lab」 / 10px「Node.js / 5 MIN READ」 / 9px「ON THIS PAGE」 / 10px「AI SECURITY PLAYBOOK仕組みを」 / 10px「仕組みを知ることが、守る力になる。」 / 10px「デザインガイド」
- 直し方: 注記・キャプション・ふりがなも最小サイズ以上にする。小さくしたいときは色と余白で弱める

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_checklist — a11y.tap-target: 押せるものは指で押せる大きさ
- 375px: 44px 未満 15 個: 24×44「教材」 / 19×19「INPUT」 / 19×19「INPUT」 / 19×19「INPUT」 / 19×19「INPUT」
- 320px: 44px 未満 15 個: 24×44「教材」 / 19×19「INPUT」 / 19×19「INPUT」 / 19×19「INPUT」 / 19×19「INPUT」
- 768px: 44px 未満 15 個: 26×44「教材」 / 19×19「INPUT」 / 19×19「INPUT」 / 19×19「INPUT」 / 19×19「INPUT」
- 1280px: 44px 未満 15 個: 26×44「教材」 / 19×19「INPUT」 / 19×19「INPUT」 / 19×19「INPUT」 / 19×19「INPUT」
- 直し方: ボタン・ブロックのリンク・入力は 44px 以上の高さと幅を取る（padding で広げる）

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_checklist — rhythm.spacing-scale: 余白は決めた段階の値だけ（空白の間隔）
- 375px: 余白 19 種類、段階の外 13 種類: 3px×14, 5px×4, 6px×15, 10px×1, 13px×34, 14px×54, 18px×3, 20px×9, 22px×5, 26px×2, 28px×1, 30px×1
- 320px: 余白 19 種類、段階の外 13 種類: 3px×14, 5px×4, 6px×15, 10px×1, 13px×34, 14px×54, 18px×3, 20px×9, 22px×5, 26px×2, 28px×1, 30px×1
- 768px: 余白 22 種類、段階の外 13 種類: 3px×14, 5px×1, 6px×14, 10px×2, 13px×32, 14px×29, 15px×26, 18px×1, 20px×9, 22px×4, 26px×2, 28px×5
- 1280px: 余白 22 種類、段階の外 13 種類: 3px×14, 5px×1, 6px×14, 10px×2, 13px×32, 14px×29, 15px×26, 18px×1, 20px×7, 22px×4, 26px×2, 28px×3
- 直し方: margin・padding・gap を spaceScale の値に寄せる。セクションの間・見出しと本文の間は、それぞれ1つの値に固定する

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_checklist — rhythm.orphans: 最後の行に1〜2文字だけ落とさない（折り返し位置）
- 375px: 「…ューを運用につなげる」（最終行 1字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > a:nth-child(15)]
- 320px: 「…わけではありません。」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > p:nth-child(2)]
- 768px: 「…サービスを洗い出した」（最終行 1字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > ul:nth-child(4) > li:nth-child(1)] / 「…サービスを洗い出した」（最終行 1字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > ul:nth-child(4) > li:nth-child(1) > label:nth-child(1) > p:nth-child(2)]
- 1280px: 「…わけではありません。」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > p:nth-child(2)]
- 直し方: 見出しは word-break: auto-phrase と text-wrap: balance、本文は text-wrap: pretty。それでも落ちる箇所は文言か幅を調整する

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_checklist — rhythm.type-scale: 文字サイズ・行間・字間は決めた段階だけ（構成のバランス）
- 375px: 文字サイズ 10 種類（上限 6）、行間 7 種類（上限 3）、字間 8 種類（上限 3）
- 320px: 文字サイズ 10 種類（上限 6）、行間 7 種類（上限 3）、字間 8 種類（上限 3）
- 768px: 文字サイズ 10 種類（上限 6）、行間 6 種類（上限 3）、字間 7 種類（上限 3）
- 1280px: 文字サイズ 10 種類（上限 6）、行間 6 種類（上限 3）、字間 7 種類（上限 3）
- 直し方: 文字サイズは5〜6段階、行間は見出しと本文の2〜3種類、字間は2〜3種類に絞り、トークンにする

### WARN 127.0.0.1_4388_ai-security-playbook_learn_checklist — rhythm.line-length: 1行を長くしすぎない（読みやすさ）
- 1280px: 1行 40 字超 16 か所: 50字「チェックはこのページを開いている間だけ有効です。」 / 51字「持っているPC、AIツール、MCP、CI、本番サ」 / 51字「ランタイムの系列と版、導入方法、管理者を記録した」 / 51字「公式発表で対象系列・修正版・サポート期間を確認し」
- 直し方: 本文の幅を max-width で絞る（日本語は 1行 35〜40 字まで。目安 max-width: 40em）

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_operations — type.min-size: 読ませる文字は最小サイズ以上
- 375px: 12px 未満が 14 個: 8px「by nekoai lab」 / 10px「GitHub ↗」 / 9px「基礎 / 10 MIN READ」 / 9px「ON THIS PAGE」 / 11px「別のAIに渡すだけで保証が得られるわけではありま」 / 11px「古い版の可能性がある対象：3件」
- 320px: 12px 未満が 14 個: 8px「by nekoai lab」 / 10px「GitHub ↗」 / 9px「基礎 / 10 MIN READ」 / 9px「ON THIS PAGE」 / 11px「別のAIに渡すだけで保証が得られるわけではありま」 / 11px「古い版の可能性がある対象：3件」
- 768px: 12px 未満が 9 個: 9px「by nekoai lab」 / 10px「基礎 / 10 MIN READ」 / 9px「ON THIS PAGE」 / 11px「別のAIに渡すだけで保証が得られるわけではありま」 / 10px「AI SECURITY PLAYBOOK仕組みを」 / 10px「仕組みを知ることが、守る力になる。」
- 1280px: 12px 未満が 9 個: 9px「by nekoai lab」 / 10px「基礎 / 10 MIN READ」 / 9px「ON THIS PAGE」 / 11px「別のAIに渡すだけで保証が得られるわけではありま」 / 10px「AI SECURITY PLAYBOOK仕組みを」 / 10px「仕組みを知ることが、守る力になる。」
- 直し方: 注記・キャプション・ふりがなも最小サイズ以上にする。小さくしたいときは色と余白で弱める

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_operations — a11y.tap-target: 押せるものは指で押せる大きさ
- 375px: 44px 未満 1 個: 24×44「教材」
- 320px: 44px 未満 1 個: 24×44「教材」
- 768px: 44px 未満 1 個: 26×44「教材」
- 1280px: 44px 未満 1 個: 26×44「教材」
- 直し方: ボタン・ブロックのリンク・入力は 44px 以上の高さと幅を取る（padding で広げる）

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_operations — rhythm.spacing-scale: 余白は決めた段階の値だけ（空白の間隔）
- 375px: 余白 20 種類、段階の外 14 種類: 3px×12, 5px×4, 6px×1, 10px×4, 11px×2, 13px×50, 14px×15, 18px×3, 20px×11, 22px×3, 26px×4, 28px×3
- 320px: 余白 20 種類、段階の外 14 種類: 3px×12, 5px×4, 6px×1, 10px×4, 11px×2, 13px×50, 14px×15, 18px×3, 20px×11, 22px×3, 26px×4, 28px×3
- 768px: 余白 20 種類、段階の外 12 種類: 3px×12, 5px×1, 10px×5, 13px×48, 14px×1, 15px×15, 18px×1, 20px×9, 22px×4, 26px×4, 28px×7, 30px×1
- 1280px: 余白 20 種類、段階の外 12 種類: 3px×12, 5px×1, 10px×5, 13px×48, 14px×1, 15px×15, 18px×1, 20px×7, 22px×4, 26px×4, 28px×5, 30px×1
- 直し方: margin・padding・gap を spaceScale の値に寄せる。セクションの間・見出しと本文の間は、それぞれ1つの値に固定する

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_operations — rhythm.orphans: 最後の行に1〜2文字だけ落とさない（折り返し位置）
- 375px: 「…新の通知先を決める。」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > ul:nth-child(17) > li:nth-child(1)]
- 320px: 「…を分けて追加します。」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > p:nth-child(21)]
- 768px: 「…odexが差分を確認」（最終行 1字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > figure:nth-child(4) > ol:nth-child(1) > li:nth-child(2)] / 「…3修正して再レビュー」（最終行 1字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > figure:nth-child(4) > ol:nth-child(1) > li:nth-child(3)] / 「…の確認まで行います。」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > figure:nth-child(4) > figcaption:nth-child(2)] / 「…ものではありません。」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > p:nth-child(8)] / 「…マンドを載せません。」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > p:nth-child(14)]
- 直し方: 見出しは word-break: auto-phrase と text-wrap: balance、本文は text-wrap: pretty。それでも落ちる箇所は文言か幅を調整する

### FAIL 127.0.0.1_4388_ai-security-playbook_learn_operations — rhythm.type-scale: 文字サイズ・行間・字間は決めた段階だけ（構成のバランス）
- 375px: 文字サイズ 13 種類（上限 6）、行間 8 種類（上限 3）、字間 8 種類（上限 3）
- 320px: 文字サイズ 13 種類（上限 6）、行間 8 種類（上限 3）、字間 8 種類（上限 3）
- 768px: 文字サイズ 11 種類（上限 6）、行間 8 種類（上限 3）、字間 7 種類（上限 3）
- 1280px: 文字サイズ 11 種類（上限 6）、行間 8 種類（上限 3）、字間 7 種類（上限 3）
- 直し方: 文字サイズは5〜6段階、行間は見出しと本文の2〜3種類、字間は2〜3種類に絞り、トークンにする

### WARN 127.0.0.1_4388_ai-security-playbook_learn_operations — rhythm.line-length: 1行を長くしすぎない（読みやすさ）
- 768px: 1行 40 字超 1 か所: 43字「別のAIに渡すだけで保証が得られるわけではありま」
- 1280px: 1行 40 字超 9 か所: 50字「元記事の再発防止スクリプトは、主にClaudeで」 / 50字「最初に作ったのは、更新をまとめるweekly-u」 / 50字「教材で示す悪い例は架空です。node app.j」 / 50字「ファイル名にも個人情報が含まれる可能性があります」
- 直し方: 本文の幅を max-width で絞る（日本語は 1行 35〜40 字まで。目安 max-width: 40em）

## 人と ChatGPT が見ること（機械では決めない）

- [ ] `direction.first-view` 最初の画面で「何の・誰のための・何をすればいいか」が3秒でわかる（ai-review）— 外れていたら: ファーストビューの見出しを具体的な価値に、主要な行動を1つ見える位置に置く
- [ ] `direction.single-cta` 主要な行動は1つ。強い色のボタンを並べない（ai-review）— 外れていたら: 主要な行動以外は弱いボタンかリンクにする
- [ ] `direction.hierarchy` 情報の優先順位が見た目の強さと一致している（ai-review）— 外れていたら: 大事なものほど上・大きく・余白を広く。同じ強さの要素を並べすぎない
- [ ] `visual.balance` 余白・写真・文字の比率が整い、セクションごとに景色が変わる（ai-review）— 外れていたら: 全セクションを同じ型（小見出し＋見出し＋リード＋リスト）にしない。余白を広く取る所と詰める所を決める
- [ ] `visual.ai-look` AI っぽい定番の飾りがない（DESIGN.md の「やらないこと」）（ai-review）— 外れていたら: 説明的な飾り・意味のない数字カード・どこにでもあるグラデーションを外し、DESIGN.md の「やらないこと」に照らす
- [ ] `copy.specific` どこにでも言える文を書かない。事実は入力データにあるものだけ（ai-review）— 外れていたら: そのものにしか言えない具体（数字・固有名・場面）に置き換える。データに無い事実は書かない
- [ ] `copy.ui-writing` ボタン・見出し・説明の文言の決まり（ai-review）— 外れていたら: ボタンは動詞（サ変は「する」を省く）、見出しは名詞、説明は敬体で動詞まで。リンクに「こちら」を使わない
- [ ] `visual.photo` 写真の質と使い方（解像度・トリミング・統一感）（human）— 外れていたら: 写真の色味・明るさをそろえ、主題が切れないようにトリミングする。仮の写真は本番前に必ず差し替える

スクリーンショット:
