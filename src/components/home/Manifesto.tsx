"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useDesktopMotion } from "@/lib/use-reduced-motion";

function Word({ word, i, n, progress }: { word: string; i: number; n: number; progress: MotionValue<number> }) {
  const start = i / n;
  const opacity = useTransform(progress, [start, Math.min(1, start + 1.5 / n)], [0.16, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

/**
 * Manifest: duży akapit, na desktopie słowa ciemnieją wraz ze scrollem (jedyny ruch sekcji).
 * Mobile i reduced motion: statyczny tekst.
 */
export function Manifesto({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const animate = useDesktopMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="text-[1.75rem] font-medium leading-[1.08] tracking-[-0.035em] md:text-[clamp(2.25rem,4.3vw,4.25rem)] md:leading-[1.02] md:tracking-[-0.045em]"
    >
      {animate ? (
        <>
          <span className="sr-only">{text}</span>
          <span aria-hidden="true">
            {words.map((word, i) => (
              <Word key={i} word={word} i={i} n={words.length} progress={scrollYProgress} />
            ))}
          </span>
        </>
      ) : (
        text
      )}
    </p>
  );
}
