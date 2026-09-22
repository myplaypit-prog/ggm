"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleLikeAction } from "@/lib/like-actions";
import { HeartIcon } from "@/components/Icons";

type Props = {
  productId: string;
  /** 내가 이미 찜했는지 */
  initialLiked: boolean;
  /** 지금까지 몇 명이 찜했는지 */
  initialCount: number;
  isLoggedIn: boolean;
  /** compact = 카드 사진 위 작은 하트 / full = 상세 페이지의 큰 버튼 */
  variant?: "compact" | "full";
  className?: string;
};

/**
 * 찜하기(= 좋아요) 버튼.
 *
 * 누르면 서버 응답을 기다리지 않고 화면부터 먼저 바꿉니다.
 * 기다렸다 바뀌면 "안 눌렸나?" 싶어 두 번 누르게 되거든요.
 * 만약 서버에서 실패하면 원래대로 되돌립니다.
 */
export function LikeButton({
  productId,
  initialLiked,
  initialCount,
  isLoggedIn,
  variant = "compact",
  className = "",
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [error, setError] = useState("");

  function handleClick(e: React.MouseEvent) {
    // 카드 전체가 링크라서, 하트를 눌렀을 때 상세로 넘어가지 않게 막습니다.
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      router.push("/login?next=/products");
      return;
    }

    const next = !liked;
    // ① 화면 먼저 바꾸고
    setLiked(next);
    setCount((c) => Math.max(0, c + (next ? 1 : -1)));
    setError("");

    // ② 서버에 알립니다. 실패하면 되돌려요.
    startTransition(async () => {
      const result = await toggleLikeAction(productId, next);
      if (!result.ok) {
        setLiked(!next);
        setCount((c) => Math.max(0, c + (next ? -1 : 1)));
        setError(result.message ?? "잠시 뒤 다시 해 주세요.");
      }
    });
  }

  const label = liked ? "찜 풀기" : "찜하기";

  if (variant === "full") {
    return (
      <div className={className}>
        <button
          type="button"
          onClick={handleClick}
          disabled={pending}
          aria-pressed={liked}
          className={`btn-squish flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-3.5 text-[15px] font-bold transition ${
            liked
              ? "border-berry/40 bg-berry-soft text-berry-ink"
              : "border-sand-300 bg-paper text-ink hover:bg-sand-50"
          }`}
        >
          <HeartIcon size={19} fill={liked ? "currentColor" : "none"} />
          {label}
          {count > 0 && <span className="tabular font-bold">{count}</span>}
        </button>
        {error && <p className="mt-1.5 text-xs font-semibold text-berry-ink">{error}</p>}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      aria-pressed={liked}
      aria-label={`${label}${count > 0 ? ` (지금 ${count}명)` : ""}`}
      title={label}
      className={`btn-squish flex items-center gap-1 rounded-full bg-paper/90 py-1 pl-1.5 pr-2 text-[11px] font-bold shadow-soft backdrop-blur transition hover:bg-paper ${
        liked ? "text-berry" : "text-ink-soft"
      } ${className}`}
    >
      <HeartIcon size={15} fill={liked ? "currentColor" : "none"} />
      <span className="tabular">{count}</span>
    </button>
  );
}
