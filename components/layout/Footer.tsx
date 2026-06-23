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
        "mx-auto px-4 sm:px-6 lg:px-8 backdrop-blur-md text-center border-t-2 border-border",
      )}
    >
      <div className="flex h-full justify-between items-center text-sm">
        <div>&#0169; 2026 Seonu</div>
        <div className="tracking-widest">Editorial x Engineering</div>
      </div>
    </footer>
  );
}
