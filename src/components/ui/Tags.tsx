/** Tagi mono (stack, zakres). Linia 1 px, bez zaokrągleń. */
export function Tags({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <li key={item} className="label border border-line px-3 py-2">
          {item}
        </li>
      ))}
    </ul>
  );
}
