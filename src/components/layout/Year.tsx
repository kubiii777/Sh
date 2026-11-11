"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const buildYear = process.env.NEXT_PUBLIC_BUILD_YEAR ?? "";

/**
 * Bieżący rok. W statycznym HTML jest rok builda (odczyt czasu nie może trafić do prerenderu),
 * po hydracji przeglądarka podstawia aktualny.
 */
export function Year() {
  const year = useSyncExternalStore(
    subscribe,
    () => String(new Date().getFullYear()),
    () => buildYear,
  );
  return <span>{year}</span>;
}
