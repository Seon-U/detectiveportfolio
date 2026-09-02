import type { ContentBlock } from "@/lib/content/types";
import BlockRenderer from "../blocks/BlockRenderer";

type Props = {
  heading: string;
  description?: string;
  blocks: ContentBlock[];
};

/**
 * 와이어프레임 Page 3 — 제목 + 설명 + 블록 세로 나열.
 * 가장 기본적인 섹션 레이아웃.
 */
export default function SimpleSection({ heading, description, blocks }: Props) {
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

      <div className="space-y-8">
        {blocks.map((block, i) => (
          <BlockRenderer key={`${block.type}-${i}`} block={block} />
        ))}
      </div>
    </div>
  );
}
