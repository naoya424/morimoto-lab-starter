# AI連携を追加する場合（OpenAI APIの例）

**最終更新日時：2026-10-08 21:00（日本時間／JST）**

**更新者：中沢尚也**

[READMEへ戻る](../README.md#ai連携を追加する場合) ／ [Mac用の手順](setup-mac.md) ／ [Windows用の手順](setup-windows.md) ／ [更新履歴](../CHANGELOG.md)

研究室のシステムではAI連携も利用する想定です。まずOpenAI APIを例に、各自の研究用プロジェクトへ追加する方法を説明します。別のAIサービスを使う場合は、末尾の「他社のAI APIに変更する場合」を参照してください。

**これは追加実装の手順書です。現在のStarterには、AI用の画面・API・ライブラリはまだ組み込まれていません。** 以下の編集を各自のプロジェクトに行うことで、短い文章を送り、AIの回答を1回受け取るAPIを追加します。基本のメモ保存が動くことを確認してから進めてください。

## 1. どこにAIをつなぐか

**ブラウザ → Next.js → FastAPI → OpenAI API → 同じ経路で画面に回答**という流れです。

- 画面：入力をFastAPIの `/api/ai/reply` に送る。
- FastAPI：APIキーを使ってOpenAIへ接続し、回答を画面へ返す。
- MongoDB：記録を残す研究では、入力・回答・モデル名・日時などを別途保存する。下の最小例はMongoDBへ保存しません。

AIはインターネット上の外部サービスです。AIへ送る文章はPCの外へ送信されます。画面にAPIキーを持たせず、FastAPIだけが読む設定にします。[OpenAI公式：APIの認証](https://developers.openai.com/api/reference/overview#authentication)

## 2. APIキーとモデルを準備する

1. [OpenAIの開発者向け管理画面](https://platform.openai.com/)で、研究用のプロジェクト・APIキーを用意します。
2. 管理者と、費用を負担するプロジェクト・利用できるモデル・利用量の管理方法を確認します。APIの料金はモデルや入出力量で変わるため、[公式の料金表](https://developers.openai.com/api/docs/pricing)を確認してください。
3. [モデル一覧](https://developers.openai.com/api/docs/models)と自分のプロジェクトの利用権限を確認し、**Responses APIでテキストを生成できるモデルのID**を選びます。モデルIDは後から設定で変更できます。

キーの文字列は、自分のPC上の `.env` に入力します。GitHub、README、チャット、画面のプログラムには貼り付けません。既存の `.gitignore` は `.env` をGitの保存対象から除外しています。

## 3. 設定を追加する〈Mac・Windows共通〉

VS Codeで、自分のプロジェクトのファイルを編集します。Macはターミナル、WindowsはPowerShellで、`compose.yaml` があるフォルダを開いて作業します。

### 3-1. `.env` に2項目を追記する

既存のポート番号・MongoDBの設定は残し、末尾に次を追加します。

```dotenv
OPENAI_API_KEY=ここを自分のAPIキーに置き換える
OPENAI_MODEL=ここを利用するモデルIDに置き換える
```

上の日本語は説明用です。実際の値に置き換えて保存してください。各自の `.env.example` にも項目を追加しておくと引き継ぎやすくなりますが、そちらの値は空欄にします。

```dotenv
# AI連携を追加した場合だけ設定する
OPENAI_API_KEY=
OPENAI_MODEL=
```

### 3-2. `compose.yaml` のbackendへ設定を渡す

`services` → `backend` → `environment` の既存の2項目の下に、OpenAI用の2項目を追加します。**下は変更する部分だけです。ファイル全体を置き換えたり、`environment` を重複させたりしないでください。**

```yaml
services:
  backend:
    environment:
      MONGODB_URI: mongodb://mongodb:27017
      MONGODB_DATABASE: ${MONGODB_DATABASE:-lab_starter}
      OPENAI_API_KEY: ${OPENAI_API_KEY:-}
      OPENAI_MODEL: ${OPENAI_MODEL:-}
```

`.env` に書くだけでは、Pythonが動くコンテナには自動で渡りません。この設定でbackendへ渡します。frontendには追加せず、`NEXT_PUBLIC_OPENAI_API_KEY` などのブラウザ向け設定も作りません。[Docker公式：コンテナへ環境変数を渡す](https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/)

### 3-3. Python用のライブラリを追加する

`backend/requirements.txt` の既存の行は残し、次の1行を末尾に追加します。

```text
openai
```

後の再ビルドでコンテナにインストールされます。PCへPythonを追加インストールする必要はありません。連携を確認できたら、`docker compose exec backend pip show openai` の `Version` を確認し、`openai==確認したバージョン番号` に直して、研究で使う版を固定します。

## 4. AIを呼び出す処理を追加する

`backend/app/ai.py` を新しく作り、次を保存します。OpenAI固有の接続処理をこのファイルにまとめます。公式Python SDKの非同期クライアントとResponses APIを使います。[公式GitHub：openai/openai-python](https://github.com/openai/openai-python#async-usage)

```python
import os

from fastapi import HTTPException
from openai import APIError, APITimeoutError, AsyncOpenAI, RateLimitError


async def generate_reply(text: str) -> str:
    api_key = os.getenv("OPENAI_API_KEY", "").strip()
    model = os.getenv("OPENAI_MODEL", "").strip()
    if not api_key or not model:
        raise HTTPException(503, "AIのAPIキーとモデルを設定してください。")

    try:
        async with AsyncOpenAI(
            api_key=api_key, timeout=20.0, max_retries=0
        ) as client:
            response = await client.responses.create(
                model=model,
                instructions="日本語で簡潔に回答してください。",
                input=text,
                max_output_tokens=800,
                store=False,
            )
    except RateLimitError:
        raise HTTPException(429, "AIの利用上限・利用残高を確認してください。") from None
    except APITimeoutError:
        raise HTTPException(504, "AIの応答が時間内に届きませんでした。") from None
    except APIError:
        raise HTTPException(502, "AIとの接続に失敗しました。設定を確認してください。") from None

    if response.status != "completed" or not response.output_text.strip():
        raise HTTPException(502, "AIから回答を取得できませんでした。入力や出力上限を確認してください。")
    return response.output_text
```

短い入力で接続を試すため、出力上限と通信の待ち時間を設けています。SDKによる自動再送は無効にしています。モデルや研究目的に応じて上限・待ち時間を見直してください。途中終了・空の回答は成功扱いにしません。APIのエラー詳細をそのまま画面へ返すことも避けています。[OpenAI公式：Python SDK](https://developers.openai.com/api/reference/python)

`store=False` はResponses APIの応答保存を無効にする指定で、送信データの保持がすべてゼロになる保証ではありません。研究データを扱う前に、送信する範囲・参加者への説明・サービス側の保持条件を確認してください。[OpenAI公式：データの取り扱い](https://developers.openai.com/api/docs/guides/your-data)

## 5. FastAPIにAI用の窓口を追加する

### 5-1. `backend/app/routes/ai.py` を新しく作る

```python
from typing import Annotated

from fastapi import APIRouter
from pydantic import BaseModel, StringConstraints

from app.ai import generate_reply

router = APIRouter(prefix="/ai", tags=["ai"])


class AIInput(BaseModel):
    text: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=2000)]


class AIReply(BaseModel):
    reply: str


@router.post("/reply", response_model=AIReply)
async def reply(body: AIInput):
    return AIReply(reply=await generate_reply(body.text))
```

### 5-2. `backend/app/main.py` に登録する

既存のimport行の近くに、次を追加します。

```python
from app.routes.ai import router as ai_router
```

既存の `app.include_router(sample_router, prefix="/api")` の下に、次を追加します。`FastAPI(...)` やMongoDBの `lifespan`、既存のメモ機能はそのまま残します。

```python
app.include_router(ai_router, prefix="/api")
```

これで、`POST /api/ai/reply` に `{"text": "質問文"}` を送ると、成功時に `{"reply": "AIの回答"}` を返す構成になります。既存のNext.jsの `/api/*` 転送設定を使うので、新しい画面用ポートは不要です。

## 6. 再ビルドして、まずAPIを試す

起動中なら元のターミナルでControl + C（WindowsではCtrl + C）を押し、停止完了後に次を実行します。**Mac・Windows共通です。**

```text
docker compose up --build
```

1. [APIの試行画面](http://localhost:3000/api/docs)を開きます。ポートを変更した場合はその番号で開きます。
2. **ai → POST /api/ai/reply → Try it out** を選びます。
3. 下のようなテスト用の文章を入力し、**Execute** を1回押します。この操作で外部APIへ送信され、利用に応じた費用が発生します。
4. `200` と `reply` の文章が返れば、その環境でのAPI接続を確認できます。元のサンプルメモ画面にAI欄が増えるわけではありません。

```json
{"text": "こんにちは。接続テストとして短く挨拶してください。"}
```

`.env` のキーやモデルを変更した場合も、停止後に `docker compose up --build` を実行し直して設定を反映します。ファイルを保存するだけでは、起動済みコンテナの環境変数は変わりません。

| 表示 | 主な確認事項 |
| --- | --- |
| AIの項目がない／404 | `routes/ai.py` と `main.py` の登録を確認し、再起動する |
| 503 | `.env` のキー・モデルと、Composeのbackendへの受け渡しを確認する |
| 422 | `text` を含むJSONか、空白のみでないか、2,000文字以内かを確認する |
| 429 | API側の利用残高・利用量・回数制限を確認する |
| 502 | モデルID・利用権限・キーの有効性・通信状態・出力上限を確認する |
| 504 | 時間を空けて短い入力で試す。モデルに応じて待ち時間も調整する |

設定やログを他の人に見せる際は、APIキー・入力文・回答などの内容を確認します。特に `docker compose config` は展開後のキーを表示し得るため、その出力をそのまま共有しないでください。

## 7. 自分の画面に組み込む場合

Next.jsの画面からは、自分のAPIだけを呼びます。下はクライアント側のボタン処理などから使う関数例です。入力欄・ボタン・回答欄は研究の画面に合わせて追加し、実行中はボタンを無効にして連続送信を防ぎます。エラーは `try / catch` で受け取り、画面に表示してください。

```javascript
async function requestAI(text) {
  const response = await fetch("/api/ai/reply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new Error("AIの回答を取得できませんでした。入力や接続を確認してください。");
  }
  const result = await response.json();
  return result.reply;
}
```

TypeScriptのファイルに貼る場合は引数を `text: string` にします。AIの回答は通常のテキストとして表示します。この例は1回ずつの質問・回答のみで、会話履歴、回答の逐次表示、MongoDBへの保存は必要に応じて追加します。

参加者が使うサーバーへ公開する際は、ログイン・利用回数制限・費用管理を追加します。研究の記録を残す場合は、同意・保存方針に合わせて、モデルID・プロンプトの版・実行日時・必要な入出力などを記録します。APIキーは記録対象にしません。[OpenAI公式：運用上の基本事項](https://developers.openai.com/api/docs/guides/production-best-practices)

## 8. 他社のAI APIに変更する場合

画面とFastAPIの間の `text` → `reply` という形式を保ち、`backend/app/ai.py` の中で各社の形式に変換すると、画面の変更を抑えられます。接続先に加えて、ライブラリ・認証方法・モデルID・送受信データ・エラー処理も確認してください。接続URLだけの変更で動くとは限りません。

| 利用先 | 参照する公式資料 | 主に変更する部分 |
| --- | --- | --- |
| OpenAI | [Python SDK・Responses API](https://developers.openai.com/api/reference/python) | この手順の `ai.py`、`OPENAI_MODEL` |
| Anthropic Claude | [Claude APIの概要](https://platform.claude.com/docs/en/api/overview) | `ai.py` の呼び出し・回答の取り出し、認証設定、必要なSDK |
| Google Gemini | [Gemini APIの導入手順](https://ai.google.dev/gemini-api/docs/get-started) | `ai.py` の呼び出し・回答の取り出し、認証設定、必要なSDK |

変更先専用のキーをbackendに設定し、不要になったOpenAI用の設定は外します。OpenAIのキーを別会社のAPIへ送らないようにしてください。複数社の自動切り替えは、この最小例には含めていません。

## 参考にしたGitHub・Webサイトと確認状況

参照日：2026-10-08。

- [openai/openai-python](https://github.com/openai/openai-python)：公式Python SDKの非同期呼び出し、環境変数、エラー処理を参考にしました。
- [OpenAI Developer quickstart](https://developers.openai.com/api/docs/quickstart)：APIキーの準備とResponses APIによる文章生成の流れを参考にしました。
- [OpenAI APIの認証](https://developers.openai.com/api/reference/overview#authentication)：APIキーをサーバーで管理する方針の根拠です。
- [Dockerの環境変数設定](https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/)：`.env` からbackendへ設定を渡す部分を参考にしました。本書は手元のPCでの開発例です。サーバー運用時はDocker secretsなど、配備先の秘密情報の管理方法も検討してください。

文書内のPython・JavaScriptの構文、Composeへ設定を追加した場合の形式、文書内のリンクを確認しています。**実際のAPIキーを使ったAI応答、Dockerでの一括起動、Windows実機での動作は未確認です。**
