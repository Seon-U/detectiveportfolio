"use client";

import HighlightTitle from "@/components/ui/HighlightTitle";
import type { TimelineTrack } from "@/lib/timeline/types";
import Timeline from "./Timeline";
import TrackImage from "./TrackImage";

export default function TrackSection({
  track,
  reversed,
}: {
  track: TimelineTrack;
  reversed: boolean;
}) {
  const { image, imageAlt } = track;

  return (
    <div className="mb-20 md:mb-28 last:mb-0">
      {/* 모바일: 이미지가 타이틀 위에 (가로형) */}
      {image && (
        <div className="lg:hidden mb-8">
          <TrackImage src={image} alt={imageAlt ?? ""} mobileOnly />
        </div>
      )}

      <div
        className={`grid grid-cols-1 ${image ? "lg:grid-cols-5" : ""} gap-8 lg:gap-12 items-start`}
      >
        {/* reversed면 데스크톱에서 이미지가 왼쪽 */}
        {reversed && image && (
          <div className="hidden lg:block lg:col-span-2">
            <TrackImage src={image} alt={imageAlt ?? ""} sticky />
          </div>
        )}

        {/* 타이틀 + 타임라인 */}
        <div className={image ? "lg:col-span-3" : ""}>
          <HighlightTitle
            label={track.label}
            highlight={track.highlight}
            align={reversed ? "right" : "left"}
            className="mb-10 md:mb-14"
          />
          <Timeline items={track.items} />
        </div>

        {/* 순방향이면 데스크톱에서 이미지가 오른쪽 */}
        {!reversed && image && (
          <div className="hidden lg:block lg:col-span-2">
            <TrackImage src={image} alt={imageAlt ?? ""} sticky />
          </div>
        )}
      </div>
    </div>
  );
}
