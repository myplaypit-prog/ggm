"use client";

import { useState } from "react";
import { deleteProductAction } from "@/lib/product-actions";
import { CatFace } from "@/components/CatMascot";

/**
 * 두 번 눌러야 지워지는 삭제 버튼.
 * 브라우저 기본 confirm 대신 고양이가 한 번 더 물어봅니다.
 */
export function DeleteProductButton({ id }: { id: string }) {
  const [asking, setAsking] = useState(false);

  if (!asking) {
    return (
      <button
        type="button"
        onClick={() => setAsking(true)}
        className="btn-squish rounded-2xl border border-berry/40 bg-paper px-4 py-2.5 text-sm font-bold text-berry-ink transition hover:bg-berry-soft"
      >
        삭제
      </button>
    );
  }

  return (
    <div className="flex w-full items-center gap-3 rounded-xl border border-berry/30 bg-berry-soft px-4 py-3">
      <CatFace size={36} color="gray" mood="sleepy" className="shrink-0" />
      <p className="text-sm font-medium text-berry-ink">정말 지울까요? 사진도 같이 사라져요.</p>
      <div className="ml-auto flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => setAsking(false)}
          className="btn-squish rounded-xl border border-sand-200 bg-paper px-3 py-1.5 text-sm font-medium text-ink-soft"
        >
          아니요
        </button>
        <form action={deleteProductAction}>
          <input type="hidden" name="id" value={id} />
          <button
            type="submit"
            className="btn-squish rounded-xl bg-berry px-3 py-1.5 text-sm font-bold text-white"
          >
            네, 지울게요
          </button>
        </form>
      </div>
    </div>
  );
}
