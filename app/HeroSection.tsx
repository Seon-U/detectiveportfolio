"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const { theme } = useTheme();

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
              "text-6xl md:text-8xl lg:text-9xl font-serif font-black tracking-tighter uppercase",
              theme === "dark"
                ? "text-transparent bg-clip-text bg-linear-to-r from-[#66fcf1] to-[#45a29e]"
                : "text-[#3e2723]",
            )}
          >
            SeonuKim
          </h1>
          <p
            className={cn(
              "text-xl md:text-2xl mt-4 font-serif italic tracking-wide flex items-center gap-2",
              theme === "dark" ? "text-[#c5c6c7]" : "text-[#5d4037]",
            )}
          >
            FullStack Dev | UX | Web | Mobile |
            {theme === "dark" && " fluent in Korean"}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
        animate={{ opacity: 1, rotate: 2, scale: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="relative group cursor-pointer z-10"
      >
        <div
          className={cn(
            "absolute -inset-1 rounded-sm blur opacity-20 group-hover:opacity-100 transition duration-1000",
            theme === "dark" ? "bg-[#66fcf1]" : "bg-[#8b5a2b]",
          )}
        ></div>
        <div
          className={cn(
            "relative w-72 h-96 p-4 rounded-sm shadow-2xl transform transition-transform duration-500 group-hover:-rotate-2",
            theme === "dark"
              ? "bg-[#1f2833] border border-[#45a29e]/50"
              : "bg-[#fff9e6] border-2 border-[#d4c39f]",
          )}
        >
          <Image
            src={"/profile.png"}
            alt="Profile"
            width={100}
            height={100}
            className="w-full h-48 object-cover grayscale sepia-[.3] contrast-125 rounded-sm"
          />
          <div className="mt-6 space-y-2 text-sm">
            <p
              className={cn(
                "border-b pb-1",
                theme === "dark"
                  ? "border-[#45a29e]/30 text-[#66fcf1]"
                  : "border-[#8b5a2b]/30 text-[#8b5a2b]",
              )}
            >
              <span className="font-bold">SPECIALTY:</span> React Architecture
            </p>
            <p
              className={cn(
                "border-b pb-1",
                theme === "dark"
                  ? "border-[#45a29e]/30 text-[#c5c6c7]"
                  : "border-[#8b5a2b]/30 text-[#5d4037]",
              )}
            >
              <span className="font-bold">ALIAS:</span> @Seon-U
            </p>
            <p
              className={cn(
                "border-b pb-1",
                theme === "dark"
                  ? "border-[#45a29e]/30 text-[#c5c6c7]"
                  : "border-[#8b5a2b]/30 text-[#5d4037]",
              )}
            >
              <span className="font-bold">STATUS:</span> Open Positoin
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
