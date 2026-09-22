import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  CATEGORY_KEYS,
  categoryLabel,
  PRODUCT_SELECT,
  type ProductWithSeller,
} from "@/lib/products";
import { fetchLikedProductIds } from "@/lib/likes";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { CatFace, PawPrint } from "@/components/CatArtwork";
import { SparkleIcon } from "@/components/Icons";

export const metadata: Metadata = { title: "만물 구경하기 · 만물마켓" };

const PAGE_SIZE = 48;

/** PostgREST 의 or() 문법을 깨뜨리는 문자를 걸러 냅니다. */
function sanitizeQuery(raw: string) {
  return raw.replace(/[,()%*\\]/g, " ").trim().slice(0, 40);
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
}) {
  const sp = await searchParams;
  const q = sanitizeQuery(sp.q ?? "");
  const category = (CATEGORY_KEYS as string[]).includes(sp.category ?? "")
    ? sp.category!
    : "";
  const sort = ["recent", "cheap", "expensive"].includes(sp.sort ?? "")
    ? sp.sort!
    : "recent";

  const supabase = await createClient();

  let query = supabase
    .from("mm_products")
    .select(PRODUCT_SELECT)
    .limit(PAGE_SIZE);

  if (category) query = query.eq("category", category);
  if (q) query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%`);

  if (sort === "cheap") query = query.order("price", { ascending: true });
  else if (sort === "expensive") query = query.order("price", { ascending: false });
  else query = query.order("created_at", { ascending: false });

  const { data, error } = await query;
  const products = (data ?? []) as ProductWithSeller[];

  // 로그인한 사람이면, 이 목록 중 내가 찜해 둔 글을 한 번에 확인합니다.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const likedIds = await fetchLikedProductIds(
    user?.id,
    products.map((p) => p.id),
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      {/* 머리말 */}
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-[2rem] text-ink">
            <PawPrint size={24} className="text-carrot-400" />
            {q ? `"${q}" 검색 결과` : category ? categoryLabel(category) : "만물 구경하기"}
          </h1>
          <p className="mt-1.5 text-sm text-ink-soft">
            {products.length > 0
              ? `${products.length}개의 물건이 주인을 기다리고 있어요.`
              : "조건에 맞는 물건이 아직 없어요."}
          </p>
        </div>

        <Link
          href="/products/new"
          className="btn-squish inline-flex shrink-0 items-center gap-2 btn-primary rounded-xl px-5 py-3 text-[15px] font-bold"
        >
          <SparkleIcon size={18} />내 물건 팔기
        </Link>
      </div>

      <ProductFilters q={q} category={category} sort={sort} />

      {/* 목록 */}
      {error ? (
        <p className="mt-12 rounded-xl border border-berry/30 bg-berry-soft px-4 py-3 text-sm font-medium text-berry-ink">
          목록을 불러오지 못했어요: {error.message}
        </p>
      ) : products.length === 0 ? (
        /* 빈 화면은 두 경우를 나눠서 안내합니다.
           ① 검색·필터 때문에 비었을 때  → 조건을 푸는 버튼을 줘야 해요
           ② 진짜로 물건이 하나도 없을 때 → 올리러 가는 버튼을 줘야 하고요
           이걸 구분 안 하면 "우주선 검색 결과 없음" 화면에서
           엉뚱하게 "물건 올리러 가기" 만 보여 주게 됩니다. */
        <div className="mt-12 rounded-blob border border-dashed border-sand-300 bg-paper px-6 py-16 text-center">
          <CatFace size={104} color="cream" mood="sleepy" className="mx-auto animate-float" />

          {q || category ? (
            <>
              <h2 className="mt-4 text-[1.4rem] text-ink">
                {q ? `"${q}"에 맞는 물건이 없네요` : "이 카테고리는 아직 비어 있어요"}
              </h2>
              <p className="mt-2 text-sm text-ink-soft">
                검색어를 바꾸거나, 전체 목록에서 둘러보세요.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                <Link
                  href="/products"
                  className="btn-squish btn-primary inline-flex rounded-xl px-5 py-3 text-[15px] font-bold"
                >
                  전체 물건 보기
                </Link>
                <Link
                  href="/products/new"
                  className="btn-squish btn-outline inline-flex rounded-xl px-5 py-3 text-[15px] font-bold"
                >
                  내가 올리기
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="mt-4 text-[1.4rem] text-ink">아직 아무것도 없어요</h2>
              <p className="mt-2 text-sm text-ink-soft">
                첫 번째 물건을 올려 주실래요? 뭐든 괜찮아요!
              </p>
              <Link
                href="/products/new"
                className="btn-squish btn-primary mt-6 inline-flex rounded-xl px-5 py-3 text-[15px] font-bold"
              >
                물건 올리러 가기
              </Link>
            </>
          )}
        </div>
      ) : (
        <ul className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.map((p) => (
            <li key={p.id} className="flex">
              <div className="w-full">
                <ProductCard
                  product={p}
                  liked={likedIds.has(p.id)}
                  isLoggedIn={Boolean(user)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
