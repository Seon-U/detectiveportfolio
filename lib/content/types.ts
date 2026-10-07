/** cases, posts 등 콘텐츠 타입에서 공유하는 기본 타입 */

import type { LocalizedString } from "@/lib/i18n/config";
import type { Localized } from "@/lib/i18n/localize";

export type ImageRef = {
  src: string;
  width: number;
  height: number;
};

/* ═══════════════════════════════════════════════════════════════
   ContentBlock — 섹션 내부를 구성하는 미니블록 유니온
   새 블록이 필요하면 여기에 타입을 추가하고 BlockRenderer에 분기 추가.
   ═══════════════════════════════════════════════════════════════ */

export type TextBlockSource = { type: "text"; body: LocalizedString };

export type ImageBlockSource = {
  type: "image";
  src: string;
  width: number;
  height: number;
  alt?: LocalizedString;
  caption?: LocalizedString;
};

export type CodeBlockSource = {
  type: "code";
  code: string;
  lang: string;
  filename?: string;
};

export type ERDBlockSource = {
  type: "erd";
  src: string;
  width: number;
  height: number;
  caption?: LocalizedString;
};

export type YouTubeBlockSource = {
  type: "youtube";
  videoId: string;
};

export type GalleryBlockSource = {
  type: "gallery";
  images: (ImageRef & { caption?: LocalizedString })[];
};

export type FlowStepSource = {
  label: LocalizedString;
  detail?: LocalizedString;
};

export type FlowBlockSource = {
  type: "flow";
  steps: FlowStepSource[];
  /** 기본 horizontal — 모바일에서는 항상 vertical로 전환 */
  direction?: "horizontal" | "vertical";
  caption?: LocalizedString;
};

export type ContentBlockSource =
  | TextBlockSource
  | ImageBlockSource
  | CodeBlockSource
  | ERDBlockSource
  | YouTubeBlockSource
  | GalleryBlockSource
  | FlowBlockSource;

/* ═══════════════════════════════════════════════════════════════
   Feature — feature 레이아웃 전용 항목
   ═══════════════════════════════════════════════════════════════ */

export type FeatureSource = {
  title: LocalizedString;
  description: LocalizedString;
  /** 이미지 또는 다른 블록을 직접 달 수 있음 */
  block?: ContentBlockSource;
};

/* ═══════════════════════════════════════════════════════════════
   렌더링용 타입 — Source에서 LocalizedString을 string으로 해석한 형태
   ═══════════════════════════════════════════════════════════════ */

export type TextBlock = Localized<TextBlockSource>;
export type ImageBlock = Localized<ImageBlockSource>;
export type CodeBlock = Localized<CodeBlockSource>;
export type ERDBlock = Localized<ERDBlockSource>;
export type YouTubeBlock = Localized<YouTubeBlockSource>;
export type GalleryBlock = Localized<GalleryBlockSource>;
export type FlowStep = Localized<FlowStepSource>;
export type FlowBlock = Localized<FlowBlockSource>;
export type ContentBlock = Localized<ContentBlockSource>;
export type Feature = Localized<FeatureSource>;
