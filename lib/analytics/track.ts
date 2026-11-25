import type {
  AnalyticsEventName,
  AnalyticsEvents,
  AnalyticsPropValue,
} from "./events";

declare global {
  interface Window {
    /** Umami 스크립트가 로드되면 생기는 전역 객체 (app/[lang]/layout.tsx) */
    umami?: {
      track(name: string, data?: Record<string, AnalyticsPropValue>): void;
      /** 함수 형태: Umami가 만든 기본 payload(url, title 등)를 받아 고쳐서 보낸다 */
      track(fn: (payload: UmamiPayload) => UmamiPayload): void;
    };
  }
}

/** 클릭 위임용 속성 접두사 — ClickTracker가 이 속성을 읽어 이벤트를 보낸다 */
export const TRACK_ATTR = "data-track";
export const TRACK_PROP_PREFIX = "data-track-";

type UmamiPayload = Record<string, unknown>;

/** 이벤트가 속한 페이지를 고정할 때 사용. 생략하면 전송 시점의 주소·제목이 기록된다 */
export type TrackContext = { url: string; title: string };

type Queued = [
  name: string,
  data: Record<string, AnalyticsPropValue>,
  context?: TrackContext,
];

/**
 * Umami 스크립트(afterInteractive)는 hydration 이후에 로드되므로, 그 전에 호출된 이벤트
 * (예: 홈 첫 화면의 hero 도달)는 잠시 모아 두었다가 스크립트가 생기면 보낸다.
 * 스크립트가 끝내 없으면(차단·환경변수 없음) QUEUE_TIMEOUT 뒤 버린다.
 */
const QUEUE_POLL = 250;
const QUEUE_TIMEOUT = 10_000;
const queue: Queued[] = [];
let polling = false;

function send([name, data, context]: Queued) {
  try {
    if (context) {
      window.umami?.track((payload) => ({
        ...payload,
        ...context,
        name,
        data,
      }));
    } else {
      window.umami?.track(name, data);
    }
  } catch {
    // 분석 실패가 화면 동작을 막으면 안 되므로 무시
  }
}

function waitForUmami() {
  if (polling) return;
  polling = true;
  const started = Date.now();
  const tick = () => {
    if (window.umami) {
      for (const item of queue.splice(0)) send(item);
      polling = false;
    } else if (Date.now() - started > QUEUE_TIMEOUT) {
      queue.length = 0;
      polling = false;
    } else {
      setTimeout(tick, QUEUE_POLL);
    }
  };
  tick();
}

/**
 * 이벤트 전송. 스크립트가 없거나(환경변수 없음·차단·허용 도메인 아님) 실패해도 조용히 무시한다.
 * 집계 여부(허용 도메인, umami.disabled)는 Umami 스크립트가 판단한다.
 *
 * context: 화면 전환 직후(언마운트)처럼 주소가 이미 바뀐 시점에 보낼 때, 원래 페이지로 기록하기 위해 넘긴다.
 */
export function track<E extends AnalyticsEventName>(
  event: E,
  props: AnalyticsEvents[E],
  context?: TrackContext,
) {
  const item: Queued = [event, props, context];
  if (typeof window === "undefined") return;
  if (window.umami) {
    send(item);
  } else {
    queue.push(item);
    waitForUmami();
  }
}

/**
 * HTML 속성 이름은 소문자로 바뀌므로(data-track-projectId → data-track-projectid)
 * camelCase props는 kebab-case로 붙이고, ClickTracker가 읽을 때 되돌린다.
 */
export const toAttrKey = (key: string) =>
  key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
export const fromAttrKey = (key: string) =>
  key.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());

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
    attrs[`${TRACK_PROP_PREFIX}${toAttrKey(key)}`] = String(value);
  }
  return attrs as TrackAttrs;
}
