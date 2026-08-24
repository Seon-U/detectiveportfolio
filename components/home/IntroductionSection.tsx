"use client";

import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { useMountedTheme } from "@/lib/hooks/useMountedTheme";
import { DESIGN_CARDS, DEV_CARDS } from "@/lib/introduction/cardData";
import { CARD_GAP } from "@/lib/introduction/constants";
import FlipCardSection from "../ui/FlipCardSection";
import ScrollHighlightText from "../ui/ScrollHighlightText";

/**
 * 타임라인 — 데스크톱 vs 모바일
 *
 * useScroll offset ["start start","end end"] 기준:
 *   scrollRange = 700vh − 100vh = 600vh
 *   markerTop% = progress × 85.7
 *
 * 빈 구간을 압축하여 콘텐츠 밀도를 높임.
 * 모바일은 순차 릴레이(hideAt) + 개별 플립 방식으로 카드를 한 장씩 표시.
 */
const DESKTOP_TIMELINE = {
  a: {
    fadeIn: [0.18, 0.22] as [number, number],
    fadeOut: [0.46, 0.5] as [number, number],
    cardsAt: 0.23,
    flipAt: 0.34,
  },
  b: {
    fadeIn: [0.49, 0.53] as [number, number],
    fadeOut: [0.82, 0.9] as [number, number],
    cardsAt: 0.54,
    flipAt: 0.64,
  },
  snapPoints: [0.04, 0.16, 0.3, 0.38, 0.44, 0.48, 0.6, 0.68, 0.74, 0.8],
};

/**
 * 모바일 타임라인 — MOBILE_CARD_GAP=0.11 기준
 *
 * A: 카드 0.23/0.34/0.45, 각각 등장 후 0.03에 개별 플립
 * B: 카드 0.63/0.74/0.85, 동일 패턴
 * flipAt은 미사용 — CardSection에서 per-card로 계산
 */
const MOBILE_TIMELINE = {
  a: {
    fadeIn: [0.18, 0.22] as [number, number],
    fadeOut: [0.55, 0.58] as [number, number],
    cardsAt: 0.23,
    flipAt: 0.26,
  },
  b: {
    fadeIn: [0.59, 0.62] as [number, number],
    fadeOut: [0.95, 0.98] as [number, number],
    cardsAt: 0.63,
    flipAt: 0.66,
  },
  snapPoints: [0.04, 0.16, 0.3, 0.41, 0.52, 0.58, 0.71, 0.82, 0.93],
};
export default function IntroductionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { isDark } = useMountedTheme();
  const isMobile = useIsMobile();

  /**
   * proximity scroll snap — 섹션이 뷰포트에 있을 때만 활성화
   * IntersectionObserver로 범위를 제한해 다른 섹션 스크롤에 영향 없음
   */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const html = document.documentElement;
    const observer = new IntersectionObserver(
      ([entry]) => {
        html.style.scrollSnapType = entry.isIntersecting ? "y proximity" : "";
      },
      { threshold: 0 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      html.style.scrollSnapType = "";
    };
  }, []);

  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* 모바일/데스크톱 타임라인 선택 */
  const tl = isMobile ? MOBILE_TIMELINE : DESKTOP_TIMELINE;
  /* 모바일 flipGap은 미사용 — CardSection에서 per-card 계산 */
  const flipGap = CARD_GAP;

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: "700vh" }}
      aria-label="자기소개 — 사용자를 고려한 설계와 현장 제약을 고려한 개발"
    >
      {/* 스냅 마커 — 보이지 않는 앵커, 각 카드 상태 완료 지점 */}
      {tl.snapPoints.map((sp) => (
        <div
          key={sp}
          aria-hidden
          className="absolute left-0 w-full pointer-events-none"
          style={{
            top: `${sp * 85.7}%`,
            height: 1,
            scrollSnapAlign: "start",
          }}
        />
      ))}

      {/* ── 시각적 콘텐츠 (스크롤 애니메이션) — 스크린 리더 건너뜀 ── */}
      <div className="sticky top-0 h-screen" aria-hidden="true">
        <ScrollHighlightText
          progress={p}
          fadeIn={[0, 0.03]}
          fadeOut={[0.16, 0.2]}
          isDark={isDark}
          segments={[
            "항상 사람을 위한 기술을 위해",
            "\n",
            { text: "사용자를 고려한 설계", range: [0.04, 0.09] },
            "와 ",
            "\n",
            { text: "현장 제약을 고려한 개발", range: [0.1, 0.15] },
            "을 하고 있습니다",
          ]}
        />

        <FlipCardSection
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

        <FlipCardSection
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

      {/* ── 스크린 리더 전용 콘텐츠 ── */}
      <div className="sr-only">
        <h2>
          항상 사람을 위한 기술을 위해 사용자를 고려한 설계와 현장 제약을 고려한
          개발을 하고 있습니다
        </h2>

        <h3>사용자를 고려한 설계</h3>
        <ul>
          {DESIGN_CARDS.map((card) => (
            <li key={card.backLabel}>
              <strong>{card.frontTitle}</strong>: {card.frontDesc}
            </li>
          ))}
        </ul>

        <h3>현장 제약을 고려한 개발</h3>
        <ul>
          {DEV_CARDS.map((card) => (
            <li key={card.backLabel}>
              <strong>{card.frontTitle}</strong>: {card.frontDesc}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
