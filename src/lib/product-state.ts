/**
 * 거래 글 폼이 주고받는 상태.
 * "use server" 파일에서는 async 함수만 export 할 수 있어서 따로 빼 둡니다.
 */
export type ProductFormState = {
  status: "idle" | "error";
  message: string;
  fieldErrors: Record<string, string>;
  /** 제출 횟수 — 폼을 다시 그려 입력값을 되살리는 데 씁니다 */
  attempt: number;
};

export const initialProductFormState: ProductFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  attempt: 0,
};
