import type { Locale } from "@/lib/i18n/config";
import { localize } from "@/lib/i18n/localize";
import type { TimelineTrack, TimelineTrackSource } from "./types";

/**
 * Learning Journey 타임라인 데이터
 * 두 트랙: Frontline(교육·자격증) / BackStage(봉사·동아리·번외활동)
 */
const TIMELINE_TRACKS: TimelineTrackSource[] = [
  {
    id: "frontline",
    label: { ko: "From frontline", en: "From frontline" },
    highlight: { ko: "frontline", en: "frontline" },
    description: {
      ko: "사용자 이해를 기반으로 서비스를 만들고 개선합니다",
      en: "Builds and improves services grounded in an understanding of users.",
    },
    image: "/frontlineImg.webp",
    imageAlt: {
      ko: "애플 디벨로퍼 쇼케이스 현장 사진",
      en: "Photo from the Apple Developer Academy showcase",
    },
    items: [
      {
        id: "hanaro",
        period: "2025.10 - 2026.04 (975hr)",
        title: {
          ko: "디지털 하나로 금융 서비스 개발 과정 최우수 수료",
          en: "Completed the Digital Hanaro Financial Service Development Program as a top graduate",
        },
        description: {
          ko: "하나은행 실무자 평가 금융 서비스 프로젝트 4건 기획 및 개발",
          en: "Planned and developed 4 financial service projects, evaluated by Hana Bank practitioners",
        },
      },
      {
        id: "Sesac",
        period: "2025.05 - 2025.10 (265hr)",
        title: {
          ko: "청년취업사관학교 풀스택 프로젝트 실무과정 수료",
          en: "Completed the SeSAC Full-Stack Project Practice Course (Youth Employment Academy)",
        },
        description: {
          ko: "타입안전성과 캐시를 활용한 Next.js, React 웹 개발",
          en: "Web development with Next.js and React, using type safety and caching",
        },
      },
      {
        id: "UXStudy",
        period: "2025.08 - 2025.10",
        title: { ko: "UX해적단 스터디 활동", en: "UX Pirates study group" },
        description: {
          ko: "UX이론 기반 기존 서비스 UI분석, 개선안 디자인",
          en: "Analyzed existing service UIs and designed improvements based on UX theory",
        },
      },
      {
        id: "ADAP",
        period: "2024.03 - 2024.12",
        title: {
          ko: "Apple Developer Academy @Postech 수료",
          en: "Completed Apple Developer Academy @Postech",
        },
        description: {
          ko: "HIG 가이드라인과 타겟 분석을 토대로 iOS 네이티브 앱 개발",
          en: "Built native iOS apps following Apple's Human Interface Guidelines and target-user analysis",
        },
      },
    ],
  },
  {
    id: "backstage",
    label: { ko: "to BackStage", en: "to BackStage" },
    highlight: { ko: "BackStage", en: "BackStage" },
    description: {
      ko: "데이터와 업무를 구조화하여 서비스가 제대로 작동하도록 합니다",
      en: "Structures data and workflows so that services run properly.",
    },
    image: "/backstageImg.webp",
    imageAlt: {
      ko: "WWDC Watch Party 자원봉사 사진",
      en: "Photo from volunteering at the WWDC Watch Party",
    },
    items: [
      {
        id: "NationalLanguage",
        period: "2025.03 - 2025.08",
        title: {
          ko: "국립국어원 홈페이지 데이터 정제 인턴",
          en: "Website Data Cleansing Intern, National Institute of Korean Language",
        },
        description: {
          ko: "통계 데이터 정제, 오류 케이스 검증 과정 일부 Excel자동화, 업무 가이드라인 작성",
          en: "Cleaned statistical data, automated parts of the error-case verification process in Excel, and wrote work guidelines",
        },
      },
      {
        id: "NPS",
        period: "2022.04 - 2022.07",
        title: {
          ko: "국민연금공단 민원 안내 및 사무보조 인턴",
          en: "Public Inquiry Assistance & Administrative Intern, National Pension Service",
        },
        description: {
          ko: "하루 100건 이상의 서류 적부 판단, 신뢰감 있는 민원 안내",
          en: "Verified 100+ documents a day for validity and gave citizens clear, trustworthy guidance",
        },
      },
      {
        id: "KHUniv",
        period: "2017.03 - 2022.02",
        title: {
          ko: "경희대학교 국어국문학과 학사 졸업",
          en: "B.A. in Korean Language and Literature, Kyung Hee University",
        },
        description: {
          ko: "언어 이해 기반 데이터 분석과 매체 이해, 최종 학점 3.774/4.3",
          en: "Data analysis and media understanding grounded in language studies; final GPA 3.774/4.3",
        },
      },
    ],
  },
];

export function getTimelineTracks(locale: Locale): TimelineTrack[] {
  return localize(TIMELINE_TRACKS, locale);
}
