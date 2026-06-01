"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Case, ImageRef } from "@/lib/cases/types";
import { useMountedTheme } from "@/lib/hooks/useMountedTheme";
import { cn } from "@/lib/utils";

interface CaseModalProps {
  onClose: () => void;
  caseData: Case;
}

const MAX_GALLERY = 3;
const ROTATIONS = ["md:-rotate-2", "md:rotate-1", "md:-rotate-1"];

function CaseModalGallery({
  images,
  alt,
  isDark,
}: {
  images: ImageRef[];
  alt: string;
  isDark: boolean;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const isMultiple = images.length > 1;

  const goTo = useCallback(
    (target: number) => {
      const clamped = (target + images.length) % images.length;
      const el = scrollerRef.current;
      if (!el) return;
      const slide = el.children[clamped] as HTMLElement | undefined;
      slide?.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
    },
    [images.length],
  );

  const handleScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setIndex((cur) => (cur === idx ? cur : idx));
  }, []);

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex md:flex-col items-start gap-3 md:gap-4 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none hide-scrollbar -mx-1 px-1 md:mx-0 md:px-0"
      >
        {images.map((img, i) => (
          <motion.div
            key={img.src}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.05 }}
            className={cn(
              "shrink-0 w-full snap-center relative p-2 bg-white shadow-lg border",
              ROTATIONS[i % ROTATIONS.length],
              isDark ? "border-transparent opacity-80" : "border-gray-300",
            )}
          >
            {!isDark && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-800 shadow-sm z-10" />
            )}
            <Image
              src={img.src}
              alt={`${alt} — ${i + 1}`}
              width={img.width}
              height={img.height}
              sizes="(min-width: 768px) 33vw, 90vw"
              className="block w-full h-auto"
            />
          </motion.div>
        ))}
      </div>

      {/* Swipe controls — narrow viewport only */}
      {isMultiple && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous image"
            className={cn(
              "md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full transition-colors backdrop-blur-sm",
              isDark
                ? "bg-[#1f2833]/80 text-[#66fcf1] hover:bg-[#45a29e]/60"
                : "bg-white/80 text-[#3e2723] hover:bg-white",
            )}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next image"
            className={cn(
              "md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full transition-colors backdrop-blur-sm",
              isDark
                ? "bg-[#1f2833]/80 text-[#66fcf1] hover:bg-[#45a29e]/60"
                : "bg-white/80 text-[#3e2723] hover:bg-white",
            )}
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div
            className="md:hidden mt-4 flex justify-center gap-1.5"
            role="tablist"
            aria-label="Image pagination"
          >
            {images.map((img, i) => (
              <button
                key={`${img.src}-dot`}
                type="button"
                role="tab"
                aria-label={`Show image ${i + 1}`}
                aria-selected={i === index}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index
                    ? cn("w-6", isDark ? "bg-[#66fcf1]" : "bg-[#3e2723]")
                    : cn(
                        "w-1.5",
                        isDark ? "bg-[#66fcf1]/40" : "bg-[#3e2723]/30",
                      ),
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function CaseModal({ onClose, caseData }: CaseModalProps) {
  const { isDark } = useMountedTheme();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const galleryImages: ImageRef[] = (
    caseData.images?.length
      ? caseData.images
      : [{ src: caseData.image, width: 16, height: 9 }]
  ).slice(0, MAX_GALLERY);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-hidden pointer-events-none">
      {/* 배경 클릭으로 닫기 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "relative w-full max-w-5xl h-full max-h-[85vh] rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden pointer-events-auto",
          isDark
            ? "bg-[#111] border border-[#45a29e]"
            : "bg-[#f4ebd0] border-2 border-[#d4c39f]",
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "absolute top-4 right-4 z-50 p-2 rounded-full transition-colors",
            isDark
              ? "bg-[#1f2833] text-[#66fcf1] hover:bg-[#45a29e]/30"
              : "bg-[#e2d5b8] text-[#5d4037] hover:bg-[#d4c39f]",
          )}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Evidence Board (Left Side) */}
        <div
          className={cn(
            "md:w-1/3 p-6 md:overflow-y-auto md:hide-scrollbar relative",
            isDark
              ? "bg-[#1a1a1a] border-r border-[#1f2833]"
              : "bg-[#e5d9b7] border-r border-[#d4c39f]",
          )}
        >
          {!isDark && (
            <div className="absolute top-1/4 left-0 w-full h-1 bg-red-600/50 transform rotate-12 origin-left z-0 mix-blend-multiply pointer-events-none" />
          )}

          <div className="relative z-10 space-y-6">
            <span
              className={cn(
                "font-mono text-sm border-b pb-1 inline-block",
                isDark
                  ? "text-[#45a29e] border-[#45a29e]"
                  : "text-[#8b5a2b] border-[#8b5a2b]",
              )}
            >
              EVIDENCE FILE: {caseData.id}
            </span>

            <CaseModalGallery
              images={galleryImages}
              alt={caseData.title}
              isDark={isDark}
            />
          </div>
        </div>

        {/* Case Document (Right Side) */}
        <div className="md:w-2/3 p-8 md:p-12 overflow-y-auto hide-scrollbar relative">
          {!isDark && (
            <div
              className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none"
              style={{
                backgroundImage:
                  "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
              }}
            />
          )}

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="mb-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2
                    className={cn(
                      "text-4xl md:text-5xl font-serif font-black uppercase",
                      isDark ? "text-white" : "text-[#3e2723]",
                    )}
                  >
                    {caseData.title}
                  </h2>
                  <span
                    className={cn(
                      "text-xs font-bold px-3 py-1 border-2 uppercase transform rotate-6 shrink-0",
                      caseData.status === "SOLVED"
                        ? isDark
                          ? "text-green-400 border-green-400"
                          : "text-green-700 border-green-700 bg-green-100"
                        : isDark
                          ? "text-red-400 border-red-400"
                          : "text-red-700 border-red-700 bg-red-100",
                    )}
                  >
                    {caseData.status}
                  </span>
                </div>

                {caseData.projectUrl && (
                  <a
                    href={caseData.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold border transition-colors",
                      isDark
                        ? "border-[#45a29e]/60 text-[#45a29e] hover:border-[#66fcf1] hover:text-[#66fcf1]"
                        : "border-[#8b5a2b]/50 text-[#8b5a2b] hover:border-[#3e2723] hover:text-[#3e2723]",
                    )}
                  >
                    Project <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div
                className={cn(
                  "p-6 rounded-sm my-8 border-l-4",
                  isDark
                    ? "bg-[#1f2833] border-[#45a29e] text-[#c5c6c7]"
                    : "bg-white/50 border-[#8b5a2b] text-[#5d4037]",
                )}
              >
                <h4
                  className={cn(
                    "font-bold mb-2 uppercase tracking-widest",
                    isDark ? "text-[#66fcf1]" : "text-[#3e2723]",
                  )}
                >
                  The Incident:
                </h4>
                <p className="font-mono leading-relaxed">{caseData.summary}</p>
              </div>

              <div className="space-y-4">
                <h4
                  className={cn(
                    "font-serif font-bold text-xl",
                    isDark ? "text-white" : "text-[#3e2723]",
                  )}
                >
                  Investigation Notes
                </h4>
                <p
                  className={cn(
                    "font-mono leading-relaxed",
                    isDark ? "text-[#c5c6c7]" : "text-[#5d4037]",
                  )}
                >
                  {caseData.description}
                </p>
              </div>

              <div className="mt-12 flex items-center gap-4 flex-wrap">
                {caseData.tags.map((tag) => (
                  <span
                    key={tag}
                    className={cn(
                      "px-2 py-1 text-xs font-mono border",
                      isDark
                        ? "border-[#45a29e]/40 text-[#c5c6c7]"
                        : "border-[#8b5a2b]/30 text-[#5d4037]",
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href={`/cases/${caseData.id}`}
                  onClick={onClose}
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 font-bold uppercase tracking-wider transition-all",
                    isDark
                      ? "bg-[#45a29e]/20 text-[#66fcf1] border border-[#66fcf1] hover:bg-[#45a29e]/40"
                      : "bg-[#3e2723] text-white hover:bg-[#5d4037]",
                  )}
                >
                  디테일 보기 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
