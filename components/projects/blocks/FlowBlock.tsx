import { Fragment } from "react";
import type { FlowBlock as FlowBlockData } from "@/lib/content/types";
import { cn } from "@/lib/utils";

/** 수평 화살표 (→) */
function HArrow() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="shrink-0 text-muted-foreground/50"
    >
      <path
        d="M4 10h10m0 0l-3.5-3.5M14 10l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 수직 화살표 (↓) */
function VArrow() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="shrink-0 text-muted-foreground/50"
    >
      <path
        d="M10 4v10m0 0l-3.5-3.5M10 14l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * 수평(horizontal) 플로우는 모바일에서 자동으로 세로 전환.
 * 세로(vertical) 플로우는 항상 세로.
 */
function ResponsiveArrow({ alwaysVertical }: { alwaysVertical: boolean }) {
  if (alwaysVertical) {
    return (
      <div className="flex items-center justify-center py-0.5">
        <VArrow />
      </div>
    );
  }

  return (
    <>
      {/* 모바일: 세로 화살표 */}
      <div className="flex items-center justify-center py-0.5 md:hidden">
        <VArrow />
      </div>
      {/* 데스크톱: 수평 화살표 */}
      <div className="hidden md:flex items-center justify-center px-0.5">
        <HArrow />
      </div>
    </>
  );
}

export default function FlowBlock({
  steps,
  direction = "horizontal",
  caption,
}: FlowBlockData) {
  const alwaysVertical = direction === "vertical";

  return (
    <figure>
      <div
        className={cn(
          "flex gap-1",
          alwaysVertical
            ? "flex-col items-center"
            : "flex-col items-center md:flex-row md:items-stretch",
        )}
      >
        {steps.map((step, i) => (
          <Fragment key={`step-${i}`}>
            {i > 0 && <ResponsiveArrow alwaysVertical={alwaysVertical} />}
            <div
              className={cn(
                "flex-1 rounded-lg border border-border/50 bg-card px-4 py-3",
                "min-w-0",
                alwaysVertical ? "w-full max-w-sm" : "w-full md:w-0",
              )}
            >
              <p className="font-pretendard text-sm font-semibold text-foreground leading-snug break-keep">
                {step.label}
              </p>
              {step.detail && (
                <p className="mt-1 font-pretendard text-xs text-muted-foreground leading-relaxed break-keep">
                  {step.detail}
                </p>
              )}
            </div>
          </Fragment>
        ))}
      </div>

      {caption && (
        <figcaption className="mt-3 text-center font-pretendard text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
