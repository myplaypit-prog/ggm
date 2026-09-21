import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
    <html lang="ko">
      <head>
        {/*
          글꼴: Pretendard
          한글 화면의 품질을 가장 크게 좌우하는 게 글꼴입니다.
          Pretendard 는 요즘 한국 서비스들이 표준처럼 쓰는 글꼴이라,
          이것만 바꿔도 화면이 훨씬 정돈돼 보여요.

          "dynamic-subset" 은 화면에 실제로 쓰인 글자만 잘라서 받아오는 방식이라
          한글 글꼴인데도 가볍습니다.
        */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
