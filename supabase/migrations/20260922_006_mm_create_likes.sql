-- 만물마켓 : 찜(좋아요) 테이블
-- 한 사람이 한 글에 한 번만 찜할 수 있게 (user_id, product_id) 를 기본키로 둡니다.

create table if not exists public.mm_likes (
  user_id    uuid not null references public.mm_profiles (id) on delete cascade,
  product_id uuid not null references public.mm_products (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

comment on table public.mm_likes is '만물마켓 찜(좋아요). 한 줄 = 한 사람이 한 글을 찜한 것';

-- 글 하나의 찜 개수를 셀 때
create index if not exists mm_likes_product_idx
  on public.mm_likes (product_id);
-- 내가 찜한 목록을 최신순으로 볼 때
create index if not exists mm_likes_user_created_idx
  on public.mm_likes (user_id, created_at desc);

-- RLS : 찜 개수는 누구나 볼 수 있고, 찜하고 푸는 건 본인만
alter table public.mm_likes enable row level security;

drop policy if exists "mm_likes_select_all" on public.mm_likes;
create policy "mm_likes_select_all"
  on public.mm_likes for select
  using (true);

drop policy if exists "mm_likes_insert_own" on public.mm_likes;
create policy "mm_likes_insert_own"
  on public.mm_likes for insert
  with check (auth.uid() = user_id);

drop policy if exists "mm_likes_delete_own" on public.mm_likes;
create policy "mm_likes_delete_own"
  on public.mm_likes for delete
  using (auth.uid() = user_id);
