import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/products";
import { ProductForm } from "@/components/products/ProductForm";
import { CatFace } from "@/components/CatMascot";

export const metadata: Metadata = { title: "글 수정 · 만물마켓" };

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/login?next=/products/${id}/edit`);

  const { data } = await supabase.from("mm_products").select("*").eq("id", id).maybeSingle();
  const product = data as Product | null;

  if (!product) notFound();

  // 남의 글은 고칠 수 없습니다. (DB 의 RLS 도 한 번 더 막아 줍니다)
  if (product.seller_id !== user.id) {
    return (
      <div className="mx-auto max-w-md px-5 py-20 text-center">
        <CatFace size={120} color="gray" mood="sleepy" className="mx-auto animate-wiggle" />
        <h1 className="mt-5 font-display text-3xl text-ink">내 글이 아니에요</h1>
        <p className="mt-3 text-[15px] text-ink-soft">내가 올린 글만 수정할 수 있어요.</p>
        <Link
          href={`/products/${id}`}
          className="btn-squish mt-7 inline-flex rounded-2xl btn-primary px-5 py-3 font-display text-lg"
        >
          글 보러 가기
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <div className="mb-7 flex items-center gap-3">
        <CatFace size={64} color="green" mood="wink" className="shrink-0" />
        <div>
          <h1 className="font-display text-3xl text-ink">글 고치기</h1>
          <p className="mt-1 text-sm text-ink-soft">바뀐 내용만 손보면 돼요.</p>
        </div>
      </div>

      <div className="card-soft p-6 sm:p-8">
        <ProductForm mode="edit" userId={user.id} product={product} />
      </div>
    </div>
  );
}
