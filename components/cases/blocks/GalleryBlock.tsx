import Image from "next/image";
import type { GalleryBlock as GalleryBlockData } from "@/lib/content/types";

/** 가로 스크롤 이미지 갤러리 */
export default function GalleryBlock({ images }: GalleryBlockData) {
  return (
    <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-2 px-2 snap-x snap-mandatory">
      {images.map((img) => (
        <figure key={img.src} className="shrink-0 snap-start">
          <div
            className="relative overflow-hidden rounded-lg border border-border/30 bg-card"
            style={{
              width: Math.min(img.width, 560),
              aspectRatio: `${img.width} / ${img.height}`,
            }}
          >
            <Image
              src={img.src}
              alt={img.caption ?? ""}
              fill
              sizes="560px"
              className="object-cover"
            />
          </div>
          {img.caption && (
            <figcaption className="mt-2 font-pretendard text-xs text-muted-foreground">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
