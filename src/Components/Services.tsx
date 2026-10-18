import { useState } from "react";
import { Plus, Minus, CheckCircle2, Sparkles, Layers, Cpu, Globe } from "./Icons";
import { portfolioData } from "../data/portfolioData";
import ArchitecturalGrid from "./ArchitecturalGrid";
import ScrollOpacity from "./ScrollOpacity";
import CharReveal from "./CharReveal";

export const Services = () => {
  const [activeService, setActiveService] = useState<number>(0);

  const icons = [Globe, Cpu, Sparkles, Layers];

  return (
    <section
      id="services"
      className="relative z-10 bg-[#f4f4f0] px-6 py-24 lg:px-12 lg:py-32"
    >
      {/* 4-Column Architectural Grid */}
      <ArchitecturalGrid variant="light" />

      {/* Giant Outline Watermark Typography */}
      <p
        aria-hidden="true"
        className="text-outline pointer-events-none absolute -top-4 right-0 z-0 select-none font-display text-[16vw] leading-none lg:text-[11vw]"
      >
        SERVICES
      </p>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Heading */}
        <div>
          <div className="flex items-center gap-3">
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
              /03
            </span>
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.25em] text-neutral-700">
              Services
            </span>
            <span className="h-px flex-1 bg-neutral-900/15" />
          </div>
          <ScrollOpacity delay={0.1} startOpacity={0.2} endOpacity={1}>

            <CharReveal className="font-display mt-6 text-4xl leading-[0.95] text-neutral-900 sm:text-5xl lg:text-6xl">
              What I can engineer
            </CharReveal>

            <CharReveal className="font-display mt-6 text-4xl leading-[0.95] text-neutral-900/35">for your digital vision
            </CharReveal>
          </ScrollOpacity>
        </div>

        {/* Interactive Services Accordion */}
        <div className="mt-14 flex flex-col gap-3">
          {portfolioData.services.map((service, index) => {
            const isOpen = activeService === index;
            const IconComponent = icons[index % icons.length];

            return (
              <div
                key={service.number}
                className={`relative z-10 overflow-hidden rounded-3xl transition-all duration-500 ${isOpen
                  ? "bg-neutral-900 text-white shadow-2xl"
                  : "bg-white/60 text-neutral-900 border border-neutral-900/10 hover:border-neutral-900/25 hover:bg-white"
                  }`}
              >
                <ScrollOpacity delay={0.1} startOpacity={0.2} endOpacity={1}>
                  {/* Header Row */}
                  <div
                    onClick={() => setActiveService(isOpen ? -1 : index)}
                    className="grid cursor-pointer items-center gap-6 px-6 py-8 sm:px-10 md:grid-cols-[64px_1fr_auto] md:py-10"
                  >
                    <span
                      className={`font-grotesk text-sm tracking-[0.2em] ${isOpen ? "text-white/50" : "text-neutral-500"
                        }`}
                    >
                      {service.number}
                    </span>

                    <div className="flex items-center gap-4">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${isOpen ? "bg-white/10 text-white" : "bg-neutral-900/5 text-neutral-900"
                          }`}
                      >
                        <IconComponent size={20} />
                      </span>
                      <h3 className="font-display text-2xl uppercase tracking-tight sm:text-4xl lg:text-5xl">
                        {service.title}
                      </h3>
                    </div>

                    <div className="justify-self-end">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 ${isOpen
                          ? "border-white/25 bg-white text-neutral-900 rotate-180"
                          : "border-neutral-900/15 text-neutral-900 hover:border-neutral-900/40"
                          }`}
                      >
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Content Drawer */}
                  {isOpen && (
                    <div className="border-t border-white/10 px-6 pt-6 pb-10 sm:px-10">
                      <div className="grid items-center gap-8 md:grid-cols-[64px_1fr_auto]">
                        <span className="hidden md:block" />

                        <div>
                          <p className="max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
                            {service.description}
                          </p>

                          {/* Tech Stacks */}
                          <div className="mt-6 flex flex-wrap gap-2">
                            {service.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 font-grotesk text-xs tracking-wide text-white/85"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="hidden lg:block">
                          <div className="flex flex-col gap-2 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-md">
                            <span className="font-grotesk text-[10px] uppercase tracking-[0.2em] text-[#c9c2b4]">
                              Key Capability
                            </span>
                            <span className="font-display text-lg text-white">
                              Production Ready
                            </span>
                            <div className="flex items-center gap-1.5 font-grotesk text-xs text-emerald-400">
                              <CheckCircle2 size={13} />
                              <span>High-Performance SLA</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </ScrollOpacity>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
