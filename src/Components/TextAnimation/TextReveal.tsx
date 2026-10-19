import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";

import { useRef, type ReactNode } from "react";

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  stiffness = 80,
  damping = 30,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stiffness?: number;
  damping?: number;
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 75%"],
  });

  // Move text upward from below the clipping boundary
  const yValue = useTransform(
    scrollYProgress,
    [delay, Math.min(delay + 0.4, 1)],
    ["110%", "0%"]
  );

  const smoothY = useSpring(yValue, {
    stiffness,
    damping,
    mass: 0.5,
  });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        style={{ y: smoothY }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}