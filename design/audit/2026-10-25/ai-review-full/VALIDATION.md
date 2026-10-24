# Design validation（design-audit）

自動判定: 3064 passed / 8 failed（うち error 0） / 384 review

この結果は「決めた床を割っていないか」だけを見ている。良いデザインかどうかは、下の「人と ChatGPT が見ること」と最終の目で決める。

左端のズレは測定v2では同じ親要素内の文字ブロックで比較する。旧測定の判定は従来どおり保持する。

## ルール別

| ルール | 重さ | passed | failed |
|---|---|---|---|
| `layout.no-horizontal-scroll` どの幅でも横にはみ出さない | error | 192 | 0 |
| `fonts.loaded` Web フォントが読めている（黙って代替フォントで描かれていない） | error | 192 | 0 |
| `type.min-size` 読ませる文字は最小サイズ以上 | error | 192 | 0 |
| `a11y.contrast` 文字と背景のコントラスト（WCAG AA） | error | 192 | 0 |
| `a11y.tap-target` 押せるものは指で押せる大きさ | error | 192 | 0 |
| `a11y.img-alt` 画像に alt がある（飾りは alt=""） | error | 192 | 0 |
| `structure.headings` 見出しの階層が正しい（h1 は1つ、段を飛ばさない） | warning | 192 | 0 |
| `content.placeholder` 穴埋め文言・ダミーを残さない | error | 192 | 0 |
| `rhythm.spacing-scale` 余白は決めた段階の値だけ（空白の間隔） | error | 192 | 0 |
| `rhythm.left-edges` 文字の左端を数 px ずらさない（テキストの配置） | error | 192 | 0 |
| `rhythm.orphans` 最後の行に1〜2文字だけ落とさない（折り返し位置） | error | 192 | 0 |
| `rhythm.type-scale` 文字サイズ・行間・字間は決めた段階だけ（構成のバランス） | error | 192 | 0 |
| `rhythm.line-length` 1行を長くしすぎない（読みやすさ） | warning | 192 | 0 |
| `style.color-count` 色の数を絞る（洗練） | warning | 184 | 8 |
| `style.radius-count` 角丸の種類を絞る（洗練） | warning | 192 | 0 |
| `style.shadow-count` 影の種類を絞る（洗練） | warning | 192 | 0 |

## 見た目の物差し

| 対象 | 幅 | 余白の種類 | 段階の外 | 左端の数 | 左端のズレ | 落ちた行 | 文字サイズ | 行間 | 字間 | 色 |
|---|---|---|---|---|---|---|---|---|---|---|
| 127.0.0.1_4391_ai-security-playbook | 375 | 6 | 0 | 9 | 0 | 0 | 5 | 3 | 3 | 9 |
| 127.0.0.1_4391_ai-security-playbook | 320 | 6 | 0 | 9 | 0 | 0 | 5 | 3 | 3 | 9 |
| 127.0.0.1_4391_ai-security-playbook | 768 | 9 | 0 | 18 | 0 | 0 | 6 | 3 | 3 | 9 |
| 127.0.0.1_4391_ai-security-playbook | 1280 | 9 | 0 | 23 | 0 | 0 | 6 | 3 | 3 | 9 |
| 127.0.0.1_4391_ai-security-playbook_design-system | 375 | 8 | 0 | 23 | 0 | 0 | 5 | 3 | 3 | 14 |
| 127.0.0.1_4391_ai-security-playbook_design-system | 320 | 8 | 0 | 23 | 0 | 0 | 5 | 3 | 3 | 14 |
| 127.0.0.1_4391_ai-security-playbook_design-system | 768 | 9 | 0 | 34 | 0 | 0 | 6 | 3 | 3 | 14 |
| 127.0.0.1_4391_ai-security-playbook_design-system | 1280 | 9 | 0 | 40 | 0 | 0 | 6 | 3 | 3 | 14 |
| 127.0.0.1_4391_ai-security-playbook_learn_basics | 375 | 9 | 0 | 19 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_basics | 320 | 9 | 0 | 20 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_basics | 768 | 8 | 0 | 28 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_basics | 1280 | 8 | 0 | 31 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_node-october-2026 | 375 | 9 | 0 | 29 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_node-october-2026 | 320 | 9 | 0 | 29 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_node-october-2026 | 768 | 8 | 0 | 35 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_node-october-2026 | 1280 | 8 | 0 | 38 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_commands | 375 | 10 | 0 | 58 | 0 | 0 | 5 | 3 | 3 | 15 |
| 127.0.0.1_4391_ai-security-playbook_learn_commands | 320 | 10 | 0 | 57 | 0 | 0 | 5 | 3 | 3 | 15 |
| 127.0.0.1_4391_ai-security-playbook_learn_commands | 768 | 9 | 0 | 63 | 0 | 0 | 5 | 3 | 3 | 15 |
| 127.0.0.1_4391_ai-security-playbook_learn_commands | 1280 | 9 | 0 | 68 | 0 | 0 | 5 | 3 | 3 | 15 |
| 127.0.0.1_4391_ai-security-playbook_learn_checklist | 375 | 9 | 0 | 19 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_checklist | 320 | 9 | 0 | 19 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_checklist | 768 | 8 | 0 | 25 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_checklist | 1280 | 8 | 0 | 28 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_operations | 375 | 9 | 0 | 24 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_operations | 320 | 9 | 0 | 24 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_operations | 768 | 8 | 0 | 32 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_operations | 1280 | 8 | 0 | 35 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_library | 375 | 8 | 0 | 10 | 0 | 0 | 4 | 3 | 3 | 9 |
| 127.0.0.1_4391_ai-security-playbook_library | 320 | 8 | 0 | 11 | 0 | 0 | 4 | 3 | 3 | 9 |
| 127.0.0.1_4391_ai-security-playbook_library | 768 | 8 | 0 | 16 | 0 | 0 | 4 | 3 | 3 | 9 |
| 127.0.0.1_4391_ai-security-playbook_library | 1280 | 8 | 0 | 16 | 0 | 0 | 4 | 3 | 3 | 9 |
| 127.0.0.1_4391_ai-security-playbook_topics | 375 | 7 | 0 | 4 | 0 | 0 | 3 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics | 320 | 7 | 0 | 4 | 0 | 0 | 3 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics | 768 | 8 | 0 | 5 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics | 1280 | 8 | 0 | 7 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_development | 375 | 8 | 0 | 8 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_development | 320 | 8 | 0 | 9 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_development | 768 | 9 | 0 | 10 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_development | 1280 | 9 | 0 | 10 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_operations | 375 | 8 | 0 | 11 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_operations | 320 | 8 | 0 | 12 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_operations | 768 | 9 | 0 | 15 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_operations | 1280 | 9 | 0 | 15 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_paths | 375 | 7 | 0 | 5 | 0 | 0 | 5 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_paths | 320 | 7 | 0 | 5 | 0 | 0 | 5 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_paths | 768 | 8 | 0 | 6 | 0 | 0 | 5 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_paths | 1280 | 8 | 0 | 7 | 0 | 0 | 5 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_paths_environment | 375 | 8 | 0 | 8 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_environment | 320 | 8 | 0 | 8 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_environment | 768 | 8 | 0 | 7 | 0 | 0 | 4 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_environment | 1280 | 8 | 0 | 7 | 0 | 0 | 4 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_node-update | 375 | 8 | 0 | 9 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_node-update | 320 | 8 | 0 | 9 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_node-update | 768 | 8 | 0 | 9 | 0 | 0 | 4 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_node-update | 1280 | 8 | 0 | 9 | 0 | 0 | 4 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_update-operations | 375 | 8 | 0 | 9 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_update-operations | 320 | 8 | 0 | 9 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_update-operations | 768 | 8 | 0 | 8 | 0 | 0 | 4 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_update-operations | 1280 | 8 | 0 | 8 | 0 | 0 | 4 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_series_node-security | 375 | 7 | 0 | 9 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_series_node-security | 320 | 7 | 0 | 9 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_series_node-security | 768 | 8 | 0 | 10 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_series_node-security | 1280 | 8 | 0 | 10 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_updates | 375 | 7 | 0 | 4 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_updates | 320 | 7 | 0 | 4 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_updates | 768 | 8 | 0 | 3 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_updates | 1280 | 8 | 0 | 3 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_about | 375 | 8 | 0 | 4 | 0 | 0 | 4 | 3 | 3 | 5 |
| 127.0.0.1_4391_ai-security-playbook_about | 320 | 8 | 0 | 4 | 0 | 0 | 4 | 3 | 3 | 5 |
| 127.0.0.1_4391_ai-security-playbook_about | 768 | 8 | 0 | 3 | 0 | 0 | 4 | 3 | 3 | 5 |
| 127.0.0.1_4391_ai-security-playbook_about | 1280 | 8 | 0 | 3 | 0 | 0 | 4 | 3 | 3 | 5 |
| 127.0.0.1_4391_ai-security-playbook_learn_ai-data-boundaries | 375 | 9 | 0 | 46 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_ai-data-boundaries | 320 | 9 | 0 | 46 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_ai-data-boundaries | 768 | 8 | 0 | 50 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_ai-data-boundaries | 1280 | 8 | 0 | 54 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_app-architecture | 375 | 9 | 0 | 42 | 0 | 0 | 4 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_app-architecture | 320 | 9 | 0 | 43 | 0 | 0 | 4 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_app-architecture | 768 | 8 | 0 | 50 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_app-architecture | 1280 | 8 | 0 | 53 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_api-keys | 375 | 9 | 0 | 68 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_api-keys | 320 | 9 | 0 | 69 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_api-keys | 768 | 8 | 0 | 72 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_api-keys | 1280 | 8 | 0 | 80 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_access-control | 375 | 9 | 0 | 73 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_access-control | 320 | 9 | 0 | 73 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_access-control | 768 | 8 | 0 | 79 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_access-control | 1280 | 8 | 0 | 83 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_mcp-permissions | 375 | 9 | 0 | 24 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_mcp-permissions | 320 | 9 | 0 | 22 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_mcp-permissions | 768 | 8 | 0 | 29 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_mcp-permissions | 1280 | 8 | 0 | 31 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_agent-permissions | 375 | 9 | 0 | 24 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_agent-permissions | 320 | 9 | 0 | 24 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_agent-permissions | 768 | 8 | 0 | 26 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_agent-permissions | 1280 | 8 | 0 | 30 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_launch-checklist | 375 | 9 | 0 | 23 | 0 | 0 | 5 | 3 | 3 | 9 |
| 127.0.0.1_4391_ai-security-playbook_learn_launch-checklist | 320 | 9 | 0 | 23 | 0 | 0 | 5 | 3 | 3 | 9 |
| 127.0.0.1_4391_ai-security-playbook_learn_launch-checklist | 768 | 8 | 0 | 28 | 0 | 0 | 5 | 3 | 3 | 9 |
| 127.0.0.1_4391_ai-security-playbook_learn_launch-checklist | 1280 | 8 | 0 | 31 | 0 | 0 | 5 | 3 | 3 | 9 |
| 127.0.0.1_4391_ai-security-playbook_learn_php-october-2026 | 375 | 9 | 0 | 25 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_php-october-2026 | 320 | 9 | 0 | 26 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_php-october-2026 | 768 | 8 | 0 | 32 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_php-october-2026 | 1280 | 8 | 0 | 34 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_incident-response | 375 | 9 | 0 | 57 | 0 | 0 | 4 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_incident-response | 320 | 9 | 0 | 57 | 0 | 0 | 4 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_incident-response | 768 | 8 | 0 | 63 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_learn_incident-response | 1280 | 8 | 0 | 68 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_topics_ai-tools | 375 | 8 | 0 | 8 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_ai-tools | 320 | 8 | 0 | 9 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_ai-tools | 768 | 9 | 0 | 10 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_ai-tools | 1280 | 9 | 0 | 10 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_secrets | 375 | 8 | 0 | 9 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_secrets | 320 | 8 | 0 | 10 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_secrets | 768 | 9 | 0 | 11 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_secrets | 1280 | 9 | 0 | 11 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_access | 375 | 8 | 0 | 8 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_access | 320 | 8 | 0 | 9 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_access | 768 | 9 | 0 | 10 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_access | 1280 | 9 | 0 | 10 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_connections | 375 | 8 | 0 | 8 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_connections | 320 | 8 | 0 | 9 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_connections | 768 | 9 | 0 | 10 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_connections | 1280 | 9 | 0 | 10 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_release | 375 | 8 | 0 | 10 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_release | 320 | 8 | 0 | 11 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_release | 768 | 9 | 0 | 12 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_release | 1280 | 9 | 0 | 12 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_response | 375 | 8 | 0 | 7 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_response | 320 | 8 | 0 | 8 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_response | 768 | 9 | 0 | 9 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_topics_response | 1280 | 9 | 0 | 9 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_paths_solo-development | 375 | 8 | 0 | 7 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_solo-development | 320 | 8 | 0 | 7 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_solo-development | 768 | 8 | 0 | 8 | 0 | 0 | 4 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_solo-development | 1280 | 8 | 0 | 8 | 0 | 0 | 4 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_before-launch | 375 | 8 | 0 | 7 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_before-launch | 320 | 8 | 0 | 7 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_before-launch | 768 | 8 | 0 | 6 | 0 | 0 | 4 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_before-launch | 1280 | 8 | 0 | 6 | 0 | 0 | 4 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_ai-connections | 375 | 8 | 0 | 7 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_ai-connections | 320 | 8 | 0 | 7 | 0 | 0 | 5 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_ai-connections | 768 | 8 | 0 | 6 | 0 | 0 | 4 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_paths_ai-connections | 1280 | 8 | 0 | 6 | 0 | 0 | 4 | 3 | 3 | 8 |
| 127.0.0.1_4391_ai-security-playbook_series_solo-development | 375 | 7 | 0 | 8 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_series_solo-development | 320 | 7 | 0 | 8 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_series_solo-development | 768 | 8 | 0 | 9 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_series_solo-development | 1280 | 8 | 0 | 9 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_series_ai-connections | 375 | 7 | 0 | 6 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_series_ai-connections | 320 | 7 | 0 | 6 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_series_ai-connections | 768 | 8 | 0 | 5 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_series_ai-connections | 1280 | 8 | 0 | 5 | 0 | 0 | 4 | 3 | 3 | 7 |
| 127.0.0.1_4391_ai-security-playbook_learn_ai-work-logs | 375 | 9 | 0 | 46 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_ai-work-logs | 320 | 9 | 0 | 49 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_ai-work-logs | 768 | 8 | 0 | 54 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_ai-work-logs | 1280 | 8 | 0 | 58 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_release-artifacts | 375 | 9 | 0 | 63 | 0 | 0 | 5 | 3 | 3 | 9 |
| 127.0.0.1_4391_ai-security-playbook_learn_release-artifacts | 320 | 9 | 0 | 63 | 0 | 0 | 5 | 3 | 3 | 9 |
| 127.0.0.1_4391_ai-security-playbook_learn_release-artifacts | 768 | 8 | 0 | 66 | 0 | 0 | 5 | 3 | 3 | 9 |
| 127.0.0.1_4391_ai-security-playbook_learn_release-artifacts | 1280 | 8 | 0 | 71 | 0 | 0 | 5 | 3 | 3 | 9 |
| 127.0.0.1_4391_ai-security-playbook_learn_external-service-failures | 375 | 9 | 0 | 85 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_external-service-failures | 320 | 9 | 0 | 85 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_external-service-failures | 768 | 8 | 0 | 94 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_external-service-failures | 1280 | 8 | 0 | 100 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_dependency-updates | 375 | 9 | 0 | 94 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_dependency-updates | 320 | 9 | 0 | 93 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_dependency-updates | 768 | 8 | 0 | 100 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_dependency-updates | 1280 | 8 | 0 | 106 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_github-guards | 375 | 9 | 0 | 89 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_github-guards | 320 | 9 | 0 | 86 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_github-guards | 768 | 8 | 0 | 96 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_github-guards | 1280 | 8 | 0 | 101 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_secret-rotation | 375 | 9 | 0 | 62 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_secret-rotation | 320 | 9 | 0 | 59 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_secret-rotation | 768 | 8 | 0 | 68 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_secret-rotation | 1280 | 8 | 0 | 73 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_developer-privacy | 375 | 9 | 0 | 54 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_developer-privacy | 320 | 9 | 0 | 50 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_developer-privacy | 768 | 8 | 0 | 62 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_developer-privacy | 1280 | 8 | 0 | 66 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_approved-ai-data | 375 | 9 | 0 | 78 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_approved-ai-data | 320 | 9 | 0 | 75 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_approved-ai-data | 768 | 8 | 0 | 83 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_approved-ai-data | 1280 | 8 | 0 | 88 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_cloud-account-safety | 375 | 9 | 0 | 80 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_cloud-account-safety | 320 | 9 | 0 | 78 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_cloud-account-safety | 768 | 8 | 0 | 87 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_cloud-account-safety | 1280 | 8 | 0 | 92 | 0 | 0 | 5 | 3 | 3 | 10 |
| 127.0.0.1_4391_ai-security-playbook_learn_ai-review-trust | 375 | 9 | 0 | 95 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_ai-review-trust | 320 | 9 | 0 | 95 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_ai-review-trust | 768 | 8 | 0 | 105 | 0 | 0 | 5 | 3 | 3 | 11 |
| 127.0.0.1_4391_ai-security-playbook_learn_ai-review-trust | 1280 | 8 | 0 | 109 | 0 | 0 | 5 | 3 | 3 | 11 |

## FAIL（直すもの）

### WARN 127.0.0.1_4391_ai-security-playbook_design-system — style.color-count: 色の数を絞る（洗練）
- 375px: 色 14 種類（上限 12）
- 320px: 色 14 種類（上限 12）
- 768px: 色 14 種類（上限 12）
- 1280px: 色 14 種類（上限 12）
- 直し方: 文字色・背景色・線の色をトークンに集め、似た色を1つにまとめる。強調色は1色

### WARN 127.0.0.1_4391_ai-security-playbook_learn_commands — style.color-count: 色の数を絞る（洗練）
- 375px: 色 15 種類（上限 12）
- 320px: 色 15 種類（上限 12）
- 768px: 色 15 種類（上限 12）
- 1280px: 色 15 種類（上限 12）
- 直し方: 文字色・背景色・線の色をトークンに集め、似た色を1つにまとめる。強調色は1色

## 人と ChatGPT が見ること（機械では決めない）

- [ ] `direction.first-view` 最初の画面で「何の・誰のための・何をすればいいか」が3秒でわかる（ai-review）— 外れていたら: ファーストビューの見出しを具体的な価値に、主要な行動を1つ見える位置に置く
- [ ] `direction.single-cta` 主要な行動は1つ。強い色のボタンを並べない（ai-review）— 外れていたら: 主要な行動以外は弱いボタンかリンクにする
- [ ] `direction.hierarchy` 情報の優先順位が見た目の強さと一致している（ai-review）— 外れていたら: 大事なものほど上・大きく・余白を広く。同じ強さの要素を並べすぎない
- [ ] `visual.balance` 余白・写真・文字の比率が整い、セクションごとに景色が変わる（ai-review）— 外れていたら: 全セクションを同じ型（小見出し＋見出し＋リード＋リスト）にしない。余白を広く取る所と詰める所を決める
- [ ] `visual.ai-look` AI っぽい定番の飾りがない（DESIGN.md の「やらないこと」）（ai-review）— 外れていたら: 説明的な飾り・意味のない数字カード・どこにでもあるグラデーションを外し、DESIGN.md の「やらないこと」に照らす
- [ ] `copy.specific` どこにでも言える文を書かない。事実は入力データにあるものだけ（ai-review）— 外れていたら: そのものにしか言えない具体（数字・固有名・場面）に置き換える。データに無い事実は書かない
- [ ] `copy.ui-writing` ボタン・見出し・説明の文言の決まり（ai-review）— 外れていたら: ボタンは動詞（サ変は「する」を省く）、見出しは名詞、説明は敬体で動詞まで。リンクに「こちら」を使わない
- [ ] `visual.photo` 写真の質と使い方（解像度・トリミング・統一感）（human）— 外れていたら: 写真の色味・明るさをそろえ、主題が切れないようにトリミングする。仮の写真は本番前に必ず差し替える

スクリーンショット: screenshots/127.0.0.1_4391_ai-security-playbook-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_design-system-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_design-system-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_design-system-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_design-system-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_basics-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_basics-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_basics-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_basics-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_node-october-2026-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_node-october-2026-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_node-october-2026-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_node-october-2026-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_commands-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_commands-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_commands-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_commands-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_checklist-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_checklist-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_checklist-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_checklist-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_operations-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_operations-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_operations-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_operations-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_library-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_library-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_library-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_library-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_development-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_development-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_development-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_development-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_operations-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_operations-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_operations-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_operations-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_environment-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_environment-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_environment-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_environment-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_node-update-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_node-update-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_node-update-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_node-update-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_update-operations-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_update-operations-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_update-operations-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_update-operations-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_series_node-security-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_series_node-security-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_series_node-security-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_series_node-security-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_updates-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_updates-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_updates-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_updates-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_about-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_about-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_about-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_about-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_ai-data-boundaries-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_ai-data-boundaries-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_ai-data-boundaries-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_ai-data-boundaries-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_app-architecture-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_app-architecture-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_app-architecture-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_app-architecture-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_api-keys-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_api-keys-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_api-keys-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_api-keys-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_access-control-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_access-control-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_access-control-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_access-control-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_mcp-permissions-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_mcp-permissions-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_mcp-permissions-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_mcp-permissions-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_agent-permissions-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_agent-permissions-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_agent-permissions-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_agent-permissions-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_launch-checklist-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_launch-checklist-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_launch-checklist-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_launch-checklist-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_php-october-2026-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_php-october-2026-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_php-october-2026-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_php-october-2026-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_incident-response-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_incident-response-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_incident-response-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_incident-response-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_ai-tools-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_ai-tools-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_ai-tools-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_ai-tools-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_secrets-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_secrets-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_secrets-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_secrets-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_access-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_access-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_access-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_access-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_connections-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_connections-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_connections-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_connections-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_release-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_release-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_release-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_release-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_response-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_response-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_response-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_topics_response-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_solo-development-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_solo-development-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_solo-development-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_solo-development-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_before-launch-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_before-launch-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_before-launch-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_before-launch-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_ai-connections-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_ai-connections-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_ai-connections-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_paths_ai-connections-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_series_solo-development-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_series_solo-development-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_series_solo-development-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_series_solo-development-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_series_ai-connections-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_series_ai-connections-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_series_ai-connections-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_series_ai-connections-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_ai-work-logs-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_ai-work-logs-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_ai-work-logs-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_ai-work-logs-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_release-artifacts-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_release-artifacts-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_release-artifacts-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_release-artifacts-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_external-service-failures-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_external-service-failures-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_external-service-failures-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_external-service-failures-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_dependency-updates-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_dependency-updates-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_dependency-updates-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_dependency-updates-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_github-guards-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_github-guards-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_github-guards-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_github-guards-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_secret-rotation-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_secret-rotation-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_secret-rotation-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_secret-rotation-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_developer-privacy-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_developer-privacy-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_developer-privacy-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_developer-privacy-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_approved-ai-data-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_approved-ai-data-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_approved-ai-data-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_approved-ai-data-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_cloud-account-safety-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_cloud-account-safety-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_cloud-account-safety-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_cloud-account-safety-1280-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_ai-review-trust-375-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_ai-review-trust-320-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_ai-review-trust-768-fv.jpg, screenshots/127.0.0.1_4391_ai-security-playbook_learn_ai-review-trust-1280-fv.jpg

