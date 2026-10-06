import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only activate for non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Use GSAP quickTo for 60fps smooth physics-based mouse follower
    const xDotTo = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    const yDotTo = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });

    const xRingTo = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const yRingTo = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest("a, button, [role='button'], input, textarea, [data-cursor]");
      if (interactiveEl) {
        setIsHovered(true);
        const customLabel = interactiveEl.getAttribute("data-cursor-label");
        setHoverLabel(customLabel || (interactiveEl.tagName === "A" ? "OPEN" : null));
      } else {
        setIsHovered(false);
        setHoverLabel(null);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <>
      {/* Outer Halo Ring */}
      <div
        ref={cursorRingRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[300] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-900/40 bg-white/10 backdrop-blur-[2px] transition-all duration-300 ease-out mix-blend-difference flex items-center justify-center ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isHovered ? "h-14 w-14 scale-110 bg-white/20" : "h-9 w-9 scale-100"}`}
      >
        {hoverLabel && (
          <span className="font-grotesk text-[8px] font-bold uppercase tracking-[0.2em] text-white">
            {hoverLabel}
          </span>
        )}
      </div>

      {/* Center Precision Dot */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[301] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-900 transition-opacity duration-200 mix-blend-difference ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isHovered ? "h-1.5 w-1.5 opacity-60" : "h-2 w-2"}`}
      />
    </>
  );
};

export default CustomCursor;
