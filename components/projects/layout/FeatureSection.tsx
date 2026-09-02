import type { Feature } from "@/lib/content/types";
import BlockRenderer from "../blocks/BlockRenderer";

type Props = {
  heading: string;
  features: Feature[];
};

/**
 * 와이어프레임 Page 2 — 왼쪽 sticky 제목 + 오른쪽 피처 리스트 스크롤.
 * 모바일에서는 세로 스택으로 전환.
 */
export default function FeatureSection({ heading, features }: Props) {
  return (
    <div className="flex flex-col lg:flex-row lg:gap-12">
      {/* Left: sticky heading */}
      <div className="lg:w-[280px] lg:shrink-0 lg:sticky lg:top-36 lg:self-start mb-6 lg:mb-0">
        <h2 className="text-2xl md:text-3xl font-pretendard font-bold text-foreground leading-tight line-clamp-2 break-keep">
          {heading}
        </h2>
      </div>

      {/* Right: features list */}
      <div className="flex-1 min-w-0 space-y-12 lg:pt-1">
        {features.map((feat, i) => (
          <div key={`feat-${i}`}>
            <h3 className="text-lg font-pretendard font-bold text-foreground mb-2 break-keep">
              {feat.title}
            </h3>
            <p className="font-pretendard text-base leading-relaxed text-foreground/85 mb-4 max-w-[640px] break-keep">
              {feat.description}
            </p>
            {feat.block && <BlockRenderer block={feat.block} />}
          </div>
        ))}
      </div>
    </div>
  );
}
