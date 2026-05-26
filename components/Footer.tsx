"use client";

import { cn } from "@/lib/utils";

type FooterProps = {
  className: string;
};

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        className,
        "text-center border-t-2 border-border bg-background",
      )}
    >
      Seonukim | Contact: seonu.kim.kr@gmail.com | Github: @Seon-U | FullStack
      Dev
    </footer>
  );
}
