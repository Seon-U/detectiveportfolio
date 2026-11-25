import type { Locale } from "@/lib/i18n/config";

/**
 * 커스텀 이벤트 목록 — 이벤트 이름과 props를 한곳에서 정의한다.
 * 새 이벤트는 여기에 추가하면 track()/trackAttrs()에서 이름·props가 타입 검사된다.
 * 상세 설계: docs/plan-analytics.md §5
 */
export type AnalyticsEvents = {
  /** 이력서 PDF 다운로드 버튼 클릭 */
  resume_download: { locale: Locale };
  /** 이메일(mailto) 링크 클릭 */
  email_click: { from: "closing" | "footer" };
  /** 외부 소셜 링크 클릭 */
  social_click: { type: "github" | "tistory" };

  // ── 홈 섹션 (components/analytics/HomeSectionTracker.tsx) ──
  /** 섹션에 처음 도달 (페이지뷰당 섹션별 1회). elapsed: 페이지가 보인 시간(초) */
  home_section_reach: { section: HomeSection; order: number; elapsed: number };
  /** 섹션 체류. 탭을 숨기거나 홈을 떠날 때, 그 사이 쌓인 시간을 섹션별로 보냄(1초 미만 제외) */
  home_section_dwell: {
    section: HomeSection;
    seconds: number;
    bucket: DwellBucket;
  };
  /** 마지막 섹션(Closing) 도달. skimmed: 앞 섹션 평균 체류가 2초 미만이면 true */
  home_reached_end: { elapsed: number; skimmed: boolean };
  /** 홈을 떠남. navigate: 사이트 안 다른 페이지로 이동, leave: 탭 닫기·외부 이동 */
  home_exit: {
    lastSection: HomeSection;
    type: "navigate" | "leave";
    elapsed: number;
  };

  // ── 프로젝트 목록·카드 ──
  /** 역할·태그 필터를 켬 (끌 때는 보내지 않음). from: 홈 RoleShowcase 드롭다운 / 목록 필터 칩 */
  project_filter: {
    from: "home" | "list";
    type: "role" | "tag";
    value: string;
  };
  /** 프로젝트 상세로 가는 카드·항목 클릭. position: 목록 안 1부터 시작하는 순서 */
  project_card_click: {
    projectId: string;
    position: number;
    from: "home" | "list" | "related";
  };
  /** 프로젝트 외부 링크(GitHub, 배포, 영상) 클릭 */
  outbound_click: {
    projectId: string;
    type: OutboundType;
    from: "detail" | "list";
  };

  // ── 프로젝트 상세 (components/analytics/ProjectDetailTracker.tsx) ──
  /** 상세 진입. entryRole: 들어올 때의 ?role= 값, 없으면 "none" */
  project_view: { projectId: string; entryRole: string };
  /** 섹션 체류. 탭을 숨기거나 상세를 떠날 때, 쌓인 시간을 섹션별로 보냄(1초 미만 제외) */
  detail_section_dwell: {
    projectId: string;
    sectionId: string;
    seconds: number;
    bucket: DwellBucket;
  };
  /** 마지막 섹션의 끝이 화면에 들어옴 (페이지뷰당 1회) */
  detail_complete: { projectId: string; elapsed: number };
  /** 상세 안에서 역할 필터 변경. role: 선택한 역할, 전체로 되돌리면 "all" */
  detail_role_change: { projectId: string; role: string };
  /** 섹션 탭으로 이동 */
  section_nav_click: { projectId: string; sectionId: string };

  // ── 상세 콘텐츠 블록 ──
  /** YouTube 임베드를 클릭함(재생 시작으로 추정 — iframe 안은 볼 수 없음) */
  youtube_interact: { projectId: string; videoId: string };
  /** 갤러리 이미지의 설명(+) 열기. index: 1부터 */
  gallery_caption_open: { projectId: string; index: number };

  // ── 공통 (components/analytics/PageEngagementTracker.tsx) ──
  /**
   * 페이지를 떠날 때 1회. seconds: 탭이 보인 시간, maxScroll: 최대 스크롤 깊이(%)
   * bounced: 10초 미만 + 스크롤 25% 미만으로 떠남 (빠른 이탈)
   */
  page_engagement: {
    page: PageKind;
    projectId: string;
    seconds: number;
    bucket: DwellBucket;
    maxScroll: number;
    scrollBucket: ScrollBucket;
    bounced: boolean;
    type: "navigate" | "leave";
  };
  /** 언어 전환 (다른 언어를 골랐을 때만) */
  locale_switch: { from: Locale; to: Locale };
  /** 테마 토글. to: 바뀐 뒤 테마 */
  theme_toggle: { to: "light" | "dark" };
  /** 404 화면이 나옴. path: 요청한 경로 */
  not_found: { path: string };
};

/** 외부 링크 종류 — URL로 판별 (lib/analytics/page.ts의 toOutboundType) */
export type OutboundType = "github" | "video" | "live";

/** page_engagement의 페이지 분류 (lib/analytics/page.ts) */
export type PageKind =
  | "home"
  | "projects"
  | "project_detail"
  | "not_found"
  | "other";

export type ScrollBucket = "0-25%" | "25-50%" | "50-75%" | "75-100%";

/** 홈 섹션 순서 그대로 (app/[lang]/page.tsx의 data-home-section 값) */
export const HOME_SECTIONS = [
  "hero",
  "introduction",
  "roles",
  "journey",
  "closing",
] as const;
export type HomeSection = (typeof HOME_SECTIONS)[number];

/** 대시보드 Properties 탭은 값별 건수만 보여주므로, 숫자와 함께 구간 문자열도 보낸다 */
export type DwellBucket = "1-3s" | "3-10s" | "10-30s" | "30-60s" | "60s+";

export type AnalyticsEventName = keyof AnalyticsEvents;

/** Umami 이벤트 데이터로 보낼 수 있는 값 */
export type AnalyticsPropValue = string | number | boolean;
