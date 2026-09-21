import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/** 로그인이 필요한 경로들 */
const PROTECTED_PREFIXES = ["/mypage"];
/** 이미 로그인했다면 들어갈 필요 없는 경로들 */
const GUEST_ONLY_PREFIXES = ["/login", "/signup"];

/**
 * 매 요청마다 만료된 액세스 토큰을 갱신하고,
 * 로그인 상태에 따라 접근을 정리해 줍니다.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // 반드시 getUser() 를 호출해야 토큰이 갱신됩니다. (getSession() 아님)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  if (!user && PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (user && GUEST_ONLY_PREFIXES.some((p) => pathname.startsWith(p))) {
    const url = request.nextUrl.clone();
    url.pathname = "/mypage";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
