import Link from "next/link";
import { PawPrint } from "./CatMascot";

export function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-dashed border-carrot-200 bg-paper/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <PawPrint size={20} className="text-carrot-400" />
          <span className="font-display text-base text-ink">만물마켓</span>
          <span className="text-ink-soft">· 뭐든지 있고, 뭐든지 팔아요</span>
        </div>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href="/" className="hover:text-carrot-600">홈</Link>
          <Link href="/login" className="hover:text-carrot-600">로그인</Link>
          <Link href="/signup" className="hover:text-carrot-600">회원가입</Link>
          <span className="text-ink-soft/70">© 2026 만물마켓 · 공부용 프로젝트</span>
        </nav>
      </div>
    </footer>
  );
}
