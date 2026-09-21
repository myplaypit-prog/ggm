import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  categoryChip,
  categoryLabel,
  conditionLabel,
  formatPrice,
  formatRelativeTime,
  statusBadge,
  statusLabel,
  type ProductWithSeller,
} from "@/lib/products";
import { ProductGallery } from "@/components/products/ProductGallery";
import { StatusSelect } from "@/components/products/StatusSelect";
import { DeleteProductButton } from "@/components/products/DeleteProductButton";
import { ProductCard } from "@/components/products/ProductCard";
import { CatFace, PawPrint, type CatColorKey } from "@/components/CatMascot";
import { ChatIcon, CheckIcon, HeartIcon, PinIcon, SparkleIcon } from "@/components/Icons";

const SELECT = "*, seller:mm_profiles(id, nickname, avatar_key, region)";

async function getProduct(id: string) {
  const supabase = await createClient();
  const { data } = await supabase.from("mm_products").select(SELECT).eq("id", id).maybeSingle();
  return (data as ProductWithSeller | null) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  return { title: product ? `${product.title} · 만물마켓` : "없는 글 · 만물마켓" };
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string; updated?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase.from("mm_products").select(SELECT).eq("id", id).maybeSingle();
  const product = data as ProductWithSeller | null;

  if (!product) notFound();

  const isOwner = user?.id === product.seller_id;

  // 같은 판매자의 다른 물건
  const { data: others } = await supabase
    .from("mm_products")
    .select(SELECT)
    .eq("seller_id", product.seller_id)
    .neq("id", product.id)
    .order("created_at", { ascending: false })
    .limit(4);

  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      {(sp.created === "1" || sp.updated === "1") && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border-2 border-leaf-200 bg-leaf-50 px-4 py-3 text-sm font-medium text-leaf-800">
          <CheckIcon size={20} className="shrink-0" />
          {sp.created === "1"
            ? "글을 올렸어요! 좋은 주인을 만나길 바랄게요 🐾"
            : "수정했어요."}
        </div>
      )}

      <Link
        href="/products"
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-carrot-600"
      >
        ← 만물 구경하기로 돌아가기
      </Link>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <ProductGallery images={product.images} title={product.title} />

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-bold ${categoryChip(product.category)}`}
            >
              {categoryLabel(product.category)}
            </span>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusBadge(product.status)}`}
            >
              {statusLabel(product.status)}
            </span>
            <span className="rounded-full border-2 border-sand-200 px-2.5 py-0.5 text-xs font-bold text-ink-soft">
              {conditionLabel(product.condition)}
            </span>
          </div>

          <h1 className="mt-3 font-display text-3xl leading-snug text-ink">{product.title}</h1>

          <p className="mt-2 font-display text-4xl text-carrot-600">
            {formatPrice(product.price)}
          </p>

          <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft">
            <PinIcon size={15} />
            {product.region}
            <span className="text-ink-soft/50">·</span>
            {formatRelativeTime(product.created_at)}
          </p>

          {/* 판매자 */}
          <div className="mt-6 flex items-center gap-3 rounded-3xl border-2 border-sand-200 bg-paper px-4 py-3.5">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-carrot-50">
              <CatFace
                size={40}
                color={(product.seller?.avatar_key ?? "orange") as CatColorKey}
                mood="happy"
              />
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-lg text-ink">
                {product.seller?.nickname ?? "만물이"}
              </p>
              <p className="truncate text-xs text-ink-soft">{product.seller?.region}</p>
            </div>
            {isOwner && (
              <span className="ml-auto shrink-0 rounded-full bg-leaf-100 px-2.5 py-1 text-[11px] font-bold text-leaf-700">
                내 글
              </span>
            )}
          </div>

          {/* 설명 */}
          <div className="mt-6">
            <h2 className="mb-2 font-display text-xl text-ink">상품 설명</h2>
            {product.description ? (
              <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-ink">
                {product.description}
              </p>
            ) : (
              <p className="text-sm text-ink-soft">설명 없이 올라온 물건이에요.</p>
            )}
          </div>

          {/* 조작 영역 */}
          <div className="mt-8">
            {isOwner ? (
              <div className="grid gap-4 rounded-3xl border-2 border-dashed border-sand-200 bg-carrot-50/60 p-5">
                <StatusSelect id={product.id} current={product.status} />
                <div className="flex flex-wrap gap-2.5">
                  <Link
                    href={`/products/${product.id}/edit`}
                    className="btn-squish rounded-2xl btn-primary px-5 py-2.5 text-sm font-bold"
                  >
                    글 수정하기
                  </Link>
                  <DeleteProductButton id={product.id} />
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  disabled
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-carrot-500/50 px-5 py-3.5 font-display text-lg text-white"
                  title="다음 단계에서 만들 기능이에요"
                >
                  <ChatIcon size={19} />
                  채팅하기 (준비 중)
                </button>
                <button
                  type="button"
                  disabled
                  className="flex items-center justify-center gap-2 rounded-2xl border-2 border-sand-200 bg-paper px-5 py-3.5 font-display text-lg text-ink-soft/60"
                  title="다음 단계에서 만들 기능이에요"
                >
                  <HeartIcon size={19} />찜
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 같은 판매자의 다른 물건 */}
      {others && others.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 flex items-center gap-2 font-display text-2xl text-ink">
            <PawPrint size={22} className="text-carrot-400" />
            {product.seller?.nickname}님의 다른 물건
          </h2>
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {(others as ProductWithSeller[]).map((p) => (
              <li key={p.id} className="flex">
                <div className="w-full">
                  <ProductCard product={p} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {!user && (
        <div className="mt-14 flex flex-col items-center gap-3 rounded-blob border-2 border-leaf-200 bg-leaf-50 px-6 py-8 text-center">
          <CatFace size={72} color="green" mood="wink" />
          <p className="font-display text-xl text-leaf-800">
            가입하면 나도 물건을 올릴 수 있어요
          </p>
          <Link
            href="/signup"
            className="btn-squish inline-flex items-center gap-2 rounded-2xl btn-primary px-5 py-3 font-display text-lg"
          >
            <SparkleIcon size={18} />
            회원가입하기
          </Link>
        </div>
      )}
    </div>
  );
}
