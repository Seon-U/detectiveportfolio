"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMountedTheme } from "@/lib/hooks/useMountedTheme";
import { cn } from "@/lib/utils";
import HangingCard from "../ui/HangingCard";
import ScrollIndicator from "../ui/ScrollIndicator";

export default function HeroSection() {
  const { isDark } = useMountedTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [isInitialEntrance, setIsInitialEntrance] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialEntrance(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const isHighZIndex = isInitialEntrance || isDragging;

  return (
    <section className="relative isolate grid place-items-center px-4 md:px-8 lg:px-12">
      {/* 텍스트 + 스크롤 인디케이터 */}
      <div className="[grid-area:1/1] z-10 pointer-events-none self-center md:justify-self-start flex flex-col items-center">
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

        <ScrollIndicator delay={2} className="mt-8 md:mt-12" />
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
