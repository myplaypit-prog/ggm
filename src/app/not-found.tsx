import Link from "next/link";
import { CatFace, PawPrint } from "@/components/CatMascot";
import { ArrowRightIcon, SearchIcon } from "@/components/Icons";

/**
 * 없는 주소로 들어왔을 때 보이는 화면. (404)
 *
 * 이 파일이 없으면 Next.js 가 만들어 둔 영어 화면
 * ("404 · This page could not be found.") 이 그대로 나옵니다.
 * 손님이 길을 잃은 순간이라, 돌아갈 길을 바로 보여 주는 게 중요해요.
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-24 text-center">
      <div className="relative">
        <PawPrint
          size={96}
          className="pointer-events-none absolute -left-28 -top-6 -rotate-12 text-carrot-100"
        />
        <PawPrint
          size={64}
          className="pointer-events-none absolute -right-24 top-24 rotate-12 text-carrot-100"
        />
        <CatFace size={140} color="cream" mood="wow" className="relative animate-float" />
      </div>

      <p className="tabular mt-8 font-display text-5xl tracking-tight text-carrot-500">404</p>

      <h1 className="mt-3 text-[1.75rem] text-ink">이 물건은 어디로 갔을까요?</h1>

      <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
        주소가 잘못되었거나, 누군가 이미 가져간 물건일 수 있어요.
        <br />
        만물마켓에는 아직 볼 게 많이 남아 있답니다.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-2.5">
        <Link
          href="/products"
          className="btn-squish btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[15px] font-bold"
        >
          <SearchIcon size={17} />
          만물 구경하러 가기
        </Link>
        <Link
          href="/"
          className="btn-squish btn-outline inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[15px] font-bold"
        >
          홈으로
          <ArrowRightIcon size={16} />
        </Link>
      </div>
    </div>
  );
}
