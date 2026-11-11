"use client";

import { useCallback, useEffect, useRef } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { COLORS, bandThresholds, drawCells, type Tone } from "./pixel-grid";

type Props = {
  /** Kolor sekcji powyżej. */
  from: Tone;
  /** Kolor sekcji poniżej: w tym kolorze pojawiają się piksele. */
  to: Tone;
  seed?: number;
};

/** Siatka: 32 × 8 na desktopie (piksel 45 px przy 1440), 16 × 4 na mobile. Proporcje pasa 4:1. */
const GRID = { desktop: { cols: 32, rows: 8 }, mobile: { cols: 16, rows: 4 } };

const STATIC_PROGRESS = 0.5;

/**
 * Pas pikseli między sekcjami o różnych kolorach. Jeden canvas, postęp przypięty do scrolla:
 * 0 gdy pas wchodzi od dołu ekranu, 1 gdy jego dolna krawędź dociera do połowy ekranu.
 */
export function PixelTransition({ from, to, seed = 1 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end center"] });

  const state = useRef({
    progress: 0,
    drawn: -1,
    frame: 0,
    cols: 0,
    rows: 0,
    thresholds: new Float32Array(0),
  });

  const draw = useCallback(() => {
    const s = state.current;
    s.frame = 0;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || s.progress === s.drawn) return;
    const p = s.progress;
    drawCells(ctx, canvas.width, canvas.height, s.cols, s.rows, s.thresholds, COLORS[to], (t) => p > t);
    s.drawn = p;
  }, [to]);

  const schedule = useCallback(() => {
    const s = state.current;
    if (!s.frame) s.frame = requestAnimationFrame(draw);
  }, [draw]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduce) return;
    state.current.progress = value;
    schedule();
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const s = state.current;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const { cols, rows } = window.innerWidth < 768 ? GRID.mobile : GRID.desktop;
      if (cols !== s.cols || rows !== s.rows) {
        s.cols = cols;
        s.rows = rows;
        s.thresholds = bandThresholds(cols, rows, seed);
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      s.progress = reduce ? STATIC_PROGRESS : scrollYProgress.get();
      s.drawn = -1;
      schedule();
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    return () => {
      observer.disconnect();
      if (s.frame) cancelAnimationFrame(s.frame);
      s.frame = 0;
    };
  }, [seed, reduce, schedule, scrollYProgress]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="relative aspect-[4/1] w-full"
      style={{ backgroundColor: COLORS[from] }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
