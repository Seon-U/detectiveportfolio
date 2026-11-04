"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * next-themes ThemeProvider 래퍼.
 *
 * next-themes는 테마 깜빡임 방지용 인라인 <script>를 렌더한다. 루트 레이아웃이 [lang] 아래에 있어
 * 언어 전환 시 레이아웃이 Client에서 다시 마운트되면, React 19가 Client 렌더 <script>에 대해
 * "Encountered a script tag while rendering React component" 경고를 낸다.
 * SSR에서는 실행 가능한 스크립트로 두고(초기 테마 적용), Client 렌더에서는 데이터 블록(text/plain)으로
 * 바꿔 경고를 피한다. Client 렌더된 스크립트는 원래 실행되지 않으며, 테마는 next-themes의 effect가 적용한다.
 * (타입 속성 불일치는 next-themes가 script에 suppressHydrationWarning을 지정해 hydration 경고가 나지 않음)
 */
export function ThemeProvider(
  props: ComponentProps<typeof NextThemesProvider>,
) {
  const scriptProps =
    typeof window === "undefined" ? undefined : { type: "text/plain" };
  return <NextThemesProvider {...props} scriptProps={scriptProps} />;
}
