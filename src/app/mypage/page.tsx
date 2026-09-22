import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOutAction } from "@/lib/auth-actions";
import { CAT_COLORS, CatFace, PawPrint, type CatColorKey } from "@/components/CatArtwork";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCT_SELECT, type ProductWithSeller } from "@/lib/products";
import { fetchLikedProductIds } from "@/lib/likes";
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
    .select(PRODUCT_SELECT)
    .eq("seller_id", user.id)
    .order("created_at", { ascending: false });

  const myProducts = (myProductsData ?? []) as ProductWithSeller[];
  const likedIds = await fetchLikedProductIds(
    user.id,
    myProducts.map((p) => p.id),
  );
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

      {/* ── 프로필 ────────────────────────────────────
          예전에는 이 카드 하나에 프로필·숫자·버튼 세 가지를 다 우겨넣어
          어디를 봐야 할지 알기 어려웠어요. 세 덩어리로 나눴습니다. */}
      <section className="card-soft relative overflow-hidden p-7 sm:p-8">
        <PawPrint
          size={150}
          className="pointer-events-none absolute -right-8 -top-10 rotate-12 text-carrot-50"
        />

        <div className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:gap-6 sm:text-left">
          <div className="grid size-24 shrink-0 place-items-center rounded-3xl border border-sand-200 bg-carrot-50">
            <CatFace size={88} color={avatarKey} mood="happy" />
          </div>

          <div className="min-w-0 flex-1">
            <span className="chip bg-carrot-50 text-carrot-700">
              {CAT_COLORS[avatarKey].name} · {CAT_COLORS[avatarKey].tagline}
            </span>
            <h1 className="mt-2.5 truncate text-[1.9rem] text-ink">{nickname}</h1>
            <p className="mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[13px] text-ink-faint sm:justify-start">
              <span className="inline-flex items-center gap-1">
                <PinIcon size={14} />
                {region}
              </span>
              <span className="inline-flex items-center gap-1">
                <MailIcon size={14} />
                <span className="max-w-[14rem] truncate">{user.email}</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <SparkleIcon size={14} />
                {joinedAt} 가입
              </span>
            </p>
          </div>

          {/* 가장 하고 싶은 일 하나만 크게 */}
          <Link
            href="/products/new"
            className="btn-squish btn-primary inline-flex shrink-0 items-center gap-1.5 rounded-xl px-5 py-3 text-[15px] font-bold"
          >
            <TagIcon size={17} />
            물건 팔기
          </Link>
        </div>

        {/* 판매 요약 — 숫자를 크게 키워 한눈에 */}
        <dl className="hairline mt-7 grid grid-cols-3 gap-px overflow-hidden pt-7">
          {[
            { label: "판매중", value: sellingCount, tone: "text-carrot-500" },
            { label: "판매완료", value: soldCount, tone: "text-leaf-600" },
            { label: "전체", value: myProducts.length, tone: "text-ink" },
          ].map((s, i) => (
            <div key={s.label} className={i > 0 ? "border-l border-sand-200 text-center" : "text-center"}>
              <dd className={`tabular font-display text-[2rem] leading-none ${s.tone}`}>{s.value}</dd>
              <dt className="mt-1.5 text-xs font-semibold text-ink-faint">{s.label}</dt>
            </div>
          ))}
        </dl>
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
                  <ProductCard product={p} liked={likedIds.has(p.id)} isLoggedIn />
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
              <span className="ml-auto shrink-0 rounded-full bg-sand-100 px-2.5 py-1 text-[11px] font-bold text-ink-faint">
                준비 중
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 로그아웃 ──────────────────────────────────
          자주 쓰는 버튼이 아니라서 맨 아래에 작게 뒀어요.
          위쪽 "물건 팔기" 와 나란히 두면 실수로 누르기 쉽습니다. */}
      <div className="hairline mt-14 pt-6 text-center">
        <form action={signOutAction}>
          <button
            type="submit"
            className="btn-squish inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-ink-faint transition hover:bg-sand-100 hover:text-ink"
          >
            <LogoutIcon size={16} />
            로그아웃
          </button>
        </form>
      </div>
    </div>
  );
}
