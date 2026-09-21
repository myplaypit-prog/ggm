"use client";

import { useActionState } from "react";
import { signInAction } from "@/lib/auth-actions";
import { initialAuthState } from "@/lib/auth-state";
import { Notice } from "@/components/AuthShell";
import { TextField } from "@/components/TextField";
import { PasswordField } from "@/components/PasswordField";
import { SubmitButton } from "@/components/SubmitButton";
import { CatFace } from "@/components/CatMascot";
import { AlertIcon, CheckIcon, MailIcon } from "@/components/Icons";

export function LoginForm({ next, justVerified }: { next: string; justVerified: boolean }) {
  const [state, formAction] = useActionState(signInAction, initialAuthState);

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <CatFace size={54} color="orange" mood="wink" className="shrink-0" />
        <div>
          <h2 className="font-display text-2xl text-ink">다시 만나서 반가워요!</h2>
          <p className="text-sm text-ink-soft">이메일로 로그인해 주세요.</p>
        </div>
      </div>

      {justVerified && (
        <Notice tone="success" icon={<CheckIcon size={18} />}>
          이메일 인증이 끝났어요. 이제 로그인할 수 있어요!
        </Notice>
      )}

      {state.status === "error" && (
        <Notice tone="error" icon={<AlertIcon size={18} />}>
          {state.message}
        </Notice>
      )}

      {/* key 를 바꿔서 폼을 다시 그리면, 제출 후에도 입력값(state.values)이 되살아납니다 */}
      <form key={state.attempt} action={formAction} className="grid gap-4">
        <input type="hidden" name="next" value={next} />

        <TextField
          label="이메일"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="manmul@example.com"
          icon={<MailIcon size={19} />}
          defaultValue={state.values.email ?? ""}
          error={state.fieldErrors.email}
          required
        />

        <PasswordField
          label="비밀번호"
          name="password"
          placeholder="••••••••"
          autoComplete="current-password"
          error={state.fieldErrors.password}
        />

        <SubmitButton pendingLabel="문 여는 중...">로그인하기</SubmitButton>
      </form>
    </>
  );
}
