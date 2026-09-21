import type { SVGProps } from "react";

/** 만물마켓 마스코트 고양이의 털색 5종 */
export const CAT_COLORS = {
  orange: { fur: "#FFB067", furDark: "#F08A3C", name: "치즈냥", patch: null },
  green: { fur: "#A8D5A2", furDark: "#79B872", name: "새싹냥", patch: null },
  cream: { fur: "#FFE3BE", furDark: "#F0C68C", name: "우유냥", patch: null },
  gray: { fur: "#D3DBE0", furDark: "#AEBBC4", name: "구름냥", patch: null },
  calico: { fur: "#FFF1DC", furDark: "#E8CFAE", name: "삼색냥", patch: "#FF9445" },
} as const;

export type CatColorKey = keyof typeof CAT_COLORS;
export type CatMood = "happy" | "wink" | "sleepy" | "wow";

export const CAT_COLOR_KEYS = Object.keys(CAT_COLORS) as CatColorKey[];

type CatFaceProps = {
  color?: CatColorKey;
  mood?: CatMood;
  size?: number;
} & Omit<SVGProps<SVGSVGElement>, "color">;

/**
 * 동글동글한 고양이 얼굴.
 * 아바타, 버튼 옆 장식, 빈 화면 안내 등 어디에나 올릴 수 있습니다.
 */
export function CatFace({
  color = "orange",
  mood = "happy",
  size = 96,
  ...props
}: CatFaceProps) {
  const c = CAT_COLORS[color];
  const eyeOpen = mood === "happy" || mood === "wow";
  const rightEyeOpen = mood === "happy" || mood === "wow" || mood === "wink";

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      role="img"
      aria-label={`${c.name} 캐릭터`}
      {...props}
    >
      {/* 귀 */}
      <path d="M26 46 L30 12 L58 32 Z" fill={c.fur} stroke={c.furDark} strokeWidth="3" strokeLinejoin="round" />
      <path d="M94 46 L90 12 L62 32 Z" fill={c.fur} stroke={c.furDark} strokeWidth="3" strokeLinejoin="round" />
      <path d="M33 40 L35 22 L49 33 Z" fill="#FFC3CE" />
      <path d="M87 40 L85 22 L71 33 Z" fill="#FFC3CE" />

      {/* 얼굴 */}
      <ellipse cx="60" cy="66" rx="42" ry="37" fill={c.fur} stroke={c.furDark} strokeWidth="3" />

      {/* 삼색냥 무늬 */}
      {c.patch && (
        <>
          <path
            d="M60 29 A42 37 0 0 0 19 62 Q34 70 44 52 Q52 36 60 29 Z"
            fill={c.patch}
            opacity="0.85"
          />
          <path d="M26 46 L30 12 L44 22 Z" fill={c.patch} opacity="0.85" />
        </>
      )}

      {/* 볼터치 */}
      <ellipse cx="31" cy="78" rx="9" ry="5.5" fill="#FF8FA6" opacity="0.5" />
      <ellipse cx="89" cy="78" rx="9" ry="5.5" fill="#FF8FA6" opacity="0.5" />

      {/* 눈 */}
      {eyeOpen ? (
        <>
          <ellipse cx="46" cy="64" rx={mood === "wow" ? 8.5 : 7} ry={mood === "wow" ? 11 : 9.5} fill="#3B2C21" />
          <circle cx="48.5" cy="60" r="2.6" fill="#fff" />
        </>
      ) : (
        <path d="M39 66 Q46 58 53 66" fill="none" stroke="#3B2C21" strokeWidth="3.4" strokeLinecap="round" />
      )}
      {rightEyeOpen ? (
        <>
          <ellipse cx="74" cy="64" rx={mood === "wow" ? 8.5 : 7} ry={mood === "wow" ? 11 : 9.5} fill="#3B2C21" />
          <circle cx="76.5" cy="60" r="2.6" fill="#fff" />
        </>
      ) : (
        <path d="M67 66 Q74 58 81 66" fill="none" stroke="#3B2C21" strokeWidth="3.4" strokeLinecap="round" />
      )}

      {/* 코 + 입 */}
      <path d="M56 78 L64 78 L60 83 Z" fill="#FF8FA6" />
      {mood === "wow" ? (
        <ellipse cx="60" cy="90" rx="5" ry="6" fill="#3B2C21" />
      ) : (
        <path
          d="M60 83 Q60 90 53 89 M60 83 Q60 90 67 89"
          fill="none"
          stroke="#3B2C21"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      )}

      {/* 수염 */}
      <g stroke={c.furDark} strokeWidth="2.4" strokeLinecap="round" opacity="0.9">
        <path d="M28 73 L8 68" />
        <path d="M28 80 L8 82" />
        <path d="M92 73 L112 68" />
        <path d="M92 80 L112 82" />
      </g>
    </svg>
  );
}

/**
 * 히어로 영역용 일러스트 — 만물(온갖 물건)이 담긴 상자를 안고 있는 고양이.
 */
export function CatWithBox({ size = 320, ...props }: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 320 300"
      width={size}
      height={size * (300 / 320)}
      role="img"
      aria-label="온갖 물건이 담긴 상자를 안고 있는 고양이"
      {...props}
    >
      {/* 배경 원 */}
      <circle cx="160" cy="150" r="132" fill="#FFE7D1" />
      <circle cx="160" cy="150" r="132" fill="none" stroke="#FFD0A8" strokeWidth="4" strokeDasharray="10 12" />

      {/* 상자 뒤로 삐져나온 물건들 — 고양이 얼굴(가운데)을 피해 좌우로 배치합니다 */}
      {/* 책 두 권 */}
      <rect x="42" y="128" width="44" height="14" rx="4" fill="#B08AE0" stroke="#3B2C21" strokeWidth="3" transform="rotate(-7 64 135)" />
      <rect x="46" y="143" width="44" height="14" rx="4" fill="#FF6B8A" stroke="#3B2C21" strokeWidth="3" transform="rotate(4 68 150)" />
      {/* 화분 */}
      <path d="M100 148 q-16 -30 0 -48 q14 20 4 48 Z" fill="#66BE5C" stroke="#2F8A2C" strokeWidth="3" strokeLinejoin="round" />
      <path d="M98 150 q-20 -16 -32 -30 q24 0 36 26 Z" fill="#92D489" stroke="#2F8A2C" strokeWidth="3" strokeLinejoin="round" />
      <path d="M84 146 h34 l-5 30 h-24 Z" fill="#FF9445" stroke="#C74D00" strokeWidth="3" strokeLinejoin="round" />
      {/* 스탠드 조명 */}
      <path d="M196 96 h30 l-6 26 h-18 Z" fill="#7FC8E8" stroke="#3B2C21" strokeWidth="3" strokeLinejoin="round" />
      <rect x="207" y="120" width="7" height="52" fill="#3B2C21" />
      {/* 기타 */}
      <path d="M250 116 L274 72" stroke="#C74D00" strokeWidth="10" strokeLinecap="round" />
      <ellipse cx="277" cy="68" rx="8" ry="10" fill="#C74D00" transform="rotate(-25 277 68)" />
      <ellipse cx="248" cy="136" rx="26" ry="28" fill="#FFD24C" stroke="#C74D00" strokeWidth="3" />
      <circle cx="248" cy="134" r="8" fill="#C74D00" />

      {/* 상자 */}
      <path d="M78 168 L242 168 L230 262 L90 262 Z" fill="#FFD0A8" stroke="#C74D00" strokeWidth="4" strokeLinejoin="round" />
      <rect x="70" y="152" width="180" height="26" rx="8" fill="#FFB474" stroke="#C74D00" strokeWidth="4" />
      <path d="M160 178 L160 262" stroke="#C74D00" strokeWidth="3" opacity="0.5" />
      <rect x="112" y="196" width="96" height="30" rx="8" fill="#FFF9F0" stroke="#C74D00" strokeWidth="3" />
      <path d="M128 211 h20 M156 205 h24 M156 217 h14" stroke="#C74D00" strokeWidth="3" strokeLinecap="round" opacity="0.7" />

      {/* 고양이 앞발 */}
      <ellipse cx="86" cy="182" rx="20" ry="14" fill="#FFB067" stroke="#F08A3C" strokeWidth="3" transform="rotate(-18 86 182)" />
      <ellipse cx="234" cy="182" rx="20" ry="14" fill="#FFB067" stroke="#F08A3C" strokeWidth="3" transform="rotate(18 234 182)" />

      {/* 꼬리 */}
      <path
        d="M246 244 q40 -8 30 -46 q-6 -22 -26 -18"
        fill="none"
        stroke="#F08A3C"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path
        d="M246 244 q40 -8 30 -46 q-6 -22 -26 -18"
        fill="none"
        stroke="#FFB067"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* 고양이 얼굴 */}
      <g transform="translate(100, 36) scale(1)">
        <CatFace size={120} color="orange" mood="happy" />
      </g>

      {/* 반짝임 */}
      <g fill="#FFD24C">
        <path d="M44 74 l5 12 l12 5 l-12 5 l-5 12 l-5 -12 l-12 -5 l12 -5 Z" />
        <path d="M232 70 l3.5 8 l8 3.5 l-8 3.5 l-3.5 8 l-3.5 -8 l-8 -3.5 l8 -3.5 Z" />
        <path d="M58 226 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 Z" />
      </g>
    </svg>
  );
}

/** 작은 고양이 발자국 — 구분선이나 장식용 */
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
