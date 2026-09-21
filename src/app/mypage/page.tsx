import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOutAction } from "@/lib/auth-actions";
import { CAT_COLORS, CatFace, PawPrint, type CatColorKey } from "@/components/CatMascot";
import {
  BoxIcon,
  ChatIcon,
  HeartIcon,
  LogoutIcon,
  MailIcon,
  PinIcon,
  SparkleIcon,
  TagIcon,
} from "@/components/Icons";

export const metadata: Metadata = { title: "내 만물창고 · 만물마켓" };

/** 아직 만들지 않은 다음 단계 기능들 */
const COMING_SOON = [
  { title: "물건 팔기", desc: "사진 올리고 가격 정하기", icon: BoxIcon, tone: "bg-carrot-100 text-carrot-700" },
  { title: "판매 내역", desc: "내가 올린 물건 관리", icon: TagIcon, tone: "bg-leaf-100 text-leaf-700" },
  { title: "찜한 물건", desc: "마음에 담아 둔 물건들", icon: HeartIcon, tone: "bg-berry/15 text-berry" },
  { title: "채팅", desc: "이웃과 주고받은 이야기", icon: ChatIcon, tone: "bg-sky/25 text-[#2b7fa3]" },
];

export default async function MyPage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>;
}) {
  const sp = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 미들웨어가 막아 주지만, 서버에서 한 번 더 확인합니다.
  if (!user) redirect("/login?next=/mypage");

  const { data: profile } = await supabase
    .from("mm_profiles")
    .select("nickname, avatar_key, region, bio, created_at")
    .eq("id", user.id)
    .maybeSingle();

  const nickname = profile?.nickname ?? user.email?.split("@")[0] ?? "만물이";
  const avatarKey = (profile?.avatar_key ?? "orange") as CatColorKey;
  const region = profile?.region ?? "우리동네";
  const joinedAt = new Date(profile?.created_at ?? user.created_at).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      {sp.welcome === "1" && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border-2 border-sun bg-sun/20 px-4 py-3 text-sm font-medium text-[#8a6200]">
          <SparkleIcon size={20} className="shrink-0" />
          가입을 축하해요! 이제 만물마켓의 이웃이 되었어요. 🎉
        </div>
      )}

      {/* 프로필 카드 */}
      <section className="card-soft relative overflow-hidden p-7 sm:p-9">
        <PawPrint
          size={140}
          className="pointer-events-none absolute -right-6 -top-8 rotate-12 text-carrot-50"
        />

        <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="grid size-32 shrink-0 place-items-center rounded-blob border-2 border-carrot-200 bg-carrot-50">
            <CatFace size={104} color={avatarKey} mood="happy" className="animate-float" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf-100 px-3 py-1 text-xs font-bold text-leaf-700">
              {CAT_COLORS[avatarKey].name} 이웃
            </span>

            <h1 className="mt-2.5 font-display text-3xl text-ink">{nickname}</h1>

            <dl className="mt-4 grid gap-2 text-sm text-ink-soft sm:max-w-sm">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <MailIcon size={17} className="text-carrot-400" />
                <dd className="truncate">{user.email}</dd>
              </div>
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <PinIcon size={17} className="text-leaf-500" />
                <dd>{region}</dd>
              </div>
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <SparkleIcon size={17} className="text-sun" />
                <dd>{joinedAt} 가입</dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap justify-center gap-2.5 sm:justify-start">
              <Link
                href="/"
                className="btn-squish rounded-2xl bg-carrot-500 px-5 py-2.5 font-display text-base text-white shadow-[0_4px_0_0_var(--color-carrot-700)]"
              >
                만물 구경하러 가기
              </Link>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="btn-squish flex items-center gap-1.5 rounded-2xl border-2 border-carrot-200 bg-paper px-5 py-2.5 font-display text-base text-ink-soft hover:border-carrot-300 hover:text-carrot-700"
                >
                  <LogoutIcon size={17} />
                  로그아웃
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 다음 단계 안내 */}
      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-ink">곧 열리는 기능들</h2>
            <p className="mt-1 text-sm text-ink-soft">
              지금은 회원가입·로그인까지 완성했어요. 다음 단계에서 하나씩 열어 볼까요?
            </p>
          </div>
          <CatFace size={56} color="green" mood="wink" className="hidden shrink-0 sm:block" />
        </div>

        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {COMING_SOON.map(({ title, desc, icon: Icon, tone }) => (
            <li
              key={title}
              className="flex items-center gap-3.5 rounded-3xl border-2 border-dashed border-carrot-200 bg-paper/70 px-5 py-4"
            >
              <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${tone}`}>
                <Icon size={24} />
              </span>
              <div className="min-w-0">
                <p className="font-display text-lg text-ink">{title}</p>
                <p className="truncate text-sm text-ink-soft">{desc}</p>
              </div>
              <span className="ml-auto shrink-0 rounded-full bg-carrot-50 px-2.5 py-1 text-[11px] font-bold text-carrot-600">
                준비 중
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
