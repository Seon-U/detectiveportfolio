import type { OutboundType, PageKind, ScrollBucket } from "./events";

/**
 * 경로로 페이지 종류와 프로젝트 id를 판별한다. 404는 경로만으로 알 수 없으므로
 * 화면의 [data-not-found] 표시를 함께 본다 (app/[lang]/not-found.tsx).
 * 예: "/ko" → home, "/en/projects/001" → project_detail + "001"
 */
export function classifyPage(
  pathname: string,
  isNotFound: boolean,
): { page: PageKind; projectId: string } {
  if (isNotFound) return { page: "not_found", projectId: "" };
  const parts = pathname.split("/").filter(Boolean); // [lang, ...rest]
  if (parts.length === 1) return { page: "home", projectId: "" };
  if (parts[1] === "projects") {
    if (parts.length === 2) return { page: "projects", projectId: "" };
    if (parts.length === 3)
      return { page: "project_detail", projectId: parts[2] };
  }
  return { page: "other", projectId: "" };
}

export function toScrollBucket(percent: number): ScrollBucket {
  if (percent < 25) return "0-25%";
  if (percent < 50) return "25-50%";
  if (percent < 75) return "50-75%";
  return "75-100%";
}

/** 지금 화면 아래쪽 끝이 문서의 몇 %까지 내려왔는지 (0~100) */
export function currentScrollPercent(): number {
  const total = document.documentElement.scrollHeight;
  if (total <= 0) return 100;
  const seen = window.scrollY + window.innerHeight;
  return Math.min(100, Math.round((seen / total) * 100));
}

/** 외부 링크 URL → 종류 */
export function toOutboundType(url: string): OutboundType {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host === "github.com") return "github";
    if (host === "youtube.com" || host === "youtu.be" || host === "vimeo.com")
      return "video";
  } catch {
    // 상대 경로 등 — 배포 링크로 취급
  }
  return "live";
}
