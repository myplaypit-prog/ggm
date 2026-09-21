/**
 * 거래 글(상품)과 관련된 상수 · 변환 함수 모음.
 * 서버/클라이언트 양쪽에서 쓰이므로 JSX 없이 순수 데이터만 둡니다.
 */

/* ── 카테고리 ─────────────────────────────────────────── */
export const CATEGORIES = [
  { key: "fashion", label: "옷·패션", chip: "bg-berry-soft text-berry-ink" },
  { key: "digital", label: "디지털", chip: "bg-sky-soft text-sky-ink" },
  { key: "interior", label: "가구·인테리어", chip: "bg-carrot-100 text-carrot-700" },
  { key: "book", label: "도서·티켓", chip: "bg-grape-soft text-grape-ink" },
  { key: "hobby", label: "취미·악기", chip: "bg-sun-soft text-sun-ink" },
  { key: "kids", label: "유아·완구", chip: "bg-berry-soft text-berry-ink" },
  { key: "plant", label: "식물·반려", chip: "bg-leaf-100 text-leaf-700" },
  { key: "etc", label: "그 외 뭐든지", chip: "bg-carrot-200 text-carrot-800" },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]["key"];
export const CATEGORY_KEYS = CATEGORIES.map((c) => c.key) as CategoryKey[];

export function categoryLabel(key: string) {
  return CATEGORIES.find((c) => c.key === key)?.label ?? "그 외 뭐든지";
}

export function categoryChip(key: string) {
  return CATEGORIES.find((c) => c.key === key)?.chip ?? "bg-carrot-100 text-carrot-700";
}

/* ── 상품 상태 ────────────────────────────────────────── */
export const CONDITIONS = [
  { key: "new", label: "새 상품", hint: "포장도 안 뜯었어요" },
  { key: "like_new", label: "거의 새것", hint: "몇 번 안 썼어요" },
  { key: "used", label: "사용감 있음", hint: "잘 썼어요" },
  { key: "broken", label: "고장·부품용", hint: "그래도 쓸모는 있어요" },
] as const;

export type ConditionKey = (typeof CONDITIONS)[number]["key"];
export const CONDITION_KEYS = CONDITIONS.map((c) => c.key) as ConditionKey[];

export function conditionLabel(key: string) {
  return CONDITIONS.find((c) => c.key === key)?.label ?? "사용감 있음";
}

/* ── 판매 상태 ────────────────────────────────────────── */
export const STATUSES = [
  { key: "selling", label: "판매중", badge: "bg-leaf-500 text-white" },
  { key: "reserved", label: "예약중", badge: "bg-sun text-sun-ink" },
  { key: "sold", label: "판매완료", badge: "bg-ink-soft text-white" },
] as const;

export type StatusKey = (typeof STATUSES)[number]["key"];
export const STATUS_KEYS = STATUSES.map((s) => s.key) as StatusKey[];

export function statusLabel(key: string) {
  return STATUSES.find((s) => s.key === key)?.label ?? "판매중";
}

export function statusBadge(key: string) {
  return STATUSES.find((s) => s.key === key)?.badge ?? "bg-leaf-500 text-white";
}

/* ── 정렬 ─────────────────────────────────────────────── */
export const SORTS = [
  { key: "recent", label: "최신순" },
  { key: "cheap", label: "낮은 가격순" },
  { key: "expensive", label: "높은 가격순" },
] as const;

export type SortKey = (typeof SORTS)[number]["key"];

/* ── 타입 ─────────────────────────────────────────────── */
export type ProductSeller = {
  id: string;
  nickname: string;
  avatar_key: string;
  region: string;
};

export type Product = {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  status: string;
  region: string;
  images: string[];
  created_at: string;
  updated_at: string;
};

export type ProductWithSeller = Product & { seller: ProductSeller | null };

/* ── 표시용 변환 ──────────────────────────────────────── */

/** 0원은 "나눔" 으로 보여 줍니다. */
export function formatPrice(price: number) {
  if (price === 0) return "나눔";
  return `${price.toLocaleString("ko-KR")}원`;
}

/** 숫자만 남기고 정수로 (입력창에서 쉼표를 지울 때 사용) */
export function parsePrice(raw: string) {
  const digits = raw.replace(/[^0-9]/g, "");
  return digits === "" ? NaN : Number(digits);
}

export function formatRelativeTime(iso: string) {
  const then = new Date(iso).getTime();
  const diffMin = Math.floor((Date.now() - then) / 60000);

  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}시간 전`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) return `${diffDay}일 전`;
  return new Date(iso).toLocaleDateString("ko-KR", { month: "long", day: "numeric" });
}

/* ── 스토리지 ─────────────────────────────────────────── */
export const PRODUCT_BUCKET = "mm-products";
export const MAX_IMAGES = 5;
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

/** 스토리지에 올린 파일 경로를 공개 URL 로 바꿔 줍니다. */
export function productImageUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${base}/storage/v1/object/public/${PRODUCT_BUCKET}/${path}`;
}
