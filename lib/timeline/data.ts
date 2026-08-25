import type { TimelineTrack } from "./types";

/**
 * Learning Journey 타임라인 데이터
 * 두 트랙: Frontline(교육·자격증) / BackStage(봉사·동아리·번외활동)
 */
export const TIMELINE_TRACKS: TimelineTrack[] = [
  {
    id: "frontline",
    label: "From frontline",
    highlight: "frontline",
    image: "/frontlineImg.webp",
    imageAlt: "애플 디벨로퍼 쇼케이스 현장 사진",
    items: [
      {
        id: "hanaro",
        period: "2024.09 - 2025.02",
        title: "Digital Hanaro",
        description: "Fintech 프로젝트, Spring 기반 하나은행 연계 개발",
      },
      {
        id: "sesac",
        period: "2024.03 - 2024.08",
        title: "SeSac FullStack",
        description: "프론트엔드 중심 풀스택 과정, Next.js",
      },
      {
        id: "ada",
        period: "2023.03 - 2023.12",
        title: "Apple Developer Academy @ POSTECH",
        description: "iOS Native App 개발, 6개 프로젝트 진행",
      },
      {
        id: "nps",
        period: "2022.07 - 2022.12",
        title: "국민연금공단 인턴",
        description: "VBA 자동화, ERP·전산망 운영 경험",
      },
    ],
  },
  {
    id: "backstage",
    label: "to BackStage",
    highlight: "BackStage",
    image: "/backstageImg.webp",
    imageAlt: "WWDC Watch Party 자원봉사 사진",
    items: [
      {
        id: "volunteer-1",
        period: "2024.01 - 2024.06",
        title: "봉사활동 (더미)",
        description: "내용을 추가해 주세요",
      },
      {
        id: "club-1",
        period: "2023.03 - 2023.12",
        title: "동아리 (더미)",
        description: "내용을 추가해 주세요",
      },
      {
        id: "extra-1",
        period: "2022.06 - 2022.08",
        title: "번외활동 (더미)",
        description: "내용을 추가해 주세요",
      },
    ],
  },
];
