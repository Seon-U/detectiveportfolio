import type {
  AnalyticsEventName,
  AnalyticsEvents,
  AnalyticsPropValue,
} from "./events";

declare global {
  interface Window {
    /** Umami 스크립트가 로드되면 생기는 전역 객체 (app/[lang]/layout.tsx) */
    umami?: {
      track: (name: string, data?: Record<string, AnalyticsPropValue>) => void;
    };
  }
}

/** 클릭 위임용 속성 접두사 — ClickTracker가 이 속성을 읽어 이벤트를 보낸다 */
export const TRACK_ATTR = "data-track";
export const TRACK_PROP_PREFIX = "data-track-";

/**
 * 이벤트 전송. 스크립트가 없거나(환경변수 없음·차단·허용 도메인 아님) 실패해도 조용히 무시한다.
 * 분석 실패가 화면 동작을 막으면 안 되기 때문.
 */
export function track<E extends AnalyticsEventName>(
  event: E,
  props: AnalyticsEvents[E],
) {
  try {
    window.umami?.track(event, props);
  } catch {
    // 무시
  }
}

/** 타입 검사를 거친 이벤트·props를 ClickTracker가 읽는 data-* 속성으로 바꾼다 */
type TrackAttrs = { [TRACK_ATTR]: string } & Record<
  `${typeof TRACK_PROP_PREFIX}${string}`,
  string
>;

/**
 * 클릭 추적 속성 생성. 서버 컴포넌트에서도 쓸 수 있다(핸들러 없이 속성만 붙음).
 * @example <a {...trackAttrs("resume_download", { locale })}>
 *   → data-track="resume_download" data-track-locale="ko"
 */
export function trackAttrs<E extends AnalyticsEventName>(
  event: E,
  props: AnalyticsEvents[E],
): TrackAttrs {
  const attrs: Record<string, string> = { [TRACK_ATTR]: event };
  for (const [key, value] of Object.entries(props)) {
    attrs[`${TRACK_PROP_PREFIX}${key}`] = String(value);
  }
  return attrs as TrackAttrs;
}
