import { type MotionValue, motion, useTransform } from "framer-motion";
import type { CardData } from "@/lib/introduction/cardData";
import {
  CARD_GAP,
  CARD_H,
  CARD_W,
  MOBILE_CARD_GAP,
} from "@/lib/introduction/constants";
import { cn } from "@/lib/utils";
import FlipCard from "../ui/FlipCard";

export default function CardSection({
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

  const effectiveGap = isMobile ? MOBILE_CARD_GAP : CARD_GAP;

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

      {/* 카드 컨테이너 — 기준점(anchor), 카드는 overflow 가능 */}
      <div className="relative" style={{ width: CARD_W, height: CARD_H }}>
        {cards.map((card, i) => {
          const cardAppearAt = cardsAt + i * effectiveGap;
          const hideAt =
            isMobile && i < cards.length - 1
              ? cardsAt + (i + 1) * effectiveGap
              : undefined;

          return (
            <FlipCard
              key={`${heading}-${card.backLabel}`}
              card={card}
              progress={progress}
              appearAt={cardAppearAt}
              flipAt={flipAt + i * flipGap}
              hideAt={hideAt}
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
