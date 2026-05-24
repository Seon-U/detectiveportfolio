"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type FooterProps = {
  className: string;
};

export default function Footer({ className }: FooterProps) {
  const { theme } = useTheme();

  return (
    <footer
      className={cn(
        className,
        "text-center border-t-2",
        "border-header-border",
      )}
    >
      Seonukim | Contact: seonu.kim.kr@gmail.com | Github: @Seon-U | FullStack
      Dev
    </footer>
  );
}
