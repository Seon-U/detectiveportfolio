import {
  type MotionValue,
  motion,
  useTransform,
} from "framer-motion";
import type { CardData } from "@/lib/introduction/cardData";
import { CARD_H, CARD_W } from "@/lib/introduction/constants";
import IntroductionCard from "./IntroductionCard";

const APPEAR_DUR = 0.025;
const FLIP_DUR = 0.04;

/**
 * 데스크톱(md+): 넓게 펼쳐진 배치
 * 간격 260px — 카드 사이 충분한 여백 확보
 * 회전: -45° / +45° / -45° 로 핀보드 느낌
 */
const DESKTOP_X = [-260, 0, 260];
const DESKTOP_ROTATE_Z = [0, -8, 5];

export default function FlipCard({
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

  /* 수직: 데스크톱은 위에서 떨어짐, 모바일은 아래에서 올라옴 */
  const y = useTransform(
    progress,
    [appearAt, appearAt + 0.02],
    [isMobile ? 60 : -60, 0],
  );

  /* Z축 틸트: 등장하면서 목표 각도로 회전 (모바일: 0°) */
  const rotateZ = useTransform(
    progress,
    [appearAt, appearAt + 0.02],
    [0, isMobile ? 0 : DESKTOP_ROTATE_Z[idx]],
  );

  /* Y축 3D 플립
   * 데스크톱: 스크롤 진행도에 직접 연동 (카드가 공간 분리되어 동시 관찰 가능)
   * 모바일:  플립 없이 앞면 고정 (아래에서 올라와 겹쳐 쌓임)
   */
  const scrollRotateY = useTransform(
    progress,
    [flipAt, flipAt + FLIP_DUR],
    [0, 180],
  );
  const mobileRotateY = useTransform(progress, () => 180);
  const rotateY = isMobile ? mobileRotateY : scrollRotateY;

  return (
    <motion.div
      className="absolute top-0 left-0"
      style={{
        width: CARD_W,
        height: CARD_H,
        opacity,
        x: isMobile ? 0 : DESKTOP_X[idx],
        y,
        rotate: rotateZ,
        zIndex: isMobile ? (idx + 1) * 10 : idx + 1,
      }}
    >
      <IntroductionCard
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
