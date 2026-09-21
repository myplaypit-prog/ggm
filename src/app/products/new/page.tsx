import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/products/ProductForm";
import { CatFace } from "@/components/CatMascot";

export const metadata: Metadata = { title: "물건 팔기 · 만물마켓" };

export default async function NewProductPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/products/new");

  const { data: profile } = await supabase
    .from("mm_profiles")
    .select("region")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <div className="mb-7 flex items-center gap-3">
        <CatFace size={64} color="orange" mood="wow" className="shrink-0 animate-wiggle" />
        <div>
          <h1 className="font-display text-3xl text-ink">뭘 팔아 볼까요?</h1>
          <p className="mt-1 text-sm text-ink-soft">
            만물마켓이니까 정말 아무거나 괜찮아요.
          </p>
        </div>
      </div>

      <div className="card-soft p-6 sm:p-8">
        <ProductForm mode="create" userId={user.id} defaultRegion={profile?.region ?? ""} />
      </div>
    </div>
  );
}
