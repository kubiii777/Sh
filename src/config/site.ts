// Jedno miejsce na dane firmy. Wszystko w nawiasach kwadratowych to placeholder:
// lista w docs/placeholders.md.
export const site = {
  name: "[NAZWA]",
  url: "https://example.com",
  description:
    "Software house: Magento, aplikacje webowe, automatyzacje i integracje (ERP, KSeF, marketplace'y), oprogramowanie dla dużych firm i Safe Control.",
  email: "[email@domena.pl]",
  phone: "[+48 000 000 000]",
  address: "[Ulica 0, 00-000 Miasto]",
  nip: "[NIP]",
  krs: "[KRS]",
  /** Link do kalendarza (np. Cal.com, Calendly) dla „Umów 30-min rozmowę”. */
  calendar: "#",
  /** Dane administratora do polityki prywatności. */
  legalName: "[Pełna nazwa firmy]",
  social: {
    linkedin: "#",
    github: "#",
  },
} as const;

export const nav = [
  { href: "/uslugi", label: "Usługi" },
  { href: "/realizacje", label: "Realizacje" },
  { href: "/o-nas", label: "O nas" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

/** Link mailto z opcjonalnym tematem (np. nazwa usługi). */
export function mailto(subject?: string) {
  return `mailto:${site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}
