import { useCallback, useLayoutEffect, useRef } from "react";

type PanelOrigin = { left: number; top: number; width: number; height: number };

export function useButtonPopoverMotion(
  origin: PanelOrigin,
  onClose: () => void,
  _endRadius?: string,
) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const closingRef = useRef(false);
  const sourceTransformRef = useRef("");

  useLayoutEffect(() => {
    const backdrop = backdropRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let openAnimation: Animation | undefined;
    const frame = window.requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel || !backdrop) return;

      // Measure after layout so StrictMode's development effect replay cannot
      // measure the panel while its first zero-scale animation is active.
      const rect = panel.getBoundingClientRect();
      const originCenterX = origin.left + origin.width / 2;
      const originCenterY = origin.top + origin.height / 2;
      // The trigger can sit just outside the panel's final bounds, so preserve
      // its exact local point instead of clamping it to the panel edge.
      const localX = originCenterX - rect.left;
      const localY = originCenterY - rect.top;
      sourceTransformRef.current = "scale(0, 0)";
      panel.style.transformOrigin = `${localX}px ${localY}px`;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduceMotion) {
        openAnimation = panel.animate(
          [
            { transform: sourceTransformRef.current, opacity: 0 },
            { opacity: 0.3, offset: 0.32 },
            { opacity: 0.75, offset: 0.72 },
            { transform: "none", opacity: 1 },
          ],
          { duration: 620, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "both" },
        );
        backdrop.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, easing: "ease-out", fill: "both" });
      }
    });
    return () => {
      window.cancelAnimationFrame(frame);
      openAnimation?.cancel();
      document.body.style.overflow = previousOverflow;
    };
  }, [origin]);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!panel || !backdrop || reducedMotion) {
      onClose();
      return;
    }

    const exit = panel.animate(
      [
        { transform: "none", opacity: 1 },
        { opacity: 0.3, offset: 0.65 },
        { transform: sourceTransformRef.current, opacity: 0 },
      ],
      { duration: 380, easing: "cubic-bezier(0.7, 0, 0.84, 0)", fill: "both" },
    );
    backdrop.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 280, easing: "ease-in", fill: "both" });
    let didClose = false;
    const finishClose = () => {
      if (didClose) return;
      didClose = true;
      onClose();
    };
    exit.onfinish = finishClose;
    window.setTimeout(finishClose, 450);
  }, [onClose]);

  return { backdropRef, panelRef, close };
}
