<div align="center">

# 개인 포트폴리오 사이트

<img width="480" height="270" alt="포폴사이트2" src="https://github.com/user-attachments/assets/42fca79f-af6c-4849-95c3-3f7e14250259" />


![Version](https://img.shields.io/badge/version-v2.0.1-6b7280?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-111827?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-0f172a?style=for-the-badge&logo=react)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-1f2937?style=for-the-badge&logo=vercel)
![i18n](https://img.shields.io/badge/i18n-KO%20%7C%20EN-374151?style=for-the-badge)
<br/>
[![Open Portfolio](https://img.shields.io/badge/Open-Portfolio-06b6d4?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio.devslab.uk/?utm_source=githubreadme)
<br/>

</div>

## 스택과 선택 이유

| 영역 | 기술 | 선택 이유 |
|---|---|---|
| **Framework** | Next.js 16 (App Router, SSG) | `generateStaticParams`로 언어 × 프로젝트 페이지 전부 정적 생성, 이미지 최적화 내장 |
| **UI** | React 19 · Tailwind CSS v4 | CSS 변수 기반 디자인 토큰으로 라이트/다크 테마 관리 |
| **Motion** | Framer Motion | 스크롤 연동 애니메이션, 플립 카드, 갤러리 전환 |
| **Theme** | next-themes | 라이트/다크 전환, `useMountedTheme` 훅으로 hydration 불일치 방지 |
| **i18n** | `[lang]` 동적 세그먼트 + JSON 사전 | 라이브러리 없이 한/영 지원, `proxy.ts`에서 쿠키·Accept-Language 기반 언어 감지 |
| **Analytics** | Umami Cloud | 쿠키 없는 방문 분석, 1st-party 프록시로 광고 차단기 우회 |
| **Font** | Pretendard Variable (self-hosted) | `next/font/local` + woff2, `display: swap` |
| **SEO** | sitemap · robots · JSON-LD · OG · hreflang | `buildMetadata` 유틸로 canonical/OG/Twitter/언어별 대체 URL 일괄 생성 |
| **Lint** | Biome | ESLint+Prettier 대체, 단일 도구 |
| **Package** | pnpm | 디스크 효율, 빠른 설치 |
| **Deploy** | Vercel | SSG 정적 배포 + proxy/redirect/rewrite 처리 |

---

## 프로젝트 구조

```
├── app
│   ├── [lang]                      # ko | en (그 외는 404)
│   │   ├── projects
│   │   │   ├── [id]
│   │   │   │   ├── page.tsx        # SSG 프로젝트 상세
│   │   │   │   └── loading.tsx
│   │   │   └── page.tsx            # 프로젝트 목록 + 역할/태그 필터
│   │   ├── [...rest]/page.tsx      # 매칭 안 되는 경로 → 레이아웃 안에서 404
│   │   ├── dictionaries.ts         # 언어별 사전 로더 (server-only)
│   │   ├── layout.tsx              # 루트 레이아웃 (폰트, 테마, JSON-LD, Umami)
│   │   ├── not-found.tsx
│   │   └── page.tsx                # 홈
│   ├── sitemap.ts                  # 언어별 URL + hreflang
│   └── robots.ts
├── components
│   ├── analytics/                  # 클릭 위임, 홈/상세 섹션 체류, 페이지 이탈 트래커
│   ├── home/                       # Hero, Introduction, RoleShowcase, Timeline 등
│   ├── i18n/                       # DictionaryProvider
│   ├── projects/
│   │   ├── blocks/                 # Gallery, Image, Code, ERD, Flow, YouTube, Text
│   │   ├── layout/                 # ProjectHero, SectionNav, RelatedProjects 등
│   │   ├── ProjectDetail.tsx       # 역할 필터, 섹션 IntersectionObserver
│   │   └── ProjectList.tsx         # 역할/태그 필터, 프로젝트 카드
│   ├── layout/                     # Header, Footer, LocaleSwitcher
│   ├── seo/                        # JsonLd
│   ├── theme/                      # ThemeProvider
│   └── ui/                         # FlipCard, HangingCard, ScrollHighlightText 등
├── dictionaries/                   # ko.json (키 구조 기준), en.json
├── lib
│   ├── analytics/                  # 이벤트 타입 정의, track(), notrack, 체류 계산
│   ├── i18n/                       # locale 설정, LocalizedString, localize()
│   ├── projects/                   # data → queries → types
│   ├── roles/                      # 역할 정의, 프로젝트-역할 매핑
│   ├── seo/                        # config, metadata 빌더, JSON-LD 빌더
│   ├── timeline/                   # 타임라인 데이터
│   ├── introduction/               # 플립카드 데이터
│   └── hooks/                      # useMountedTheme, useIsMobile
├── proxy.ts                        # locale 없는 경로 → /ko | /en 리다이렉트
├── next.config.ts                  # 레거시 경로 301, 지원처 단축 링크, Umami 프록시
└── public/                         # OG·히어로·카드 이미지 (WebP), 언어별 이력서 PDF
```

---

## 데이터 흐름

```
lib/projects/data.ts (정적 데이터, 문자열은 { ko, en } 형태)
  → queries.ts (getAllProjects, getProjectById(id, lang))
  → localize() 로 현재 언어 문자열만 남긴 렌더링용 타입으로 변환
  → App Router page.tsx (서버에서 호출)
  → ProjectHero (서버 컴포넌트) + ProjectDetail (클라이언트 컴포넌트)

dictionaries/{ko,en}.json (UI 고정 문구)
  → getDictionary(lang) → DictionaryProvider → 클라이언트 컴포넌트
```

DB/CMS 없이 `data.ts`에 정적 소스로 관리.
타입(`types.ts`)으로 구조를 강제해 데이터 일관성 확보, 추후 DB 연동 시 쿼리 레이어만 교체.
다국어 필드는 `LocalizedString = Record<Locale, string>`으로 선언해 번역 누락이 컴파일 에러로 드러나도록 했습니다.

---

## 🧩 고려한 것들과 고민들 (의사결정 기록)

1. **SSG로 렌더링 최적화**
   `generateStaticParams` + `dynamicParams = false`로 언어(ko/en) × 프로젝트 조합을 빌드 시점에 모두 정적 생성하고, 그 외 경로는 404로 처리했습니다.
   첫 화면에 보이는 ProjectHero는 서버 컴포넌트로 분리해 HTML에 바로 포함되도록 하고, 필터링처럼 상호작용이 필요한 부분만 클라이언트 컴포넌트로 두어 구현의 깔끔함과 렌더링 속도를 함께 챙겼습니다.

2. **이미지는 전부 `next/image + webp`로**
   화면 비율별 최대 표시 크기와 디스플레이 화소 밀도를 고려해 2배 px, 품질 75로 압축하여 용량을 최소화했습니다.
   또한 LCP 이미지만 eager, 나머지는 lazy로 설정해 빠른 첫 응답과 효율을 동시에 신경썼습니다.

3. **가독성을 신경쓴 UI**
   직무별로 할 수 있는 역할이 한눈에 보이도록 구성했고, 프로젝트 상세에서는 문장의 가로 길이가 지나치게 길어지지 않도록 본문 폭을 화면의 약 70%로 제한했습니다.
   기존 탐정 컨셉의 장식적인 디자인은 걷어내고 내용이 잘 보이는 구조에 집중했으며, FlipCard 정도에만 "추적하고 해결하는" 이미지를 강조 포인트로 남겼습니다.

4. **SEO 최적화**
   메타데이터 키워드를 메인 직무명 중심으로 바꾸고, OG 이미지는 플랫폼마다 잘려도 핵심이 보이는 디자인으로 수정했습니다.
   메타데이터는 `buildMetadata`로 자동 생성하고, 언어별 페이지에는 canonical과 hreflang 대체 URL을 sitemap·메타데이터 양쪽에 붙였습니다.
   기존 구조에서 사라진 경로(Archive)는 404, 바뀐 경로(`/cases` → `/ko/projects`)는 301 redirect로 처리하되 locale 리다이렉트를 한 번 더 거치지 않도록 목적지를 바로 지정해, 이미 색인된 페이지를 봇이 헷갈리지 않도록 했습니다.

5. **라이브러리 없는 다국어(ko/en) 지원**
   next-intl 같은 라이브러리 대신 Next.js 공식 가이드대로 `[lang]` 동적 세그먼트와 JSON 사전으로 구현해 의존성을 늘리지 않았습니다.
   언어가 없는 경로로 들어오면 `proxy.ts`가 ① 언어 전환 버튼으로 저장한 쿠키 ② 브라우저 Accept-Language(q값 순) ③ 기본값(ko) 순으로 언어를 정해 리다이렉트합니다.
   UI 문구는 `ko.json`을 키 구조의 기준 타입으로 삼아 `en.json`의 구조가 어긋나면 타입 에러가 나고, 프로젝트 데이터는 `LocalizedString` 타입과 `localize()`로 번역 누락을 컴파일 단계에서 잡도록 했습니다. 이력서 PDF도 언어별로 분리했습니다.

6. **쿠키 없는 방문 분석 (Umami)**
   방문자가 어느 섹션에 머물렀는지, 어떤 프로젝트를 열었는지, 얼마나 빨리 떠났는지를 알고 싶었지만 쿠키 배너나 개인정보처리방침이 필요한 방식(GA4, 세션 리플레이, 히트맵)은 피하고 싶어 쿠키를 쓰지 않는 Umami를 선택했습니다.
   - **광고 차단 우회**: `next.config` rewrites로 같은 도메인의 `/stats/*` 경로를 Umami로 중계하되, 오픈 프록시가 되지 않도록 필요한 두 경로만 고정 목적지로 연결했습니다.
   - **커스텀 이벤트**: Umami 기본 `data-umami-event`가 다운로드 링크 동작을 깨뜨려, 자체 `data-track` 속성 + capture 단계 클릭 위임(`ClickTracker`) 방식으로 바꿨습니다. 이벤트 이름과 props는 `events.ts` 한곳에서 타입으로 정의해 오타를 막았습니다.
   - **수집 항목**: 홈/상세 섹션별 도달·체류 시간, 프로젝트 카드·필터·외부 링크 클릭, 이력서 다운로드, 페이지 이탈(체류 시간·최대 스크롤 깊이·빠른 이탈 여부)을 기록합니다.
   - **유입 경로 구분**: 단축 링크가 UTM이 붙은 홈으로 307 리다이렉트되도록 해, 지원처마다 다른 링크를 배포 없이 만들 수 있게 했습니다.
   - **내 방문 제외**: 특정 경로 진입 시 로컬스토리지에 트래킹하지 않은 키 설정하여 한 번 접속하면 해당 브라우저를 집계에서 뺍니다. 첫 페이지뷰보다 먼저 실행되어야 해서 `beforeInteractive` 인라인 스크립트로 처리했습니다.


---

<details>
<summary><b> v1.0.0 버전확인하기 </b></summary>

<div align="center">

# 🕵️ Detective Portfolio

**사건을 해결하듯, 문제를 추적하고 기록하는 풀스택 개발자의 포트폴리오**

![demo](https://github.com/user-attachments/assets/398f8fbd-d0fd-440f-89ca-0a36989585d7)

Vercel 기반으로 Next.js·React로 구현한 “사건 해결형 탐정 컨셉” 포트폴리오로, <br />
게임과 추리소설, 문제풀이를 즐기는 제 성향을 담아 "탐정"이라는 테마를 잡아 만들었습니다.

</div>

## 기술 스택과 선택 이유

| 영역 | 기술 | 선택한 이유 |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | 라우팅·메타데이터·이미지 최적화를 한 틀에서. Case/Archive를 폴더 기반 라우트로 자연스럽게 표현. |
| **UI** | React 19 · Tailwind CSS v4 | 컴포넌트 단위로 "사건 파일" UI를 재사용. v4의 가벼운 설정으로 디자인 토큰(테마) 관리. |
| **Motion** | Framer Motion | 파일을 들춰보고 카드가 기울어지는 등의 모션 적용 |
| **Theme** | next-themes | 라이트/다크 전환 간편화, mounted와 결합하여 hook활용 |
| **Lint/Format** | Biome | 최신, 효율화 |
| **Package** | pnpm | 디스크 효율과 빠른 설치. |
| **Deploy** | Vercel | Next.js와의 정합성 + 무료배포 |

---

## 데이터 구조 흐름

`lib/**/data.ts`
→ `queries.ts`로 가공
→ App Router Page에서 호출
→ 컴포넌트에 props 전달
→ Case / Archive UI 렌더링

----

## 🧩 고려한 것들과 고민들 (의사결정 기록)

1. **데이터를 DB/CMS 없이 코드 내 정적 소스(`lib/**/data.ts`)로 둔 이유**
   콘텐츠 양이 많지 않고 변경이 잦지 않아, 일단 정적으로 처리하고 추후 db를 붙일 수 있도록 타입(`types.ts`)으로 구조를 강제해 데이터 일관성도 확보했습니다. 

2. **이미지는 전부 `next/image`로**
   원본이 큰 이미지(프로필·프로젝트 스크린샷)가 있어, 자동 리사이즈·포맷 변환으로 로딩과 대역폭을 최적화.
   향후 원본 자체를 더 줄이는 것을 로드맵에 둠.

3. **컨셉과 기능의 일치**
   다크모드 적용까지 하나의 테마에 두려고 했고 테마 색 반전의 경우에는 최대한 global.css 내에서 처리하도록 설정,
   일관성을 유지하고 tailwind code자체도 줄이고자 함

---

</details>
