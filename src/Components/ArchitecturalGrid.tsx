interface ArchitecturalGridProps {
  variant?: "light" | "dark";
  className?: string;
}

export const ArchitecturalGrid = ({
  variant = "light",
  className = "",
}: ArchitecturalGridProps) => {
  const isDark = variant === "dark";
  const borderColor = isDark ? "border-neutral-800/40" : "border-neutral-300/30";
  const laserColor = isDark
    ? "from-transparent via-champagne/30 to-transparent"
    : "from-transparent via-neutral-900/15 to-transparent";
  const dotColor = isDark ? "bg-white/30 shadow-[0_0_12px_2px_rgba(255,255,255,0.15)]" : "bg-neutral-900/25 shadow-[0_0_12px_2px_rgba(17,17,17,0.12)]";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      {/* 4 Column Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-4">
        <div className={`border-l border-l-0 ${borderColor}`} />
        <div className={`border-l ${borderColor}`} />
        <div className={`border-l ${borderColor}`} />
        <div className={`border-l ${borderColor}`} />
      </div>

      {/* Vertical Animated Laser Pulses on Guides */}
      <div className="absolute inset-y-0" style={{ left: "37.5%" }}>
        <span
          className={`absolute inset-y-0 left-0 w-px bg-gradient-to-b ${laserColor} opacity-50`}
        />
        <span
          className={`absolute -left-px top-0 h-48 w-px bg-gradient-to-b ${laserColor} animate-laser`}
          style={{ animationDelay: "0s" }}
        />
        <span
          className={`absolute -left-[3px] top-[14%] h-1.5 w-1.5 rounded-full ${dotColor} animate-pulse`}
        />
      </div>

      <div className="absolute inset-y-0" style={{ left: "62.5%" }}>
        <span
          className={`absolute inset-y-0 left-0 w-px bg-gradient-to-b ${laserColor} opacity-50`}
        />
        <span
          className={`absolute -left-px top-0 h-48 w-px bg-gradient-to-b ${laserColor} animate-laser`}
          style={{ animationDelay: "2.5s" }}
        />
        <span
          className={`absolute -left-[3px] top-[14%] h-1.5 w-1.5 rounded-full ${dotColor} animate-pulse`}
          style={{ animationDelay: "1.2s" }}
        />
      </div>
    </div>
  );
};

export default ArchitecturalGrid;
