/** cases, posts 등 콘텐츠 타입에서 공유하는 기본 타입 */

export type ImageRef = {
  src: string;
  width: number;
  height: number;
};

/* ═══════════════════════════════════════════════════════════════
   ContentBlock — 섹션 내부를 구성하는 미니블록 유니온
   새 블록이 필요하면 여기에 타입을 추가하고 BlockRenderer에 분기 추가.
   ═══════════════════════════════════════════════════════════════ */

export type TextBlock = { type: "text"; body: string };

export type ImageBlock = {
  type: "image";
  src: string;
  width: number;
  height: number;
  alt?: string;
  caption?: string;
};

export type CodeBlock = {
  type: "code";
  code: string;
  lang: string;
  filename?: string;
};

export type ERDBlock = {
  type: "erd";
  src: string;
  width: number;
  height: number;
  caption?: string;
};

export type YouTubeBlock = {
  type: "youtube";
  videoId: string;
};

export type GalleryBlock = {
  type: "gallery";
  images: (ImageRef & { caption?: string })[];
};

export type FlowStep = {
  label: string;
  detail?: string;
};

export type FlowBlock = {
  type: "flow";
  steps: FlowStep[];
  /** 기본 horizontal — 모바일에서는 항상 vertical로 전환 */
  direction?: "horizontal" | "vertical";
  caption?: string;
};

export type ContentBlock =
  | TextBlock
  | ImageBlock
  | CodeBlock
  | ERDBlock
  | YouTubeBlock
  | GalleryBlock
  | FlowBlock;

/* ═══════════════════════════════════════════════════════════════
   Feature — feature 레이아웃 전용 항목
   ═══════════════════════════════════════════════════════════════ */

export type Feature = {
  title: string;
  description: string;
  /** 이미지 또는 다른 블록을 직접 달 수 있음 */
  block?: ContentBlock;
};
