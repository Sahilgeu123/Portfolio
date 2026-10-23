import { useState } from "react";
import { portfolioData } from "../data/portfolioData";
import ArchitecturalGrid from "./ArchitecturalGrid";
import ScrambleText from "./TextAnimation/ScrambleText";
import WordReveal from "./TextAnimation/WordReveal";
import ScrollOpacity from "./TextAnimation/ScrollOpacity";
import { ReplayScrambleText } from "./TextAnimation/ReplayScrambleText";
import ProjectOrbitGrid from "./ProjectOrbitGrid";
export const Project = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "AI Apps", "E-Commerce", "3D & Web"];

  const filteredProjects =
    activeCategory === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="work"
      className="relative z-10 bg-[#f4f4f0] px-6 py-24 lg:px-12 lg:py-32"
    >
      {/* 4-Column Architectural Grid */}
      <ArchitecturalGrid variant="light" />

      {/* Giant Outline Watermark Typography */}
      <ReplayScrambleText
        aria-hidden="true"
        className="text-outline pointer-events-none absolute -top-4 right-0 z-0 select-none font-display text-[16vw] leading-none lg:text-[11vw]"
      
        text="PROJECTS"
        duration={600}
      />
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Heading */}
        <ScrollOpacity startOpacity={0.2} endOpacity={1}>

          <div>
            <div className="flex items-center gap-3">
              <span className="font-grotesk text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
                /02
              </span>
              <ReplayScrambleText className="font-grotesk text-xs font-medium uppercase tracking-[0.25em] text-neutral-700"
                text="Selected Work"
                duration={600}
              />
              <span className="h-px flex-1 bg-neutral-900/15" />
            </div>
            <WordReveal className="font-display mt-6 text-4xl leading-[0.95] text-neutral-900 sm:text-5xl lg:text-6xl">
              Selected
            </WordReveal>

            <WordReveal className="mt-6 font-display font-grotesk text-4xl italic leading-[0.95] sm:text-5xl lg:text-6xl">
              work
            </WordReveal>

            <WordReveal className="mt-6 font-display text-4xl leading-[0.95] text-neutral-900/35 sm:text-5xl lg:text-6xl">
              that speaks for itself
            </WordReveal>

          </div>
        </ScrollOpacity>
        {/* Filter Tabs & Project Count */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-900/10 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative rounded-full px-5 py-2.5 font-grotesk text-xs uppercase tracking-wider transition-all duration-300 ${isActive
                    ? "bg-neutral-900 text-white shadow-md"
                    : "bg-white/60 text-neutral-600 hover:bg-white hover:text-neutral-900 border border-neutral-900/10"
                    }`}
                >
                  <ScrambleText text={category} duration={100} />
                </button>
              );
            })}
          </div>

          <span className="font-grotesk text-xs uppercase tracking-[0.2em] text-neutral-500">
            {filteredProjects.length} Projects Shipped
          </span>
        </div>

        <ProjectOrbitGrid projects={filteredProjects} className="mt-12" />
      </div>
    </section >
  );
};

export default Project;
