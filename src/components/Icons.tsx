import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/** 모든 아이콘이 공유하는 기본 형태 (선이 굵고 끝이 둥근, 친근한 느낌) */
function Base({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
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
   카테고리 일러스트 아이콘 — "만물"이라는 느낌을 주는 컬러 아이콘들
------------------------------------------------------------------- */

export const ShirtIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M8.5 3.5 12 6l3.5-2.5 5 2.8-2 4-2 -1v9.2h-9V9.3l-2 1-2-4Z" />
  </Base>
);

export const DeviceIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="6.5" y="2.5" width="11" height="19" rx="3" />
    <path d="M10.5 18.5h3" />
  </Base>
);

export const SofaIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 11V8a2.5 2.5 0 0 1 5 0v3h6V8a2.5 2.5 0 0 1 5 0v3" />
    <rect x="2.5" y="11" width="19" height="7" rx="2.5" />
    <path d="M5.5 18v2.5M18.5 18v2.5" />
  </Base>
);

export const BookIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v18H5.5A1.5 1.5 0 0 1 4 19.5Z" />
    <path d="M8 3v18M19 17H5.5" />
  </Base>
);

export const GuitarIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M14.5 3.5 18 7l2.5-2.5" />
    <path d="M14.5 6.5 9.5 11.5" />
    <path d="M9.5 11.5a4 4 0 1 0-2.2 6.8A4 4 0 1 0 9.5 11.5Z" />
  </Base>
);

export const BabyIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="7" cy="6.5" r="2.5" />
    <circle cx="17" cy="6.5" r="2.5" />
    <circle cx="12" cy="14" r="7" />
    <path d="M9.5 13h.01M14.5 13h.01M10 16.8a3 3 0 0 0 4 0" />
  </Base>
);

export const PlantIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21v-8" />
    <path d="M12 13c-4.5 0-6-3-6-6 4.5 0 6 3 6 6Z" />
    <path d="M12 14c4.5 0 6-3.4 6-7-4.5 0-6 3.4-6 7Z" />
    <path d="M8 21h8" />
  </Base>
);

export const QuestionBoxIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <path d="M9.6 9.3a2.5 2.5 0 1 1 3.2 2.8c-.6.2-.8.7-.8 1.3" />
    <circle cx="12" cy="16.6" r="1.1" fill="currentColor" stroke="none" />
  </Base>
);
