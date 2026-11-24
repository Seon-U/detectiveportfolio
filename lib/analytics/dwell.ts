import type { DwellBucket } from "./events";

/** 체류 초를 대시보드에서 건수로 비교하기 쉬운 구간 문자열로 바꾼다 */
export function toDwellBucket(seconds: number): DwellBucket {
  if (seconds < 3) return "1-3s";
  if (seconds < 10) return "3-10s";
  if (seconds < 30) return "10-30s";
  if (seconds < 60) return "30-60s";
  return "60s+";
}

/**
 * 탭이 보이는 동안만 흐르는 시계. 다른 탭을 보고 있던 시간은 체류로 치지 않기 위함.
 * pause/resume은 visibilitychange에서 호출한다.
 */
export function createVisibleClock() {
  let total = 0;
  let since: number | null =
    document.visibilityState === "visible" ? performance.now() : null;

  return {
    /** 지금까지 보인 시간(ms) */
    ms: () => total + (since === null ? 0 : performance.now() - since),
    pause: () => {
      if (since !== null) total += performance.now() - since;
      since = null;
    },
    resume: () => {
      if (since === null) since = performance.now();
    },
  };
}
