"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { AuthState } from "@/lib/auth-state";

/** 아바타로 고를 수 있는 고양이 키 (CatArtwork.tsx 와 DB check 제약이 같은 값을 씁니다) */
const AVATAR_KEYS = ["orange", "green", "cream", "gray", "calico"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

/** Supabase 영문 에러 메시지를 사람 말로 바꿔 줍니다. */
function toKorean(message: string) {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "이메일 또는 비밀번호가 올바르지 않아요.";
  if (m.includes("email not confirmed"))
    return "아직 이메일 인증이 끝나지 않았어요. 메일함을 확인해 주세요.";
  if (m.includes("user already registered")) return "이미 가입된 이메일이에요. 로그인해 주세요.";
  if (m.includes("password should be at least"))
    return "비밀번호가 너무 짧아요. 8자 이상으로 만들어 주세요.";
  if (m.includes("rate limit") || m.includes("too many"))
    return "요청이 너무 잦아요. 잠시 후 다시 시도해 주세요.";
  if (m.includes("signups not allowed")) return "지금은 회원가입이 잠겨 있어요. 관리자에게 문의해 주세요.";
  return `문제가 생겼어요: ${message}`;
}

/* ------------------------------------------------------------------ */
/* 회원가입                                                             */
/* ------------------------------------------------------------------ */
export async function signUpAction(prev: AuthState, formData: FormData): Promise<AuthState> {
  const attempt = prev.attempt + 1;

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const passwordConfirm = String(formData.get("passwordConfirm") ?? "");
  const nickname = String(formData.get("nickname") ?? "").trim();
  const region = String(formData.get("region") ?? "").trim();
  const avatarRaw = String(formData.get("avatarKey") ?? "orange");
  const avatarKey = (AVATAR_KEYS as readonly string[]).includes(avatarRaw) ? avatarRaw : "orange";

  const values = { email, nickname, region, avatarKey };
  const fieldErrors: Record<string, string> = {};

  if (!EMAIL_RE.test(email)) fieldErrors.email = "이메일 형식을 확인해 주세요.";
  if (nickname.length < 2 || nickname.length > 20)
    fieldErrors.nickname = "닉네임은 2~20자로 지어 주세요.";
  if (password.length < 8) fieldErrors.password = "비밀번호는 8자 이상이어야 해요.";
  if (password !== passwordConfirm) fieldErrors.passwordConfirm = "비밀번호가 서로 달라요.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "입력값을 다시 확인해 주세요.", fieldErrors, values, attempt };
  }

  const supabase = await createClient();

  // 닉네임 중복 미리 확인 (DB 에도 unique 제약이 걸려 있습니다)
  const { data: taken } = await supabase
    .from("mm_profiles")
    .select("id")
    .ilike("nickname", nickname.replace(/[%_]/g, "\\$&"))
    .limit(1)
    .maybeSingle();

  if (taken) {
    return {
      status: "error",
      message: "이미 사용 중인 닉네임이에요.",
      fieldErrors: { nickname: "다른 닉네임을 골라 주세요." },
      values,
      attempt,
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl()}/auth/callback`,
      data: { nickname, avatar_key: avatarKey, region: region || "우리동네" },
    },
  });

  if (error) {
    return { status: "error", message: toKorean(error.message), fieldErrors: {}, values, attempt };
  }

  // 이메일 인증이 켜져 있고 이미 가입된 주소면 identities 가 빈 배열로 돌아옵니다.
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return {
      status: "error",
      message: "이미 가입된 이메일이에요. 로그인해 주세요.",
      fieldErrors: { email: "이 이메일은 이미 사용 중이에요." },
      values,
      attempt,
    };
  }

  // 세션이 바로 생겼다면 = 이메일 인증이 꺼져 있는 상태 → 곧장 로그인 완료
  if (data.session) {
    revalidatePath("/", "layout");
    redirect("/mypage?welcome=1");
  }

  return {
    status: "email-sent",
    message: `${email} 로 인증 메일을 보냈어요. 메일의 링크를 눌러 가입을 마쳐 주세요!`,
    fieldErrors: {},
    values,
    attempt,
  };
}

/* ------------------------------------------------------------------ */
/* 로그인                                                               */
/* ------------------------------------------------------------------ */
export async function signInAction(prev: AuthState, formData: FormData): Promise<AuthState> {
  const attempt = prev.attempt + 1;

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/mypage");

  const values = { email };
  const fieldErrors: Record<string, string> = {};

  if (!EMAIL_RE.test(email)) fieldErrors.email = "이메일 형식을 확인해 주세요.";
  if (password.length === 0) fieldErrors.password = "비밀번호를 입력해 주세요.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "입력값을 다시 확인해 주세요.", fieldErrors, values, attempt };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { status: "error", message: toKorean(error.message), fieldErrors: {}, values, attempt };
  }

  revalidatePath("/", "layout");
  // 외부 주소로 튕기지 않도록 내부 경로만 허용합니다.
  redirect(next.startsWith("/") ? next : "/mypage");
}

/* ------------------------------------------------------------------ */
/* 로그아웃                                                             */
/* ------------------------------------------------------------------ */
export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/?bye=1");
}
