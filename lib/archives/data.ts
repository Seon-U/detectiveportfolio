import type { Archive } from "./types";

export const ALL_ARCHIVES: Archive[] = [
  {
    id: "001",

    title: "fetch, axios, ajax — 요청 시스템 비교 기록",

    date: "2024-03-12",

    summary:
      "브라우저 환경에서 사용되는 비동기 요청 방식들의 구조와 차이를 정리한 조사 기록.",

    category: "Notes",

    description:
      "fetch API, axios, jquery ajax는 모두 HTTP 요청을 처리하지만 내부 구조와 사용 목적은 상당히 다르다. 실제 동작 흐름과 브라우저 지원 구조를 기준으로 차이를 정리했다.",

    pinnedQuote: {
      body:
        "같은 요청이라도 어떤 계층에서 추상화하느냐에 따라 개발 경험은 완전히 달라진다.",
      attribution: "Field Notes",
    },

    sections: [
      {
        heading: "초기 조사",
        body:
          "초기에는 fetch와 axios의 차이가 단순 문법 수준이라고 생각했다. 하지만 실제로는 Promise 처리 방식, intercept 구조, 기본 에러 처리, 브라우저 지원 전략 등 내부 설계 철학 자체가 달랐다.",
      },

      {
        heading: "추상화 계층 분석",
        body:
          "fetch는 브라우저 내장 Web API로 최소한의 기능만 제공한다. 반면 axios는 interceptors, 자동 JSON 변환, timeout 처리 등 애플리케이션 레벨 기능을 포함한다. jquery ajax는 DOM 중심 시대의 브라우저 호환성 문제를 해결하기 위한 구조에 가까웠다.",
      },

      {
        heading: "결론",
        body:
          "중요한 것은 어떤 라이브러리가 더 좋으냐가 아니라 현재 프로젝트에서 어떤 수준의 추상화가 필요한가였다. 작은 서비스에서는 fetch만으로 충분하지만 인증 흐름이나 공통 에러 처리 구조가 복잡해질수록 axios의 장점이 커진다는 점을 확인했다.",
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

    image:
      "/gitflow.png",

    sections: [
      {
        heading: "문제 발생",
        body:
          "초기 프로젝트에서는 브랜치 전략 없이 main 브랜치에 직접 commit을 올리는 방식으로 개발이 진행되었다. 기능 충돌과 merge conflict가 반복되며 작업 흐름 추적이 어려워졌다.",
      },

      {
        heading: "Convention 설계",
        body:
          "feature 브랜치 기반 작업 흐름과 commit prefix 규칙을 도입했다. 기능 단위로 작업을 분리하고 commit 로그만 보더라도 변경 목적을 추적할 수 있도록 구성했다.",
      },

      {
        heading: "결과",
        body:
          "단순한 규칙 추가만으로 merge conflict 빈도가 감소했고 작업 흐름과 책임 범위를 명확하게 추적할 수 있었다. Git은 단순 버전 관리가 아니라 협업 기록 시스템이라는 점을 체감하게 되었다.",
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

    image:
      "/IOSdistribute.png",

    sections: [
      {
        heading: "첫 배포 시도",
        body:
          "초기에는 단순히 앱을 빌드하면 바로 업로드할 수 있을 것이라 생각했다. 하지만 Apple Developer 계정 구조, 인증서 발급, provisioning profile 설정 등 예상보다 복잡한 운영 절차가 존재했다.",
      },

      {
        heading: "배포 흐름 정리",
        body:
          "Git Tag 기반 버전 관리와 TestFlight 테스트 흐름을 기준으로 배포 절차를 재구성했다. 버전별 변경 이력을 추적하고 심사 단계별 상태를 기록할 수 있도록 구조화했다.",
      },

      {
        heading: "운영 관점",
        body:
          "앱 개발은 코드 작성에서 끝나는 것이 아니라 실제 사용자 환경까지 안전하게 전달되는 과정 전체를 포함한다는 점을 이해하게 되었다.",
      },
    ],
  },
];
