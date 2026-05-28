import Link from "next/link";
import type { Case } from "@/lib/cases/data";
import CaseCarousel from "../CaseCarousel";
import SectionHeader from "../SectionHeader";

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
