import { type MotionValue, motion, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export type HighlightSegment = {
  text: string;
  /** progress 범위 [start, end] — 형광펜이 칠해지는 구간 */
  range: [number, number];
};

type ScrollHighlightTextProps = {
  progress: MotionValue<number>;
  /** 컨테이너 fade-in 구간 */
  fadeIn: [number, number];
  /** 컨테이너 fade-out 구간 */
  fadeOut: [number, number];
  isDark: boolean;
  /** 일반 문자열과 형광펜 세그먼트의 혼합 배열 */
  segments: (string | HighlightSegment)[];
  className?: string;
};

/**
 * 개별 형광펜 span — 각각 고유한 progress 범위를 가짐.
 * 서브 컴포넌트로 분리하여 useTransform hooks 규칙 준수.
 */
function HighlightSpan({
  progress,
  range,
  isDark,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  isDark: boolean;
  children: React.ReactNode;
}) {
  const hlProgress = useTransform(progress, range, [0, 100]);
  const bgSize = useTransform(hlProgress, (v) => `${v}% 60%`);

  return (
    <motion.span
      className={cn(
        "bg-no-repeat bg-left-bottom py-0.5 px-1 -mx-1 rounded-sm",
        isDark
          ? "bg-[linear-gradient(transparent_40%,rgba(10,255,145,0.3)_40%)]"
          : "bg-[linear-gradient(transparent_40%,rgba(250,219,96,0.5)_40%)]",
      )}
      style={{ backgroundSize: bgSize }}
    >
      {children}
    </motion.span>
  );
}

export default function ScrollHighlightText({
  progress,
  fadeIn,
  fadeOut,
  isDark,
  segments,
  className,
}: ScrollHighlightTextProps) {
  const opacity = useTransform(
    progress,
    [fadeIn[0], fadeIn[1], fadeOut[0], fadeOut[1]],
    [0, 1, 1, 0],
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-8"
      style={{ opacity }}
    >
      <p
        className={cn(
          "text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed text-center max-w-3xl text-foreground",
          className,
        )}
      >
        {segments.map((seg, i) =>
          typeof seg === "string" ? (
            // biome-ignore lint/suspicious/noArrayIndexKey: just array of text
            seg === "\n" ? <br key={i} /> : <span key={i}>{seg}</span>
          ) : (
            <HighlightSpan
              // biome-ignore lint/suspicious/noArrayIndexKey: never gonna overlap, just array of text
              key={i}
              progress={progress}
              range={seg.range}
              isDark={isDark}
            >
              {seg.text}
            </HighlightSpan>
          ),
        )}
      </p>
    </motion.div>
  );
}
