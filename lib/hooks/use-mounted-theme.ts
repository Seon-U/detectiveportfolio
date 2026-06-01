"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * next-themes의 hydration 안전 패턴.
 * mounted가 false인 동안에는 theme을 신뢰할 수 없으므로 isDark는 false로 둔다.
 */
export function useMountedTheme() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    theme,
    setTheme,
    resolvedTheme,
    mounted,
    isDark: mounted && theme === "dark",
  };
}
