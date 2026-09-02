"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type TrackImageProps = {
  src: string;
  alt: string;
  sticky?: boolean;
  /** 모바일용 가로형 비율 (true → 16/10, false → 3/4) */
  mobileOnly?: boolean;
};

export default function TrackImage({
  src,
  alt,
  sticky,
  mobileOnly,
}: TrackImageProps) {
  return (
    <div className={sticky ? "sticky top-24" : undefined}>
      <motion.div
        className={`relative w-full overflow-hidden border border-border/60 bg-surface rounded-xl ${
          mobileOnly ? "aspect-[16/10]" : "aspect-[3/4]"
        }`}
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={mobileOnly ? "92vw" : "(min-width: 1024px) 30vw, 80vw"}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
