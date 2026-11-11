# Placeholdery do uzupełnienia

Wszystko w nawiasach kwadratowych na stronie jest placeholderem. Dane firmy są w jednym pliku: `src/config/site.ts`.

## Dane firmy — `src/config/site.ts`
| Pole | Placeholder | Gdzie widać |
|---|---|---|
| `name` | `[NAZWA]` | logo, wordmark w stopce, tytuły stron, obrazek OG, JSON-LD |
| `legalName` | `[Pełna nazwa firmy]` | polityka prywatności |
| `email` | `[email@domena.pl]` | wszystkie CTA i linki mailto, stopka, kontakt |
| `phone` | `[+48 000 000 000]` | stopka, kontakt, JSON-LD |
| `address` | `[Ulica 0, 00-000 Miasto]` | stopka, kontakt, polityka |
| `nip`, `krs` | `[NIP]`, `[KRS]` | stopka, O nas, polityka |
| `calendar` | `#` | przycisk „Umów 30-min rozmowę” (np. link Cal.com / Calendly) |
| `social.linkedin`, `social.github` | `#` | stopka, JSON-LD (`sameAs` pojawi się po wpisaniu pełnych URL) |
| `url` | `https://example.com` | canonical, sitemap, Open Graph, JSON-LD |

## Treści
| Placeholder | Plik |
|---|---|
| Zespół: `[Imię i nazwisko 1–4]`, `[Rola]`, `[Zdjęcie 01–04]`, linki LinkedIn `#` | `src/app/o-nas/page.tsx` |
| Certyfikaty: `[Certyfikat 1–4]` | `src/app/o-nas/page.tsx` |
| Polityka prywatności: `[okres]` przechowywania (2×), `[dostawca]` hostingu i poczty, przekazanie poza EOG, `[data]` zmiany | `src/app/polityka-prywatnosci/page.tsx` |
| Realizacje: 6 projektów demo, `[Klient demo]`, efekty `[XX]%` | `src/data/projects.ts` |
| Cytaty klientów: pole `quote` (sekcja renderuje się dopiero po wypełnieniu) | `src/data/projects.ts` |
| Obrazy realizacji: plakaty demo generowane skryptem | `public/images/projects/`, `scripts/generate-project-images.cjs` |

## Przed startem
- Ustawić `NEXT_PUBLIC_ALLOW_INDEXING=true` na produkcji (inaczej `noindex` i `Disallow: /`).
- Polityka prywatności: weryfikacja prawna.
