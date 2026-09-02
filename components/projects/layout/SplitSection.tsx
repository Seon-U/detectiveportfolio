import type { ContentBlock } from "@/lib/content/types";
import BlockRenderer from "../blocks/BlockRenderer";

type Props = {
  heading: string;
  description?: string;
  blocks: ContentBlock[];
};

/**
 * 와이어프레임 Page 4 — 제목 + 설명 후 2열 그리드.
 * 블록이 1개면 전체 너비, 2개 이상이면 2열 배치.
 * 모바일에서는 세로 스택.
 */
export default function SplitSection({ heading, description, blocks }: Props) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-pretendard font-bold text-foreground mb-4 leading-tight line-clamp-2 break-keep">
        {heading}
      </h2>

      {description && (
        <p className="font-pretendard text-lg leading-relaxed text-foreground/85 mb-8 max-w-[740px] break-keep">
          {description}
        </p>
      )}

      <div
        className={
          blocks.length >= 2
            ? "grid grid-cols-1 md:grid-cols-2 gap-6"
            : "space-y-8"
        }
      >
        {blocks.map((block, i) => (
          <BlockRenderer key={`${block.type}-${i}`} block={block} />
        ))}
      </div>
    </div>
  );
}
