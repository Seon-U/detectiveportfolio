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
        "backdrop-blur-md text-center border-t-2 border-border",
      )}
    >
      Seonukim | Contact: seonu.kim.kr@gmail.com | Github: @Seon-U | FullStack
      Dev
    </footer>
  );
}
