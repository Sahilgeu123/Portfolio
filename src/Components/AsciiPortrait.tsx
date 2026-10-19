import { useEffect, useRef } from "react";

type AsciiPortraitProps = {
  src: string;
  name: string;
};

const GLYPHS = "@%#*+=-:. ";

const CHARACTER_DENSITY = 3.25;
const MOBILE_CHARACTER_DENSITY = 3.8;

const MAX_COLUMNS = 130;
const MOBILE_MAX_COLUMNS = 90;

const VORTEX_RADIUS = 3;
const VORTEX_ROTATION_SPEED = 2.7;
const VORTEX_GRAVITY = 1.15;
const VORTEX_TURBULENCE = 0.5;
const POINTER_SPRING_STIFFNESS = 78;
const POINTER_SPRING_DAMPING = 18;
const POINTER_FADE_SPEED = 8;
const BACKGROUND = "#f4f4f0";
const CHARACTER_COLOR = "#171717";

type CharacterGrid = {
  columns: number;
  rows: number;
  cellWidth: number;
  cellHeight: number;
  glyphs: Uint8Array;
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
    let pointerVelocityX = 0;
    let pointerVelocityY = 0;
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

      // Character cells are taller than they are wide. Use the frame's physical
      // aspect ratio for the source crop, then map it to the denser character grid.
      // Cover the portrait card without stretching the source image.
      const sourceAspect = (columns * cellWidth) / (rows * cellHeight);
      const zoom = 1.32;
      const cropWidth = Math.min(image.naturalWidth, image.naturalHeight * sourceAspect) / zoom;
      const cropHeight = Math.min(image.naturalHeight, image.naturalWidth / sourceAspect) / zoom;
      const cropX = (image.naturalWidth - cropWidth) * 0.7;
      const cropY = (image.naturalHeight - cropHeight) * 0.4;
      sourceContext.clearRect(0, 0, columns, rows);
      sourceContext.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        columns,
        rows,
      );

      const pixels = sourceContext.getImageData(0, 0, columns, rows).data;
      const glyphs = new Uint8Array(columns * rows);
      const shades = new Float32Array(columns * rows);
      const background = new Uint8Array(columns * rows);
      const backgroundQueue = new Int32Array(columns * rows);
      let queueStart = 0;
      let queueEnd = 0;

      // Remove connected light, low-chroma studio pixels. Connectivity preserves
      // similarly bright skin and shirt areas inside the portrait.
      for (let index = 0; index < background.length; index += 1) {
        const pixel = index * 4;
        const red = pixels[pixel];
        const green = pixels[pixel + 1];
        const blue = pixels[pixel + 2];
        const brightness = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255;
        const chroma = Math.max(red, green, blue) - Math.min(red, green, blue);
        if (brightness > 0.62 && chroma < 32) background[index] = 1;
        shades[index] = Math.max(0, Math.min(1, (brightness - 0.035) / 0.9));
      }

      const enqueueBackground = (index: number) => {
        if (background[index] !== 1) return;
        background[index] = 2;
        backgroundQueue[queueEnd] = index;
        queueEnd += 1;
      };
      for (let column = 0; column < columns; column += 1) {
        enqueueBackground(column);
        enqueueBackground((rows - 1) * columns + column);
      }
      for (let row = 1; row < rows - 1; row += 1) {
        enqueueBackground(row * columns);
        enqueueBackground(row * columns + columns - 1);
      }
      while (queueStart < queueEnd) {
        const index = backgroundQueue[queueStart];
        queueStart += 1;
        const column = index % columns;
        if (column > 0) enqueueBackground(index - 1);
        if (column + 1 < columns) enqueueBackground(index + 1);
        if (index >= columns) enqueueBackground(index - columns);
        if (index + columns < background.length) enqueueBackground(index + columns);
      }
      for (let index = 0; index < glyphs.length; index += 1) {
        const isStudioBackground = background[index] === 2;
        const normalizedShade = shades[index];
        const row = Math.floor(index / columns);
        const column = index % columns;
        let neighborhoodTotal = 0;
        let neighborhoodCount = 0;
        for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
          for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
            const neighborX = column + offsetX;
            const neighborY = row + offsetY;
            if (
              neighborX < 0 || neighborX >= columns ||
              neighborY < 0 || neighborY >= rows
            ) continue;
            const neighborIndex = neighborY * columns + neighborX;
            if (background[neighborIndex] === 2) continue;
            neighborhoodTotal += shades[neighborIndex];
            neighborhoodCount += 1;
          }
        }
        const neighborhoodAverage = neighborhoodCount ? neighborhoodTotal / neighborhoodCount : normalizedShade;
        const detailedShade = Math.max(0, Math.min(1,
          normalizedShade + (normalizedShade - neighborhoodAverage) * 1.55));
        // Lift the dark midtones so hair texture, eyes, and facial shading land
        // on distinct glyphs instead of collapsing into one dense band.
        const adjustedShade = Math.pow(detailedShade, 0.82);

        // Dark pixels use dense characters.
        // Bright pixels use lighter characters.
        // GLYPHS is ordered dark to light: black maps to @, white to space.
        glyphs[index] = isStudioBackground
          ? GLYPHS.length - 1
          : Math.min(GLYPHS.length - 1, Math.floor(adjustedShade * (GLYPHS.length - 1)));
      }

      grid = { columns, rows, cellWidth, cellHeight, glyphs };
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
      scheduleRender();
    };

    const render = (time: number) => {
      frameId = 0;
      if (!width || !height) return;
      const deltaTime = lastFrameTime === 0
        ? 0
        : Math.min((time - lastFrameTime) / 1000, 0.05);
      lastFrameTime = time;
      elapsed += deltaTime;
      const influenceEase = 1 - Math.exp(-POINTER_FADE_SPEED * deltaTime);
      pointerVelocityX += ((pointerTargetX - pointerX) * POINTER_SPRING_STIFFNESS
        - pointerVelocityX * POINTER_SPRING_DAMPING) * deltaTime;
      pointerVelocityY += ((pointerTargetY - pointerY) * POINTER_SPRING_STIFFNESS
        - pointerVelocityY * POINTER_SPRING_DAMPING) * deltaTime;
      pointerX += pointerVelocityX * deltaTime;
      pointerY += pointerVelocityY * deltaTime;
      pointerInfluence += (pointerTargetInfluence - pointerInfluence) * influenceEase;
      if (pointerTargetInfluence === 0 && pointerInfluence < 0.005) pointerInfluence = 0;

      context.fillStyle = BACKGROUND;
      context.fillRect(0, 0, width, height);

      if (!grid) {
        context.fillStyle = "#777";
        context.font = "12px monospace";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(name.toUpperCase(), width / 2, height / 2);
        return;
      }

      const { columns, rows, cellWidth, cellHeight, glyphs } = grid;
      const pointerColumn = pointerX / cellWidth;
      const pointerRow = pointerY / cellHeight;
      context.font = `${cellHeight}px monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = CHARACTER_COLOR;

      for (let row = 0; row < rows; row += 1) {
        const y = row + 0.5;
        for (let column = 0; column < columns; column += 1) {
          const x = column + 0.5;
          let displacedX = column;
          let displacedY = row;
          // Inverse-map each cell through a localized polar vortex. This keeps
          // the source portrait intact while its individual glyphs flow around
          // the cursor; outside the falloff, the original cell is sampled.
          if (pointerInfluence > 0.005) {
            const px = x - pointerColumn;
            const py = (y - pointerRow) * 0.86;
            const distance = Math.sqrt(px * px + py * py);
            const angle = Math.atan2(py, px);
            const falloff = Math.exp(-(distance * distance) / (2 * VORTEX_RADIUS * VORTEX_RADIUS))
              * pointerInfluence;
            const rotation = elapsed * VORTEX_ROTATION_SPEED
              / (0.8 + distance * 0.22) * falloff;
            const turbulence = Math.sin(angle * 3 + elapsed * 1.7 + distance * 0.55)
              * VORTEX_TURBULENCE * falloff;
            const sourceRadius = distance + VORTEX_GRAVITY * falloff;
            const sourceAngle = angle - rotation - turbulence;
            displacedX = pointerColumn + Math.cos(sourceAngle) * sourceRadius;
            displacedY = pointerRow + Math.sin(sourceAngle) * sourceRadius / 0.86;
          }

          const sampleColumn = Math.max(0, Math.min(columns - 1, Math.round(displacedX)));
          const sampleRow = Math.max(0, Math.min(rows - 1, Math.round(displacedY)));
          const sampleIndex = sampleRow * columns + sampleColumn;
          const baseGlyph = glyphs[sampleIndex];

          if (baseGlyph < GLYPHS.length - 1) {
            context.fillText(
              GLYPHS[baseGlyph],
              x * cellWidth,
              y * cellHeight
            );
          }
        }
      }

      context.globalAlpha = 1;
      const pointerSettled = Math.abs(pointerTargetX - pointerX) < 0.03
        && Math.abs(pointerTargetY - pointerY) < 0.03
        && Math.abs(pointerVelocityX) < 0.05
        && Math.abs(pointerVelocityY) < 0.05;
      if (pointerInfluence > 0.005 || pointerTargetInfluence > 0.005 || !pointerSettled) {
        frameId = requestAnimationFrame(render);
      }
    };

    const scheduleRender = () => {
      if (!frameId) frameId = requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    image.onload = () => {
      buildGrid();
      scheduleRender();
    };
    image.onerror = () => {
      grid = null;
    };
    image.src = src;
    resize();
    scheduleRender();

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointerTargetX = event.clientX - bounds.left;
      pointerTargetY = event.clientY - bounds.top;
      pointerTargetInfluence = 1;
      scheduleRender();
    };
    const onPointerEnter = () => {
      pointerTargetInfluence = 1;
      scheduleRender();
    };
    const onPointerLeave = () => {
      pointerTargetInfluence = 0;
      scheduleRender();
    };
    canvas.addEventListener("pointerenter", onPointerEnter, { passive: true });
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
      canvas.removeEventListener("pointerenter", onPointerEnter);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      image.onload = null;
      image.onerror = null;
      grid = null;
    };
  }, [name, src]);

  return (
    <div className="absolute inset-0">
      <canvas
        ref={canvasRef}
        aria-label={`Interactive ASCII portrait of ${name}`}
        role="img"
        className="block h-full w-full"
      />
    </div>
  );
}
