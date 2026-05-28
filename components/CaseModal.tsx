import { AnimatePresence, motion } from "framer-motion";
import { Code2, Database, ExternalLink, Shield, X } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface CaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: any;
}

export default function CaseModal({
  isOpen,
  onClose,
  caseData,
}: CaseModalProps) {
  const { theme } = useTheme();

  if (!isOpen || !caseData) return null;

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
          layoutId={`case-${caseData.id}`}
          className={cn(
            "relative w-full max-w-5xl h-full max-h-[85vh] rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden pointer-events-auto",
            theme === "dark"
              ? "bg-[#111] border border-[#45a29e]"
              : "bg-[#f4ebd0] border-2 border-[#d4c39f]",
          )}
        >
          <button
            onClick={onClose}
            className={cn(
              "absolute top-4 right-4 z-50 p-2 rounded-full transition-colors",
              theme === "dark"
                ? "bg-[#1f2833] text-[#66fcf1] hover:bg-[#45a29e]/30"
                : "bg-[#e2d5b8] text-[#5d4037] hover:bg-[#d4c39f]",
            )}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Evidence Board (Left Side) */}
          <div
            className={cn(
              "md:w-1/3 p-6 flex flex-col justify-between relative overflow-hidden",
              theme === "dark"
                ? "bg-[#1a1a1a] border-r border-[#1f2833]"
                : "bg-[#e5d9b7] border-r border-[#d4c39f]",
            )}
          >
            {/* Red string logic */}
            {theme !== "dark" && (
              <div className="absolute top-1/4 left-0 w-full h-1 bg-red-600/50 transform rotate-12 origin-left z-0 mix-blend-multiply" />
            )}

            <div className="relative z-10">
              <span
                className={cn(
                  "font-mono text-sm border-b pb-1 inline-block mb-6",
                  theme === "dark"
                    ? "text-[#45a29e] border-[#45a29e]"
                    : "text-[#8b5a2b] border-[#8b5a2b]",
                )}
              >
                EVIDENCE FILE: {caseData.id}
              </span>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                transition={{ delay: 0.2 }}
                className={cn(
                  "p-2 bg-white shadow-lg border relative",
                  theme === "dark"
                    ? "border-transparent opacity-80"
                    : "border-gray-300",
                )}
              >
                {theme !== "dark" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-800 shadow-sm" />
                )}
                <img
                  src={caseData.image}
                  alt={caseData.title}
                  className="w-full aspect-[4/3] object-cover"
                />
              </motion.div>
            </div>

            <div className="relative z-10 mt-8 space-y-4">
              <h4
                className={cn(
                  "font-serif font-bold uppercase",
                  theme === "dark" ? "text-[#66fcf1]" : "text-[#3e2723]",
                )}
              >
                Tech Implicated:
              </h4>
              <ul
                className={cn(
                  "font-mono text-sm space-y-2",
                  theme === "dark" ? "text-[#c5c6c7]" : "text-[#5d4037]",
                )}
              >
                <li className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> React Architecture
                </li>
                <li className="flex items-center gap-2">
                  <Database className="w-4 h-4" /> State Forensics
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Endpoint Security
                </li>
              </ul>
            </div>
          </div>

          {/* Case Document (Right Side) */}
          <div className="md:w-2/3 p-8 md:p-12 overflow-y-auto hide-scrollbar relative">
            {theme !== "dark" && (
              <div
                className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none"
                style={{
                  backgroundImage:
                    "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
                }}
              ></div>
            )}

            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className={cn(
                      "text-4xl md:text-5xl font-serif font-black uppercase",
                      theme === "dark" ? "text-white" : "text-[#3e2723]",
                    )}
                  >
                    {caseData.title}
                  </h2>
                  <span
                    className={cn(
                      "text-xs font-bold px-3 py-1 border-2 uppercase transform rotate-6",
                      caseData.status === "SOLVED"
                        ? theme === "dark"
                          ? "text-green-400 border-green-400"
                          : "text-green-700 border-green-700 bg-green-100"
                        : theme === "dark"
                          ? "text-red-400 border-red-400"
                          : "text-red-700 border-red-700 bg-red-100",
                    )}
                  >
                    {caseData.status}
                  </span>
                </div>

                <div
                  className={cn(
                    "p-6 rounded-sm my-8 border-l-4",
                    theme === "dark"
                      ? "bg-[#1f2833] border-[#45a29e] text-[#c5c6c7]"
                      : "bg-white/50 border-[#8b5a2b] text-[#5d4037]",
                  )}
                >
                  <h4
                    className={cn(
                      "font-bold mb-2 uppercase tracking-widest",
                      theme === "dark" ? "text-[#66fcf1]" : "text-[#3e2723]",
                    )}
                  >
                    The Incident:
                  </h4>
                  <p className="font-mono leading-relaxed">
                    {caseData.summary} Client reported severe discrepancies in
                    data synchronization and frequent memory timeouts leading to
                    total application blackout.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4
                    className={cn(
                      "font-serif font-bold text-xl",
                      theme === "dark" ? "text-white" : "text-[#3e2723]",
                    )}
                  >
                    Investigation Notes
                  </h4>
                  <p
                    className={cn(
                      "font-mono leading-relaxed",
                      theme === "dark" ? "text-[#c5c6c7]" : "text-[#5d4037]",
                    )}
                  >
                    Upon initial inspection, the DOM tree was littered with
                    unnecessary re-renders. A rogue `useEffect` was caught
                    red-handed dispatching state updates without proper
                    dependency arrays, causing an infinite loop.
                  </p>
                  <p
                    className={cn(
                      "font-mono leading-relaxed",
                      theme === "dark" ? "text-[#c5c6c7]" : "text-[#5d4037]",
                    )}
                  >
                    The culprit tried to hide within a deeply nested Context
                    provider, but performance profiling exposed the timeline.
                  </p>
                </div>

                <div className="mt-12">
                  <button
                    className={cn(
                      "flex items-center gap-2 px-6 py-3 font-bold uppercase tracking-wider transition-all",
                      theme === "dark"
                        ? "bg-[#45a29e]/20 text-[#66fcf1] border border-[#66fcf1] hover:bg-[#45a29e]/40"
                        : "bg-[#3e2723] text-white hover:bg-[#5d4037]",
                    )}
                  >
                    View Full Report <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
