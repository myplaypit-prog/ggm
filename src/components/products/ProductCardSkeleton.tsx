/**
 * 상품 카드가 오기 전에 미리 깔아 두는 회색 자리.
 *
 * 실제 카드와 크기·간격을 똑같이 맞춰야
 * 내용이 도착했을 때 화면이 덜컥 움직이지 않습니다.
 */
export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-sand-200 bg-paper">
      {/* 사진 자리 */}
      <div className="skeleton aspect-[4/3] w-full" />

      <div className="p-4">
        {/* 카테고리 칩 자리 */}
        <div className="skeleton h-4 w-14 rounded-md" />
        {/* 제목 두 줄 자리 */}
        <div className="skeleton mt-2 h-4 w-full rounded" />
        <div className="skeleton mt-1.5 h-4 w-2/3 rounded" />
        {/* 가격 자리 */}
        <div className="skeleton mt-2.5 h-6 w-24 rounded" />
        {/* 판매자 줄 자리 */}
        <div className="hairline mt-3 flex items-center gap-2 pt-3">
          <div className="skeleton size-5 shrink-0 rounded-full" />
          <div className="skeleton h-3 w-16 rounded" />
          <div className="skeleton ml-auto h-3 w-10 rounded" />
        </div>
      </div>
    </div>
  );
}
