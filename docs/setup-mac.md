# Mac用：森本研究室 システム開発スターター 利用手順

**最終更新日時：2026-10-08 20:34（日本時間／JST）**

**更新者：中沢尚也**

初めて使う方が、準備から起動、画面の編集、GitHubへの保存まで進めるための手順です。
初回は利用する方法に合わせて1〜8を進め、次回からは9を使ってください。

この手順では、自分の研究用プロジェクトを **`my-research`** という名前で作ります。別の名前にした場合は、以降のパスにある `my-research` も読み替えてください。

[READMEへ戻る](../README.md) ／ [Windows用の手順](setup-windows.md) ／ [更新履歴](../CHANGELOG.md)

**GitHub Desktopは必須ではありません。** 取得方法を次の3つから1つ選びます。Docker Desktopは、どの方法でも起動に使います。

| 方法 | 向いている使い方 | 読み進め方 |
| --- | --- | --- |
| A：GitHub Desktop | 画面操作で取得・変更履歴の保存を行う | 従来どおり順に進み、[手順4A](#4a-github-desktopで取得する)を使う |
| B：ZIP | Git関連のアプリを入れず、まず動かしてみる | GitHub Desktopの導入と手順3を飛ばし、[手順4B](#4b-zipで取得する)へ進む |
| C：Gitコマンド | コマンドで取得・変更履歴の保存を行う | GitHub Desktopの導入を飛ばし、手順3で自分用を作ってから[手順4C](#4c-gitコマンドで取得する)へ進む |

取得後の設定・起動・画面編集・停止は共通です。ZIPで試すだけならGitHubアカウントも不要で、GitHubへの保存（手順8）は省略できます。

## 1. 最初に確認すること

次のものを用意します。

| 用意するもの | 何に使うか |
| --- | --- |
| GitHubアカウント | 方法A・Cで自分の研究用リポジトリを作り、プログラムを保存する |
| StarterのURL | 共通ひな形と手順書を開く（閲覧は招待不要） |
| Docker Desktop | 画面・API・データベースをまとめて動かす |
| GitHub Desktop（任意） | 方法Aで取得・保存を画面操作で行う。方法B・Cでは不要 |
| Git（方法C）・GitHub CLI（認証例） | Gitコマンドで取得・保存する。認証済みならGitHub CLIの追加は不要 |
| Visual Studio Code（以下、VS Code） | プログラムや設定を編集する |

Node.js・Python・MongoDBをPCへ個別にインストールする必要はありません。実行環境はDocker Desktopで用意します。GitHub Desktopは方法Aだけで使います。方法BではGitも不要で、方法Cではコマンド用のGitを準備します。MAMPも使いません。

初回はアプリと実行環境をダウンロードするため、インターネット接続と十分な空き容量が必要です。**作業用の余裕として20 GB程度以上の空きを推奨します。** これはこの手順の目安であり、公式の最低要件や実測使用量ではありません。残り数GBしかない場合は、先に空き容量を確保してください。

このひな形は自分のPCでの開発用です。最初の動作確認にはテスト用のメモを使います。認証は未実装なので、研究参加者のデータを扱う段階では、必要な認証・アクセス制御を追加します。

## 2. 必要なアプリを入れる〈初回のみ〉

すでに入っているアプリは、再インストールせず起動を確認してください。

### 2-1. Docker Desktop

1. Macの左上の **Appleメニュー → このMacについて** を開きます。
2. 「チップ」がApple Mシリーズなら **Apple silicon版**、「プロセッサ」がIntelなら **Intel版** を選びます。
3. [Docker DesktopのMac用公式ページ](https://docs.docker.com/desktop/setup/install/mac-install/)で、対応するmacOS・メモリなどの要件を確認し、該当するインストーラーをダウンロードします。
4. ダウンロードした `.dmg` を開き、Dockerを **アプリケーション** フォルダへドラッグします。
5. アプリケーションフォルダから **Docker** を起動し、初回の案内に沿って設定します。
6. Docker Desktopが起動し、エンジンの起動処理が終わるまで待ちます。ウインドウが開いただけでは準備が終わっていない場合があります。

### 2-2. GitHub Desktop（方法Aのみ）

**方法B・Cでは、この項目を飛ばしてください。**

1. [GitHub Desktop](https://desktop.github.com/)からMac用をダウンロードします。
2. ダウンロードしたファイルを開き、GitHub Desktopをアプリケーションフォルダへ置いて起動します。
3. **Sign in to GitHub.com** から、自分のGitHubアカウントでログインします。ブラウザで認証した後、GitHub Desktopに戻ります。
4. 名前・メールアドレスの設定が表示されたら、変更履歴に記録する情報を確認して進めます。

インストール画面が異なる場合は、[GitHub Desktopの公式手順](https://docs.github.com/en/desktop/installing-and-authenticating-to-github-desktop/installing-github-desktop)を参照してください。

### 2-3. VS Code

1. [VS CodeのMac用公式ページ](https://code.visualstudio.com/docs/setup/mac)からダウンロードします。
2. インストーラーを開き、VS Codeをアプリケーションフォルダへ入れて起動します。

この手順ではVS Codeのメニューからフォルダを開くため、`code` コマンドの設定は不要です。

## 3. 自分の研究用リポジトリを作る〈初回のみ〉

方法A・Cで使う手順です。ZIPで試す方法Bでは、[手順4B](#4b-zipで取得する)へ進んでください。

「リポジトリ」は、プログラムと変更履歴を保管する場所です。共通ひな形から、自分の研究用の保管場所を作ります。

1. ブラウザでGitHubにログインします。
2. [森本研究室 システム開発スターター](https://github.com/naoya424/morimoto-lab-starter)を開きます。
3. **Use this template → Create a new repository** を選びます。
4. 次のように入力・選択します。

| 項目 | 設定例 |
| --- | --- |
| Owner | 自分のGitHubアカウント |
| Repository name | `my-research`（英数字とハイフンを使うと扱いやすい） |
| Description | 自分の研究システムの簡単な説明 |
| 公開範囲 | **Private** |
| Include all branches | 選択しない |

5. **Create repository** または **Create repository from template** を押します。
6. 作成後のURLが `https://github.com/自分のユーザー名/my-research` になり、**Private** と表示されていることを確認します。

共通Starterと手順書は公開されており、閲覧に招待やGitHubへのログインは不要です。「Use this template」から自分の研究用リポジトリを作るときは、自分のGitHubアカウントでログインします。

自分のPrivateリポジトリを指導教員や共同開発者と共有する場合は、その研究用リポジトリへ必要なメンバーを招待します。

参考：[GitHub公式・テンプレートからの作成](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)

## 4. Macにプロジェクトを取得する〈初回のみ〉

コマンドを入力する場合は、Command + Spaceで「ターミナル」を検索して開きます。

A・B・Cのいずれか1つを選びます。取得先にすでに研究用フォルダがある場合は上書きせず、別名を使って以降のパスも読み替えてください。

### 4A. GitHub Desktopで取得する

GitHubの内容をPCへ取得する操作を「Clone（クローン）」と呼びます。

1. Finderの **移動 → ホーム** を開きます。
2. ホームフォルダに `Projects` フォルダを作ります。すでにある場合はそのまま使います。
3. GitHub Desktopで **File → Clone Repository** を選びます。
4. **GitHub.com** タブで、手順3で作った **自分のアカウントの `my-research`** を選びます。一覧に出なければ、**URL** タブへ自分のリポジトリURLを入力します。
5. **Local Path** を指定し、最終的な保存先が次の形になることを確認します。

```text
/Users/自分のMacユーザー名/Projects/my-research
```

6. **Clone** を押します。
7. 取得が終わったら、Finderでそのフォルダを開き、`frontend`・`backend`・`compose.yaml`・`README.md` があることを確認します。

`~/Projects/my-research` は上記と同じ場所を表します。`~` は自分のホームフォルダです。iCloud Drive内やMAMPの `htdocs` 配下に置く必要はありません。

すでに同じ名前のフォルダがある場合は、内容を確認してください。既存の研究ファイルに重ねず、新しく作る場合は別の名前を使います。

参考：[GitHub Desktopでクローンする](https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop)

### 4B. ZIPで取得する

GitHub Desktop・Git・GitHub CLIを入れず、公開中のひな形を取得する方法です。ファイルは編集できますが、変更履歴の管理やGitHubへの送信はまだ設定されません。

1. ブラウザで [共通Starter](https://github.com/naoya424/morimoto-lab-starter)を開きます。ログインは不要です。
2. ファイル一覧の上の **Code → Download ZIP** を選びます。
3. FinderのダウンロードフォルダでZIPをダブルクリックして展開します。すでに自動で展開されていれば、そのフォルダを使います。
4. 展開した中から、`compose.yaml`・`frontend`・`backend` が直接入っているフォルダ（通常は `morimoto-lab-starter-main`）を見つけ、**最初の起動前に** `my-research` へ名前を変えます。
5. Finderの **移動 → ホーム** に `Projects` フォルダを作り、名前を変えた `my-research` をその中へ移動します。
6. 最終的に `~/Projects/my-research` の直下に `compose.yaml` があることを確認します。展開時に同じ名前のフォルダが二重になっていたら、内側のプロジェクトフォルダを使います。
7. 次を実行し、`.env.example` も含まれていることを確認します。

```bash
cd ~/Projects/my-research
ls -a
```

続いて、[手順5：設定ファイルを準備する](#5-設定ファイルを準備する初回のみ)へ進みます。Docker Desktopの導入・起動は、この方法でも必要です。

ZIPにはGitの管理情報（`.git`）が入っていません。そのため、ZIP版のフォルダで `git pull`・`git push` は使えません。また、更新版のZIPを自分の編集済みフォルダへそのまま重ねないでください。継続してGitHubへ保存する場合は、方法Cへ切り替えます。移行方法は手順8の「ZIPで取得した場合」を参照してください。

参考：[GitHub公式・ZIPのダウンロード](https://docs.github.com/en/repositories/working-with-files/using-files/downloading-source-code-archives)

### 4C. Gitコマンドで取得する

GitHub Desktopを使わず、Macのターミナルで操作する方法です。先に手順3で、自分の非公開リポジトリを作っておきます。

**GitとGitHub CLIを準備する**

ターミナルで `git --version` と `gh --version` を実行します。両方のバージョンが表示される場合は、インストール済みです。

未導入の場合、ここではMac用のアプリ管理ツールHomebrewを使う方法を示します。

1. `brew --version` でHomebrewが使えるか確認します。
2. 未導入なら、[Homebrew公式サイト](https://brew.sh/)のインストール手順に従います。最後に表示される **Next steps** の設定も行い、ターミナルを開き直します。
3. 次を実行してGitとGitHub CLIを入れます。

```bash
brew install git gh
git --version
gh --version
```

GitHub CLIは、ここではブラウザ経由でGitHubへログインするために使います。GitHub Desktopとは別のコマンド用ツールです。すでにGitで自分の非公開リポジトリを読み書きできる場合は、その認証方法を使って構いません。

別の導入方法は [Git公式のMac向け案内](https://git-scm.com/install/mac)・[GitHub CLI公式の導入案内](https://github.com/cli/cli#installation)にあります。

**GitHubへログインする〈初回のみ〉**

以下はGitHub CLIを使う場合の手順です。既存のGit認証が設定済みなら、この項目は省略できます。

```bash
gh auth login --hostname github.com --git-protocol https --web
```

表示されるコードと案内に従い、ブラウザで自分のGitHubアカウントへログインします。端末にGitの認証設定を尋ねる質問が出た場合は **Yes** を選びます。ブラウザでの操作を終えたら、元のターミナルへ戻ります。

次を実行し、Gitも同じログイン情報を利用できるようにします。

```bash
gh auth setup-git --hostname github.com
gh auth status
```

`github.com` に自分のアカウントでログイン済みと表示されれば準備完了です。通常のGitHubパスワードを `git clone` のパスワード欄に入力する方法ではありません。

参考：[GitHub CLIのログイン](https://cli.github.com/manual/gh_auth_login)・[Gitとの認証連携](https://cli.github.com/manual/gh_auth_setup-git)

**自分のリポジトリを取得する**

次の `YOUR-USERNAME` は自分のGitHubユーザー名へ置き換えます。研究用リポジトリを別の名前で作った場合は、URLと保存先の `my-research` も変えます。取得先の同名フォルダが存在しないことを確認してください。

```bash
mkdir -p ~/Projects
cd ~/Projects
git clone "https://github.com/YOUR-USERNAME/my-research.git" my-research
cd my-research
git remote -v
```

表示された `origin` が **自分のユーザー名と研究用リポジトリ** を指していることを確認します。共通Starterの `naoya424/morimoto-lab-starter` を送信先にしないよう、自分用を取得してください。

**変更履歴に使う名前・メールを設定する〈このプロジェクトで初回のみ〉**

次の引用符の中は、そのまま使わず自分の情報へ置き換えます。メールアドレスを公開したくない場合は、GitHubの **Settings → Emails** で表示される自分用の `noreply` アドレスを使えます。

```bash
git config user.name "自分の名前"
git config user.email "自分のコミット用メールアドレス"
```

これらは今いる研究用リポジトリだけに設定されます。Gitの名前・メール設定は変更履歴の作成者情報で、GitHubへのログインとは別です。

ここまでできたら、[手順5：設定ファイルを準備する](#5-設定ファイルを準備する初回のみ)へ進みます。取得方法が違っても、`.env` の準備とDockerでの起動方法は同じです。

参考：[GitHub公式・Gitの初期設定](https://docs.github.com/en/get-started/git-basics/set-up-git)・[コマンドでのクローン](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

## 5. 設定ファイルを準備する〈初回のみ〉

### 5-1. ターミナルでプロジェクトの場所へ移動する

**Command + Space** でSpotlightを開き、「ターミナル」と入力して起動します。
以下の枠内を1行ずつ入力し、各行でReturnキーを押します。枠の外の説明文は入力しません。

```bash
cd ~/Projects/my-research
ls
```

`ls` は現在のフォルダの中身を表示します。`compose.yaml`・`frontend`・`backend` が表示されれば正しい場所です。以降の `docker compose` コマンドは、すべてこの場所で実行します。

### 5-2. `.env` を作る

次のコマンドで、設定の見本 `.env.example` を自分用の `.env` にコピーします。

```bash
cp -n .env.example .env
ls -a
```

`cp -n` は、すでに `.env` があるときは上書きしません。`ls -a` の結果に `.env` があれば準備完了です。Finderでは、先頭が「.」のファイルは通常非表示です。

最初の設定は次の3項目です。通常は変更せず使えます。

```dotenv
FRONTEND_PORT=3000
BACKEND_PORT=8000
MONGODB_DATABASE=lab_starter
```

| 項目 | 意味 |
| --- | --- |
| FRONTEND_PORT | ブラウザで画面を開くときの番号 |
| BACKEND_PORT | APIに直接接続するときの番号 |
| MONGODB_DATABASE | このプロジェクトで使うデータベース名 |

### 5-3. Dockerが使えるか確認する

Docker Desktopを起動した状態で、次を実行します。

```bash
docker --version
docker compose version
docker info --format '{{.OSType}}'
```

前の2行はバージョンが表示され、最後の行は **`linux`** と表示されれば準備完了です。エラーになる場合は、後半の「困ったとき」を確認してください。

## 6. 起動してメモを保存する

### 6-1. 起動する

同じターミナルで実行します。

```bash
docker compose up --build
```

初回は必要なファイルをダウンロードして、画面・API・データベースの実行環境を作ります。回線やPCによっては時間がかかります。

起動後もログ（動作状況の文字列）が表示され続け、コマンドを入力する状態に戻らないのが正常です。**このターミナルは開いたままにします。**

### 6-2. ブラウザで確認する

1. SafariやChromeで [http://localhost:3000](http://localhost:3000) を開きます。
2. **「森本研究室 システム開発スターター」** と表示されることを確認します。
3. **「API・データベース接続済み」** になるまで待ちます。
4. 「メモの内容」に `Macからの動作確認です` と入力し、**保存する** を押します。
5. 「メモを保存しました。」と表示され、一覧にメモが追加されることを確認します。
6. ブラウザで **Command + R** を押してページを再読み込みし、メモが残っていることを確認します。

ここまでできれば、画面 → API → データベースの一連の動作を確認できています。

| 確認するもの | URL・正常時の表示 |
| --- | --- |
| サンプル画面 | [http://localhost:3000](http://localhost:3000) |
| 接続確認 | [http://localhost:3000/api/health](http://localhost:3000/api/health) に `{"status":"ok","database":"connected"}` |
| APIの仕様・試行画面 | [http://localhost:3000/api/docs](http://localhost:3000/api/docs) |

`localhost` は「今使っている自分のPC」を指します。このURLを他の人へ送っても、自分の画面を共有することにはなりません。

起動状態を調べたい場合は、ターミナルで **Command + T** などを使って別タブを開き、次を実行します。

```bash
cd ~/Projects/my-research
docker compose ps
```

`frontend`・`backend`・`mongodb` の3サービスが起動しているか確認します。起動途中は `health: starting`、準備が整うと `healthy` と表示されます。

## 7. 画面を1か所編集してみる

1. VS Codeの **File → Open Folder（ファイル → フォルダーを開く）** を選びます。
2. `Projects/my-research` を開きます。`frontend` だけでなく、`compose.yaml` が入ったフォルダ全体を開きます。
3. 左のファイル一覧で **frontend → src → app → page.tsx** を開きます。
4. 次の行を探します。

```tsx
<h1>森本研究室 システム開発スターター</h1>
```

5. `<h1>` と `</h1>` の間の文字だけを、例えば次のように変えます。

```tsx
<h1>私の研究システム</h1>
```

6. **Command + S** で保存します。
7. 起動中の画面に変更が反映されたか確認します。変わらなければブラウザを再読み込みします。

`frontend/src` と `backend/app` は編集した内容がコンテナへ共有され、通常は自動で再読み込みされます。設定や依存パッケージを変更した場合の再起動方法は「困ったとき」を参照してください。

## 8. 変更を自分のGitHubへ保存する

VS Codeの保存はMac上のファイルの保存です。GitHubに残すには、次の操作も行います。

### GitHub Desktopで取得した場合（方法A）

1. GitHub Desktopを開き、**Current Repository** が自分の `my-research`、**Current Branch** が `main` であることを確認します。
2. **Changes** で `frontend/src/app/page.tsx` の変更を選び、意図した編集だけが含まれているか確認します。
3. 左下の **Summary** に `画面の見出しを変更` と入力します。
4. **Commit to main** を押します。ここでMac上に変更履歴が記録されます。
5. 上部の **Push origin** を押します。ここでGitHubへ送信されます。
6. ブラウザで自分のリポジトリを開き、更新内容が反映されたことを確認します。

### Gitコマンドで取得した場合（方法C）

起動ログを表示している画面とは別に、ターミナルのタブを開きます。次は、前の手順で見出しを編集した `page.tsx` を保存する例です。

```bash
cd ~/Projects/my-research
git status
git diff
```

変更内容を確認します。表示が長くなって操作できない場合は `q` で戻ります。保存対象を選び、もう一度内容を確認します。

```bash
git add frontend/src/app/page.tsx
git diff --cached
```

意図した変更だけが含まれていたら、変更履歴を記録してGitHubへ送ります。

```bash
git commit -m "画面の見出しを変更"
git push origin main
```

`commit` はPC上への履歴の保存、`push` はGitHubへの送信です。ブラウザで自分のリポジトリを開き、変更が反映されたことを確認します。別のファイルを編集した場合は、`git add` の後ろを保存したいファイルのパスへ変えます。

### ZIPで取得した場合（方法B）

VS Codeで保存すればPC上のファイルは更新されます。この時点ではGitHubへ送信されないため、GitHubへの保存手順は飛ばして構いません。

後からGitHubへ保存したくなった場合は、自分用リポジトリを作り、方法Cで**既存のZIP版と別の名前のフォルダ**へクローンします。その後、ZIP版で編集したソースファイルだけを新しいフォルダへコピーし、方法Cの保存手順を行います。`.env` とMongoDBのデータはGitHubには移らず、データの移行は別作業です。ZIP版の元フォルダは、必要な内容を確認するまで残してください。

**GitHubに保存されるのはプログラムとその変更履歴です。** `.env` とMongoDB内のメモは保存されません。実際の研究データのバックアップは、開発用プログラムの保存とは別に準備します。

参考：[GitHub Desktopで変更を記録・送信する](https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop)

## 9. 終了するとき・次の日に再開するとき

### 終了する

1. 起動ログが流れているターミナルで **Control + C** を押します。MacでもここはCommandではなくControlです。
2. 停止が終わって入力できる状態に戻ったら、次を実行します。

```bash
docker compose down
```

3. 停止処理が終わったら、ターミナルを閉じて構いません。Dockerをほかの作業で使っていなければ、Docker Desktopも終了できます。

保存したメモは、Dockerの専用保存領域（ボリューム）に残ります。**`docker compose down -v` はメモの保存領域も削除するため、通常の終了では使いません。**

### 次の日に再開する

1. Docker Desktopを起動し、準備が終わるまで待ちます。
2. ターミナルを開き、次を実行します。

```bash
cd ~/Projects/my-research
docker compose up
```

3. [http://localhost:3000](http://localhost:3000) を開きます。前日に保存したメモが残っていることも確認します。
4. VS Codeで同じフォルダを開いて作業を続けます。

他のPCでも同じリポジトリを編集した場合は、作業開始前に更新を取り込みます。

- **方法A**：GitHub Desktopの **Fetch origin** を押し、**Pull origin** が表示されたら取り込みます。
- **方法B**：ZIP版はGitHubと同期されません。同じフォルダで作業を再開でき、ZIPを毎回取り直す必要はありません。
- **方法C**：プロジェクトのフォルダで `git status` を実行し、自分の変更が残っていないことを確認してから `git pull --ff-only` を実行します。

自分の変更が残っている、または取り込み時に競合・エラーが出た場合は、変更を破棄せず管理者へ相談してください。GitHubから更新した内容に依存パッケージや設定の変更が含まれる場合は、`docker compose up --build` で起動します。

共通Starterの変更点は [更新履歴](../CHANGELOG.md)で確認できます。テンプレートから作った自分のリポジトリには、共通Starterの更新は自動では入りません。`git pull` が取り込むのは、自分のリポジトリに保存された変更です。

## 10. 困ったとき

| 状況・表示 | 確認・対処 |
| --- | --- |
| Starterが404になる | 本書のStarterリンクから開き直し、URLが正しいか確認します。公開されている共通Starterの閲覧に招待は不要です。 |
| `cd` で `no such file or directory` | 保存先やフォルダ名が例と異なっています。GitHub Desktopの **Repository → Show in Finder** で実際の場所を確認します。 |
| `command not found: docker` | Docker Desktopのインストールを終え、ターミナルを開き直します。続く場合はDocker DesktopのCLI設定と公式インストール手順を確認します。 |
| `Cannot connect to the Docker daemon` | Docker Desktopを起動し、エンジンの準備が終わるまで待ちます。 |
| `no configuration file provided` | 現在の場所が違います。`cd ~/Projects/my-research` で移動し、`ls` で `compose.yaml` を確認します。 |
| `port is already allocated` / `address already in use` | `.env` の `FRONTEND_PORT=3001`・`BACKEND_PORT=8001` などに変更して保存します。起動を止めて `docker compose up --build` で再開し、画面は `http://localhost:3001` を開きます。 |
| 画面が開かない／「未接続」のまま | 下記の状態・ログ確認を行います。初回は準備に時間がかかるため、3サービスが起動したか確認します。 |
| 画面の変更が反映されない | ファイルを保存したか、起動したプロジェクトと編集しているフォルダが同じかを確認します。別タブから `docker compose restart frontend backend` を実行し、ブラウザを再読み込みします。 |
| 設定・依存パッケージを変更した | `package.json`・`package-lock.json`・`requirements.txt`・Dockerfile・`next.config.mjs` などの変更後は、Control + Cで止めて `docker compose up --build` を実行します。 |
| 空き容量不足でダウンロード・ビルドが止まる | Macのストレージを確認し、不要と判断できるファイルを整理してから再実行します。Dockerのボリュームにはデータがあるため、一括削除はしません。 |
| GitHubへ送信できない | 方法AではGitHub Desktopのログイン先と選択中のリポジトリを確認します。方法CでGitHub CLIを使っている場合は `gh auth status` と `git remote -v` を確認します。送信先は自分が作った研究用リポジトリです。 |
| `git` / `gh` が見つからない | 方法Cの導入を終え、ターミナルを開き直してバージョンを確認します。ZIPで試す方法Bでは、これらのコマンドは不要です。 |
| `not a git repository` | 方法BのZIP版にはGitの管理情報がありません。方法Cの場合は、クローンしたプロジェクトのフォルダにいるか確認します。 |
| `destination path ... already exists` | 同名のフォルダがすでにあります。既存の研究ファイルを削除・上書きせず、新しく取得する場合は別のフォルダ名を使います。 |
| `git push` が拒否される／`git pull --ff-only` が止まる | ログイン先・送信先・自分の変更を確認します。他の変更との調整が必要な場合は、強制送信や変更の破棄をせず管理者へ相談します。 |
| フォルダ名や保存先を変えた後にメモが見えない | Composeが別のプロジェクトとして起動している可能性があります。元のフォルダ名・起動方法を確認し、データを削除せず管理者へ相談します。 |

状態・ログは、別のターミナルタブでプロジェクトのフォルダへ移動して確認します。

```bash
cd ~/Projects/my-research
docker compose ps
docker compose logs --tail=50 frontend backend mongodb
```

相談するときは、「どの手順で」「何を入力したら」「何と表示されたか」を伝えると確認しやすくなります。

## この手順の確認状況

2026年10月8日時点の公式資料と、このリポジトリの設定に合わせて作成しました。
Mac上で画面・API・MongoDBの動作を個別に確認し、Compose設定の検証も実施しています。**Docker Desktopによる一括ビルド・起動は実機未確認**です。詳細は [READMEの動作確認状況](../README.md#動作確認状況) を参照してください。
