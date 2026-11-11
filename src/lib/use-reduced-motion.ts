"use client";

import { useSyncExternalStore } from "react";

/**
 * Media query bezpieczne dla hydracji: podczas hydracji zwraca wartość serwerową (false),
 * a zaraz potem prawdziwą. Używać tam, gdzie od wyniku zależy struktura HTML.
 */
export function useMediaQuerySafe(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function useReducedMotionSafe() {
  return useMediaQuerySafe("(prefers-reduced-motion: reduce)");
}

/** Efekty scrolla tylko na desktopie i bez reduced motion (mobile ma wyłącznie fade-in i piksele). */
export function useDesktopMotion() {
  return useMediaQuerySafe("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
}
