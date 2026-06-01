"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ExternalLink, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Archive } from "@/lib/archives/types";
import { useMountedTheme } from "@/lib/hooks/useMountedTheme";
import { cn } from "@/lib/utils";

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  archive: Archive;
}

export default function ArchiveModal({
  isOpen,
  onClose,
  archive,
}: ArchiveModalProps) {
  const { isDark } = useMountedTheme();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
        />

        <motion.div
          layoutId={`archive-${archive.id}`}
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

          {/* Left panel */}
          <div
            className={cn(
              "md:w-1/3 p-6 flex flex-col justify-between relative overflow-hidden",
              isDark
                ? "bg-[#1a1a1a] border-r border-[#1f2833]"
                : "bg-[#e5d9b7] border-r border-[#d4c39f]",
            )}
          >
            {!isDark && (
              <div className="absolute top-1/4 left-0 w-full h-1 bg-red-600/50 transform rotate-12 origin-left z-0 mix-blend-multiply" />
            )}

            <div className="relative z-10">
              <span
                className={cn(
                  "font-mono text-sm border-b pb-1 inline-block mb-6",
                  isDark
                    ? "text-[#45a29e] border-[#45a29e]"
                    : "text-[#8b5a2b] border-[#8b5a2b]",
                )}
              >
                ARCHIVE: {archive.id}
              </span>

              {archive.image && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: -2 }}
                  transition={{ delay: 0.2 }}
                  className={cn(
                    "p-2 bg-white shadow-lg border relative",
                    isDark ? "border-transparent opacity-80" : "border-gray-300",
                  )}
                >
                  {!isDark && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-800 shadow-sm" />
                  )}
                  <Image
                    src={archive.image}
                    alt={archive.title}
                    width={1080}
                    height={810}
                    className="w-full aspect-[4/3] object-cover"
                  />
                </motion.div>
              )}
            </div>

            <div className="relative z-10 mt-8 space-y-4">
              <h4
                className={cn(
                  "font-serif font-bold uppercase",
                  isDark ? "text-[#66fcf1]" : "text-[#3e2723]",
                )}
              >
                Classification:
              </h4>
              <div
                className={cn(
                  "font-mono text-sm space-y-2",
                  isDark ? "text-[#c5c6c7]" : "text-[#5d4037]",
                )}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {archive.category}
                </div>
                <div className="flex items-center gap-2 opacity-60">
                  <span>Filed:</span>
                  <span>{archive.date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel — document */}
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
                transition={{ delay: 0.3 }}
              >
                <h2
                  className={cn(
                    "text-4xl md:text-5xl font-serif font-black uppercase mb-4",
                    isDark ? "text-white" : "text-[#3e2723]",
                  )}
                >
                  {archive.title}
                </h2>

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
                    Summary:
                  </h4>
                  <p className="font-mono leading-relaxed">{archive.summary}</p>
                </div>

                <div className="space-y-4">
                  <h4
                    className={cn(
                      "font-serif font-bold text-xl",
                      isDark ? "text-white" : "text-[#3e2723]",
                    )}
                  >
                    Description
                  </h4>
                  <p
                    className={cn(
                      "font-mono leading-relaxed",
                      isDark ? "text-[#c5c6c7]" : "text-[#5d4037]",
                    )}
                  >
                    {archive.description}
                  </p>
                </div>

                <div className="mt-12">
                  <Link
                    href={`/archives/${archive.id}`}
                    onClick={onClose}
                    className={cn(
                      "inline-flex items-center gap-2 px-6 py-3 font-bold uppercase tracking-wider transition-all",
                      isDark
                        ? "bg-[#45a29e]/20 text-[#66fcf1] border border-[#66fcf1] hover:bg-[#45a29e]/40"
                        : "bg-[#3e2723] text-white hover:bg-[#5d4037]",
                    )}
                  >
                    Read Full Entry <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
