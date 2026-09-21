import { createBrowserClient } from "@supabase/ssr";
import { supabaseEnv } from "./env";

/**
 * 브라우저(클라이언트 컴포넌트)에서 사용하는 Supabase 클라이언트.
 * 공개키(anon/publishable key)만 사용하므로 노출되어도 안전합니다.
 */
export function createClient() {
  const { url, key } = supabaseEnv();
  return createBrowserClient(url, key);
}
