"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      setMessage("網站尚未設定 Supabase 連線資料，請先完成部署環境設定。");
      return;
    }
    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      setMessage("登入未成功，請確認電子郵件及密碼，或確認帳號已完成設定。");
      return;
    }
    window.location.href = "/admin";
  }

  return (
    <main className="admin-shell">
      <section className="admin-panel">
        <p className="admin-eyebrow">TEN FAST DAYS · ADMIN</p>
        <h1>十齋日管理員登入</h1>
        <p className="admin-description">登入後即可進入管理區。請勿在公共設備上保存密碼。</p>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label htmlFor="email">電子郵件</label>
          <input id="email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password">登入密碼</label>
          <input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" disabled={busy}>{busy ? "登入中…" : "登入管理後台"}</button>
        </form>
        {message && <p className="admin-message" role="alert">{message}</p>}
        <Link className="admin-back" href="/">← 返回十齋日首頁</Link>
      </section>
    </main>
  );
}
