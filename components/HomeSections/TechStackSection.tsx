"use client";

import { Code, Monitor, Server } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import StackCard from "@/components/StackCard";

const techHouses = [
  {
    name: "Web",
    icon: Monitor,
    color: "from-blue-500 to-cyan-400",
    description: "UI / BFF Pattern 활용 가능",
    techs: ["React", "Next.js", "Tailwind", "Framer Motion", "Chart.js"],
  },
  {
    name: "Mobile",
    icon: Code,
    color: "from-purple-500 to-pink-400",
    description: "MVVM, MVC 이해, ScenePhase 활용",
    techs: ["Swift", "SwiftUI", "SwiftData", "AVFAudio"],
  },
  {
    name: "Backend",
    icon: Server,
    color: "from-green-500 to-emerald-400",
    description: "ERD 구성, API 설계 및 개발환경 설정 가능",
    techs: ["Node.js", "Spring Boot", "MariaDB", "AWS", "Docker"],
  },
];

export default function TechStackSection() {
  return (
    <section>
      <SectionHeader sectionTitle={"Tech Stack"} title={"What I can do"} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {techHouses.map((house, index) => (
          <StackCard key={house.name} index={index} {...house} />
        ))}
      </div>
    </section>
  );
}
