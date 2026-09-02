"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import type { Project } from "@/lib/projects/types";
import { cn } from "@/lib/utils";

type Props = {
  projects: Project[];
  /** 현재 선택된 role — 링크에 ?role= 유지 */
  currentRole?: string;
};

/**
 * Webflow "Related articles" 스타일 가로 스크롤 캐러셀.
 * 같은 역할의 다른 프로젝트를 이미지 + 타이틀로 보여줌.
 */
export default function RelatedProjects({ projects, currentRole }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  const scroll = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("a")?.offsetWidth ?? 320;
    el.scrollBy({ left: dir * (cardWidth + 16), behavior: "smooth" });
  }, []);

  if (projects.length === 0) return null;

  return (
    <section className="pt-16 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-pretendard font-bold text-foreground">
          다른 프로젝트 보기
        </h2>

        {/* Arrow controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            disabled={!canScrollLeft}
            className={cn(
              "w-10 h-10 rounded-full border flex items-center justify-center transition-colors",
              canScrollLeft
                ? "border-foreground/20 text-foreground hover:bg-surface-hover"
                : "border-border/30 text-muted-foreground/40 cursor-default",
            )}
            aria-label="이전 프로젝트"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            disabled={!canScrollRight}
            className={cn(
              "w-10 h-10 rounded-full border flex items-center justify-center transition-colors",
              canScrollRight
                ? "border-foreground text-foreground bg-foreground/5 hover:bg-surface-hover"
                : "border-border/30 text-muted-foreground/40 cursor-default",
            )}
            aria-label="다음 프로젝트"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollerRef}
        onScroll={updateScrollState}
        className="flex gap-4 overflow-x-auto hide-scrollbar -mx-4 px-4 snap-x snap-mandatory"
      >
        {projects.map((project) => {
          const href = currentRole
            ? `/projects/${project.id}?role=${currentRole}`
            : `/projects/${project.id}`;

          return (
            <Link
              key={project.id}
              href={href}
              className="group shrink-0 w-[280px] md:w-[320px] snap-start no-underline"
            >
              {/* Image */}
              <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-surface mb-3">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="320px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Title */}
              <h3 className="font-pretendard text-base font-medium text-foreground group-hover:text-accent transition-colors line-clamp-2 break-keep">
                {project.title}
              </h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
