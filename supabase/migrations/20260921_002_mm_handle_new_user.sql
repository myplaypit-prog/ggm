-- 회원가입(auth.users insert) 시 mm_profiles 행을 자동으로 만들어 줍니다.
-- 어떤 이유로든 실패해도 회원가입 자체는 막지 않도록 예외를 삼킵니다.

create or replace function public.mm_handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_nickname text;
  v_avatar   text;
begin
  v_nickname := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'nickname'), ''),
    split_part(new.email, '@', 1)
  );
  v_nickname := left(v_nickname, 20);
  if char_length(v_nickname) < 2 then
    v_nickname := v_nickname || '냥';
  end if;

  v_avatar := coalesce(nullif(new.raw_user_meta_data ->> 'avatar_key', ''), 'orange');
  if v_avatar not in ('orange','green','cream','gray','calico') then
    v_avatar := 'orange';
  end if;

  -- 닉네임이 이미 있으면 뒤에 숫자를 붙여 최대 5번 재시도
  for i in 0..4 loop
    begin
      insert into public.mm_profiles (id, nickname, avatar_key, region)
      values (
        new.id,
        case when i = 0 then v_nickname
             else left(v_nickname, 16) || floor(random() * 9000 + 1000)::text end,
        v_avatar,
        coalesce(nullif(trim(new.raw_user_meta_data ->> 'region'), ''), '우리동네')
      )
      on conflict (id) do nothing;
      exit;
    exception
      when unique_violation then
        null; -- 닉네임 충돌 → 다음 루프에서 재시도
      when others then
        exit;
    end;
  end loop;

  return new;
end;
$$;

drop trigger if exists mm_on_auth_user_created on auth.users;
create trigger mm_on_auth_user_created
  after insert on auth.users
  for each row execute function public.mm_handle_new_user();
