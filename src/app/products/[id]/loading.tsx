/**
 * 상품 상세를 불러오는 동안 잠깐 보이는 화면.
 * 실제 화면과 같은 자리에 회색 상자를 깔아 둡니다.
 */
export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="skeleton h-5 w-40 rounded" />

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        {/* 사진 자리 */}
        <div className="skeleton aspect-[4/3] w-full rounded-blob" />

        {/* 구매 패널 자리 */}
        <div className="card-soft h-fit p-6 sm:p-7">
          <div className="flex gap-2">
            <div className="skeleton h-6 w-16 rounded-full" />
            <div className="skeleton h-6 w-14 rounded-full" />
            <div className="skeleton h-6 w-20 rounded-full" />
          </div>
          <div className="skeleton mt-4 h-7 w-3/4 rounded" />
          <div className="skeleton mt-3 h-10 w-44 rounded" />
          <div className="skeleton mt-3 h-4 w-40 rounded" />

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-sand-200 bg-sand-50 px-4 py-3.5">
            <div className="skeleton size-12 shrink-0 rounded-2xl" />
            <div className="flex-1">
              <div className="skeleton h-4 w-24 rounded" />
              <div className="skeleton mt-2 h-3 w-16 rounded" />
            </div>
          </div>

          <div className="mt-6 flex gap-2.5">
            <div className="skeleton h-12 flex-1 rounded-xl" />
            <div className="skeleton h-12 w-20 rounded-xl" />
          </div>
        </div>
      </div>

      {/* 설명 자리 */}
      <div className="mt-10 max-w-2xl">
        <div className="skeleton h-6 w-24 rounded" />
        <div className="skeleton mt-3 h-4 w-full rounded" />
        <div className="skeleton mt-2 h-4 w-5/6 rounded" />
        <div className="skeleton mt-2 h-4 w-2/3 rounded" />
      </div>
    </div>
  );
}
