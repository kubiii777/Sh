"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

/**
 * prefers-reduced-motion bezpieczne dla hydracji: podczas hydracji zwraca wartość serwerową (false),
 * a zaraz potem prawdziwą. Używać tam, gdzie od wartości zależy struktura HTML.
 */
export function useReducedMotionSafe() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}
