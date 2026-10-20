import { ArrowUpRight, Download, Mail, MapPin, Code2, Brain, Sparkles } from "./Icons";
import { portfolioData } from "../data/portfolioData";
import ArchitecturalGrid from "./ArchitecturalGrid";
import AsciiPortrait from "./AsciiPortrait";
import ScrambleText from "./TextAnimation/ScrambleText";
import ScrollOpacity from "./TextAnimation/ScrollOpacity";
import TextReveal from "./TextAnimation/TextReveal";
import { ReplayScrambleText } from "./TextAnimation/ReplayScrambleText";

export const About = () => {
  return (
    <section
      id="about"
      className="relative z-10 overflow-hidden bg-[#f4f4f0] px-6 py-24 lg:px-12 lg:py-32"
    >
      {/* Architectural Guide Lines */}
      <ArchitecturalGrid variant="light" />

      {/* Giant Outline Watermark Typography */}
      <p
        aria-hidden="true"
        className="text-outline pointer-events-none absolute -top-4 right-0 z-0 select-none font-display text-[16vw] leading-none lg:text-[11vw]"
      >
        ABOUT
      </p>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Heading */}
        <div>
          <div className="flex items-center gap-3">
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
              /01
            </span>
            <ReplayScrambleText className="font-grotesk text-xs font-medium uppercase tracking-[0.25em] text-neutral-700" text="About" duration={600} />

            <span className="h-px flex-1 bg-neutral-900/15" />
          </div>

          <ScrollOpacity delay={0.1} startOpacity={0.2} endOpacity={1}>
            <h2 className="font-display mt-6 text-4xl leading-[0.95] text-neutral-900 sm:text-5xl lg:text-6xl">
              <TextReveal delay={0.1}>
                The developer</TextReveal>
              <TextReveal delay={0.3}>
                <span className="text-neutral-900/35">behind the craft</span>
              </TextReveal>
            </h2>
          </ScrollOpacity>
        </div>

        {/* 2-Column Luxury Layout */}
        <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
          {/* Left Column: Portrait Card */}
          <div className="relative mx-auto w-full lg:mx-0">
            {/* Ambient backlight */}
            <div className="absolute -inset-5 rounded-[2.5rem] bg-linear-to-tr from-neutral-900/5 via-transparent to-neutral-900/10 blur-2xl" />

            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gray-500/10 transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]">

              {/* ASCII Portrait */}
              <div className="absolute inset-x-0 top-0 bottom-[80px]">
                <AsciiPortrait
                  src="/portrait.png"
                  name={portfolioData.profile.name}
                />
              </div>

              {/* Bottom Card — Separate from Portrait */}
              <div className="absolute bottom-0 inset-x-0 z-10 flex items-center justify-between rounded-b-2xl border border-black/40 bg-black/85 px-4 py-3 shadow-sm backdrop-blur-2xl">

                <div className="min-w-0">
                  <ScrambleText
                    text="SAHIL ALAM"
                    className="font-display text-lg leading-none text-neutral-200"
                    duration={200}
                  />

                  <div className="mt-2">
                    <ScrambleText
                      text={portfolioData.profile.degree}
                      className="font-grotesk text-xs uppercase tracking-[0.18em] text-neutral-300"
                      duration={500}
                    />
                  </div>
                </div>

                <span className="ml-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-200 transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight href={portfolioData.profile.socials[1].url} size={17} color="black" />
                </span>

              </div>
            </div>


          </div>

          {/* Right Column: Bio & Core Disciplines */}
          <div>
            <ScrollOpacity delay={0.1} startOpacity={0.2} endOpacity={1}>
              <div className="font-display text-2xl mt-20 md:mb-0 leading-snug tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
                <TextReveal>
                  I build responsive, user-focused interfaces
                </TextReveal> <TextReveal >
                  with {" "}
                  <span className="italic font-grotesk">React.js</span>,{" "}
                  <span className="italic font-grotesk">Next.js</span>, and modern frontend </TextReveal>
                <TextReveal >
                  tools — creating clean, polished </TextReveal>
                <TextReveal > experiences that feel effortless on every</TextReveal><TextReveal>screen.</TextReveal>
              </div>
            </ScrollOpacity>

            <ScrollOpacity delay={0.1} startOpacity={0.2} endOpacity={1}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-700 sm:text-lg">
                {portfolioData.profile.detailedBio}
              </p>
            </ScrollOpacity>

            {/* Core Pillars */}

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-2xl border border-neutral-900/10 bg-white/60 p-3.5 backdrop-blur">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-white">
                  <Code2 size={16} />
                </span>
                <span className="font-grotesk text-xs font-medium text-neutral-800">
                  <ScrambleText text="Responsive UI Design" duration={500} />
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-neutral-900/10 bg-white/60 p-3.5 backdrop-blur">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-white">
                  <Brain size={16} />
                </span>
                <span className="font-grotesk text-xs font-medium text-neutral-800">
                  <ScrambleText text="API Integration" duration={500} />
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-neutral-900/10 bg-white/60 p-3.5 backdrop-blur">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-white">
                  <Sparkles size={16} />
                </span>
                <span className="font-grotesk text-xs font-medium text-neutral-800">
                  <ScrambleText text="Performance Optimization" duration={200} className="text-xs" />
                </span>
              </div>
            </div>


            {/* Metadata Stats Grid */}
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 border-t border-neutral-900/10 pt-8">
              <div>
                <dt className="font-grotesk text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                  Based in
                </dt>
                <dd className="mt-2 text-sm font-medium leading-snug text-neutral-900">
                  {portfolioData.profile.location}
                </dd>
              </div>

              <div>
                <dt className="font-grotesk text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                  Experience
                </dt>
                <dd className="mt-2 text-sm font-medium leading-snug text-neutral-900">
                  {portfolioData.profile.experienceYears}
                </dd>
              </div>

              <div>
                <dt className="font-grotesk text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                  Focus
                </dt>
                <dd className="mt-2 text-sm font-medium leading-snug text-neutral-900">
                  Frontend Development
                </dd>
              </div>

              <div>
                <dt className="font-grotesk text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                  Availability
                </dt>
                <dd className="mt-2 text-sm font-medium leading-snug text-emerald-600 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Open to work
                </dd>
              </div>
            </dl>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={portfolioData.profile.resumeUrl}
                download
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-neutral-900 px-7 py-4 font-grotesk text-sm font-medium text-white transition-all duration-300 hover:shadow-lg"
              >
                <span className="absolute inset-0 -translate-x-full bg-[#c9c2b4] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative flex items-center gap-2">
                  <Download size={16} />
                  Download Resume
                </span>
                <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={13} strokeWidth={2.6} />
                </span>
              </a>

              <div className="flex flex-col gap-2 font-grotesk text-sm text-neutral-600 sm:flex-row sm:items-center sm:gap-5">
                <a
                  href={`mailto:${portfolioData.profile.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-neutral-900"
                >
                  <Mail size={15} />
                  {portfolioData.profile.email}
                </a>
                <span className="hidden h-4 w-px bg-neutral-900/15 sm:block" />
                <span className="inline-flex items-center gap-2">
                  <MapPin size={15} />
                  {portfolioData.profile.location}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
