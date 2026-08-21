"use client";

import {
  type MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMountedTheme } from "@/lib/hooks/useMountedTheme";
import { cn } from "@/lib/utils";
import styles from "./scroll-highlight.module.css";

/* ── Data ─────────────────────────────────────────────────────── */

type CardData = {
  backLabel: string;
  frontTitle: string;
  frontDesc: string;
};

const DESIGN_CARDS: CardData[] = [
  {
    backLabel: "Trace",
    frontTitle: "Trace",
    frontDesc: "사용자의 행동 흐름을 추적하고 맥락을 파악합니다",
  },
  {
    backLabel: "Solve",
    frontTitle: "Solve",
    frontDesc: "관찰한 패턴에서 최적의 UX 해결책을 도출합니다",
  },
  {
    backLabel: "Refine",
    frontTitle: "Refine",
    frontDesc: "반복 검증으로 인터페이스를 다듬어 완성합니다",
  },
];

const DEV_CARDS: CardData[] = [
  {
    backLabel: "Trace",
    frontTitle: "Trace",
    frontDesc: "현장의 기술 환경과 제약 조건을 파악합니다",
  },
  {
    backLabel: "Solve",
    frontTitle: "Solve",
    frontDesc: "제약 안에서 실현 가능한 구현을 설계합니다",
  },
  {
    backLabel: "Refine",
    frontTitle: "Refine",
    frontDesc: "배포 환경에서 동작을 검증하고 개선합니다",
  },
];

/* ── Constants ────────────────────────────────────────────────── */

const CARD_W = 200;
const CARD_H = 280;
const CARD_GAP = 0.03;
const FLIP_DUR = 0.04;
const APPEAR_DUR = 0.025;

/**
 * 모바일 플립 간격 — 카드 플립 완료(FLIP_DUR) 후 내용을 볼 시간 확보
 * 데스크톱은 카드가 공간적으로 분리되어 CARD_GAP으로 충분하지만
 * 모바일은 카드가 겹쳐 쌓이므로 더 긴 간격 필요
 */
const MOBILE_FLIP_GAP = 0.05;

/**
 * 데스크톱(md+): 넓게 펼쳐진 배치
 * 간격 260px — 카드 사이 충분한 여백 확보
 * 회전: -45° / +45° / -45° 로 핀보드 느낌
 */
const DESKTOP_X = [-260, 0, 260];
const DESKTOP_ROTATE_Z = [-45, 45, -45];

/**
 * 타임라인 — 데스크톱 vs 모바일
 *
 * useScroll offset ["start start","end end"] 기준:
 *   scrollRange = 800vh − 100vh = 700vh
 *   markerTop% = progress × 87.5
 *
 * 모바일은 카드가 중앙에 겹쳐 쌓이므로 플립 간격(flipGap)을
 * FLIP_DUR보다 넓게 잡아 앞면 내용을 읽을 시간을 확보합니다.
 */
const DESKTOP_TIMELINE = {
  a: {
    fadeIn: [0.24, 0.28] as [number, number],
    fadeOut: [0.50, 0.54] as [number, number],
    cardsAt: 0.29,
    flipAt: 0.40,
  },
  b: {
    fadeIn: [0.53, 0.57] as [number, number],
    fadeOut: [0.92, 1.0] as [number, number],
    cardsAt: 0.58,
    flipAt: 0.72,
  },
  snapPoints: [
    0.06, 0.22, 0.375,
    0.44, 0.47, 0.50,
    0.665,
    0.76, 0.79, 0.82,
  ],
};

const MOBILE_TIMELINE = {
  a: {
    fadeIn: [0.24, 0.28] as [number, number],
    fadeOut: [0.60, 0.63] as [number, number], // 마지막 플립 임계(0.50) 후 0.10 버퍼
    cardsAt: 0.29,
    flipAt: 0.40,
  },
  b: {
    fadeIn: [0.62, 0.65] as [number, number], // A와 크로스페이드
    fadeOut: [0.93, 1.0] as [number, number],
    cardsAt: 0.66,
    flipAt: 0.75,
  },
  // 모바일 스냅은 플립 "트리거" 시점 — 스프링이 나머지를 처리
  snapPoints: [
    0.06, 0.22, 0.375,
    0.40, 0.45, 0.50,
    0.75, 0.80, 0.85,
  ],
};

/* ── Hooks ────────────────────────────────────────────────────── */

function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return mobile;
}

/* ── FlipCard ─────────────────────────────────────────────────── */

function FlipCard({
  card,
  progress,
  appearAt,
  flipAt,
  idx,
  isDark,
  isMobile,
}: {
  card: CardData;
  progress: MotionValue<number>;
  appearAt: number;
  flipAt: number;
  idx: number;
  isDark: boolean;
  isMobile: boolean;
}) {
  /* 등장: 페이드 인 */
  const opacity = useTransform(
    progress,
    [appearAt, appearAt + APPEAR_DUR],
    [0, 1],
  );

  /* 수직: 위에서 떨어짐 */
  const y = useTransform(
    progress,
    [appearAt, appearAt + 0.02],
    [-60, 0],
  );

  /* Z축 틸트: 등장하면서 목표 각도로 회전 (모바일: 0°) */
  const rotateZ = useTransform(
    progress,
    [appearAt, appearAt + 0.02],
    [0, isMobile ? 0 : DESKTOP_ROTATE_Z[idx]],
  );

  /* Y축 3D 플립
   * 데스크톱: 스크롤 진행도에 직접 연동 (카드가 공간 분리되어 동시 관찰 가능)
   * 모바일:  임계값(flipAt)을 넘으면 스프링 애니메이션 발동
   *          → 스크롤 속도와 무관하게 카드가 항상 완전히 뒤집힘
   */
  const scrollRotateY = useTransform(
    progress,
    [flipAt, flipAt + FLIP_DUR],
    [0, 180],
  );
  const flipTarget = useTransform(progress, (v): number => (v >= flipAt ? 180 : 0));
  const springRotateY = useSpring(flipTarget, { duration: 0.4, bounce: 0 });
  const rotateY = isMobile ? springRotateY : scrollRotateY;

  /**
   * 모바일 z-index: 플립 시작과 동시에 맨 위로 점프.
   * 역스크롤 시 z-index가 원래대로 돌아가면서 이전 카드가 보임.
   */
  const mobileZ = useTransform(progress, (v) =>
    v >= flipAt ? (idx + 1) * 10 : idx + 1,
  );

  return (
    <motion.div
      className={styles.cardPosition}
      style={{
        width: CARD_W,
        height: CARD_H,
        opacity,
        x: isMobile ? 0 : DESKTOP_X[idx],
        y,
        rotate: rotateZ,
        zIndex: isMobile ? mobileZ : idx + 1,
      }}
    >
      <div className={styles.cardPerspective}>
        <motion.div className={styles.cardInner} style={{ rotateY }}>
          {/* ── 뒷면 ── */}
          <div className={styles.cardFace}>
            <div
              className={cn(
                "w-full h-full flex items-center justify-center rounded-xl border-2",
                isDark
                  ? "bg-primary border-[var(--mint-700)]"
                  : "bg-accent border-[var(--orange-500)]",
              )}
            >
              <span
                className={cn(
                  "text-3xl font-serif font-black tracking-wider select-none",
                  isDark
                    ? "text-primary-foreground"
                    : "text-accent-foreground",
                )}
              >
                {card.backLabel}
              </span>
            </div>
          </div>

          {/* ── 앞면 ── */}
          <div className={cn(styles.cardFace, styles.cardFront)}>
            <div className="w-full h-full flex flex-col rounded-xl overflow-hidden border border-border bg-card shadow-card">
              {/* 이미지 영역 (추후 교체) */}
              <div
                className={cn(
                  "flex-1 flex items-center justify-center",
                  isDark
                    ? "bg-[var(--gray-300)]"
                    : "bg-[var(--gray-200)]",
                )}
              >
                <span className="text-xs text-muted-foreground italic select-none">
                  Image
                </span>
              </div>
              {/* 하단 텍스트 */}
              <div className="p-3 bg-card">
                <h4 className="text-base font-serif font-bold text-card-foreground">
                  {card.frontTitle}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">
                  {card.frontDesc}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── CardSection ──────────────────────────────────────────────── */

function CardSection({
  progress,
  cards,
  heading,
  fadeIn,
  fadeOut,
  cardsAt,
  flipAt,
  flipGap,
  isDark,
  isMobile,
}: {
  progress: MotionValue<number>;
  cards: CardData[];
  heading: string;
  fadeIn: [number, number];
  fadeOut: [number, number];
  cardsAt: number;
  flipAt: number;
  flipGap: number;
  isDark: boolean;
  isMobile: boolean;
}) {
  const sectionOpacity = useTransform(
    progress,
    [fadeIn[0], fadeIn[1], fadeOut[0], fadeOut[1]],
    [0, 1, 1, 0],
  );

  const headingY = useTransform(progress, fadeIn, [24, 0]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ opacity: sectionOpacity }}
    >
      {/* 헤딩 — 형광펜 강조 상태 */}
      <motion.h2
        className={cn(
          "text-2xl md:text-3xl lg:text-4xl font-bold mb-12",
          styles.headingHL,
          isDark ? styles.hlDark : styles.hlLight,
        )}
        style={{ y: headingY }}
      >
        {heading}
      </motion.h2>

      {/* 카드 컨테이너 — 기준점(anchor), 카드는 overflow 가능 */}
      <div className="relative" style={{ width: CARD_W, height: CARD_H }}>
        {cards.map((card, i) => (
          <FlipCard
            key={`${heading}-${card.backLabel}`}
            card={card}
            progress={progress}
            appearAt={cardsAt + i * CARD_GAP}
            flipAt={flipAt + i * flipGap}
            idx={i}
            isDark={isDark}
            isMobile={isMobile}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── ScrollHighlightSection ───────────────────────────────────── */

/**
 * 스크롤 진행도 타임라인 (800vh)
 *
 * 데스크톱/모바일 타임라인은 DESKTOP_TIMELINE / MOBILE_TIMELINE 상수 참조.
 * 모바일은 카드 플립 간격이 넓어 앞면을 읽을 시간을 확보합니다.
 *
 * 데스크톱: 카드 -45°/+45°/-45° 틸트, 260px 간격 펼침, 플립 간격 CARD_GAP
 * 모바일: 카드 중앙 쌓임, 플립 시 1장씩 맨 위, 플립 간격 MOBILE_FLIP_GAP
 */
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

  /* ── 텍스트 단계 ── */
  const textOpacity = useTransform(
    p,
    [0, 0.06, 0.22, 0.28],
    [0, 1, 1, 0],
  );

  const hl1Progress = useTransform(p, [0.07, 0.14], [0, 100]);
  const hl1Bg = useTransform(hl1Progress, (v) => `${v}% 60%`);

  const hl2Progress = useTransform(p, [0.15, 0.22], [0, 100]);
  const hl2Bg = useTransform(hl2Progress, (v) => `${v}% 60%`);

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
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-8"
          style={{ opacity: textOpacity }}
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed text-center max-w-3xl text-foreground">
            실제 활용가능한 기술 설계를 중요시하여 항상{" "}
            <motion.span
              className={cn(
                styles.hl,
                isDark ? styles.hlDark : styles.hlLight,
              )}
              style={{ backgroundSize: hl1Bg }}
            >
              사용자를 고려한 설계
            </motion.span>
            와{" "}
            <motion.span
              className={cn(
                styles.hl,
                isDark ? styles.hlDark : styles.hlLight,
              )}
              style={{ backgroundSize: hl2Bg }}
            >
              현장 제약을 고려한 개발
            </motion.span>
            을 하고 있습니다
          </p>
        </motion.div>

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
