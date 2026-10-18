import { portfolioData } from "../data/portfolioData";
import ArchitecturalGrid from "./ArchitecturalGrid";
import CharReveal from "./CharReveal";
import ScrollOpacity from "./ScrollOpacity";
import TextReveal from "./TextReveal";

export const Skills = () => {
  return (
    <section
      id="skills"
      className="relative z-10 overflow-hidden bg-[#f4f4f0] px-6 py-24 lg:px-12 lg:py-32"
    >
      {/* 4-Column Architectural Grid */}
      <ArchitecturalGrid variant="light" />

      {/* Giant Outline Watermark Typography */}
      <p
        aria-hidden="true"
        className="text-outline pointer-events-none absolute -top-4 right-0 z-0 select-none font-display text-[16vw] leading-none lg:text-[11vw]"
      >
        SKILLS
      </p>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Heading */}
        <ScrollOpacity delay={0.1} startOpacity={0.2} endOpacity={1}>
          <div>
            <div className="flex items-center gap-3">
              <span className="font-grotesk text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
                /04
              </span>
              <span className="font-grotesk text-xs font-medium uppercase tracking-[0.25em] text-neutral-700">
                Skills
              </span>
              <span className="h-px flex-1 bg-neutral-900/15" />
            </div>

            <CharReveal className="font-display mt-6 text-4xl leading-[0.95] text-neutral-900 sm:text-5xl lg:text-6xl">
              The full stack
            </CharReveal>
            <CharReveal className=" font-display mt-6 text-4xl leading-[0.95] sm:text-5xl lg:text-6xl text-neutral-900/35">behind every build</CharReveal>
          </div>

          <TextReveal className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-700 sm:text-lg">
            An end-to-end toolkit spanning the MERN stack, Next.js, secure authentication, machine learning, and GSAP motion design — engineered to bring complex digital products from concept to production.
          </TextReveal>
        </ScrollOpacity>

        {/* Infinite Marquee Ticker */}
        <div className="relative mt-14 overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee flex gap-4">
            {[...portfolioData.tickerSkills, ...portfolioData.tickerSkills].map(
              (skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className="whitespace-nowrap rounded-full border border-neutral-900/10 bg-white/70 px-5 py-2.5 font-grotesk text-xs tracking-wider text-neutral-800 backdrop-blur shadow-sm hover:border-neutral-900/30 transition-colors"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>

        {/* 4 Bento Category Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {portfolioData.skillCategories.map((category) => (
            <div
              key={category.number}
              className="group relative z-10 flex flex-col justify-between rounded-3xl border border-neutral-900/10 bg-white/60 p-7 backdrop-blur transition-all duration-500 hover:border-neutral-900/25 hover:bg-white hover:shadow-xl"
            >
              <div>
                <span className="font-grotesk text-xs font-semibold tracking-[0.2em] text-neutral-500">
                  {category.number}
                </span>

                <h3 className="font-display mt-4 text-2xl tracking-tight text-neutral-900">
                  {category.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                  {category.subtitle}
                </p>
              </div>

              {/* Skills Pills */}
              <div className="mt-8 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-neutral-900/10 bg-white px-3 py-1 font-grotesk text-[11px] tracking-wide text-neutral-700 transition-colors duration-300 group-hover:border-neutral-900/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
