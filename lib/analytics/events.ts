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
};

export type AnalyticsEventName = keyof AnalyticsEvents;

/** Umami 이벤트 데이터로 보낼 수 있는 값 */
export type AnalyticsPropValue = string | number | boolean;
