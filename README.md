# 森本研究室 システム開発スターター

**研究システムづくりの共通ひな形**

森本研究室のメンバーが各自の研究システムを作るための、共通の開発用ひな形です。
Next.js（画面）・FastAPI（API）・MongoDB（データベース）の3サービスを、Docker Composeでまとめて起動します。
サンプル機能は「メモの保存・一覧表示」のみです。認証やAI連携などは、必要になってから追加します。

## まず、自分のOSの手順を開いてください

| 利用するPC | 詳しい手順 |
| --- | --- |
| Mac | **[Mac用の利用手順](docs/setup-mac.md)** |
| Windows | **[Windows用の利用手順](docs/setup-windows.md)** |

それぞれの手順書に、次の内容をまとめています。

1. 必要なアプリの準備（WindowsはWSL 2の設定を含む）
2. 共通ひな形から自分の非公開リポジトリを作成
3. PCへ取得し、設定ファイルを準備
4. 起動してメモの保存を確認
5. 画面を編集し、変更をGitHubへ保存
6. 終了・翌日の再開・困ったときの対処

GitHubの操作はGitHub Desktop、編集はVS Codeを使う流れです。起動コマンドはMacではターミナル、WindowsではPowerShellに入力します。
Node.js・Python・MongoDBをPCへ個別に入れる必要はありません。MAMPとは独立して使えます。

この共通ひな形と手順書は公開しています。閲覧に招待やGitHubへのログインは不要です。
自分の研究用リポジトリを作るときはGitHubへログインし、公開範囲を **Private** にします。

## 準備済みの方の起動・停止

Docker Desktopを起動し、`.env` を準備済みであることを確認します。
`compose.yaml` がある自分のプロジェクトのフォルダで実行してください。

```text
docker compose up --build
```

| 用途 | URL |
| --- | --- |
| サンプル画面 | [http://localhost:3000](http://localhost:3000) |
| APIの仕様・試行画面 | [http://localhost:3000/api/docs](http://localhost:3000/api/docs) |
| 接続確認 | [http://localhost:3000/api/health](http://localhost:3000/api/health) |

「API・データベース接続済み」と表示されたら、テスト用のメモを1件保存します。
ブラウザを再読み込みしてメモが残っていれば、画面・API・データベースの接続を確認できます。

停止するときは起動中の画面で **Control + C（WindowsではCtrl + C）** を押し、停止完了後に次を実行します。

```text
docker compose down
```

保存したメモは専用ボリュームに残ります。**`docker compose down -v` はデータも削除するため、通常の停止には使いません。**
次回は同じフォルダで `docker compose up` を実行して再開します。

## どこを編集するか

```text
morimoto-lab-starter/
├── frontend/
│   ├── src/app/
│   │   ├── page.tsx           # サンプル画面
│   │   ├── layout.tsx         # 共通レイアウト
│   │   └── globals.css        # 見た目
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── next.config.mjs        # /api/* をFastAPIへ転送
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py            # APIの起点・接続確認
│   │   ├── db.py              # MongoDB接続
│   │   └── routes/
│   │       ├── __init__.py
│   │       └── sample.py      # メモの保存・取得
│   ├── Dockerfile
│   ├── .dockerignore
│   └── requirements.txt
├── docs/
│   ├── setup-mac.md           # Mac用の利用手順
│   └── setup-windows.md       # Windows用の利用手順
├── compose.yaml
├── .env.example              # 各自が.envへコピーして使う
├── .gitignore
└── README.md
```

- 画面を作る：`frontend/src/app/` を編集します。
- APIを作る：`backend/app/routes/` にファイルを追加し、`main.py` に登録します。
- `frontend/src` と `backend/app` は、起動中のコンテナへ変更が共有されます。Windowsでは自動更新されない場合があるため、[Windows用手順の編集方法](docs/setup-windows.md#8-画面を1か所編集してみる)も確認してください。
- `package.json`・`package-lock.json`・`requirements.txt`・Dockerfile・`next.config.mjs` などの変更後は、停止して `docker compose up --build` で再ビルドします。
- `.env` は各自の設定で、Gitには含まれません。共有する設定項目は、秘密の値を入れず `.env.example` に記載します。

GitHubにはプログラムと変更履歴を保存します。MongoDB内のメモは含まれないため、実際の研究データには別途バックアップが必要です。

## API

| メソッド | パス | 内容 |
| --- | --- | --- |
| GET | `/api/health` | API・MongoDBの接続確認 |
| GET | `/api/samples` | 新しい順に最大20件のメモを取得 |
| POST | `/api/samples` | `{"text": "テストメモ"}` を保存 |

メモは前後の空白を除いて1〜500文字です。
ブラウザからは同じオリジンの `/api/*` に接続し、Next.js経由でFastAPIへ転送します。
FastAPIへ直接接続する場合は [http://localhost:8000/api/docs](http://localhost:8000/api/docs) を使えます。

## 利用範囲と設定

このひな形は自分のPCでの開発用です。画面とAPIは `127.0.0.1` に限定し、MongoDBのポートはPC側へ公開しません。
認証は未実装なので、実際の研究データの収集やサーバー公開の前に、必要な認証・アクセス制御を追加してください。

ポートが使用中の場合は、`.env` の `FRONTEND_PORT` と `BACKEND_PORT` を別の番号（例：3001・8001）に変更し、再起動します。ブラウザのURLも変更後の番号に合わせます。

複数の研究プロジェクトを動かす場合は、異なるフォルダ名・異なるポートを使います。
Composeのプロジェクト名とデータ用ボリュームは、フォルダ名を基に分かれます。同じフォルダ名を使う場合は `docker compose -p 名前 ...` でプロジェクト名を明示し、起動・状態確認・停止で同じ名前を指定します。
すでにデータがあるプロジェクトのフォルダ名を変更する場合は、保存領域との対応にも注意してください。

## 管理者の配布手順

1. この共通ひな形をGitHubの公開リポジトリとして配置します。
2. リポジトリのSettingsで **Template repository** を有効にします。
3. リポジトリのURLと各OSの手順書をメンバーへ案内します。閲覧・取得のための招待は不要です。
4. 共通ひな形を共同編集するメンバーには、必要に応じて書き込み権限を付与します。

メンバーが自分のアカウントに作った非公開の研究用リポジトリを管理者も閲覧する場合は、そのリポジトリへの招待が別途必要です。

## 動作確認状況

2026年10月8日時点で、次を確認しています。

- Mac上でNext.jsの型チェック・本番ビルド、FastAPI・MongoDBと連携したメモの保存・取得を確認。
- データベース再起動後のデータ保持、入力エラー、接続できない場合の動作を確認。
- Docker Composeの設定ファイルを検証。

**Docker Desktopによる一括ビルド・起動と、Windows実機での実行は未確認です。**
OS別手順は公式資料とこのリポジトリの設定に基づくもので、両OSの実機検証完了を示すものではありません。

## 技術資料

- [Next.js：基本構成と起動](https://nextjs.org/docs/app/getting-started/installation)
- [FastAPI：接続の開始・終了を管理するlifespan](https://fastapi.tiangolo.com/advanced/events/)
- [MongoDB：PyMongoの接続](https://www.mongodb.com/docs/languages/python/pymongo-driver/current/connect/mongoclient/)
- [Docker Compose：起動順序とhealthcheck](https://docs.docker.com/compose/how-tos/startup-order/)

インストールやGitHubの操作に関する公式資料は、各OSの手順書から参照できます。
