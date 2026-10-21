import { useEffect, useRef } from "react";

type AsciiPortraitProps = {
  src: string;
  name: string;
};

const GLYPHS = "@%#*+=-:. ";

const CHARACTER_DENSITY = 1.25;
const MOBILE_CHARACTER_DENSITY = 3.8;

const MAX_COLUMNS = 130;
const MOBILE_MAX_COLUMNS = 90;

const MIN_ORBIT_DISTANCE = 40;
const MAX_ORBIT_DISTANCE = 60;
const ORBIT_COUNT = 2;
const ORBIT_SPEED = 6.15;
const ORBIT_SPEED_RAMP_UP = 1.4;
const ORBIT_SPEED_RAMP_DOWN = 2.4;
const ORBIT_3D_TILT = 0.32;
const ORBIT_3D_PERSPECTIVE = 0.14;
const ORBIT_REPULSION_STRENGTH = 15;
const ORBIT_PROGRESS_DAMPING = 18;
const MIN_ORBIT_SPEED_RATIO = 0.25;
const ORBIT_SPEED_VARIATION = 0.12;
const ORBIT_LEFT_HORIZONTAL_SCALE = 0.6;
const ORBIT_RIGHT_HORIZONTAL_SCALE = 0.4;
const ORBIT_SCALE_NORMALIZATION_FLOOR = 0.001;
const ORBIT_VERTICAL_SCALE = 0.4;
const ORBIT_SHAPE_EXPONENT = 0.72;
const POINTER_SPRING_STIFFNESS = 100;
const POINTER_SPRING_DAMPING = 18;
const POINTER_FADE_SPEED = 15;
const BACKGROUND = "#f4f4f0";
const CHARACTER_COLOR = "#171717";

type CharacterGrid = {
  columns: number;
  rows: number;
  cellWidth: number;
  cellHeight: number;
  glyphs: Uint8Array;
  orbitAngles: Float32Array;
  orbitBaseAngles: Float32Array;
  orbitDistances: Float32Array;
  orbitProgress: Float32Array;
  orbitProgressVelocities: Float32Array;
  orbitSpeedProgress: Float32Array;
  orbitSpeeds: Float32Array;
  orbitRings: Uint8Array;
};

const horizontalScaleForX = (x: number): number =>
  x < 0 ? ORBIT_LEFT_HORIZONTAL_SCALE : ORBIT_RIGHT_HORIZONTAL_SCALE;

const normalizedHorizontalScaleForX = (x: number): number =>
  Math.max(Math.abs(horizontalScaleForX(x)), ORBIT_SCALE_NORMALIZATION_FLOOR);

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

      const orbitAngles = new Float32Array(glyphs.length);
      const orbitBaseAngles = new Float32Array(glyphs.length);
      const orbitDistances = new Float32Array(glyphs.length);
      const orbitProgress = new Float32Array(glyphs.length);
      const orbitProgressVelocities = new Float32Array(glyphs.length);
      const orbitSpeedProgress = new Float32Array(glyphs.length);
      const orbitSpeeds = new Float32Array(glyphs.length);
      const orbitRings = new Uint8Array(glyphs.length);
      let visibleGlyphCount = 0;
      for (const glyph of glyphs) {
        if (glyph < GLYPHS.length - 1) visibleGlyphCount += 1;
      }
      const greatestCommonDivisor = (left: number, right: number): number =>
        right === 0 ? left : greatestCommonDivisor(right, left % right);
      let distanceStep = Math.max(1, Math.floor(visibleGlyphCount * 0.618034));
      while (visibleGlyphCount > 1 && greatestCommonDivisor(distanceStep, visibleGlyphCount) !== 1) {
        distanceStep += 1;
        if (distanceStep >= visibleGlyphCount) distanceStep = 1;
      }
      const distanceOffset = Math.floor(visibleGlyphCount * 0.381966);
      let visibleRank = 0;
      for (let index = 0; index < glyphs.length; index += 1) {
        // A deterministic shuffled stratification gives visible glyphs a
        // balanced spread of stable orbit distances without per-frame randoms.
        const hash = (index * 16807 + 17) % 2147483647;
        orbitAngles[index] = 0;
        orbitRings[index] = hash % ORBIT_COUNT;
        if (glyphs[index] >= GLYPHS.length - 1 || visibleGlyphCount === 0) continue;

        const stratum = (visibleRank * distanceStep + distanceOffset) % visibleGlyphCount;
        visibleRank += 1;
        const distanceFraction = (stratum + 0.5) / visibleGlyphCount;
        const orbitDistance = MIN_ORBIT_DISTANCE
          + distanceFraction * (MAX_ORBIT_DISTANCE - MIN_ORBIT_DISTANCE);
        orbitDistances[index] = orbitDistance;

        const distanceProgress = (orbitDistance - MIN_ORBIT_DISTANCE)
          / (MAX_ORBIT_DISTANCE - MIN_ORBIT_DISTANCE);
        const distanceSpeed = MIN_ORBIT_SPEED_RATIO
          + Math.pow(1 - distanceProgress, 1.35) * (1 - MIN_ORBIT_SPEED_RATIO);
        const individualVariation = 1 - ORBIT_SPEED_VARIATION / 2
          + ((hash % 1000) / 1000) * ORBIT_SPEED_VARIATION;
        const ringVariation = orbitRings[index] === 0 ? 1.02 : 0.98;
        orbitSpeeds[index] = distanceSpeed * individualVariation * ringVariation;
      }
      grid = {
        columns, rows, cellWidth, cellHeight, glyphs,
        orbitAngles, orbitBaseAngles, orbitDistances, orbitProgress,
        orbitProgressVelocities, orbitSpeedProgress, orbitSpeeds, orbitRings,
      };
      if (pointerTargetInfluence > 0) initializeOrbit(pointerX, pointerY);
    };

    const initializeOrbit = (centerX: number, centerY: number) => {
      if (!grid) return;
      grid.orbitProgress.fill(0);
      grid.orbitProgressVelocities.fill(0);
      grid.orbitSpeedProgress.fill(0);
      for (let row = 0; row < grid.rows; row += 1) {
        for (let column = 0; column < grid.columns; column += 1) {
          const index = row * grid.columns + column;
          const dx = (column + 0.5) * grid.cellWidth - centerX;
          const dy = (row + 0.5) * grid.cellHeight - centerY;
          const nx = dx / normalizedHorizontalScaleForX(dx);
          const ny = dy / ORBIT_VERTICAL_SCALE;
          grid.orbitBaseAngles[index] = Math.atan2(ny, nx);
          grid.orbitAngles[index] = 0;
        }
      }
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
      // Substeps keep the damped cursor spring stable during frame hitches and
      // give it similar motion at different refresh rates.
      const physicsSteps = Math.max(1, Math.ceil(deltaTime / (1 / 120)));
      const physicsDelta = physicsSteps > 0 ? deltaTime / physicsSteps : 0;
      for (let step = 0; step < physicsSteps; step += 1) {
        pointerVelocityX += ((pointerTargetX - pointerX) * POINTER_SPRING_STIFFNESS
          - pointerVelocityX * POINTER_SPRING_DAMPING) * physicsDelta;
        pointerVelocityY += ((pointerTargetY - pointerY) * POINTER_SPRING_STIFFNESS
          - pointerVelocityY * POINTER_SPRING_DAMPING) * physicsDelta;
        pointerX += pointerVelocityX * physicsDelta;
        pointerY += pointerVelocityY * physicsDelta;
      }
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

      const {
        columns, rows, cellWidth, cellHeight, glyphs,
        orbitAngles, orbitBaseAngles, orbitDistances, orbitProgress,
        orbitProgressVelocities, orbitSpeedProgress, orbitSpeeds,
      } = grid;
      context.font = `${cellHeight}px monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = CHARACTER_COLOR;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      for (let row = 0; row < rows; row += 1) {
        const homeY = (row + 0.5) * cellHeight;
        for (let column = 0; column < columns; column += 1) {
          const sampleIndex = row * columns + column;
          const baseGlyph = glyphs[sampleIndex];

          // Skip space / empty background glyphs
          if (baseGlyph >= GLYPHS.length - 1) continue;

          const homeX = (column + 0.5) * cellWidth;
          let drawX = homeX;
          let drawY = homeY;
          let glyphTilt = 0;
          let glyphPerspective = 1;

          if (pointerInfluence > 0.001 && !reducedMotion) {
            const dx = homeX - pointerX;
            const dy = homeY - pointerY;

            // Measure the cursor field in the same scaled coordinates used by
            // the custom orbit so its horizontal reach is wider than its height.
            const normalizedX = dx / normalizedHorizontalScaleForX(dx);
            const normalizedY = dy / ORBIT_VERTICAL_SCALE;

            const dist = Math.sqrt(
              normalizedX * normalizedX + normalizedY * normalizedY
            );

            const orbitDistance = orbitDistances[sampleIndex];
            const insideOrbit = !reducedMotion && pointerInfluence > 0.001
              && orbitDistance > 0 && dist < orbitDistance * 0.88;
            const closeness = orbitDistance > 0
              ? Math.max(0, 1 - dist / orbitDistance)
              : 0;
            const repulsion = ORBIT_REPULSION_STRENGTH * (0.35 + closeness * 1.65);
            const progressAcceleration = (insideOrbit ? 1 : 0) * repulsion
              - orbitProgress[sampleIndex] * repulsion
              - orbitProgressVelocities[sampleIndex] * ORBIT_PROGRESS_DAMPING;
            orbitProgressVelocities[sampleIndex] += progressAcceleration * deltaTime;
            orbitProgress[sampleIndex] += orbitProgressVelocities[sampleIndex] * deltaTime;
            if (orbitProgress[sampleIndex] < 0) {
              orbitProgress[sampleIndex] = 0;
              orbitProgressVelocities[sampleIndex] = Math.max(0, orbitProgressVelocities[sampleIndex]);
            } else if (orbitProgress[sampleIndex] > 1) {
              orbitProgress[sampleIndex] = 1;
              orbitProgressVelocities[sampleIndex] = Math.min(0, orbitProgressVelocities[sampleIndex]);
            }

            if (insideOrbit) {
              const ramp = 1 - Math.exp(-ORBIT_SPEED_RAMP_UP * deltaTime);
              orbitSpeedProgress[sampleIndex] += (1 - orbitSpeedProgress[sampleIndex]) * ramp;
            } else {
              const ramp = 1 - Math.exp(-ORBIT_SPEED_RAMP_DOWN * deltaTime);
              orbitSpeedProgress[sampleIndex] += (0 - orbitSpeedProgress[sampleIndex]) * ramp;
            }
            orbitAngles[sampleIndex] += ORBIT_SPEED * orbitSpeeds[sampleIndex]
              * orbitSpeedProgress[sampleIndex] * deltaTime;
            if (orbitProgress[sampleIndex] > 0.001) {
              const orbitAngle = orbitBaseAngles[sampleIndex] + orbitAngles[sampleIndex];
              const sine = Math.sin(orbitAngle);
              // A nonlinear polar curve creates two broad lobes joined at
              // narrow, flat-tipped ends. The center stays empty at every phase.
              const shapedSine = Math.sign(sine)
                * Math.pow(Math.abs(sine), 1 + ORBIT_SHAPE_EXPONENT);
              const horizontalScale = horizontalScaleForX(Math.cos(orbitAngle));
              // Keep glyph size constant and move only in canvas X/Y; this is
              // a flat 2D orbit with no depth, perspective, or scale change.
              const orbitX = pointerX
                + Math.cos(orbitAngle) * orbitDistance * horizontalScale;
              const orbitY = pointerY
                + shapedSine * orbitDistance * ORBIT_VERTICAL_SCALE;
              // Repulsion eases characters outward onto their fixed path;
              // pointerInfluence blends the full effect back home on leave.
              const orbitBlend = pointerInfluence * orbitProgress[sampleIndex];
              drawX = homeX + (orbitX - homeX) * orbitBlend;
              drawY = homeY + (orbitY - homeY) * orbitBlend;
              // Fake orbital depth with a small perspective scale and tilt as
              // glyphs pass the near and far sides of the path.
              const depth = Math.sin(orbitAngle) * orbitBlend;
              glyphTilt = depth * ORBIT_3D_TILT;
              glyphPerspective = 1 + depth * ORBIT_3D_PERSPECTIVE;
            }
          }

          if (glyphTilt !== 0 || glyphPerspective !== 1) {
            context.save();
            context.translate(drawX, drawY);
            context.rotate(glyphTilt);
            context.scale(glyphPerspective, glyphPerspective);
            context.fillText(GLYPHS[baseGlyph], 0, 0);
            context.restore();
          } else {
            context.fillText(GLYPHS[baseGlyph], drawX, drawY);
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
    const onPointerEnter = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const newX = event.clientX - bounds.left;
      const newY = event.clientY - bounds.top;
      if (pointerInfluence < 0.01) {
        pointerX = newX;
        pointerY = newY;
        pointerVelocityX = 0;
        pointerVelocityY = 0;
        initializeOrbit(newX, newY);
      }
      pointerTargetX = newX;
      pointerTargetY = newY;
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
