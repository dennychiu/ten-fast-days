# 十齋日網站（保留原版 + 新版）
原有首頁路徑 `/` 與既有管理功能保留。新版獨立路徑：`/new-version`。

## 新版部署環境變數（Vercel）
- `NEXT_PUBLIC_SUPABASE_URL`：Supabase Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`：Supabase anon / publishable key（不可使用 service_role）
- `NEXT_PUBLIC_LIFF_ID`：LINE Developers 的 LIFF ID（可先留空）

## Supabase
在 SQL Editor 執行 `supabase/new-version-schema.sql`。
建立 Auth 使用者後，將其 UID 加入 `public.admins`；每位管理員都要加入。
Storage bucket `ten-fast-days` 會由 SQL 建立，圖片上限 8MB。

## 新版網站功能
- 前台：近期十齋日、全部十齋日、最新公告。
- 管理後台：Supabase Email/Password 登入；多管理員授權；十齋日與公告新增、編輯、刪除；圖片上傳；草稿／發布。
- LIFF：設定 LIFF ID 後會初始化 LIFF SDK；LINE 圖文選單可連至 `https://liff.line.me/LIFF_ID`，LIFF Endpoint URL 設為新版網址 `https://你的網域/new-version`。
- 原版首頁 `/` 不會被覆蓋。
