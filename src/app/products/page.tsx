import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  CATEGORY_KEYS,
  categoryLabel,
  type ProductWithSeller,
} from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { CatFace, PawPrint } from "@/components/CatMascot";
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
    .select("*, seller:mm_profiles(id, nickname, avatar_key, region)")
    .limit(PAGE_SIZE);

  if (category) query = query.eq("category", category);
  if (q) query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%`);

  if (sort === "cheap") query = query.order("price", { ascending: true });
  else if (sort === "expensive") query = query.order("price", { ascending: false });
  else query = query.order("created_at", { ascending: false });

  const { data, error } = await query;
  const products = (data ?? []) as ProductWithSeller[];

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      {/* 머리말 */}
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 font-display text-3xl text-ink">
            <PawPrint size={26} className="text-carrot-400" />
            {category ? categoryLabel(category) : "만물 구경하기"}
          </h1>
          <p className="mt-1.5 text-sm text-ink-soft">
            {q ? `"${q}" 검색 결과 ` : ""}
            지금 {products.length}개의 물건이 주인을 기다리고 있어요.
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
        <div className="mt-12 rounded-blob border border-dashed border-sand-200 bg-paper/70 px-6 py-16 text-center">
          <CatFace size={110} color="cream" mood="sleepy" className="mx-auto animate-float" />
          <h2 className="mt-4 font-display text-2xl text-ink">아직 아무것도 없어요</h2>
          <p className="mt-2 text-sm text-ink-soft">
            {q || category
              ? "다른 조건으로 찾아보시겠어요?"
              : "첫 번째 물건을 올려 주실래요? 뭐든 괜찮아요!"}
          </p>
          <Link
            href="/products/new"
            className="btn-squish mt-6 inline-flex btn-primary rounded-xl px-5 py-3 text-[15px] font-bold"
          >
            물건 올리러 가기
          </Link>
        </div>
      ) : (
        <ul className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.map((p) => (
            <li key={p.id} className="flex">
              <div className="w-full">
                <ProductCard product={p} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
