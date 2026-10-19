import {  useState } from "react";
import { ArrowUpRight, GraduationCap, Code, Rocket, BookOpen } from "./Icons";
import { portfolioData } from "../data/portfolioData";
import ArchitecturalGrid from "./ArchitecturalGrid";
import ScrollOpacity from "./TextAnimation/ScrollOpacity"
import { ReplayScrambleText } from "./TextAnimation/ReplayScrambleText";



export const Journey = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const getIcon = (kind: string) => {
    switch (kind) {
      case "Education":
        return <GraduationCap size={15} />;
      case "Development":
        return <Code size={15} />;
      case "Freelance":
        return <Rocket size={15} />;
      default:
        return <BookOpen size={15} />;
    }
  };

  return (
    <section
      id="journey"
      className="relative z-10 overflow-hidden bg-[#111111] text-white px-6 py-24 lg:px-12 lg:py-32"
    >
      {/* 4-Column Architectural Grid in Dark Mode */}
      <ArchitecturalGrid variant="dark" />

      {/* Top Gradient Transition from Light Section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-32 bg-gradient-to-b from-[#f4f4f0] to-transparent opacity-10" />

      {/* Giant Outline Watermark Typography */}
      <ReplayScrambleText
        aria-hidden="true"
        className="text-outline-dark pointer-events-none absolute -top-6 right-0 z-0 select-none font-display text-[16vw] leading-none lg:text-[11vw]"
      
        text={"JOURNEY"}
        duration={600}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Heading */}
        <div>
          <div className="flex items-center gap-3">
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.25em] text-white/50">
              /05
            </span>
            <ReplayScrambleText className="font-grotesk text-xs font-medium uppercase tracking-[0.25em] text-white/70"
              text="Journey & Milestones"
              duration={400}
            />
            <span className="h-px flex-1 bg-white/15" />
          </div>

          <h2 className="font-display mt-6 text-4xl leading-[0.95] text-white sm:text-5xl lg:text-6xl">
            Years of
            <br />
            <span className="text-white/35">engineering the web</span>
          </h2>
        </div>

        {/* Experience Counter Chip */}
        <div className="mt-12 inline-flex items-end rounded-3xl border border-white/15 bg-white/5 px-7 py-5 backdrop-blur-md">
          <ReplayScrambleText text={portfolioData.profile.experienceYears} className="font-display text-5xl leading-none text-[#c9c2b4] sm:text-6xl" duration={600} />
          <span className="mb-1  font-grotesk text-xs uppercase tracking-[0.22em] text-white/60">

            <br />

          </span>
        </div>

        {/* Interactive Timeline List */}
        <div className="mt-14 flex flex-col">
          {portfolioData.journey.map((item, index) => {
            const isHovered = hoveredIdx === index;

            return (
              <div
                key={`${item.organization}-${index}`}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Timeline Anchor Node */}
                <ScrollOpacity className={`py-10 group relative grid cursor-default grid-cols-1 gap-4 border-t border-white/12  transition-all duration-500 md:grid-cols-[1.2fr_2fr_auto] md:items-baseline md:gap-8 ${isHovered ? "border-white/40 bg-white/[0.02]" : "hover:border-white/30"
                  }`} startOpacity={0.5} endOpacity={1} >
                  <span className="absolute -top-[5px] left-0 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="absolute h-2.5 w-2.5 rounded-full bg-white/25 transition-all duration-500 group-hover:bg-[#c9c2b4]" />
                    <span className="absolute h-1 w-1 rounded-full bg-white transition-colors duration-500 group-hover:bg-[#111111]" />
                  </span>

                  {/* Left: Period & Tag */}
                  <div className="flex flex-col gap-2.5">
                    <p className="font-grotesk text-sm uppercase tracking-[0.2em] text-white/50 transition-colors duration-500 group-hover:text-[#c9c2b4]">
                      {item.period}
                    </p>
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 font-grotesk text-[10px] uppercase tracking-[0.18em] text-white/60">
                      {getIcon(item.kind)}
                      {item.kind}
                    </span>
                  </div>

                  {/* Center: Details */}
                  <div>
                    <h3 className="font-display text-2xl tracking-tight text-white transition-colors duration-500 group-hover:text-[#c9c2b4] sm:text-3xl">
                      {item.organization}
                    </h3>
                    <p className="mt-1.5 font-grotesk text-sm font-medium tracking-wide text-white/70">
                      {item.role}
                    </p>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
                      {item.summary}
                    </p>

                    {/* Highlights */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-grotesk text-[11px] text-white/60"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Interactive Arrow */}
                  <div className="flex items-center justify-start md:justify-end">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#c9c2b4] group-hover:text-[#c9c2b4]">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </ScrollOpacity>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Journey;
