import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/** 이미 로그인했다면 들어갈 필요 없는 경로들 */
const GUEST_ONLY_PREFIXES = ["/login", "/signup"];

/** 로그인이 필요한 경로인지 판단합니다. */
function isProtected(pathname: string) {
  if (pathname.startsWith("/mypage")) return true;
  if (pathname === "/products/new") return true;
  if (/^\/products\/[^/]+\/edit\/?$/.test(pathname)) return true;
  return false;
}

/**
 * 매 요청마다 만료된 로그인 토큰을 갱신하고,
 * 로그인 상태에 따라 접근을 정리해 주는 "검문소"입니다.
 *
 * ⚠️ 여기서 오류가 나면 홈 화면까지 포함해 사이트 전체가 안 열립니다.
 *    (배포 사이트에서 "Routing Middleware for this page temporarily failed" 라는
 *     메시지가 뜨는 게 바로 이 경우예요.)
 *    그래서 어떤 문제가 생기든 "일단 통과시키고 화면은 보여 주기"로 만들었습니다.
 *    로그인이 꼭 필요한 화면은 페이지 안에서 한 번 더 확인하니 안전해요.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // ① 환경변수(코드 밖에 적어두는 쪽지)가 비어 있는 경우.
  //    Vercel 에 환경변수를 등록하지 않았거나 지웠을 때 여기에 걸립니다.
  //    예전에는 값이 없으면 곧바로 오류가 나서 사이트 전체가 멈췄어요.
  if (!supabaseUrl || !supabaseKey) {
    console.error(
      "[미들웨어] Supabase 환경변수가 없습니다. " +
        "NEXT_PUBLIC_SUPABASE_URL 과 NEXT_PUBLIC_SUPABASE_ANON_KEY 를 확인해 주세요. " +
        "(로컬은 .env.local, 배포는 Vercel → Settings → Environment Variables)",
    );
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // ② 반드시 getUser() 를 호출해야 토큰이 갱신됩니다. (getSession() 아님)
  //    이 줄은 인터넷 너머 Supabase 서버에 물어보는 과정이라,
  //    와이파이가 잠깐 끊기거나 Supabase 가 느리면 실패할 수 있습니다.
  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (error) {
    console.error("[미들웨어] 로그인 확인에 실패했어요. 요청은 그대로 통과시킵니다.", error);
    return supabaseResponse;
  }

  const { pathname } = request.nextUrl;

  if (!user && isProtected(pathname)) {
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
