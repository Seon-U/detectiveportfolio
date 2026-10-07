import type { LocalizedString } from "@/lib/i18n/config";
import type { Localized } from "@/lib/i18n/localize";

export type TimelineItemSource = {
  id: string;
  /** 기간 표시 (예: "2023.03 – 2023.12") */
  period: string;
  /** 항목 제목 */
  title: LocalizedString;
  /** 한 줄 소개 */
  description: LocalizedString;
};

export type TimelineTrackSource = {
  /** 트랙 식별자 */
  id: string;
  /** 섹션 타이틀 (예: "From frontline") */
  label: LocalizedString;
  /** 타이틀 중 하이라이트 처리할 단어 */
  highlight: LocalizedString;
  /** 트랙에 대한 설명*/
  description: LocalizedString;
  /** 트랙 이미지 경로 */
  image?: string;
  /** 이미지 alt */
  imageAlt?: LocalizedString;
  /** 타임라인 항목들 */
  items: TimelineItemSource[];
};

export type TimelineItem = Localized<TimelineItemSource>;
export type TimelineTrack = Localized<TimelineTrackSource>;
