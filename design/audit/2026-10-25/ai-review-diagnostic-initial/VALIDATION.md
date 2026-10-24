# Design validation（design-audit）

自動判定: 191 passed / 1 failed（うち error 1） / 24 review

この結果は「決めた床を割っていないか」だけを見ている。良いデザインかどうかは、下の「人と ChatGPT が見ること」と最終の目で決める。

左端のズレは測定v2では同じ親要素内の文字ブロックで比較する。旧測定の判定は従来どおり保持する。

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
| `rhythm.left-edges` 文字の左端を数 px ずらさない（テキストの配置） | error | 12 | 0 |
| `rhythm.orphans` 最後の行に1〜2文字だけ落とさない（折り返し位置） | error | 11 | 1 |
| `rhythm.type-scale` 文字サイズ・行間・字間は決めた段階だけ（構成のバランス） | error | 12 | 0 |
| `rhythm.line-length` 1行を長くしすぎない（読みやすさ） | warning | 12 | 0 |
| `style.color-count` 色の数を絞る（洗練） | warning | 12 | 0 |
| `style.radius-count` 角丸の種類を絞る（洗練） | warning | 12 | 0 |
| `style.shadow-count` 影の種類を絞る（洗練） | warning | 12 | 0 |

## 見た目の物差し

| 対象 | 幅 | 余白の種類 | 段階の外 | 左端の数 | 左端のズレ | 落ちた行 | 文字サイズ | 行間 | 字間 | 色 |
|---|---|---|---|---|---|---|---|---|---|---|
| 127.0.0.1_4391_ai-security-playbook_learn_ai-review-trust | 375 | 9 | 0 | 96 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_ai-review-trust | 320 | 9 | 0 | 94 | 0 | 3 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_ai-review-trust | 768 | 8 | 0 | 105 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_ai-review-trust | 1280 | 8 | 0 | 109 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_topics_release | 375 | 8 | 0 | 10 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_release | 320 | 8 | 0 | 11 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_release | 768 | 9 | 0 | 12 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_release | 1280 | 9 | 0 | 12 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_learn_github-guards | 375 | 9 | 0 | 89 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_github-guards | 320 | 9 | 0 | 86 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_github-guards | 768 | 8 | 0 | 96 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_github-guards | 1280 | 8 | 0 | 101 | 0 | 0 | 5 | 3 | 3 | 10 |

## FAIL（直すもの）

### FAIL 127.0.0.1_4391_ai-security-playbook_learn_ai-review-trust — rhythm.orphans: 最後の行に1〜2文字だけ落とさない（折り返し位置）
- 320px: 「…を足して、毎回拾えた」（最終行 1字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > figure:nth-child(12) > details:nth-child(4) > summary:nth-child(1)] / 「…象がはっきりします。」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > p:nth-child(19)] / 「…863にあたります。」（最終行 2字） [#main > div:nth-child(1) > div:nth-child(3) > article:nth-child(2) > p:nth-child(50)]
- 直し方: 見出しは word-break: auto-phrase と text-wrap: balance、本文は text-wrap: pretty。それでも落ちる箇所は文言か幅を調整する

## 人と ChatGPT が見ること（機械では決めない）

- [ ] `direction.first-view` 最初の画面で「何の・誰のための・何をすればいいか」が3秒でわかる（ai-review）— 外れていたら: ファーストビューの見出しを具体的な価値に、主要な行動を1つ見える位置に置く
- [ ] `direction.single-cta` 主要な行動は1つ。強い色のボタンを並べない（ai-review）— 外れていたら: 主要な行動以外は弱いボタンかリンクにする
- [ ] `direction.hierarchy` 情報の優先順位が見た目の強さと一致している（ai-review）— 外れていたら: 大事なものほど上・大きく・余白を広く。同じ強さの要素を並べすぎない
- [ ] `visual.balance` 余白・写真・文字の比率が整い、セクションごとに景色が変わる（ai-review）— 外れていたら: 全セクションを同じ型（小見出し＋見出し＋リード＋リスト）にしない。余白を広く取る所と詰める所を決める
- [ ] `visual.ai-look` AI っぽい定番の飾りがない（DESIGN.md の「やらないこと」）（ai-review）— 外れていたら: 説明的な飾り・意味のない数字カード・どこにでもあるグラデーションを外し、DESIGN.md の「やらないこと」に照らす
- [ ] `copy.specific` どこにでも言える文を書かない。事実は入力データにあるものだけ（ai-review）— 外れていたら: そのものにしか言えない具体（数字・固有名・場面）に置き換える。データに無い事実は書かない
- [ ] `copy.ui-writing` ボタン・見出し・説明の文言の決まり（ai-review）— 外れていたら: ボタンは動詞（サ変は「する」を省く）、見出しは名詞、説明は敬体で動詞まで。リンクに「こちら」を使わない
- [ ] `visual.photo` 写真の質と使い方（解像度・トリミング・統一感）（human）— 外れていたら: 写真の色味・明るさをそろえ、主題が切れないようにトリミングする。仮の写真は本番前に必ず差し替える

スクリーンショット: screenshots/127.0.0.1_4391_ai-security-playbook_learn_ai-review-trust-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_ai-review-trust-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_ai-review-trust-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_ai-review-trust-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_release-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_release-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_release-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_release-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_github-guards-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_github-guards-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_github-guards-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_github-guards-1280-fv.jpg

