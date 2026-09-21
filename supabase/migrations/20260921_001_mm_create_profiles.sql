-- 만물마켓 (Manmul Market) : 회원 프로필 테이블
-- 기존 가계부 테이블(entries, settings)과 구분하기 위해 mm_ 접두사를 사용합니다.
-- 적용 대상: Supabase 프로젝트 ggb0921_db (luoikfzoiiildaplurjr)

create table if not exists public.mm_profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  nickname    text not null check (char_length(nickname) between 2 and 20),
  avatar_key  text not null default 'orange' check (avatar_key in ('orange','green','cream','gray','calico')),
  region      text not null default '우리동네',
  bio         text not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.mm_profiles is '만물마켓 사용자 프로필';

-- 닉네임 중복 방지 (대소문자 무시)
create unique index if not exists mm_profiles_nickname_key
  on public.mm_profiles (lower(nickname));

-- updated_at 자동 갱신
create or replace function public.mm_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists mm_profiles_set_updated_at on public.mm_profiles;
create trigger mm_profiles_set_updated_at
  before update on public.mm_profiles
  for each row execute function public.mm_set_updated_at();

-- RLS: 프로필은 누구나 볼 수 있고, 수정은 본인만 할 수 있습니다.
alter table public.mm_profiles enable row level security;

drop policy if exists "mm_profiles_select_all" on public.mm_profiles;
create policy "mm_profiles_select_all"
  on public.mm_profiles for select
  using (true);

drop policy if exists "mm_profiles_insert_own" on public.mm_profiles;
create policy "mm_profiles_insert_own"
  on public.mm_profiles for insert
  to authenticated
  with check (auth.uid() = id);

drop policy if exists "mm_profiles_update_own" on public.mm_profiles;
create policy "mm_profiles_update_own"
  on public.mm_profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "mm_profiles_delete_own" on public.mm_profiles;
create policy "mm_profiles_delete_own"
  on public.mm_profiles for delete
  to authenticated
  using (auth.uid() = id);
