import type { Archive } from "./types";

export const ALL_ARCHIVES: Archive[] = [
  {
    id: "001",

    title: "fetch, axios, ajax — 요청 시스템 비교 기록",

    date: "2025-11-23",

    category: "Notes",

    summary:
      "Ajax와 XMLHttpRequest의 개념을 바탕으로 jQuery.ajax, fetch, axios의 동작 방식과 특징을 비교하고, Next.js 환경에서의 활용 관점을 정리한 글.",

    description:
      "Ajax 기반 비동기 통신의 개념과 XMLHttpRequest를 설명한 뒤, jQuery.ajax, fetch, axios의 구현 방식과 장단점을 비교한다. Next.js 환경에서는 기본 fetch API를 우선 선택할 것 같다고 판단했다.",
    sections: [
      {
        heading: "Ajax와 XMLHttpRequest",
        body: `
Ajax는 페이지 전체를 새로고침하지 않고 서버와 비동기적으로 데이터를 주고받는 기술이다.

기존 웹 통신은 요청마다 페이지를 다시 렌더링하지만, Ajax는 사용자 상호작용과 서버 통신을 중간에서 엔진 해석기로 처리하여 페이지 전체를 다시 렌더링하지 않고 필요한 부분만 갱신할 수 있도록 한다.

XMLHttpRequest(XHR)는 전체 페이지를 갱신하지 않고 필요한 데이터만 가져와 화면을 업데이트할 수 있도록 지원한다.
    `,
      },
      {
        heading: "jQuery.ajax",
        body: `
jQuery.ajax는 jQuery 라이브러리에서 제공하는 비동기 통신 기능이다.

success, error, complete 등의 콜백 함수를 통해 요청 결과를 처리하며, 다양한 브라우저 환경에서 쉽게 Ajax를 사용할 수 있도록 추상화되어 있다.

jQuery 사용률 감소와 함께 최근에는 활용 빈도도 낮아지는 추세이다.
    `,
      },
      {
        heading: "fetch API",
        body: `
fetch API는 XMLHttpRequest보다 더 현대적인 인터페이스를 제공하는 Promise 기반의 HTTP API이다.

Request, Response, Headers 등을 객체로 추상화하여 HTTP 구성 요소를 다루며, 브라우저와 Node.js, Next.js 등에서 기본적으로 사용할 수 있다.

응답 데이터는 response.json() 등을 통해 직접 파싱해야 하며, 현재는 별도의 라이브러리 의존성이 필요하지 않다.
    `,
      },
      {
        heading: "axios",
        body: `
axios는 브라우저와 Node.js에서 사용할 수 있는 Promise 기반 HTTP 클라이언트 라이브러리이다.

브라우저에서는 XMLHttpRequest를, Node.js에서는 http 모듈을 사용하여 요청을 수행한다.

인터셉터, 요청 및 응답 변환, 요청 취소, JSON 자동 변환 등 fetch보다 다양한 편의 기능을 제공한다.
    `,
      },
      {
        heading: "활용 관점과 Next.js",
        body: `
라이브러리 의존성을 최소화하려면 기본 제공되는 fetch API가 적합하다.

axios는 인터셉터와 각종 편의 기능을 제공하지만 별도의 라이브러리 의존성이 생긴다.

Next.js는 fetch를 기반으로 캐싱과 데이터 패칭 기능을 확장하고 있다.

학습 목적과 프레임워크와의 자연스러운 통합을 고려하여, 나는 기본적으로 fetch를 사용하고 필요에 따라 axios를 선택하는 방향을 선호한다.
    `,
      },
    ],
  },

  {
    id: "002",
    title: "2인 협업 Git Convention 구축",

    date: "2024-08-11",

    summary:
      "소규모 협업 환경에서 충돌을 줄이기 위한 Git Flow와 Convention 설계 기록.",

    category: "Experiments",

    description:
      "2인 협업 프로젝트에서 브랜치 전략과 commit convention이 없을 경우 구조가 빠르게 혼란스러워졌다. 이를 해결하기 위한 최소 협업 규칙을 정리했다.",

    image: { src: "/gitflow.png", width: 1218, height: 446 },

    sections: [
      {
        heading: "문제 발생",
        body: "초기 프로젝트에서는 브랜치 전략 없이 main 브랜치에 직접 commit을 올리는 방식으로 개발이 진행되었다. 기능 충돌과 merge conflict가 반복되며 작업 흐름 추적이 어려워졌다.",
      },
      {
        heading: "Convention 설계",
        body: "feature 브랜치 기반 작업 흐름과 commit prefix 규칙을 도입했다. 기능 단위로 작업을 분리하고 commit 로그만 보더라도 변경 목적을 추적할 수 있도록 구성했다.",
      },
      {
        heading: "결과",
        body: "단순한 규칙 추가만으로 merge conflict 빈도가 감소했고 작업 흐름과 책임 범위를 명확하게 추적할 수 있었다. Git은 단순 버전 관리가 아니라 협업 기록 시스템이라는 점을 체감하게 되었다.",
      },
    ],
  },

  {
    id: "003",
    title: "앱스토어 배포 절차 기록",

    date: "2024-11-04",

    summary:
      "TestFlight부터 App Store 배포까지 iOS 앱 배포 흐름을 정리한 운영 기록.",

    category: "Experiments",

    description:
      "앱 개발보다 더 어렵게 느껴졌던 것은 실제 배포 과정이었다. 인증서, provisioning profile, TestFlight 심사 흐름 등을 직접 정리했다.",

    image: {
      src: "/IOSdistribute.png",
      width: 498,
      height: 257,
    },

    sections: [
      {
        heading: "첫 배포 시도",
        body: "초기에는 단순히 앱을 빌드하면 바로 업로드할 수 있을 것이라 생각했다. 하지만 Apple Developer 계정 구조, 인증서 발급, provisioning profile 설정 등 예상보다 복잡한 운영 절차가 존재했다.",
      },
      {
        heading: "배포 흐름 정리",
        body: "Git Tag 기반 버전 관리와 TestFlight 테스트 흐름을 기준으로 배포 절차를 재구성했다. 버전별 변경 이력을 추적하고 심사 단계별 상태를 기록할 수 있도록 구조화했다.",
      },
      {
        heading: "운영 관점",
        body: "앱 개발은 코드 작성에서 끝나는 것이 아니라 실제 사용자 환경까지 안전하게 전달되는 과정 전체를 포함한다는 점을 이해하게 되었다.",
      },
    ],
  },
];
