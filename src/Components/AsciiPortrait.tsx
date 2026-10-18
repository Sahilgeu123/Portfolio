import { useEffect, useRef } from "react";

type AsciiPortraitProps = {
  src: string;
  name: string;
};

const GLYPHS = "@%#*+=-:. ";

// Tuning values: adjust these to change the visual density and motion.
const CHARACTER_DENSITY = 7.5; // Approximate horizontal cell width in CSS pixels.
const MOBILE_CHARACTER_DENSITY = 9; // Larger cells keep mobile rendering light.
const MAX_COLUMNS = 84;
const MOBILE_MAX_COLUMNS = 60;
const ANIMATION_SPEED = 0.72; // Wave travel speed, radians per second.
const WAVE_STRENGTH = 1.35; // Maximum radial displacement, in character cells.
const VORTEX_INTENSITY = 0.9; // Maximum tangential displacement, in character cells.
const POINTER_STRENGTH = 1.15; // Local pointer ripple displacement, in character cells.
const WAVE_FREQUENCY = 0.105;
const BACKGROUND = "#0b0b0b";
const CHARACTER_COLOR = "#c1c1c1";

type CharacterGrid = {
  columns: number;
  rows: number;
  cellWidth: number;
  cellHeight: number;
  glyphs: Uint8Array;
  luminance: Float32Array;
};

/** Renders the supplied portrait as a responsive, animated ASCII character field. */
export default function AsciiPortrait({ src, name }: AsciiPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const image = new Image();
    image.decoding = "async";
    let frameId = 0;
    let lastFrameTime = 0;
    let elapsed = 0;
    let width = 0;
    let height = 0;
    let grid: CharacterGrid | null = null;
    let pointerX = 0;
    let pointerY = 0;
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let pointerInfluence = 0;
    let pointerTargetInfluence = 0;
    const sourceCanvas = document.createElement("canvas");
    const sourceContext = sourceCanvas.getContext("2d", { willReadFrequently: true });
    if (!sourceContext) return;

    const buildGrid = () => {
      if (!image.complete || !image.naturalWidth || width <= 0 || height <= 0) return;

      const isMobile = window.matchMedia("(max-width: 640px)").matches;
      const density = isMobile ? MOBILE_CHARACTER_DENSITY : CHARACTER_DENSITY;
      const maxColumns = isMobile ? MOBILE_MAX_COLUMNS : MAX_COLUMNS;
      const columns = Math.max(24, Math.min(maxColumns, Math.floor(width / density)));
      const cellWidth = width / columns;
      const cellHeight = cellWidth * 1.68;
      const rows = Math.max(1, Math.ceil(height / cellHeight));
      sourceCanvas.width = columns;
      sourceCanvas.height = rows;

      // Cover the frame without stretching; align vertically to the top like object-position: top.
      const scale = Math.max(columns / image.naturalWidth, rows / image.naturalHeight);
      const cropWidth = columns / scale;
      const cropHeight = rows / scale;
      sourceContext.clearRect(0, 0, columns, rows);
      sourceContext.drawImage(
        image,
        (image.naturalWidth - cropWidth) / 2,
        0,
        cropWidth,
        cropHeight,
        0,
        0,
        columns,
        rows,
      );

      const pixels = sourceContext.getImageData(0, 0, columns, rows).data;
      const glyphs = new Uint8Array(columns * rows);
      const luminance = new Float32Array(columns * rows);
      for (let index = 0, pixel = 0; index < glyphs.length; index += 1, pixel += 4) {
        const red = pixels[pixel];
        const green = pixels[pixel + 1];
        const blue = pixels[pixel + 2];
        const brightness = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255;
        const chroma = Math.max(red, green, blue) - Math.min(red, green, blue);
        // The provided portrait has a clean white studio background. Knock only near-white,
        // low-chroma pixels out so skin highlights and hair detail remain part of the portrait.
        const isStudioBackground = brightness > 0.94 && chroma < 20;
        const normalizedShade = Math.max(0, Math.min(1, (brightness - 0.035) / 0.9));
        luminance[index] = isStudioBackground ? 0 : normalizedShade;
        // Dark hair, glasses, and clothing use denser glyphs; highlights taper into the dark field.
        glyphs[index] = isStudioBackground
          ? GLYPHS.length - 1
          : Math.min(GLYPHS.length - 1, Math.floor(normalizedShade * GLYPHS.length));
      }

      grid = { columns, rows, cellWidth, cellHeight, glyphs, luminance };
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      if (width <= 0 || height <= 0) return;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      buildGrid();
    };

    const render = (time: number) => {
      if (!width || !height) return;
      const delta = lastFrameTime === 0 ? 0 : Math.min((time - lastFrameTime) / 1000, 0.05);
      lastFrameTime = time;
      elapsed += delta;
      pointerX += (pointerTargetX - pointerX) * 0.12;
      pointerY += (pointerTargetY - pointerY) * 0.12;
      pointerInfluence += (pointerTargetInfluence - pointerInfluence) * 0.09;

      context.fillStyle = BACKGROUND;
      context.fillRect(0, 0, width, height);

      if (!grid) {
        context.fillStyle = "#777";
        context.font = "12px monospace";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(name.toUpperCase(), width / 2, height / 2);
        frameId = requestAnimationFrame(render);
        return;
      }

      const { columns, rows, cellWidth, cellHeight, glyphs, luminance } = grid;
      const centerX = columns * 0.5;
      const centerY = rows * 0.46;
      const pointerColumn = pointerX / cellWidth;
      const pointerRow = pointerY / cellHeight;
      const phaseTime = elapsed * ANIMATION_SPEED;
      context.font = `${cellHeight}px monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = CHARACTER_COLOR;

      for (let row = 0; row < rows; row += 1) {
        const y = row + 0.5;
        for (let column = 0; column < columns; column += 1) {
          const x = column + 0.5;
          const dx = x - centerX;
          const dy = (y - centerY) * 0.86;
          const radius = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);
          const organicPhase = radius * WAVE_FREQUENCY - phaseTime + Math.sin(angle * 3 + phaseTime * 0.38) * 0.48;

          // Two narrow, traveling wave bands create local ripples instead of orbiting the portrait.
          const waveOne = Math.sin(organicPhase) * Math.exp(-Math.pow(Math.sin(organicPhase * 0.5), 2) * 2.4);
          const waveTwo = Math.sin(radius * 0.17 + phaseTime * 0.72 + angle * 2) * 0.34;
          let radialDisplacement = (waveOne + waveTwo) * WAVE_STRENGTH;

          // Soft tangential flow around the face center, with a gentle distance falloff.
          const vortexFalloff = Math.exp(-radius / 15);
          const vortex = VORTEX_INTENSITY * vortexFalloff * Math.sin(phaseTime * 0.65 + radius * 0.1);
          let displacedX = column - (Math.cos(angle) * radialDisplacement - Math.sin(angle) * vortex);
          let displacedY = row - (Math.sin(angle) * radialDisplacement + Math.cos(angle) * vortex);

          // Pointer ripple smoothly fades in and out as its target changes.
          if (pointerInfluence > 0.005) {
            const px = x - pointerColumn;
            const py = (y - pointerRow) * 0.86;
            const pointerDistance = Math.sqrt(px * px + py * py);
            const pointerAngle = Math.atan2(py, px);
            const falloff = Math.exp(-pointerDistance / 7);
            const ripple = Math.sin(pointerDistance * 1.15 - phaseTime * 1.8) * falloff * POINTER_STRENGTH * pointerInfluence;
            const localVortex = falloff * 0.55 * pointerInfluence;
            displacedX -= Math.cos(pointerAngle) * ripple - Math.sin(pointerAngle) * localVortex;
            displacedY -= Math.sin(pointerAngle) * ripple + Math.cos(pointerAngle) * localVortex;
          }

          const sampleColumn = Math.max(0, Math.min(columns - 1, Math.round(displacedX)));
          const sampleRow = Math.max(0, Math.min(rows - 1, Math.round(displacedY)));
          const sampleIndex = sampleRow * columns + sampleColumn;
          const brightness = luminance[sampleIndex];
          const shimmer = Math.sin(phaseTime * 1.2 + column * 0.19 + row * 0.13) * 0.18;
          const glyphIndex = Math.max(0, Math.min(GLYPHS.length - 1, glyphs[sampleIndex] + (shimmer > 0.14 ? 1 : 0)));
          const alpha = Math.min(0.96, 0.35 + (1 - brightness) * 0.58);
          if (glyphIndex < GLYPHS.length - 1 && alpha > 0.32) {
            context.globalAlpha = alpha;
            context.fillText(GLYPHS[glyphIndex], x * cellWidth, y * cellHeight);
          }
        }
      }
      context.globalAlpha = 1;
      frameId = requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    image.onload = () => {
      buildGrid();
      if (!frameId) frameId = requestAnimationFrame(render);
    };
    image.onerror = () => {
      grid = null;
    };
    image.src = src;
    resize();
    if (!frameId) frameId = requestAnimationFrame(render);

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointerTargetX = event.clientX - bounds.left;
      pointerTargetY = event.clientY - bounds.top;
      pointerTargetInfluence = 1;
    };
    const onPointerLeave = () => {
      pointerTargetInfluence = 0;
    };
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      image.onload = null;
      image.onerror = null;
      grid = null;
    };
  }, [name, src]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={`Interactive ASCII portrait of ${name}`}
      role="img"
      className="relative h-full w-full"
    />
  );
}
