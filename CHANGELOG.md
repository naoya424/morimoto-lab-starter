# 更新履歴

**最終更新日時：2026-10-08 21:00（日本時間／JST）**

**更新者：中沢尚也**

森本研究室 システム開発スターターの主な変更を、新しいものから記録します。
今後の更新時も、更新日時（日本時間）・実際の更新者名・変更内容・利用者への影響を追記し、過去の記録は残します。
READMEと変更した手順書の冒頭にある最終更新情報も、その更新に合わせて変更します。
ファイルごとの詳しい差分は [GitHubのコミット履歴](https://github.com/naoya424/morimoto-lab-starter/commits/main/)で確認できます。

[READMEへ戻る](README.md) ／ [Mac用の手順](docs/setup-mac.md) ／ [Windows用の手順](docs/setup-windows.md)

## 更新一覧

| 更新日時（JST） | 更新者 | 内容 | 詳細 |
| --- | --- | --- | --- |
| 2026-10-08 21:00 | 中沢尚也 | AI連携を追加する場合の手順を追加 | [今回の内容](#ai連携を追加する場合の手順を追加) |
| 2026-10-08 20:46 | 中沢尚也 | システム構成図を追加 | [構成図の追加](#システム構成図を追加) |
| 2026-10-08 20:34 | 中沢尚也 | 更新日時・更新者の記録を追加 | [e66d6d0](https://github.com/naoya424/morimoto-lab-starter/commit/e66d6d0) |
| 2026-10-08 17:43 | 中沢尚也 | GitHub Desktopを使わない手順と更新履歴を追加 | [3dd58e5](https://github.com/naoya424/morimoto-lab-starter/commit/3dd58e5) |
| 2026-10-08 17:02 | 中沢尚也 | 共通Starterの公開に合わせて案内を更新 | [86743eb](https://github.com/naoya424/morimoto-lab-starter/commit/86743eb) |
| 2026-10-08 16:43 | 中沢尚也 | Mac・Windows用の詳しい手順書を追加 | [f5e5fb2](https://github.com/naoya424/morimoto-lab-starter/commit/f5e5fb2) |
| 2026-10-08 16:23 | 中沢尚也 | 名称を「森本研究室 システム開発スターター」に統一 | [cdfb6de](https://github.com/naoya424/morimoto-lab-starter/commit/cdfb6de) |
| 2026-10-08 16:11 | 中沢尚也 | Next.js・FastAPI・MongoDBの最小構成を作成 | [4d82907](https://github.com/naoya424/morimoto-lab-starter/commit/4d82907) |

過去の更新日時は、対応するコード・文書のGitコミット日時です。リポジトリの公開設定を切り替えた操作時刻とは区別します。
更新者は表示名「中沢尚也」で記載しています。過去のコミットでは作成者名が `naoya424` と記録されており、各リンクから確認できます。

## 2026-10-08

### AI連携を追加する場合の手順を追加

更新日時：2026-10-08 21:00（JST）／ 更新者：中沢尚也

- OpenAI APIを基本例にした追加手順 `docs/ai-integration.md` を作成し、README・Mac用・Windows用手順からリンク。
- 公式Python SDK・OpenAI公式ドキュメント・Docker公式資料を参考に、APIキーの管理、Composeでの受け渡し、AI処理とルートの最小コード例、接続確認方法を記載。
- AI呼び出しをFastAPIにまとめ、他社APIへ変更する場合の修正箇所と参考資料を追加。
- READMEの構成図に外部AI APIを点線で追加し、追加実装が必要な部分と明記。
- 料金、外部へのデータ送信、研究用の記録、APIキーを公開しないための注意点を記載。

利用者への影響：各自の研究用プロジェクトにAI連携を追加する際の手順を参照できます。今回は文書の更新で、AI機能や依存ライブラリはStarterに組み込んでいません。実API通信・Docker一括起動・Windows実機での確認は未完了です。

### システム構成図を追加

更新日時：2026-10-08 20:46（JST）／ 更新者：中沢尚也

- READMEに、ブラウザ・Next.js・FastAPI・MongoDB・データ保存領域を示すMermaid形式の構成図を追加。
- メモの保存の流れ、各サービスの役割・接続先・編集箇所、GitHubの役割を説明。
- Docker公式の構成図、GitHubのComposeサンプル、Mermaidの公式案内を参考資料として記載。
- 既存のCompose設定・API転送設定・DB接続処理と図の対応を確認。

利用者への影響：画面・API・データベースの関係をREADMEで確認できます。アプリの機能・起動方法・保存データへの変更はありません。Dockerでの一括起動・Windows実機での実行確認は引き続き未完了です。

### 更新日時・更新者の記録を追加

更新日時：2026-10-08 20:34（JST）／ 更新者：中沢尚也

- README・Mac用手順書・Windows用手順書・更新履歴の冒頭に、最終更新日時と更新者名を追加。
- 更新一覧に過去のコミット日時と変更内容をまとめ、詳しい変更履歴へリンク。
- このリポジトリで今後作成するGitコミットの作成者名を「中沢尚也」に設定。
- 今後も日時・更新者・変更内容を追記する記録方法を明記。

利用者への影響：文書がいつ、誰によって更新されたかを確認できます。起動方法・アプリの機能・保存データへの変更はありません。

### GitHub Desktopを使わない手順と更新履歴を追加

- GitHub Desktopが必須ではないことをREADMEと両OSの手順書に明記。
- Mac・Windowsそれぞれに、ZIPの取得・展開・配置から既存の設定・起動手順へ進む方法を追加。
- Gitコマンドで自分の非公開リポジトリを取得する方法を追加。Git・GitHub CLIの準備、ブラウザでの認証、変更の記録・送信・取り込みまで説明。
- ZIP版にはGitの管理情報が含まれず、そのままではGitHubへの送信や更新の取り込みができないことを明記。
- 自分の研究用リポジトリへ共通Starterの更新が自動反映されないことを明記。
- この更新履歴ファイルを追加し、READMEと両OSの手順書からリンク。

利用者への影響：利用する取得方法を選べます。アプリの機能・Docker設定・保存データへの変更はありません。
文書内のリンクとMac用コマンドの構文を確認。Dockerでの一括起動・Windows実機での実行確認は未完了です。

### 同日のそれ以前の更新

- **共通Starterを公開**：ログインや招待なしで閲覧できるようにし、配布案内を更新。各自の研究用リポジトリは非公開で作る手順を維持。[案内の変更](https://github.com/naoya424/morimoto-lab-starter/commit/86743eb)
- **Mac・Windows用の詳しい手順書を追加**：初回準備、起動、画面編集、GitHubへの保存、終了・再開、トラブル対応を記載。[変更内容](https://github.com/naoya424/morimoto-lab-starter/commit/f5e5fb2)
- **名称を改善**：「森本研究室 システム開発スターター」と「研究システムづくりの共通ひな形」に表示を統一。[変更内容](https://github.com/naoya424/morimoto-lab-starter/commit/cdfb6de)
- **最小構成を作成**：Next.js・FastAPI・MongoDBとCompose設定、メモの保存・一覧表示機能を追加。[変更内容](https://github.com/naoya424/morimoto-lab-starter/commit/4d82907)
