import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import type { MotionValue } from "motion/react";
export default function WordReveal({
  children,
  className = "",
  delay = 0,
  stagger = 0.01,
  stiffness = 80,
  damping = 25,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  stiffness?: number;
  damping?: number;
}) {
  const ref = useRef(null);
  const words = String(children).trim().split(/\s+/);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 30%"],
  });

  const progress = useTransform(
    scrollYProgress,
    [delay, 1],
    [0, 1]
  );

  const smoothProgress = useSpring(progress, {
    stiffness,
    damping,
    mass: 0.5,
  });

  return (
    <div ref={ref} className={className}>
      <div className="flex flex-wrap">
        {words.map((word, index) => (
          <Word
            key={`${word}-${index}`}
            word={word}
            index={index}
            progress={smoothProgress}
            stagger={stagger}
          />
        ))}
      </div>
    </div>
  );
}

function Word({ word, index, progress, stagger }: { word: string; index: number; progress: MotionValue<number>; stagger: number }) {
  const start = index * stagger;
  const end = start + 0.25;

  const y = useTransform(
    progress,
    [Math.min(start, 0.99), Math.min(end, 1)],
    ["110%", "0%"]
  );

  const opacity = useTransform(
    progress,
    [Math.min(start, 0.99), Math.min(end, 1)],
    [0.2, 1]
  );

  return (
    <span className="mr-[0.25em] inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        style={{ y, opacity }}
      >
        {word}
      </motion.span>
    </span>
  );
}