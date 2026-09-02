import type { ProjectSection } from "@/lib/projects/types";
import SimpleSection from "./SimpleSection";
import FeatureSection from "./FeatureSection";
import SplitSection from "./SplitSection";

/** ProjectSection의 layout variant에 따라 적절한 레이아웃 컴포넌트로 라우팅 */
export default function SectionRenderer({
  section,
}: {
  section: ProjectSection;
}) {
  switch (section.layout) {
    case "simple":
      return (
        <SimpleSection
          heading={section.heading}
          description={section.description}
          blocks={section.blocks}
        />
      );
    case "feature":
      return (
        <FeatureSection
          heading={section.heading}
          features={section.features}
        />
      );
    case "split":
      return (
        <SplitSection
          heading={section.heading}
          description={section.description}
          blocks={section.blocks}
        />
      );
    default: {
      const _exhaustive: never = section;
      return null;
    }
  }
}
