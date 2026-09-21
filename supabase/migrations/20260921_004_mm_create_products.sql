-- 만물마켓 : 거래 글(상품) 테이블

create table if not exists public.mm_products (
  id          uuid primary key default gen_random_uuid(),
  -- mm_profiles 를 참조해야 PostgREST 에서 판매자 정보를 한 번에 조인할 수 있습니다.
  seller_id   uuid not null references public.mm_profiles (id) on delete cascade,
  title       text not null check (char_length(btrim(title)) between 2 and 60),
  description text not null default '' check (char_length(description) <= 2000),
  price       integer not null default 0 check (price >= 0 and price <= 1000000000),
  category    text not null check (category in ('fashion','digital','interior','book','hobby','kids','plant','etc')),
  condition   text not null default 'used' check (condition in ('new','like_new','used','broken')),
  status      text not null default 'selling' check (status in ('selling','reserved','sold')),
  region      text not null default '',
  images      text[] not null default '{}'
                check (array_length(images, 1) is null or array_length(images, 1) <= 5),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.mm_products is '만물마켓 거래 글';
comment on column public.mm_products.price is '0 이면 나눔';
comment on column public.mm_products.images is 'mm-products 스토리지 버킷 안의 파일 경로';

create index if not exists mm_products_created_at_idx
  on public.mm_products (created_at desc);
create index if not exists mm_products_category_idx
  on public.mm_products (category, created_at desc);
create index if not exists mm_products_seller_idx
  on public.mm_products (seller_id, created_at desc);

drop trigger if exists mm_products_set_updated_at on public.mm_products;
create trigger mm_products_set_updated_at
  before update on public.mm_products
  for each row execute function public.mm_set_updated_at();

-- RLS : 글은 누구나 볼 수 있고, 쓰기는 본인 글만
alter table public.mm_products enable row level security;

drop policy if exists "mm_products_select_all" on public.mm_products;
create policy "mm_products_select_all"
  on public.mm_products for select
  using (true);

drop policy if exists "mm_products_insert_own" on public.mm_products;
create policy "mm_products_insert_own"
  on public.mm_products for insert
  to authenticated
  with check (auth.uid() = seller_id);

drop policy if exists "mm_products_update_own" on public.mm_products;
create policy "mm_products_update_own"
  on public.mm_products for update
  to authenticated
  using (auth.uid() = seller_id)
  with check (auth.uid() = seller_id);

drop policy if exists "mm_products_delete_own" on public.mm_products;
create policy "mm_products_delete_own"
  on public.mm_products for delete
  to authenticated
  using (auth.uid() = seller_id);
