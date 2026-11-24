"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function AdminPage() {
  const [status, setStatus] = useState("正在確認登入狀態…");

  useEffect(() => {
    let active = true;
    async function checkAdmin() {
      if (!supabase) {
        if (active) setStatus("尚未設定 Supabase 連線資料。");
        return;
      }
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.replace("/admin/login");
        return;
      }
      const { data, error } = await supabase.rpc("is_site_admin");
      if (!active) return;
      if (error || data !== true) {
        setStatus("此帳號尚未取得管理員權限，請確認 Supabase 管理員名單及資料庫設定。");
        return;
      }
      setStatus("管理員身分確認成功。下一階段將加入十齋日內容、公告及圖片管理功能。");
    }
    checkAdmin();
    return () => { active = false; };
  }, []);

  async function signOut() {
    if (supabase) await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <main className="admin-shell">
      <section className="admin-panel admin-dashboard">
        <p className="admin-eyebrow">TEN FAST DAYS · CONTROL PANEL</p>
        <h1>十齋日管理後台</h1>
        <p className="admin-description">{status}</p>
        <div className="admin-next">
          <h2>即將開放管理項目</h2>
          <ul>
            <li>十齋日日期、聖號及說明</li>
            <li>佛菩薩聖像上傳與更換</li>
            <li>公告及師父訊息</li>
          </ul>
        </div>
        <div className="admin-actions">
          <Link href="/">返回公開首頁</Link>
          <button type="button" className="secondary-button" onClick={signOut}>登出</button>
        </div>
      </section>
    </main>
  );
}
