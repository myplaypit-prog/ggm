import Link from "next/link";
import {
  categoryChip,
  categoryLabel,
  formatPrice,
  formatRelativeTime,
  likeCount,
  productImageUrl,
  statusBadge,
  statusLabel,
  type ProductWithSeller,
} from "@/lib/products";
import { CatFace, type CatColorKey } from "@/components/CatArtwork";
import { PinIcon } from "@/components/Icons";
import { LikeButton } from "./LikeButton";

export function ProductCard({
  product,
  liked = false,
  isLoggedIn = false,
}: {
  product: ProductWithSeller;
  /** 내가 이 글을 찜해 뒀는지 */
  liked?: boolean;
  isLoggedIn?: boolean;
}) {
  const cover = product.images?.[0];
  const soldOut = product.status === "sold";

  return (
    /* 바깥은 평범한 div, 안쪽만 링크로 둡니다.
       카드 전체를 <a> 로 감싸면 그 안에 하트 <button> 을 넣을 수 없어요.
       (링크 안에 버튼을 넣는 건 HTML 규칙 위반이라 브라우저마다 다르게 동작합니다) */
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-sand-200 bg-paper transition hover:-translate-y-1 hover:border-carrot-300 hover:shadow-lift">
      <Link href={`/products/${product.id}`} className="flex flex-1 flex-col">
        {/* 사진 — 바탕은 중립 회색으로. 주황색 바탕이면 사진 색이 같이 물들어 보여요 */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-100">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={productImageUrl(cover)}
              alt={product.title}
              loading="lazy"
              className={`size-full object-cover transition duration-300 group-hover:scale-105 ${
                soldOut ? "grayscale" : ""
              }`}
            />
          ) : (
            <div className="grid size-full place-items-center">
              <CatFace size={68} color="cream" mood="sleepy" />
            </div>
          )}

          {product.status !== "selling" && (
            <span
              className={`absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${statusBadge(product.status)}`}
            >
              {statusLabel(product.status)}
            </span>
          )}
          {product.images.length > 1 && (
            <span className="absolute left-2.5 bottom-2.5 rounded-full bg-ink/60 px-2 py-0.5 text-[11px] font-bold text-white">
              +{product.images.length - 1}
            </span>
          )}
        </div>

        {/* 내용 */}
        <div className={`flex flex-1 flex-col p-4 ${soldOut ? "opacity-60" : ""}`}>
          <span
            className={`w-fit rounded-md px-1.5 py-0.5 text-[11px] font-bold ${categoryChip(product.category)}`}
          >
            {categoryLabel(product.category)}
          </span>

          <h3 className="mt-2 line-clamp-2 text-[15px] font-semibold leading-snug text-ink">
            {product.title}
          </h3>

          {/* 가격은 화면에서 제일 굵게.
              숫자는 먹색으로 두고, "나눔" 일 때만 오렌지로 눈에 띄게 합니다.
              (가격을 전부 오렌지로 하면 목록이 온통 주황이라 오히려 안 보여요) */}
          <p
            className={`tabular mt-1.5 font-display text-[1.35rem] ${
              product.price === 0 ? "text-carrot-500" : "text-ink"
            }`}
          >
            {formatPrice(product.price)}
          </p>

          {/* 파는 사람 · 동네 · 올린 시각
              좁은 화면(카드 2줄)에서는 셋 다 넣으면 "테..." 처럼 다 잘려서
              아무것도 못 읽습니다. 그래서 닉네임은 넓을 때만 보여 줘요. */}
          <div className="hairline mt-3 flex items-center gap-1.5 pt-3 text-[11px] text-ink-faint">
            <CatFace
              size={20}
              color={(product.seller?.avatar_key ?? "orange") as CatColorKey}
              mood="happy"
              className="shrink-0"
            />
            <span className="hidden truncate font-medium text-ink-soft sm:inline">
              {product.seller?.nickname ?? "만물이"}
            </span>
            <PinIcon size={11} className="shrink-0 sm:ml-0.5" />
            <span className="truncate">{product.region}</span>
            <span className="ml-auto shrink-0 whitespace-nowrap">
              {formatRelativeTime(product.created_at)}
            </span>
          </div>
        </div>
      </Link>

      {/* 찜 하트 — 링크 바깥에 겹쳐 올립니다 */}
      <LikeButton
        productId={product.id}
        initialLiked={liked}
        initialCount={likeCount(product)}
        isLoggedIn={isLoggedIn}
        className="absolute right-2.5 top-2.5 z-10"
      />
    </div>
  );
}
