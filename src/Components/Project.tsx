import { useState } from "react";
import { ArrowUpRight, ExternalLink, Github } from "./Icons";
import { portfolioData } from "../data/portfolioData";
import ArchitecturalGrid from "./ArchitecturalGrid";
import ScrambleText from "./ScrambleText";
import WordReveal from "./WordReveal";
import ScrollOpacity from "./ScrollOpacity";
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
      <p
        aria-hidden="true"
        className="text-outline pointer-events-none absolute -top-4 right-0 z-0 select-none font-display text-[16vw] leading-none lg:text-[11vw]"
      >
        PROJECTS
      </p>
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Heading */}
        <ScrollOpacity startOpacity={0.2} endOpacity={1}>

          <div>
            <div className="flex items-center gap-3">
              <span className="font-grotesk text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
                /02
              </span>
              <span className="font-grotesk text-xs font-medium uppercase tracking-[0.25em] text-neutral-700">
                Selected Work
              </span>
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

        {/* Projects Grid */}
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              className="group relative z-10 flex flex-col transition-all duration-500"
            >
              {/* Media Container with 16:10 Ratio */}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} live site in a new tab`}
                className="block overflow-hidden rounded-3xl border border-neutral-900/10 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:border-neutral-900/25"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-200">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    loading="lazy"
                  />

                  {/* Gradient Hover Reveal Overlay */}
                  <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-neutral-900/80 via-neutral-900/30 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="font-grotesk text-xs uppercase tracking-[0.2em] text-white">
                      Explore Live Demo
                    </span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-neutral-900 transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight size={19} />
                    </span>
                  </div>

                  {/* Floating Number & Category Badges */}
                  <span className="pointer-events-none absolute left-5 top-5 rounded-full bg-white/85 px-3 py-1 font-grotesk text-[11px] font-semibold tracking-[0.15em] text-neutral-900 backdrop-blur-md border border-neutral-900/5">
                    0{idx + 1}
                  </span>
                  <span className="pointer-events-none absolute right-5 top-5 rounded-full bg-neutral-900/80 px-3.5 py-1 font-grotesk text-[10px] uppercase tracking-[0.15em] text-white backdrop-blur-md">
                    {project.category}
                  </span>
                </div>
              </a>

              {/* Project Info Block */}
              <div className="mt-6 px-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl tracking-tight text-neutral-900 transition-colors group-hover:text-neutral-700 sm:text-3xl">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        {project.title}
                      </a>
                    </h3>
                    <p className="mt-1.5 font-grotesk text-xs uppercase tracking-[0.18em] text-neutral-500">
                      {project.summary}
                    </p>
                  </div>
                  <span className="shrink-0 pt-1 font-grotesk text-xs font-semibold text-neutral-600">
                    {project.year}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-neutral-900/10 bg-white/70 px-3 py-1 font-grotesk text-[11px] tracking-wide text-neutral-700 backdrop-blur"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex items-center gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 font-grotesk text-xs uppercase tracking-wider text-white transition-all duration-300 hover:bg-neutral-800"
                  >
                    <span>Live Demo</span>
                    <ExternalLink
                      size={13}
                      className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-900/15 bg-white/60 px-5 py-2.5 font-grotesk text-xs uppercase tracking-wider text-neutral-800 transition-all duration-300 hover:bg-white hover:border-neutral-900/40 hover:text-neutral-900"
                  >
                    <Github size={13} />
                    <span>Source Code</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section >
  );
};

export default Project;
