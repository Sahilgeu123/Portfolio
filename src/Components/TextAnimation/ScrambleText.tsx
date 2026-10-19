
import { useCallback, useEffect, useRef, useState } from "react";

interface ScrambleTextProps {
  text: string;
  duration?: number;
  className?: string;
  replayKey?: number;
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";

export default function ScrambleText({
  text,
  duration = 800,
  className = "",
  replayKey,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const isAnimatingRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  const startAnimation = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    const startTime = performance.now();

    const animate = (timestamp: number) => {
      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      const resolvedCount = Math.floor(progress * text.length);

      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " " || index < resolvedCount) {
            return char;
          }

          return CHARACTERS[
            Math.floor(Math.random() * CHARACTERS.length)
          ];
        })
        .join("");

      setDisplayText(scrambled);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        isAnimatingRef.current = false;
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [duration, text]);

  useEffect(() => {
    if (replayKey !== undefined && replayKey > 0) startAnimation();
  }, [replayKey, startAnimation]);

  useEffect(() => () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    isAnimatingRef.current = false;
  }, []);

  const handleMouseEnter = () => startAnimation();

  return (
    <span
      className={className}
      onMouseEnter={handleMouseEnter}
      onFocus={handleMouseEnter}
      tabIndex={0}
      role="text"
      aria-label={text}
    >
      <span aria-hidden="true">{displayText}</span>
    </span>
  );
}

