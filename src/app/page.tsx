import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CATEGORIES, type CategoryKey, type ProductWithSeller } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { CatFace, CatWithBox, PawPrint } from "@/components/CatMascot";
import {
  ArrowRightIcon,
  BabyIcon,
  BookIcon,
  BoxIcon,
  ChatIcon,
  DeviceIcon,
  GuitarIcon,
  PlantIcon,
  QuestionBoxIcon,
  ShieldIcon,
  ShirtIcon,
  SofaIcon,
  SparkleIcon,
  TagIcon,
} from "@/components/Icons";

/** 카테고리 키마다 어떤 아이콘을 쓸지 */
const CATEGORY_ICONS: Record<CategoryKey, typeof ShirtIcon> = {
  fashion: ShirtIcon,
  digital: DeviceIcon,
  interior: SofaIcon,
  book: BookIcon,
  hobby: GuitarIcon,
  kids: BabyIcon,
  plant: PlantIcon,
  etc: QuestionBoxIcon,
};

/** 색상 팔레트 소개용 컬러칩.
 *  색마다 "언제 쓰는 색인지" 역할을 하나씩 정해 뒀어요. (globals.css 참고) */
const COLOR_CHIPS = [
  { name: "당근", role: "메인", className: "bg-carrot-500" },
  { name: "감귤", role: "밝게", className: "bg-carrot-300" },
  { name: "모래", role: "바탕", className: "bg-sand-200" },
  { name: "새싹", role: "안전", className: "bg-leaf-500" },
  { name: "햇살", role: "축하", className: "bg-sun" },
  { name: "바다", role: "정보", className: "bg-sky" },
  { name: "베리", role: "찜", className: "bg-berry" },
  { name: "라일락", role: "취향", className: "bg-grape" },
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

  // 방금 올라온 물건 8개
  const { data: recentData } = await supabase
    .from("mm_products")
    .select("*, seller:mm_profiles(id, nickname, avatar_key, region)")
    .order("created_at", { ascending: false })
    .limit(8);

  const recent = (recentData ?? []) as ProductWithSeller[];

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
          <span className="chip border border-carrot-200 bg-carrot-50 text-carrot-700">
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
            <Link
              href="/products"
              className="btn-squish btn-primary inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 font-display text-lg"
            >
              만물 구경하기
              <ArrowRightIcon size={19} />
            </Link>
            {user ? (
              <Link
                href="/products/new"
                className="btn-squish btn-outline inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 font-display text-lg"
              >
                <TagIcon size={19} />내 물건 팔기
              </Link>
            ) : (
              <Link
                href="/signup"
                className="btn-squish btn-outline inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 font-display text-lg"
              >
                <SparkleIcon size={19} />
                무료로 가입하기
              </Link>
            )}
          </div>

          {/* 컬러칩 */}
          <div className="mt-10">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-bold text-ink-soft">
              <PawPrint size={14} className="text-carrot-400" />
              만물마켓의 색 — 주인공은 오렌지, 나머지는 거들기만
            </p>
            <div className="flex flex-wrap gap-2.5">
              {COLOR_CHIPS.map((chip) => (
                <span key={chip.name} className="group flex w-11 flex-col items-center gap-1">
                  <span
                    className={`size-10 rounded-2xl border-2 border-white shadow-soft transition group-hover:-translate-y-1 ${chip.className}`}
                  />
                  <span className="text-[10px] font-bold leading-none text-ink">{chip.name}</span>
                  <span className="text-[9px] leading-none text-ink-faint">{chip.role}</span>
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
          {CATEGORIES.map((c) => {
            const Icon = CATEGORY_ICONS[c.key];
            return (
              <li key={c.key}>
                <Link
                  href={`/products?category=${c.key}`}
                  className="card-hover flex h-full flex-col items-center gap-2.5 rounded-3xl border border-sand-200 bg-paper px-3 py-6 text-center shadow-soft"
                >
                  <span className={`grid size-14 place-items-center rounded-2xl ${c.chip}`}>
                    <Icon size={28} />
                  </span>
                  <span className="text-sm font-medium text-ink">{c.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ── 방금 올라온 물건 ───────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="rounded-blob border border-sand-200 bg-gradient-to-br from-carrot-50 via-sand-50 to-paper p-7 shadow-soft sm:p-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl text-ink">방금 올라온 물건</h2>
              <p className="mt-1.5 text-sm text-ink-soft">
                이런 것도 팔린다구요? 네, 팔려요. 만물마켓이니까요.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-carrot-600 underline decoration-carrot-300 decoration-2 underline-offset-4 hover:text-carrot-700"
            >
              전체 보기
              <ArrowRightIcon size={15} />
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-sand-300 bg-paper/80 px-6 py-14 text-center">
              <CatFace size={96} color="cream" mood="sleepy" className="mx-auto animate-float" />
              <p className="mt-3 font-display text-xl text-ink">아직 올라온 물건이 없어요</p>
              <p className="mt-1.5 text-sm text-ink-soft">
                첫 번째 물건의 주인공이 되어 주실래요?
              </p>
              <Link
                href="/products/new"
                className="btn-squish btn-primary mt-6 inline-flex rounded-2xl px-5 py-3 font-display text-lg"
              >
                물건 올리러 가기
              </Link>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {recent.map((p) => (
                <li key={p.id} className="flex">
                  <div className="w-full">
                    <ProductCard product={p} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ── 이용 방법 ──────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <h2 className="text-center font-display text-3xl text-ink">이렇게 거래해요</h2>
        <p className="mt-1.5 text-center text-sm text-ink-soft">복잡한 건 고양이들이 다 해 둘게요.</p>

        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {STEPS.map(({ n, title, desc, cat, icon: Icon }) => (
            <li key={n} className="card-soft card-hover relative p-6 pt-10 text-center">
              <span className="btn-primary absolute -top-5 left-1/2 grid size-11 -translate-x-1/2 place-items-center rounded-full font-display text-xl">
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
          <div className="relative overflow-hidden rounded-blob bg-gradient-to-br from-carrot-400 via-carrot-500 to-carrot-600 px-7 py-12 text-center text-white shadow-lift sm:px-12">
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
                className="btn-squish btn-white mt-7 inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 font-display text-lg"
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
