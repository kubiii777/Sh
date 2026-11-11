/** Strzałka rysowana liniami 1.5 px. Dziedziczy kolor i skaluje się z fontem. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      className={`inline-block h-[0.9em] w-[0.9em] shrink-0 ${className}`}
    >
      <path d="M3 12h17M13 5l7 7-7 7" />
    </svg>
  );
}
