import Link from "next/link";
import { CatFace } from "@/components/CatMascot";

export const metadata = { title: "인증에 실패했어요 · 만물마켓" };

export default function AuthErrorPage() {
  return (
    <div className="mx-auto max-w-md px-5 py-20 text-center">
      <span className="inline-block animate-wiggle">
        <CatFace size={128} color="gray" mood="sleepy" />
      </span>
      <h1 className="mt-5 font-display text-3xl text-ink">링크가 잠들어 버렸어요</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
        인증 링크가 만료되었거나 이미 사용된 것 같아요.
        <br />
        다시 로그인하거나 가입을 시도해 주세요.
      </p>
      <div className="mt-7 flex justify-center gap-3">
        <Link
          href="/login"
          className="btn-squish btn-primary rounded-xl px-5 py-3 text-[15px] font-bold"
        >
          로그인
        </Link>
        <Link
          href="/signup"
          className="btn-squish btn-outline rounded-xl px-5 py-3 text-[15px] font-bold"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
}
