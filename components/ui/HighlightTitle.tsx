"use client";

import { motion } from "framer-motion";

type HighlightTitleProps = {
  /** 전체 텍스트 (예: "From frontline") */
  label: string;
  /** 하이라이트 처리할 단어 (label 안에 포함되어야 함) */
  highlight: string;
  align?: "left" | "right";
  className?: string;
};

/**
 * 텍스트 중 특정 단어에 형광펜 마커 애니메이션을 적용하는 타이틀.
 * globals.css의 --highlight-marker 토큰 사용 (ScrollHighlightText와 동일).
 */
export default function HighlightTitle({
  label,
  highlight,
  align = "left",
  className,
}: HighlightTitleProps) {
  const parts = label.split(highlight);

  return (
    <h3
      className={`text-[clamp(28px,4vw,48px)] font-bold leading-tight tracking-tight text-foreground ${
        align === "right" ? "text-right" : "text-left"
      } ${className ?? ""}`}
    >
      {parts[0]}
      <span className="relative inline-block">
        <span className="relative z-10">{highlight}</span>
        <motion.span
          className="absolute inset-x-[-4px] bottom-0 h-[45%] z-0 rounded-sm"
          style={{
            background: "var(--highlight-marker)",
            transformOrigin: align === "right" ? "right" : "left",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
        />
      </span>
      {parts[1]}
    </h3>
  );
}
