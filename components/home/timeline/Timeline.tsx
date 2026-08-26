"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { TimelineItem } from "@/lib/timeline/types";
import { dotVariants, itemVariants, lineVariants } from "./variants";

export default function Timeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <div ref={ref} className="relative pl-8 md:pl-10">
      {/* 수직 라인 */}
      <motion.div
        className="absolute left-[11px] md:left-[13px] top-2 bottom-2 w-px origin-top"
        style={{ background: "var(--timeline-line)" }}
        variants={lineVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        aria-hidden="true"
      />

      <ul
        className="flex flex-col gap-10 md:gap-12 list-none m-0 p-0"
        role="list"
        aria-label="타임라인"
      >
        {items.map((item, i) => (
          <li key={item.id} className="relative">
            {/* 도트 */}
            <motion.span
              className="absolute -left-8 md:-left-10 top-1.5 w-[22px] h-[22px] md:w-[26px] md:h-[26px] rounded-full border-[3px]"
              style={{
                borderColor: "var(--timeline-dot-border)",
                background: "var(--timeline-dot)",
              }}
              custom={i}
              variants={dotVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              aria-hidden="true"
            />

            {/* 콘텐츠 */}
            <motion.div
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <time
                className="block text-xs md:text-sm font-pretendard tracking-[0.08em] mb-1.5"
                style={{ color: "var(--timeline-period)" }}
              >
                {item.period}
              </time>
              <h4 className="text-lg md:text-xl font-semibold text-foreground leading-snug mb-1">
                {item.title}
              </h4>
              <p className="text-sm md:text-[15px] leading-relaxed text-foreground/80 max-w-[48ch]">
                {item.description}
              </p>
            </motion.div>
          </li>
        ))}
      </ul>
    </div>
  );
}
