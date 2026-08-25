export type TimelineItem = {
  id: string;
  /** 기간 표시 (예: "2023.03 – 2023.12") */
  period: string;
  /** 항목 제목 */
  title: string;
  /** 한 줄 소개 */
  description: string;
};

export type TimelineTrack = {
  /** 트랙 식별자 */
  id: string;
  /** 섹션 타이틀 (예: "From frontline") */
  label: string;
  /** 타이틀 중 하이라이트 처리할 단어 */
  highlight: string;
  /** 트랙 이미지 경로 */
  image?: string;
  /** 이미지 alt */
  imageAlt?: string;
  /** 타임라인 항목들 */
  items: TimelineItem[];
};
