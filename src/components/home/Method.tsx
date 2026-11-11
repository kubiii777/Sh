"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { method } from "@/data/home";
import { seededRandom } from "@/lib/seeded-random";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** Postęp i-tego z n kolejnych odcinków osi t ∈ [0, 1]. */
const part = (t: number, i: number, n: number) => clamp01(t * n - i);
const two = (n: number) => String(n).padStart(2, "0");

/* ---------- 01 Audyt: lista obszarów skanowana po kolei ---------- */

function PixelBar({ p, cells = 12 }: { p: number; cells?: number }) {
  const filled = Math.round(p * cells);
  return (
    <span className="flex gap-[3px]">
      {Array.from({ length: cells }, (_, i) => (
        <span key={i} className={`h-2.5 w-2.5 ${i < filled ? "bg-fg" : "bg-line"}`} />
      ))}
    </span>
  );
}

function AuditVisual({ t }: { t: number }) {
  const items = method[0].points;
  const n = items.length + 1;
  const report = part(t, items.length, n);
  return (
    <div className="font-mono text-[13px]">
      <ul className="border-t border-line">
        {items.map((item, i) => {
          const p = part(t, i, n);
          return (
            <li key={item} className="grid grid-cols-[2rem_1fr_auto_5rem] items-center gap-4 border-b border-line py-3">
              <span className="text-mute">{two(i + 1)}</span>
              <span className={p > 0 ? "text-fg" : "text-mute"}>{item}</span>
              <PixelBar p={p} />
              <span className={`text-right ${p >= 1 ? "text-fg" : "text-mute"}`}>
                {p >= 1 ? "[ok]" : p > 0 ? "skan" : "—"}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-5 flex justify-between text-[12px] uppercase tracking-[0.08em]">
        <span className={report > 0 ? "text-fg" : "text-mute"}>→ Raport z priorytetami</span>
        <span className={report >= 1 ? "bg-fg px-2 text-bg" : "text-mute"}>
          {report >= 1 ? "gotowy" : report > 0 ? "generuję" : "oczekuje"}
        </span>
      </p>
    </div>
  );
}

/* ---------- 02 Projekt: architektura rysowana krok po kroku ---------- */

type Node = { label: string; x: number; y: number; w: number };
const NODE_H = 40;
const nodes: Record<string, Node> = {
  users: { label: "Użytkownicy", x: 245, y: 8, w: 150 },
  front: { label: "Frontend", x: 40, y: 118, w: 150 },
  api: { label: "API", x: 245, y: 118, w: 150 },
  admin: { label: "Panel admina", x: 450, y: 118, w: 150 },
  db: { label: "Baza danych", x: 40, y: 228, w: 150 },
  integrations: { label: "Integracje", x: 245, y: 228, w: 150 },
  monitoring: { label: "Monitoring", x: 450, y: 228, w: 150 },
};
const edges: Record<string, string> = {
  "users-front": "M320 48 V83 H115 V118",
  "front-api": "M190 138 H245",
  "admin-api": "M450 138 H395",
  "api-db": "M320 158 V193 H115 V228",
  "api-integrations": "M320 158 V228",
  "api-monitoring": "M320 158 V193 H525 V228",
};
// Kolejność rysowania: węzeł, potem krawędź, która do niego prowadzi.
const designSteps: [kind: "node" | "edge", id: string][] = [
  ["node", "users"],
  ["node", "front"],
  ["edge", "users-front"],
  ["node", "api"],
  ["edge", "front-api"],
  ["node", "admin"],
  ["edge", "admin-api"],
  ["node", "db"],
  ["edge", "api-db"],
  ["node", "integrations"],
  ["edge", "api-integrations"],
  ["node", "monitoring"],
  ["edge", "api-monitoring"],
];

function DesignVisual({ t }: { t: number }) {
  const deliverables = method[1].points;
  const total = designSteps.length + deliverables.length;
  return (
    <div>
      <svg viewBox="0 0 640 276" className="h-[17rem] w-full" fill="none">
        {designSteps.map(([kind, id], i) => {
          const p = part(t, i, total);
          if (kind === "edge") {
            return (
              <path
                key={id}
                d={edges[id]}
                pathLength={1}
                stroke="currentColor"
                strokeWidth={1}
                strokeDasharray="1 1"
                strokeDashoffset={1 - p}
              />
            );
          }
          const n = nodes[id];
          return (
            <g key={id}>
              <rect
                x={n.x + 0.5}
                y={n.y + 0.5}
                width={n.w}
                height={NODE_H}
                pathLength={1}
                stroke="currentColor"
                strokeWidth={1}
                strokeDasharray="1 1"
                strokeDashoffset={1 - p}
                fill={p >= 1 ? "var(--bg)" : "none"}
              />
              <text
                x={n.x + n.w / 2}
                y={n.y + NODE_H / 2 + 4}
                textAnchor="middle"
                fill="currentColor"
                opacity={p >= 0.6 ? 1 : 0}
                style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
      <ul className="mt-6 grid grid-cols-4 gap-3">
        {deliverables.map((item, i) => {
          const done = part(t, designSteps.length + i, total) >= 1;
          return (
            <li
              key={item}
              className={`label border px-3 py-2.5 text-center transition-colors duration-150 ${
                done ? "border-fg bg-fg text-bg" : "border-line text-mute"
              }`}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- 03 Sprinty: pętla planowanie → budowa → review → demo ---------- */

const LOOP: [number, number][] = [
  [320, 40],
  [560, 40],
  [560, 220],
  [80, 220],
  [80, 40],
  [320, 40],
];
const LOOP_SEGMENTS = LOOP.slice(1).map(([x, y], i) => Math.hypot(x - LOOP[i][0], y - LOOP[i][1]));
const LOOP_LENGTH = LOOP_SEGMENTS.reduce((a, b) => a + b, 0);
const LOOP_PATH = `M${LOOP.map(([x, y]) => `${x} ${y}`).join(" L")}`;

function pointAt(distance: number): [number, number] {
  let rest = distance;
  for (let i = 0; i < LOOP_SEGMENTS.length; i++) {
    const len = LOOP_SEGMENTS[i];
    if (rest <= len) {
      const k = rest / len;
      return [LOOP[i][0] + (LOOP[i + 1][0] - LOOP[i][0]) * k, LOOP[i][1] + (LOOP[i + 1][1] - LOOP[i][1]) * k];
    }
    rest -= len;
  }
  return LOOP[0];
}

// Etapy sprintu na środkach boków pętli; odległość liczona wzdłuż ścieżki od startu.
const sprintNodes = [
  { at: 0, x: 320, y: 40 },
  { at: 240 + 90, x: 560, y: 130 },
  { at: 240 + 180 + 240, x: 320, y: 220 },
  { at: 240 + 180 + 480 + 90, x: 80, y: 130 },
];
const SPRINTS = 3;

function SprintVisual({ t }: { t: number }) {
  const labels = method[2].points;
  const x = t * SPRINTS;
  const sprint = Math.min(SPRINTS - 1, Math.floor(x));
  const loop = t >= 1 ? 1 : x - Math.floor(x);
  const d = loop * LOOP_LENGTH;
  const [mx, my] = pointAt(d);

  return (
    <div>
      <svg viewBox="0 0 640 260" className="h-[16.5rem] w-full" fill="none">
        <path d={LOOP_PATH} stroke="var(--line)" strokeWidth={1} strokeDasharray="2 6" />
        <path
          d={LOOP_PATH}
          pathLength={1}
          stroke="currentColor"
          strokeWidth={1}
          strokeDasharray="1 1"
          strokeDashoffset={1 - loop}
        />
        <text
          x={320}
          y={128}
          textAnchor="middle"
          fill="currentColor"
          style={{ fontFamily: "var(--font-sans)", fontSize: 44, fontWeight: 500, letterSpacing: "-0.04em" }}
        >
          Sprint {two(sprint + 1)}
        </text>
        <text
          x={320}
          y={156}
          textAnchor="middle"
          fill="var(--mute)"
          style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}
        >
          kończy się działającą wersją
        </text>
        {sprintNodes.map((node, i) => {
          const passed = d >= node.at;
          const w = labels[i].length * 8.2 + 28;
          return (
            <g key={labels[i]}>
              <rect
                x={node.x - w / 2 + 0.5}
                y={node.y - 18 + 0.5}
                width={w}
                height={36}
                stroke="currentColor"
                strokeWidth={1}
                fill={passed ? "currentColor" : "var(--bg)"}
              />
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                fill={passed ? "var(--bg)" : "currentColor"}
                style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}
              >
                {labels[i]}
              </text>
            </g>
          );
        })}
        <rect x={mx - 6} y={my - 6} width={12} height={12} fill="currentColor" />
      </svg>
      <ol className="mt-5 grid grid-cols-3 gap-3">
        {Array.from({ length: SPRINTS }, (_, i) => {
          const done = i < sprint || (i === sprint && loop >= 1);
          const now = i === sprint && !done;
          return (
            <li
              key={i}
              className={`label flex justify-between border px-3 py-2.5 ${
                done ? "border-fg bg-fg text-bg" : now ? "border-fg" : "border-line text-mute"
              }`}
            >
              <span>Sprint {two(i + 1)}</span>
              <span>{done ? "wersja testowa" : now ? "w toku" : "—"}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ---------- 04 Wdrożenie i utrzymanie: checklista startu, potem monitoring ---------- */

const MON_COLS = 48;
const MON_ROWS = 6;
const monitorThresholds = (() => {
  const rand = seededRandom(91);
  return Array.from({ length: MON_COLS * MON_ROWS }, (_, i) => ((i % MON_COLS) + rand() * 4) / (MON_COLS + 4));
})();

function LaunchVisual({ t }: { t: number }) {
  const items = method[3].points;
  const steps = items.length + 2;
  const grid = clamp01((t * steps - items.length) / 2);
  return (
    <div className="font-mono text-[13px]">
      <ul className="grid grid-cols-2 gap-x-6">
        {items.map((item, i) => {
          const p = part(t, i, steps);
          return (
            <li key={item} className="flex items-center justify-between gap-4 border-t border-line py-3">
              <span className={p > 0 ? "text-fg" : "text-mute"}>{item}</span>
              <span className={p >= 1 ? "text-fg" : "text-mute"}>{p >= 1 ? "[ok]" : p > 0 ? "…" : "—"}</span>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 border-t border-line pt-4">
        <p className="flex justify-between text-[12px] uppercase tracking-[0.08em] text-mute">
          <span>monitoring.status</span>
          <span className={grid >= 1 ? "bg-fg px-2 text-bg" : ""}>
            {grid >= 1 ? "system działa" : grid > 0 ? "uruchamiam" : "oczekuje"}
          </span>
        </p>
        <svg viewBox={`0 0 ${MON_COLS * 10} ${MON_ROWS * 10}`} className="mt-4 w-full" aria-hidden="true">
          {monitorThresholds.map((threshold, i) => (
            <rect
              key={i}
              x={(i % MON_COLS) * 10}
              y={Math.floor(i / MON_COLS) * 10}
              width={8}
              height={8}
              fill={threshold < grid ? "currentColor" : "var(--line)"}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

const visuals = [AuditVisual, DesignVisual, SprintVisual, LaunchVisual];

/* ---------- Sekcja ---------- */

/**
 * Metoda pracy. Desktop: sekcja przypięta (sticky), scroll przechodzi przez cztery etapy,
 * a każdy ma własną animację sterowaną postępem. Mobile i reduced motion: statyczna lista.
 * Statyczna lista zostaje w DOM także na desktopie (sr-only), bo animacja jest ukryta przed czytnikami.
 */
export function Method() {
  const reduce = useReducedMotionSafe();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ stage: 0, t: 0 });
  const { scrollYProgress } = useScroll({ target: scrollerRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const x = clamp01(value) * method.length;
    const stage = Math.min(method.length - 1, Math.floor(x));
    // ostatnie 15% etapu pokazuje stan końcowy, zanim wejdzie następny
    const t = Math.round(clamp01((x - stage) / 0.85) * 100) / 100;
    setPos((prev) => (prev.stage === stage && prev.t === t ? prev : { stage, t }));
  });

  const Visual = visuals[pos.stage];

  return (
    <div className="pb-16 md:pb-28 lg:pb-36">
      {!reduce ? (
        <div ref={scrollerRef} aria-hidden="true" className="relative hidden h-[400vh] lg:block">
          <div className="sticky top-[65px] flex h-[calc(100svh-65px)] items-center">
            <div className="wrap grid-12 items-center">
              <ol className="col-span-4">
                {method.map((stage, i) => {
                  const fill = i < pos.stage ? 1 : i === pos.stage ? pos.t : 0;
                  return (
                    <li key={stage.slug} className={`py-4 ${i === pos.stage ? "" : "opacity-40"}`}>
                      <div className="relative h-px bg-line">
                        <div className="absolute inset-y-0 left-0 bg-fg" style={{ width: `${fill * 100}%` }} />
                      </div>
                      <p className="mt-4 flex items-baseline gap-4">
                        <span className="label">{two(i + 1)}</span>
                        <span className="h3">{stage.name}</span>
                      </p>
                      <p className="mt-2 pl-10 text-[1rem] text-mute">{stage.lead}</p>
                    </li>
                  );
                })}
              </ol>
              <div className="col-span-8 border border-line">
                <div className="label flex justify-between border-b border-line px-6 py-3 text-mute">
                  <span>metoda / {method[pos.stage].slug}</span>
                  <span>
                    Etap {two(pos.stage + 1)} / {two(method.length)}
                  </span>
                </div>
                <div className="flex h-[27rem] flex-col justify-center px-6 xl:px-10">
                  <Visual t={pos.t} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className={`wrap ${reduce ? "" : "lg:sr-only"}`}>
        <ol className="border-b border-line">
          {method.map((stage, i) => (
            <li key={stage.slug} className="grid-12 gap-y-4 border-t border-line py-8 md:py-10">
              <div className="col-span-12 lg:col-span-4">
                <p className="label text-mute">{two(i + 1)}</p>
                <h3 className="h3 mt-2">{stage.name}</h3>
              </div>
              <div className="col-span-12 lg:col-span-8">
                <p className="lead">{stage.lead}</p>
                <ul className="mt-5 grid gap-x-6 sm:grid-cols-2">
                  {stage.points.map((point) => (
                    <li key={point} className="border-t border-line py-3 text-[1rem] text-mute">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
