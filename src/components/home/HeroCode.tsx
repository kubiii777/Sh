"use client";

import { useEffect, useReducer, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { heroFiles } from "@/data/home";

const ROWS = 10;
const TICK_MS = 28;
const sources = heroFiles.map((file) => file.code.join("\n"));

type State = { file: number; chars: number; out: number; wait: number };
const start: State = { file: 0, chars: 0, out: 0, wait: 20 };

/**
 * Jeden krok animacji: pisanie po 2 znaki, krótka pauza na końcu linii,
 * potem kolejne linie wyniku w terminalu, pauza i następny plik.
 */
function reducer(s: State, action: "tick" | "complete"): State {
  if (action === "complete") return { file: 0, chars: sources[0].length, out: heroFiles[0].output.length, wait: 0 };
  if (s.wait > 0) return { ...s, wait: s.wait - 1 };
  const src = sources[s.file];
  if (s.chars < src.length) {
    const next = Math.min(src.length, s.chars + 2);
    return { ...s, chars: next, wait: src.slice(s.chars, next).includes("\n") ? 5 : 0 };
  }
  const outputs = heroFiles[s.file].output.length;
  if (s.out < outputs) return { ...s, out: s.out + 1, wait: s.out + 1 === outputs ? 100 : 18 };
  return { file: (s.file + 1) % heroFiles.length, chars: 0, out: 0, wait: 10 };
}

// Kolorowanie składni w skali szarości: komentarze przygaszone, słowa kluczowe pełnym kolorem.
const TOKEN =
  /(\/\/.*$|"[^"]*"?|\b(?:import|from|export|async|function|const|await|return|if|final|class|public)\b)/;

function highlight(line: string): ReactNode[] {
  return line
    .split(TOKEN)
    .filter(Boolean)
    .map((part, i) => {
      const cls = part.startsWith("//")
        ? "text-mute"
        : part.startsWith('"')
          ? "text-fg/60"
          : TOKEN.test(part)
            ? "text-fg"
            : "text-fg/75";
      return (
        <span key={i} className={cls}>
          {part}
        </span>
      );
    });
}

/** Edytor w hero: kod pisany na żywo, potem wynik w terminalu. Dekoracja, ukryta przed czytnikami. */
export function HeroCode() {
  const [s, dispatch] = useReducer(reducer, start);
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) {
      dispatch("complete");
      return;
    }
    if (!visible) return;
    const id = window.setInterval(() => {
      if (!document.hidden) dispatch("tick");
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [reduce, visible]);

  const file = heroFiles[s.file];
  const typed = sources[s.file].slice(0, s.chars).split("\n");
  const typing = s.chars < sources[s.file].length;
  const done = !typing;

  return (
    <div ref={rootRef} aria-hidden="true" className="border border-line bg-bg font-mono text-[12px] leading-[22px] xl:text-[13px]">
      <div className="flex items-stretch justify-between border-b border-line">
        <ul className="flex">
          {heroFiles.map((f, i) => (
            <li
              key={f.name}
              className={`border-r border-line px-4 py-2.5 ${i === s.file ? "bg-fg text-bg" : "text-mute"}`}
            >
              {f.name}
            </li>
          ))}
        </ul>
        <span className="label self-center px-4 text-mute">main</span>
      </div>

      <div className="px-4 py-4">
        {Array.from({ length: ROWS }, (_, i) => {
          const exists = i < file.code.length;
          const text = typed[i];
          const caretHere = text !== undefined && i === typed.length - 1;
          return (
            <div key={i} className="flex gap-4 whitespace-pre">
              <span className="w-5 shrink-0 select-none text-right text-mute/60">{exists ? i + 1 : ""}</span>
              <span className="min-w-0 overflow-hidden">
                {text ? highlight(text) : null}
                {caretHere ? (
                  <span className={`ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-fg ${done ? "caret" : ""}`} />
                ) : null}
              </span>
            </div>
          );
        })}
      </div>

      <div className="border-t border-line px-4 py-3">
        {file.output.map((line, i) => (
          <div key={i} className={`whitespace-pre ${i === 0 ? "text-fg" : "text-mute"}`}>
            {done && i < s.out ? line : " "}
          </div>
        ))}
      </div>
    </div>
  );
}
