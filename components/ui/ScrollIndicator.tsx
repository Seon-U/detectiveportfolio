"use client";

import { motion } from "framer-motion";

/**
 * 마우스 모양 스크롤 유도 인디케이터.
 * 안쪽 도트가 위아래로 반복 바운스.
 */
export default function ScrollIndicator({
  delay = 2,
  className,
}: {
  /** fade-in 딜레이 (초) */
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`flex flex-col items-center gap-2 ${className ?? ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.6 }}
      aria-hidden="true"
    >
      <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/40 flex justify-center pt-1.5">
        <motion.div
          className="w-1 h-2 rounded-full bg-muted-foreground/60"
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 1.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut" as const,
          }}
        />
      </div>
      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 font-medium">
        Scroll Down
      </span>
    </motion.div>
  );
}
