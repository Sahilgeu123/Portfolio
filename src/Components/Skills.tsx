import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolioData";
import ArchitecturalGrid from "./ArchitecturalGrid";
import CharReveal from "./TextAnimation/CharReveal";
import ScrollOpacity from "./TextAnimation/ScrollOpacity";
import TextReveal from "./TextAnimation/TextReveal";
import { ReplayScrambleText } from "./TextAnimation/ReplayScrambleText";

gsap.registerPlugin(ScrollTrigger);

export const Skills = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll<HTMLElement>("[data-skill-card]");
    if (!cards?.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      cards.forEach((card, index) => {
        const disableCardTransition = () => { card.style.transition = "none"; };
        const restoreCardTransition = () => { card.style.removeProperty("transition"); };
        const outwardTilt = [-10, -4, 4, 10][index % 4];
        const outwardRoll = [-3.5, -1.2, 1.2, 3.5][index % 4];

        gsap.fromTo(
          card,
          {
            autoAlpha: 0.16,
            y: 42,
            scale: 0.97,
            z: -90,
            rotationX: 15,
            rotationY: outwardTilt,
            rotationZ: outwardRoll,
            transformPerspective: 1100,
            transformOrigin: "50% 100%",
          },
          {
            autoAlpha: 1,
            y: 0,
            z: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: () => `top ${90 - index * 4}%`,
              end: () => `top ${48 - index * 4}%`,
              scrub: 0.55,
              onEnter: disableCardTransition,
              onEnterBack: disableCardTransition,
              onLeave: restoreCardTransition,
              onLeaveBack: restoreCardTransition,
            },
          },
        );
      });
    }, cardsRef);

    return () => {
      context.revert();
      cards.forEach((card) => card.style.removeProperty("transition"));
    };
  }, []);

  return (
    <section
      id="skills"
      className="relative z-10 overflow-hidden bg-[#f4f4f0] px-6 py-24 lg:px-12 lg:py-32"
    >
      {/* 4-Column Architectural Grid */}
      <ArchitecturalGrid variant="light" />

      {/* Giant Outline Watermark Typography */}
      <ReplayScrambleText
        aria-hidden="true"
        className="text-outline pointer-events-none absolute -top-4 right-0 z-0 select-none font-display text-[16vw] leading-none lg:text-[11vw]"
      
        text="SKILLS"
        duration={600}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Heading */}
        <ScrollOpacity delay={0.1} startOpacity={0.2} endOpacity={1}>
          <div>
            <div className="flex items-center gap-3">
              <span className="font-grotesk text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
                /04
              </span>
              <ReplayScrambleText className="font-grotesk text-xs font-medium uppercase tracking-[0.25em] text-neutral-700"
                text="Skills"
                duration={600}
              />
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
        <div ref={cardsRef} className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {portfolioData.skillCategories.map((category) => (
            <div
              key={category.number}
              data-skill-card
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
