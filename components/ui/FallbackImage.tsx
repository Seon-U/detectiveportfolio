"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useState } from "react";

type FallbackImageProps = ImageProps & {
  /** 원본 로딩 실패 시 대체 이미지 경로 */
  fallbackSrc: string;
};

/**
 * next/image 래퍼 — 로딩 실패 시 fallbackSrc로 자동 전환.
 * 이미 fallback으로 전환한 뒤에는 재시도하지 않는다.
 */
export default function FallbackImage({
  fallbackSrc,
  src,
  alt,
  ...rest
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  }, [hasError, fallbackSrc]);

  return <Image {...rest} src={imgSrc} alt={alt} onError={handleError} />;
}
