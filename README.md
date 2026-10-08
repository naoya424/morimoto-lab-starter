# 森本研究室 システム開発スターター

森本研究室のメンバーが各自の研究システムを作るための、共通の開発用ひな形です。

**Next.js → FastAPI → MongoDB** の3サービスを Docker Compose で起動します。
サンプル機能は「メモの保存・一覧表示」のみです。認証やAI連携などは必要になってから追加します。

## はじめに

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) をインストールし、起動しておきます。
- Gitを使う場合はGitも必要です。Node.js・Python・MongoDBをMacへ個別に入れる必要はありません。
- 初回はイメージの取得とビルドで数分かかり、数GB以上の空き容量を使います。
- このひな形は自分のPCで開発するためのものです。画面とAPIは `127.0.0.1` に限定し、MongoDBのポートはPC側へ公開しません。認証は未実装なので、実際の研究データの収集やサーバー公開の前に必要な認証・アクセス制御を追加してください。

## メンバーの利用手順

### 1. 自分の研究用リポジトリを作る

GitHub上でこのリポジトリの **Use this template → Create a new repository** を選びます。
自分の研究に合う名前を付け、公開範囲は **Private** にします。
元のStarterは研究室共通のひな形として残し、研究の変更は自分のリポジトリへ保存します。

非公開のStarterを閲覧するには、管理者からGitHubでアクセス権を付与されている必要があります。

### 2. Macに取得する

ターミナルで実行します。URLとフォルダ名は、手順1で作った自分のリポジトリに合わせて置き換えてください。

```bash
mkdir -p ~/Projects
cd ~/Projects
git clone <自分のリポジトリのURL> my-research
cd my-research
cp .env.example .env
```

すでに `.env` がある場合はコピーし直さず、その内容を確認してください。
Gitを使わず動作だけ試す場合は、GitHubの **Code → Download ZIP** から取得・展開し、そのフォルダ内で同じ設定と起動手順を実行できます。

### 3. 起動する

`compose.yaml` があるフォルダで実行します。

```bash
docker compose up --build
```

起動後、次を開きます。

| 用途 | URL |
| --- | --- |
| サンプル画面 | http://localhost:3000 |
| APIの仕様・試行画面 | http://localhost:3000/api/docs |
| 接続確認 | http://localhost:3000/api/health |

「API・データベース接続済み」と表示されたら、メモを1件保存してください。
ページを再読み込みしてメモが残っていれば、画面・API・データベースの接続を確認できます。

### 4. 停止・再開する

起動中のターミナルで **Control + C** を押すと停止します。
コンテナとネットワークも片付ける場合は次を実行します。保存したメモは専用ボリュームに残ります。

```bash
docker compose down
```

再開するときは `docker compose up`、設定や依存パッケージを変更したときは `docker compose up --build` を実行します。
`docker compose down -v` はデータ用ボリュームも削除するため、通常の停止には使わないでください。

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
├── compose.yaml
├── .env.example
├── .gitignore
└── README.md
```

- 画面を作る：`frontend/src/app/` を編集します。
- APIを作る：`backend/app/routes/` にファイルを追加し、`main.py` に登録します。
- 上記のソース変更は起動中のコンテナに反映されます。
- `package.json`・`package-lock.json`・`requirements.txt`・Dockerfile・設定ファイルを変えたら再ビルドします。
- `.env` は各自の設定です。Gitには含まれません。共有する設定項目は、秘密の値を入れず `.env.example` に記載します。

## API

| メソッド | パス | 内容 |
| --- | --- | --- |
| GET | `/api/health` | API・MongoDBの接続確認 |
| GET | `/api/samples` | 新しい順に最大20件のメモを取得 |
| POST | `/api/samples` | `{"text": "テストメモ"}` を保存 |

メモは前後の空白を除いて1〜500文字です。
ブラウザからは同じオリジンの `/api/*` に接続し、Next.js経由でFastAPIへ転送します。
FastAPIへ直接接続する場合は http://localhost:8000/api/docs を使えます。

## よくあるつまずき

- **Dockerに接続できない**：Docker Desktopの起動が完了しているか確認します。
- **ポートが使用中**：`.env` の `FRONTEND_PORT` と `BACKEND_PORT` を別の番号（例：3001・8001）に変更して起動します。画面URLも変更後の番号に合わせます。
- **画面が未接続**：`docker compose ps` と `docker compose logs backend mongodb` で状態を確認します。MongoDBが準備できてからAPI、APIが準備できてから画面が起動します。
- **変更が反映されない**：設定や依存パッケージの変更後は `docker compose up --build` を実行します。
- **複数の研究プロジェクトを動かす**：異なるフォルダ名・異なるポートを使います。Composeのプロジェクト名とデータ用ボリュームはフォルダ名を基に分かれます。同じフォルダ名を使う場合は `docker compose -p 名前 ...` でプロジェクト名を明示し、停止時にも同じ名前を指定します。

## 管理者の配布手順

1. このリポジトリをGitHubの非公開リポジトリとして配置します。
2. リポジトリのSettingsで **Template repository** を有効にします。
3. 利用するメンバーをリポジトリのCollaborators、または研究室Organizationの適切なTeamに追加します。
4. リポジトリのURLと「メンバーの利用手順」を案内します。

メンバーの招待は管理者が対象者を確認して実施してください。
MAMPのプロジェクトとは独立して動作します。

## 参考資料

- [Next.js：基本構成と起動](https://nextjs.org/docs/app/getting-started/installation)
- [FastAPI：接続の開始・終了を管理するlifespan](https://fastapi.tiangolo.com/advanced/events/)
- [MongoDB：PyMongoの接続](https://www.mongodb.com/docs/languages/python/pymongo-driver/current/connect/mongoclient/)
- [Docker Compose：起動順序とhealthcheck](https://docs.docker.com/compose/how-tos/startup-order/)
