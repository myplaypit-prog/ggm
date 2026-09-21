import Link from "next/link";
import { CATEGORIES, SORTS } from "@/lib/products";
import { SparkleIcon } from "@/components/Icons";

/** 현재 선택을 유지하면서 일부만 바꾼 /products 링크를 만듭니다. */
function buildHref(base: { q?: string; category?: string; sort?: string }) {
  const params = new URLSearchParams();
  if (base.q) params.set("q", base.q);
  if (base.category) params.set("category", base.category);
  if (base.sort && base.sort !== "recent") params.set("sort", base.sort);
  const qs = params.toString();
  return qs ? `/products?${qs}` : "/products";
}

export function ProductFilters({
  q = "",
  category = "",
  sort = "recent",
}: {
  q?: string;
  category?: string;
  sort?: string;
}) {
  return (
    <div className="grid gap-4">
      {/* 검색 — 그냥 GET 폼이라 자바스크립트 없이도 동작합니다 */}
      <form action="/products" method="get" className="flex gap-2">
        {category && <input type="hidden" name="category" value={category} />}
        {sort !== "recent" && <input type="hidden" name="sort" value={sort} />}
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="무엇을 찾고 계세요? (예: 기타, 화분)"
          className="field"
        />
        <button
          type="submit"
          className="btn-squish btn-primary shrink-0 rounded-xl px-5 text-[15px] font-bold"
        >
          찾기
        </button>
      </form>

      {/* 카테고리 */}
      <div className="flex flex-wrap gap-2">
        <Link
          href={buildHref({ q, sort })}
          className={`rounded-full border px-3.5 py-1.5 text-sm font-bold transition ${
            category === ""
              ? "border-carrot-500 bg-carrot-500 text-white"
              : "border-sand-200 bg-paper text-ink-soft hover:border-carrot-300"
          }`}
        >
          <span className="inline-flex items-center gap-1">
            <SparkleIcon size={14} />
            전체
          </span>
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.key}
            href={buildHref({ q, sort, category: c.key })}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-bold transition ${
              category === c.key
                ? "border-carrot-500 bg-carrot-500 text-white"
                : "border-sand-200 bg-paper text-ink-soft hover:border-carrot-300"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      {/* 정렬 */}
      <div className="flex flex-wrap items-center gap-1 text-sm">
        {SORTS.map((s, i) => (
          <span key={s.key} className="flex items-center">
            {i > 0 && <span className="px-1.5 text-carrot-200">|</span>}
            <Link
              href={buildHref({ q, category, sort: s.key })}
              className={
                sort === s.key
                  ? "font-bold text-carrot-700 underline decoration-carrot-300 decoration-2 underline-offset-4"
                  : "text-ink-soft hover:text-carrot-600"
              }
            >
              {s.label}
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
}
