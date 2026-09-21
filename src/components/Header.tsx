import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOutAction } from "@/lib/auth-actions";
import { CatFace, type CatColorKey } from "./CatMascot";
import { LogoutIcon, SparkleIcon, TagIcon } from "./Icons";

export async function Header() {
  // 헤더는 모든 페이지에 들어갑니다. 404 페이지처럼 빌드할 때 미리 만들어 두는
  // 페이지에도 포함되기 때문에, 여기서 오류가 나면 빌드 자체가 실패해요.
  // (실제로 Vercel 환경변수가 비었을 때 "/_not-found 를 만들다 실패" 로 배포가 멈췄습니다)
  // 그래서 로그인 정보를 못 읽으면 그냥 "로그아웃 상태"로 그려 줍니다.
  let user: { id: string; email?: string } | null = null;
  let profile: { nickname: string; avatar_key: CatColorKey } | null = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;

    if (user) {
      const { data: profileData } = await supabase
        .from("mm_profiles")
        .select("nickname, avatar_key")
        .eq("id", user.id)
        .maybeSingle();
      profile = (profileData as typeof profile) ?? {
        nickname: user.email?.split("@")[0] ?? "만물이",
        avatar_key: "orange",
      };
    }
  } catch (error) {
    console.error(
      "[헤더] 로그인 정보를 불러오지 못했어요. 로그아웃 상태로 보여 줍니다. " +
        "(Supabase 환경변수를 확인해 주세요)",
      error,
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-sand-200 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 sm:gap-3 sm:px-5">
        {/* 로고 */}
        <Link href="/" className="group flex shrink-0 items-center gap-2">
          <span className="btn-primary grid size-10 shrink-0 place-items-center rounded-2xl transition group-hover:-translate-y-0.5">
            <CatFace size={32} color="cream" mood="happy" />
          </span>
          <span className="leading-tight">
            {/* 아주 좁은 화면에서는 고양이 아이콘만 남깁니다 */}
            <span className="hidden whitespace-nowrap font-display text-lg text-carrot-700 xs:block sm:text-xl">
              만물마켓
            </span>
            <span className="hidden whitespace-nowrap text-[11px] text-ink-soft lg:block">
              뭐든지 있고, 뭐든지 팔아요
            </span>
          </span>
        </Link>

        {/* 가운데 메뉴 */}
        <nav className="flex items-center gap-1">
          <Link
            href="/products"
            className="hidden whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-carrot-50 hover:text-carrot-700 sm:block"
          >
            만물 구경
          </Link>
          <Link
            href="/products/new"
            className="btn-squish btn-outline flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-bold"
          >
            <TagIcon size={15} />
            팔기
          </Link>
        </nav>

        {/* 우측 영역 */}
        {user ? (
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <Link
              href="/mypage"
              className="flex items-center gap-2 rounded-full border-2 border-sand-200 bg-sand-50 py-1 pl-1 pr-3 transition hover:border-carrot-300 hover:bg-carrot-50"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-paper">
                <CatFace size={26} color={profile?.avatar_key ?? "orange"} mood="happy" />
              </span>
              <span className="hidden max-w-[8rem] truncate text-sm font-medium text-ink sm:block">
                {profile?.nickname}
              </span>
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                className="btn-squish flex items-center gap-1.5 whitespace-nowrap rounded-full border-2 border-sand-200 bg-paper px-3 py-2 text-sm font-medium text-ink-soft hover:border-carrot-300 hover:text-carrot-700"
              >
                <LogoutIcon size={17} />
                <span className="hidden lg:inline">로그아웃</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
            <Link
              href="/login"
              className="btn-squish whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-ink-soft hover:text-carrot-700"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="btn-squish btn-primary flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold"
            >
              <SparkleIcon size={16} />
              가입
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
