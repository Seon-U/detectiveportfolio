<div align="center">

# 🕵️ Detective Portfolio

**사건을 해결하듯, 문제를 추적하고 기록하는 풀스택 개발자의 포트폴리오**


![Version](https://img.shields.io/badge/version-v1.0.0-6b7280?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-111827?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-0f172a?style=for-the-badge&logo=react)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-1f2937?style=for-the-badge&logo=vercel)
<br/>
[![Open Portfolio](https://img.shields.io/badge/Open-Portfolio-06b6d4?style=for-the-badge&logo=vercel&logoColor=white)](https://seon-u-portfolio.vercel.app/)
<br/>

![demo](https://github.com/user-attachments/assets/398f8fbd-d0fd-440f-89ca-0a36989585d7)

Vercel 기반으로 Next.js·React로 구현한 “사건 해결형 탐정 컨셉” 포트폴리오로, <br />
게임과 추리소설, 문제풀이를 즐기는 제 성향을 담아 "탐정"이라는 테마를 잡아 만들었습니다.

</div>

---
## 프로젝트 구조
```
├── app
│   ├── archives
│   │   ├── [id]
│   │   │   ├── loading.tsx
│   │   │   ├── not-found.tsx
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── cases
│   │   ├── [id]
│   │   │   ├── loading.tsx
│   │   │   ├── not-found.tsx
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── fonts
│   │   └── PretendardStdVariable.woff2
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── biome.json
├── components
│   ├── archives
│   │   ├── ArchiveDetail.tsx
│   │   └── ArchivesList.tsx
│   ├── cases
│   │   ├── CaseCarousel.tsx
│   │   ├── CaseDetail.tsx
│   │   ├── CaseFilesList.tsx
│   │   └── CaseModal.tsx
│   ├── home
│   │   ├── HeroSection.tsx
│   │   ├── IntroductionSection.tsx
│   │   ├── LearningJourneySection.tsx
│   │   ├── Note.tsx
│   │   ├── RecentSection.tsx
│   │   ├── StackCard.tsx
│   │   ├── TechStackSection.tsx
│   │   ├── learning-journey.module.css
│   │   └── note.module.css
│   ├── layout
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   └── ui
│       ├── SectionHeader.tsx
│       └── section-header.module.css
├── lib
│   ├── archives
│   │   ├── data.ts
│   │   ├── queries.ts
│   │   └── types.ts
│   ├── cases
│   │   ├── data.ts
│   │   ├── queries.ts
│   │   ├── status-styles.ts
│   │   └── types.ts
│   ├── hooks
│   │   └── useMountedTheme.ts
│   └── utils.ts
├── next-env.d.ts
├── next.config.ts
└─── node_modules
```

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

## 🚀 로컬에서 실행하기

> 이 프로젝트는 **pnpm**을 사용합니다.

```bash
pnpm install
pnpm dev        # 개발 서버 → http://localhost:3000
pnpm build      # 프로덕션 빌드
pnpm lint       # Biome 검사
```

---

## 📮 Contact

- **Email**: seonu.kim.kr@gmail.com
- **GitHub**: [@Seon-U](https://github.com/Seon-U)
- **Status**: `Open to Work`

<div align="center">

*“모든 코드에는 이유가 있다.”*

</div>
