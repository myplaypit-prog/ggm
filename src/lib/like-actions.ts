"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type LikeResult = { ok: boolean; message?: string };

/**
 * 찜하기 / 찜 풀기. (서버에서 실행되는 함수 = 서버 액션)
 *
 * 브라우저가 "이제 찜 상태로 바꿔 줘" 라고 알려 주면 그대로 맞춰 줍니다.
 * 같은 버튼을 두 번 눌러도, 두 탭에서 동시에 눌러도 결과가 같도록
 * "켜기/끄기 토글" 이 아니라 "원하는 상태(nextLiked)" 를 받습니다.
 *
 * 로그인 여부는 반드시 서버에서 다시 확인합니다.
 * 브라우저가 보낸 말은 믿을 수 없거든요.
 */
export async function toggleLikeAction(
  productId: string,
  nextLiked: boolean,
): Promise<LikeResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { ok: false, message: "로그인이 필요해요." };

  if (nextLiked) {
    // 이미 찜해 둔 상태에서 또 눌러도 오류가 나지 않도록 upsert 를 씁니다.
    const { error } = await supabase
      .from("mm_likes")
      .upsert(
        { user_id: user.id, product_id: productId },
        { onConflict: "user_id,product_id", ignoreDuplicates: true },
      );
    if (error) return { ok: false, message: "찜하지 못했어요. 잠시 뒤 다시 해 주세요." };
  } else {
    const { error } = await supabase
      .from("mm_likes")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId);
    if (error) return { ok: false, message: "찜을 풀지 못했어요. 잠시 뒤 다시 해 주세요." };
  }

  // 찜 개수가 보이는 화면들을 새로 그리게 합니다.
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath(`/products/${productId}`);
  revalidatePath("/mypage");

  return { ok: true };
}
