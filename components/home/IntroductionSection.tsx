"use client";

import { motion } from "framer-motion";
import { useMountedTheme } from "@/lib/hooks/useMountedTheme";
import { cn } from "@/lib/utils";

export default function IntroductionSection() {
  const { isDark } = useMountedTheme();

  return (
    <section className="max-w-3xl mx-auto relative">
      <div
        className={cn(
          "p-8 md:p-12 shadow-xl relative bg-card border border-border",
          isDark ? "font-serif" : "",
        )}
      >
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
            실제 사용 환경을 고려해 구조를 설계하는 개발자
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-foreground">
            <p>
              요구사항의 맥락을 읽고 사용자 흐름을 고려한 로직을 설계합니다.
              Next.js · Spring · SwiftUI 기반 프로젝트를 진행하며 인증, 데이터
              구조, 배포까지 경험했습니다. 추측보다 실제 동작 검증을 기반으로
              문제를 해결합니다.
            </p>
            <p>
              제 방식은 간단합니다:{" "}
              <span
                className={cn(
                  "px-1 font-bold",
                  isDark ? "bg-primary/20 text-primary" : "bg-yellow-200",
                )}
              >
                관찰하고, 분리하고, 구조화합니다.
              </span>
            </p>
            {isDark && (
              <motion.p
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1, textShadow: "0 0 4px #66fcf1" }}
                className="text-accent cursor-pointer italic transition-all"
              >
                *ps. 추리게임을 좋아합니다: 검은방, 회색도시, nobodies
                시체처리반 류의 게임을 즐겨해왔으며 게임 공략 블로그를 운영한 적
                있습니다.*
              </motion.p>
            )}
          </div>
        </div>

        {!isDark && (
          <div className="absolute bottom-6 right-6 font-['Caveat'] text-3xl text-red-700 transform -rotate-12 border-2 border-red-700 p-2 rounded-sm opacity-80">
            VERIFIED
          </div>
        )}
      </div>
    </section>
  );
}
