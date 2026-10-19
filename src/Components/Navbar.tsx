import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "./Icons";
import { portfolioData } from "../data/portfolioData";
import ScrambleText from "./TextAnimation/ScrambleText";
export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <div
          className={`flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border px-3 py-2.5 transition-all duration-500 sm:px-4 ${isScrolled
            ? "border-neutral-900/10 bg-white/85 shadow-[0_20px_60px_-20px_rgba(17,17,17,0.2)] backdrop-blur-xl"
            : "border-neutral-900/10 bg-white/70 backdrop-blur-md"
            }`}
        >
          {/* Brand Logo */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 rounded-full px-2"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={16} strokeWidth={2.4} />
            </span>
            <span className="font-display text-sm tracking-tight text-neutral-900">
              <ScrambleText text="SAHIL" duration={500} />
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 md:flex">
            {portfolioData.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative rounded-full px-4 py-2 font-grotesk text-sm text-neutral-700 transition-colors hover:text-neutral-900"
              >
                {link.label}
                <span className="absolute inset-x-4 -bottom-px h-px origin-left scale-x-0 bg-neutral-900 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden items-center gap-3 md:flex">
            <span className="flex items-center gap-2 rounded-full bg-neutral-900/5 px-3 py-1.5 font-grotesk text-xs font-medium text-neutral-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for Projects
            </span>

            <a
              href="#contact"
              className="group flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 font-grotesk text-sm font-medium text-white transition-all duration-300 hover:bg-neutral-800 hover:shadow-lg"
            >
              Let's Talk
              <ArrowUpRight
                size={15}
                strokeWidth={2.4}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-900/10 bg-white/70 text-neutral-900 md:hidden"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-50 rounded-3xl border border-neutral-900/10 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-1">
            {portfolioData.navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-medium text-neutral-900 transition-colors hover:bg-neutral-900/5"
              >
                <span>{link.label}</span>
                <span className="font-grotesk text-xs text-neutral-400">
                  0{idx + 1}
                </span>
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-5 flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 py-3.5 font-grotesk text-sm font-medium text-white"
          >
            Let's Talk
            <ArrowUpRight size={16} />
          </a>

          <div className="mt-4 flex items-center justify-center gap-2 pt-2 text-center font-grotesk text-xs text-neutral-500">
            <span>{portfolioData.profile.location}</span>
            <span>·</span>
            <span>{portfolioData.profile.email}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
