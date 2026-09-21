/**
 * Supabase 주소와 공개키를 읽어 옵니다.
 *
 * 환경변수(코드 밖에 따로 적어두는 쪽지)가 비어 있으면
 * "undefined 에서 뭘 읽을 수 없다" 같은 알아보기 힘든 오류가 나는데,
 * 그러지 말고 무엇을 어디에 넣어야 하는지 한국어로 알려 주게 했습니다.
 *
 * - 내 컴퓨터에서 실행할 때 → 프로젝트 맨 위의 .env.local 파일
 * - 배포한 사이트         → Vercel → 프로젝트 → Settings → Environment Variables
 */
export function supabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    const missing = [
      !url && "NEXT_PUBLIC_SUPABASE_URL",
      !key && "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    ]
      .filter(Boolean)
      .join(", ");

    throw new Error(
      `Supabase 환경변수가 없습니다: ${missing}\n` +
        "· 내 컴퓨터: 프로젝트 맨 위의 .env.local 파일에 적어 주세요 (.env.example 참고)\n" +
        "· 배포 사이트: Vercel → 프로젝트 → Settings → Environment Variables 에 추가한 뒤 다시 배포(Redeploy)해 주세요",
    );
  }

  return { url, key };
}
