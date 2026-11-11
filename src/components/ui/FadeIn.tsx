"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/** Jedyny efekt wejścia sekcji: opacity i 12 px w górę, 300 ms, raz. */
export function FadeIn({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      data-fade
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
