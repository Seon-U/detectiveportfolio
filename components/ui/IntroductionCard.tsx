import { type MotionValue, motion } from "framer-motion";
import Image from "next/image";
import type { CardData } from "@/lib/introduction/cardData";
import { cn } from "@/lib/utils";

type IntroductionCardProps = CardData & {
  rotateY: MotionValue<number>;
  isDark: boolean;
};

export default function IntroductionCard({
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
          <div className="w-full h-full flex flex-col rounded-xl overflow-hidden border border-border bg-card shadow-card">
            <div
              className={cn(
                "relative flex-1",
                isDark ? "bg-(--gray-300)" : "bg-(--gray-200)",
              )}
            >
              <Image
                src={frontImage}
                alt={frontTitle}
                fill
                className="object-cover"
              />
            </div>
            {/* 하단 텍스트 */}
            <div className="p-3 bg-card">
              <h4 className="text-base font-serif font-bold text-card-foreground">
                {frontTitle}
              </h4>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">
                {frontDesc}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
