import { type MotionValue, motion, useTransform } from "framer-motion";
import type { CardData } from "@/lib/introduction/cardData";
import RotatableCard from "./RotatableCard";

const APPEAR_DUR = 0.025;
const FLIP_DUR = 0.04;
/** 모바일은 카드 1장씩 보이므로 빠르게 플립 */
const MOBILE_FLIP_DUR = 0.02;

/**
 * Z축 틸트: 핀보드 느낌 (모바일: 0°)
 */
const DESKTOP_ROTATE_Z = [-3, 0, +3];

export default function FlipCard({
  card,
  progress,
  appearAt,
  flipAt,
  hideAt,
  xOffset,
  idx,
  isDark,
  isMobile,
}: {
  card: CardData;
  progress: MotionValue<number>;
  appearAt: number;
  flipAt: number;
  hideAt?: number;
  xOffset: number;
  idx: number;
  isDark: boolean;
  isMobile: boolean;
}) {
  /* 등장: 페이드 인 (+ 모바일 순차 릴레이: 페이드 아웃)
   * 콜백 방식 — 배열 길이 변동 없이 isMobile 전환에 안전 */
  const opacity = useTransform(progress, (p) => {
    if (p < appearAt) return 0;
    if (p < appearAt + APPEAR_DUR) return (p - appearAt) / APPEAR_DUR;
    if (hideAt == null) return 1;
    if (p < hideAt) return 1;
    if (p < hideAt + APPEAR_DUR) return 1 - (p - hideAt) / APPEAR_DUR;
    return 0;
  });

  /* 수직: 데스크톱은 위에서 떨어짐, 모바일은 아래에서 올라옴
   * 콜백 방식 — 배열 기반이 SSR→클라이언트 전환에서 갱신 안 되는 문제 우회 */
  const y = useTransform(progress, (p) => {
    const startY = isMobile ? 60 : -60;
    if (p < appearAt) return startY;
    if (p > appearAt + 0.02) return 0;
    return startY * (1 - (p - appearAt) / 0.02);
  });

  /* Z축 틸트: 등장하면서 목표 각도로 회전 (모바일: 0°) */
  const rotateZ = useTransform(progress, (p) => {
    const targetZ = isMobile ? 0 : DESKTOP_ROTATE_Z[idx];
    if (p < appearAt) return 0;
    if (p > appearAt + 0.02) return targetZ;
    return targetZ * ((p - appearAt) / 0.02);
  });

  /* Y축 3D 플립 — 콜백 방식으로 SSR/hydration 안전
   * 데스크톱: 3장 동시에 플립 (공간 분리)
   * 모바일:  1장씩 순차 플립 (릴레이) */
  const flipDur = isMobile ? MOBILE_FLIP_DUR : FLIP_DUR;
  const rotateY = useTransform(progress, (p) => {
    if (p < flipAt) return 0;
    if (p > flipAt + flipDur) return 180;
    return ((p - flipAt) / flipDur) * 180;
  });

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full"
      style={{
        opacity,
        x: xOffset,
        y,
        rotate: rotateZ,
        zIndex: isMobile ? (idx + 1) * 10 : idx + 1,
      }}
    >
      <RotatableCard
        backLabel={card.backLabel}
        frontImage={card.frontImage}
        frontTitle={card.frontTitle}
        frontDesc={card.frontDesc}
        rotateY={rotateY}
        isDark={isDark}
      />
    </motion.div>
  );
}
