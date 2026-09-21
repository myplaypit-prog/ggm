import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CatFace, CatWithBox, PawPrint } from "@/components/CatMascot";
import {
  ArrowRightIcon,
  BabyIcon,
  BookIcon,
  BoxIcon,
  ChatIcon,
  DeviceIcon,
  GuitarIcon,
  HeartIcon,
  PlantIcon,
  QuestionBoxIcon,
  ShieldIcon,
  ShirtIcon,
  SofaIcon,
  SparkleIcon,
  TagIcon,
} from "@/components/Icons";

/** 카테고리 — "만물"이라는 이름답게 마지막은 "뭐든지" */
const CATEGORIES = [
  { label: "옷·패션", icon: ShirtIcon, chip: "bg-berry/15 text-berry" },
  { label: "디지털", icon: DeviceIcon, chip: "bg-sky/25 text-[#2b7fa3]" },
  { label: "가구·인테리어", icon: SofaIcon, chip: "bg-carrot-100 text-carrot-700" },
  { label: "도서·티켓", icon: BookIcon, chip: "bg-grape/20 text-[#6c4aa3]" },
  { label: "취미·악기", icon: GuitarIcon, chip: "bg-sun/30 text-[#9a6b00]" },
  { label: "유아·완구", icon: BabyIcon, chip: "bg-berry/10 text-berry" },
  { label: "식물·반려", icon: PlantIcon, chip: "bg-leaf-100 text-leaf-700" },
  { label: "그 외 뭐든지", icon: QuestionBoxIcon, chip: "bg-carrot-200 text-carrot-800" },
];

/** 색상 팔레트 소개용 컬러칩 */
const COLOR_CHIPS = [
  { name: "당근", className: "bg-carrot-500" },
  { name: "감귤", className: "bg-carrot-300" },
  { name: "크림", className: "bg-carrot-100" },
  { name: "새싹", className: "bg-leaf-400" },
  { name: "이끼", className: "bg-leaf-600" },
  { name: "햇살", className: "bg-sun" },
  { name: "하늘", className: "bg-sky" },
  { name: "베리", className: "bg-berry" },
];

const WEIRD_ITEMS = [
  { emoji: "🪑", text: "다리 세 개인 의자", cat: "cream" as const, price: "3,000원", likes: 7 },
  { emoji: "🎸", text: "줄 끊어진 기타", cat: "orange" as const, price: "나눔", likes: 21 },
  { emoji: "🧦", text: "짝 없는 수면양말", cat: "green" as const, price: "1,000원", likes: 4 },
  { emoji: "🪴", text: "무럭무럭 자란 다육이", cat: "calico" as const, price: "5,000원", likes: 15 },
];

const STEPS = [
  {
    n: "1",
    title: "사진 찍고 올리기",
    desc: "뭐든 괜찮아요. 카테고리가 애매하면 그 외 뭐든지!",
    cat: "orange" as const,
    icon: BoxIcon,
  },
  {
    n: "2",
    title: "이웃과 대화하기",
    desc: "궁금한 걸 물어보고 만날 장소를 정해요.",
    cat: "green" as const,
    icon: ChatIcon,
  },
  {
    n: "3",
    title: "직접 만나 거래하기",
    desc: "가까운 동네에서 안전하게 주고받아요.",
    cat: "calico" as const,
    icon: ShieldIcon,
  },
];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ bye?: string }>;
}) {
  const sp = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      {sp.bye === "1" && (
        <div className="mx-auto mt-5 max-w-6xl px-5">
          <div className="flex items-center gap-3 rounded-2xl border-2 border-leaf-200 bg-leaf-50 px-4 py-3 text-sm font-medium text-leaf-800">
            <CatFace size={32} color="green" mood="sleepy" className="shrink-0" />
            로그아웃했어요. 다음에 또 놀러 와요! 🐾
          </div>
        </div>
      )}

      {/* ── 히어로 ─────────────────────────────────────────── */}
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 lg:grid-cols-2 lg:py-20">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-leaf-200 bg-leaf-50 px-3.5 py-1.5 text-xs font-bold text-leaf-700">
            <SparkleIcon size={14} />
            우리 동네 만물 중고마켓
          </span>

          <h1 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
            뭐든지 있고,
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-carrot-600">뭐든지 팔아요</span>
              <span className="absolute inset-x-0 bottom-1 z-0 h-4 -rotate-1 rounded-full bg-sun/60" />
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-ink-soft">
            팔릴까 싶은 물건도 만물마켓에선 주인을 찾아요. 냄비, 레고, 한 짝 남은 귀걸이까지 — 우리
            동네 이웃과 고양이 친구들이 기다리고 있어요.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {user ? (
              <Link
                href="/mypage"
                className="btn-squish inline-flex items-center gap-2 rounded-2xl bg-carrot-500 px-6 py-3.5 font-display text-lg text-white shadow-[0_5px_0_0_var(--color-carrot-700)]"
              >
                내 만물창고 가기
                <ArrowRightIcon size={19} />
              </Link>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="btn-squish inline-flex items-center gap-2 rounded-2xl bg-carrot-500 px-6 py-3.5 font-display text-lg text-white shadow-[0_5px_0_0_var(--color-carrot-700)]"
                >
                  <SparkleIcon size={19} />
                  무료로 시작하기
                </Link>
                <Link
                  href="/login"
                  className="btn-squish inline-flex items-center gap-2 rounded-2xl border-2 border-leaf-400 bg-paper px-6 py-3.5 font-display text-lg text-leaf-700 shadow-[0_5px_0_0_var(--color-leaf-200)]"
                >
                  로그인
                </Link>
              </>
            )}
          </div>

          {/* 컬러칩 */}
          <div className="mt-10">
            <p className="mb-2.5 flex items-center gap-1.5 text-xs font-bold text-ink-soft">
              <PawPrint size={14} className="text-carrot-400" />
              만물마켓의 색
            </p>
            <div className="flex flex-wrap gap-2">
              {COLOR_CHIPS.map((chip) => (
                <span key={chip.name} className="group flex flex-col items-center gap-1">
                  <span
                    className={`size-9 rounded-xl border-2 border-white shadow-[0_3px_0_0_rgba(59,44,33,0.12)] transition group-hover:-translate-y-1 ${chip.className}`}
                  />
                  <span className="text-[10px] text-ink-soft">{chip.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <span className="animate-float">
            <CatWithBox size={420} className="w-full max-w-[420px]" />
          </span>
        </div>
      </section>

      {/* ── 카테고리 ───────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-ink">뭘 팔지 고민이라면</h2>
            <p className="mt-1.5 text-sm text-ink-soft">
              카테고리는 거들 뿐. 정말 아무거나 올려도 돼요.
            </p>
          </div>
          <span className="hidden shrink-0 sm:block">
            <CatFace size={64} color="cream" mood="wink" />
          </span>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CATEGORIES.map(({ label, icon: Icon, chip }) => (
            <li key={label}>
              <div className="btn-squish flex h-full cursor-default flex-col items-center gap-2.5 rounded-3xl border-2 border-carrot-100 bg-paper px-3 py-6 text-center transition hover:-translate-y-1 hover:border-carrot-300">
                <span className={`grid size-14 place-items-center rounded-2xl ${chip}`}>
                  <Icon size={28} />
                </span>
                <span className="text-sm font-medium text-ink">{label}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 이런 것도 팔려요 ───────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="rounded-blob border-2 border-leaf-200 bg-leaf-50/70 p-7 sm:p-10">
          <h2 className="font-display text-3xl text-leaf-800">이런 것도 팔린다구요?</h2>
          <p className="mt-1.5 text-sm text-leaf-700/80">네, 팔려요. 만물마켓이니까요.</p>

          <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WEIRD_ITEMS.map((item) => (
              <li
                key={item.text}
                className="group rounded-3xl border-2 border-white bg-paper p-5 shadow-[0_8px_0_-3px_var(--color-leaf-200)] transition hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <span className="text-4xl transition group-hover:scale-110">{item.emoji}</span>
                  <CatFace size={40} color={item.cat} mood="happy" />
                </div>
                <p className="mt-4 text-[15px] font-medium leading-snug text-ink">{item.text}</p>
                <p className="mt-2 flex items-center gap-1.5 text-sm font-bold text-carrot-600">
                  <TagIcon size={15} />
                  {item.price}
                </p>
                <p className="mt-3 flex items-center gap-1 text-xs text-ink-soft">
                  <HeartIcon size={13} />
                  {item.likes}명이 찜했어요
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 이용 방법 ──────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <h2 className="text-center font-display text-3xl text-ink">이렇게 거래해요</h2>
        <p className="mt-1.5 text-center text-sm text-ink-soft">복잡한 건 고양이들이 다 해 둘게요.</p>

        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {STEPS.map(({ n, title, desc, cat, icon: Icon }) => (
            <li key={n} className="card-soft relative p-6 pt-10 text-center">
              <span className="absolute -top-5 left-1/2 grid size-11 -translate-x-1/2 place-items-center rounded-full bg-carrot-500 font-display text-xl text-white shadow-[0_4px_0_0_var(--color-carrot-700)]">
                {n}
              </span>
              <CatFace size={80} color={cat} mood="happy" className="mx-auto" />
              <h3 className="mt-3 flex items-center justify-center gap-2 font-display text-xl text-ink">
                <Icon size={19} className="text-carrot-500" />
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── 마지막 CTA ─────────────────────────────────────── */}
      {!user && (
        <section className="mx-auto max-w-6xl px-5 py-12">
          <div className="relative overflow-hidden rounded-blob bg-carrot-500 px-7 py-12 text-center text-white sm:px-12">
            <PawPrint
              size={160}
              className="pointer-events-none absolute -left-8 -top-8 rotate-12 text-white/10"
            />
            <PawPrint
              size={120}
              className="pointer-events-none absolute -bottom-6 -right-4 -rotate-12 text-white/10"
            />

            <div className="relative">
              <CatFace size={96} color="cream" mood="wow" className="mx-auto animate-wiggle" />
              <h2 className="mt-4 font-display text-3xl sm:text-4xl">
                지금 가입하고 첫 물건을 올려 보세요
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/90">
                이메일 하나면 끝. 고양이 친구도 하나 고르게 해 드려요.
              </p>
              <Link
                href="/signup"
                className="btn-squish mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-display text-lg text-carrot-700 shadow-[0_5px_0_0_var(--color-carrot-800)]"
              >
                회원가입하기
                <ArrowRightIcon size={19} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
