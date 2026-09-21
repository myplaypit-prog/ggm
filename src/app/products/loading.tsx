import { ProductCardSkeleton } from "@/components/products/ProductCardSkeleton";

/**
 * /products 를 불러오는 동안 잠깐 보이는 화면.
 *
 * 파일 이름을 loading.tsx 로 두면 Next.js 가 알아서
 * "내용을 가져오는 동안" 이 화면을 대신 보여 줍니다.
 */
export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      {/* 머리말 자리 */}
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="skeleton h-9 w-56 rounded-lg" />
          <div className="skeleton mt-2 h-4 w-64 rounded" />
        </div>
        <div className="skeleton h-12 w-36 rounded-xl" />
      </div>

      {/* 검색 · 필터 자리 */}
      <div className="grid gap-4">
        <div className="skeleton h-14 w-full rounded-2xl" />
        <div className="flex flex-wrap gap-2">
          {[64, 80, 72, 110, 88, 84, 84, 84, 96].map((w, i) => (
            <div key={i} className="skeleton h-8 rounded-full" style={{ width: w }} />
          ))}
        </div>
        <div className="skeleton h-10 w-56 rounded-xl" />
      </div>

      {/* 카드 자리 8개 */}
      <ul className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i}>
            <ProductCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}
