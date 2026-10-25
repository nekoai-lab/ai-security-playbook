# GA4の運用

測定ID: G-Q83DQP6PS5 / ストリームID: 16202145101 / AI Security Playbook。ユーザー提供の公開IDで、秘密鍵ではない。

- 本番https://nekoai-lab.github.io/ai-security-playbook/ のみ計測。localhost/別origin/開発/制作見本は送信しない。
- 共通ShellのGoogleAnalyticsが1回初期化し、標準の自動ページビューと拡張計測に任せる。手動page_view/view_search_resultsを重ねない。画面内検索は標準の検索語イベントが発火しないことを実測したため、検索ボタン/Enterで確定した非空の語をsearchイベントで補完する。入力途中は送らず、searchとview_search_resultsを検索回数として合算しない。qは既存のサイト内検索URLで、標準の検索クエリ名。
- ユーザーの指示によりサイト内検索をONのまま維持。検索語は不足教材の発見に利用する。GA管理画面のストリーム設定は今回変更しない。
- 広告向けシグナルはfalse。独自User-IDや検索語以外の入力収集は追加しない。匿名で絶対に個人を識別できない等の保証はしない。
- Zennと同じプロパティなので、レポートではこのストリームで絞る。集客→トラフィック獲得でセッションの参照元/メディア、エンゲージメント→ページ/イベントで閲覧やview_search_resultsを確認。標準レポートと探索の可用性・反映時間はGA画面で確認する。
- 共有リンクには必要に応じutm_source=zenn / note / x、utm_medium=social / referral、utm_campaign=playbookなどを付ける。既存の検索/フィルターは変更しない。
- 新規ストリームの警告がすぐ消えないことがある。タグの通信成功とGAの集計反映を区別し、管理画面のリアルタイム/イベントでも確認する。

一次資料:
- https://developers.google.com/tag-platform/gtagjs/configure
- https://developers.google.com/analytics/devguides/collection/ga4/reference/config
- https://support.google.com/analytics/answer/9216061?hl=ja

検索語の確認:
- 確定操作は推奨イベントsearchのsearch_termで見る。結果URLへの訪問は標準view_search_resultsで、同じ検索回数として足し合わせない。
- 探索では検索キーワード（Search term）とイベント数を使い、イベント名searchとこのストリームで絞る。イベント詳細でパラメーターを継続表示する必要があり、既定の項目で出ない場合はイベントスコープのカスタム定義をsearch_termに対して作成する。表示・反映はGA画面で確認する。
- https://developers.google.com/analytics/devguides/collection/ga4/reference/events#search
- https://support.google.com/analytics/answer/13597527?hl=en
