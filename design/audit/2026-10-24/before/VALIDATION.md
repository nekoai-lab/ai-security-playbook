# Design validation（design-audit）

自動判定: 85 passed / 59 failed（うち error 52） / 24 review

この結果は「決めた床を割っていないか」だけを見ている。良いデザインかどうかは、下の「人と ChatGPT が見ること」と最終の目で決める。

## ルール別

| ルール | 重さ | passed | failed |
|---|---|---|---|
| `layout.no-horizontal-scroll` どの幅でも横にはみ出さない | error | 9 | 0 |
| `fonts.loaded` Web フォントが読めている（黙って代替フォントで描かれていない） | error | 9 | 0 |
| `type.min-size` 読ませる文字は最小サイズ以上 | error | 0 | 9 |
| `a11y.contrast` 文字と背景のコントラスト（WCAG AA） | error | 9 | 0 |
| `a11y.tap-target` 押せるものは指で押せる大きさ | error | 0 | 9 |
| `a11y.img-alt` 画像に alt がある（飾りは alt=""） | error | 9 | 0 |
| `structure.headings` 見出しの階層が正しい（h1 は1つ、段を飛ばさない） | warning | 9 | 0 |
| `content.placeholder` 穴埋め文言・ダミーを残さない | error | 9 | 0 |
| `rhythm.spacing-scale` 余白は決めた段階の値だけ（空白の間隔） | error | 0 | 9 |
| `rhythm.left-edges` 文字の左端を数 px ずらさない（テキストの配置） | error | 0 | 9 |
| `rhythm.orphans` 最後の行に1〜2文字だけ落とさない（折り返し位置） | error | 2 | 7 |
| `rhythm.type-scale` 文字サイズ・行間・字間は決めた段階だけ（構成のバランス） | error | 0 | 9 |
| `rhythm.line-length` 1行を長くしすぎない（読みやすさ） | warning | 8 | 1 |
| `style.color-count` 色の数を絞る（洗練） | warning | 3 | 6 |
| `style.radius-count` 角丸の種類を絞る（洗練） | warning | 9 | 0 |
| `style.shadow-count` 影の種類を絞る（洗練） | warning | 9 | 0 |

## 見た目の物差し

| 対象 | 幅 | 余白の種類 | 段階の外 | 左端の数 | 左端のズレ | 落ちた行 | 文字サイズ | 行間 | 字間 | 色 |
|---|---|---|---|---|---|---|---|---|---|---|
| 127.0.0.1_4387_ai-security-playbook | 375 | 17 | 10 | 19 | 4 | 1 | 16 | 11 | 15 | 13 |
| 127.0.0.1_4387_ai-security-playbook | 320 | 17 | 10 | 19 | 4 | 2 | 16 | 11 | 14 | 13 |
| 127.0.0.1_4387_ai-security-playbook | 1280 | 22 | 12 | 39 | 4 | 0 | 15 | 10 | 16 | 13 |
| 127.0.0.1_4387_ai-security-playbook_design-system | 375 | 21 | 13 | 20 | 1 | 1 | 15 | 9 | 10 | 13 |
| 127.0.0.1_4387_ai-security-playbook_design-system | 320 | 21 | 13 | 20 | 1 | 2 | 15 | 9 | 10 | 13 |
| 127.0.0.1_4387_ai-security-playbook_design-system | 1280 | 21 | 12 | 33 | 3 | 0 | 13 | 9 | 10 | 13 |
| 127.0.0.1_4387_ai-security-playbook_learn_node-october-2026 | 375 | 19 | 13 | 19 | 3 | 8 | 13 | 7 | 8 | 12 |
| 127.0.0.1_4387_ai-security-playbook_learn_node-october-2026 | 320 | 19 | 13 | 21 | 3 | 7 | 13 | 7 | 8 | 12 |
| 127.0.0.1_4387_ai-security-playbook_learn_node-october-2026 | 1280 | 21 | 12 | 27 | 3 | 1 | 12 | 7 | 7 | 11 |

## FAIL（直すもの）

### FAIL 127.0.0.1_4387_ai-security-playbook — type.min-size: 読ませる文字は最小サイズ以上
- 375px: 12px 未満が 38 個: 8px「by nekoai lab」 / 10px「GitHub ↗」 / 9px「FIELD NOTES / VOL. 01」 / 10px「by nekoai lab」 / 8px「日本語 / 無料・オープンソース」 / 8px「OBSERVE / VERIFY / PROTE」
- 320px: 12px 未満が 38 個: 8px「by nekoai lab」 / 10px「GitHub ↗」 / 9px「FIELD NOTES / VOL. 01」 / 10px「by nekoai lab」 / 8px「日本語 / 無料・オープンソース」 / 8px「OBSERVE / VERIFY / PROTE」
- 1280px: 12px 未満が 51 個: 9px「by nekoai lab」 / 11px「by nekoai lab」 / 9px「日本語 / 無料・オープンソース」 / 10px「OBSERVE / VERIFY / PROTE」 / 10px「仕組みを見渡す、最初の一歩。」 / 11px「技術・リスク・実践 ― 現場で使える知識を、一つ」
- 直し方: 注記・キャプション・ふりがなも最小サイズ以上にする。小さくしたいときは色と余白で弱める

### FAIL 127.0.0.1_4387_ai-security-playbook — a11y.tap-target: 押せるものは指で押せる大きさ
- 375px: 44px 未満 1 個: 24×44「教材」
- 320px: 44px 未満 1 個: 24×44「教材」
- 1280px: 44px 未満 1 個: 26×44「教材」
- 直し方: ボタン・ブロックのリンク・入力は 44px 以上の高さと幅を取る（padding で広げる）

### FAIL 127.0.0.1_4387_ai-security-playbook — rhythm.spacing-scale: 余白は決めた段階の値だけ（空白の間隔）
- 375px: 余白 17 種類、段階の外 10 種類: 5px×4, 6px×2, 10px×1, 14px×7, 18px×18, 20px×18, 22px×5, 28px×2, 30px×1, 34px×1
- 320px: 余白 17 種類、段階の外 10 種類: 5px×4, 6px×2, 10px×1, 14px×7, 18px×18, 20px×18, 22px×5, 28px×2, 30px×1, 34px×1
- 1280px: 余白 23 種類、段階の外 12 種類: 5px×1, 6px×1, 7px×18, 10px×2, 14px×3, 15px×2, 18px×7, 20px×21, 22px×5, 26px×10, 28px×3, 36px×4
- 直し方: margin・padding・gap を spaceScale の値に寄せる。セクションの間・見出しと本文の間は、それぞれ1つの値に固定する

### FAIL 127.0.0.1_4387_ai-security-playbook — rhythm.left-edges: 文字の左端を数 px ずらさない（テキストの配置）
- 375px: 左揃えの文字の左端 19 か所、揃っていない束 4: 41〜47px（3本）, 74〜75px（2本）, 290〜297px（4本）, 306〜309px（2本）
- 320px: 左揃えの文字の左端 19 か所、揃っていない束 4: 41〜47px（3本）, 74〜75px（2本）, 235〜242px（4本）, 251〜254px（2本）
- 1280px: 左揃えの文字の左端 39 か所、揃っていない束 4: 108〜110px（2本）, 372〜374px（2本）, 672〜676px（2本）, 1170〜1173px（2本）
- 直し方: 近い左端（1〜4px 違いでつながる束）を同じ線に揃える。揃える線は本文と字下げの2〜3本にし、letter-spacing や絵文字・アイコンの幅でずらさない

### FAIL 127.0.0.1_4387_ai-security-playbook — rhythm.orphans: 最後の行に1〜2文字だけ落とさない（折り返し位置）
- 375px: 「…を、ともに探究する。」（最終行 2字）
- 320px: 「…も、動いているのは？」（最終行 2字） / 「…階的な自動化を学ぶ。」（最終行 2字）
- 直し方: 見出しは word-break: auto-phrase と text-wrap: balance、本文は text-wrap: pretty。それでも落ちる箇所は文言か幅を調整する

### FAIL 127.0.0.1_4387_ai-security-playbook — rhythm.type-scale: 文字サイズ・行間・字間は決めた段階だけ（構成のバランス）
- 375px: 文字サイズ 16 種類（上限 6）、行間 11 種類（上限 3）、字間 15 種類（上限 3）
- 320px: 文字サイズ 16 種類（上限 6）、行間 11 種類（上限 3）、字間 14 種類（上限 3）
- 1280px: 文字サイズ 15 種類（上限 6）、行間 10 種類（上限 3）、字間 16 種類（上限 3）
- 直し方: 文字サイズは5〜6段階、行間は見出しと本文の2〜3種類、字間は2〜3種類に絞り、トークンにする

### WARN 127.0.0.1_4387_ai-security-playbook — style.color-count: 色の数を絞る（洗練）
- 375px: 色 13 種類（上限 12）
- 320px: 色 13 種類（上限 12）
- 1280px: 色 13 種類（上限 12）
- 直し方: 文字色・背景色・線の色をトークンに集め、似た色を1つにまとめる。強調色は1色

### FAIL 127.0.0.1_4387_ai-security-playbook_design-system — type.min-size: 読ませる文字は最小サイズ以上
- 375px: 12px 未満が 25 個: 8px「by nekoai lab」 / 10px「GitHub ↗」 / 9px「DESIGN SYSTEM / VERSION 」 / 11px「Paper#f5f1e6読むための背景」 / 11px「Paper」 / 11px「Ink#191919見出し・本文」
- 320px: 12px 未満が 25 個: 8px「by nekoai lab」 / 10px「GitHub ↗」 / 9px「DESIGN SYSTEM / VERSION 」 / 11px「Paper#f5f1e6読むための背景」 / 11px「Paper」 / 11px「Ink#191919見出し・本文」
- 1280px: 12px 未満が 30 個: 9px「by nekoai lab」 / 10px「DESIGN SYSTEM / VERSION 」 / 11px「Paper#f5f1e6読むための背景」 / 11px「Paper」 / 11px「Ink#191919見出し・本文」 / 11px「Ink」
- 直し方: 注記・キャプション・ふりがなも最小サイズ以上にする。小さくしたいときは色と余白で弱める

### FAIL 127.0.0.1_4387_ai-security-playbook_design-system — a11y.tap-target: 押せるものは指で押せる大きさ
- 375px: 44px 未満 1 個: 24×44「教材」
- 320px: 44px 未満 1 個: 24×44「教材」
- 1280px: 44px 未満 1 個: 26×44「教材」
- 直し方: ボタン・ブロックのリンク・入力は 44px 以上の高さと幅を取る（padding で広げる）

### FAIL 127.0.0.1_4387_ai-security-playbook_design-system — rhythm.spacing-scale: 余白は決めた段階の値だけ（空白の間隔）
- 375px: 余白 21 種類、段階の外 13 種類: 5px×4, 6px×1, 10px×7, 13px×18, 14px×8, 15px×3, 18px×10, 18.72px×1, 20px×4, 22px×2, 26px×2, 28px×2
- 320px: 余白 21 種類、段階の外 13 種類: 5px×4, 6px×1, 10px×7, 13px×18, 14px×8, 15px×3, 18px×10, 18.72px×1, 20px×4, 22px×2, 26px×2, 28px×2
- 1280px: 余白 21 種類、段階の外 12 種類: 5px×1, 7px×6, 10px×8, 13px×18, 14px×3, 15px×7, 18px×2, 18.72px×1, 20px×9, 22px×3, 26px×2, 28px×4
- 直し方: margin・padding・gap を spaceScale の値に寄せる。セクションの間・見出しと本文の間は、それぞれ1つの値に固定する

### FAIL 127.0.0.1_4387_ai-security-playbook_design-system — rhythm.left-edges: 文字の左端を数 px ずらさない（テキストの配置）
- 375px: 左揃えの文字の左端 20 か所、揃っていない束 1: 31〜41px（7本）
- 320px: 左揃えの文字の左端 20 か所、揃っていない束 1: 31〜41px（7本）
- 1280px: 左揃えの文字の左端 33 か所、揃っていない束 3: 53〜68px（7本）, 108〜110px（2本）, 391〜395px（2本）
- 直し方: 近い左端（1〜4px 違いでつながる束）を同じ線に揃える。揃える線は本文と字下げの2〜3本にし、letter-spacing や絵文字・アイコンの幅でずらさない

### FAIL 127.0.0.1_4387_ai-security-playbook_design-system — rhythm.orphans: 最後の行に1〜2文字だけ落とさない（折り返し位置）
- 375px: 「…見出しで区切ります。」（最終行 2字）
- 320px: 「…行き先につなぎます。」（最終行 2字） / 「…の説明と整合させる。」（最終行 2字）
- 直し方: 見出しは word-break: auto-phrase と text-wrap: balance、本文は text-wrap: pretty。それでも落ちる箇所は文言か幅を調整する

### FAIL 127.0.0.1_4387_ai-security-playbook_design-system — rhythm.type-scale: 文字サイズ・行間・字間は決めた段階だけ（構成のバランス）
- 375px: 文字サイズ 15 種類（上限 6）、行間 9 種類（上限 3）、字間 10 種類（上限 3）
- 320px: 文字サイズ 15 種類（上限 6）、行間 9 種類（上限 3）、字間 10 種類（上限 3）
- 1280px: 文字サイズ 13 種類（上限 6）、行間 9 種類（上限 3）、字間 10 種類（上限 3）
- 直し方: 文字サイズは5〜6段階、行間は見出しと本文の2〜3種類、字間は2〜3種類に絞り、トークンにする

### WARN 127.0.0.1_4387_ai-security-playbook_design-system — style.color-count: 色の数を絞る（洗練）
- 375px: 色 13 種類（上限 12）
- 320px: 色 13 種類（上限 12）
- 1280px: 色 13 種類（上限 12）
- 直し方: 文字色・背景色・線の色をトークンに集め、似た色を1つにまとめる。強調色は1色

### FAIL 127.0.0.1_4387_ai-security-playbook_learn_node-october-2026 — type.min-size: 読ませる文字は最小サイズ以上
- 375px: 12px 未満が 10 個: 8px「by nekoai lab」 / 10px「GitHub ↗」 / 9px「Node.js / 10 MIN READ」 / 9px「ON THIS PAGE」 / 11px「脆弱なコードへ入力が届くかを調べます。インターネ」 / 10px「AI SECURITY PLAYBOOK仕組みを」
- 320px: 12px 未満が 10 個: 8px「by nekoai lab」 / 10px「GitHub ↗」 / 9px「Node.js / 10 MIN READ」 / 9px「ON THIS PAGE」 / 11px「脆弱なコードへ入力が届くかを調べます。インターネ」 / 10px「AI SECURITY PLAYBOOK仕組みを」
- 1280px: 12px 未満が 9 個: 9px「by nekoai lab」 / 10px「Node.js / 10 MIN READ」 / 9px「ON THIS PAGE」 / 11px「脆弱なコードへ入力が届くかを調べます。インターネ」 / 10px「AI SECURITY PLAYBOOK仕組みを」 / 10px「仕組みを知ることが、守る力になる。」
- 直し方: 注記・キャプション・ふりがなも最小サイズ以上にする。小さくしたいときは色と余白で弱める

### FAIL 127.0.0.1_4387_ai-security-playbook_learn_node-october-2026 — a11y.tap-target: 押せるものは指で押せる大きさ
- 375px: 44px 未満 1 個: 24×44「教材」
- 320px: 44px 未満 1 個: 24×44「教材」
- 1280px: 44px 未満 1 個: 26×44「教材」
- 直し方: ボタン・ブロックのリンク・入力は 44px 以上の高さと幅を取る（padding で広げる）

### FAIL 127.0.0.1_4387_ai-security-playbook_learn_node-october-2026 — rhythm.spacing-scale: 余白は決めた段階の値だけ（空白の間隔）
- 375px: 余白 19 種類、段階の外 13 種類: 3px×4, 5px×4, 6px×1, 10px×4, 13px×78, 14px×17, 18px×3, 20px×11, 22px×5, 26px×8, 28px×3, 30px×1
- 320px: 余白 19 種類、段階の外 13 種類: 3px×4, 5px×4, 6px×1, 10px×4, 13px×78, 14px×17, 18px×3, 20px×11, 22px×5, 26px×8, 28px×3, 30px×1
- 1280px: 余白 21 種類、段階の外 12 種類: 3px×4, 5px×1, 10px×5, 13px×76, 14px×1, 15px×17, 18px×3, 20px×7, 22px×4, 26px×8, 28px×5, 30px×1
- 直し方: margin・padding・gap を spaceScale の値に寄せる。セクションの間・見出しと本文の間は、それぞれ1つの値に固定する

### FAIL 127.0.0.1_4387_ai-security-playbook_learn_node-october-2026 — rhythm.left-edges: 文字の左端を数 px ずらさない（テキストの配置）
- 375px: 左揃えの文字の左端 19 か所、揃っていない束 3: 32〜41px（6本）, 56〜58px（2本）, 75〜80px（3本）
- 320px: 左揃えの文字の左端 21 か所、揃っていない束 3: 32〜41px（6本）, 56〜58px（2本）, 75〜80px（3本）
- 1280px: 左揃えの文字の左端 27 か所、揃っていない束 3: 108〜110px（2本）, 338〜341px（2本）, 347〜349px（2本）
- 直し方: 近い左端（1〜4px 違いでつながる束）を同じ線に揃える。揃える線は本文と字下げの2〜3本にし、letter-spacing や絵文字・アイコンの幅でずらさない

### FAIL 127.0.0.1_4387_ai-security-playbook_learn_node-october-2026 — rhythm.orphans: 最後の行に1〜2文字だけ落とさない（折り返し位置）
- 375px: 「…同系列の修正版以降へ」（最終行 2字） / 「…同系列の修正版以降へ」（最終行 2字） / 「…同系列の修正版以降へ」（最終行 2字） / 「…取得処理も含みます。」（最終行 2字） / 「…イルを展開する処理。」（最終行 2字） / 「…eや起動中MCPの版」（最終行 2字） / 「…確認できていません。」（最終行 2字） / 「…の実行版を記録する。」（最終行 2字）
- 320px: 「…ないことが大切です。」（最終行 2字） / 「…同系列の修正版以降へ」（最終行 2字） / 「…同系列の修正版以降へ」（最終行 2字） / 「…同系列の修正版以降へ」（最終行 2字） / 「…な処理への到達可能性」（最終行 2字） / 「…害の有無、攻撃の成立」（最終行 1字） / 「…に調べる確認コマンド」（最終行 1字）
- 1280px: 「…けでは分かりません。」（最終行 2字）
- 直し方: 見出しは word-break: auto-phrase と text-wrap: balance、本文は text-wrap: pretty。それでも落ちる箇所は文言か幅を調整する

### FAIL 127.0.0.1_4387_ai-security-playbook_learn_node-october-2026 — rhythm.type-scale: 文字サイズ・行間・字間は決めた段階だけ（構成のバランス）
- 375px: 文字サイズ 13 種類（上限 6）、行間 7 種類（上限 3）、字間 8 種類（上限 3）
- 320px: 文字サイズ 13 種類（上限 6）、行間 7 種類（上限 3）、字間 8 種類（上限 3）
- 1280px: 文字サイズ 12 種類（上限 6）、行間 7 種類（上限 3）、字間 7 種類（上限 3）
- 直し方: 文字サイズは5〜6段階、行間は見出しと本文の2〜3種類、字間は2〜3種類に絞り、トークンにする

### WARN 127.0.0.1_4387_ai-security-playbook_learn_node-october-2026 — rhythm.line-length: 1行を長くしすぎない（読みやすさ）
- 1280px: 1行 40 字超 8 か所: 50字「2026年10月21日の公式発表に掲載された修正」 / 51字「情報の確認日：2026年10月23日。対象の脆弱」 / 50字「残る6件は中・低深刻度で、HTTPのkeep-a」 / 50字「Brotliはデータの圧縮形式です。公式はこの問」
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

スクリーンショット: screenshots/127.0.0.1_4387_ai-security-playbook-375-fv.jpg, screenshots/127.0.0.1_4387_ai-security-playbook-320-fv.jpg, screenshots/127.0.0.1_4387_ai-security-playbook-1280-fv.jpg, screenshots/127.0.0.1_4387_ai-security-playbook_design-system-375-fv.jpg, screenshots/127.0.0.1_4387_ai-security-playbook_design-system-320-fv.jpg, screenshots/127.0.0.1_4387_ai-security-playbook_design-system-1280-fv.jpg, screenshots/127.0.0.1_4387_ai-security-playbook_learn_node-october-2026-375-fv.jpg, screenshots/127.0.0.1_4387_ai-security-playbook_learn_node-october-2026-320-fv.jpg, screenshots/127.0.0.1_4387_ai-security-playbook_learn_node-october-2026-1280-fv.jpg
