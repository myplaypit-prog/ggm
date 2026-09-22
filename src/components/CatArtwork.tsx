import Image from "next/image";
import type { CSSProperties, HTMLAttributes, SVGProps } from "react";

export type CatColorKey = "orange" | "green" | "cream" | "gray" | "calico";
export type CatMood = "happy" | "wink" | "sleepy" | "wow" | "love";

type CatColorDef = {
  name: string;
  tagline: string;
  asset: string;
};

export const CAT_COLORS: Record<CatColorKey, CatColorDef> = {
  orange: { name: "치즈냥", tagline: "흥정의 달인", asset: "/illustrations/cat-orange.png" },
  green: { name: "새싹냥", tagline: "식물 키우기 담당", asset: "/illustrations/cat-green.png" },
  cream: { name: "우유냥", tagline: "느긋한 낮잠 전문", asset: "/illustrations/cat-cream.png" },
  gray: { name: "구름냥", tagline: "조용한 관찰자", asset: "/illustrations/cat-gray.png" },
  calico: { name: "삼색냥", tagline: "뭐든 다 모으는 수집가", asset: "/illustrations/cat-calico.png" },
};

export const CAT_COLOR_KEYS: CatColorKey[] = ["orange", "green", "cream", "gray", "calico"];

type CatFaceProps = {
  color?: CatColorKey;
  mood?: CatMood;
  size?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * 완성형 PNG 일러스트를 사용하는 공용 고양이 아바타입니다.
 * mood는 기존 화면 API를 유지하기 위해 받으며, 작은 크기에서도 표정이 또렷한
 * 대표 초상으로 통일해 화면마다 캐릭터 인상이 달라지는 문제를 없앴습니다.
 */
export function CatFace({ color = "orange", size = 96, className, style }: CatFaceProps) {
  const cat = CAT_COLORS[color];

  return (
    <Image
      src={cat.asset}
      alt={`${cat.name} 캐릭터`}
      width={size}
      height={size}
      sizes={`${size}px`}
      className={className}
      style={{ width: size, height: size, objectFit: "contain", ...style }}
    />
  );
}

export function CatWithBox({
  size = 440,
  className,
  ...props
}: { size?: number } & Omit<HTMLAttributes<HTMLSpanElement>, "children">) {
  return (
    <span className={className} {...props}>
      <Image
        src="/illustrations/market-cat-hero.png"
        alt="상자에서 재미있는 중고 물건을 발견한 만물마켓 고양이들"
        width={1214}
        height={1295}
        priority
        sizes="(max-width: 640px) 320px, (max-width: 1024px) 360px, 440px"
        style={{ width: size, maxWidth: "100%", height: "auto" }}
      />
    </span>
  );
}

export function PawPrint({
  size = 24,
  className,
  ...props
}: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <ellipse cx="32" cy="41" rx="17" ry="14" />
      <ellipse cx="13" cy="27" rx="7" ry="9" transform="rotate(-24 13 27)" />
      <ellipse cx="25" cy="15" rx="7" ry="9" transform="rotate(-8 25 15)" />
      <ellipse cx="39" cy="15" rx="7" ry="9" transform="rotate(8 39 15)" />
      <ellipse cx="51" cy="27" rx="7" ry="9" transform="rotate(24 51 27)" />
    </svg>
  );
}
