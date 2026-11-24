"use client";

import { useEffect } from "react";
import { createVisibleClock, toDwellBucket } from "@/lib/analytics/dwell";
import { HOME_SECTIONS, type HomeSection } from "@/lib/analytics/events";
import { type TrackContext, track } from "@/lib/analytics/track";

/** 스크롤 판정 간격(ms). 매 프레임 계산할 필요가 없어 묶어서 처리 */
const CHECK_INTERVAL = 150;
/** 이보다 짧은 체류는 보내지 않음(스크롤하며 지나간 것) */
const MIN_DWELL_MS = 1000;
/** 끝에 도달했을 때 앞 섹션 평균 체류가 이 값 미만이면 "훑고 지나감" */
const SKIM_AVG_MS = 2000;

const toSec = (ms: number) => Math.round(ms / 1000);

/**
 * 홈 섹션 도달·체류·끝 도달·이탈 측정. 화면에는 아무것도 그리지 않는다.
 * 섹션은 app/[lang]/page.tsx에서 [data-home-section] 래퍼로 표시한다.
 *
 * IntersectionObserver 대신 스크롤 시 getBoundingClientRect로 직접 판정하는 이유:
 * - 타임라인처럼 화면보다 몇 배 긴 섹션은 "요소의 30% 노출"이 아예 불가능할 수 있음
 * - 페이지 맨 아래의 짧은 Closing은 화면 중앙선에 닿지 못할 수 있음
 */
export default function HomeSectionTracker() {
  useEffect(() => {
    const sections = HOME_SECTIONS.flatMap((id) => {
      const el = document.querySelector(`[data-home-section="${id}"]`);
      return el ? [{ id, el }] : [];
    });
    if (sections.length === 0) return;

    // Next는 주소를 먼저 바꾼 뒤 이 컴포넌트를 언마운트한다. 그때 보내는 이벤트가 새 페이지로
    // 기록되지 않도록, 홈의 주소·제목을 고정해서 모든 이벤트에 넣는다.
    const page: TrackContext = { url: location.href, title: document.title };
    const clock = createVisibleClock();
    const reached = new Set<HomeSection>();
    const pendingMs = new Map<HomeSection, number>(); // 아직 안 보낸 체류
    const totalMs = new Map<HomeSection, number>(); // 페이지뷰 전체 누적(훑음 판정용)
    let active: HomeSection | null = null;
    let segStart = 0; // active가 된 시점의 clock.ms()
    let exited = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    /** 현재 active 섹션에 지금까지의 시간을 반영 */
    const commit = () => {
      const now = clock.ms();
      if (active) {
        const d = now - segStart;
        pendingMs.set(active, (pendingMs.get(active) ?? 0) + d);
        totalMs.set(active, (totalMs.get(active) ?? 0) + d);
      }
      segStart = now;
    };

    const setActive = (next: HomeSection) => {
      if (next === active) return;
      commit();
      active = next;
    };

    const flushDwell = () => {
      commit();
      for (const [section, ms] of pendingMs) {
        if (ms < MIN_DWELL_MS) continue;
        const seconds = toSec(ms);
        track(
          "home_section_dwell",
          { section, seconds, bucket: toDwellBucket(seconds) },
          page,
        );
      }
      pendingMs.clear();
    };

    const reach = (id: HomeSection) => {
      reached.add(id);
      const elapsed = toSec(clock.ms());
      const order = HOME_SECTIONS.indexOf(id) + 1;
      track("home_section_reach", { section: id, order, elapsed }, page);

      if (id === HOME_SECTIONS[HOME_SECTIONS.length - 1]) {
        commit();
        const before = [...reached].filter((s) => s !== id);
        const avg =
          before.reduce((sum, s) => sum + (totalMs.get(s) ?? 0), 0) /
          Math.max(before.length, 1);
        track(
          "home_reached_end",
          { elapsed, skimmed: avg < SKIM_AVG_MS },
          page,
        );
      }
    };

    const check = () => {
      const vh = window.innerHeight;
      const centerY = vh / 2;
      const atBottom =
        window.scrollY + vh >= document.documentElement.scrollHeight - 4;
      let center: HomeSection | null = null;
      let lastVisible: HomeSection | null = null;

      for (const { id, el } of sections) {
        const r = el.getBoundingClientRect();
        const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
        if (visible <= 0) continue;
        lastVisible = id;
        // 도달: 섹션의 30% 또는 화면의 50% 중 작은 쪽 이상 보이면 (긴 섹션 대응)
        if (!reached.has(id) && visible >= Math.min(r.height * 0.3, vh * 0.5)) {
          reach(id);
        }
        if (r.top <= centerY && r.bottom > centerY) center = id;
      }

      // 맨 아래까지 스크롤했으면 마지막으로 보이는 섹션을 보고 있는 것으로 본다
      if (atBottom && lastVisible) center = lastVisible;
      // 섹션 사이 여백에 중앙선이 있으면 직전 섹션을 유지
      if (center) setActive(center);
    };

    const onScroll = () => {
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
        check();
      }, CHECK_INTERVAL);
    };

    const exit = (type: "navigate" | "leave") => {
      if (exited) return;
      exited = true;
      flushDwell();
      track(
        "home_exit",
        {
          lastSection: active ?? sections[0].id,
          type,
          elapsed: toSec(clock.ms()),
        },
        page,
      );
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        // 탭 전환·닫기 모두 여기를 먼저 지난다. 모바일은 pagehide가 안 올 수 있어 체류는 여기서 보낸다
        flushDwell();
        clock.pause();
      } else {
        clock.resume();
      }
    };
    const onPageHide = () => exit("leave");
    // 뒤로 가기 캐시(bfcache)로 되돌아오면 다시 측정
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) exited = false;
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("pageshow", onPageShow);

    return () => {
      // 사이트 안에서 다른 페이지로 이동(언마운트)
      exit("navigate");
      if (timer) clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return null;
}
