import { useEffect, useRef } from "react";

interface TopologyMeshProps {
  className?: string;
  theme?: "light" | "dark";
  interactive?: boolean;
}

export const TopologyMesh = ({
  className = "",
  theme = "light",
  interactive = true,
}: TopologyMeshProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number; radius: number }>({
    x: 0.5,
    y: 0.5,
    targetX: 0.5,
    targetY: 0.5,
    radius: 120,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastFrameTime = 0;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouseRef.current.targetX = clientX / width;
      mouseRef.current.targetY = clientY / height;
      if (prefersReducedMotion && !animationFrameId) animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Grid parameters for 3D topological contour mesh
    const cols = 48; // resolution X
    const rows = 36; // resolution Y
    let time = 0;

    const render = (timestamp: number) => {
      animationFrameId = 0;
      if (!isVisible) return;
      if (!prefersReducedMotion && timestamp - lastFrameTime < 1000 / 30) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = timestamp;
      time += 0.015;

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // Colors based on theme
      const isDark = theme === "dark";
      const baseLineColor = isDark ? "rgba(201, 194, 180, 0.22)" : "rgba(17, 17, 17, 0.14)";
      const ridgeColor = isDark ? "rgba(235, 228, 215, 0.65)" : "rgba(30, 25, 45, 0.45)";
      const dotColor = isDark ? "rgba(201, 194, 180, 0.55)" : "rgba(17, 17, 17, 0.35)";

      // Topographic Perspective Projection Settings
      const fov = 340;
      const cameraY = -120;
      const cameraZ = 220;
      const planeWidth = width * 1.35;
      const planeDepth = height * 1.25;

      // Calculate projected 3D points
      const points: { px: number; py: number; heightVal: number; alpha: number }[][] = [];

      for (let r = 0; r <= rows; r++) {
        points[r] = [];
        const normY = r / rows;
        const worldY = (normY - 0.5) * planeDepth;

        for (let c = 0; c <= cols; c++) {
          const normX = c / cols;
          const worldX = (normX - 0.5) * planeWidth;

          // Natural Topological Wave Function
          const wave1 = Math.sin(normX * 4.2 + time * 1.2) * Math.cos(normY * 3.8 + time * 0.8);
          const wave2 = Math.sin(normX * 8.4 - time * 0.9 + normY * 5.2) * 0.45;
          const wave3 = Math.cos(Math.hypot(normX - 0.5, normY - 0.5) * 10 - time * 1.5) * 0.35;

          // Mouse interactive ripple
          const dx = normX - mouseRef.current.x;
          const dy = normY - mouseRef.current.y;
          const distToMouse = Math.sqrt(dx * dx + dy * dy);
          const mouseWave = Math.max(0, 1 - distToMouse * 3.2) * Math.sin(distToMouse * 22 - time * 4) * 0.9;

          // Elevation height (z)
          const elevation = (wave1 + wave2 + wave3 + mouseWave) * 38;

          // 3D Perspective Projection
          const zCoord = cameraZ + worldY;
          if (zCoord <= 10) {
            points[r][c] = { px: -9999, py: -9999, heightVal: 0, alpha: 0 };
            continue;
          }

          const scale = fov / zCoord;
          const projX = width / 2 + worldX * scale;
          const projY = height * 0.52 + (cameraY - elevation) * scale;
          const depthFade = Math.max(0.05, Math.min(1, 1 - (r / rows) * 0.7));

          points[r][c] = {
            px: projX,
            py: projY,
            heightVal: elevation,
            alpha: depthFade,
          };
        }
      }

      // Draw Topographic Contour Lines (Horizontal Rows)
      for (let r = 0; r <= rows; r++) {
        ctx.beginPath();
        let started = false;

        for (let c = 0; c <= cols; c++) {
          const pt = points[r][c];
          if (pt.px === -9999) continue;

          if (!started) {
            ctx.moveTo(pt.px, pt.py);
            started = true;
          } else {
            ctx.lineTo(pt.px, pt.py);
          }
        }

        // Highlight every 4th contour line as a major topographic elevation ring
        const isMajorRidge = r % 4 === 0;
        ctx.lineWidth = isMajorRidge ? 1.6 : 0.8;
        ctx.strokeStyle = isMajorRidge ? ridgeColor : baseLineColor;
        ctx.stroke();
      }

      // Draw Cross-topological longitudinal lines for Wireframe Depth
      for (let c = 0; c <= cols; c += 2) {
        ctx.beginPath();
        let started = false;

        for (let r = 0; r <= rows; r++) {
          const pt = points[r][c];
          if (pt.px === -9999) continue;

          if (!started) {
            ctx.moveTo(pt.px, pt.py);
            started = true;
          } else {
            ctx.lineTo(pt.px, pt.py);
          }
        }

        ctx.lineWidth = 0.5;
        ctx.strokeStyle = baseLineColor;
        ctx.stroke();
      }

      // Draw Elevation Marker Nodes on peaks
      for (let r = 0; r <= rows; r += 3) {
        for (let c = 0; c <= cols; c += 3) {
          const pt = points[r][c];
          if (pt.px === -9999 || pt.heightVal < 14) continue;

          ctx.beginPath();
          ctx.arc(pt.px, pt.py, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.fill();
        }
      }

      // Draw a subtle animated radar scan line sweeping across
      const sweepY = ((Math.sin(time * 0.7) + 1) / 2) * rows;
      const targetRow = Math.floor(sweepY);
      if (points[targetRow]) {
        ctx.beginPath();
        let started = false;
        for (let c = 0; c <= cols; c++) {
          const pt = points[targetRow][c];
          if (pt.px === -9999) continue;
          if (!started) {
            ctx.moveTo(pt.px, pt.py);
            started = true;
          } else {
            ctx.lineTo(pt.px, pt.py);
          }
        }
        ctx.lineWidth = 2.2;
        ctx.strokeStyle = isDark ? "rgba(201, 194, 180, 0.75)" : "rgba(17, 17, 17, 0.45)";
        ctx.stroke();
      }

      if (!prefersReducedMotion && isVisible) animationFrameId = requestAnimationFrame(render);
    };

    const scheduleRender = () => {
      if (isVisible && !animationFrameId) animationFrameId = requestAnimationFrame(render);
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) scheduleRender();
      else if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    });
    intersectionObserver.observe(canvas);

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreference = () => {
      prefersReducedMotion = motionPreference.matches;
      if (prefersReducedMotion && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
      scheduleRender();
    };
    motionPreference.addEventListener("change", handleMotionPreference);
    scheduleRender();

    return () => {
      cancelAnimationFrame(animationFrameId);
      intersectionObserver.disconnect();
      motionPreference.removeEventListener("change", handleMotionPreference);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [theme, interactive]);

  return (
    <div className={`pointer-events-none relative overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ width: "100%", height: "100%" }}
      />
      {/* Topographic Legend Badge */}
      <div className="pointer-events-none absolute bottom-4 right-6 hidden items-center gap-2 rounded-full border border-neutral-900/10 bg-white/60 px-3 py-1 font-grotesk text-[10px] uppercase tracking-[0.2em] text-neutral-600 backdrop-blur md:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>Topological Elevation Grid · Realtime</span>
      </div>
    </div>
  );
};

export default TopologyMesh;
