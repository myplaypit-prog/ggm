import Link from "next/link";
import { CatFace, PawPrint, type CatColorKey, type CatMood } from "./CatArtwork";
import { ArrowRightIcon, CheckIcon } from "./Icons";

type Props = {
  /** 왼쪽 안내 패널 */
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  bullets: { icon: React.ReactNode; text: string }[];
  mascot: { color: CatColorKey; mood: CatMood };
  /** 오른쪽 카드 */
  children: React.ReactNode;
  footer: { text: string; linkLabel: string; href: string };
};

/**
 * 로그인 · 회원가입 화면의 공통 틀.
 *
 * 왼쪽은 "왜 가입해야 하는지" 를 보여 주는 안내 패널,
 * 오른쪽은 실제로 입력하는 폼 카드입니다.
 * 좁은 화면에서는 폼이 먼저 오도록 순서를 바꿉니다. (order- 클래스)
 */
export function AuthShell({
  eyebrow,
  title,
  description,
  bullets,
  mascot,
  children,
  footer,
}: Props) {
  return (
    <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 py-10 lg:grid-cols-[1fr_minmax(0,25rem)] lg:gap-16 lg:py-20">
      {/* ── 왼쪽: 안내 ───────────────────────────────── */}
      <section className="order-2 lg:order-1 lg:pt-6">
        <div className="relative">
          {/* 배경 장식 — 아주 옅게 깔리는 발자국 */}
          <PawPrint
            size={170}
            className="pointer-events-none absolute -left-20 -top-16 -rotate-12 text-carrot-100/50"
          />

          <div className="relative">
            <span className="chip bg-carrot-50 text-carrot-700">{eyebrow}</span>

            <h1 className="mt-5 text-[2.1rem] leading-[1.2] text-ink sm:text-[2.6rem]">{title}</h1>

            <p className="mt-4 max-w-md text-[16px] leading-[1.75] text-ink-soft">{description}</p>

            <ul className="mt-8 grid max-w-md gap-2.5 sm:grid-cols-2">
              {bullets.map((b) => (
                <li
                  key={b.text}
                  className="flex items-center gap-2.5 rounded-xl border border-sand-200 bg-paper px-3.5 py-3 text-sm font-medium text-ink shadow-xs"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-carrot-50 text-carrot-600">
                    {b.icon}
                  </span>
                  {b.text}
                </li>
              ))}
            </ul>

            {/* 마스코트 — 안내 글 아래에서 인사 */}
            <div className="mt-8 flex items-center gap-3">
              <span className="animate-float">
                <CatFace size={72} color={mascot.color} mood={mascot.mood} />
              </span>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-ink-soft">
                <CheckIcon size={16} className="text-leaf-500" />
                가입비도, 수수료도 없어요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 오른쪽: 폼 카드 ──────────────────────────── */}
      <section className="order-1 lg:order-2">
        <div className="card-soft animate-pop p-6 sm:p-8">{children}</div>

        <p className="mt-5 text-center text-sm text-ink-soft">
          {footer.text}{" "}
          <Link
            href={footer.href}
            className="inline-flex items-center gap-1 font-bold text-carrot-600 hover:text-carrot-700 hover:underline"
          >
            {footer.linkLabel}
            <ArrowRightIcon size={14} />
          </Link>
        </p>
      </section>
    </div>
  );
}

/** 폼 위쪽에 뜨는 알림 상자 */
export function Notice({
  tone,
  icon,
  children,
}: {
  tone: "error" | "success";
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const styles =
    tone === "error"
      ? "border-berry/30 bg-berry-soft text-berry-ink"
      : "border-leaf-200 bg-leaf-50 text-leaf-700";

  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`mb-5 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium ${styles}`}
    >
      <span className="mt-0.5 shrink-0">{icon}</span>
      <p className="leading-relaxed">{children}</p>
    </div>
  );
}
