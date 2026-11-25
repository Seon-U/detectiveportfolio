"use client";

import { useEffect, useRef } from "react";
import { createVisibleClock, toDwellBucket } from "@/lib/analytics/dwell";
import { type TrackContext, track } from "@/lib/analytics/track";

/** 스크롤 판정 간격(ms) */
const CHECK_INTERVAL = 150;
/** 이보다 짧은 체류는 보내지 않음(스크롤하며 지나간 것) */
const MIN_DWELL_MS = 1000;

const toSec = (ms: number) => Math.round(ms / 1000);

type Props = {
  projectId: string;
  /** ProjectDetail의 IntersectionObserver가 정한 현재 섹션 */
  activeSectionId: string;
  /** 역할 필터가 적용된 섹션 중 마지막 섹션 id */
  lastSectionId: string;
};

/**
 * 프로젝트 상세의 진입·섹션 체류·끝 도달 측정. 화면에는 아무것도 그리지 않는다.
 * 페이지 전체 체류·스크롤·빠른 이탈은 PageEngagementTracker가 모든 페이지 공통으로 보낸다.
 *
 * 현재 섹션 판정은 ProjectDetail이 이미 하고 있으므로(섹션 탭 표시용) 그 값을 받아 쓴다.
 * 측정 상태는 effect 안에 두고, props 변화는 ref로 전달한다(값이 바뀔 때마다 측정을 다시 시작하지 않기 위함).
 */
export default function ProjectDetailTracker({
  projectId,
  activeSectionId,
  lastSectionId,
}: Props) {
  const api = useRef<{
    setActive: (id: string) => void;
    setLast: (id: string) => void;
  } | null>(null);
  // 측정 effect가 다시 시작될 때(같은 컴포넌트로 다른 프로젝트 이동) 현재 값을 바로 쓰기 위함
  const latest = useRef({ activeSectionId, lastSectionId });
  latest.current = { activeSectionId, lastSectionId };

  useEffect(() => {
    // 언마운트 시점에는 주소가 다음 페이지로 바뀌어 있으므로 상세의 주소·제목을 고정한다 (트러블슈팅 §3-8)
    const page: TrackContext = { url: location.href, title: document.title };
    const clock = createVisibleClock();
    const pendingMs = new Map<string, number>();
    let active: string | null = latest.current.activeSectionId || null;
    let segStart = 0;
    let lastId = latest.current.lastSectionId;
    let completed = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const entryRole = new URLSearchParams(location.search).get("role");
    track("project_view", { projectId, entryRole: entryRole || "none" }, page);

    const commit = () => {
      const now = clock.ms();
      if (active) {
        pendingMs.set(active, (pendingMs.get(active) ?? 0) + now - segStart);
      }
      segStart = now;
    };

    const flushDwell = () => {
      commit();
      for (const [sectionId, ms] of pendingMs) {
        if (ms < MIN_DWELL_MS) continue;
        const seconds = toSec(ms);
        track(
          "detail_section_dwell",
          { projectId, sectionId, seconds, bucket: toDwellBucket(seconds) },
          page,
        );
      }
      pendingMs.clear();
    };

    /** 마지막 섹션의 아래 끝이 화면 안으로 들어오면 끝까지 본 것으로 친다 */
    const checkComplete = () => {
      if (completed || !lastId) return;
      const el = document.getElementById(lastId);
      if (!el || el.getBoundingClientRect().bottom > window.innerHeight) return;
      completed = true;
      track("detail_complete", { projectId, elapsed: toSec(clock.ms()) }, page);
    };

    const onScroll = () => {
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
        checkComplete();
      }, CHECK_INTERVAL);
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        // 모바일은 pagehide가 안 올 수 있어 체류는 숨겨질 때 보낸다 (홈과 같은 방식)
        flushDwell();
        clock.pause();
      } else {
        clock.resume();
      }
    };

    api.current = {
      setActive: (id) => {
        if (id === active) return;
        commit();
        active = id;
      },
      setLast: (id) => {
        lastId = id;
        checkComplete();
      },
    };

    checkComplete();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flushDwell);

    return () => {
      flushDwell();
      api.current = null;
      if (timer) clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flushDwell);
    };
  }, [projectId]);

  // 위 effect가 먼저 실행되어 api를 채운 뒤 아래 effect들이 값을 전달한다 (같은 컴포넌트의 effect는 선언 순서대로 실행)
  useEffect(() => {
    if (activeSectionId) api.current?.setActive(activeSectionId);
  }, [activeSectionId]);

  useEffect(() => {
    api.current?.setLast(lastSectionId);
  }, [lastSectionId]);

  return null;
}
