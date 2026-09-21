import Link from "next/link";
import { CatFace } from "./CatMascot";

/** 푸터에 넣을 링크 묶음 */
const LINK_GROUPS = [
  {
    title: "둘러보기",
    links: [
      { label: "홈", href: "/" },
      { label: "만물 구경", href: "/products" },
      { label: "물건 팔기", href: "/products/new" },
    ],
  },
  {
    title: "내 계정",
    links: [
      { label: "로그인", href: "/login" },
      { label: "회원가입", href: "/signup" },
      { label: "내 만물창고", href: "/mypage" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-sand-200 bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          {/* 브랜드 */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="btn-primary grid size-9 place-items-center rounded-xl">
                <CatFace size={30} color="cream" mood="happy" />
              </span>
              <span className="font-display text-[19px] text-ink">만물마켓</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
              뭐든지 있고, 뭐든지 팔아요.
              <br />
              우리 동네 이웃과 고양이 친구들이 기다리고 있어요.
            </p>
          </div>

          {/* 링크 */}
          {LINK_GROUPS.map((group) => (
            <nav key={group.title}>
              <h2 className="text-xs font-bold tracking-wide text-ink-faint">{group.title}</h2>
              <ul className="mt-3 space-y-2">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm font-medium text-ink-soft transition hover:text-carrot-600"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="hairline mt-10 pt-6 text-xs text-ink-faint">
          © 2026 만물마켓 · 코딩 공부용으로 만든 연습 프로젝트입니다
        </div>
      </div>
    </footer>
  );
}
