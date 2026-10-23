# Design validation（design-audit）

自動判定: 166 passed / 26 failed（うち error 16） / 24 review

この結果は「決めた床を割っていないか」だけを見ている。良いデザインかどうかは、下の「人と ChatGPT が見ること」と最終の目で決める。

## ルール別

| ルール | 重さ | passed | failed |
|---|---|---|---|
| `layout.no-horizontal-scroll` どの幅でも横にはみ出さない | error | 12 | 0 |
| `fonts.loaded` Web フォントが読めている（黙って代替フォントで描かれていない） | error | 12 | 0 |
| `type.min-size` 読ませる文字は最小サイズ以上 | error | 12 | 0 |
| `a11y.contrast` 文字と背景のコントラスト（WCAG AA） | error | 12 | 0 |
| `a11y.tap-target` 押せるものは指で押せる大きさ | error | 12 | 0 |
| `a11y.img-alt` 画像に alt がある（飾りは alt=""） | error | 12 | 0 |
| `structure.headings` 見出しの階層が正しい（h1 は1つ、段を飛ばさない） | warning | 12 | 0 |
| `content.placeholder` 穴埋め文言・ダミーを残さない | error | 12 | 0 |
| `rhythm.spacing-scale` 余白は決めた段階の値だけ（空白の間隔） | error | 12 | 0 |
| `rhythm.left-edges` 文字の左端を数 px ずらさない（テキストの配置） | error | 0 | 12 |
| `rhythm.orphans` 最後の行に1〜2文字だけ落とさない（折り返し位置） | error | 8 | 4 |
| `rhythm.type-scale` 文字サイズ・行間・字間は決めた段階だけ（構成のバランス） | error | 12 | 0 |
| `rhythm.line-length` 1行を長くしすぎない（読みやすさ） | warning | 10 | 2 |
| `style.color-count` 色の数を絞る（洗練） | warning | 4 | 8 |
| `style.radius-count` 角丸の種類を絞る（洗練） | warning | 12 | 0 |
| `style.shadow-count` 影の種類を絞る（洗練） | warning | 12 | 0 |

## 見た目の物差し

| 対象 | 幅 | 余白の種類 | 段階の外 | 左端の数 | 左端のズレ | 落ちた行 | 文字サイズ | 行間 | 字間 | 色 |
|---|---|---|---|---|---|---|---|---|---|---|
| 127.0.0.1_4387_ai-security-playbook | 375 | 17 → **7** | 10 → **0** | 19 → **15** | 4 → **1** | 1 → **0** | 16 → **5** | 11 → **3** | 15 → **3** | 13 |
| 127.0.0.1_4387_ai-security-playbook | 320 | 17 → **7** | 10 → **0** | 19 → **16** | 4 → **2** | 2 → **0** | 16 → **5** | 11 → **3** | 14 → **3** | 13 |
| 127.0.0.1_4387_ai-security-playbook | 768 | 10 | 0 | 32 | 2 | 1 | 6 | 3 | 3 | 13 |
| 127.0.0.1_4387_ai-security-playbook | 1280 | 22 → **10** | 12 → **0** | 39 → **33** | 4 → **2** | 0 | 15 → **6** | 10 → **3** | 16 → **3** | 13 |
| 127.0.0.1_4387_ai-security-playbook_design-system | 375 | 21 → **8** | 13 → **0** | 20 → **23** | 1 → **2** | 1 → **3** | 15 → **5** | 9 → **3** | 10 → **3** | 13 → **14** |
| 127.0.0.1_4387_ai-security-playbook_design-system | 320 | 21 → **8** | 13 → **0** | 20 → **23** | 1 → **3** | 2 | 15 → **5** | 9 → **3** | 10 → **3** | 13 → **14** |
| 127.0.0.1_4387_ai-security-playbook_design-system | 768 | 9 | 0 | 35 | 5 | 0 | 6 | 3 | 3 | 14 |
| 127.0.0.1_4387_ai-security-playbook_design-system | 1280 | 21 → **9** | 12 → **0** | 33 → **42** | 3 → **5** | 0 | 13 → **6** | 9 → **3** | 10 → **3** | 13 → **14** |
| 127.0.0.1_4387_ai-security-playbook_learn_node-october-2026 | 375 | 19 → **7** | 13 → **0** | 19 → **16** | 3 → **2** | 8 → **1** | 13 → **6** | 7 → **3** | 8 → **3** | 12 |
| 127.0.0.1_4387_ai-security-playbook_learn_node-october-2026 | 320 | 19 → **7** | 13 → **0** | 21 → **16** | 3 | 7 → **0** | 13 → **6** | 7 → **3** | 8 → **3** | 12 |
| 127.0.0.1_4387_ai-security-playbook_learn_node-october-2026 | 768 | 9 | 0 | 19 | 2 | 0 | 6 | 3 | 3 | 11 |
| 127.0.0.1_4387_ai-security-playbook_learn_node-october-2026 | 1280 | 21 → **9** | 12 → **0** | 27 → **21** | 3 | 1 → **0** | 12 → **6** | 7 → **3** | 7 → **3** | 11 |

「A → **B**」は改善前（--baseline）から変わった数。

## FAIL（直すもの）

### FAIL 127.0.0.1_4387_ai-security-playbook — rhythm.left-edges: 文字の左端を数 px ずらさない（テキストの配置）
- 375px: 左揃えの文字の左端 15 か所、揃っていない束 1: 48〜50px（2本）
- 320px: 左揃えの文字の左端 16 か所、揃っていない束 2: 48〜50px（2本）, 79〜80px（2本）
- 768px: 左揃えの文字の左端 32 か所、揃っていない束 2: 398〜400px（2本）, 571〜575px（2本）
- 1280px: 左揃えの文字の左端 33 か所、揃っていない束 2: 361〜365px（2本）, 668〜672px（2本）
- 直し方: 近い左端（1〜4px 違いでつながる束）を同じ線に揃える。揃える線は本文と字下げの2〜3本にし、letter-spacing や絵文字・アイコンの幅でずらさない

### WARN 127.0.0.1_4387_ai-security-playbook — style.color-count: 色の数を絞る（洗練）
- 375px: 色 13 種類（上限 12）
- 320px: 色 13 種類（上限 12）
- 768px: 色 13 種類（上限 12）
- 1280px: 色 13 種類（上限 12）
- 直し方: 文字色・背景色・線の色をトークンに集め、似た色を1つにまとめる。強調色は1色

### FAIL 127.0.0.1_4387_ai-security-playbook — rhythm.orphans: 最後の行に1〜2文字だけ落とさない（折り返し位置）
- 768px: 「…ューを運用につなげる」（最終行 2字）
- 直し方: 見出しは word-break: auto-phrase と text-wrap: balance、本文は text-wrap: pretty。それでも落ちる箇所は文言か幅を調整する

### FAIL 127.0.0.1_4387_ai-security-playbook_design-system — rhythm.left-edges: 文字の左端を数 px ずらさない（テキストの配置）
- 375px: 左揃えの文字の左端 23 か所、揃っていない束 2: 29〜41px（7本）, 56〜57px（2本）
- 320px: 左揃えの文字の左端 23 か所、揃っていない束 3: 29〜41px（7本）, 56〜57px（2本）, 75〜79px（2本）
- 768px: 左揃えの文字の左端 35 か所、揃っていない束 5: 53〜57px（3本）, 64〜68px（3本）, 288〜289px（2本）, 396〜400px（2本）, 424〜427px（2本）
- 1280px: 左揃えの文字の左端 42 か所、揃っていない束 5: 53〜57px（3本）, 64〜68px（3本）, 266〜269px（2本）, 475〜479px（2本）, 680〜683px（2本）
- 直し方: 近い左端（1〜4px 違いでつながる束）を同じ線に揃える。揃える線は本文と字下げの2〜3本にし、letter-spacing や絵文字・アイコンの幅でずらさない

### FAIL 127.0.0.1_4387_ai-security-playbook_design-system — rhythm.orphans: 最後の行に1〜2文字だけ落とさない（折り返し位置）
- 375px: 「…使えない操作がないか」（最終行 2字） / 「…マホで代表画面を見た」（最終行 2字） / 「…役Cを使い分けている」（最終行 2字）
- 320px: 「…存状況を確認します。」（最終行 2字） / 「…作を邪魔していないか」（最終行 2字）
- 直し方: 見出しは word-break: auto-phrase と text-wrap: balance、本文は text-wrap: pretty。それでも落ちる箇所は文言か幅を調整する

### WARN 127.0.0.1_4387_ai-security-playbook_design-system — style.color-count: 色の数を絞る（洗練）
- 375px: 色 14 種類（上限 12）
- 320px: 色 14 種類（上限 12）
- 768px: 色 14 種類（上限 12）
- 1280px: 色 14 種類（上限 12）
- 直し方: 文字色・背景色・線の色をトークンに集め、似た色を1つにまとめる。強調色は1色

### FAIL 127.0.0.1_4387_ai-security-playbook_learn_node-october-2026 — rhythm.left-edges: 文字の左端を数 px ずらさない（テキストの配置）
- 375px: 左揃えの文字の左端 16 か所、揃っていない束 2: 29〜33px（2本）, 68〜70px（2本）
- 320px: 左揃えの文字の左端 16 か所、揃っていない束 3: 29〜33px（2本）, 68〜70px（2本）, 100〜104px（2本）
- 768px: 左揃えの文字の左端 19 か所、揃っていない束 2: 53〜57px（2本）, 103〜104px（2本）
- 1280px: 左揃えの文字の左端 21 か所、揃っていない束 3: 103〜104px（2本）, 337〜341px（2本）, 361〜365px（2本）
- 直し方: 近い左端（1〜4px 違いでつながる束）を同じ線に揃える。揃える線は本文と字下げの2〜3本にし、letter-spacing や絵文字・アイコンの幅でずらさない

### FAIL 127.0.0.1_4387_ai-security-playbook_learn_node-october-2026 — rhythm.orphans: 最後の行に1〜2文字だけ落とさない（折り返し位置）
- 375px: 「…方針—報告と更新情報」（最終行 2字）
- 直し方: 見出しは word-break: auto-phrase と text-wrap: balance、本文は text-wrap: pretty。それでも落ちる箇所は文言か幅を調整する

### WARN 127.0.0.1_4387_ai-security-playbook_learn_node-october-2026 — rhythm.line-length: 1行を長くしすぎない（読みやすさ）
- 768px: 1行 40 字超 1 か所: 42字「情報の確認日：2026年10月23日。対象の脆弱」
- 1280px: 1行 40 字超 1 か所: 42字「情報の確認日：2026年10月23日。対象の脆弱」
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

スクリーンショット: screenshots/127.0.0.1_4387_ai-security-playbook-375-fv.jpg, screenshots/127.0.0.1_4387_ai-security-playbook-320-fv.jpg, screenshots/127.0.0.1_4387_ai-security-playbook-768-fv.jpg, screenshots/127.0.0.1_4387_ai-security-playbook-1280-fv.jpg, screenshots/127.0.0.1_4387_ai-security-playbook_design-system-375-fv.jpg, screenshots/127.0.0.1_4387_ai-security-playbook_design-system-320-fv.jpg, screenshots/127.0.0.1_4387_ai-security-playbook_design-system-768-fv.jpg, screenshots/127.0.0.1_4387_ai-security-playbook_design-system-1280-fv.jpg, screenshots/127.0.0.1_4387_ai-security-playbook_learn_node-october-2026-375-fv.jpg, screenshots/127.0.0.1_4387_ai-security-playbook_learn_node-october-2026-320-fv.jpg, screenshots/127.0.0.1_4387_ai-security-playbook_learn_node-october-2026-768-fv.jpg, screenshots/127.0.0.1_4387_ai-security-playbook_learn_node-october-2026-1280-fv.jpg
