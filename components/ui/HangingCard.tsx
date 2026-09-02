"use client";

import {
  animate,
  motion,
  type PanInfo,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

const CARD_SRC = "/idCard.webp";
const CARD_WIDTH = 300;
const CARD_HEIGHT = 472;

const STRAP_WIDTH = 14;
const BASE_STRAP_HEIGHT = 130;
const CLIP_WIDTH = 26;
const CLIP_HEIGHT = 16;

const MAX_PULL_X = 140;
const MAX_PULL_Y = 150;
const SAG_FACTOR = 0.18;
const SWING_START_X = 200; // 진입 스윙 시작 오프셋(px)

interface HangingCardProps {
  onDragStateChange?: (isDragging: boolean) => void;
}

/**
 * HangingCard
 * - 끈을 이미지가 아니라 SVG path로 실시간 계산해서 그림
 *   -> pivot(고정축)과 카드의 "현재" 부착점을 매 프레임 직접 연결하므로
 *      좌우/대각선 어떤 방향으로 당겨도 구조적으로 어긋날 수 없음
 * - 카드만 drag 대상. 카드의 x, y 값을 그대로 path 계산에 사용.
 */
export default function HangingCard({ onDragStateChange }: HangingCardProps) {
  // 초기값을 오른쪽 오프셋으로 설정 → 첫 프레임부터 끈·카드가 오른쪽에 위치
  const x = useMotionValue(SWING_START_X);
  const y = useMotionValue(0);

  const rotate = useTransform(x, [-MAX_PULL_X, MAX_PULL_X], [-10, 10]);

  // 마운트 시 spring으로 x → 0 스윙 (끈·기울기가 x에서 파생되므로 전부 연동)
  useEffect(() => {
    animate(x, 0, {
      type: "spring",
      stiffness: 50,
      damping: 6,
      mass: 1,
      delay: 0.3,
    });
  }, [x]);

  const pathD = useTransform([x, y], ([dx, dy]: number[]) => {
    const endX = STRAP_WIDTH / 2 + dx;
    const endY = BASE_STRAP_HEIGHT + dy + 10;
    const midX = STRAP_WIDTH / 2 + dx * 0.5;
    const midY = endY * 0.5 + Math.min(Math.abs(dx) * SAG_FACTOR, 24);
    return `M ${STRAP_WIDTH / 2} 0 Q ${midX} ${midY} ${endX} ${endY}`;
  });

  function handleDragEnd(_e: PointerEvent, info: PanInfo) {
    const xAnim = animate(x, 0, {
      type: "spring",
      stiffness: 170,
      damping: 9,
      mass: 0.9,
      velocity: info.velocity.x,
    });
    const yAnim = animate(y, 0, {
      type: "spring",
      stiffness: 140,
      damping: 12,
      mass: 1,
      velocity: info.velocity.y,
    });

    // spring 복귀 애니메이션이 끝난 뒤 z-index를 내림
    void Promise.all([xAnim, yAnim]).then(() => {
      onDragStateChange?.(false);
    });
  }

  return (
    <div
      className="relative flex flex-col items-center select-none"
      style={{ height: BASE_STRAP_HEIGHT + CARD_HEIGHT + MAX_PULL_Y }}
    >
      {/* 끈 + 클립: pivot 기준 실시간으로 다시 그려짐, 카드보다 뒤에(z-0) */}
      <svg
        role="presentation"
        className="pointer-events-none absolute left-1/2 top-0 z-0 -translate-x-1/2 overflow-visible"
        width={STRAP_WIDTH}
        height={BASE_STRAP_HEIGHT + MAX_PULL_Y}
      >
        <motion.path
          d={pathD}
          stroke="var(--strap-color)"
          strokeWidth={STRAP_WIDTH}
          strokeLinecap="round"
          fill="none"
        />
        <rect
          x={STRAP_WIDTH / 2 - CLIP_WIDTH / 2}
          y={-CLIP_HEIGHT / 2}
          width={CLIP_WIDTH}
          height={CLIP_HEIGHT}
          rx={4}
          fill="var(--clip-color)"
        />
      </svg>

      {/* 카드: 유일한 드래그 대상. 위치가 곧 끈의 끝점 계산에 그대로 재사용됨 */}
      <motion.div
        tabIndex={0}
        role="img"
        aria-label="사원증 카드 — 드래그하여 움직일 수 있습니다"
        className="z-10 cursor-grab active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-[30px]"
        style={{
          marginTop: BASE_STRAP_HEIGHT,
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          x,
          y,
          rotate,
        }}
        drag
        dragElastic={0.12}
        dragConstraints={{
          top: -10,
          bottom: MAX_PULL_Y,
          left: -MAX_PULL_X,
          right: MAX_PULL_X,
        }}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        onDragStart={() => onDragStateChange?.(true)}
        onDragEnd={handleDragEnd}
        onTap={() => {
          onDragStateChange?.(true);
          setTimeout(() => {
            onDragStateChange?.(false);
          }, 300);
        }}
        whileTap={{ scale: 0.975 }}
      >
        <div className="h-full w-full overflow-hidden rounded-[30px] bg-id-card-bg shadow-id-card outline outline-id-card-outline">
          <Image
            src={CARD_SRC}
            alt="사원증"
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            className="h-full w-full object-cover"
            draggable={false}
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}
