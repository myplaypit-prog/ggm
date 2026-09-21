import { setProductStatusAction } from "@/lib/product-actions";
import { STATUSES } from "@/lib/products";

/**
 * 판매 상태 바꾸기 (판매중 / 예약중 / 판매완료).
 *
 * 버튼마다 폼을 따로 둡니다.
 * 처음에는 폼 하나에 버튼 3개를 넣고 버튼의 value 로 구분하려 했는데,
 * 서버 액션(폼을 제출하면 서버에서 실행되는 함수)에는
 * "눌린 버튼의 값"이 전달되지 않아서 상태가 안 바뀌었어요.
 * 그래서 각 폼이 자기 값을 hidden 으로 들고 가도록 바꿨습니다.
 */
export function StatusSelect({ id, current }: { id: string; current: string }) {
  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-ink">판매 상태 바꾸기</span>
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => {
          const on = s.key === current;
          return (
            <form key={s.key} action={setProductStatusAction}>
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="status" value={s.key} />
              <button
                type="submit"
                disabled={on}
                className={`btn-squish rounded-2xl border px-4 py-2 text-sm font-bold transition ${
                  on
                    ? "cursor-default border-carrot-500 bg-carrot-50 text-carrot-700"
                    : "border-sand-200 bg-paper text-ink-soft hover:border-carrot-300"
                }`}
              >
                {s.label}
              </button>
            </form>
          );
        })}
      </div>
    </div>
  );
}
