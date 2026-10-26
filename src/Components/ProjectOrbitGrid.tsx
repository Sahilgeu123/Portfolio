import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProjectItem } from "../data/portfolioData";
import "./ProjectOrbitGrid.css";
import { ReplayScrambleText } from "./TextAnimation/ReplayScrambleText";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

type ProjectOrbitGridProps = {
  projects: ProjectItem[];
  className?: string;
};

/** Cards orbit on desktop; smaller screens show all projects in a detailed grid. */
export default function ProjectOrbitGrid({ projects, className = "" }: ProjectOrbitGridProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const ring = ringRef.current;
    if (!stage || !ring) return;
    if (projects.length < 2) return;

    const media = gsap.matchMedia();
    media.add("(min-width: 1025px) and (prefers-reduced-motion: no-preference)", () => {
      let rebuildOrbit = () => { };
      let navigateProject = (_event: MouseEvent) => void _event;
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-orbit-card]", ring);
        const orbitDuration = 1;
        let previousActive = -1;
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top+=8%",
            end: () => `+=${Math.max(1800, projects.length * 520)}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          onUpdate: () => {
            const orbitProgress = Math.min(1, timeline.progress() / orbitDuration);
            const frontAngle = Math.PI / 2;
            let activeIndex = 0;
            let bestDepth = -Infinity;

            cards.forEach((card, index) => {
              const startAngle = -Math.PI / 2 + (index / cards.length) * Math.PI * 2;
              const angle = startAngle + orbitProgress * Math.PI * 2;
              const depth = Math.cos(angle - frontAngle);
              if (depth > bestDepth) {
                bestDepth = depth;
                activeIndex = index;
              }

              if (timeline.progress() <= orbitDuration) {
                gsap.set(card, {
                  scale: 0.35 + ((depth + 1) / 2) * 1.03,
                  zIndex: Math.round((depth + 1) * 10),

                  // Increase blur toward the back
                  filter: `blur(${((1 - depth) * 2.5).toFixed(2)}px)`,

                  // Decrease opacity toward the back
                  opacity: 0.68 + ((depth + 1) / 2) * 0.32,
                });
              }
            });

            if (activeIndex !== previousActive) {
              previousActive = activeIndex;
              setActiveIndex(activeIndex);
            }
          },
        });

        navigateProject = (event) => {
          const button = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-project-step]");
          const trigger = timeline.scrollTrigger;
          if (!button || button.disabled || !trigger || previousActive < 0) return;

          const direction = Number(button.dataset.projectStep);
          const nextIndex = (previousActive + direction + cards.length) % cards.length;
          const nextStartAngle = -Math.PI / 2 + (nextIndex / cards.length) * Math.PI * 2;
          const orbitProgress = ((Math.PI / 2 - nextStartAngle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) / (Math.PI * 2);
          const progress = orbitProgress * orbitDuration;
          const targetScroll = trigger.start + (trigger.end - trigger.start) * progress;
          window.scrollTo({ top: targetScroll, behavior: "smooth" });
        };
        stage.addEventListener("click", navigateProject);

        rebuildOrbit = () => {
          timeline.clear();
          gsap.set(cards, { clearProps: "transform,zIndex" });

          const ringRect = ring.getBoundingClientRect();
          const centerX = ringRect.width / 2;
          const centerY = ringRect.height / 2 - 40;
          const radiusX = Math.min(ringRect.width * 0.34, 340);
          const radiusY = Math.min(ringRect.height * 0.34, 230);

          cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left - ringRect.left + rect.width / 2;
            const cardCenterY = rect.top - ringRect.top + rect.height / 2;
            const startAngle = -Math.PI / 2 + (index / cards.length) * Math.PI * 2;
            const path = Array.from({ length: 65 }, (_, pointIndex) => {
              const angle = startAngle + (pointIndex / 64) * Math.PI * 2;
              return {
                x: centerX + radiusX * Math.cos(angle) - cardCenterX,
                y: centerY + radiusY * Math.sin(angle) - cardCenterY,
              };
            });

            gsap.set(card, {
              x: path[0].x,
              y: path[0].y,
              scale: 0.62 + ((Math.cos(startAngle - Math.PI / 2) + 1) / 2) * 0.76,
              rotation: 0,
              filter: `blur(${((1 - Math.cos(startAngle - Math.PI / 2)) * 1.75).toFixed(2)}px)`,
              opacity: 0.68 + ((Math.cos(startAngle - Math.PI / 2) + 1) / 2) * 0.32,
              transformOrigin: "50% 50%",
            });
            timeline.to(card, {
              duration: orbitDuration,
              ease: "none",
              motionPath: { path, curviness: 1 },
            }, 0);
          });

          const initialActive = cards.reduce((active, _card, index) => {
            const angle = -Math.PI / 2 + (index / cards.length) * Math.PI * 2;
            const activeAngle = -Math.PI / 2 + (active / cards.length) * Math.PI * 2;
            return Math.cos(angle - Math.PI / 2) > Math.cos(activeAngle - Math.PI / 2) ? index : active;
          }, 0);
          previousActive = initialActive;
          setActiveIndex(initialActive);
          timeline.progress(0, true);
        };

        rebuildOrbit();
        ScrollTrigger.addEventListener("refreshInit", rebuildOrbit);
      }, stage);

      return () => {
        stage.removeEventListener("click", navigateProject);
        ScrollTrigger.removeEventListener("refreshInit", rebuildOrbit);
        ctx.revert();
      };
    });

    return () => media.revert();
  }, [projects]);

  const activeProject = projects[activeIndex] ?? projects[0];

  return (
    <div ref={stageRef} className={`project-orbit-stage ${className}`.trim()}>
      <div className="project-orbit-layout">
        <div className="project-orbit-ring" ref={ringRef} aria-label="Project cards">
          <div className="project-orbit-grid">
            {projects.map((project, index) => (
              <article className="project-orbit-card" data-orbit-card key={project.id}>
                <a className="project-orbit-image" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
                  <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                  <span className="project-orbit-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="project-orbit-card-title">{project.title}</span>
                </a>
                <div className="project-orbit-mobile-copy">
                  <span className="project-orbit-meta">{project.category} · {project.year}</span>
                  <h3>{project.title}</h3>
                  <p className="project-orbit-summary">{project.summary}</p>
                  <p className="project-orbit-description">{project.description}</p>
                  <div className="project-orbit-tags">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <div className="project-orbit-project-links">
                    <a className="project-orbit-open" href={project.liveUrl} target="_blank" rel="noreferrer">
                      View project <span aria-hidden="true">↗</span>
                    </a>
                    <a className="project-orbit-github" href={project.githubUrl} target="_blank" rel="noreferrer">
                      GitHub <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="project-orbit-details" aria-live="polite" aria-label="Featured project details">
          {activeProject && (
            <div className="project-orbit-detail-content" key={activeProject.id}>
              <div className="flex justify-between">
                <span className="project-orbit-detail-index">PROJECT / {String(activeIndex + 1).padStart(2, "0")}</span>
                <span className="project-orbit-meta">{activeProject.category} · {activeProject.year}</span>
              </div>
              <h3>{activeProject.title}</h3>
              <p className="project-orbit-summary max-h-40 overflow-y-auto pr-3">
                {activeProject.summary}
              </p>

              <p className="project-orbit-description max-h-48 overflow-y-auto pr-3">
                {activeProject.description}
              </p>
              <div className="project-orbit-tags">
                {activeProject.tags.map((tag) => <span className="whitespace-nowrap rounded-full border border-neutral-900/10 bg-white/70 px-5 py-2.5 font-grotesk text-xs tracking-wider text-neutral-800 backdrop-blur shadow-sm hover:border-neutral-900/30 transition-colors" key={tag}>{tag}</span>)}
              </div>
            </div>
          )}
          <div className="project-orbit-actions">
            <div className="project-orbit-project-links font-grotesk text-sm font-medium">
              <a className="" href={activeProject?.liveUrl ?? "#work"} target="_blank" rel="noreferrer">
                <ReplayScrambleText className="" text="View project" duration={300} /> <span aria-hidden="true">↗</span>
              </a>
              <a className="" href={activeProject?.githubUrl ?? "#work"} target="_blank" rel="noreferrer">
                <ReplayScrambleText className="" text="github" duration={300} /> <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="project-orbit-navigation" aria-label="Browse projects">
              <button type="button" className="shadow hover:rotate-15 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" data-project-step="-1" disabled={projects.length < 2} aria-label="Previous project">←</button>
              <button type="button" className="shadow hover:rotate-15 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" data-project-step="1" disabled={projects.length < 2} aria-label="Next project">→</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
