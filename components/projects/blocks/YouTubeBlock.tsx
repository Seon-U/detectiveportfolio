"use client";

import { useEffect, useRef } from "react";
import { useDictionary } from "@/components/i18n/DictionaryProvider";
import { track } from "@/lib/analytics/track";
import type { YouTubeBlock as YouTubeBlockData } from "@/lib/content/types";
import { useProjectId } from "../ProjectIdContext";

/** 16:9 반응형 YouTube embed */
export default function YouTubeBlock({ videoId }: YouTubeBlockData) {
  const { projectDetail } = useDictionary();
  const projectId = useProjectId();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  /*
   * iframe 안의 클릭은 페이지에서 받을 수 없다. 대신 iframe을 클릭하면 포커스가 iframe으로 넘어가며
   * window blur가 발생하므로, 그때 activeElement가 이 iframe이면 클릭으로 본다(페이지뷰당 1회).
   * YouTube IFrame API는 외부 스크립트를 더 불러와야 해서 쓰지 않는다 (docs/plan-analytics.md §10).
   */
  useEffect(() => {
    let sent = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const onBlur = () => {
      // 일부 브라우저는 blur 직후에 activeElement가 갱신되므로 한 틱 뒤에 확인
      timer = setTimeout(() => {
        if (sent || document.activeElement !== iframeRef.current) return;
        sent = true;
        track("youtube_interact", { projectId, videoId });
      }, 0);
    };
    window.addEventListener("blur", onBlur);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("blur", onBlur);
    };
  }, [projectId, videoId]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-border/30 aspect-video">
      <iframe
        ref={iframeRef}
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={projectDetail.blocks.youtubeTitle}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
