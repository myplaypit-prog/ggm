import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOutAction } from "@/lib/auth-actions";
import { CAT_COLORS, CatFace, PawPrint, type CatColorKey } from "@/components/CatMascot";
import { ProductCard } from "@/components/products/ProductCard";
import type { ProductWithSeller } from "@/lib/products";
import {
  ChatIcon,
  CheckIcon,
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
  { title: "찜한 물건", desc: "마음에 담아 둔 물건들", icon: HeartIcon, tone: "bg-berry-soft text-berry-ink" },
  { title: "채팅", desc: "이웃과 주고받은 이야기", icon: ChatIcon, tone: "bg-sky-soft text-sky-ink" },
];

export default async function MyPage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string; deleted?: string }>;
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

  // 내가 올린 물건
  const { data: myProductsData } = await supabase
    .from("mm_products")
    .select("*, seller:mm_profiles(id, nickname, avatar_key, region)")
    .eq("seller_id", user.id)
    .order("created_at", { ascending: false });

  const myProducts = (myProductsData ?? []) as ProductWithSeller[];
  const sellingCount = myProducts.filter((p) => p.status === "selling").length;
  const soldCount = myProducts.filter((p) => p.status === "sold").length;

  const nickname = profile?.nickname ?? user.email?.split("@")[0] ?? "만물이";
  const avatarKey = (profile?.avatar_key ?? "orange") as CatColorKey;
  const region = profile?.region ?? "우리동네";
  const joinedAt = new Date(profile?.created_at ?? user.created_at).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      {sp.welcome === "1" && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-sun/40 bg-sun-soft px-4 py-3 text-sm font-medium text-sun-ink">
          <SparkleIcon size={20} className="shrink-0" />
          가입을 축하해요! 이제 만물마켓의 이웃이 되었어요. 🎉
        </div>
      )}
      {sp.deleted === "1" && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-leaf-200 bg-leaf-50 px-4 py-3 text-sm font-medium text-leaf-800">
          <CheckIcon size={20} className="shrink-0" />
          글을 지웠어요.
        </div>
      )}

      {/* 프로필 카드 */}
      <section className="card-soft relative overflow-hidden p-7 sm:p-9">
        <PawPrint
          size={140}
          className="pointer-events-none absolute -right-6 -top-8 rotate-12 text-carrot-50"
        />

        <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="grid size-28 shrink-0 place-items-center rounded-3xl border border-sand-200 bg-carrot-50">
            <CatFace size={104} color={avatarKey} mood="happy" className="animate-float" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <span className="chip bg-carrot-100 text-carrot-700">
              {CAT_COLORS[avatarKey].name} 이웃 · {CAT_COLORS[avatarKey].tagline}
            </span>

            <h1 className="mt-3 text-[2rem] text-ink">{nickname}</h1>

            <dl className="mt-4 grid gap-2 text-sm text-ink-soft sm:max-w-sm">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <MailIcon size={17} className="text-ink-faint" />
                <dd className="truncate">{user.email}</dd>
              </div>
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <PinIcon size={17} className="text-carrot-400" />
                <dd>{region}</dd>
              </div>
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <SparkleIcon size={17} className="text-sun" />
                <dd>{joinedAt} 가입</dd>
              </div>
            </dl>

            {/* 판매 요약 */}
            <div className="mt-5 flex justify-center gap-2.5 sm:justify-start">
              <span className="rounded-xl border border-sand-200 bg-paper px-4 py-2.5 text-center">
                <span className="tabular block font-display text-xl text-carrot-600">{sellingCount}</span>
                <span className="text-[11px] font-medium text-ink-faint">판매중</span>
              </span>
              <span className="rounded-xl border border-sand-200 bg-paper px-4 py-2.5 text-center">
                <span className="tabular block font-display text-xl text-leaf-600">{soldCount}</span>
                <span className="text-[11px] font-medium text-ink-faint">판매완료</span>
              </span>
              <span className="rounded-xl border border-sand-200 bg-paper px-4 py-2.5 text-center">
                <span className="tabular block font-display text-xl text-ink">{myProducts.length}</span>
                <span className="text-[11px] font-medium text-ink-faint">전체</span>
              </span>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2.5 sm:justify-start">
              <Link
                href="/products/new"
                className="btn-squish btn-primary flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-[15px] font-bold"
              >
                <TagIcon size={17} />
                물건 팔기
              </Link>
              <Link
                href="/products"
                className="btn-squish btn-outline rounded-xl px-5 py-2.5 text-[15px] font-bold"
              >
                만물 구경하기
              </Link>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="btn-squish flex items-center gap-1.5 rounded-xl border border-sand-200 bg-paper px-5 py-2.5 text-[15px] font-bold text-ink-soft shadow-xs hover:border-sand-300 hover:text-ink"
                >
                  <LogoutIcon size={17} />
                  로그아웃
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 내가 올린 물건 */}
      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-[1.6rem] text-ink">내가 올린 물건</h2>
            <p className="mt-1 text-sm text-ink-soft">
              눌러서 수정하거나 판매 상태를 바꿀 수 있어요.
            </p>
          </div>
          <CatFace size={52} color={avatarKey} mood="wink" className="hidden shrink-0 sm:block" />
        </div>

        {myProducts.length === 0 ? (
          <div className="rounded-blob border border-dashed border-sand-300 bg-paper px-6 py-14 text-center">
            <CatFace size={92} color="cream" mood="sleepy" className="mx-auto animate-float" />
            <p className="mt-4 text-xl text-ink">아직 올린 물건이 없어요</p>
            <p className="mt-1.5 text-sm text-ink-soft">
              안 쓰는 물건, 누군가에겐 보물일지도 몰라요.
            </p>
            <Link
              href="/products/new"
              className="btn-squish btn-primary mt-6 inline-flex rounded-xl px-5 py-3 text-[15px] font-bold"
            >
              첫 물건 올리기
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {myProducts.map((p) => (
              <li key={p.id} className="flex">
                <div className="w-full">
                  <ProductCard product={p} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 다음 단계 안내 */}
      <section className="mt-12">
        <h2 className="text-[1.6rem] text-ink">곧 열리는 기능들</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {COMING_SOON.map(({ title, desc, icon: Icon, tone }) => (
            <li
              key={title}
              className="flex items-center gap-3.5 rounded-2xl border border-dashed border-sand-300 bg-paper px-5 py-4"
            >
              <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${tone}`}>
                <Icon size={24} />
              </span>
              <div className="min-w-0">
                <p className="text-[17px] text-ink">{title}</p>
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
