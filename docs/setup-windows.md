# Windows用：森本研究室 システム開発スターター 利用手順

初めて使う方が、準備から起動、画面の編集、GitHubへの保存まで進めるための手順です。
初回は1〜9、次回からは10を使ってください。

**Windows 11のIntel／AMD搭載PCで、Docker DesktopのWSL 2機能を使う**流れを説明します。日常の操作はWindowsの **PowerShell** で行い、Ubuntuのターミナルを開く必要はありません。

自分の研究用プロジェクト名は **`my-research`** を例にします。別の名前にした場合は、以降のパスにある `my-research` も読み替えてください。

[READMEへ戻る](../README.md) ／ [Mac用の手順](setup-mac.md)

## 1. 最初に確認すること

次のものを用意します。

| 用意するもの | 何に使うか |
| --- | --- |
| GitHubアカウント | 研究用のプログラムを保存する |
| Starterへのアクセス権 | 非公開の共通ひな形を開く |
| WSL 2 | Windows上でDockerのLinux環境を動かす土台 |
| Docker Desktop | 画面・API・データベースをまとめて動かす |
| GitHub Desktop | プログラムの取得とGitHubへの保存を画面操作で行う |
| Visual Studio Code（以下、VS Code） | プログラムや設定を編集する |

Node.js・Python・MongoDB・Gitのコマンドライン版を個別にインストールする必要はありません。この手順では、実行環境はDocker Desktop、Gitの操作はGitHub Desktopで扱います。XAMPPやMAMPも使いません。

### PCの状態を確認する

1. **設定 → システム → バージョン情報** を開き、WindowsのバージョンとPCの種類を確認します。
2. [Docker DesktopのWindows用公式ページ](https://docs.docker.com/desktop/setup/install/windows-install/)で、現在の対応OS・メモリ・仮想化などの要件を確認します。この手順ではメモリ8 GB以上を前提にします。
3. エクスプローラーの **PC** で、システムドライブの空き容量を確認します。

初回はインターネット接続と十分な空き容量が必要です。**作業用の余裕として20 GB程度以上の空きを推奨します。** これはこの手順の目安であり、公式の最低要件や実測使用量ではありません。残り数GBしかない場合は先に空き容量を確保してください。

Windows on Arm（Snapdragonなど）のPCは、この手順の対象とは構成が異なります。対応するDocker Desktopの提供状況を公式ページで確認し、管理者と環境を決めてください。

このひな形は自分のPCでの開発用です。最初の動作確認にはテスト用のメモを使います。認証は未実装なので、研究参加者のデータを扱う段階では、必要な認証・アクセス制御を追加します。

## 2. WSL 2を準備する〈初回のみ〉

WSLは、DockerがLinuxの環境を動かすために使うWindowsの機能です。
**WSLの導入・更新のときだけ管理者としてPowerShellを開きます。** プロジェクトの起動・編集は、後の手順で通常のPowerShellを使います。

### 2-1. 現在の状態を確認する

1. スタートメニューで「PowerShell」を検索します。
2. **管理者として実行** を選び、Windowsの確認画面に従います。大学管理のPCなどで管理者権限がない場合は、PCの管理者に導入を依頼してください。
3. 次を入力してEnterキーを押します。

```powershell
wsl --version
```

WSLのバージョンが表示された場合は、すでに導入されています。**2-3へ進みます。** 未インストールと表示される場合は、2-2へ進みます。

### 2-2. WSLを初めて入れる場合

同じ管理者PowerShellで実行します。

```powershell
wsl --install --no-distribution
```

処理が終わったら、作業中のファイルを保存してWindowsを再起動します。再起動の案内が出た場合は必ず従ってください。

`--no-distribution` は、Ubuntuなどの追加Linux環境をこの時点では入れない指定です。このスターターはWindowsのPowerShellから操作でき、Docker Desktopが必要な環境を用意するため、Ubuntuのアカウント作成は不要です。

### 2-3. WSLを更新する

再起動した場合はもう一度、管理者としてPowerShellを開いて実行します。

```powershell
wsl --update
wsl --version
```

Docker DesktopにはWSL **2.1.5以上** が必要で、最新への更新が推奨されています。表示の「WSL バージョン」を確認します。更新後に再起動を求められた場合は従います。

古いWSLで `--version` が認識されない場合も、まず `wsl --update` を試します。`wsl` 自体が認識されない、または導入が失敗する場合は、Windowsの対応状況と公式手順を確認してください。すでにあるLinux環境を削除する必要はありません。

準備が終わったら、管理者のPowerShellは閉じて構いません。

参考：[MicrosoftのWSL導入手順](https://learn.microsoft.com/ja-jp/windows/wsl/install) ／ [WSLコマンドの説明](https://learn.microsoft.com/en-us/windows/wsl/basic-commands) ／ [Docker DesktopとWSL](https://docs.docker.com/desktop/features/wsl/)

## 3. 必要なアプリを入れる〈初回のみ〉

すでに入っているアプリは、再インストールせず起動を確認してください。

### 3-1. Docker Desktop

1. [Docker DesktopのWindows用公式ページ](https://docs.docker.com/desktop/setup/install/windows-install/)から **Windows x86_64版** をダウンロードします。
2. インストーラーを開き、案内に沿ってインストールします。方式の選択がある場合はWSL 2を使います。
3. 再起動が必要と表示された場合は、作業中のファイルを保存して再起動します。
4. スタートメニューから **Docker Desktop** を起動し、初回の案内に従います。
5. 設定に **General → Use the WSL 2 based engine** が表示される場合は、有効であることを確認します。標準で有効になっている環境もあります。
6. Dockerのエンジンの起動処理が終わるまで待ちます。

このプロジェクトは **Linuxコンテナ** を使います。Windowsコンテナに切り替えて使っていたPCでは、Linuxコンテナへ戻してから進めます。

### 3-2. GitHub Desktop

1. [GitHub Desktop](https://desktop.github.com/)からWindows用をダウンロードします。
2. インストーラーを開いてインストールし、GitHub Desktopを起動します。
3. **Sign in to GitHub.com** から、自分のGitHubアカウントでログインします。ブラウザで認証した後、GitHub Desktopへ戻ります。
4. 名前・メールアドレスの設定が表示されたら、変更履歴に記録する情報を確認して進めます。

インストール画面が異なる場合は、[GitHub Desktopの公式手順](https://docs.github.com/en/desktop/installing-and-authenticating-to-github-desktop/installing-github-desktop)を参照してください。

### 3-3. VS Code

1. [VS CodeのWindows用公式ページ](https://code.visualstudio.com/docs/setup/windows)から、通常は **User Installer** を選んでダウンロードします。
2. インストーラーを開いてインストールし、VS Codeを起動します。

この手順ではVS Codeのメニューからフォルダを開くため、`code` コマンドの設定は不要です。

## 4. 自分の研究用リポジトリを作る〈初回のみ〉

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

Starterが「404」になる場合は、管理者からの招待を受け取り、承諾済みか確認してください。非公開のため、URLを知っているだけでは開けません。招待を受けたアカウントと、ログイン中のアカウントも確認します。

自分のPrivateリポジトリを指導教員や共同開発者と共有する場合は、そのリポジトリにも別途アクセス権を付与します。元のStarterのアクセス権は引き継がれません。

参考：[GitHub公式・テンプレートからの作成](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)

## 5. Windowsにプロジェクトを取得する〈初回のみ〉

GitHubの内容をPCへ取得する操作を「Clone（クローン）」と呼びます。

1. エクスプローラーの上部のアドレス欄に **`%USERPROFILE%`** と入力してEnterキーを押します。自分のユーザーフォルダが開きます。
2. その中に `Projects` フォルダを作ります。すでにある場合はそのまま使います。
3. GitHub Desktopで **File → Clone Repository** を選びます。
4. **GitHub.com** タブで、手順4で作った **自分のアカウントの `my-research`** を選びます。一覧に出なければ、**URL** タブへ自分のリポジトリURLを入力します。
5. **Local Path** を指定し、最終的な保存先が次の形になることを確認します。

```text
C:\Users\自分のWindowsユーザー名\Projects\my-research
```

6. **Clone** を押します。
7. 取得が終わったら、エクスプローラーでそのフォルダを開き、`frontend`・`backend`・`compose.yaml`・`README.md` があることを確認します。

この手順では、保存先をOneDrive内のデスクトップやドキュメントではなく、ユーザーフォルダ直下の `Projects` にそろえます。すでに同名のフォルダがある場合は内容を確認し、既存の研究ファイルに重ねず、新しく作る場合は別の名前を使います。

参考：[GitHub Desktopでクローンする](https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop)

## 6. 設定ファイルを準備する〈初回のみ〉

### 6-1. 通常のPowerShellでプロジェクトの場所へ移動する

スタートメニューで「PowerShell」を検索し、**通常の方法で開きます。管理者として実行する必要はありません。** Windows Terminalを使う場合は、タブが「PowerShell」になっていることを確認してください。

次の枠内を1行ずつ入力し、各行でEnterキーを押します。コマンドプロンプトやUbuntuの画面ではなく、PowerShellに入力します。

```powershell
Set-Location "$env:USERPROFILE\Projects\my-research"
Get-ChildItem
```

`$env:USERPROFILE` は自分のユーザーフォルダを表すため、そのまま入力できます。`Get-ChildItem` の結果に `compose.yaml`・`frontend`・`backend` があれば、正しい場所です。

以降の `docker compose` コマンドは、すべてこの場所で実行します。

### 6-2. `.env` を作る

次の1行をそのまま実行します。

```powershell
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
```

設定の見本 `.env.example` を自分用の `.env` にコピーします。すでに `.env` がある場合は上書きしません。何も表示されなくても正常です。

続けて次を実行し、一覧に `.env` があることを確認します。

```powershell
Get-ChildItem -Force
```

この方法なら、誤って `.env.txt` という名前で作ってしまうことを避けられます。

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

### 6-3. Dockerが使えるか確認する

Docker Desktopを起動した状態で、次を実行します。

```powershell
docker --version
docker compose version
docker info --format '{{.OSType}}'
```

前の2行はバージョンが表示され、最後の行は **`linux`** と表示されれば準備完了です。`windows` と表示された場合は、Docker DesktopをLinuxコンテナのモードに切り替えます。

## 7. 起動してメモを保存する

### 7-1. 起動する

同じPowerShellで実行します。

```powershell
docker compose up --build
```

初回は必要なファイルをダウンロードして、画面・API・データベースの実行環境を作ります。回線やPCによっては時間がかかります。

起動後もログ（動作状況の文字列）が表示され続け、コマンドを入力する状態に戻らないのが正常です。**このPowerShellは開いたままにします。**

### 7-2. ブラウザで確認する

1. EdgeやChromeで [http://localhost:3000](http://localhost:3000) を開きます。
2. **「森本研究室 システム開発スターター」** と表示されることを確認します。
3. **「API・データベース接続済み」** になるまで待ちます。
4. 「メモの内容」に `Windowsからの動作確認です` と入力し、**保存する** を押します。
5. 「メモを保存しました。」と表示され、一覧にメモが追加されることを確認します。
6. ブラウザで **Ctrl + R** を押してページを再読み込みし、メモが残っていることを確認します。

ここまでできれば、画面 → API → データベースの一連の動作を確認できています。

| 確認するもの | URL・正常時の表示 |
| --- | --- |
| サンプル画面 | [http://localhost:3000](http://localhost:3000) |
| 接続確認 | [http://localhost:3000/api/health](http://localhost:3000/api/health) に `{"status":"ok","database":"connected"}` |
| APIの仕様・試行画面 | [http://localhost:3000/api/docs](http://localhost:3000/api/docs) |

`localhost` は「今使っている自分のPC」を指します。このURLを他の人へ送っても、自分の画面を共有することにはなりません。

起動状態を調べたい場合は、**別のPowerShellウインドウまたはタブ** を開いて次を実行します。

```powershell
Set-Location "$env:USERPROFILE\Projects\my-research"
docker compose ps
```

`frontend`・`backend`・`mongodb` の3サービスが起動しているか確認します。起動途中は `health: starting`、準備が整うと `healthy` と表示されます。

## 8. 画面を1か所編集してみる

1. VS Codeの **File → Open Folder（ファイル → フォルダーを開く）** を選びます。
2. ユーザーフォルダの `Projects\my-research` を開きます。`frontend` だけでなく、`compose.yaml` が入ったフォルダ全体を開きます。
3. 左のファイル一覧で **frontend → src → app → page.tsx** を開きます。
4. 次の行を探します。

```tsx
<h1>森本研究室 システム開発スターター</h1>
```

5. `<h1>` と `</h1>` の間の文字だけを、例えば次のように変えます。

```tsx
<h1>私の研究システム</h1>
```

6. **Ctrl + S** で保存し、ブラウザを再読み込みします。
7. 見出しが変わったことを確認します。

Windows側のフォルダでは、ファイルの変更が自動で検知されない場合があります。保存しても変わらなければ、別のPowerShellで次を実行し、準備が終わってからブラウザを再読み込みしてください。

```powershell
Set-Location "$env:USERPROFILE\Projects\my-research"
docker compose restart frontend backend
```

この手順はWindows側のファイルを直接扱う構成です。編集時の反応速度や自動更新を改善したい場合は、将来的にソースをWSLのLinux側へ置く構成も選べます。移行すると保存先と操作方法が変わるため、最初はこの手順にそろえて動作を確認します。参考：[Docker公式・WSLでのファイル配置と変更検知](https://docs.docker.com/desktop/features/wsl/best-practices/)

## 9. 変更を自分のGitHubへ保存する

VS Codeの保存はWindows上のファイルの保存です。GitHubに残すには、次の操作も行います。

1. GitHub Desktopを開き、**Current Repository** が自分の `my-research`、**Current Branch** が `main` であることを確認します。
2. **Changes** で `frontend/src/app/page.tsx` の変更を選び、意図した編集だけが含まれているか確認します。
3. 左下の **Summary** に `画面の見出しを変更` と入力します。
4. **Commit to main** を押します。ここでPC上に変更履歴が記録されます。
5. 上部の **Push origin** を押します。ここでGitHubへ送信されます。
6. ブラウザで自分のリポジトリを開き、更新内容が反映されたことを確認します。

**GitHubに保存されるのはプログラムとその変更履歴です。** `.env` とMongoDB内のメモは保存されません。実際の研究データのバックアップは、開発用プログラムの保存とは別に準備します。

参考：[GitHub Desktopで変更を記録・送信する](https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop)

## 10. 終了するとき・次の日に再開するとき

### 終了する

1. 起動ログが流れているPowerShellで **Ctrl + C** を押します。
2. 停止が終わって入力できる状態に戻ったら、次を実行します。

```powershell
docker compose down
```

3. 停止処理が終わったら、PowerShellを閉じて構いません。Dockerをほかの作業で使っていなければ、Docker Desktopも終了できます。

保存したメモは、Dockerの専用保存領域（ボリューム）に残ります。**`docker compose down -v` はメモの保存領域も削除するため、通常の終了では使いません。**

### 次の日に再開する

1. Docker Desktopを起動し、準備が終わるまで待ちます。
2. 通常のPowerShellを開き、次を実行します。

```powershell
Set-Location "$env:USERPROFILE\Projects\my-research"
docker compose up
```

3. [http://localhost:3000](http://localhost:3000) を開きます。前日に保存したメモが残っていることも確認します。
4. VS Codeで同じフォルダを開いて作業を続けます。

他のPCでも同じリポジトリを編集した場合は、作業開始前にGitHub Desktopの **Fetch origin** を押し、**Pull origin** が表示されたら取り込みます。すでに未保存の変更があり競合の案内が出た場合は、変更を破棄せず管理者へ相談してください。

## 11. 困ったとき

| 状況・表示 | 確認・対処 |
| --- | --- |
| Starterが404になる | 招待を承諾したか、そのGitHubアカウントでログインしているかを確認します。 |
| WSLの更新を求められる | 管理者のPowerShellで `wsl --update` を実行し、再起動の案内があれば従います。 |
| 仮想化が無効というエラー | タスクマネージャーの **パフォーマンス → CPU** で「仮想化」を確認します。無効ならPCの管理者やメーカーの手順に沿って有効化します。設定場所は機種で異なります。 |
| `Set-Location` でパスが存在しないと言われる | GitHub Desktopの **Repository → Show in Explorer** で実際の保存先を確認します。例と異なる名前なら、そのパスへ移動します。 |
| `docker` が認識されない | Docker Desktopのインストールを終え、PowerShellを開き直します。コマンドプロンプトやUbuntuの画面を使っていないかも確認します。 |
| `Cannot connect`／Dockerのエンジンに接続できない | Docker Desktopを起動し、エンジンの準備が終わるまで待ちます。WSL更新の警告が出ていないかも確認します。 |
| Linuxイメージを実行できない／OSが合わない | `docker info --format '{{.OSType}}'` が `linux` か確認します。`windows` ならDocker DesktopをLinuxコンテナへ切り替えます。 |
| `no configuration file provided` | 現在の場所が違います。プロジェクトのフォルダへ移動し、`Get-ChildItem` で `compose.yaml` を確認します。 |
| `.env` がない／`.env.txt` になっている | 手順6-2のコピーを実行します。エクスプローラーで作り直すより、PowerShellのコピーを使うと名前をそろえられます。 |
| `port is already allocated` / `address already in use` | `.env` の `FRONTEND_PORT=3001`・`BACKEND_PORT=8001` などに変更して保存します。起動を止めて `docker compose up --build` で再開し、画面は `http://localhost:3001` を開きます。 |
| 画面が開かない／「未接続」のまま | 下記の状態・ログ確認を行います。初回は準備に時間がかかるため、3サービスが起動したか確認します。 |
| 画面の変更が反映されない | ファイルを保存したか、編集と起動が同じフォルダかを確認します。手順8の `docker compose restart frontend backend` を実行して再読み込みします。 |
| 設定・依存パッケージを変更した | `package.json`・`package-lock.json`・`requirements.txt`・Dockerfile・`next.config.mjs` などの変更後は、Ctrl + Cで止めて `docker compose up --build` を実行します。 |
| 空き容量不足でダウンロード・ビルドが止まる | Windowsのストレージを確認し、不要と判断できるファイルを整理してから再実行します。Dockerのボリュームにはデータがあるため、一括削除はしません。 |
| GitHubへ送信できない | GitHub Desktopのログイン先と選択中のリポジトリを確認します。送信先は自分が作った研究用リポジトリです。 |
| フォルダ名や保存先を変えた後にメモが見えない | Composeが別のプロジェクトとして起動している可能性があります。元のフォルダ名・起動方法を確認し、データを削除せず管理者へ相談します。 |

状態・ログは、別のPowerShellでプロジェクトのフォルダへ移動して確認します。

```powershell
Set-Location "$env:USERPROFILE\Projects\my-research"
docker compose ps
docker compose logs --tail=50 frontend backend mongodb
```

相談するときは、「どの手順で」「何を入力したら」「何と表示されたか」を伝えると確認しやすくなります。

## この手順の確認状況

2026年10月8日時点のMicrosoft・Docker・GitHub・VS Codeの公式資料と、このリポジトリの設定に合わせて作成しました。
**Windows実機での起動は未確認**です。Compose設定の検証と、Mac上での画面・API・MongoDBの個別動作確認は実施しています。詳細は [READMEの動作確認状況](../README.md#動作確認状況) を参照してください。
