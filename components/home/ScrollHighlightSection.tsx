"use client";

import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { useMountedTheme } from "@/lib/hooks/useMountedTheme";
import { DESIGN_CARDS, DEV_CARDS } from "@/lib/introduction/cardData";
import { CARD_GAP } from "@/lib/introduction/constants";
import ScrollHighlightText from "../ui/ScrollHighlightText";
import CardSection from "./CardSection";

/**
 * 모바일 플립 간격 — 카드 플립 완료 후 내용을 볼 시간 확보
 * 데스크톱은 카드가 공간적으로 분리되어 CARD_GAP으로 충분하지만
 * 모바일은 카드가 겹쳐 쌓이므로 더 긴 간격 필요
 */
const MOBILE_FLIP_GAP = 0.05;

/**
 * 타임라인 — 데스크톱 vs 모바일
 *
 * useScroll offset ["start start","end end"] 기준:
 *   scrollRange = 800vh − 100vh = 700vh
 *   markerTop% = progress × 87.5
 *
 * 모바일은 카드가 중앙에 겹쳐 쌓이므로 플립 간격(flipGap)을 넓게 잡아
 * 앞면 내용을 읽을 시간을 확보합니다.
 */
const DESKTOP_TIMELINE = {
  a: {
    fadeIn: [0.24, 0.28] as [number, number],
    fadeOut: [0.5, 0.54] as [number, number],
    cardsAt: 0.29,
    flipAt: 0.4,
  },
  b: {
    fadeIn: [0.53, 0.57] as [number, number],
    fadeOut: [0.92, 1.0] as [number, number],
    cardsAt: 0.58,
    flipAt: 0.72,
  },
  snapPoints: [0.06, 0.22, 0.375, 0.44, 0.47, 0.5, 0.665, 0.76, 0.79, 0.82],
};

const MOBILE_TIMELINE = {
  a: {
    fadeIn: [0.24, 0.28] as [number, number],
    fadeOut: [0.6, 0.63] as [number, number],
    cardsAt: 0.29,
    flipAt: 0.4,
  },
  b: {
    fadeIn: [0.62, 0.65] as [number, number],
    fadeOut: [0.93, 1.0] as [number, number],
    cardsAt: 0.66,
    flipAt: 0.75,
  },
  snapPoints: [0.06, 0.22, 0.375, 0.4, 0.45, 0.5, 0.75, 0.8, 0.85],
};
export default function ScrollHighlightSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { isDark } = useMountedTheme();
  const isMobile = useIsMobile();

  /**
   * proximity scroll snap 활성화
   * — 스크롤이 스냅 포인트 근처에서 멈추면 자연스럽게 끌려감
   * — 빠르게 넘기면 그대로 통과 (mandatory와 달리 안 걸림)
   * — 이 컴포넌트가 언마운트되면 해제
   */
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollSnapType = "y proximity";
    return () => {
      html.style.scrollSnapType = "";
    };
  }, []);

  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* 모바일/데스크톱 타임라인 선택 */
  const tl = isMobile ? MOBILE_TIMELINE : DESKTOP_TIMELINE;
  const flipGap = isMobile ? MOBILE_FLIP_GAP : CARD_GAP;

  return (
    <section ref={ref} className="relative" style={{ height: "800vh" }}>
      {/* 스냅 마커 — 보이지 않는 앵커, 각 카드 상태 완료 지점 */}
      {tl.snapPoints.map((sp) => (
        <div
          key={sp}
          aria-hidden
          className="absolute left-0 w-full pointer-events-none"
          style={{
            top: `${sp * 87.5}%`,
            height: 1,
            scrollSnapAlign: "start",
          }}
        />
      ))}

      <div className="sticky top-0 h-screen">
        {/* ── 전체 문장 + 형광펜 ── */}
        <ScrollHighlightText
          progress={p}
          fadeIn={[0, 0.06]}
          fadeOut={[0.22, 0.28]}
          isDark={isDark}
          segments={[
            "실제 활용가능한 기술 설계를 중요시하여 항상 ",
            "\n",
            { text: "사용자를 고려한 설계", range: [0.07, 0.14] },
            "와 ",
            "\n",
            { text: "현장 제약을 고려한 개발", range: [0.15, 0.22] },
            "을 하고 있습니다",
          ]}
        />

        {/* ── 섹션 A: 사용자를 고려한 설계 + 카드 3장 ── */}
        <CardSection
          progress={p}
          cards={DESIGN_CARDS}
          heading="사용자를 고려한 설계"
          fadeIn={tl.a.fadeIn}
          fadeOut={tl.a.fadeOut}
          cardsAt={tl.a.cardsAt}
          flipAt={tl.a.flipAt}
          flipGap={flipGap}
          isDark={isDark}
          isMobile={isMobile}
        />

        {/* ── 섹션 B: 현장 제약을 고려한 개발 + 카드 3장 ── */}
        <CardSection
          progress={p}
          cards={DEV_CARDS}
          heading="현장 제약을 고려한 개발"
          fadeIn={tl.b.fadeIn}
          fadeOut={tl.b.fadeOut}
          cardsAt={tl.b.cardsAt}
          flipAt={tl.b.flipAt}
          flipGap={flipGap}
          isDark={isDark}
          isMobile={isMobile}
        />
      </div>
    </section>
  );
}
