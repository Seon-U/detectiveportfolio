import { TIMELINE_TRACKS } from "@/lib/timeline/data";
import TrackSection from "./timeline/TrackSection";

export default function LearningJourneySection() {
  return (
    <section
      id="intro"
      data-screen-label="02 Intro"
      className="relative z-5 px-4 md:px-8 lg:px-12 pt-[10vh] pb-[8vh]"
    >
      <div className="mx-auto max-w-7xl">
        {TIMELINE_TRACKS.map((track, idx) => (
          <TrackSection key={track.id} track={track} reversed={idx % 2 !== 0} />
        ))}
      </div>
    </section>
  );
}
