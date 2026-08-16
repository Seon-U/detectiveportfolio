"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMountedTheme } from "@/lib/hooks/useMountedTheme";
import { cn } from "@/lib/utils";
import HangingCard from "../ui/HangingCard";

export default function HeroSection() {
  const { isDark } = useMountedTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [isInitialEntrance, setIsInitialEntrance] = useState(true);

  useEffect(() => {
    // HangingCard의 출렁거리는 애니메이션 시간에 맞춰 타이머 설정 (예: 1.5초 후)
    const timer = setTimeout(() => {
      setIsInitialEntrance(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const isHighZIndex = isInitialEntrance || isDragging;

  return (
    <section className="relative isolate grid place-items-center">
      {/* 텍스트 — pointer-events-none으로 카드 클릭 투과 */}
      <div className="[grid-area:1/1] z-10 pointer-events-none self-center md:justify-self-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1
            className={cn(
              "text-6xl md:text-8xl lg:text-9xl font-serif font-black tracking-tighter uppercase text-center",
              isDark &&
                "text-transparent bg-clip-text bg-linear-to-r from-accent to-primary",
            )}
          >
            Trace. Solve. Refine.
          </h1>
        </motion.div>
      </div>

      {/* 카드 — 드래그 전 z-0(텍스트 뒤), 드래그 시 z-20(텍스트 위) */}
      <div
        className={cn(
          "[grid-area:1/1] self-start md:justify-self-end",
          isHighZIndex ? "z-20" : "z-0",
        )}
      >
        <HangingCard onDragStateChange={setIsDragging} />
      </div>
    </section>
  );
}
