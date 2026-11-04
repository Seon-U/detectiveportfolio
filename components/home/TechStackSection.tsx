"use client";

import { Code, Monitor, Server } from "lucide-react";
import { useDictionary } from "@/components/i18n/DictionaryProvider";
import SectionHeader from "@/components/ui/SectionHeader";
import StackCard from "./StackCard";

const techHouses = [
  {
    key: "web" as const,
    icon: Monitor,
    color: "from-blue-500 to-cyan-400",
    techs: ["React", "Next.js", "Tailwind", "Framer Motion", "Chart.js"],
  },
  {
    key: "mobile" as const,
    icon: Code,
    color: "from-purple-500 to-pink-400",
    techs: ["Swift", "SwiftUI", "SwiftData", "AVFAudio"],
  },
  {
    key: "backend" as const,
    icon: Server,
    color: "from-green-500 to-emerald-400",
    techs: ["Node.js", "Spring Boot", "MariaDB", "AWS", "Docker"],
  },
];

export default function TechStackSection() {
  const { techStack } = useDictionary();
  return (
    <section>
      <SectionHeader
        sectionTitle={techStack.sectionTitle}
        title={techStack.title}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {techHouses.map(({ key, ...house }, index) => (
          <StackCard
            key={key}
            index={index}
            name={techStack[key].name}
            description={techStack[key].description}
            {...house}
          />
        ))}
      </div>
    </section>
  );
}
