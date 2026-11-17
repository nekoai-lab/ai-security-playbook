import type { LessonVisualId } from "./lesson-visuals";
export interface FeaturedLesson {
  id: LessonVisualId;
  situation: string;
  question: string;
  takeaway: string;
}
export const featuredLessons = [
  {
    id: "api-keys",
    situation: "外部サービスをつなぐとき",
    question: "APIキー、どこに入れるのが正解？",
    takeaway: "設定して動いた。その値がどこへ届くかを確かめる。",
  },

  {
    id: "approved-ai-data",
    situation: "仕事の情報をAIで扱うとき",
    question: "「学習しない」設定なら、どこまで使える？",
    takeaway: "入力できる範囲を、契約・保存・連携先から整理する。",
  },
  {
    id: "node-october-2026",
    situation: "AIツールやMCPの実行環境を確かめるとき",
    question: "Node.jsの更新、確認するのはどこ？",
    takeaway: "PC・MCP・CI・本番で、更新した版と動いている版を確認する。",
  },
  {
    id: "access-control",
    situation: "利用者ごとのデータを扱うとき",
    question: "ログインできた。その先の権限は？",
    takeaway: "別の利用者からデータが見えないか、具体例で確かめる。",
  },
  {
    id: "agent-permissions",
    situation: "AIにコード変更や操作を任せるとき",
    question: "その作業、公開まで任せてよかった？",
    takeaway: "読む・変更する・公開する権限と、確認する操作を分ける。",
  },
  {
    id: "cloud-account-safety",
    situation: "クラウドでアプリを動かすとき",
    question: "公開に使った認証は、何を動かせる？",
    takeaway: "管理者・日常作業・アプリの権限を、AWSの例で整理する。",
  },
  {
    id: "external-service-failures",
    situation: "外部の画像やAPIを使うとき",
    question: "返事が来ない。空の結果と同じでいい？",
    takeaway: "タイムアウトや利用制限を分け、失敗した時の動きを考える。",
  },
  {
    id: "php-october-2026",
    situation: "PHPやWordPressのサイトを管理するとき",
    question: "そのサイト、どのPHPで動いている？",
    takeaway: "提供元の対応と実行環境を照合し、更新を確認する。",
  },
] as const satisfies readonly FeaturedLesson[];
