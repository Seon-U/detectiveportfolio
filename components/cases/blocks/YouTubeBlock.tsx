import type { YouTubeBlock as YouTubeBlockData } from "@/lib/content/types";

/** 16:9 반응형 YouTube embed */
export default function YouTubeBlock({ videoId }: YouTubeBlockData) {
  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-border/30 aspect-video">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
