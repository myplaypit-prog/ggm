import Link from "next/link";
import {
  categoryChip,
  categoryLabel,
  formatPrice,
  formatRelativeTime,
  productImageUrl,
  statusBadge,
  statusLabel,
  type ProductWithSeller,
} from "@/lib/products";
import { CatFace, type CatColorKey } from "@/components/CatMascot";
import { PinIcon } from "@/components/Icons";

export function ProductCard({ product }: { product: ProductWithSeller }) {
  const cover = product.images?.[0];
  const soldOut = product.status === "sold";

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-sand-200 bg-paper transition hover:-translate-y-1 hover:border-carrot-300 hover:shadow-lift"
    >
      {/* 사진 */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-carrot-50">
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
          <span className="absolute right-2.5 top-2.5 rounded-full bg-ink/60 px-2 py-0.5 text-[11px] font-bold text-white">
            +{product.images.length - 1}
          </span>
        )}
      </div>

      {/* 내용 */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span
          className={`w-fit rounded-full px-2 py-0.5 text-[11px] font-bold ${categoryChip(product.category)}`}
        >
          {categoryLabel(product.category)}
        </span>

        <h3 className="line-clamp-2 text-[15px] font-medium leading-snug text-ink">
          {product.title}
        </h3>

        <p className="font-display text-xl text-carrot-600">{formatPrice(product.price)}</p>

        <div className="mt-auto flex items-center gap-1.5 pt-2 text-xs text-ink-soft">
          <CatFace
            size={22}
            color={(product.seller?.avatar_key ?? "orange") as CatColorKey}
            mood="happy"
            className="shrink-0"
          />
          <span className="truncate">{product.seller?.nickname ?? "만물이"}</span>
          <span className="text-ink-soft/50">·</span>
          <PinIcon size={12} className="shrink-0" />
          <span className="truncate">{product.region}</span>
          <span className="ml-auto shrink-0">{formatRelativeTime(product.created_at)}</span>
        </div>
      </div>
    </Link>
  );
}
