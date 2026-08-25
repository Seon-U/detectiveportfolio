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
  const hasImage = !!track.image;

  return (
    <div className="mb-20 md:mb-28 last:mb-0">
      {/* 모바일: 이미지가 타이틀 위에 (가로형) */}
      {hasImage && track.image && (
        <div className="lg:hidden mb-8">
          <TrackImage src={track.image} alt={track.imageAlt ?? ""} mobileOnly />
        </div>
      )}

      <div
        className={`grid grid-cols-1 ${hasImage ? "lg:grid-cols-5" : ""} gap-8 lg:gap-12 items-start`}
      >
        {/* reversed면 데스크톱에서 이미지가 왼쪽 */}
        {reversed && hasImage && track.image && (
          <div className="hidden lg:block lg:col-span-2">
            <TrackImage src={track.image} alt={track.imageAlt ?? ""} sticky />
          </div>
        )}

        {/* 타이틀 + 타임라인 */}
        <div className={hasImage ? "lg:col-span-3" : ""}>
          <HighlightTitle
            label={track.label}
            highlight={track.highlight}
            align={reversed ? "right" : "left"}
            className="mb-10 md:mb-14"
          />
          <Timeline items={track.items} />
        </div>

        {/* 순방향이면 데스크톱에서 이미지가 오른쪽 */}
        {!reversed && hasImage && track.image && (
          <div className="hidden lg:block lg:col-span-2">
            <TrackImage src={track.image} alt={track.imageAlt ?? ""} sticky />
          </div>
        )}
      </div>
    </div>
  );
}
