import type { SVGProps } from "react";

/* ==================================================================
   만물마켓 마스코트 — 동네 고양이 5마리 (3차 리뉴얼)

   그림은 전부 코드로 그린 SVG 입니다. (이미지 파일이 아니에요)

   ── 이번에 정한 "그림 규칙" ─────────────────────────────
   상용 앱의 일러스트가 깔끔해 보이는 이유는 재주가 아니라
   "규칙을 끝까지 지켰기 때문" 입니다. 그래서 규칙을 먼저 정했어요.

   1) 검은 테두리를 쓰지 않습니다.
      형태는 "같은 색의 더 진한 톤" 으로만 구분합니다.
      (만화 같은 두꺼운 검은 선은 싼 느낌이 납니다)
   2) 빛은 항상 왼쪽 위에서 옵니다.
      밝은 부분은 왼쪽 위, 그늘은 오른쪽 아래. 예외 없이 전부.
   3) 그림자는 번지게(blur) 만듭니다.
      딱 떨어지는 회색 타원은 스티커처럼 보여요.
   4) 색은 캐릭터마다 4단계(밝음·기본·그늘·진함)만 씁니다.
   5) 눈은 항상 홍채 그라데이션 + 반사광 3개.
      이게 "살아 있는 눈" 과 "검은 점" 의 차이입니다.
================================================================== */

export type CatColorKey = "orange" | "green" | "cream" | "gray" | "calico";
export type CatMood = "happy" | "wink" | "sleepy" | "wow" | "love";

/** 무늬 종류 — 고양이마다 하나씩 */
type Marking = "tabby" | "sprout" | "swirl" | "cloud" | "calico";

type CatColorDef = {
  /** 화면에 보여 줄 이름 */
  name: string;
  /** 한 줄 소개 */
  tagline: string;
  /** 털색 4단계 — 밝음 / 기본 / 그늘 / 진함(윤곽) */
  light: string;
  base: string;
  shade: string;
  deep: string;
  /** 무늬 */
  marking: Marking;
  mark: string;
  mark2?: string;
};

export const CAT_COLORS: Record<CatColorKey, CatColorDef> = {
  orange: {
    name: "치즈냥",
    tagline: "흥정의 달인",
    light: "#FFDDB0",
    base: "#FFB169",
    shade: "#F59240",
    deep: "#E0752A",
    marking: "tabby",
    mark: "#EF8A33",
  },
  green: {
    name: "새싹냥",
    tagline: "식물 키우기 담당",
    light: "#E6F5D8",
    base: "#BFE5AB",
    shade: "#9BCE86",
    deep: "#7CB867",
    marking: "sprout",
    mark: "#5FA34C",
  },
  cream: {
    name: "우유냥",
    tagline: "느긋한 낮잠 전문",
    light: "#FFFCF6",
    base: "#FFEBD2",
    shade: "#F3D5AF",
    deep: "#DFBB90",
    marking: "swirl",
    mark: "#EFD0A8",
  },
  gray: {
    name: "구름냥",
    tagline: "조용한 관찰자",
    light: "#F6FAFD",
    base: "#DEE8F0",
    shade: "#C3D3E0",
    deep: "#A5B9CA",
    marking: "cloud",
    mark: "#FFFFFF",
  },
  calico: {
    name: "삼색냥",
    tagline: "뭐든 다 모으는 수집가",
    light: "#FFFDF9",
    base: "#FFF4E6",
    shade: "#F0E0CA",
    deep: "#D6BE9F",
    marking: "calico",
    mark: "#FFA35A",
    mark2: "#8A7060",
  },
};

export const CAT_COLOR_KEYS: CatColorKey[] = ["orange", "green", "cream", "gray", "calico"];

/* ── 모든 고양이가 함께 쓰는 색 ──────────────────────── */
const INK = "#372A22"; // 눈·입 (새까만 검정 대신 따뜻한 진갈색)
const EAR_IN = "#FFC2CC"; // 귀 안쪽
const EAR_IN_DEEP = "#FF9FB2";
const BLUSH = "#FF8FA5";

/** 얼굴 바깥선 — 볼이 통통하고 턱이 둥근 모양 (좌우 대칭) */
const HEAD =
  "M64 26 C81 26 94 33 100 45 C106 57 104 74 96 85 C88 97 77 105 64 105 C51 105 40 97 32 85 C24 74 22 57 28 45 C34 33 47 26 64 26 Z";

/** 귀 (왼쪽 / 오른쪽) — 끝이 살짝 둥근 세모. 크고 쫑긋할수록 고양이답습니다 */
const EAR_L = "M24 52 C19 34 21 14 27 9 C33 5 41 14 46 21 C51 28 56 31 60 34 Z";
const EAR_R = "M104 52 C109 34 107 14 101 9 C95 5 87 14 82 21 C77 28 72 31 68 34 Z";
const EAR_IN_L = "M32 46 C28 32 30 18 34 16 C38 14 43 21 46 25.5 C49 30 53 33 56 35 Z";
const EAR_IN_R = "M96 46 C100 32 98 18 94 16 C90 14 85 21 82 25.5 C79 30 75 33 72 35 Z";

/** 히어로 그림의 꼬리.
 *  두 가지를 지켰습니다.
 *   ① 선이 아니라 "면"으로 그려서 끝으로 갈수록 가늘어지게 (선은 막대기처럼 보여요)
 *   ② 고리처럼 말지 않고 위로 치켜들게 — 동그랗게 말면 컵 손잡이처럼 보입니다 */
const TAIL =
  "M272 266 C300 250 320 220 320 188 C320 170 326 156 336 148 C340 145 343 147 341 152 C336 160 332 172 332 188 C334 224 318 254 294 280 Z";

type CatFaceProps = {
  color?: CatColorKey;
  mood?: CatMood;
  size?: number;
} & Omit<SVGProps<SVGSVGElement>, "color">;

/**
 * 고양이 얼굴.
 * 아바타, 카드 장식, 빈 화면 안내 등 어디에나 올릴 수 있습니다.
 *
 * mood(표정)
 *  - happy  : 기본 (두 눈 뜨고 방긋)
 *  - wink   : 한쪽 눈 찡긋
 *  - sleepy : 두 눈 스르르
 *  - wow    : 눈 동그랗게 뜨고 입 벌림
 *  - love   : 눈이 하트
 */
export function CatFace({
  color = "orange",
  mood = "happy",
  size = 96,
  ...props
}: CatFaceProps) {
  const c = CAT_COLORS[color];

  // 그라데이션 이름표(id)는 털색마다 하나씩.
  // 같은 색이면 내용도 똑같으니 한 화면에 여러 마리가 있어도 괜찮습니다.
  const g = `mmc-${color}`;

  const leftOpen = mood === "happy" || mood === "wow";
  const rightOpen = mood === "happy" || mood === "wow" || mood === "wink";
  const big = mood === "wow";

  return (
    <svg
      viewBox="0 0 128 128"
      width={size}
      height={size}
      role="img"
      aria-label={`${c.name} 캐릭터`}
      {...props}
    >
      <defs>
        {/* 털 — 왼쪽 위가 밝고 오른쪽 아래가 어둡게 (빛은 왼쪽 위에서) */}
        <linearGradient id={`${g}-fur`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor={c.light} />
          <stop offset="48%" stopColor={c.base} />
          <stop offset="100%" stopColor={c.shade} />
        </linearGradient>
        {/* 귀 안쪽 */}
        <linearGradient id={`${g}-ear`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={EAR_IN} />
          <stop offset="100%" stopColor={EAR_IN_DEEP} />
        </linearGradient>
        {/* 눈동자 — 왼쪽 위가 살짝 밝은 갈색이라 유리구슬처럼 보입니다 */}
        <radialGradient id={`${g}-eye`} cx="34%" cy="26%" r="85%">
          <stop offset="0%" stopColor="#6B4A33" />
          <stop offset="55%" stopColor="#3B2A1E" />
          <stop offset="100%" stopColor="#241710" />
        </radialGradient>
        {/* 코 */}
        <linearGradient id={`${g}-nose`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFA7B6" />
          <stop offset="100%" stopColor="#EE7389" />
        </linearGradient>
        {/* 볼터치 — 가운데만 진하고 가장자리로 사라지게 */}
        <radialGradient id={`${g}-blush`}>
          <stop offset="0%" stopColor={BLUSH} stopOpacity="0.5" />
          <stop offset="100%" stopColor={BLUSH} stopOpacity="0" />
        </radialGradient>
        {/* 주둥이 볼록함 */}
        <radialGradient id={`${g}-muzzle`}>
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.88" />
          <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        {/* 얼굴 안쪽만 칠하기 위한 오려내기 틀 */}
        <clipPath id={`${g}-clip`}>
          <path d={HEAD} />
        </clipPath>
        {/* 번지는 그림자용 */}
        <filter id="mm-blur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* ── 귀 (얼굴 뒤) ───────────────────────────────── */}
      <g>
        <path d={EAR_L} fill={`url(#${g}-fur)`} />
        <path d={EAR_R} fill={`url(#${g}-fur)`} />
        <path d={EAR_IN_L} fill={`url(#${g}-ear)`} />
        <path d={EAR_IN_R} fill={`url(#${g}-ear)`} />
        {/* 귀 윤곽 — 검은 선이 아니라 같은 색의 진한 톤 */}
        <path d={EAR_L} fill="none" stroke={c.deep} strokeWidth="2" opacity="0.5" strokeLinejoin="round" />
        <path d={EAR_R} fill="none" stroke={c.deep} strokeWidth="2" opacity="0.5" strokeLinejoin="round" />
      </g>

      {/* ── 얼굴 ───────────────────────────────────────── */}
      <path d={HEAD} fill={`url(#${g}-fur)`} />

      {/* 얼굴 안쪽: 무늬 → 그늘 → 빛 (오려내기 틀 안에서만 그려집니다) */}
      <g clipPath={`url(#${g}-clip)`}>
        <CatMarkingFace cat={c} />
        {/* 오른쪽 아래 그늘 */}
        <ellipse cx="80" cy="120" rx="56" ry="30" fill={c.deep} opacity="0.34" filter="url(#mm-blur)" />
        {/* 왼쪽 위 빛 */}
        <ellipse cx="44" cy="20" rx="36" ry="19" fill="#FFFFFF" opacity="0.42" filter="url(#mm-blur)" />
      </g>

      {/* 얼굴 윤곽 — 아주 얇고 옅게만 */}
      <path d={HEAD} fill="none" stroke={c.deep} strokeWidth="2" opacity="0.45" strokeLinejoin="round" />

      {/* ── 머리 위에서 자라는 장식 ────────────────────
          새싹·배냇머리·별처럼 얼굴 밖으로 나가야 하는 것들.
          얼굴 안쪽(오려내기 틀)에 그리면 잘려서, 맨 위에 따로 그립니다. */}
      <CatMarkingOver cat={c} />

      {/* ── 볼터치 ─────────────────────────────────────── */}
      <circle cx="37" cy="82" r="11" fill={`url(#${g}-blush)`} />
      <circle cx="91" cy="82" r="11" fill={`url(#${g}-blush)`} />

      {/* ── 수염 — 아주 얇게, 있는 듯 없는 듯 ──────────── */}
      <g stroke={c.deep} strokeWidth="1.7" strokeLinecap="round" fill="none" opacity="0.42">
        <path d="M28 76 C19 73 12 71.5 6 72" />
        <path d="M27 83 C18 83 11 83.5 5 85" />
        <path d="M29 90 C20 92 14 94 9 96" />
        <path d="M100 76 C109 73 116 71.5 122 72" />
        <path d="M101 83 C110 83 117 83.5 123 85" />
        <path d="M99 90 C108 92 114 94 119 96" />
      </g>

      {/* ── 주둥이 (볼록한 두 덩어리 + 그 위에 코·입) ──── */}
      <ellipse cx="55.5" cy="89" rx="14" ry="10.5" fill={`url(#${g}-muzzle)`} />
      <ellipse cx="72.5" cy="89" rx="14" ry="10.5" fill={`url(#${g}-muzzle)`} />

      {/* ── 눈썹 (놀란 표정일 때만) ────────────────────── */}
      {mood === "wow" && (
        <g stroke={INK} strokeWidth="2.6" strokeLinecap="round" fill="none" opacity="0.75">
          <path d="M39 51 C43 46 51 46 55 49" />
          <path d="M89 51 C85 46 77 46 73 49" />
        </g>
      )}

      {/* ── 눈 ─────────────────────────────────────────── */}
      {mood === "love" ? (
        <>
          <HeartEye cx={48} cy={70} />
          <HeartEye cx={80} cy={70} />
        </>
      ) : (
        <>
          <Eye open={leftOpen} cx={48} big={big} sleepy={mood === "sleepy"} g={g} />
          <Eye open={rightOpen} cx={80} big={big} sleepy={mood === "sleepy"} g={g} />
        </>
      )}

      {/* ── 코 ─────────────────────────────────────────── */}
      <path
        d="M57 83.5 C59.4 81.6 68.6 81.6 71 83.5 C72.2 84.4 71.3 86.8 67.8 89.8 C65.7 91.6 62.3 91.6 60.2 89.8 C56.7 86.8 55.8 84.4 57 83.5 Z"
        fill={`url(#${g}-nose)`}
      />
      <ellipse cx="61" cy="84.8" rx="2.1" ry="1.2" fill="#FFFFFF" opacity="0.7" />

      {/* ── 입 ─────────────────────────────────────────── */}
      {mood === "wow" ? (
        <>
          <path
            d="M64 92 C71 92 74 96 74 100 C74 104.5 69.5 108 64 108 C58.5 108 54 104.5 54 100 C54 96 57 92 64 92 Z"
            fill="#5C3527"
          />
          <path d="M58 103 C60 107.5 68 107.5 70 103 Z" fill="#FF8DA1" />
        </>
      ) : (
        <g stroke={INK} strokeWidth="2.6" strokeLinecap="round" fill="none">
          <path d="M64 91 C64 98 58.4 100.2 54.6 97" />
          <path d="M64 91 C64 98 69.6 100.2 73.4 97" />
        </g>
      )}
    </svg>
  );
}

/** 눈 한 짝 — 홍채 그라데이션 + 반사광 3개 */
function Eye({
  open,
  cx,
  big,
  sleepy,
  g,
}: {
  open: boolean;
  cx: number;
  big: boolean;
  sleepy: boolean;
  g: string;
}) {
  const cy = 70;

  if (!open) {
    // 감은 눈 — 졸린 표정은 아래로, 찡긋은 위로 휜 곡선
    const d = sleepy
      ? `M${cx - 8} 68 C${cx - 3} 76 ${cx + 3} 76 ${cx + 8} 68`
      : `M${cx - 8} 73 C${cx - 3} 64 ${cx + 3} 64 ${cx + 8} 73`;
    return <path d={d} fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />;
  }

  const rx = big ? 10.6 : 9.4;
  const ry = big ? 13 : 11.4;

  return (
    <g>
      {/* 눈 바로 아래 옅은 그림자 — 눈이 얼굴에 "박혀" 보이게 */}
      <ellipse cx={cx} cy={cy + 2} rx={rx + 1.4} ry={ry + 1.4} fill="#7A5A44" opacity="0.13" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${g}-eye)`} />
      {/* ① 큰 반사광(왼쪽 위) ② 작은 반사광(오른쪽 아래) ③ 위쪽 가느다란 빛 */}
      <circle cx={cx - 3} cy={cy - 4.6} r={3.5} fill="#FFFFFF" />
      <circle cx={cx + 3.4} cy={cy + 5} r={1.8} fill="#FFFFFF" opacity="0.72" />
      <ellipse cx={cx + 2} cy={cy - 7.6} rx={2.3} ry={1.1} fill="#FFFFFF" opacity="0.45" />
    </g>
  );
}

/** 하트 눈 (love 표정) */
function HeartEye({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <path
        d={`M${cx} ${cy + 9.5} C${cx - 12.5} ${cy + 1} ${cx - 9.5} ${cy - 11.5} ${cx - 3.8} ${cy - 8} C${cx - 1.7} ${cy - 6.7} ${cx} ${cy - 4.9} ${cx} ${cy - 3.8} C${cx} ${cy - 4.9} ${cx + 1.7} ${cy - 6.7} ${cx + 3.8} ${cy - 8} C${cx + 9.5} ${cy - 11.5} ${cx + 12.5} ${cy + 1} ${cx} ${cy + 9.5} Z`}
        fill="#F2596F"
      />
      <ellipse cx={cx - 3.6} cy={cy - 3.4} rx={2.2} ry={1.5} fill="#FFFFFF" opacity="0.6" transform={`rotate(-30 ${cx - 3.6} ${cy - 3.4})`} />
    </g>
  );
}

/** 머리 위로 자라는 장식 — 얼굴보다 뒤에, 오려내기 없이 그립니다 */
function CatMarkingOver({ cat }: { cat: CatColorDef }) {
  switch (cat.marking) {
    // 새싹냥 — 머리에서 진짜로 새싹이 자랍니다
    case "sprout":
      return (
        <g className="animate-sway" style={{ transformOrigin: "64px 32px" }}>
          <path
            d="M64 34 C63 25 64 17 67 11"
            fill="none"
            stroke="#4E9440"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          {/* 오른쪽 큰 잎 */}
          <path
            d="M66 13 C71 6 80 7 81 13 C78 19 69 19 66 13 Z"
            fill="#6FB65C"
            stroke="#4E9440"
            strokeWidth="1.4"
            strokeOpacity="0.55"
            strokeLinejoin="round"
          />
          {/* 왼쪽 작은 잎 */}
          <path
            d="M64 23 C58 18 50 20 50 25 C54 30 62 28 64 23 Z"
            fill="#8CC97A"
            stroke="#4E9440"
            strokeWidth="1.4"
            strokeOpacity="0.5"
            strokeLinejoin="round"
          />
          {/* 이슬 한 방울 */}
          <circle cx="76" cy="10" r="2.2" fill="#FFFFFF" opacity="0.85" />
        </g>
      );

    // 우유냥 — 정수리에 배냇머리 한 가닥 (가늘게 말려 올라가게)
    case "swirl":
      return (
        <path
          d="M60 30 C55 20 62 9 70 11 C76 12.5 75 19 70 18.5"
          fill="none"
          stroke={cat.shade}
          strokeWidth="3.6"
          strokeLinecap="round"
        />
      );

    // 구름냥 — 얼굴 옆에 떠 있는 작은 별 두 개
    case "cloud":
      return (
        <g className="animate-twinkle" fill="#FFD76B">
          <path d="M111 34 l2.1 5.2 l5.2 2.1 l-5.2 2.1 l-2.1 5.2 l-2.1 -5.2 l-5.2 -2.1 l5.2 -2.1 Z" />
          <path d="M15 46 l1.5 3.8 l3.8 1.5 l-3.8 1.5 l-1.5 3.8 l-1.5 -3.8 l-3.8 -1.5 l3.8 -1.5 Z" />
        </g>
      );

    default:
      return null;
  }
}

/** 얼굴 안쪽 무늬 — 오려내기 틀 안에서만 그려집니다 */
function CatMarkingFace({ cat }: { cat: CatColorDef }) {
  switch (cat.marking) {
    // 치즈냥 — 이마의 줄무늬 세 개 + 볼 줄무늬
    case "tabby":
      return (
        <g fill="none" stroke={cat.mark} strokeLinecap="round" opacity="0.75">
          <g strokeWidth="4.6">
            <path d="M54 32 L51 44" />
            <path d="M64 29 L64 42" />
            <path d="M74 32 L77 44" />
          </g>
          <g strokeWidth="3.6">
            <path d="M22 60 C28 61 32 62.5 35 64" />
            <path d="M23 70 C29 70 33 70.5 36 71" />
            <path d="M106 60 C100 61 96 62.5 93 64" />
            <path d="M105 70 C99 70 95 70.5 92 71" />
          </g>
        </g>
      );

    // 새싹냥 — 이마에 여린 잎 자국
    case "sprout":
      return (
        <g fill={cat.mark} opacity="0.5">
          <ellipse cx="64" cy="40" rx="15" ry="8" />
        </g>
      );

    // 우유냥 — 이마에 흘러내린 우유 얼룩
    case "swirl":
      return (
        <path
          d="M44 30 C56 26 74 26 86 31 C90 40 84 50 76 51 C70 52 68 46 62 47 C55 48 52 54 46 50 C40 46 40 35 44 30 Z"
          fill={cat.mark}
          opacity="0.75"
        />
      );

    // 구름냥 — 머리 위쪽만 털이 진한 "캡 무늬".
    // 아래쪽 경계를 구름처럼 물결지게 깎아서 이름값도 합니다.
    case "cloud":
      return (
        <g>
          <path
            d="M20 58 C22 40 34 24 64 24 C94 24 106 40 108 58 C100 52 92 48 84 50 C77 52 72 57 64 57 C56 57 51 52 44 50 C36 48 28 52 20 58 Z"
            fill="#B2C6D6"
            opacity="0.95"
          />
          {/* 캡 아래 옅은 그늘 */}
          <path
            d="M20 58 C28 52 36 48 44 50 C51 52 56 57 64 57 C72 57 77 52 84 50 C92 48 100 52 108 58 C100 58 94 55 86 54 C78 53 72 61 64 61 C56 61 50 53 42 54 C34 55 28 58 20 58 Z"
            fill="#8FA7BC"
            opacity="0.35"
          />
        </g>
      );

    // 삼색냥 — 주황 얼룩과 먹색 얼룩을 좌우 비대칭으로
    case "calico":
      return (
        <g>
          <path
            d="M16 48 C24 26 44 17 62 21 C51 32 44 46 41 64 C30 64 20 58 16 48 Z"
            fill={cat.mark}
            opacity="0.95"
          />
          <path
            d="M110 52 C113 70 105 90 94 100 C86 87 84 68 88 54 C95 47 105 48 110 52 Z"
            fill={cat.mark2}
            opacity="0.8"
          />
          <ellipse cx="74" cy="30" rx="11" ry="6" fill={cat.mark} opacity="0.5" />
        </g>
      );
  }
}

/* ==================================================================
   히어로 일러스트 — 만물 상자를 안고 있는 치즈냥
================================================================== */

/**
 * 랜딩 페이지 대문 그림.
 * 앉아 있는 고양이가 온갖 물건이 담긴 상자를 끌어안고 있습니다.
 *
 * 뒤에서 앞으로 순서대로 그립니다.
 *   배경 → 바닥그림자 → 꼬리 → 몸통 → 상자 안쪽 → 물건 → 상자 앞판 → 얼굴 → 앞발 → 반짝임
 */
export function CatWithBox({ size = 380, ...props }: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 400 360"
      width={size}
      height={size * (360 / 400)}
      role="img"
      aria-label="온갖 물건이 담긴 상자를 안고 있는 고양이"
      {...props}
    >
      <defs>
        {/* 배경 원 */}
        <radialGradient id="mmh-bg" cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#FFF7EE" />
          <stop offset="100%" stopColor="#FFDFC0" />
        </radialGradient>
        {/* 고양이 몸통 */}
        <linearGradient id="mmh-body" x1="0.2" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#FFDDB0" />
          <stop offset="50%" stopColor="#FFB169" />
          <stop offset="100%" stopColor="#F59240" />
        </linearGradient>
        {/* 가슴털 (가장자리가 부드럽게 사라지도록) */}
        <radialGradient id="mmh-chest">
          <stop offset="0%" stopColor="#FFF1DC" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FFF1DC" stopOpacity="0" />
        </radialGradient>
        {/* 상자 — 앞판 / 날개 / 안쪽 */}
        <linearGradient id="mmh-box" x1="0.15" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#FFE3C6" />
          <stop offset="100%" stopColor="#F5C293" />
        </linearGradient>
        <linearGradient id="mmh-lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFDCBB" />
          <stop offset="100%" stopColor="#F0BA88" />
        </linearGradient>
        <linearGradient id="mmh-inner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C58E5C" />
          <stop offset="100%" stopColor="#E0AB78" />
        </linearGradient>
        {/* 상자 안으로 드리우는 그늘 */}
        <linearGradient id="mmh-boxshade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8A5626" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#8A5626" stopOpacity="0" />
        </linearGradient>
        {/* 화분 */}
        <linearGradient id="mmh-pot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFB169" />
          <stop offset="100%" stopColor="#E0752A" />
        </linearGradient>
        {/* 램프갓 */}
        <linearGradient id="mmh-lamp" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#7FCEE2" />
          <stop offset="100%" stopColor="#3D9FBA" />
        </linearGradient>

        {/* 번지는 그림자 (크게 / 작게) */}
        <filter id="mmh-blur-lg" x="-40%" y="-60%" width="180%" height="220%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id="mmh-blur-sm" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>

        {/* 꼬리 무늬를 꼬리 밖으로 안 삐져나가게 */}
        <clipPath id="mmh-tail-clip">
          <path d={TAIL} />
        </clipPath>
      </defs>

      {/* ── 배경 ───────────────────────────────────────── */}
      <circle cx="200" cy="176" r="172" fill="url(#mmh-bg)" />
      {/* 왼쪽 위에서 들어오는 빛 */}
      <ellipse cx="146" cy="100" rx="104" ry="82" fill="#FFFFFF" opacity="0.42" filter="url(#mmh-blur-lg)" />
      {/* 점선 테두리 — 아주 옅게 */}
      <circle
        cx="200"
        cy="176"
        r="172"
        fill="none"
        stroke="#F6B77F"
        strokeWidth="2.5"
        strokeDasharray="1 15"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* 배경에 흩어진 동그라미 — 깊이감용 */}
      <g fill="#FFB169" opacity="0.22">
        <circle cx="74" cy="80" r="5" />
        <circle cx="330" cy="76" r="7" />
        <circle cx="48" cy="196" r="4" />
        <circle cx="358" cy="196" r="5" />
        <circle cx="112" cy="36" r="3.5" />
        <circle cx="272" cy="30" r="4" />
      </g>

      {/* ── 바닥 그림자 (번지게) ───────────────────────── */}
      <ellipse cx="200" cy="320" rx="136" ry="18" fill="#D9A877" opacity="0.5" filter="url(#mmh-blur-lg)" />

      {/* ── 몸통 ───────────────────────────────────────── */}
      <path
        d="M200 136 C244 136 268 174 268 218 C268 256 238 280 200 280 C162 280 132 256 132 218 C132 174 156 136 200 136 Z"
        fill="url(#mmh-body)"
      />
      <path
        d="M200 136 C244 136 268 174 268 218 C268 256 238 280 200 280 C162 280 132 256 132 218 C132 174 156 136 200 136 Z"
        fill="none"
        stroke="#E0752A"
        strokeWidth="2.2"
        opacity="0.4"
      />
      {/* 가슴털 */}
      <ellipse cx="198" cy="236" rx="54" ry="44" fill="url(#mmh-chest)" />

      {/* ── 상자 안쪽 (물건보다 뒤) ────────────────────── */}
      <path d="M100 218 L300 218 L292 244 L108 244 Z" fill="url(#mmh-inner)" />

      {/* ── 상자에 담긴 물건들 ─────────────────────────
          고양이 얼굴(가운데 위)을 가리지 않도록 좌우로 나눠 배치했어요.
          전부 같은 규칙(테두리 없음 · 왼쪽 위 빛)으로 그립니다. */}

      {/* 화분 속 식물 — 왼쪽 (잎이 살랑살랑) */}
      <g className="animate-sway" style={{ transformOrigin: "98px 208px" }}>
        <path d="M96 208 C66 192 58 152 78 134 C102 152 108 186 96 208 Z" fill="#8CC97A" />
        <path d="M96 208 C82 186 78 158 78 134 C66 152 70 190 96 208 Z" fill="#6FB65C" opacity="0.5" />
        <path d="M100 208 C126 196 140 160 122 142 C100 160 92 188 100 208 Z" fill="#A9D995" />
        <path d="M100 208 C110 188 116 164 122 142 C100 160 92 188 100 208 Z" fill="#C6E7B5" opacity="0.55" />
      </g>
      {/* 화분 (윗부분만 상자 밖으로) */}
      <path d="M78 202 L122 202 L116 240 L84 240 Z" fill="url(#mmh-pot)" />
      <rect x="74" y="194" width="52" height="14" rx="7" fill="#FFC489" />
      <rect x="74" y="194" width="52" height="6" rx="3" fill="#FFE0BC" opacity="0.8" />

      {/* 책 두 권 — 왼쪽, 화분 앞에 기대어 */}
      <g transform="rotate(-6 132 196)">
        <rect x="98" y="186" width="72" height="20" rx="6" fill="#A98BE8" />
        <rect x="98" y="186" width="72" height="7" rx="3.5" fill="#C6AFF4" />
        <rect x="104" y="186" width="5" height="20" fill="#8663D4" opacity="0.65" />
      </g>
      <g transform="rotate(4 134 212)">
        <rect x="100" y="204" width="72" height="20" rx="6" fill="#F97288" />
        <rect x="100" y="204" width="72" height="7" rx="3.5" fill="#FFA0AF" />
        <rect x="106" y="204" width="5" height="20" fill="#DB4A63" opacity="0.65" />
      </g>

      {/* 노란 오리 인형 — 가운데 */}
      <g transform="translate(176 178)">
        <ellipse cx="0" cy="20" rx="20" ry="15" fill="#FFCF55" />
        <ellipse cx="-5" cy="15" rx="12" ry="8" fill="#FFE8A8" opacity="0.8" />
        <circle cx="11" cy="3" r="13" fill="#FFD866" />
        <circle cx="6" cy="-2" r="6.5" fill="#FFEEBC" opacity="0.75" />
        <path d="M22 1 C30 2 33 5 33 6.5 C33 8 30 11 22 12 Z" fill="#FB8A3C" />
        <circle cx="14" cy="0" r="2.2" fill="#3C2A1E" />
        <circle cx="14.9" cy="-0.8" r="0.9" fill="#FFFFFF" />
      </g>

      {/* 찻잔 — 오리 옆 */}
      <g transform="translate(228 186)">
        <path d="M-17 0 L17 0 L13 26 C12 30 -12 30 -13 26 Z" fill="#FFFFFF" />
        <path d="M-17 0 L17 0 L16 7 L-16 7 Z" fill="#46B2CC" />
        <path d="M17 5 C28 5 28 21 15 21" fill="none" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M-10 6 L-8 24" stroke="#DCE9EE" strokeWidth="3.4" strokeLinecap="round" opacity="0.9" />
      </g>

      {/* 스탠드 조명 — 오른쪽 */}
      <rect x="286" y="168" width="8" height="52" rx="4" fill="#A08A78" />
      <path d="M262 172 L318 172 L307 136 L273 136 Z" fill="url(#mmh-lamp)" />
      <path d="M262 172 L318 172 L316 165 L264 165 Z" fill="#2E8AA6" opacity="0.32" />
      <path d="M270 168 L279 139" stroke="#FFFFFF" strokeWidth="4.5" opacity="0.4" strokeLinecap="round" />
      {/* 전구에서 새어 나오는 빛 */}
      <ellipse cx="290" cy="178" rx="26" ry="10" fill="#FFE6A3" opacity="0.45" filter="url(#mmh-blur-sm)" />

      {/* ── 상자 ───────────────────────────────────────── */}
      {/* 열려서 젖혀진 날개 (뒤쪽 두 장) */}
      <path d="M96 234 L54 210 L68 190 L110 218 Z" fill="url(#mmh-lid)" />
      <path d="M304 234 L346 210 L332 190 L290 218 Z" fill="url(#mmh-lid)" />

      {/* ── 꼬리 ────────────────────────────────────────
          위로 치켜든 꼬리. 상자 날개 앞을 지나가게 그려서
          날개에 잘려 보이지 않도록 했습니다. */}
      <g className="animate-sway" style={{ transformOrigin: "284px 274px" }}>
        <path d={TAIL} fill="url(#mmh-body)" />
        {/* 꼬리 줄무늬 */}
        <g clipPath="url(#mmh-tail-clip)" stroke="#EF8A33" strokeWidth="8" strokeLinecap="round" opacity="0.5">
          <path d="M296 262 L312 272" />
          <path d="M318 222 L336 226" />
          <path d="M320 186 L336 186" />
        </g>
        <path d={TAIL} fill="none" stroke="#E0752A" strokeWidth="2" opacity="0.38" strokeLinejoin="round" />
      </g>

      {/* 앞판 */}
      <path d="M102 238 L298 238 L288 316 L112 316 Z" fill="url(#mmh-box)" />
      {/* 앞판 위쪽으로 지는 그늘 (상자 속 깊이감) */}
      <path d="M102 238 L298 238 L296 258 L104 258 Z" fill="url(#mmh-boxshade)" />
      {/* 위쪽 테두리 */}
      <rect x="92" y="212" width="216" height="28" rx="14" fill="url(#mmh-lid)" />
      <rect x="92" y="212" width="216" height="10" rx="5" fill="#FFEAD2" opacity="0.65" />
      {/* 가운데를 지나는 포장 테이프 */}
      <path d="M186 238 L214 238 L213 316 L187 316 Z" fill="#FFF0DC" opacity="0.75" />
      <path d="M186 238 L214 238" stroke="#E8BC8C" strokeWidth="1.6" opacity="0.5" />
      <path d="M200 240 L200 314" stroke="#D89C62" strokeWidth="1.6" opacity="0.22" />

      {/* 상자에 매달린 가격표 */}
      <path d="M104 244 C98 252 94 258 92 262" fill="none" stroke="#D89C62" strokeWidth="2" strokeLinecap="round" />
      <g transform="rotate(-14 84 276)">
        <rect x="64" y="262" width="40" height="28" rx="9" fill="#FFC53D" />
        <rect x="64" y="262" width="40" height="10" rx="5" fill="#FFDA7C" opacity="0.8" />
        <circle cx="72" cy="270" r="3" fill="#FFFAF3" />
        <path d="M88 272 C84 268 85 263 88.5 264.5 C89.7 265 90.4 266 90.4 266 C90.4 266 91.1 265 92.3 264.5 C95.8 263 96.8 268 92.8 272 C91.4 273.4 89.4 273.4 88 272 Z" fill="#F2596F" />
      </g>
      {/* 상자에 붙은 이름표 */}
      <rect x="158" y="262" width="84" height="40" rx="13" fill="#FFFAF3" />
      <rect x="158" y="262" width="84" height="40" rx="13" fill="none" stroke="#E8BC8C" strokeWidth="2" />
      <text
        x="200"
        y="290"
        textAnchor="middle"
        fill="#C15205"
        fontSize="22"
        style={{ fontFamily: "var(--font-display), sans-serif" }}
      >
        만물
      </text>
      {/* 상자 윤곽 */}
      <path
        d="M102 238 L298 238 L288 316 L112 316 Z"
        fill="none"
        stroke="#D89C62"
        strokeWidth="2.2"
        opacity="0.5"
        strokeLinejoin="round"
      />

      {/* ── 얼굴 ───────────────────────────────────────── */}
      {/* 턱 아래 그림자 — 얼굴이 몸에 붙어 보이게 */}
      <ellipse cx="202" cy="182" rx="52" ry="18" fill="#D97F2C" opacity="0.22" filter="url(#mmh-blur-sm)" />
      <g transform="translate(136 36)">
        <CatFace size={128} color="orange" mood="happy" />
      </g>

      {/* ── 상자를 안은 앞발 ───────────────────────────── */}
      <g>
        <ellipse cx="116" cy="228" rx="27" ry="16" fill="#FFC489" transform="rotate(-12 116 228)" />
        <ellipse cx="284" cy="228" rx="27" ry="16" fill="#FFC489" transform="rotate(12 284 228)" />
        {/* 발 위쪽 하이라이트 */}
        <ellipse cx="112" cy="223" rx="17" ry="7" fill="#FFE5C4" opacity="0.75" transform="rotate(-12 112 223)" />
        <ellipse cx="280" cy="223" rx="17" ry="7" fill="#FFE5C4" opacity="0.75" transform="rotate(12 280 223)" />
        {/* 윤곽 */}
        <ellipse cx="116" cy="228" rx="27" ry="16" fill="none" stroke="#E0752A" strokeWidth="2" opacity="0.38" transform="rotate(-12 116 228)" />
        <ellipse cx="284" cy="228" rx="27" ry="16" fill="none" stroke="#E0752A" strokeWidth="2" opacity="0.38" transform="rotate(12 284 228)" />
        {/* 발가락 주름 */}
        <g stroke="#E8974A" strokeWidth="2.2" strokeLinecap="round" opacity="0.7">
          <path d="M107 222 L105 232" />
          <path d="M116 220 L115 231" />
          <path d="M125 221 L125 231" />
          <path d="M293 222 L295 232" />
          <path d="M284 220 L285 231" />
          <path d="M275 221 L275 231" />
        </g>
      </g>

      {/* ── 반짝임 · 하트 ──────────────────────────────── */}
      <g className="animate-twinkle" fill="#FFC53D">
        <path d="M74 118 l5.5 14 l14 5.5 l-14 5.5 l-5.5 14 l-5.5 -14 l-14 -5.5 l14 -5.5 Z" />
      </g>
      <g className="animate-twinkle" style={{ animationDelay: "0.9s" }} fill="#FFC53D">
        <path d="M336 128 l3.8 9.5 l9.5 3.8 l-9.5 3.8 l-3.8 9.5 l-3.8 -9.5 l-9.5 -3.8 l9.5 -3.8 Z" />
      </g>
      <g className="animate-twinkle" style={{ animationDelay: "1.7s" }} fill="#F2596F">
        <path d="M62 282 C55 275 57 265 62.5 267.5 C64.4 268.4 65.5 270 65.5 270 C65.5 270 66.6 268.4 68.5 267.5 C74 265 76 275 69 282 C66.6 284.4 64.4 284.4 62 282 Z" />
      </g>
    </svg>
  );
}

/** 작은 고양이 발자국 — 구분선이나 배경 장식용 */
export function PawPrint({ size = 24, ...props }: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" {...props}>
      <ellipse cx="16" cy="22" rx="9" ry="7.5" fill="currentColor" />
      <ellipse cx="7" cy="12" rx="3.6" ry="4.8" fill="currentColor" />
      <ellipse cx="13.5" cy="7.5" rx="3.6" ry="5" fill="currentColor" />
      <ellipse cx="20.5" cy="7.5" rx="3.6" ry="5" fill="currentColor" />
      <ellipse cx="26" cy="12.5" rx="3.6" ry="4.8" fill="currentColor" />
    </svg>
  );
}
