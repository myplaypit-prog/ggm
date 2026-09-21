/**
 * 인증 폼이 주고받는 상태.
 *
 * "use server" 파일에서는 async 함수만 export 할 수 있어서,
 * 상수와 타입은 이렇게 따로 빼 둡니다.
 */
export type AuthState = {
  status: "idle" | "error" | "email-sent";
  message: string;
  fieldErrors: Record<string, string>;
  /** 입력값 유지용 (비밀번호는 담지 않습니다) */
  values: Record<string, string>;
  /** 제출 횟수 — 폼을 다시 그려 입력값을 되살리는 데 씁니다 */
  attempt: number;
};

export const initialAuthState: AuthState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  values: {},
  attempt: 0,
};
