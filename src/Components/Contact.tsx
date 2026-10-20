import { useState } from "react";
import { ArrowUpRight, Mail, Copy, Check, Send, MapPin } from "./Icons";
import { portfolioData } from "../data/portfolioData";
import ArchitecturalGrid from "./ArchitecturalGrid";
import CharReveal from "./TextAnimation/CharReveal";
import TextReveal from "./TextAnimation/TextReveal";
import ScrollOpacity from "./TextAnimation/ScrollOpacity"
export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioData.profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${portfolioData.profile.email}`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${portfolioData.profile.email}?subject=${encodeURIComponent(
      formData.subject || `Project Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <section
      id="contact"
      className="relative z-10 overflow-hidden bg-[#111111] px-6 pt-24 pb-28 text-white lg:px-12"
    >
      {/* 4-Column Architectural Grid in Dark Variant */}
      <ArchitecturalGrid variant="dark" />

      {/* Giant Outline Watermark Typography */}
      <p
        aria-hidden="true"
        className="text-outline-dark pointer-events-none absolute inset-x-0 top-6 z-0 select-none text-center font-display text-[17vw] leading-none"
      >
        LET'S TALK
      </p>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header Block */}

        <ScrollOpacity className="flex flex-col justify-center items-center text-center" startOpacity={0.2} endOpacity={1}>
          <div className="flex items-center gap-2 font-grotesk text-xs uppercase tracking-[0.3em] text-white/50">
            <span className="h-px w-8 bg-white/25" />
            <CharReveal>Have a project in mind?</CharReveal>
            <span className="h-px w-8 bg-white/25" />
          </div>

          <CharReveal className="font-display mt-8 text-5xl leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl" delay={0.1}>
            HAVE A PROJECT
          </CharReveal>
          <TextReveal className=" italic font-grotesk text-[#c9c2b4]">in mind?</TextReveal>


          <div className=" mt-8 max-w-md text-base leading-relaxed text-white/65">
            <TextReveal>
              Let's turn your idea into a high-end digital experience. I'm currently accepting new projects, AI research collaborations, and engineering roles.
            </TextReveal>
          </div>

          {/* Direct One-Click Copy & Email Action */}
          <TextReveal className="mt-10 flex flex-wrap items-center justify-center gap-4" delay={0.3}>

            <button
              onClick={handleCopyEmail}
              className={`group flex items-center gap-3 rounded-full border px-8 py-4 font-grotesk text-sm font-medium transition-all duration-300 ${copied
                ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-300"
                : "border-white/20 bg-white/5 text-white hover:border-[#c9c2b4] hover:bg-white/10"
                }`}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? "Email Copied to Clipboard!" : "Copy Email Address"}</span>
            </button>

            <a
              href={`mailto:${portfolioData.profile.email}`}
              className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 font-grotesk text-sm font-semibold text-neutral-900 transition-all duration-300 hover:shadow-xl"
            >
              <span className="absolute inset-0 -translate-x-full bg-[#c9c2b4] transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative flex items-center gap-2">
                <Mail size={16} />
                Send Direct Email
              </span>
              <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-white transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight size={13} strokeWidth={2.6} />
              </span>
            </a>
          </TextReveal>


          <p className="mt-4 font-grotesk text-xs tracking-wide text-white/40">
            {portfolioData.profile.email} — typically responds within 24 hours
          </p>
        </ScrollOpacity>

        {/* Contact Form & Social Details Grid */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr]">
          {/* Left: Contact Channels */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
            <div>
              <span className="font-grotesk text-xs uppercase tracking-[0.2em] text-[#c9c2b4]">
                Reach Out Anywhere
              </span>

              <h3 className="font-display mt-3 text-3xl text-white">
                Let's connect & build.
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Whether you want to discuss full-stack web applications, agentic AI pipelines, 3D interactive experiences, or explore new opportunities, my inbox is always open.
              </p>

              {/* Information Badges */}
              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm text-white/75">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#c9c2b4]">
                    <MapPin size={17} />
                  </span>
                  <div>
                    <p className="font-medium text-white">{portfolioData.profile.location}</p>
                    <p className="text-xs text-white/50">{portfolioData.profile.university}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-white/75">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#c9c2b4]">
                    <Mail size={17} />
                  </span>
                  <div>
                    <p className="font-medium text-white">{portfolioData.profile.email}</p>
                    <p className="text-xs text-white/50">Primary contact channel</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials Link Row */}
            <div className="mt-10 border-t border-white/10 pt-6">
              <span className="font-grotesk text-xs uppercase tracking-[0.2em] text-white/40 block mb-3">
                Social Profiles
              </span>
              <div className="flex flex-wrap gap-2">
                {portfolioData.profile.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-grotesk text-xs text-white/80 transition-all hover:border-[#c9c2b4] hover:text-white hover:bg-white/10"
                  >
                    <span>{social.label}</span>
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="font-grotesk text-xs uppercase tracking-[0.18em] text-white/60">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Sahil Alam"
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#c9c2b4] focus:bg-white/10"
                />
              </div>

              <div>
                <label className="font-grotesk text-xs uppercase tracking-[0.18em] text-white/60">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@company.com"
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#c9c2b4] focus:bg-white/10"
                />
              </div>
            </div>

            <div>
              <label className="font-grotesk text-xs uppercase tracking-[0.18em] text-white/60">
                Subject
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Product design, AI consultation, or engineering"
                className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#c9c2b4] focus:bg-white/10"
              />
            </div>

            <div>
              <label className="font-grotesk text-xs uppercase tracking-[0.18em] text-white/60">
                Project Details
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about what you'd like to build, timeline, and goals..."
                className="mt-2 w-full resize-none rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#c9c2b4] focus:bg-white/10"
              />
            </div>

            <button
              type="submit"
              className="group mt-2 flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 font-grotesk text-sm font-semibold text-neutral-900 transition-all duration-300 hover:bg-[#c9c2b4] hover:shadow-xl"
            >
              <Send size={15} />
              <span>{submitted ? "Message Dispatched!" : "Send Message"}</span>
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
