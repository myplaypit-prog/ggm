import { createClient } from "@/lib/supabase/server";

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
