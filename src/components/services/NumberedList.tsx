import type { Item } from "@/data/services";
import { two } from "@/lib/spacing";

/** Lista numerowanych pozycji: numer mono, nazwa, opis. Kroki procesu, zakres, sekcje dodatkowe. */
export function NumberedList({ items, ordered = false }: { items: Item[]; ordered?: boolean }) {
  const List = ordered ? "ol" : "ul";
  return (
    <List className="border-b border-line">
      {items.map((item, i) => (
        <li key={item.name} className="grid-12 gap-y-2 border-t border-line py-6 md:py-8">
          <span className="label col-span-12 pt-1 text-mute md:col-span-1">{two(i + 1)}</span>
          <h3 className="h3 col-span-12 md:col-span-5">{item.name}</h3>
          <p className="col-span-12 text-mute md:col-span-6">{item.text}</p>
        </li>
      ))}
    </List>
  );
}
