"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { createVisibleClock, toDwellBucket } from "@/lib/analytics/dwell";
import {
  classifyPage,
  currentScrollPercent,
  toScrollBucket,
} from "@/lib/analytics/page";
import { type TrackContext, track } from "@/lib/analytics/track";

/** 빠른 이탈 기준 (docs/plan-analytics.md §5-2) */
const BOUNCE_MS = 10_000;
const BOUNCE_SCROLL = 25;
/** 스크롤 판정 간격(ms) */
const CHECK_INTERVAL = 200;

/**
 * 모든 페이지 공통: 페이지를 떠날 때 실제로 본 시간·최대 스크롤 깊이·빠른 이탈 여부를 1회 보낸다.
 * app/[lang]/layout.tsx에 한 번 마운트하고, 주소(pathname)가 바뀔 때마다 이전 페이지를 마감한다.
 *
 * - usePathname 값은 렌더링에 쓰지 않고 전환 감지에만 쓴다(rewrite·proxy가 있으면 서버 값과 다를 수 있음).
 *   페이지 판별은 effect 안에서 location.pathname으로 한다.
 * - ?role= 같은 쿼리만 바뀌는 경우는 같은 페이지로 본다.
 * - 전송 시점: 사이트 안 이동(navigate)과 pagehide(leave). 홈의 home_exit과 같은 규칙이라
 *   모바일에서 pagehide 없이 탭이 정리되면 빠질 수 있다.
 */
export default function PageEngagementTracker() {
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname은 페이지 전환 감지용 트리거
  useEffect(() => {
    const page: TrackContext = { url: location.href, title: document.title };
    const isNotFound = document.querySelector("[data-not-found]") !== null;
    const { page: kind, projectId } = classifyPage(
      location.pathname,
      isNotFound,
    );
    const clock = createVisibleClock();
    // 로딩 화면(loading.tsx)처럼 짧은 화면에서 첫 값을 재면 100%가 될 수 있어, 첫 측정은 한 박자 늦춘다
    let maxScroll = 0;
    let measuring = false;
    let sent = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const measure = () => {
      if (!measuring) return;
      maxScroll = Math.max(maxScroll, currentScrollPercent());
    };
    const startTimer = setTimeout(() => {
      measuring = true;
      measure();
    }, 1000);

    const onScroll = () => {
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
        measure();
      }, CHECK_INTERVAL);
    };

    const send = (type: "navigate" | "leave") => {
      if (sent) return;
      sent = true;
      // navigate는 cleanup 시점이라 화면이 이미 다음 페이지다. 그때 재면 다음 페이지 값이 섞인다
      if (type === "leave") measure();
      const ms = clock.ms();
      const seconds = Math.round(ms / 1000);
      track(
        "page_engagement",
        {
          page: kind,
          projectId,
          seconds,
          bucket: toDwellBucket(seconds),
          maxScroll,
          scrollBucket: toScrollBucket(maxScroll),
          bounced: ms < BOUNCE_MS && maxScroll < BOUNCE_SCROLL,
          type,
        },
        page,
      );
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") clock.pause();
      else clock.resume();
    };
    const onPageHide = () => send("leave");
    // 뒤로 가기 캐시(bfcache)로 돌아오면 다시 측정
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) sent = false;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("pageshow", onPageShow);

    return () => {
      send("navigate");
      clearTimeout(startTimer);
      if (timer) clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [pathname]);

  return null;
}
