import Image from "next/image";
import type { ImageBlock as ImageBlockData } from "@/lib/content/types";

export default function ImageBlock({
  src,
  width,
  height,
  alt,
  caption,
}: ImageBlockData) {
  return (
    <figure>
      <div
        className="relative overflow-hidden rounded-lg bg-card border border-border/30 mx-auto max-h-[80vh]"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <Image
          src={src}
          alt={alt ?? caption ?? ""}
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
