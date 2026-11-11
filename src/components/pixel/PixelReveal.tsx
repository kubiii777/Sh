"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { drawCells, revealThresholds } from "./pixel-grid";

type Props = {
  children: ReactNode;
  className?: string;
  /** Liczba kolumn; rzędy wynikają z proporcji, żeby piksele były kwadratowe. */
  cols?: number;
  seed?: number;
};

/**
 * Jednorazowe pikselowe odsłonięcie zawartości (obrazu) przy wejściu w viewport.
 * Canvas zakrywa obraz kolorem tła sekcji i znika komórka po komórce.
 */
export function PixelReveal({ children, className = "", cols = 16, seed = 7 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.25 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx || reduce) return;

    const rect = wrap.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    const rows = Math.max(1, Math.round((cols * rect.height) / Math.max(1, rect.width)));
    const thresholds = revealThresholds(cols, rows, seed);
    const color = getComputedStyle(wrap).getPropertyValue("--bg").trim() || "#0b0b0b";
    const paint = (progress: number) =>
      drawCells(ctx, canvas.width, canvas.height, cols, rows, thresholds, color, (t) => t >= progress);

    paint(inView ? 0 : -1);
    canvas.setAttribute("data-ready", "");
    if (!inView) return;

    const controls = animate(0, 1, { duration: 0.8, ease: "linear", onUpdate: paint });
    return () => controls.stop();
  }, [inView, reduce, cols, seed]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      {children}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pixel-cover pointer-events-none absolute inset-0 block h-full w-full"
      />
    </div>
  );
}
