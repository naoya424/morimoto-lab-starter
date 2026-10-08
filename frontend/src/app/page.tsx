"use client";

import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";

type Sample = { id: string; text: string; created_at: string };

export default function Home() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [text, setText] = useState("");
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    setNotice("");
    try {
      const [health, response] = await Promise.all([
        fetch("/api/health", { cache: "no-store" }),
        fetch("/api/samples", { cache: "no-store" }),
      ]);
      if (!health.ok || !response.ok) throw new Error("接続エラー");
      setSamples(await response.json());
      setConnected(true);
    } catch {
      setConnected(false);
      setError("接続できませんでした。起動状態を確認して「再読み込み」を押してください。");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = text.trim();
    if (!value || saving) return;
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/samples", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: value }),
      });
      if (!response.ok) throw new Error("保存エラー");
      const saved: Sample = await response.json();
      setSamples((previous) => [saved, ...previous].slice(0, 20));
      setText("");
      setNotice("メモを保存しました。");
    } catch {
      setError("保存できませんでした。入力内容は残っています。接続を確認して再度お試しください。");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main>
      <header>
        <p className="eyebrow">研究室共通の開発用ひな形</p>
        <h1>Morimoto Lab Starter</h1>
        <p className="intro">メモを保存して、画面からデータベースまでの接続を確認できます。</p>
        <p className={`status ${connected ? "online" : ""}`} role="status">
          <span className="dot" aria-hidden="true" />
          {loading ? "接続を確認中…" : connected ? "API・データベース接続済み" : "未接続"}
        </p>
      </header>

      <section className="card" aria-labelledby="sample-title">
        <h2 id="sample-title">サンプルメモ</h2>
        <form onSubmit={save}>
          <label htmlFor="memo">メモの内容</label>
          <textarea id="memo" value={text} onChange={(event) => setText(event.target.value)}
            maxLength={500} rows={3} required placeholder="動作確認用のメモを入力してください"
            aria-describedby="memo-hint" disabled={saving} />
          <div className="form-footer">
            <small id="memo-hint">500文字以内</small>
            <button type="submit" disabled={!connected || loading || saving || !text.trim()}>
              {saving ? "保存中…" : "保存する"}
            </button>
          </div>
        </form>
        {error && <p className="error" role="alert">{error}</p>}
        <p className="notice" role="status">{notice}</p>

        <div className="list-heading">
          <h3>保存したメモ <small>最新20件</small></h3>
          <button className="secondary" type="button" onClick={() => void load()} disabled={loading || saving}>
            {loading ? "読み込み中…" : "再読み込み"}
          </button>
        </div>
        {samples.length > 0 ? (
          <ul>{samples.map((sample) => <li key={sample.id}>
            <p className="memo-text">{sample.text}</p>
            <time dateTime={sample.created_at}>{new Date(sample.created_at).toLocaleString("ja-JP")}</time>
          </li>)}</ul>
        ) : <p className="empty">{loading ? "読み込み中です。" : connected ? "まだメモはありません。最初の1件を保存してみましょう。" : "接続後にメモが表示されます。"}</p>}
      </section>
      <footer><a href="/api/docs" target="_blank" rel="noreferrer">APIの仕様を見る ↗</a></footer>
    </main>
  );
}
