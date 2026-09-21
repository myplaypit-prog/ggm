"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ProductFormState } from "@/lib/product-state";
import {
  CATEGORY_KEYS,
  CONDITION_KEYS,
  MAX_IMAGES,
  PRODUCT_BUCKET,
  STATUS_KEYS,
} from "@/lib/products";

/* ------------------------------------------------------------------ */
/* 공통                                                                 */
/* ------------------------------------------------------------------ */

type ParsedForm = {
  values: {
    title: string;
    description: string;
    price: number;
    category: string;
    condition: string;
    status: string;
    region: string;
    images: string[];
  };
  fieldErrors: Record<string, string>;
};

/** 폼 값을 읽고 검사합니다. userId 는 이미지 경로가 내 폴더인지 확인하는 데 씁니다. */
function parseProductForm(formData: FormData, userId: string): ParsedForm {
  const fieldErrors: Record<string, string> = {};

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "").replace(/[^0-9]/g, "");
  const category = String(formData.get("category") ?? "");
  const condition = String(formData.get("condition") ?? "used");
  const status = String(formData.get("status") ?? "selling");
  const region = String(formData.get("region") ?? "").trim();

  // 내 폴더에 올라간 파일만 인정합니다 (남의 경로를 끼워 넣지 못하도록)
  const images = formData
    .getAll("images")
    .map((v) => String(v))
    .filter((p) => p.startsWith(`${userId}/`))
    .slice(0, MAX_IMAGES);

  if (title.length < 2 || title.length > 60) {
    fieldErrors.title = "제목은 2~60자로 적어 주세요.";
  }
  if (description.length > 2000) {
    fieldErrors.description = "설명은 2000자까지 쓸 수 있어요.";
  }

  const price = priceRaw === "" ? NaN : Number(priceRaw);
  if (Number.isNaN(price)) {
    fieldErrors.price = "가격을 숫자로 적어 주세요. (나눔이면 0)";
  } else if (price > 1_000_000_000) {
    fieldErrors.price = "가격이 너무 커요.";
  }

  if (!(CATEGORY_KEYS as string[]).includes(category)) {
    fieldErrors.category = "카테고리를 골라 주세요.";
  }
  if (!(CONDITION_KEYS as string[]).includes(condition)) {
    fieldErrors.condition = "상품 상태를 골라 주세요.";
  }

  return {
    values: {
      title,
      description,
      price: Number.isNaN(price) ? 0 : price,
      category,
      condition,
      status: (STATUS_KEYS as string[]).includes(status) ? status : "selling",
      region,
      images,
    },
    fieldErrors,
  };
}

function fail(
  prev: ProductFormState,
  message: string,
  fieldErrors: Record<string, string> = {},
): ProductFormState {
  return { status: "error", message, fieldErrors, attempt: prev.attempt + 1 };
}

/* ------------------------------------------------------------------ */
/* 등록 (Create)                                                        */
/* ------------------------------------------------------------------ */
export async function createProductAction(
  prev: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return fail(prev, "로그인이 풀렸어요. 다시 로그인해 주세요.");

  const { values, fieldErrors } = parseProductForm(formData, user.id);
  if (Object.keys(fieldErrors).length > 0) {
    return fail(prev, "입력값을 다시 확인해 주세요.", fieldErrors);
  }

  // 동네를 비워 두면 내 프로필의 동네를 씁니다.
  let region = values.region;
  if (!region) {
    const { data: profile } = await supabase
      .from("mm_profiles")
      .select("region")
      .eq("id", user.id)
      .maybeSingle();
    region = profile?.region ?? "우리동네";
  }

  const { data, error } = await supabase
    .from("mm_products")
    .insert({ ...values, region, seller_id: user.id })
    .select("id")
    .single();

  if (error) return fail(prev, `글을 올리지 못했어요: ${error.message}`);

  revalidatePath("/products");
  revalidatePath("/");
  redirect(`/products/${data.id}?created=1`);
}

/* ------------------------------------------------------------------ */
/* 수정 (Update)                                                        */
/* ------------------------------------------------------------------ */
export async function updateProductAction(
  prev: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const id = String(formData.get("id") ?? "");
  if (!id) return fail(prev, "어떤 글을 고칠지 알 수 없어요.");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return fail(prev, "로그인이 풀렸어요. 다시 로그인해 주세요.");

  const { values, fieldErrors } = parseProductForm(formData, user.id);
  if (Object.keys(fieldErrors).length > 0) {
    return fail(prev, "입력값을 다시 확인해 주세요.", fieldErrors);
  }

  // RLS 가 남의 글 수정을 막아 주지만, 0건 수정도 오류로 알려 줍니다.
  const { data, error } = await supabase
    .from("mm_products")
    .update({ ...values, region: values.region || "우리동네" })
    .eq("id", id)
    .eq("seller_id", user.id)
    .select("id")
    .maybeSingle();

  if (error) return fail(prev, `글을 고치지 못했어요: ${error.message}`);
  if (!data) return fail(prev, "내가 쓴 글만 고칠 수 있어요.");

  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
  revalidatePath("/");
  redirect(`/products/${id}?updated=1`);
}

/* ------------------------------------------------------------------ */
/* 삭제 (Delete)                                                        */
/* ------------------------------------------------------------------ */
export async function deleteProductAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) redirect("/products");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/products");

  // 올렸던 사진도 같이 지웁니다.
  const { data: product } = await supabase
    .from("mm_products")
    .select("images")
    .eq("id", id)
    .eq("seller_id", user.id)
    .maybeSingle();

  const images: string[] = product?.images ?? [];
  if (images.length > 0) {
    await supabase.storage.from(PRODUCT_BUCKET).remove(images);
  }

  await supabase.from("mm_products").delete().eq("id", id).eq("seller_id", user.id);

  revalidatePath("/products");
  revalidatePath("/mypage");
  revalidatePath("/");
  redirect("/mypage?deleted=1");
}

/* ------------------------------------------------------------------ */
/* 판매 상태만 바꾸기 (판매중 / 예약중 / 판매완료)                        */
/* ------------------------------------------------------------------ */
export async function setProductStatusAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!id || !(STATUS_KEYS as string[]).includes(status)) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("mm_products")
    .update({ status })
    .eq("id", id)
    .eq("seller_id", user.id);

  revalidatePath(`/products/${id}`);
  revalidatePath("/products");
  revalidatePath("/mypage");
}
