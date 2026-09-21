# 🐾 만물마켓 (Manmul Market)

우리 동네 만물 중고마켓. **뭐든지 있고, 뭐든지 팔아요.**

- 프레임워크: **Next.js 15 (App Router) + TypeScript**
- 스타일: **Tailwind CSS v4** (설정은 `src/app/globals.css` 안 `@theme`)
- 백엔드: **Supabase** (기존 가계부 프로젝트 `ggb0921_db` 와 같은 DB 사용)
- 컬러무드: 🧡 당근 오렌지 + 💚 새싹 그린
- 마스코트: 고양이 5마리 (치즈냥 / 새싹냥 / 우유냥 / 구름냥 / 삼색냥) — 전부 코드로 그린 SVG

---

## 1단계에서 만든 것 ✅

| 기능 | 경로 | 설명 |
| --- | --- | --- |
| 랜딩 | `/` | 히어로 일러스트, 컬러칩, 카테고리 아이콘, 3단계 안내 |
| 회원가입 | `/signup` | 이메일 + 비밀번호 + 닉네임 + 동네 + **고양이 아바타 고르기** |
| 로그인 | `/login` | 이메일 로그인, 에러 메시지 한글화 |
| 로그아웃 | 헤더 / 마이페이지 | 서버 액션으로 세션 정리 |
| 마이페이지 | `/mypage` | 로그인해야 들어갈 수 있는 보호 페이지 |
| 이메일 인증 | `/auth/callback` | 인증 메일 링크가 돌아오는 자리 |

## 2단계에서 만든 것 ✅ — 거래 글 CRUD

| 기능 | 경로 | 설명 |
| --- | --- | --- |
| 목록 · 검색 | `/products` | 카테고리 필터, 제목·설명 검색, 최신순/가격순 정렬 |
| 올리기 | `/products/new` | 사진(최대 5장) · 제목 · 카테고리 · 상품상태 · 가격(나눔) · 동네 · 설명 |
| 상세 | `/products/[id]` | 사진 갤러리, 판매자 카드, 같은 판매자의 다른 물건 |
| 수정 | `/products/[id]/edit` | 내 글만. 판매 상태도 함께 바꿀 수 있어요 |
| 삭제 | 상세 페이지 | 고양이가 한 번 더 물어본 뒤, 사진까지 같이 지웁니다 |
| 판매 상태 | 상세 페이지 | 판매중 / 예약중 / 판매완료 |
| 내 판매 내역 | `/mypage` | 판매중·판매완료 개수와 내가 올린 물건 목록 |

> CRUD = Create(만들기) · Read(읽기) · Update(고치기) · Delete(지우기).
> 게시판의 기본 네 가지 동작을 부르는 말이에요.

---

## 처음 실행하기

> 확인된 환경: Node.js v24.21.0 / npm 11.19.0 (설치 완료)

### 1. 패키지 설치

```bash
npm install
```

### 2. 환경변수 확인

`.env.local` 이 이미 만들어져 있습니다. (가계부와 같은 Supabase 프로젝트를 봅니다.)

```
NEXT_PUBLIC_SUPABASE_URL=https://luoikfzoiiildaplurjr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인하세요.

---

## 이메일 인증 설정 (현재 상태: **꺼짐** ✅)

`ggb0921_db` 프로젝트는 **Authentication → Sign In / Providers → Email** 의
`Confirm email` 이 **꺼져 있는 것으로 확인**되었습니다.
그래서 지금은 **가입하면 즉시 로그인**되어 `/mypage` 로 이동합니다. 공부하기 딱 좋은 상태예요.

나중에 배포할 때 이 옵션을 켜면 메일 인증 흐름으로 바뀌는데,
그 코드는 이미 준비되어 있습니다 (`/auth/callback`, 가입 후 "메일함을 확인해 주세요" 화면).
켤 때는 **Authentication → URL Configuration → Redirect URLs** 에
`http://localhost:3000/auth/callback` 과 배포 주소의 `/auth/callback` 을 함께 넣어 주세요.

### 테스트 계정

동작 확인용으로 만들어 둔 계정입니다. 필요 없으면 지워도 됩니다.

```
manmul.test.001@example.com / manmul1234   (닉네임: 테스트냥, 우유냥 아바타)
```

---

## DB 구조

가계부와 **같은 데이터베이스**를 쓰기 때문에, 만물마켓 테이블은 전부 `mm_` 접두사를 붙입니다.

```
public.entries      ← 가계부 (건드리지 않음)
public.settings     ← 가계부 (건드리지 않음)
public.mm_profiles  ← 만물마켓 회원 프로필  (1단계)
public.mm_products  ← 만물마켓 거래 글      (2단계) ⭐
```

스토리지(파일 보관함) 버킷도 하나 씁니다.

```
mm-products  ← 상품 사진. 읽기는 누구나, 올리기·지우기는 본인 폴더({내 id}/파일명)만
```

`mm_profiles` 컬럼

| 컬럼 | 타입 | 설명 |
| --- | --- | --- |
| `id` | uuid | `auth.users.id` 와 1:1 |
| `nickname` | text | 2~20자, 중복 불가 |
| `avatar_key` | text | `orange` / `green` / `cream` / `gray` / `calico` |
| `region` | text | 우리 동네 |
| `bio` | text | 자기소개 (2단계에서 사용 예정) |
| `created_at` / `updated_at` | timestamptz | |

- **RLS**: 프로필 조회는 누구나, 수정·삭제는 본인만.
- **트리거** `mm_on_auth_user_created`: 가입하면 프로필 행이 자동으로 생깁니다.
  닉네임이 겹치면 뒤에 숫자를 붙여 재시도해요.

`mm_products` 컬럼

| 컬럼 | 타입 | 설명 |
| --- | --- | --- |
| `id` | uuid | 글 번호 (자동 생성) |
| `seller_id` | uuid | 판매자 = `mm_profiles.id` |
| `title` | text | 제목 2~60자 |
| `description` | text | 설명 2000자까지 |
| `price` | integer | **0이면 나눔** |
| `category` | text | `fashion` `digital` `interior` `book` `hobby` `kids` `plant` `etc` |
| `condition` | text | `new` `like_new` `used` `broken` |
| `status` | text | `selling` `reserved` `sold` |
| `region` | text | 거래 동네 (비우면 내 프로필 동네) |
| `images` | text[] | 스토리지 파일 경로, 최대 5장. 첫 장이 대표 사진 |
| `created_at` / `updated_at` | timestamptz | |

- **RLS**: 글 조회는 누구나, 쓰기·수정·삭제는 글쓴이만.
- 회원이 탈퇴하면 프로필과 그 사람의 글이 함께 지워집니다 (`on delete cascade`).

실제 적용한 SQL은 `supabase/migrations/` 에 남겨 두었습니다.

### 아직 다듬지 않은 부분 (다음에 고치면 좋아요)

- 사진을 올린 뒤 폼을 저장하지 않고 나가면 **스토리지에 파일이 남습니다.**
  (안 쓰는 파일을 청소하는 기능은 아직 없어요)
- 목록은 최대 48개까지만 보여 줍니다. 더보기/페이지 나누기는 아직 없어요.
- 1단계에 만든 화면들(로그인·회원가입 등)은 아직 옛 색 토큰(`border-carrot-100` 등)을
  쓰고 있어요. 2차 디자인 토큰(`sand-200`, `*-soft`/`*-ink`)으로 정리하면 더 깔끔해집니다.

---

## 폴더 구조

```
src/
├─ app/
│  ├─ layout.tsx            전체 레이아웃 (폰트 + 헤더 + 푸터)
│  ├─ globals.css           🎨 컬러 팔레트 · 폰트 · 애니메이션 토큰
│  ├─ page.tsx              랜딩 페이지
│  ├─ icon.svg              파비콘 (고양이)
│  ├─ login/                로그인 (page = 서버, LoginForm = 클라이언트)
│  ├─ signup/               회원가입
│  ├─ mypage/               로그인 필요한 보호 페이지
│  └─ auth/
│     ├─ callback/route.ts  이메일 인증 링크 처리
│     └─ auth-error/        인증 실패 안내
├─ components/
│  ├─ CatMascot.tsx         🐱 고양이 SVG (얼굴 5색 × 표정 4종 + 히어로 일러스트 + 발자국)
│  ├─ Icons.tsx             ✏️ 아이콘 모음 (기본 + 카테고리)
│  ├─ Header.tsx            로그인 상태에 따라 바뀌는 헤더
│  ├─ Footer.tsx
│  ├─ AuthShell.tsx         로그인/회원가입 공통 2단 레이아웃
│  ├─ AvatarPicker.tsx      고양이 고르는 컬러칩
│  ├─ TextField.tsx / PasswordField.tsx / SubmitButton.tsx
├─ lib/
│  ├─ auth-actions.ts       ⭐ 서버 액션 (가입 / 로그인 / 로그아웃)
│  └─ supabase/
│     ├─ client.ts          브라우저용 클라이언트
│     ├─ server.ts          서버 컴포넌트·액션용 클라이언트
│     └─ middleware.ts      세션 갱신 + 접근 제어
└─ middleware.ts
```

### 흐름 한눈에 보기

```
[회원가입 폼] --formAction--> signUpAction (서버)
     └─ 유효성 검사 → 닉네임 중복 확인 → supabase.auth.signUp()
            └─ DB 트리거가 mm_profiles 행 생성
                 └─ (인증 메일 켜짐) 메일 안내 화면
                 └─ (인증 메일 꺼짐) /mypage 로 이동

[모든 요청] --> src/middleware.ts --> updateSession()
     ├─ 만료된 토큰 자동 갱신
     ├─ 로그인 안 했는데 /mypage → /login 으로
     └─ 로그인했는데 /login, /signup → /mypage 로
```

---

## 디자인 규칙 메모

| 토큰 | 값 | 쓰는 곳 |
| --- | --- | --- |
| `carrot-500` | `#FF7A1A` | 메인 버튼, 로고, 강조 |
| `carrot-100/50` | 연한 크림오렌지 | 카드 테두리, 배경 |
| `leaf-500` | `#43A63C` | 보조 버튼, 성공 메시지 |
| `sun` `sky` `berry` `grape` | 포인트 | 카테고리 칩, 에러(berry) |
| `ink` `#3B2C21` | 따뜻한 갈색 글자 | 검정 대신 사용 |
| `rounded-blob` | `2rem` | 큰 카드 |

- 버튼은 `.btn-squish` + `shadow-[0_5px_0_0_...]` → **눌리는 느낌**을 냅니다.
- 제목은 `font-display`(Jua), 본문은 Noto Sans KR.
- 배경은 크림색 + 아주 옅은 오렌지/그린 점무늬.

---

## 다음 단계 아이디어 (3단계 이후)

1. 찜하기 (`mm_likes` 테이블 + 상세 페이지의 하트 버튼)
2. 채팅 (`mm_chat_rooms`, `mm_messages` + Realtime)
3. 프로필 수정 (닉네임 · 동네 · 고양이 바꾸기)
4. 목록 더보기 / 무한스크롤
5. 1단계 화면들을 2차 디자인 토큰으로 정리
6. Vercel 배포 (가계부와 다른 링크로)
