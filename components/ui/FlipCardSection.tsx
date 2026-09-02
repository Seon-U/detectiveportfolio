import { type MotionValue, motion, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import type { CardData } from "@/lib/introduction/cardData";
import { CARD_GAP, MOBILE_CARD_GAP } from "@/lib/introduction/constants";
import { cn } from "@/lib/utils";
import FlipCard from "./FlipCard";

/** 모바일: 카드 등장 후 0.03 진행도 뒤에 플립 시작 */
const MOBILE_FLIP_DELAY = 0.03;

export default function FlipCardSection({
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
  fadeOut?: [number, number];
  cardsAt: number;
  flipAt: number;
  flipGap: number;
  isDark: boolean;
  isMobile: boolean;
}) {
  /* 콜백 방식 — SSR(isMobile=false) → 클라이언트(isMobile=true) 전환 시
   * 배열 기반 useTransform이 업데이트되지 않는 framer-motion 버그 우회 */
  const sectionOpacity = useTransform(progress, (p) => {
    if (p < fadeIn[0]) return 0;
    if (p < fadeIn[1]) return (p - fadeIn[0]) / (fadeIn[1] - fadeIn[0]);
    /* fadeOut 미지정 → 마지막 섹션: sticky 해제 시 자연스럽게 스크롤 아웃 */
    if (!fadeOut) return 1;
    if (p < fadeOut[0]) return 1;
    if (p < fadeOut[1]) return 1 - (p - fadeOut[0]) / (fadeOut[1] - fadeOut[0]);
    return 0;
  });

  const headingY = useTransform(progress, (p) => {
    if (p < fadeIn[0]) return 24;
    if (p > fadeIn[1]) return 0;
    return 24 * (1 - (p - fadeIn[0]) / (fadeIn[1] - fadeIn[0]));
  });

  const effectiveGap = isMobile ? MOBILE_CARD_GAP : CARD_GAP;

  /* ── 데스크톱 반응형 x 오프셋 ── */
  const [desktopGapX, setDesktopGapX] = useState(260);

  useEffect(() => {
    if (isMobile) return;
    const compute = () => {
      /* clamp(200, 18vw, 300) 과 동일한 계산 */
      const cardW = Math.min(300, Math.max(200, window.innerWidth * 0.18));
      setDesktopGapX(Math.round(cardW * 1.3));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [isMobile]);

  const DESKTOP_X_OFFSETS = [-desktopGapX, 0, desktopGapX];

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ opacity: sectionOpacity }}
    >
      {/* 헤딩 — 형광펜 강조 상태 */}
      <motion.h2
        className={cn(
          "text-2xl md:text-3xl lg:text-4xl font-bold mb-12",
          "inline-block bg-no-repeat bg-bottom-left bg-size-[100%_60%] px-2 py-0.5",
          isDark
            ? "bg-[linear-gradient(transparent_40%,rgba(10,255,145,0.3)_40%)]"
            : "bg-[linear-gradient(transparent_40%,rgba(250,219,96,0.5)_40%)]",
        )}
        style={{ y: headingY }}
      >
        {heading}
      </motion.h2>

      {/* 카드 컨테이너 — 기준점(anchor), 카드는 overflow 가능
       * 모바일: 80vw × 112vw, 데스크톱: clamp(200–300px) 반응형 */}
      <div
        className="relative"
        style={
          isMobile
            ? { width: "min(80vw, 320px)", height: "min(112vw, 450px)" }
            : {
                width: "clamp(200px, 18vw, 300px)",
                height: "clamp(280px, 25.2vw, 420px)",
              }
        }
      >
        {cards.map((card, i) => {
          const cardAppearAt = cardsAt + i * effectiveGap;
          const hideAt =
            isMobile && i < cards.length - 1
              ? cardsAt + (i + 1) * effectiveGap
              : undefined;

          /* 모바일: 등장 후 개별 플립 / 데스크톱: 타임라인 기반 일괄 플립 */
          const cardFlipAt = isMobile
            ? cardAppearAt + MOBILE_FLIP_DELAY
            : flipAt + i * flipGap;

          const xOffset = isMobile ? 0 : DESKTOP_X_OFFSETS[i];

          return (
            <FlipCard
              key={`${heading}-${card.backLabel}`}
              card={card}
              progress={progress}
              appearAt={cardAppearAt}
              flipAt={cardFlipAt}
              hideAt={hideAt}
              xOffset={xOffset}
              idx={i}
              isDark={isDark}
              isMobile={isMobile}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
