import type { Locale } from "@/lib/i18n/config";

/**
 * 커스텀 이벤트 목록 — 이벤트 이름과 props를 한곳에서 정의한다.
 * 새 이벤트는 여기에 추가하면 track()/trackAttrs()에서 이름·props가 타입 검사된다.
 * 상세 설계: docs/plan-analytics.md §5
 */
export type AnalyticsEvents = {
  /** 이력서 PDF 다운로드 버튼 클릭 */
  resume_download: { locale: Locale };
  /** 이메일(mailto) 링크 클릭 */
  email_click: { from: "closing" | "footer" };
  /** 외부 소셜 링크 클릭 */
  social_click: { type: "github" | "tistory" };

  // ── 홈 섹션 (components/analytics/HomeSectionTracker.tsx) ──
  /** 섹션에 처음 도달 (페이지뷰당 섹션별 1회). elapsed: 페이지가 보인 시간(초) */
  home_section_reach: { section: HomeSection; order: number; elapsed: number };
  /** 섹션 체류. 탭을 숨기거나 홈을 떠날 때, 그 사이 쌓인 시간을 섹션별로 보냄(1초 미만 제외) */
  home_section_dwell: {
    section: HomeSection;
    seconds: number;
    bucket: DwellBucket;
  };
  /** 마지막 섹션(Closing) 도달. skimmed: 앞 섹션 평균 체류가 2초 미만이면 true */
  home_reached_end: { elapsed: number; skimmed: boolean };
  /** 홈을 떠남. navigate: 사이트 안 다른 페이지로 이동, leave: 탭 닫기·외부 이동 */
  home_exit: {
    lastSection: HomeSection;
    type: "navigate" | "leave";
    elapsed: number;
  };
};

/** 홈 섹션 순서 그대로 (app/[lang]/page.tsx의 data-home-section 값) */
export const HOME_SECTIONS = [
  "hero",
  "introduction",
  "roles",
  "journey",
  "closing",
] as const;
export type HomeSection = (typeof HOME_SECTIONS)[number];

/** 대시보드 Properties 탭은 값별 건수만 보여주므로, 숫자와 함께 구간 문자열도 보낸다 */
export type DwellBucket = "1-3s" | "3-10s" | "10-30s" | "30-60s" | "60s+";

export type AnalyticsEventName = keyof AnalyticsEvents;

/** Umami 이벤트 데이터로 보낼 수 있는 값 */
export type AnalyticsPropValue = string | number | boolean;
