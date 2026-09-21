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
