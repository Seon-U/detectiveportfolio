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
    description: "사용자 이해를 기반으로 서비스를 만들고 개선합니다",
    image: "/frontlineImg.webp",
    imageAlt: "애플 디벨로퍼 쇼케이스 현장 사진",
    items: [
      {
        id: "hanaro",
        period: "2025.10 - 2026.04 (975hr)",
        title: "디지털 하나로 금융 서비스 개발 과정 최우수 수료",
        description:
          "하나은행 실무자 평가 금융 서비스 프로젝트 4건 기획 및 개발",
      },
      {
        id: "Sesac",
        period: "2025.05 - 2025.10 (265hr)",
        title: "청년취업사관학교 풀스택 프로젝트 실무과정 수료",
        description: "타입안전성과 캐시를 활용한 Next.js, React 웹 개발",
      },
      {
        id: "ADAP",
        period: "2024.03 - 2024.12",
        title: "Apple Developer Academy @Postech 수료",
        description: "HIG 가이드라인과 타겟 분석을 토대로 iOS 네이티브 앱 개발",
      },
    ],
  },
  {
    id: "backstage",
    label: "to BackStage",
    highlight: "BackStage",
    description: "데이터와 업무를 구조화하여 서비스가 제대로 작동하도록 합니다",
    image: "/backstageImg.webp",
    imageAlt: "WWDC Watch Party 자원봉사 사진",
    items: [
      {
        id: "NationalLanguage",
        period: "2025.03 - 2025.08",
        title: "국립국어원 홈페이지 데이터 정제 인턴",
        description:
          "통계 데이터 정제, 오류 케이스 검증 과정 일부 Excel자동화, 업무 가이드라인 작성",
      },
      {
        id: "WomanCall",
        period: "2024.01 (24hr)",
        title: "한국여성의 전화 분노의 게이지 자원봉사활동",
        description: "규칙 기반 뉴스 데이터 분석, 300건 사례 정리",
      },
      {
        id: "NPS",
        period: "2022.04 - 2022.07",
        title: "국민연금공단 민원 안내 및 사무보조 인턴",
        description: "하루 100건 이상의 서류 적부 판단, 신뢰감 있는 민원 안내",
      },
      {
        id: "KHUniv",
        period: "2017.03 - 2022.02",
        title: "경희대학교 국어국문학과 학사 졸업",
        description:
          "언어 이해 기반 데이터 분석과 매체 이해, 최종 학점 3.774/4.3",
      },
    ],
  },
];
