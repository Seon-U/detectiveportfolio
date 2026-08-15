"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMountedTheme } from "@/lib/hooks/useMountedTheme";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const { isDark } = useMountedTheme();

  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-center gap-12 md:gap-30 pt-10">
      <div className="space-y-6 z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1
            className={cn(
              "text-6xl md:text-8xl lg:text-9xl font-serif font-black tracking-tighter uppercase text-center",
              isDark
                ? "text-transparent bg-clip-text bg-linear-to-r from-accent to-primary"
                : "text-transparent bg-clip-text bg-linear-to-r from-(--orange-400) to-accent",
            )}
          >
            SeonuKim
          </h1>
          <p className="text-xl md:text-2xl mt-4 font-serif italic tracking-wide flex items-center gap-2 text-muted-foreground">
            문제의 원인을 끝까지 추적하고 개선하는 개발자입니다.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
        animate={{ opacity: 1, rotate: 2, scale: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="relative group cursor-pointer z-10"
      >
        <div className="absolute -inset-1 rounded-sm blur opacity-20 group-hover:opacity-100 transition duration-1000 bg-primary" />
        <div className="relative w-72 h-96 p-4 rounded-sm shadow-2xl transform transition-transform duration-500 group-hover:-rotate-2 bg-card border-2 border-border">
          <Image
            loading="lazy"
            src={"/profile.webp"}
            alt="Profile"
            width={288}
            height={192}
            sizes="288px"
            className="w-full h-48 object-cover grayscale sepia-[.3] contrast-125 rounded-sm"
          />
          <div className="mt-6 space-y-2 text-sm">
            <p className="border-b pb-1 border-border/30 text-primary">
              <span className="font-bold">SPECIALTY:</span> React Architecture
            </p>
            <p className="border-b pb-1 border-border/30 text-muted-foreground">
              <span className="font-bold">ALIAS:</span> @Seon-U
            </p>
            <p className="border-b pb-1 border-border/30 text-muted-foreground">
              <span className="font-bold">STATUS:</span> Open to Work
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
