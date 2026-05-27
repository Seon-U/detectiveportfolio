import type { ReactNode } from "react";
import styles from "@/app/learningJourney.module.css";
import { cn } from "@/lib/utils";

type NoteProps = {
  children: ReactNode;
  /** Layout classes for the outer note (position, rotation, max-width). */
  className?: string;
  /** Extra paper styling, e.g. the polaroid variant. */
  paperClassName?: string;
  /** Pin corner. Defaults to a centered pin. */
  pin?: "topleft" | "topright";
};

export function Note({ children, className, paperClassName, pin }: NoteProps) {
  return (
    <div
      className={cn(
        className,
        "z-2 max-[1100px]:static max-[1100px]:max-w-full",
      )}
    >
      <div className={cn(styles.paper, paperClassName)}>
        <span
          className={cn(
            styles.pin,
            pin === "topleft" && styles.topleft,
            pin === "topright" && styles.topright,
          )}
          aria-hidden="true"
        />
        {children}
      </div>
    </div>
  );
}
