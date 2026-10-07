"use client";

import { useDictionary } from "@/components/i18n/DictionaryProvider";
import type { YouTubeBlock as YouTubeBlockData } from "@/lib/content/types";

/** 16:9 반응형 YouTube embed */
export default function YouTubeBlock({ videoId }: YouTubeBlockData) {
  const { projectDetail } = useDictionary();
  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-border/30 aspect-video">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={projectDetail.blocks.youtubeTitle}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
