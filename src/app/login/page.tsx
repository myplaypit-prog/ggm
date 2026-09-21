import type { Metadata } from "next";
import { AuthShell } from "@/components/AuthShell";
import { LoginForm } from "./LoginForm";
import { BoxIcon, ChatIcon, HeartIcon, ShieldIcon } from "@/components/Icons";

export const metadata: Metadata = { title: "로그인 · 만물마켓" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; verified?: string }>;
}) {
  const sp = await searchParams;
  const next = sp.next?.startsWith("/") ? sp.next : "/mypage";

  return (
    <AuthShell
      eyebrow="🐾 만물마켓에 오신 걸 환영해요"
      title={
        <>
          오늘은 어떤 물건을
          <br />
          만나게 될까요?
        </>
      }
      description="옷장 속 잠자던 물건부터 세상에 하나뿐인 수집품까지. 만물마켓에는 정말 뭐든지 있어요."
      bullets={[
        { icon: <BoxIcon size={18} />, text: "뭐든지 올려요" },
        { icon: <HeartIcon size={18} />, text: "찜하고 기다려요" },
        { icon: <ChatIcon size={18} />, text: "바로 대화해요" },
        { icon: <ShieldIcon size={18} />, text: "안전하게 거래해요" },
      ]}
      mascot={{ color: "green", mood: "happy" }}
      footer={{ text: "아직 계정이 없나요?", linkLabel: "회원가입하기", href: "/signup" }}
    >
      <LoginForm next={next} justVerified={sp.verified === "1"} />
    </AuthShell>
  );
}
