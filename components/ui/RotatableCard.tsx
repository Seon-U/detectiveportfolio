import { type MotionValue, motion } from "framer-motion";
import Image from "next/image";
import type { CardData } from "@/lib/introduction/cardData";
import { cn } from "@/lib/utils";

type IntroductionCardProps = CardData & {
  rotateY: MotionValue<number>;
  isDark: boolean;
};

export default function RotatableCard({
  backLabel,
  frontImage,
  frontTitle,
  frontDesc,
  rotateY,
  isDark,
}: IntroductionCardProps) {
  return (
    <div className="w-full h-full perspective-[900px]">
      <motion.div
        className="relative w-full h-full transform-3d"
        style={{ rotateY }}
      >
        {/* ── 뒷면 ── */}
        <div className="absolute inset-0 backface-hidden">
          <div
            className={cn(
              "w-full h-full flex items-center justify-center rounded-xl border-2",
              isDark
                ? "bg-primary border-(--mint-700)"
                : "bg-accent border-(--orange-500)",
            )}
          >
            <span
              className={cn(
                "text-3xl font-serif font-black tracking-wider select-none",
                isDark ? "text-primary-foreground" : "text-accent-foreground",
              )}
            >
              {backLabel}
            </span>
          </div>
        </div>

        {/* ── 앞면 ── */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div
            className="relative w-full h-full rounded-xl overflow-hidden"
            style={{ boxShadow: "inset 0 0 0 1px var(--border), var(--shadow-card)" }}
          >
            {/* 이미지 — 카드 전체 영역 */}
            <Image
              src={frontImage}
              alt={frontTitle}
              fill
              sizes="(max-width: 768px) 80vw, clamp(200px, 18vw, 300px)"
              className={cn(
                "object-cover",
                isDark ? "bg-(--gray-300)" : "bg-(--gray-200)",
              )}
            />

            {/* 텍스트 박스 — 하단 오버레이, 고정 높이 */}
            <div
              className={cn(
                "absolute bottom-2.5 left-2.5 right-2.5 rounded-lg bg-(--gray-100)",
                "h-20 md:h-24 p-3 md:p-4",
              )}
            >
              <h4
                className={cn(
                  "text-lg md:text-xl font-serif font-bold",
                  isDark ? "text-(--mint-700)" : "text-(--orange-600)",
                )}
              >
                {frontTitle}
              </h4>
              <p className="text-sm md:text-base text-(--gray-900) mt-1 leading-snug line-clamp-2">
                {frontDesc}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
