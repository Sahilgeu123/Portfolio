import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight, ArrowDown, Compass, Terminal } from "./Icons";
import { portfolioData } from "../data/portfolioData";
import TopologyMesh from "./TopologyMesh";
import ArchitecturalGrid from "./ArchitecturalGrid";
import ScrambleText from "./TextAnimation/ScrambleText";
import { ReplayScrambleText } from "./TextAnimation/ReplayScrambleText";
export const Home = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subtextRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const chipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal timeline for hero elements
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-watermark", {
        opacity: 0,
        y: 60,
        duration: 1.4,
      })
        .from(
          ".hero-tagline",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=1.0"
        )
        .from(
          headlineRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 1.0,
          },
          "-=0.7"
        )
        .from(
          subtextRef.current,
          {
            opacity: 0,
            y: 25,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          chipRef.current,
          {
            opacity: 0,
            scale: 0.92,
            y: 30,
            duration: 0.9,
          },
          "-=0.6"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#f4f4f0] px-6 pt-32 pb-16 lg:px-12 lg:pt-36"
    >
      {/* 4-Column Architectural Grid with Lasers */}
      <ArchitecturalGrid variant="light" />

      {/* Interactive 3D Canvas Topology Mesh */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto">
        <TopologyMesh className="h-full w-full" theme="light" interactive={true} />
      </div>

      {/* Giant Outline Watermark Typography */}
      <h1
        aria-hidden="true"
        className="hero-watermark text-outline pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 select-none whitespace-nowrap text-center font-display text-[25vw] leading-none opacity-40 lg:text-[21vw]"
      >
        DEVELOPER
      </h1>

      {/* Concentric Architectural Halo Ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-900/5"
      />

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Top Minimal Editorial Tag */}
        <div className="hero-tagline flex items-center justify-center gap-3 font-grotesk text-xs uppercase tracking-[0.3em] text-neutral-600 sm:justify-start">
          <span className="h-px w-8 bg-neutral-900/30" />
          <span className="flex items-center gap-1.5">
            <Compass size={13} className="text-neutral-700 animate-spin" style={{ animationDuration: "12s" }} />
            {portfolioData.profile.role}
          </span>
          <span className="h-px w-8 bg-neutral-900/30 sm:hidden" />
        </div>

        {/* Hero Grid Layout */}
        <div className="mt-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          {/* Left Column: Bold Titles & CTAs */}
          <div>
            <h2
              ref={headlineRef}
              className="font-display text-5xl font-extrabold leading-[0.94] tracking-tight text-neutral-900 sm:text-7xl lg:text-8xl"
            >
              Building
              <br />
              <span className="italic font-normal font-grotesk">responsive</span>
              <br />
              <span className="relative inline-block">
                web experiences.
                {/* Handcrafted animated underline curve */}
                <svg
                  viewBox="0 0 220 12"
                  fill="none"
                  className="absolute -bottom-2 left-0 w-full"
                  aria-hidden="true"
                >
                  <path
                    d="M3 9C60 3 160 3 217 9"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    className="text-neutral-900/25"
                  />
                </svg>
              </span>
            </h2>

            <p
              ref={subtextRef}
              className="mt-8 max-w-xl text-base leading-relaxed text-neutral-700 sm:text-lg"
            >
              Hi, I'm <strong className="font-semibold text-neutral-900">{portfolioData.profile.name}</strong>. {portfolioData.profile.pitch}
            </p>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#work"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-neutral-900 px-7 py-4 font-grotesk text-sm font-medium text-white transition-all duration-300 hover:shadow-xl"
              >
                <span className="absolute inset-0 -translate-x-full bg-[#c9c2b4] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative flex items-center gap-2">
                  View Selected Work
                </span>
                <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={13} strokeWidth={2.6} />
                </span>
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-neutral-900/15 bg-white/50 px-6 py-4 font-grotesk text-sm font-medium text-neutral-800 backdrop-blur transition-all duration-300 hover:border-neutral-900/40 hover:bg-white hover:text-neutral-900"
              >
                Let's Collaborate
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <a
                href={portfolioData.profile.socials.find((s) => s.label === "GitHub")?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-grotesk text-xs uppercase tracking-[0.2em] text-neutral-600 transition-colors hover:text-neutral-900 px-3 py-2"
              >
                <Terminal size={14} />
                <ScrambleText text="GitHub Repos" duration={500} />
              </a>
            </div>

            {/* Social Links List */}
            <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-neutral-900/10 pt-6">
              <span className="font-grotesk text-xs uppercase tracking-[0.2em] text-neutral-500">
                Connect:
              </span>
              {portfolioData.profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 font-grotesk text-xs font-medium text-neutral-700 transition-colors hover:text-neutral-900"
                >
                  <span><ReplayScrambleText className="" text={social.label} duration={400} /></span>
                  <ArrowUpRight
                    size={11}
                    className="opacity-40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Profile Card / Preview Chip */}
          <div ref={chipRef} className="relative mx-auto w-full max-w-sm lg:mx-0">
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-6 rounded-[3rem] bg-linear-to-tr from-neutral-900/5 via-transparent to-neutral-900/15 blur-2xl" />

            <div className="group relative overflow-hidden rounded-3xl border border-neutral-900/10 bg-white/80 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-neutral-900/25">
              {/* Photo & Status */}
              <div className="relative aspect-[4/4.8] w-full overflow-hidden rounded-2xl bg-neutral-200">
                <img
                  src={portfolioData.profile.photoUrl}
                  alt={portfolioData.profile.name}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback avatar if local image path fails
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />

                {/* Floating Top Tag */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-neutral-900/75 px-3 py-1 font-grotesk text-[10px] uppercase tracking-[0.15em] text-white backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>CS Engineer & AI</span>
                </div>

                {/* Bottom Overlay Pill */}
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-xl bg-white/80 px-4 py-3 backdrop-blur-md">
                  <div>
                    <p className="font-display text-sm text-neutral-900">
                      <ScrambleText text="SAHIL ALAM" duration={300} />
                    </p>
                    <p className="font-grotesk text-[10px] uppercase tracking-[0.15em] text-neutral-600">
                      <ScrambleText text="Graphic Era University" duration={300} />
                    </p>
                  </div>
                  <a
                    href="#about"
                    aria-label="Scroll to About"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white transition-transform duration-500 group-hover:rotate-45"
                  >
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="mt-5 grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl border border-neutral-900/5 bg-neutral-50/70 p-3">
                  <span className="font-grotesk text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                    Experience
                  </span>
                  <p className="font-display mt-1 text-lg text-neutral-900">
                    <ScrambleText text={portfolioData.profile.experienceYears} duration={300} />
                  </p>
                </div>
                <div className="rounded-xl border border-neutral-900/5 bg-neutral-50/70 p-3">
                  <span className="font-grotesk text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                    Worked On
                  </span>
                  <p className="font-display mt-1 text-lg text-neutral-900">
                    {portfolioData.profile.projectsCount} Projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 mx-auto mt-12 flex max-w-7xl items-center justify-between border-t border-neutral-900/10 pt-6">
        <a
          href="#about"
          className="group inline-flex items-center gap-2 font-grotesk text-xs uppercase tracking-[0.25em] text-neutral-600 transition-colors hover:text-neutral-900"
        >
          <span>Explore Portfolio</span>
          <ArrowDown
            size={13}
            className="transition-transform duration-300 group-hover:translate-y-1"
          />
        </a>

        <div className="flex items-center gap-2 font-grotesk text-xs text-neutral-500">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Active in Dehradun, India · Working Worldwide</span>
        </div>
      </div>
    </section>
  );
};

export default Home;
