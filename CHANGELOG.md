# 更新履歴

森本研究室 システム開発スターターの主な変更を、新しいものから記録します。
今後の更新時も、日付・変更内容・利用者への影響を追記し、過去の記録は残します。
ファイルごとの詳しい差分は [GitHubのコミット履歴](https://github.com/naoya424/morimoto-lab-starter/commits/main/)で確認できます。

[READMEへ戻る](README.md) ／ [Mac用の手順](docs/setup-mac.md) ／ [Windows用の手順](docs/setup-windows.md)

## 2026-10-08

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
