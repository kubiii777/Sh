"use client";

import { useEffect, useState } from "react";
import { Terminal, TerminalLine } from "@/components/ui/Terminal";
import { heroLogs } from "@/data/home";

const VISIBLE = 9;

/** Zapętlone linie logów. Dekoracja: ukryta przed czytnikami, statyczna przy reduced motion. */
export function HeroTerminal() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div aria-hidden="true">
      <Terminal title="build.log" meta="na żywo">
        {Array.from({ length: VISIBLE }, (_, i) => (
          <TerminalLine key={tick + i} n={((tick + i) % 99) + 1}>
            <span className={i === VISIBLE - 1 ? "text-fg" : "text-mute"}>{heroLogs[(tick + i) % heroLogs.length]}</span>
            {i === VISIBLE - 1 ? <span className="ml-2 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] bg-fg" /> : null}
          </TerminalLine>
        ))}
      </Terminal>
    </div>
  );
}
