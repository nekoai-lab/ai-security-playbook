import type { DiagramSpec } from "./lesson-visuals";
export const privacyDiagrams = {
  surfaces: {
    title: "本文のほかに、2つの公開面を見る",
    layout: "branch",
    nodes: [
      {
        label: "自分が公開するもの",
        detail: "出す名前と範囲を、先に選ぶ。",
        icon: "person",
      },
      {
        label: "本文と画像",
        detail: "コード・説明・スクリーンショット。",
        icon: "file",
      },
      {
        label: "履歴と配布物",
        detail: "コミットの作成者、付随情報。",
        icon: "box",
      },
      {
        label: "プロフィールとURL",
        detail: "表示名・画像・リンク先。",
        icon: "screen",
      },
    ],
    caption: "一つの面で見つからなくても、他の公開面を点検したとは限りません。",
  },
  git: {
    title: "アカウントの表示と、記録の作者を分ける",
    layout: "compare",
    nodes: [
      {
        label: "プロフィールの変更",
        detail: "サービス上で見える名前や画像を設定。",
        icon: "person",
      },
      {
        label: "コミットの作成者",
        detail: "作成時のGit設定が記録に付く。",
        icon: "file",
      },
    ],
    caption:
      "手元で作るコミットの作者は別に確認。今後の設定変更で、過去の記録は置き換わりません。",
  },
  profile: {
    title: "登録時の3つの項目を見比べる",
    layout: "sequence",
    nodes: [
      {
        label: "表示名",
        detail: "活動で見せたい名前になっているか。",
        icon: "person",
      },
      {
        label: "画像",
        detail: "初期値や別活動の画像が残っていないか。",
        icon: "eye",
      },
      {
        label: "URLとリンク",
        detail: "ユーザー名やリンク先が意図したものか。",
        icon: "cloud",
      },
    ],
    caption:
      "登録後の公開ページでも確認します。取得・表示される項目はサービスで異なります。",
  },
  artifact: {
    title: "編集したファイルから、実際の配布物へ",
    layout: "sequence",
    nodes: [
      {
        label: "作業中に整える",
        detail: "不要な周辺情報を含めない。",
        icon: "file",
      },
      {
        label: "形式に応じて確認",
        detail: "画像や文書の付随情報と書き出し設定。",
        icon: "eye",
      },
      {
        label: "受け取る物を見る",
        detail: "公開URLから届くファイルを照合。",
        icon: "box",
      },
    ],
    caption: "プレビューだけを確認せず、配布される実物を見ます。",
  },
  past: {
    title: "今後の設定と、既に公開した情報",
    layout: "compare",
    nodes: [
      {
        label: "これから記録する情報",
        detail: "対象環境とリポジトリの設定を確認。",
        icon: "file",
      },
      {
        label: "既に外へ出た情報",
        detail: "種類・範囲・コピー・削除方法を整理。",
        icon: "cloud",
      },
    ],
    caption:
      "履歴変更には副作用があります。一律に強制pushや完全回収を勧めません。",
  },
  repeat: {
    title: "公開面が増えたときに見直す",
    layout: "sequence",
    nodes: [
      {
        label: "新しい環境・連携",
        detail: "新PC、ログイン、共同作業。",
        icon: "screen",
      },
      {
        label: "増えた情報経路",
        detail: "記録の作者と公開先をたどる。",
        icon: "eye",
      },
      {
        label: "意図した範囲へ",
        detail: "結果を確認し、必要な設定だけ整える。",
        icon: "person",
      },
    ],
    caption:
      "すべてを隠すためではなく、公開する情報を自分で選ぶための点検です。",
  },
} satisfies Record<string, DiagramSpec>;
export type PrivacyDiagramKind = keyof typeof privacyDiagrams;
