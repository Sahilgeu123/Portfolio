import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import type { MotionValue } from "motion";
export default function CharReveal({
  children,
  className = "",
  stagger = 0.025,
  delay = 0,
}:{
    children: React.ReactNode;
    className?: string;
    stagger?: number;
    delay?: number;
}) {
  const ref = useRef(null);

  const characters = Array.from(String(children));

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 55%"],
  });

  const progress = useTransform(
    scrollYProgress,
    [delay, 1],
    [0, 1]
  );

  const smoothProgress = useSpring(progress, {
    stiffness: 80,
    damping: 25,
    mass: 0.5,
  });

  return (
    <div ref={ref} className={className}>
      {characters.map((char, index) => (
        <Character
          key={`${char}-${index}`}
          char={char}
          index={index}
          progress={smoothProgress}
          stagger={stagger}
        />
      ))}
    </div>
  );
}

function Character({ char, index, progress, stagger }:{ char: string; index: number; progress: MotionValue<number>; stagger: number }) {
  const start = index * stagger;
  const end = start + 0.15;

  const y = useTransform(
    progress,
    [start, end],
    ["110%", "0%"]
  );

  const opacity = useTransform(
    progress,
    [start, end],
    [0, 1]
  );

  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        style={{ y, opacity }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </span>
  );
}