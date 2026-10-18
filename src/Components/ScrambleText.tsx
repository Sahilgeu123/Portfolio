
import { useState } from "react";

interface ScrambleTextProps {
  text: string;
  duration?: number;
  className?: string;
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";

export default function ScrambleText({
  text,
  duration = 800,
  className = "",
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMouseEnter = () => {
    if (isAnimating) return;

    setIsAnimating(true);

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
        requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  };

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

