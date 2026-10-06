import { ArrowUpRight, Download, Mail, MapPin, Code2, Brain, Sparkles } from "./Icons";
import { portfolioData } from "../data/portfolioData";
import ArchitecturalGrid from "./ArchitecturalGrid";

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
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.25em] text-neutral-700">
              About
            </span>
            <span className="h-px flex-1 bg-neutral-900/15" />
          </div>

          <h2 className="font-display mt-6 text-4xl leading-[0.95] text-neutral-900 sm:text-5xl lg:text-6xl">
            The developer
            <br />
            <span className="text-neutral-900/35">behind the craft</span>
          </h2>
        </div>

        {/* 2-Column Luxury Layout */}
        <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
          {/* Left Column: Portrait Card */}
          <div className="relative mx-auto w-full max-w-sm lg:mx-0">
            {/* Ambient backlight */}
            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-tr from-neutral-900/5 via-transparent to-neutral-900/10 blur-2xl" />

            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-neutral-900/10 bg-neutral-100 shadow-2xl transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]">
              {/* Photo */}
              <img
                src={portfolioData.profile.photoUrl}
                alt={portfolioData.profile.name}
                className="relative h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />

              {/* Bottom Frosted Glass Card Badge */}
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-white/80 px-5 py-4 backdrop-blur-xl border border-white/40 shadow-sm">
                <div>
                  <p className="font-display text-lg leading-none text-neutral-900">
                    {portfolioData.profile.name}
                  </p>
                  <p className="mt-1 font-grotesk text-xs uppercase tracking-[0.18em] text-neutral-600">
                    {portfolioData.profile.degree}
                  </p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={17} />
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Core Disciplines */}
          <div>
            <p className="font-display text-2xl leading-snug tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
              I build responsive, user-focused interfaces with{" "}
              <span className="italic font-grotesk">React.js</span>,{" "}
              <span className="italic font-grotesk">Next.js</span>, and modern frontend tools — creating clean, polished experiences that feel effortless on every screen.
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-700 sm:text-lg">
              {portfolioData.profile.detailedBio}
            </p>

            {/* Core Pillars */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-2xl border border-neutral-900/10 bg-white/60 p-3.5 backdrop-blur">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-white">
                  <Code2 size={16} />
                </span>
                <span className="font-grotesk text-xs font-medium text-neutral-800">
                  Responsive UI Design
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-neutral-900/10 bg-white/60 p-3.5 backdrop-blur">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-white">
                  <Brain size={16} />
                </span>
                <span className="font-grotesk text-xs font-medium text-neutral-800">
                  API Integration
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-neutral-900/10 bg-white/60 p-3.5 backdrop-blur">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-white">
                  <Sparkles size={16} />
                </span>
                <span className="font-grotesk text-xs font-medium text-neutral-800">
                  Clean UX Systems
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
                  {portfolioData.profile.experienceYears} Years
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
