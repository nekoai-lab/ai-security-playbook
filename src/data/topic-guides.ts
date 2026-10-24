import type { topicIds } from "./catalog";
import type { LessonVisualId } from "./lesson-visuals";
export type TopicId = (typeof topicIds)[number];
export interface TopicGuideData {
  feature: LessonVisualId;
  intro: string;
  questions: {
    title: string;
    text: string;
    lesson: LessonVisualId;
    anchor?: string;
  }[];
  related: TopicId[];
}
export const topicGuides = {
  "ai-tools": {
    feature: "ai-data-boundaries",
    intro:
      "資料の要約や画面の相談をするとき、名前を消すだけでは判断できない情報もあります。まず目的に必要な条件を選び、保存・連携・回答の共有までを分けて考えます。",
    questions: [
      {
        title: "名前を消したら、渡していい？",
        text: "所属や出来事の組み合わせが残る場合があります。仮名化と、必要な情報だけを選ぶ違いを見ます。",
        lesson: "ai-data-boundaries",
        anchor: "minimize",
      },
      {
        title: "学習に使わないなら、保存もされない？",
        text: "学習利用、保持、外部ツールへの送信、共有する人は、それぞれ確認する条件です。",
        lesson: "ai-data-boundaries",
        anchor: "destinations",
      },
      {
        title: "画像や添付で、何を見落としやすい？",
        text: "通知の写り込み、別シート、コメント、回答への残り方まで確認します。",
        lesson: "ai-data-boundaries",
        anchor: "attachments",
      },
    ],
    related: ["secrets", "connections"],
  },
  development: {
    feature: "app-architecture",
    intro:
      "画面が動いたら、その裏で情報がどこへ渡り、どこに保存されるかをたどります。サービス名より役割を先に理解すると、秘密・権限・更新の確認先が分かります。",
    questions: [
      {
        title: "ブラウザ・サーバー・DBは、何が違う？",
        text: "画面、処理、保存、外部APIを分けます。同じ提供元でも担当する役割は複数あります。",
        lesson: "app-architecture",
        anchor: "roles",
      },
      {
        title: "保存できたように見えるけれど、どこにある？",
        text: "要求と応答、画面内の記録、端末内の保存、DBの違いから確かめます。",
        lesson: "app-architecture",
        anchor: "request",
      },
      {
        title: "緑のチェックがあれば、公開していい？",
        text: "検査した差分、必須の条件、検査と公開の権限を分けて確認します。",
        lesson: "github-guards",
      },
    ],
    related: ["secrets", "access"],
  },
  access: {
    feature: "access-control",
    intro:
      "自分でログインして、自分のデータだけ見えた。その確認の先に、別の利用者へ返さない仕組みがあります。会員向けアプリを公開する前に、本人・対象・操作を分けて考えます。",
    questions: [
      {
        title: "ログインと権限の確認は、何が違う？",
        text: "本人を確かめた後、その人がどの記録を使えるかを判断します。",
        lesson: "access-control",
        anchor: "identity",
      },
      {
        title: "別の利用者で、何を試せばいい？",
        text: "自分のテスト用A/Bと未ログインで、内容が返る側と返らない側を見比べます。",
        lesson: "access-control",
        anchor: "ownership",
      },
      {
        title: "画像や共有リンクも、同じ確認で足りる？",
        text: "閲覧・編集・削除・共有と、別の保存先にあるファイルの権限を分けます。",
        lesson: "access-control",
        anchor: "matrix",
      },
    ],
    related: ["development", "release"],
  },
  response: {
    feature: "incident-response",
    intro:
      "削除・交換の案内を受けた後にも、古いキーの失効、履歴、データの復旧と再開の判断が残ります。原因が未確認でも、事実と推測を分けて相談を進められます。",
    questions: [
      {
        title: "気づいた直後、何から整理する？",
        text: "対象と時刻を絞り、広がる公開や権限を抑え、記録を消さず相談します。",
        lesson: "incident-response",
        anchor: "first",
      },
      {
        title: "キーを消して交換したら、終わり？",
        text: "公開場所からの削除と、発行元での失効、利用履歴の確認は別の対応です。",
        lesson: "incident-response",
        anchor: "key",
      },
      {
        title: "バックアップへ戻せば、元どおり？",
        text: "戻す時点以降の更新、画像などDB外の対象、再開の条件を確かめます。",
        lesson: "incident-response",
        anchor: "restore",
      },
    ],
    related: ["secrets", "operations"],
  },
  secrets: {
    feature: "api-keys",
    intro:
      "外部サービスをつないだとき、設定値がどこで使われ、誰の端末へ届くかが大切です。キーの種類、ブラウザへ渡る設定、会話やログの写しを順に整理します。",
    questions: [
      {
        title: "キーは、どこに設定する？",
        text: "名前やファイル名だけで判断せず、公開用か秘密か、どこへ配信されるかを見ます。",
        lesson: "api-keys",
      },
      {
        title: "会話を閉じた後、秘密はどこに残る？",
        text: "ツール出力、編集前の控え、バックアップ、接続先を分けて確かめます。",
        lesson: "ai-work-logs",
      },
      {
        title: "キーを替えたのに、古いキーが動く？",
        text: "保存先・稼働先・発行元を分け、旧実行と失効まで確認します。",
        lesson: "secret-rotation",
      },
    ],
    related: ["development", "response"],
  },
  connections: {
    feature: "mcp-permissions",
    intro:
      "AIへ道具をつなぐと、読む情報だけでなく、変更や送信の範囲も広がります。MCPの接続先と、エージェントが実行できる権限を別々に確かめます。",
    questions: [
      {
        title: "MCPをつなぐ前に、何を見る？",
        text: "提供元、接続先、認証、読み取り・書き込みの操作を確認します。",
        lesson: "mcp-permissions",
      },
      {
        title: "「しないで」と指示すれば、権限も減る？",
        text: "指示、フックによる検知、実際に読める場所・使える道具を分けます。",
        lesson: "agent-permissions",
      },
      {
        title: "連携で読んだ情報は、記録にも残る？",
        text: "会話とツール出力、保存先と閲覧者までつなげて考えます。",
        lesson: "ai-work-logs",
      },
    ],
    related: ["ai-tools", "access"],
  },
  release: {
    feature: "release-artifacts",
    intro:
      "コードが動くだけでなく、相手に何が届き、どの権限で使えるかを確認します。ファイルの範囲と、サービス全体の公開・料金・復旧を分けて点検します。",
    questions: [
      {
        title: "相手に届くファイルは、作業用と同じ？",
        text: "含める範囲を決め、実際の配布物を受け取って内容を確認します。",
        lesson: "release-artifacts",
      },
      {
        title: "公開前に、サービス全体で何を見る？",
        text: "データの範囲、認可、秘密、料金、復旧を設定とテスト結果で照合します。",
        lesson: "launch-checklist",
      },
      {
        title: "ログインが付いていれば、データは分かれる？",
        text: "本人と別の利用者、未ログインで、許可と拒否の結果を確かめます。",
        lesson: "access-control",
        anchor: "verification",
      },
    ],
    related: ["access", "response"],
  },
  operations: {
    feature: "dependency-updates",
    intro:
      "更新は、通知を読んだだけでも、インストールしただけでも終わりません。実際に動く版、対象の環境、更新後の結果と、次回の担当までつなぎます。",
    questions: [
      {
        title: "知らない部品の通知は、自分に関係する？",
        text: "直接・推移的な依存から、検知の対象と影響の判断をたどります。",
        lesson: "dependency-updates",
      },
      {
        title: "外部サービスが止まったら、どうする？",
        text: "取得失敗と空の結果を分け、代替表示・再試行・結果不明の扱いを整理します。",
        lesson: "external-service-failures",
      },
      {
        title: "更新を毎回の運用につなげるには？",
        text: "通知へ出す情報、AIレビューの条件、担当と再確認の契機を決めます。",
        lesson: "operations",
      },
    ],
    related: ["development", "response"],
  },
} satisfies Record<TopicId, TopicGuideData>;
