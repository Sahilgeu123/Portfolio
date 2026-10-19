import { useEffect,useRef,useState } from "react";
import ScrambleText from "./ScrambleText";
export const ReplayScrambleText = ({
  text,
  className,
  duration,
}: {
  text: string;
  className: string;
  duration: number;
}) => {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const isVisibleRef = useRef(false);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isVisibleRef.current) setReplayKey((key) => key + 1);
          isVisibleRef.current = true;
        } else {
          isVisibleRef.current = false;
        }
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <span ref={wrapperRef} className="inline-block">
      <ScrambleText
        text={text}
        className={className}
        duration={duration}
        replayKey={replayKey}
      />
    </span>
  );
};