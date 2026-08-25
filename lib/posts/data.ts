import type { BlogPost } from "./types";

/**
 * Tistory 블로그 포스트 목록
 * url, ogImage는 실제 발행 후 교체 필요
 */
export const ALL_POSTS: BlogPost[] = [
  {
    id: "post-001",
    title: "fetch, axios, ajax — 요청 시스템 비교 기록",
    url: "https://brandofme.tistory.com/1",
    ogImage: "/og/post-001.webp",
    date: "2025-11-23",
    tags: ["Next.js", "React"],
    summary:
      "Ajax 기반 비동기 통신의 개념과 fetch, axios의 차이를 비교하고 Next.js 환경에서의 선택 기준을 정리한 글.",
  },
  {
    id: "post-002",
    title: "앱스토어 배포 절차 기록",
    url: "https://brandofme.tistory.com/2",
    ogImage: "/og/post-002.webp",
    date: "2024-11-04",
    tags: ["iOS", "App Store"],
    summary:
      "TestFlight부터 App Store 배포까지 iOS 앱 배포 흐름을 정리한 운영 기록.",
  },
  {
    id: "post-003",
    title: "블로그 포스트 제목 (더미)",
    url: "https://brandofme.tistory.com/3",
    date: "2025-06-15",
    tags: ["Spring Boot", "MySQL"],
    summary: "내용을 추가해 주세요.",
  },
];
