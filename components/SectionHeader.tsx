import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./HomeSections/learningJourney.module.css";

type Props = {
  sectionTitle: ReactNode;
  title: ReactNode;
};

export default function SectionHeader({ sectionTitle, title }: Props) {
  return (
    <div className={cn(styles.intro, "mx-auto mb-15 max-w-190 text-center")}>
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-(--cork-rule)" />
        <span className="text-xs tracking-[0.3em] text-(--cork-accent)">
          ✦ ✦ ✦
        </span>
        <span className="h-px flex-1 bg-(--cork-rule)" />
      </div>
      <h2 className={cn(styles.eyebrow, "mt-6 mb-4")}>{sectionTitle}</h2>
      <p className={cn(styles.title)}>{title}</p>
    </div>
  );
}
