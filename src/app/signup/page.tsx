import type { Metadata } from "next";
import { AuthShell } from "@/components/AuthShell";
import { SignupForm } from "./SignupForm";
import { BoxIcon, QuestionBoxIcon, SparkleIcon, TagIcon } from "@/components/Icons";

export const metadata: Metadata = { title: "회원가입 · 만물마켓" };

export default function SignupPage() {
  return (
    <AuthShell
      eyebrow="✨ 지금 가입하면 첫 거래 응원 스티커"
      title={
        <>
          안 쓰는 물건이
          <br />
          누군가에겐 보물!
        </>
      }
      description="냄비부터 기타, 레고, 다육이까지. 만물마켓에서는 정말 아무거나 올릴 수 있어요. 고양이 친구를 하나 고르고 시작해 볼까요?"
      bullets={[
        { icon: <BoxIcon size={18} />, text: "카테고리 제한 없음" },
        { icon: <TagIcon size={18} />, text: "가격은 내 마음대로" },
        { icon: <SparkleIcon size={18} />, text: "나만의 고양이 부캐" },
        { icon: <QuestionBoxIcon size={18} />, text: "이런 것도 팔려요?" },
      ]}
      mascot={{ color: "orange", mood: "wow" }}
      footer={{ text: "이미 계정이 있나요?", linkLabel: "로그인하기", href: "/login" }}
    >
      <SignupForm />
    </AuthShell>
  );
}
