-- 十齋日新版網站 Supabase schema
create extension if not exists pgcrypto;
create table if not exists public.admins (
 user_id uuid primary key references auth.users(id) on delete cascade,
 created_at timestamptz not null default now()
);
create table if not exists public.fast_days (
 id uuid primary key default gen_random_uuid(),
 event_date date not null,
 title text not null,
 message text,
 practice text,
 image_url text,
 published boolean not null default false,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create table if not exists public.announcements (
 id uuid primary key default gen_random_uuid(),
 title text not null,
 message text,
 image_url text,
 published boolean not null default false,
 created_at timestamptz not null default now()
);
create or replace function public.is_tenfast_admin()
returns boolean language sql security definer stable set search_path=public
as $$ select exists(select 1 from public.admins where user_id=auth.uid()); $$;
alter table public.admins enable row level security;
alter table public.fast_days enable row level security;
alter table public.announcements enable row level security;
drop policy if exists "admin self read" on public.admins;
create policy "admin self read" on public.admins for select to authenticated using(user_id=auth.uid() or public.is_tenfast_admin());
drop policy if exists "published days read" on public.fast_days;
create policy "published days read" on public.fast_days for select to anon,authenticated using(published=true or public.is_tenfast_admin());
drop policy if exists "admin days insert" on public.fast_days;
create policy "admin days insert" on public.fast_days for insert to authenticated with check(public.is_tenfast_admin());
drop policy if exists "admin days update" on public.fast_days;
create policy "admin days update" on public.fast_days for update to authenticated using(public.is_tenfast_admin()) with check(public.is_tenfast_admin());
drop policy if exists "admin days delete" on public.fast_days;
create policy "admin days delete" on public.fast_days for delete to authenticated using(public.is_tenfast_admin());
drop policy if exists "published announcements read" on public.announcements;
create policy "published announcements read" on public.announcements for select to anon,authenticated using(published=true or public.is_tenfast_admin());
drop policy if exists "admin announcements insert" on public.announcements;
create policy "admin announcements insert" on public.announcements for insert to authenticated with check(public.is_tenfast_admin());
drop policy if exists "admin announcements update" on public.announcements;
create policy "admin announcements update" on public.announcements for update to authenticated using(public.is_tenfast_admin()) with check(public.is_tenfast_admin());
drop policy if exists "admin announcements delete" on public.announcements;
create policy "admin announcements delete" on public.announcements for delete to authenticated using(public.is_tenfast_admin());
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('ten-fast-days','ten-fast-days',true,8388608,array['image/jpeg','image/png','image/webp','image/gif'])
on conflict(id) do update set public=true,file_size_limit=8388608,allowed_mime_types=array['image/jpeg','image/png','image/webp','image/gif'];
drop policy if exists "tenfast image public read" on storage.objects;
create policy "tenfast image public read" on storage.objects for select to anon,authenticated using(bucket_id='ten-fast-days');
drop policy if exists "tenfast image admin upload" on storage.objects;
create policy "tenfast image admin upload" on storage.objects for insert to authenticated with check(bucket_id='ten-fast-days' and public.is_tenfast_admin());
drop policy if exists "tenfast image admin update" on storage.objects;
create policy "tenfast image admin update" on storage.objects for update to authenticated using(bucket_id='ten-fast-days' and public.is_tenfast_admin()) with check(bucket_id='ten-fast-days' and public.is_tenfast_admin());
drop policy if exists "tenfast image admin delete" on storage.objects;
create policy "tenfast image admin delete" on storage.objects for delete to authenticated using(bucket_id='ten-fast-days' and public.is_tenfast_admin());
-- 每位管理員在 Supabase Auth 建立帳號後，將 UID 加入：
-- insert into public.admins(user_id) values ('AUTH_USER_UUID');
