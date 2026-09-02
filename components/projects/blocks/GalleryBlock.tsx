"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { GalleryBlock as GalleryBlockData } from "@/lib/content/types";
import { cn } from "@/lib/utils";

/** 가로 스크롤 이미지 갤러리 — 하단 좌우 핸들 + 이미지별 +/X 디테일 오버레이 */
export default function GalleryBlock({ images }: GalleryBlockData) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(images.length > 1);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  const scroll = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("figure");
    const cardWidth = card?.offsetWidth ?? 400;
    el.scrollBy({ left: dir * (cardWidth + 16), behavior: "smooth" });
  }, []);

  const toggleDetail = useCallback((index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div>
      {/* ── 갤러리 스크롤 영역 ── */}
      <div
        ref={scrollerRef}
        onScroll={updateScrollState}
        className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-2 px-2 snap-x snap-mandatory"
      >
        {images.map((img, index) => {
          const isOpen = expandedIndex === index;

          return (
            <figure key={img.src} className="shrink-0 snap-start">
              <div
                className="relative overflow-hidden rounded-lg border border-border/30 bg-card w-[min(100vw-2rem,560px)] md:w-[min(70vw,640px)] lg:w-[min(50vw,720px)]"
                style={{
                  aspectRatio: `${img.width} / ${img.height}`,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.caption ?? ""}
                  fill
                  sizes="(min-width: 1024px) 50vw, (min-width: 768px) 70vw, calc(100vw - 2rem)"
                  className="object-cover"
                />

                {/* ── + / X 버튼 (캡션이 있을 때만) ── */}
                {img.caption && (
                  <button
                    type="button"
                    onClick={() => toggleDetail(index)}
                    className={cn(
                      "absolute bottom-3 right-3 z-10",
                      "w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center",
                      "bg-foreground/80 text-background backdrop-blur-sm",
                      "transition-transform duration-200 hover:scale-110",
                      "shadow-lg",
                    )}
                    aria-label={isOpen ? "설명 닫기" : "설명 보기"}
                  >
                    <Plus
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        isOpen && "rotate-45",
                      )}
                    />
                  </button>
                )}

                {/* ── 디테일 오버레이 ── */}
                <AnimatePresence>
                  {isOpen && img.caption && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute inset-x-0 bottom-0 z-[5] pointer-events-none"
                    >
                      <div className="bg-gradient-to-t from-black/80 via-black/50 to-transparent px-4 pt-10 pb-4">
                        <p className="font-pretendard text-sm md:text-base leading-relaxed text-white/95 break-keep max-w-[480px]">
                          {img.caption}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </figure>
          );
        })}
      </div>

      {/* ── 하단 좌우 핸들 ── */}
      {images.length > 1 && (
        <div className="flex items-center justify-end gap-2 mt-3">
          <button
            type="button"
            onClick={() => scroll(-1)}
            disabled={!canScrollLeft}
            className={cn(
              "w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-colors",
              canScrollLeft
                ? "border-foreground/20 text-foreground hover:bg-surface-hover"
                : "border-border/30 text-muted-foreground/40 cursor-default",
            )}
            aria-label="이전 이미지"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            disabled={!canScrollRight}
            className={cn(
              "w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-colors",
              canScrollRight
                ? "border-foreground text-foreground bg-foreground/5 hover:bg-surface-hover"
                : "border-border/30 text-muted-foreground/40 cursor-default",
            )}
            aria-label="다음 이미지"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
