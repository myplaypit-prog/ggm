import { createClient } from "@/lib/supabase/server";
import { PRODUCT_SELECT, type ProductWithSeller } from "@/lib/products";

/**
 * "이 목록 중에서 내가 찜해 둔 글이 뭐지?" 를 한 번에 물어봅니다.
 *
 * 카드 하나하나가 따로 물어보면 글이 12개일 때 질문도 12번이라 느려요.
 * 그래서 화면에서 한 번만 불러 두고, 각 카드에는 그 결과(Set)를 나눠 줍니다.
 *
 * 로그인하지 않았으면 빈 목록을 돌려줍니다. (찜한 게 있을 리 없으니까요)
 */
export async function fetchLikedProductIds(
  userId: string | undefined,
  productIds: string[],
): Promise<Set<string>> {
  if (!userId || productIds.length === 0) return new Set();

  const supabase = await createClient();
  const { data } = await supabase
    .from("mm_likes")
    .select("product_id")
    .eq("user_id", userId)
    .in("product_id", productIds);

  return new Set((data ?? []).map((row) => row.product_id as string));
}

/**
 * 내가 찜한 물건들을 "최근에 찜한 순서" 로 가져옵니다.
 *
 * 한 번에 물어보지 않고 두 번에 나눠 묻습니다.
 *   ① 내가 찜한 글 번호를 최신순으로 (mm_likes)
 *   ② 그 번호에 해당하는 글 내용을 (mm_products)
 * 한 번에 물어볼 수도 있지만 질문이 복잡해져서,
 * 나중에 읽기 쉬운 쪽을 골랐습니다.
 *
 * ②는 번호만 주면 순서를 지켜 주지 않기 때문에,
 * 받아온 뒤 ①의 순서대로 다시 줄을 세웁니다.
 */
export async function fetchMyLikedProducts(
  userId: string,
  limit = 24,
): Promise<ProductWithSeller[]> {
  const supabase = await createClient();

  const { data: likeRows } = await supabase
    .from("mm_likes")
    .select("product_id")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  const orderedIds = (likeRows ?? []).map((row) => row.product_id as string);
  if (orderedIds.length === 0) return [];

  const { data: productRows } = await supabase
    .from("mm_products")
    .select(PRODUCT_SELECT)
    .in("id", orderedIds);

  const products = (productRows ?? []) as ProductWithSeller[];
  const byId = new Map(products.map((p) => [p.id, p]));

  // 찜한 순서대로 다시 정렬 (중간에 지워진 글은 빠집니다)
  return orderedIds
    .map((id) => byId.get(id))
    .filter((p): p is ProductWithSeller => Boolean(p));
}
