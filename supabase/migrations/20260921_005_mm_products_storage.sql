-- 상품 사진을 담을 스토리지 버킷 (읽기는 공개, 쓰기는 본인 폴더만)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'mm-products',
  'mm-products',
  true,
  5242880, -- 5MB
  array['image/jpeg','image/png','image/webp','image/gif']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- 파일 경로 규칙: {auth.uid()}/{파일명}
drop policy if exists "mm_products_images_read" on storage.objects;
create policy "mm_products_images_read"
  on storage.objects for select
  using (bucket_id = 'mm-products');

drop policy if exists "mm_products_images_insert" on storage.objects;
create policy "mm_products_images_insert"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'mm-products'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "mm_products_images_update" on storage.objects;
create policy "mm_products_images_update"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'mm-products'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "mm_products_images_delete" on storage.objects;
create policy "mm_products_images_delete"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'mm-products'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
