import Image from "next/image";
import type { ERDBlock as ERDBlockData } from "@/lib/content/types";

/** ERD / 다이어그램 블록 — 배경 흰색 고정, 확대 가능 */
export default function ERDBlock({
  src,
  width,
  height,
  caption,
}: ERDBlockData) {
  return (
    <figure>
      <div
        className="relative overflow-hidden rounded-lg border border-border/30 bg-white mx-auto max-h-[80vh]"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <Image
          src={src}
          alt={caption ?? "ERD diagram"}
          fill
          sizes="(min-width: 1024px) 768px, 100vw"
          className="object-contain"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-pretendard text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
