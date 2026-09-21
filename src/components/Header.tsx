import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOutAction } from "@/lib/auth-actions";
import { CatFace, type CatColorKey } from "./CatMascot";
import { LogoutIcon, SparkleIcon } from "./Icons";

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: { nickname: string; avatar_key: CatColorKey } | null = null;
  if (user) {
    const { data } = await supabase
      .from("mm_profiles")
      .select("nickname, avatar_key")
      .eq("id", user.id)
      .maybeSingle();
    profile = (data as typeof profile) ?? {
      nickname: user.email?.split("@")[0] ?? "만물이",
      avatar_key: "orange",
    };
  }

  return (
    <header className="sticky top-0 z-50 border-b-2 border-carrot-100 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        {/* 로고 */}
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid size-11 place-items-center rounded-2xl bg-carrot-400 shadow-[0_4px_0_0_var(--color-carrot-600)] transition group-hover:-translate-y-0.5">
            <CatFace size={34} color="cream" mood="happy" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-xl text-carrot-700">만물마켓</span>
            <span className="block text-[11px] text-ink-soft">뭐든지 있고, 뭐든지 팔아요</span>
          </span>
        </Link>

        {/* 우측 영역 */}
        {user ? (
          <div className="flex items-center gap-2">
            <Link
              href="/mypage"
              className="flex items-center gap-2 rounded-full border-2 border-leaf-200 bg-leaf-50 py-1.5 pl-1.5 pr-3.5 transition hover:border-leaf-300 hover:bg-leaf-100"
            >
              <span className="grid size-8 place-items-center rounded-full bg-paper">
                <CatFace size={26} color={profile?.avatar_key ?? "orange"} mood="happy" />
              </span>
              <span className="max-w-[9rem] truncate text-sm font-medium text-leaf-800">
                {profile?.nickname}
              </span>
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                className="btn-squish flex items-center gap-1.5 rounded-full border-2 border-carrot-200 bg-paper px-3.5 py-2 text-sm font-medium text-ink-soft hover:border-carrot-300 hover:text-carrot-700"
              >
                <LogoutIcon size={17} />
                <span className="hidden sm:inline">로그아웃</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="btn-squish rounded-full px-4 py-2 text-sm font-medium text-ink-soft hover:text-carrot-700"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="btn-squish flex items-center gap-1.5 rounded-full bg-carrot-500 px-4 py-2 text-sm font-bold text-white shadow-[0_4px_0_0_var(--color-carrot-700)]"
            >
              <SparkleIcon size={16} />
              가입하고 시작
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
