import type { Case } from "./types";

export const ALLCASES: Case[] = [
  {
    id: "001",
    title: "시니어 반려동물 통합관리 서비스",
    summary:
      "Next.js · Spring Security · Nginx 환경에서 발생한 인증 장애와 배포 구조 문제를 추적한 사례.",

    tags: ["Next.js", "Spring Security", "JWT", "Nginx", "Reverse Proxy"],

    status: "SOLVED",

    date: "2026-04-20",

    image: "/MGK_1.webp",

    images: [
      { src: "/MGK_1.webp", width: 1920, height: 1080 },
      { src: "/MGK_2.webp", width: 1920, height: 1080 },
      { src: "/MGK_3.webp", width: 1920, height: 1080 },
    ],

    description:
      "시니어 반려동물의 지출, 건강 관리, 음성 입력 기능을 통합 관리하는 웹 서비스. 인증 구조 설계와 배포 환경 트러블슈팅을 중심으로 개발을 진행했다.",

    projectUrl: "https://github.com/My-Golden-Kids/MGK",

    contributions: [
      {
        roleId: "frontend",
        summary:
          "인증 구조 설계 및 Reverse Proxy 재설계, STT 보정 로직 구현",
        team: { total: 4, myRole: "프론트엔드" },
      },
      {
        roleId: "backend",
        summary:
          "Spring Security 인증 흐름 검증, Nginx 헤더 전달 설정",
        team: { total: 4, myRole: "백엔드" },
      },
    ],

    sections: [
      {
        heading: "사건 발생",
        body: "배포 이후 인증이 필요한 API 요청이 전면 실패했다. 로컬 환경에서는 정상적으로 동작했지만 운영 환경에서는 모든 인증 요청이 차단되었다. 요청은 Next.js Middleware, Spring Security, Nginx 세 레이어를 거쳐 처리되고 있었고 정확한 실패 지점을 특정하기 어려운 상태였다.",
      },

      {
        heading: "레이어별 추적",
        roles: ["frontend"],
        body: "초기 로그 분석 결과 405 Method Not Allowed 오류가 Spring이 아닌 Next.js Middleware에서 발생하고 있음을 확인했다. getToken 기반 직접 검증 방식을 auth() 콜백 방식으로 변경하여 첫 번째 문제를 해결했다. 이후 HTTPS 환경에서 HTTP API를 직접 호출하며 mixed content 문제가 추가로 발생했다.",
      },

      {
        heading: "Reverse Proxy 구조 재설계",
        roles: ["frontend", "backend"],
        body: "모든 API 요청을 Next.js 내부 proxy 레이어를 통해 전달하도록 구조를 재설계했다. 이를 통해 mixed content 문제를 해결하고 Authorization Header 흐름을 일관되게 통제할 수 있었다. 이후 Nginx 헤더 전달 설정과 Spring 인증 흐름을 재검증하며 운영 환경 인증 구조를 안정화했다.",

        image: {
          src: "/MGK_2.webp",
          width: 1920,
          height: 1080,
          caption: "Fig 1: Reverse Proxy 기반으로 재구성된 최종 인증 아키텍처.",
        },
      },

      {
        heading: "음성 인식 이상 현상",
        roles: ["frontend"],
        body: "STT 기반 음성 입력 기능에서는 한국어 발음 오인식 문제가 발생했다. '밥 두끼'가 '밤토끼'로, '세끼'가 '새끼'로 인식되는 현상이 반복되었고 특정 발음 패턴에서 경음 인식이 불안정하다는 점을 확인했다.",
      },

      {
        heading: "규칙 기반 보정",
        roles: ["frontend"],
        body: "빈출 오인식 단어를 명시적으로 수집하여 normalize correction map을 구성했다. 또한 '끼'와 '기'처럼 한국어 경음 발음을 동일 패턴으로 처리하도록 보정 로직을 추가하여 입력 정확도를 개선했다.",
        image: {
          src: "/MGK_3.webp",
          width: 1920,
          height: 1080,
          caption: "Fig 2: normalize code",
        },
      },
    ],
  },

  {
    id: "002",

    title: "MZ부모를 위한 증여 관리 웹 서비스",

    summary:
      "복잡한 금융 관계를 사용자 중심 데이터 구조로 재설계한 증여 관리 서비스.",

    tags: ["Next.js", "PrismaORM", "MySQL", "OpenAI API", "Design System"],

    status: "SOLVED",

    date: "2026-02-03",

    image: "/aiapp_1.webp",

    images: [
      { src: "/aiapp_1.webp", width: 1440, height: 809 },
      { src: "/aiapp_2.webp", width: 1920, height: 1080 },
    ],

    description:
      "MZ 부모 세대를 위한 증여 관리 웹 서비스. 금융 관계 중심 데이터 모델링과 디자인 시스템 구축을 중심으로 개발을 진행했다.",

    projectUrl: "https://github.com/Seon-U/foryouhana-mobileweb-ui.git",

    contributions: [
      {
        roleId: "frontend",
        summary:
          "TailwindCSS v4 기반 디자인 시스템 구축, Storybook 활용 UI 일관성 확보",
        team: { total: 4, myRole: "프론트엔드" },
      },
      {
        roleId: "backend",
        summary:
          "Account 중심 데이터 모델 재설계, 반정규화 전략 적용",
        team: { total: 4, myRole: "백엔드" },
      },
    ],

    sections: [
      {
        heading: "초기 구조 분석",
        body: "초기 데이터 구조는 관계 흐름이 복잡하고 JOIN 의존도가 높아 유지보수 비용이 큰 상태였다. 특히 계좌(Account)와 거래(Transaction) 관계가 분산되어 있어 사용자 중심 흐름을 추적하기 어려웠다.",
      },

      {
        heading: "데이터 모델 재구성",
        roles: ["backend"],
        body: "금융 서비스 구조를 기반으로 Account 중심 관계 모델을 재설계했다. parent_id 기반 계층 구조를 도입하고 User 중심 관계로 정리하여 데이터 흐름을 단순화했다.",
      },

      {
        heading: "반정규화 전략",
        roles: ["backend"],
        body: "조회 성능과 유지보수성을 고려하여 일부 구조에는 반정규화를 적용했다. 반복적인 JOIN 복잡도를 줄이고 데이터 접근 경로를 단순화하여 서비스 구조를 안정화했다.",
      },

      {
        heading: "공통 디자인 시스템 구축",
        roles: ["frontend"],
        body: "TailwindCSS v4 기반 컬러 토큰 시스템을 구축하고 global.css 중심 theme 구조를 설계했다. 공통 컴포넌트와 Storybook을 활용하여 협업 환경에서 UI 일관성을 유지할 수 있도록 구성했다.",
        image: {
          src: "/aiapp_2.webp",
          width: 1920,
          height: 1080,
          caption: "Fig 1: 폰트 시스템 코드와 컬러토큰",
        },
      },
    ],
  },

  {
    id: "003",

    title: "개인 블로그 개발",

    summary:
      "폴더형 아카이브 블로그 내부에서 발생한 검색, 댓글 구조, 인증 흐름 문제를 재구성한 기록.",

    tags: [
      "Next.js",
      "MySQL",
      "PrismaORM",
      "NextAuth.js",
      "Storybook",
      "FullText Search",
    ],

    status: "SOLVED",

    date: "2026-01-06",

    image: "/personalBlog_1.webp",

    images: [
      { src: "/personalBlog_1.webp", width: 1920, height: 1080 },
      { src: "/personalBlog_2.webp", width: 1920, height: 1080 },
      { src: "/personalBlog_3.webp", width: 1920, height: 1080 },
    ],

    description:
      "GitHub 스타일 활동 그래프와 폴더 구조를 결합한 아카이브형 블로그. 검색 최적화, 계층형 댓글 구조, 인증 및 재사용 가능한 UI 시스템 구축을 중심으로 개발했다.",

    projectUrl: "https://github.com/Seon-U/blogging.git",

    contributions: [
      {
        roleId: "frontend",
        summary:
          "아카이브형 UI 설계, Storybook 기반 재사용 컴포넌트 시스템 구축",
        team: { total: 1, myRole: "풀스택" },
      },
      {
        roleId: "backend",
        summary:
          "계층형 댓글 구조, FullText 검색 인덱스, NextAuth 인증 흐름 구현",
        team: { total: 1, myRole: "풀스택" },
      },
    ],

    sections: [
      {
        heading: "아카이브 구조 설계",
        roles: ["frontend"],
        body: "폴더 기반 탐색 구조와 GitHub 스타일 활동 그래프를 결합하여 사용자가 기록 흐름 자체를 탐색할 수 있는 아카이브 형태로 재구성했다.",
      },

      {
        heading: "계층형 댓글 추적",
        roles: ["backend"],
        body: "Comment 테이블에 parentId와 depth 구조를 도입하여 무한 대댓글 구조를 설계했다. flat 형태로 저장된 댓글 데이터를 parentId 기준 재귀 트리로 복원하고 depth 기반 들여쓰기를 적용하여 계층 구조를 시각적으로 표현했다.",
        image: {
          src: "/personalBlog_2.webp",
          width: 1920,
          height: 1080,
          caption: "Fig 1: 무한 대댓글 ERD 구조",
        },
      },

      {
        heading: "검색 인덱스 재구성",
        roles: ["backend"],
        body: "Post 테이블의 title과 content 기반 FullText Index를 구성했다. MySQL innodb_ft_user_stopword_table에 한국어 불용어를 등록하여 검색 정확도를 개선했고, 검색 결과와 폴더 목록은 페이지네이션 기반으로 처리하여 데이터 흐름을 최적화했다.",
      },

      {
        heading: "재사용 가능한 UI 시스템",
        roles: ["frontend"],
        body: "Shadcn UI Select 컴포넌트를 확장하여 폴더 생성 기능이 포함된 SelectWithCreate 컴포넌트를 제작했다. icon, label, defaultValue 등을 props 기반으로 분리하여 다양한 입력 흐름에 재사용 가능하도록 설계했고 Storybook 기반 UI 테스트를 함께 구성했다.",
        image: {
          src: "/personalBlog_3.webp",
          width: 1920,
          height: 1080,
          caption: "Fig 2: StoryBook Select 컴포넌트 활용 예시",
        },
      },

      {
        heading: "인증 및 검증 흐름",
        roles: ["backend"],
        body: "NextAuth.js 기반 OAuth 인증 구조를 적용하고 회원가입 및 로그인 과정에는 zod validation 객체를 사용했다. 비밀번호는 bcryptjs 기반 hash 처리 후 저장했으며 compare 검증 흐름으로 로그인 인증을 구성했다.",
      },
    ],
  },

  {
    id: "004",

    title: "북한이탈주민을 위한 한국어 발음 학습 앱",

    summary: "북한이탈주민을 위한 한국어 발음 학습 앱과 음성 처리 구조 개발.",

    tags: ["SwiftUI", "AVFAudio", "iOS", "App Store", "JSON Storage"],

    status: "SOLVED",

    date: "2024-12-05",

    image: "/peacefull_1.webp",

    images: [
      { src: "/peacefull_1.webp", width: 8245, height: 4638 },
      { src: "/peacefull_2.webp", width: 1212, height: 1158 },
    ],

    description:
      "북한이탈주민이 남한 발음을 학습하고 녹음 및 비교할 수 있도록 제작한 iOS 학습 앱.",

    contributions: [
      {
        roleId: "ios",
        summary:
          "SwiftUI 화면 구현, AVFAudio 기반 녹음·재생 관리, App Store 배포",
        team: { total: 4, myRole: "iOS 개발" },
      },
      {
        roleId: "planner",
        summary:
          "북한이탈주민 대상 사용자 인터뷰 기반 학습 흐름 기획",
        team: { total: 4, myRole: "기획" },
      },
    ],

    sections: [
      {
        heading: "음성 학습 구조 설계",
        roles: ["ios", "planner"],
        body: "사용자가 아나운서 발음을 듣고 직접 따라 말한 뒤 녹음 결과를 비교할 수 있도록 학습 흐름을 설계했다. SwiftUI 기반 화면 구성과 음성 재생 흐름을 함께 구현했다.",
      },

      {
        heading: "AVFAudio 기반 Audio Manager",
        roles: ["ios"],
        body: "AVFAudio 기반 Audio Manager를 직접 구현하여 녹음, 재생, 세션 상태 관리 흐름을 통합했다. 앱 상태 변화(scenePhase)에 따라 자동 저장과 재생 상태 동기화가 가능하도록 처리했다.",

        image: {
          src: "/peacefull_2.webp",
          width: 1212,
          height: 1158,
          caption: "Fig 1: 녹음 및 재생 흐름을 담당하는 Audio Manager 구조.",
        },
      },

      {
        heading: "JSON 기반 저장 전략",
        roles: ["ios"],
        body: "SwiftData와 같은 프레임워크 의존도를 줄이기 위해 JSON 파일 기반 저장 구조를 선택했다. 앱 번들 버전 변경 시 JSON 데이터를 자동 갱신하도록 설계하여 데이터 관리 비용을 최소화했다.",
      },

      {
        heading: "배포 및 형상 관리",
        roles: ["ios"],
        body: "Git Tag 기반 버전 관리를 적용하고 TestFlight 및 App Store 배포 과정을 직접 관리했다. 앱 업데이트 흐름과 배포 이력을 체계적으로 추적할 수 있도록 운영 구조를 구성했다.",
      },
    ],
  },
];
