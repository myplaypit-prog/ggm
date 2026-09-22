import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CATEGORIES, type CategoryKey, type ProductWithSeller } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { CatFace, CatWithBox, PawPrint } from "@/components/CatArtwork";
import {
  ArrowRightIcon,
  BabyIcon,
  BookIcon,
  BoxIcon,
  ChatIcon,
  CheckIcon,
  DeviceIcon,
  GuitarIcon,
  PlantIcon,
  QuestionBoxIcon,
  SearchIcon,
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

/** 검색창 밑에 놓을 "많이 찾는 것" 바로가기 */
const QUICK_LINKS = [
  { label: "기타", href: "/products?q=기타" },
  { label: "화분", href: "/products?q=화분" },
  { label: "나눔", href: "/products?q=나눔" },
  { label: "그 외 뭐든지", href: "/products?category=etc" },
];

const STEPS = [
  {
    n: "01",
    title: "사진 찍고 올리기",
    desc: "뭐든 괜찮아요. 카테고리가 애매하면 그 외 뭐든지!",
    cat: "orange" as const,
    icon: BoxIcon,
  },
  {
    n: "02",
    title: "이웃과 이야기하기",
    desc: "궁금한 걸 물어보고 만날 장소를 정해요.",
    cat: "green" as const,
    icon: ChatIcon,
  },
  {
    n: "03",
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

  // 방금 올라온 물건 8개 + 전체 개수 + 이웃 수를 한 번에 불러옵니다.
  // head: true 는 "내용은 필요 없고 개수만 세어 줘" 라는 뜻이라 가볍습니다.
  const [recentRes, productCountRes, memberCountRes] = await Promise.all([
    supabase
      .from("mm_products")
      .select("*, seller:mm_profiles(id, nickname, avatar_key, region)")
      .order("created_at", { ascending: false })
      .limit(8),
    supabase.from("mm_products").select("id", { count: "exact", head: true }),
    supabase.from("mm_profiles").select("id", { count: "exact", head: true }),
  ]);

  const recent = (recentRes.data ?? []) as ProductWithSeller[];
  const productCount = productCountRes.count ?? 0;
  const memberCount = memberCountRes.count ?? 0;

  return (
    <>
      {sp.bye === "1" && (
        <div className="mx-auto mt-5 max-w-6xl px-5">
          <div className="flex items-center gap-3 rounded-2xl border border-leaf-200 bg-leaf-50 px-4 py-3 text-sm font-medium text-leaf-800">
            <CatFace size={30} color="green" mood="sleepy" className="shrink-0" />
            로그아웃했어요. 다음에 또 놀러 와요!
          </div>
        </div>
      )}

      {/* ══ 히어로 ═══════════════════════════════════════════
          중고마켓에서 제일 중요한 행동은 "찾기" 라서,
          첫 화면 한가운데에 검색창을 뒀습니다. */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-8 pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-16 lg:pt-16">
        <div className="animate-rise">
          <span className="chip border border-carrot-200 bg-carrot-50 text-carrot-700">
            <SparkleIcon size={13} />
            우리 동네 만물 중고마켓
          </span>

          <h1 className="mt-5 text-[2.6rem] leading-[1.15] text-ink sm:text-[3.4rem] lg:text-[3.75rem]">
            뭐든지 있고,
            <br />
            <span className="text-carrot-500">뭐든지 팔아요</span>
          </h1>

          <p className="mt-5 max-w-md text-[17px] leading-[1.75] text-ink-soft">
            팔릴까 싶은 물건도 만물마켓에선 주인을 찾아요.{" "}
            <br className="hidden sm:block" />
            냄비, 레고, 한 짝 남은 귀걸이까지.
          </p>

          {/* 검색 — 자바스크립트 없이도 동작하는 평범한 GET 폼입니다 */}
          <form
            action="/products"
            method="get"
            className="mt-7 flex w-full max-w-lg items-center gap-1 rounded-2xl border border-sand-200 bg-paper p-1.5 shadow-soft transition focus-within:border-carrot-400 focus-within:shadow-lift"
          >
            <span className="pl-3 text-ink-faint">
              <SearchIcon size={19} />
            </span>
            <input
              type="search"
              name="q"
              placeholder="어떤 물건을 찾으세요?"
              aria-label="물건 검색"
              className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-[15px] text-ink outline-none placeholder:text-ink-faint"
            />
            <button
              type="submit"
              className="btn-squish btn-primary shrink-0 rounded-xl px-5 py-2.5 text-sm font-bold"
            >
              찾기
            </button>
          </form>

          {/* 많이 찾는 것 */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-ink-faint">인기</span>
            {QUICK_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="btn-squish rounded-full border border-sand-200 bg-paper px-3 py-1 text-xs font-semibold text-ink-soft hover:border-carrot-300 hover:text-carrot-700"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* 지금 상태 — 숫자가 있으면 "진짜 돌아가는 서비스" 처럼 보입니다 */}
          <dl className="mt-8 flex items-center gap-7">
            <div>
              <dt className="text-xs font-semibold text-ink-faint">올라온 물건</dt>
              <dd className="tabular font-display text-2xl text-ink">
                {productCount.toLocaleString("ko-KR")}
                <span className="ml-0.5 text-sm font-bold text-ink-soft">개</span>
              </dd>
            </div>
            <div className="h-9 w-px bg-sand-200" />
            <div>
              <dt className="text-xs font-semibold text-ink-faint">함께하는 이웃</dt>
              <dd className="tabular font-display text-2xl text-ink">
                {memberCount.toLocaleString("ko-KR")}
                <span className="ml-0.5 text-sm font-bold text-ink-soft">명</span>
              </dd>
            </div>
            <div className="h-9 w-px bg-sand-200" />
            <div>
              <dt className="text-xs font-semibold text-ink-faint">수수료</dt>
              <dd className="font-display text-2xl text-carrot-500">0원</dd>
            </div>
          </dl>
        </div>

        <div className="flex justify-center lg:justify-end">
          {/* 태블릿 폭에서는 그림이 너무 커서 첫 화면을 다 차지해요.
              화면이 넓어질수록 조금씩 키웁니다. */}
          <span className="animate-float block w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[440px]">
            <CatWithBox size={440} className="h-auto w-full" />
          </span>
        </div>
      </section>

      {/* ══ 카테고리 ═════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">CATEGORY</p>
            <h2 className="mt-1.5 text-[1.75rem] text-ink">뭘 팔지 고민이라면</h2>
          </div>
          <p className="hidden text-sm text-ink-soft sm:block">
            카테고리는 거들 뿐. 정말 아무거나 올려도 돼요.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {CATEGORIES.map((c) => {
            const Icon = CATEGORY_ICONS[c.key];
            return (
              <li key={c.key}>
                <Link
                  href={`/products?category=${c.key}`}
                  className="btn-squish flex h-full items-center gap-3 rounded-2xl border border-sand-200 bg-paper px-3.5 py-3.5 hover:border-carrot-300 hover:bg-carrot-50/40"
                >
                  <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${c.chip}`}>
                    <Icon size={24} />
                  </span>
                  <span className="text-[15px] font-semibold text-ink">{c.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ══ 방금 올라온 물건 ═════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">NEW</p>
            <h2 className="mt-1.5 text-[1.75rem] text-ink">방금 올라온 물건</h2>
          </div>
          <Link
            href="/products"
            className="btn-squish inline-flex shrink-0 items-center gap-1.5 rounded-full border border-sand-200 bg-paper px-4 py-2 text-sm font-bold text-ink hover:border-carrot-300 hover:text-carrot-700"
          >
            전체 보기
            <ArrowRightIcon size={15} />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="rounded-blob border border-dashed border-sand-300 bg-paper px-6 py-16 text-center">
            <CatFace size={92} color="cream" mood="sleepy" className="mx-auto animate-float" />
            <p className="mt-4 text-xl text-ink">아직 올라온 물건이 없어요</p>
            <p className="mt-1.5 text-sm text-ink-soft">첫 번째 물건의 주인공이 되어 주실래요?</p>
            <Link
              href="/products/new"
              className="btn-squish btn-primary mt-6 inline-flex rounded-xl px-5 py-3 text-[15px] font-bold"
            >
              물건 올리러 가기
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
            {recent.map((p) => (
              <li key={p.id} className="flex">
                <div className="w-full">
                  <ProductCard product={p} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ══ 이용 방법 ════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="rounded-blob border border-sand-200 bg-paper px-6 py-12 shadow-soft sm:px-12">
          <div className="text-center">
            <p className="eyebrow">HOW IT WORKS</p>
            <h2 className="mt-1.5 text-[1.75rem] text-ink">이렇게 거래해요</h2>
            <p className="mt-2 text-sm text-ink-soft">복잡한 건 고양이들이 다 해 둘게요.</p>
          </div>

          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {STEPS.map(({ n, title, desc, cat, icon: Icon }) => (
              <li key={n} className="text-center">
                <div className="relative mx-auto w-fit">
                  <CatFace size={84} color={cat} mood="happy" />
                  {/* 단계 번호 — 고양이 오른쪽 아래에 동그란 배지로 */}
                  <span className="tabular absolute -bottom-1 -right-1 grid size-8 place-items-center rounded-full border border-paper bg-carrot-500 font-display text-[13px] text-white">
                    {n}
                  </span>
                </div>
                <h3 className="mt-4 flex items-center justify-center gap-2 text-lg text-ink">
                  <Icon size={18} className="text-carrot-500" />
                  {title}
                </h3>
                <p className="mx-auto mt-2 max-w-[17rem] text-sm leading-relaxed text-ink-soft">
                  {desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ══ 마지막 CTA ═══════════════════════════════════════ */}
      {!user && (
        <section className="mx-auto max-w-6xl px-5 pb-16 pt-4">
          <div className="relative overflow-hidden rounded-blob bg-carrot-500 px-7 py-14 text-white shadow-lift sm:px-14">
            {/* 배경 장식 — 아주 옅게만 */}
            <PawPrint
              size={200}
              className="pointer-events-none absolute -right-10 -top-12 rotate-12 text-white/10"
            />
            <PawPrint
              size={130}
              className="pointer-events-none absolute -bottom-8 left-4 -rotate-12 text-white/10"
            />

            <div className="relative flex flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
              <CatFace size={104} color="cream" mood="wow" className="shrink-0 animate-wiggle" />

              <div className="flex-1">
                <h2 className="text-[1.75rem] leading-snug sm:text-[2rem]">
                  지금 가입하고 첫 물건을 올려 보세요
                </h2>
                <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[15px] text-white/90 sm:justify-start">
                  <li className="flex items-center gap-1.5">
                    <CheckIcon size={17} />
                    이메일 하나면 가입 끝
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckIcon size={17} />
                    수수료 0원
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckIcon size={17} />
                    고양이 부캐 증정
                  </li>
                </ul>
              </div>

              <Link
                href="/signup"
                className="btn-squish btn-white inline-flex shrink-0 items-center gap-2 rounded-xl px-7 py-3.5 text-[17px] font-bold"
              >
                회원가입
                <ArrowRightIcon size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
