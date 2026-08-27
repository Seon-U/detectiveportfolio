import type { ContentBlock } from "@/lib/content/types";
import TextBlock from "./TextBlock";
import ImageBlock from "./ImageBlock";
import CodeBlock from "./CodeBlock";
import ERDBlock from "./ERDBlock";
import YouTubeBlock from "./YouTubeBlock";
import GalleryBlock from "./GalleryBlock";

/** ContentBlock 유니온을 받아 적절한 미니블록 컴포넌트로 라우팅 */
export default function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "text":
      return <TextBlock {...block} />;
    case "image":
      return <ImageBlock {...block} />;
    case "code":
      return <CodeBlock {...block} />;
    case "erd":
      return <ERDBlock {...block} />;
    case "youtube":
      return <YouTubeBlock {...block} />;
    case "gallery":
      return <GalleryBlock {...block} />;
    default: {
      const _exhaustive: never = block;
      return null;
    }
  }
}
