-- Supabase Security Advisor 권고사항 정리

-- 1) 트리거 함수의 search_path 고정
create or replace function public.mm_set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- 2) SECURITY DEFINER 함수를 REST API(/rest/v1/rpc/...)로 아무나 호출하지 못하게 막기
--    트리거에서는 계속 정상 동작합니다.
revoke all on function public.mm_handle_new_user() from public, anon, authenticated;
