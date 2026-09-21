import Link from "next/link";
import { CATEGORIES, SORTS } from "@/lib/products";
import { SearchIcon, SparkleIcon } from "@/components/Icons";

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
      {/* 검색 — 그냥 GET 폼이라 자바스크립트 없이도 동작합니다.
          입력칸과 버튼을 하나의 둥근 상자 안에 넣어 한 덩어리로 보이게 했어요. */}
      <form
        action="/products"
        method="get"
        className="flex items-center gap-1 rounded-2xl border border-sand-200 bg-paper p-1.5 shadow-soft transition focus-within:border-carrot-400 focus-within:shadow-lift"
      >
        {category && <input type="hidden" name="category" value={category} />}
        {sort !== "recent" && <input type="hidden" name="sort" value={sort} />}
        <span className="pl-3 text-ink-faint">
          <SearchIcon size={19} />
        </span>
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="무엇을 찾고 계세요? (예: 기타, 화분)"
          className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-[15px] text-ink outline-none placeholder:text-ink-faint"
        />
        <button
          type="submit"
          className="btn-squish btn-primary shrink-0 rounded-xl px-5 py-2.5 text-sm font-bold"
        >
          찾기
        </button>
      </form>

      {/* 카테고리 */}
      <div className="flex flex-wrap gap-2">
        <Link
          href={buildHref({ q, sort })}
          className={`btn-squish rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${
            category === ""
              ? "border-carrot-500 bg-carrot-500 text-white"
              : "border-sand-200 bg-paper text-ink hover:border-sand-300 hover:bg-sand-50"
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
            className={`btn-squish rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${
              category === c.key
                ? "border-carrot-500 bg-carrot-500 text-white"
                : "border-sand-200 bg-paper text-ink hover:border-sand-300 hover:bg-sand-50"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      {/* 정렬 — 눌러서 고르는 버튼 묶음(세그먼트) 으로.
          전에는 "최신순 | 낮은 가격순" 처럼 글자만 있어서 눌러도 되는지 몰랐어요. */}
      <div className="flex w-fit items-center gap-0.5 rounded-xl border border-sand-200 bg-sand-50 p-1">
        {SORTS.map((s) => (
          <Link
            key={s.key}
            href={buildHref({ q, category, sort: s.key })}
            aria-current={sort === s.key ? "true" : undefined}
            className={`rounded-lg px-3 py-1.5 text-[13px] font-semibold transition ${
              sort === s.key
                ? "bg-paper text-ink shadow-xs"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {s.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
