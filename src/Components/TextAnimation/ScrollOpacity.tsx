
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";

import { useRef, type ReactNode } from "react";

export default function ScrollText({
  children,
  className = "",
  delay = 0,
  startOpacity = 0.1,
  endOpacity = 1,
  stiffness = 80,
  damping = 30,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  startOpacity?: number;
  endOpacity?: number;
  stiffness?: number;
  damping?: number;
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 40%"],
  });

  // Map scroll progress to opacity
  const opacityValue = useTransform(
    scrollYProgress,
    [delay, 1],
    [startOpacity, endOpacity]
  );

  // Smooth the opacity transition
  const smoothOpacity = useSpring(opacityValue, {
    stiffness,
    damping,
    mass: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      style={{ opacity: smoothOpacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

