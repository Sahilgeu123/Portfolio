import { ArrowUpRight, ArrowUp } from "./Icons";
import { portfolioData } from "../data/portfolioData";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#111111] px-6 pt-16 pb-12 text-white lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Top 3-Column Layout */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Column 1: Brand & Bio */}
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-900">
                <ArrowUpRight size={17} strokeWidth={2.4} />
              </span>
              <span className="font-display text-xl tracking-tight text-white">
                SAHIL ALAM
              </span>
            </a>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              {portfolioData.profile.tagline} Currently based in {portfolioData.profile.location}.
            </p>

            {/* Social Pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {portfolioData.profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 font-grotesk text-xs text-white/70 transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/5"
                >
                  <span>{social.label}</span>
                  <ArrowUpRight size={12} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <p className="font-grotesk text-xs uppercase tracking-[0.25em] text-white/40">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              {portfolioData.navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-[#c9c2b4] transition-all duration-300 group-hover:w-4" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Rights */}
          <div>
            <p className="font-grotesk text-xs uppercase tracking-[0.25em] text-white/40">
              Direct Contact
            </p>
            <a
              href={`mailto:${portfolioData.profile.email}`}
              className="mt-5 block text-sm text-white/75 transition-colors hover:text-[#c9c2b4]"
            >
              {portfolioData.profile.email}
            </a>
            <p className="mt-2 text-sm text-white/50">{portfolioData.profile.location}</p>
            <p className="mt-1 text-xs text-white/40">{portfolioData.profile.university}</p>

            <p className="mt-6 font-grotesk text-xs uppercase tracking-[0.2em] text-white/40">
              {currentYear} © All rights reserved
            </p>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="font-grotesk text-xs tracking-wide text-white/40">
            Designed & engineered with obsession by Sahil Alam
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 font-grotesk text-xs uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-white cursor-pointer"
          >
            <span>Back to top</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-transform duration-300 group-hover:-translate-y-1 group-hover:border-white/40 group-hover:bg-white/10">
              <ArrowUp size={13} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
