"use client";

import SocialLinks from "@/components/ui/SocialLinks";
import { cn } from "@/lib/utils";

type FooterProps = {
  className: string;
};

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        className,
        "mx-auto px-4 sm:px-6 lg:px-8 backdrop-blur-md text-center",
        "bg-background/70 dark:bg-background/60",
      )}
    >
      <div className="flex h-full justify-between items-center text-sm">
        <div className="font-serif font-bold tracking-wider">&#0169; 2026 Seonu</div>
        <SocialLinks />
      </div>
    </footer>
  );
}
