import Link from "next/link";
import { CatFace, PawPrint, type CatColorKey, type CatMood } from "./CatMascot";
import { ArrowRightIcon } from "./Icons";

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
    <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-10 lg:grid-cols-[1fr_minmax(0,27rem)] lg:py-16">
      {/* 왼쪽: 일러스트 + 안내 */}
      <section className="order-2 lg:order-1">
        <div className="relative overflow-hidden rounded-blob border border-sand-200 bg-gradient-to-br from-carrot-50 via-paper to-sand-50 p-8 shadow-soft">
          {/* 배경 장식 */}
          <PawPrint size={120} className="pointer-events-none absolute -right-6 -top-6 rotate-12 text-carrot-100" />
          <PawPrint size={72} className="pointer-events-none absolute -bottom-4 left-1/3 -rotate-12 text-sand-100" />

          <div className="relative">
            <span className="chip bg-carrot-100 text-carrot-700">
              {eyebrow}
            </span>

            <div className="mt-5 flex items-start gap-4">
              <span className="shrink-0 animate-float">
                <CatFace size={104} color={mascot.color} mood={mascot.mood} />
              </span>
              <div>
                <h1 className="font-display text-3xl leading-snug text-ink sm:text-4xl">{title}</h1>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{description}</p>
              </div>
            </div>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {bullets.map((b) => (
                <li
                  key={b.text}
                  className="flex items-center gap-2.5 rounded-2xl border border-sand-200 bg-paper/80 px-3.5 py-3 text-sm text-ink"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-carrot-100 text-carrot-600">
                    {b.icon}
                  </span>
                  {b.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 오른쪽: 폼 카드 */}
      <section className="order-1 lg:order-2">
        <div className="card-soft animate-pop p-7 sm:p-8">{children}</div>

        <p className="mt-5 text-center text-sm text-ink-soft">
          {footer.text}{" "}
          <Link
            href={footer.href}
            className="inline-flex items-center gap-1 font-bold text-carrot-600 underline decoration-carrot-300 decoration-2 underline-offset-4 hover:text-carrot-700"
          >
            {footer.linkLabel}
            <ArrowRightIcon size={15} />
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
      ? "border-berry/40 bg-berry-soft text-berry-ink"
      : "border-leaf-300 bg-leaf-50 text-leaf-700";

  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`mb-5 flex items-start gap-2.5 rounded-2xl border-2 px-4 py-3 text-sm font-medium ${styles}`}
    >
      <span className="mt-0.5 shrink-0">{icon}</span>
      <p className="leading-relaxed">{children}</p>
    </div>
  );
}
