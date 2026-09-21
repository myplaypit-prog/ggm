import type { SVGProps } from "react";

/* ==================================================================
   만물마켓 마스코트 — 동네 고양이 5마리

   그림은 전부 코드로 그린 SVG 입니다. (이미지 파일이 아니에요)
   2차 리뉴얼에서 이렇게 바꿨습니다.
     · 단색 → 그라데이션(위는 밝고 아래는 어둡게) 으로 입체감 추가
     · 얼굴을 볼이 통통한 모양으로 다시 그림
     · 눈에 반사광 두 개를 넣어 촉촉해 보이게
     · 고양이마다 고유 무늬를 줘서 다섯 마리가 확실히 구분되게
================================================================== */

export type CatColorKey = "orange" | "green" | "cream" | "gray" | "calico";
export type CatMood = "happy" | "wink" | "sleepy" | "wow" | "love";

/** 무늬 종류 — 고양이마다 하나씩 가집니다 */
type Marking = "tabby" | "sprout" | "curl" | "cloud" | "calico";

type CatColorDef = {
  /** 화면에 보여 줄 이름 */
  name: string;
  /** 한 줄 소개 */
  tagline: string;
  /** 털색 — 밝은 쪽 / 기본 / 그늘 / 윤곽선 */
  furTop: string;
  fur: string;
  furShade: string;
  line: string;
  /** 귀 안쪽 분홍 */
  ear: string;
  /** 무늬 종류와 색 */
  marking: Marking;
  markColor: string;
  markColor2?: string;
};

export const CAT_COLORS: Record<CatColorKey, CatColorDef> = {
  orange: {
    name: "치즈냥",
    tagline: "흥정의 달인",
    furTop: "#FFCB93",
    fur: "#FFA75E",
    furShade: "#F0872F",
    line: "#C6600F",
    ear: "#FFC3CB",
    marking: "tabby",
    markColor: "#EE8028",
  },
  green: {
    name: "새싹냥",
    tagline: "식물 키우기 담당",
    furTop: "#D7EFC8",
    fur: "#AEDC9E",
    furShade: "#87BE77",
    line: "#4A8B43",
    ear: "#FFC3CB",
    marking: "sprout",
    markColor: "#5FA84F",
  },
  cream: {
    name: "우유냥",
    tagline: "느긋한 낮잠 전문",
    furTop: "#FFF6E8",
    fur: "#FFE5C6",
    furShade: "#F0CCA0",
    line: "#C79A63",
    ear: "#FFC3CB",
    marking: "curl",
    markColor: "#EDC191",
  },
  gray: {
    name: "구름냥",
    tagline: "조용한 관찰자",
    furTop: "#EEF4F8",
    fur: "#D5E0E8",
    furShade: "#B6C6D2",
    line: "#7B90A1",
    ear: "#FFC3CB",
    marking: "cloud",
    markColor: "#FFFFFF",
  },
  calico: {
    name: "삼색냥",
    tagline: "뭐든 다 모으는 수집가",
    furTop: "#FFFAF2",
    fur: "#FFF0DC",
    furShade: "#EBD7BB",
    line: "#B58F63",
    ear: "#FFC3CB",
    marking: "calico",
    markColor: "#FF9A4D",
    markColor2: "#8A6244",
  },
};

export const CAT_COLOR_KEYS: CatColorKey[] = ["orange", "green", "cream", "gray", "calico"];

/** 얼굴 바깥선 (볼이 통통한 모양) */
const HEAD_PATH =
  "M60 24 C79 24 94 33 98 48 C101 60 99 78 88 90 C79 100 70 103 60 103 C50 103 41 100 32 90 C21 78 19 60 22 48 C26 33 41 24 60 24 Z";

/** 눈·입에 쓰는 진한 갈색 (새까만 검정보다 부드러워요) */
const INK = "#3A2A20";

type CatFaceProps = {
  color?: CatColorKey;
  mood?: CatMood;
  size?: number;
} & Omit<SVGProps<SVGSVGElement>, "color">;

/**
 * 고양이 얼굴.
 * 아바타, 카드 장식, 빈 화면 안내 등 어디에나 올릴 수 있습니다.
 *
 * mood(표정) 종류
 *  - happy  : 기본 (두 눈 뜨고 방긋)
 *  - wink   : 한쪽 눈 찡긋
 *  - sleepy : 두 눈 스르르 감음
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
  // 같은 색이면 내용도 똑같아서 한 화면에 여러 마리가 있어도 괜찮습니다.
  const gid = `mm-${color}`;

  const leftEyeOpen = mood === "happy" || mood === "wow";
  const rightEyeOpen = mood === "happy" || mood === "wow" || mood === "wink";
  const bigEyes = mood === "wow";

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      role="img"
      aria-label={`${c.name} 캐릭터`}
      {...props}
    >
      <defs>
        {/* 털 그라데이션 — 위쪽은 밝고 아래쪽은 살짝 어둡게 */}
        <linearGradient id={`${gid}-fur`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.furTop} />
          <stop offset="62%" stopColor={c.fur} />
          <stop offset="100%" stopColor={c.furShade} />
        </linearGradient>
        {/* 눈동자 — 아래쪽이 살짝 밝아 촉촉해 보입니다 */}
        <linearGradient id={`${gid}-eye`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A1C14" />
          <stop offset="100%" stopColor="#5A3D2A" />
        </linearGradient>
        {/* 볼터치 — 가운데만 진하고 가장자리로 갈수록 사라지게 */}
        <radialGradient id={`${gid}-blush`}>
          <stop offset="0%" stopColor="#FF8AA0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FF8AA0" stopOpacity="0" />
        </radialGradient>
        {/* 코 */}
        <linearGradient id={`${gid}-nose`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFA3B2" />
          <stop offset="100%" stopColor="#EF7189" />
        </linearGradient>
        {/* 얼굴 안쪽만 칠하기 위한 오려내기 틀 */}
        <clipPath id={`${gid}-clip`}>
          <path d={HEAD_PATH} />
        </clipPath>
      </defs>

      {/* ── 귀 (얼굴보다 뒤에 그립니다) ─────────────── */}
      <g stroke={c.line} strokeWidth="3" strokeLinejoin="round">
        <path d="M24 50 C21 30 24 15 31 13 C38 11 51 22 57 30 Z" fill={`url(#${gid}-fur)`} />
        <path d="M96 50 C99 30 96 15 89 13 C82 11 69 22 63 30 Z" fill={`url(#${gid}-fur)`} />
      </g>
      {/* 귀 안쪽 */}
      <path d="M31 44 C29.5 30 31 21 34.5 20 C38.5 19.5 46.5 27 50 32 Z" fill={c.ear} />
      <path d="M89 44 C90.5 30 89 21 85.5 20 C81.5 19.5 73.5 27 70 32 Z" fill={c.ear} />

      {/* ── 얼굴 ────────────────────────────────────── */}
      <path d={HEAD_PATH} fill={`url(#${gid}-fur)`} />

      {/* 얼굴 안쪽 장식 — 무늬 + 명암.
          오려내기 틀을 씌워서 얼굴 밖으로 삐져나가지 않게 합니다. */}
      <g clipPath={`url(#${gid}-clip)`}>
        <CatMarking cat={c} />
        {/* 턱 쪽 그늘 */}
        <ellipse cx="60" cy="122" rx="54" ry="28" fill={c.furShade} opacity="0.38" />
        {/* 이마 쪽 빛 */}
        <ellipse cx="60" cy="14" rx="44" ry="20" fill="#FFFFFF" opacity="0.28" />
      </g>

      {/* 얼굴 윤곽선 (무늬 위에 한 번 더 그려서 선이 또렷하게) */}
      <path d={HEAD_PATH} fill="none" stroke={c.line} strokeWidth="3" strokeLinejoin="round" />

      {/* ── 볼터치 ──────────────────────────────────── */}
      <circle cx="29" cy="76" r="11" fill={`url(#${gid}-blush)`} />
      <circle cx="91" cy="76" r="11" fill={`url(#${gid}-blush)`} />

      {/* ── 수염 ────────────────────────────────────── */}
      <g stroke={c.line} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.45">
        <path d="M27 70 C18 67 11 65.5 5 66" />
        <path d="M26 76 C17 76 10 76 4 77" />
        <path d="M27 82 C18 84 12 86 7 88" />
        <path d="M93 70 C102 67 109 65.5 115 66" />
        <path d="M94 76 C103 76 110 76 116 77" />
        <path d="M93 82 C102 84 108 86 113 88" />
      </g>

      {/* ── 눈썹 (놀란 표정일 때만) ─────────────────── */}
      {mood === "wow" && (
        <g stroke={INK} strokeWidth="2.6" strokeLinecap="round" fill="none" opacity="0.8">
          <path d="M37 47 C41 43 48 43 52 45" />
          <path d="M83 47 C79 43 72 43 68 45" />
        </g>
      )}

      {/* ── 눈 ──────────────────────────────────────── */}
      {mood === "love" ? (
        <>
          <HeartEye cx={45.5} cy={63} />
          <HeartEye cx={74.5} cy={63} />
        </>
      ) : (
        <>
          <Eye open={leftEyeOpen} cx={45.5} big={bigEyes} sleepy={mood === "sleepy"} gid={gid} />
          <Eye open={rightEyeOpen} cx={74.5} big={bigEyes} sleepy={mood === "sleepy"} gid={gid} />
        </>
      )}

      {/* ── 주둥이 (살짝 밝게 해서 코·입이 도드라지게) ── */}
      <ellipse cx="60" cy="82" rx="17" ry="11.5" fill="#FFFFFF" opacity="0.4" />

      {/* ── 코 ──────────────────────────────────────── */}
      <path
        d="M53.8 76 C56.2 74.4 63.8 74.4 66.2 76 C67.2 76.7 66.4 78.8 63.5 81.4 C61.7 83 58.3 83 56.5 81.4 C53.6 78.8 52.8 76.7 53.8 76 Z"
        fill={`url(#${gid}-nose)`}
      />
      <ellipse cx="57.6" cy="77.2" rx="1.9" ry="1.1" fill="#FFFFFF" opacity="0.65" />

      {/* ── 입 ──────────────────────────────────────── */}
      {mood === "wow" ? (
        <>
          <ellipse cx="60" cy="90" rx="5.4" ry="6.4" fill="#5A3324" />
          <path d="M55.4 92.5 C57.5 96.5 62.5 96.5 64.6 92.5 Z" fill="#FF8DA1" />
        </>
      ) : (
        <g stroke={INK} strokeWidth="2.4" strokeLinecap="round" fill="none">
          <path d="M60 83.5 C60 89 55.8 90.6 52.8 88.4" />
          <path d="M60 83.5 C60 89 64.2 90.6 67.2 88.4" />
        </g>
      )}
    </svg>
  );
}

/** 눈 한 짝 */
function Eye({
  open,
  cx,
  big,
  sleepy,
  gid,
}: {
  open: boolean;
  cx: number;
  big: boolean;
  sleepy: boolean;
  gid: string;
}) {
  if (!open) {
    // 감은 눈 — 졸린 표정은 아래로, 찡긋은 위로 휜 곡선
    const d = sleepy
      ? `M${cx - 7.5} 61.5 C${cx - 3} 69 ${cx + 3} 69 ${cx + 7.5} 61.5`
      : `M${cx - 7.5} 65.5 C${cx - 3} 57.5 ${cx + 3} 57.5 ${cx + 7.5} 65.5`;
    return <path d={d} fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />;
  }

  const rx = big ? 9.4 : 8.2;
  const ry = big ? 11.8 : 10.2;

  return (
    <g>
      <ellipse cx={cx} cy={63} rx={rx} ry={ry} fill={`url(#${gid}-eye)`} />
      {/* 큰 반사광 + 작은 반사광 = 촉촉한 눈 */}
      <circle cx={cx - 2.6} cy={58.5} r={3.1} fill="#FFFFFF" />
      <circle cx={cx + 3} cy={67.5} r={1.6} fill="#FFFFFF" opacity="0.7" />
    </g>
  );
}

/** 하트 눈 (love 표정) */
function HeartEye({ cx, cy }: { cx: number; cy: number }) {
  return (
    <path
      d={`M${cx} ${cy + 8.5} C${cx - 11.5} ${cy + 0.5} ${cx - 8.5} ${cy - 10.5} ${cx - 3.4} ${cy - 7.2} C${cx - 1.5} ${cy - 6} ${cx} ${cy - 4.4} ${cx} ${cy - 3.4} C${cx} ${cy - 4.4} ${cx + 1.5} ${cy - 6} ${cx + 3.4} ${cy - 7.2} C${cx + 8.5} ${cy - 10.5} ${cx + 11.5} ${cy + 0.5} ${cx} ${cy + 8.5} Z`}
      fill="#F2596F"
    />
  );
}

/** 고양이마다 다른 이마 무늬 */
function CatMarking({ cat }: { cat: CatColorDef }) {
  switch (cat.marking) {
    // 치즈냥 — 이마 줄무늬 세 개 + 볼 줄무늬
    case "tabby":
      return (
        <g stroke={cat.markColor} strokeWidth="4.2" strokeLinecap="round" fill="none" opacity="0.8">
          <path d="M51 31 L48.5 41" />
          <path d="M60 28 L60 39" />
          <path d="M69 31 L71.5 41" />
          <path d="M23 57 L31 59" />
          <path d="M97 57 L89 59" />
        </g>
      );

    // 새싹냥 — 머리에서 새싹이 돋았습니다
    case "sprout":
      return (
        <g>
          <path
            d="M60 30 C59 22 61 15 64 11"
            fill="none"
            stroke={cat.markColor}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path d="M64 12 C69 6 77 7 78 12 C76 17 67 17 64 12 Z" fill={cat.markColor} />
          <path
            d="M61 20 C56 16 49 18 49 22 C52 27 59 25 61 20 Z"
            fill={cat.markColor}
            opacity="0.85"
          />
        </g>
      );

    // 우유냥 — 정수리에 배냇머리 한 가닥
    case "curl":
      return (
        <path
          d="M56 30 C53 20 61 13 66 17 C69 20 65 24 62 22"
          fill="none"
          stroke={cat.markColor}
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      );

    // 구름냥 — 이마에 구름 한 조각
    case "cloud":
      return (
        <g fill={cat.markColor} opacity="0.9">
          <circle cx="51" cy="38" r="7.5" />
          <circle cx="62" cy="34" r="9" />
          <circle cx="72" cy="39" r="7" />
          <rect x="49" y="38" width="25" height="8" rx="4" />
        </g>
      );

    // 삼색냥 — 주황 얼룩 + 갈색 얼룩
    case "calico":
      return (
        <g>
          <path
            d="M18 46 C26 26 44 18 60 22 C50 33 44 46 41 62 C30 62 21 56 18 46 Z"
            fill={cat.markColor}
            opacity="0.9"
          />
          <path
            d="M100 50 C102 66 96 82 87 92 C81 81 79 66 82 53 C88 48 96 47 100 50 Z"
            fill={cat.markColor2}
            opacity="0.75"
          />
        </g>
      );
  }
}

/* ==================================================================
   히어로 일러스트 — 만물 상자를 안고 있는 고양이
================================================================== */

/**
 * 랜딩 페이지 대문 그림.
 * 앉아 있는 고양이가 온갖 물건이 담긴 상자를 끌어안고 있습니다.
 * 뒤에서 앞으로 순서대로 그려요:
 *   배경 → 꼬리 → 몸통 → 상자 속 물건 → 상자 → 얼굴 → 앞발 → 반짝임
 */
export function CatWithBox({ size = 340, ...props }: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 360 330"
      width={size}
      height={size * (330 / 360)}
      role="img"
      aria-label="온갖 물건이 담긴 상자를 안고 있는 고양이"
      {...props}
    >
      <defs>
        <radialGradient id="mm-hero-bg" cx="50%" cy="38%">
          <stop offset="0%" stopColor="#FFF4E8" />
          <stop offset="100%" stopColor="#FFDFC0" />
        </radialGradient>
        <linearGradient id="mm-hero-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFCB93" />
          <stop offset="70%" stopColor="#FFA75E" />
          <stop offset="100%" stopColor="#F0872F" />
        </linearGradient>
        <linearGradient id="mm-hero-box" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE2C4" />
          <stop offset="100%" stopColor="#FFC793" />
        </linearGradient>
        <linearGradient id="mm-hero-lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD5AC" />
          <stop offset="100%" stopColor="#FFBC84" />
        </linearGradient>
      </defs>

      {/* ── 배경 동그라미 ───────────────────────────── */}
      <circle cx="180" cy="158" r="146" fill="url(#mm-hero-bg)" />
      <circle
        cx="180"
        cy="158"
        r="146"
        fill="none"
        stroke="#FFC48F"
        strokeWidth="3"
        strokeDasharray="1 13"
        strokeLinecap="round"
      />

      {/* 바닥 그림자 */}
      <ellipse cx="180" cy="302" rx="118" ry="15" fill="#E9C6A2" opacity="0.5" />

      {/* ── 몸통 ────────────────────────────────────── */}
      <path
        d="M180 126 C218 126 240 160 240 202 C240 238 214 258 180 258 C146 258 120 238 120 202 C120 160 142 126 180 126 Z"
        fill="url(#mm-hero-body)"
        stroke="#C6600F"
        strokeWidth="3.4"
      />
      {/* 배 쪽 밝은 털 */}
      <ellipse cx="180" cy="222" rx="46" ry="38" fill="#FFE8CC" opacity="0.75" />

      {/* ── 상자 안 물건들 ───────────────────────────
          상자 앞판보다 "뒤"에 그려야 상자에 담긴 것처럼 보입니다.
          고양이 얼굴(가운데 위)을 가리지 않도록 좌우로 나눠 배치했어요. */}

      {/* 화분 속 식물 — 왼쪽 바깥, 살랑살랑 */}
      <g className="animate-sway" style={{ transformOrigin: "90px 198px" }}>
        <path
          d="M88 198 C68 186 62 156 76 142 C93 154 98 182 88 198 Z"
          fill="#6BB063"
          stroke="#3C7F3C"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        <path
          d="M92 198 C110 190 120 164 107 150 C92 162 86 182 92 198 Z"
          fill="#93C78B"
          stroke="#3C7F3C"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
      </g>

      {/* 책 두 권 */}
      <g transform="rotate(-8 129 167)">
        <rect x="96" y="158" width="66" height="18" rx="5" fill="#9B7CE0" stroke="#5D3EA6" strokeWidth="3" />
        <path d="M103 158 L103 176" stroke="#5D3EA6" strokeWidth="2.4" opacity="0.6" />
      </g>
      <g transform="rotate(5 131 185)">
        <rect x="98" y="176" width="66" height="18" rx="5" fill="#F2596F" stroke="#C22B45" strokeWidth="3" />
        <path d="M105 176 L105 194" stroke="#C22B45" strokeWidth="2.4" opacity="0.6" />
      </g>

      {/* 노란 오리 인형 — 가운데, 고양이 품에 안긴 자리 */}
      <g transform="translate(172 162)">
        <ellipse cx="0" cy="18" rx="17" ry="13" fill="#FFC53D" stroke="#C98C00" strokeWidth="2.8" />
        <circle cx="9" cy="4" r="11" fill="#FFD770" stroke="#C98C00" strokeWidth="2.8" />
        <path d="M18 3 L27 6 L18 9 Z" fill="#FB7A26" stroke="#C6600F" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="11" cy="1.5" r="2" fill="#3A2A20" />
      </g>

      {/* 스탠드 조명 — 오른쪽 */}
      <rect x="254" y="164" width="7" height="34" rx="3" fill="#7A685B" />
      <path
        d="M236 166 L280 166 L271 138 L245 138 Z"
        fill="#46B2CC"
        stroke="#156B80"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M241 159 L275 159" stroke="#FFFFFF" strokeWidth="3" opacity="0.35" strokeLinecap="round" />

      {/* 레코드판 — 조명 뒤로 살짝 겹치게 */}
      <circle cx="286" cy="172" r="21" fill="#3A2A20" stroke="#2F2119" strokeWidth="3" />
      <circle cx="286" cy="172" r="13" fill="none" stroke="#7A685B" strokeWidth="1.6" opacity="0.7" />
      <circle cx="286" cy="172" r="7" fill="#FFC53D" />
      <circle cx="286" cy="172" r="2.2" fill="#3A2A20" />

      {/* ── 상자 ────────────────────────────────────── */}
      {/* 열려서 젖혀진 날개 */}
      <path
        d="M94 208 L58 188 L70 172 L106 194 Z"
        fill="url(#mm-hero-lid)"
        stroke="#C07434"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path
        d="M266 208 L302 188 L290 172 L254 194 Z"
        fill="url(#mm-hero-lid)"
        stroke="#C07434"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* 앞판 */}
      <path
        d="M102 220 L258 220 L248 300 L112 300 Z"
        fill="url(#mm-hero-box)"
        stroke="#C07434"
        strokeWidth="3.4"
        strokeLinejoin="round"
      />
      {/* 위쪽 테두리 */}
      <rect x="92" y="194" width="176" height="28" rx="12" fill="url(#mm-hero-lid)" stroke="#C07434" strokeWidth="3.4" />
      {/* 가운데 접힌 자국 */}
      <path d="M180 222 L180 298" stroke="#C07434" strokeWidth="2.4" opacity="0.28" />
      {/* 상자에 붙은 이름표 */}
      <rect x="140" y="240" width="80" height="38" rx="12" fill="#FFF8F1" stroke="#E0A86A" strokeWidth="2.8" />
      <text
        x="180"
        y="267"
        textAnchor="middle"
        fill="#BF4907"
        fontSize="21"
        style={{ fontFamily: "var(--font-display), sans-serif" }}
      >
        만물
      </text>

      {/* ── 꼬리 (상자 앞 오른쪽 바닥으로 감기게) ───── */}
      <g className="animate-sway" style={{ transformOrigin: "250px 296px" }}>
        <path
          d="M244 296 C292 302 314 278 304 256 C297 240 274 240 270 254"
          fill="none"
          stroke="#C6600F"
          strokeWidth="22"
          strokeLinecap="round"
        />
        <path
          d="M244 296 C292 302 314 278 304 256 C297 240 274 240 270 254"
          fill="none"
          stroke="#FFA75E"
          strokeWidth="15"
          strokeLinecap="round"
        />
        {/* 꼬리 줄무늬 */}
        <g stroke="#EE8028" strokeWidth="6" strokeLinecap="round" opacity="0.85">
          <path d="M288 296 L290 306" />
          <path d="M305 278 L314 282" />
          <path d="M303 258 L312 256" />
        </g>
      </g>

      {/* ── 상자를 안은 앞발 ────────────────────────── */}
      <g stroke="#C6600F" strokeWidth="3.2">
        <ellipse cx="116" cy="212" rx="24" ry="15" fill="#FFB877" transform="rotate(-12 116 212)" />
        <ellipse cx="244" cy="212" rx="24" ry="15" fill="#FFB877" transform="rotate(12 244 212)" />
      </g>
      {/* 발가락 주름 */}
      <g stroke="#E08A3A" strokeWidth="2.2" strokeLinecap="round" opacity="0.8">
        <path d="M108 207 L106 215" />
        <path d="M116 205 L115 214" />
        <path d="M124 206 L124 214" />
        <path d="M252 207 L254 215" />
        <path d="M244 205 L245 214" />
        <path d="M236 206 L236 214" />
      </g>

      {/* ── 얼굴 ────────────────────────────────────── */}
      <g transform="translate(120 44)">
        <CatFace size={120} color="orange" mood="happy" />
      </g>

      {/* ── 반짝임 · 하트 ───────────────────────────── */}
      <g className="animate-twinkle" fill="#FFC53D">
        <path d="M60 86 l5 13 l13 5 l-13 5 l-5 13 l-5 -13 l-13 -5 l13 -5 Z" />
      </g>
      <g className="animate-twinkle" style={{ animationDelay: "0.9s" }} fill="#FFC53D">
        <path d="M296 96 l3.6 9 l9 3.6 l-9 3.6 l-3.6 9 l-3.6 -9 l-9 -3.6 l9 -3.6 Z" />
      </g>
      <g className="animate-twinkle" style={{ animationDelay: "1.6s" }} fill="#F2596F">
        <path d="M58 252 C52 246 54 238 58.5 240 C60 240.8 61 242 61 242 C61 242 62 240.8 63.5 240 C68 238 70 246 64 252 C62 254 60 254 58 252 Z" />
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
