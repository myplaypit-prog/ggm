import type { Metadata } from "next";
import { Jua, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// 한글 폰트는 용량이 커서 preload 를 끄고 필요할 때 불러옵니다.
const jua = Jua({
  weight: "400",
  variable: "--font-jua",
  display: "swap",
  preload: false,
});

// Noto Sans KR 은 가변 폰트라 weight 를 지정하지 않습니다.
const noto = Noto_Sans_KR({
  variable: "--font-noto",
  display: "swap",
  preload: false,
});

/**
 * 모든 페이지를 "요청이 올 때마다 새로 그리기"로 둡니다.
 *
 * 왜 필요한가요?
 * 헤더에 로그인한 사람의 닉네임과 고양이가 들어가기 때문에,
 * 미리 만들어 둔 화면을 모두에게 똑같이 보여 주면 안 됩니다.
 * 이걸 지정하지 않으면 Next.js 가 404 페이지 같은 걸 빌드할 때 미리 만들려다가
 * Supabase 를 부르게 되고, 환경변수가 없으면 빌드 자체가 실패해요.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "만물마켓 — 뭐든지 있고, 뭐든지 팔아요",
  description:
    "우리 동네 만물 중고마켓. 안 쓰는 물건부터 세상에 하나뿐인 물건까지, 고양이 친구들과 함께 사고팔아요.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${jua.variable} ${noto.variable}`}>
      <body className="min-h-dvh flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
