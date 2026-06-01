import Link from "next/link";
import CaseCarousel from "@/components/cases/CaseCarousel";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Case } from "@/lib/cases/types";

type Props = {
  cases: Case[];
};

export default function RecentSection({ cases }: Props) {
  return (
    <section>
      <SectionHeader
        sectionTitle={"Recent Projects"}
        title={
          <>
            See the whole Projects below
            <br />
            <Link href={"/cases"} className="text-accent border-b">
              See full Projects
            </Link>
          </>
        }
      />
      <CaseCarousel cases={cases} />
    </section>
  );
}
