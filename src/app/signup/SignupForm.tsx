"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUpAction } from "@/lib/auth-actions";
import { initialAuthState } from "@/lib/auth-state";
import { Notice } from "@/components/AuthShell";
import { TextField } from "@/components/TextField";
import { PasswordField } from "@/components/PasswordField";
import { SubmitButton } from "@/components/SubmitButton";
import { AvatarPicker } from "@/components/AvatarPicker";
import { CatFace, type CatColorKey } from "@/components/CatMascot";
import { AlertIcon, MailIcon, PinIcon, UserIcon } from "@/components/Icons";

export function SignupForm() {
  const [state, formAction] = useActionState(signUpAction, initialAuthState);

  // 인증 메일을 보냈다면 폼 대신 안내 화면을 보여 줍니다.
  if (state.status === "email-sent") {
    return (
      <div className="py-4 text-center">
        <span className="inline-block animate-float">
          <CatFace size={110} color="orange" mood="wow" />
        </span>
        <h2 className="mt-4 font-display text-2xl text-ink">메일함을 확인해 주세요!</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{state.message}</p>
        <div className="mt-6 rounded-2xl border-2 border-dashed border-carrot-200 bg-carrot-50 px-4 py-3 text-xs leading-relaxed text-ink-soft">
          메일이 안 보이면 스팸함도 한 번 열어 보세요. 링크를 누르면 만물마켓으로 다시 돌아와요.
        </div>
        <Link
          href="/login"
          className="btn-squish mt-6 inline-flex rounded-2xl border-2 border-carrot-300 bg-paper px-5 py-3 font-display text-lg text-carrot-700"
        >
          로그인하러 가기
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <CatFace size={54} color="calico" mood="happy" className="shrink-0" />
        <div>
          <h2 className="font-display text-2xl text-ink">만물마켓 시작하기</h2>
          <p className="text-sm text-ink-soft">30초면 충분해요.</p>
        </div>
      </div>

      {state.status === "error" && (
        <Notice tone="error" icon={<AlertIcon size={18} />}>
          {state.message}
        </Notice>
      )}

      {/* key 를 바꿔서 폼을 다시 그리면, 제출 후에도 입력값(state.values)이 되살아납니다 */}
      <form key={state.attempt} action={formAction} className="grid gap-4">
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

        <TextField
          label="닉네임"
          name="nickname"
          autoComplete="nickname"
          placeholder="만물박사냥"
          maxLength={20}
          icon={<UserIcon size={19} />}
          defaultValue={state.values.nickname ?? ""}
          error={state.fieldErrors.nickname}
          hint="2~20자. 이웃들에게 보여질 이름이에요."
          required
        />

        <TextField
          label="우리 동네"
          name="region"
          placeholder="역삼동"
          maxLength={20}
          icon={<PinIcon size={19} />}
          defaultValue={state.values.region ?? ""}
          hint="나중에 마이페이지에서 바꿀 수 있어요."
        />

        <PasswordField
          label="비밀번호"
          name="password"
          placeholder="8자 이상"
          autoComplete="new-password"
          error={state.fieldErrors.password}
        />

        <PasswordField
          label="비밀번호 확인"
          name="passwordConfirm"
          placeholder="한 번 더 입력해 주세요"
          autoComplete="new-password"
          error={state.fieldErrors.passwordConfirm}
        />

        <AvatarPicker defaultValue={(state.values.avatarKey as CatColorKey) || "orange"} />

        <SubmitButton pendingLabel="가입하는 중...">가입하고 만물 구경하기</SubmitButton>

        <p className="text-center text-xs leading-relaxed text-ink-soft">
          가입하면 만물마켓 이용약관과 개인정보 처리방침에 동의한 것으로 보아요.
        </p>
      </form>
    </>
  );
}
