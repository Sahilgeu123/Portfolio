import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const words = ["FRONTEND", "REACT", "NEXT.JS", "SAHIL ALAM"];

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const progressLineRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // Disable body scroll while loading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.25;
      });
    }, 28);

    // Word cycling
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => {
        if (prev < words.length - 1) {
          return prev + 1;
        }
        clearInterval(wordInterval);
        return prev;
      });
    }, 620);

    // Auto complete after ~2.8s
    const exitTimer = setTimeout(() => {
      handleExit();
    }, 2750);

    return () => {
      clearInterval(progressInterval);
      clearInterval(wordInterval);
      clearTimeout(exitTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Text transition with GSAP on index change
  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }
      );
    }
  }, [currentWordIndex]);

  const handleExit = () => {
    if (!containerRef.current) {
      onComplete();
      return;
    }

    gsap.to(containerRef.current, {
      yPercent: -100,
      duration: 0.85,
      ease: "power4.inOut",
      onComplete: () => {
        document.body.style.overflow = "";
        onComplete();
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#111111] text-white select-none cursor-pointer"
      onClick={handleExit}
      title="Click to skip"
    >
      {/* Background Architectural Grid Accent */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Word Revealer */}
      <div className="relative flex h-[1.3em] items-center justify-center overflow-hidden px-6">
        <span
          ref={textRef}
          className="font-display text-center text-[11vw] font-bold tracking-tight text-white sm:text-6xl lg:text-8xl"
        >
          {words[currentWordIndex]}
        </span>
      </div>

      <p className="mt-6 font-grotesk text-xs uppercase tracking-[0.4em] text-white/50">
        Sahil Alam — Frontend Developer
      </p>

      {/* Progress Bar */}
      <div className="absolute bottom-16 left-1/2 h-px w-48 -translate-x-1/2 overflow-hidden bg-white/15">
        <span
          ref={progressLineRef}
          className="block h-full bg-[#c9c2b4] transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-3 font-grotesk text-[10px] uppercase tracking-[0.3em] text-white/40">
        <span>Loading</span>
        <span>·</span>
        <span>{Math.min(100, Math.round(progress))}%</span>
      </div>

      {/* Skip Hint */}
      <span className="absolute bottom-4 right-6 font-grotesk text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-white/70 transition-colors">
        Click anywhere to skip ↵
      </span>
    </div>
  );
};

export default Preloader;
