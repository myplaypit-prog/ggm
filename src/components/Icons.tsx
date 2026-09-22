import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/** 모든 기능 아이콘이 공유하는 형태: 얇고 또렷한 24px 라운드 그리드 */
function Base({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      {children}
    </svg>
  );
}

export const MailIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="4" />
    <path d="M3.5 7.5 11 13a2 2 0 0 0 2 0l7.5-5.5" />
  </Base>
);

export const LockIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="10" width="17" height="11" rx="4" />
    <path d="M7.5 10V7.5a4.5 4.5 0 0 1 9 0V10" />
    <circle cx="12" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
  </Base>
);

export const UserIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
  </Base>
);

export const EyeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </Base>
);

export const EyeOffIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 5.5 20 18.5" />
    <path d="M9.5 6.2A9.6 9.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-3.2 3.9" />
    <path d="M6.3 8.1A17 17 0 0 0 2.5 12S6 18.5 12 18.5a9.4 9.4 0 0 0 3.2-.55" />
    <path d="M10 10.2a3 3 0 0 0 4 4.2" />
  </Base>
);

export const SparkleIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.5 13.8 9l5.5 1.8-5.5 1.8L12 18.1l-1.8-5.5L4.7 10.8 10.2 9Z" fill="currentColor" stroke="none" />
    <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z" fill="currentColor" stroke="none" />
  </Base>
);

export const HeartIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 20s-7.5-4.6-7.5-9.5a4.3 4.3 0 0 1 7.5-2.8 4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z" />
  </Base>
);

export const ChatIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-8l-4.5 3.5V16.5H4A1.5 1.5 0 0 1 2.5 15V7A1.5 1.5 0 0 1 4 5.5Z" />
    <path d="M7.5 11h.01M12 11h.01M16.5 11h.01" />
  </Base>
);

export const ShieldIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3 20 6v6c0 5-3.4 7.7-8 9-4.6-1.3-8-4-8-9V6Z" />
    <path d="m9 12 2 2 4-4" />
  </Base>
);

export const TagIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 11.4V4.5a1 1 0 0 1 1-1h6.9a1 1 0 0 1 .7.3l8.1 8.1a1 1 0 0 1 0 1.4l-6.9 6.9a1 1 0 0 1-1.4 0L3.8 12.1a1 1 0 0 1-.3-.7Z" />
    <circle cx="8" cy="8" r="1.6" fill="currentColor" stroke="none" />
  </Base>
);

export const BoxIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 7.5 12 3.5l8.5 4v9L12 20.5l-8.5-4Z" />
    <path d="M3.5 7.5 12 11.5l8.5-4M12 11.5v9" />
  </Base>
);

export const PinIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </Base>
);

export const LogoutIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M9.5 20.5H5a1.5 1.5 0 0 1-1.5-1.5V5A1.5 1.5 0 0 1 5 3.5h4.5" />
    <path d="M15.5 16 20 12l-4.5-4M20 12H9" />
  </Base>
);

export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12.3 2.6 2.6L16 9.5" />
  </Base>
);

export const AlertIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5" />
    <circle cx="12" cy="16.3" r="1.1" fill="currentColor" stroke="none" />
  </Base>
);

export const SearchIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.6-3.6" />
  </Base>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 12h15M14 6.5l5.5 5.5L14 17.5" />
  </Base>
);

export const LoaderIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.5v4M12 16.5v4M3.5 12h4M16.5 12h4M6 6l2.8 2.8M15.2 15.2 18 18M18 6l-2.8 2.8M8.8 15.2 6 18" />
  </Base>
);

/* ------------------------------------------------------------------
   카테고리 아이콘 — 마스코트와 같은 "면으로 채운" 스타일

   위쪽 UI 아이콘(메일·자물쇠 등)은 얇은 선,
   아래 카테고리 아이콘은 채운 면 — 이렇게 역할을 나눠 두면
   화면이 정리돼 보입니다. (선 아이콘은 기능, 면 아이콘은 그림)

   색은 두 톤만 씁니다.
     · 연한 면 : currentColor 를 32% 로 (덩어리)
     · 진한 면 : currentColor 그대로 (포인트)
   칩의 글자색(text-berry-ink 등)을 그대로 따라가서 저절로 어울립니다.
------------------------------------------------------------------- */
function Duo({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      {children}
    </svg>
  );
}

/** 옷·패션 — 티셔츠 */
export const ShirtIcon = (p: IconProps) => (
  <Duo {...p}>
    <path opacity="0.32" d="M8.6 2.6 12 4.9l3.4-2.3 5.6 3-2.3 5.1-1.7-.8V21H7V9.9l-1.7.8L3 5.6Z" />
    <path d="M9.3 2.9 12 4.7l2.7-1.8-.5 1.7a2.6 2.6 0 0 1-4.4 0Z" />
    <path opacity="0.55" d="M7 15.6h10V17H7z" />
  </Duo>
);

/** 디지털 — 스마트폰 */
export const DeviceIcon = (p: IconProps) => (
  <Duo {...p}>
    <rect opacity="0.32" x="5.8" y="2" width="12.4" height="20" rx="3.6" />
    <rect x="8" y="5.2" width="8" height="10.6" rx="1.8" />
    <circle cx="12" cy="18.8" r="1.25" />
  </Duo>
);

/** 가구·인테리어 — 소파 */
export const SofaIcon = (p: IconProps) => (
  <Duo {...p}>
    <path opacity="0.32" d="M5 9.4A2.6 2.6 0 0 1 7.6 6.8h8.8A2.6 2.6 0 0 1 19 9.4v4.8H5Z" />
    <rect x="2.4" y="12.4" width="19.2" height="6.2" rx="2.8" />
    <path opacity="0.6" d="M5.4 18.4h2.1V21H5.4zm11.1 0h2.1V21h-2.1z" />
  </Duo>
);

/** 도서·티켓 — 펼친 책 */
export const BookIcon = (p: IconProps) => (
  <Duo {...p}>
    <path
      opacity="0.32"
      d="M12 6.6C10 4.9 7.4 4.3 4.7 4.7a1.4 1.4 0 0 0-1.2 1.4v11.2c0 .9.7 1.5 1.6 1.4 2.3-.3 4.5.2 6.9 1.9Z"
    />
    <path d="M12 6.6c2-1.7 4.6-2.3 7.3-1.9.7.1 1.2.7 1.2 1.4v11.2c0 .9-.7 1.5-1.6 1.4-2.3-.3-4.5.2-6.9 1.9Z" />
  </Duo>
);

/** 취미·악기 — 기타 */
export const GuitarIcon = (p: IconProps) => (
  <Duo {...p}>
    <path
      opacity="0.32"
      d="M9.6 11.8a4.5 4.5 0 0 1 3 7.7c-2.4 2.4-6.4 1.6-8.1-.1s-2.5-5.7-.1-8.1a4.5 4.5 0 0 1 5.2.5Z"
    />
    <circle cx="8.7" cy="15.3" r="2.1" />
    <path d="m13.2 8.4 5.9-5.9a1.35 1.35 0 0 1 1.9 1.9l-5.9 5.9Z" />
    <path opacity="0.6" d="m19.4 1.4 3.2 3.2-1.3 1.3-3.2-3.2Z" />
  </Duo>
);

/** 유아·완구 — 곰인형 */
export const BabyIcon = (p: IconProps) => (
  <Duo {...p}>
    <circle opacity="0.32" cx="6.6" cy="7.2" r="3.1" />
    <circle opacity="0.32" cx="17.4" cy="7.2" r="3.1" />
    <circle opacity="0.32" cx="12" cy="14" r="7.3" />
    <circle cx="9.5" cy="12.8" r="1.25" />
    <circle cx="14.5" cy="12.8" r="1.25" />
    <path d="M9.6 16.3a3.2 3.2 0 0 0 4.8 0 .95.95 0 0 1 1.5 1.2 5.1 5.1 0 0 1-7.8 0 .95.95 0 0 1 1.5-1.2Z" />
  </Duo>
);

/** 식물·반려 — 화분 */
export const PlantIcon = (p: IconProps) => (
  <Duo {...p}>
    <path opacity="0.32" d="M11.6 12.6C7 12.6 5.2 9.4 5.2 6c4.6 0 6.4 3.2 6.4 6.6Z" />
    <path opacity="0.32" d="M12.4 13.4c4.6 0 6.4-3.6 6.4-7.4-4.6 0-6.4 3.6-6.4 7.4Z" />
    <rect x="5.9" y="12.6" width="12.2" height="3.2" rx="1.6" />
    <path d="M7 16.4h10l-.9 4.2a1.7 1.7 0 0 1-1.7 1.3H9.6a1.7 1.7 0 0 1-1.7-1.3Z" />
  </Duo>
);

/** 그 외 뭐든지 — 물음표 상자 */
export const QuestionBoxIcon = (p: IconProps) => (
  <Duo {...p}>
    <rect opacity="0.32" x="2.6" y="2.6" width="18.8" height="18.8" rx="5.6" />
    <path d="M12 6.1a3.6 3.6 0 0 0-3.6 3.4 1.15 1.15 0 0 0 2.3.1 1.35 1.35 0 1 1 2 1.3c-1 .6-1.6 1.4-1.6 2.5v.5a1.15 1.15 0 0 0 2.3 0v-.4c0-.3.1-.4.4-.6A3.6 3.6 0 0 0 12 6.1Z" />
    <circle cx="12" cy="17.2" r="1.35" />
  </Duo>
);
