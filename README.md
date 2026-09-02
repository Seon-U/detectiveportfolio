<div align="center">

# 개인 포트폴리오 사이트

<img width="480" height="376" alt="포폴사이트" src="https://github.com/user-attachments/assets/d468b962-3cec-448f-a107-f3eb80f1a133" />


![Version](https://img.shields.io/badge/version-v2.0.0-6b7280?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-111827?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-0f172a?style=for-the-badge&logo=react)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-1f2937?style=for-the-badge&logo=vercel)
<br/>
[![Open Portfolio](https://img.shields.io/badge/Open-Portfolio-06b6d4?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio.devslab.uk/)
<br/>

</div>

## 스택과 선택 이유

| 영역 | 기술 | 선택 이유 |
|---|---|---|
| **Framework** | Next.js 16 (App Router, SSG) | `generateStaticParams`로 프로젝트 페이지 정적 생성, 이미지 최적화 내장 |
| **UI** | React 19 · Tailwind CSS v4 | CSS 변수 기반 디자인 토큰으로 라이트/다크 테마 관리 |
| **Motion** | Framer Motion | 스크롤 연동 애니메이션, 플립 카드, 갤러리 전환 |
| **Theme** | next-themes | 라이트/다크 전환, `useMountedTheme` 훅으로 hydration 불일치 방지 |
| **Font** | Pretendard Variable (self-hosted) | `next/font/local` + woff2, `display: swap` |
| **SEO** | sitemap · robots · JSON-LD · OG | `buildMetadata` 유틸로 canonical/OG/Twitter 일괄 생성 |
| **Lint** | Biome | ESLint+Prettier 대체, 단일 도구 |
| **Package** | pnpm | 디스크 효율, 빠른 설치 |
| **Deploy** | Vercel | SSG 정적 배포 |

---

## 프로젝트 구조

```
├── app
│   ├── projects
│   │   ├── [id]
│   │   │   ├── page.tsx            # SSG 프로젝트 상세
│   │   │   ├── loading.tsx
│   │   │   └── not-found.tsx
│   │   └── page.tsx                # 프로젝트 목록 + 역할/태그 필터
│   ├── layout.tsx                  # 루트 레이아웃 (폰트, 테마, JSON-LD)
│   ├── page.tsx                    # 홈
│   ├── sitemap.ts
│   └── robots.ts
├── components
│   ├── home/                       # Hero, Introduction, RoleShowcase, Timeline 등
│   ├── projects/
│   │   ├── blocks/                 # Gallery, Image, Code, ERD, Flow, YouTube, Text
│   │   ├── layout/                 # ProjectHero, SectionNav, RelatedProjects 등
│   │   ├── ProjectDetail.tsx       # 역할 필터, 섹션 IntersectionObserver
│   │   └── ProjectList.tsx         # 역할/태그 필터, 프로젝트 카드
│   ├── layout/                     # Header, Footer
│   ├── seo/                        # JsonLd
│   └── ui/                         # FlipCard, HangingCard, ScrollHighlightText 등
├── lib
│   ├── projects/                   # data → queries → types
│   ├── roles/                      # 역할 정의, 프로젝트-역할 매핑
│   ├── seo/                        # config, metadata 빌더, JSON-LD 빌더
│   ├── timeline/                   # 타임라인 데이터
│   ├── introduction/               # 플립카드 데이터
│   └── hooks/                      # useMountedTheme, useIsMobile
└── public/                         # OG 이미지, 히어로 이미지, 카드 이미지 (WebP)
```

---

## 데이터 흐름

```
lib/projects/data.ts (정적 데이터)
  → queries.ts (getAllProjects, getProjectById)
  → App Router page.tsx (서버에서 호출)
  → ProjectHero (서버 컴포넌트) + ProjectDetail (클라이언트 컴포넌트)
```

DB/CMS 없이 `data.ts`에 정적 소스로 관리.  
타입(`types.ts`)으로 구조를 강제해 데이터 일관성 확보, 추후 DB 연동 시 쿼리 레이어만 교체.

---

## 🧩 고려한 것들과 고민들 (의사결정 기록)

1. **SSG로 렌더링 최적화**
   SSG로 만들어 빌드 최적화를 적용하고, 첫 화면 렌더링처리되는 ProjectHeroSection은 SSR로 분리했습니다.
   필터링 로직이 돌아가는 부분은 SSG 상태를 유지하여 구현의 깔끔함을 유지하면서 렌더링 속도는 유지하고자 했습니다.

2. **이미지는 전부 `next/image + webp`로**
   화면 비율별 최대 사이즈를 고려한 후 디스플레이 화소수를 고려하여 2배 px에서 75 퀄리티로 압축, 번들 용량을 최소화했습니다.
   또한 LCP의 경우만 eager, 나머지는 LAZY 설정 처리하여 빠른 응답과 효율을 동시에 신경썼습니다.

3. **가독성을 신경쓴 UI**
   직무별 할 수 있는 역할들이 한눈에 보이도록 구성했고, projectDetail에는 화면에서 문장의 좌우 길이가 지나치게 커지지 안도록 70% 정도를 차지하도록 설정했습니다.
   또한 기존 컨셉인 탐정 컨셉보다는 내용들이 잘보이는 구조를 신경썼고 컨셉용 디자인을 걷어낸 뒤 flipCard 정도에 강조 포인트로 추적하여 해결하는 이미지를 더했습니다.

4. **SEO 최적화**
   메타데이터 설정에서 키워드를 메인 직무명으로 변경하고 ogImg도 개별 Og마다 잘려도 보이는 디자인으로 수정했습니다. 또한 메타데이터를 자동생성하도록 설정한 이후,
   기존 구조에서 사라진 경로(Archive)나 바뀐 경로(cases/ -> projects/)는 404 혹은 301 redirect 처리하여 이미 색인된 사이트를 봇이 검색할 때 헷갈리지 않도록 설정했습니다.

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
