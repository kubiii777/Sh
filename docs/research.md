# Research referencji (faza 0)

Zebrane skryptami `scripts/research.cjs` i `scripts/research-pixels.cjs` (Playwright, Chromium headless).
Surowe dane: `docs/research/styles.json`, `docs/research/pixels/structure.json`.

Żadna strona nie zablokowała przeglądarki headless. Jedno zastrzeżenie: subduxion.com ładuje pliki fontów
z hosta, którego nie przepuszcza sieć środowiska, więc jego screenshoty pokazują font zastępczy.
Nazwy fontów i wszystkie metryki (rozmiar, waga, interlinia, tracking) pochodzą z `getComputedStyle` i są wiarygodne.

## Screenshoty

| Strona | 1440 px | 390 px |
|---|---|---|
| ethiack.com | `research/ethiack-1440-full.png` | `research/ethiack-390-full.png` |
| contentarchitecture.dev | `research/contentarchitecture-1440-full.png` | `research/contentarchitecture-390-full.png` |
| subduxion.com | `research/subduxion-1440-full.png` | `research/subduxion-390-full.png` |

Seria scrolla co 150 px wokół dwóch przejść: `research/pixels/edge1-*.png`, `research/pixels/edge2-*.png`.

## ethiack.com — układ i UX (bez kolorystyki)

Co widać:
- Strona udaje edytor kodu: pasek „zakładek plików” (`Index.page`, `Issue.section`…), boczny panel `Console.log` z numerowanymi liniami.
- Sekcja See / Test / Act: trzy bloki jeden pod drugim. Każdy ma belkę z nazwą, jedno duże zdanie otwierające i trzy punkty (tytuł wersalikami + jedno zdanie).
- Nagłówki sekcji wersalikami, poprzedzone małą etykietą mono.
- Sekcja z siatką linii 1 px i pojedynczymi literami w komórkach.
- H1 58 px / lh 1.0 / tracking -0.04em, tekst 16 px, etykiety mono 12 px.

Co bierzemy:
- Trójkę „.01 Audytujemy / .02 Budujemy / .03 Utrzymujemy” w układzie belka → zdanie otwierające → 3 punkty.
- Blok terminala z numerami linii (hero i `security.log`).
- Etykiety sekcji w konwencji nazw plików / numeracji (`.01 — USŁUGI`).
- Podziały liniami 1 px zamiast kart.

Czego nie bierzemy: zieleni, zaokrągleń 20–26 px, kart z liczbami, rastrowej grafiki w hero, pływającej nawigacji na dole.

## contentarchitecture.dev — kolory, faktury, przejścia pikselowe

Kolory (computed):
- jasne tło `rgb(241, 238, 231)` = `#F1EEE7`
- ciemne tło `rgb(35, 35, 35)` = `#232323`, panele głębsze, prawie czarne
- tekst drugorzędny na jasnym `rgb(91, 90, 86)` = `#5B5A56`
- tekst drugorzędny na ciemnym: biel z kryciem 55%
- brak koloru akcentu poza jedną pomarańczową kropką

Typografia: Geist Sans 500 w nagłówkach (43–46 px, lh 1.0–1.1), Geist Mono wersalikami w etykietach, nawigacji i przyciskach (12–16 px). Numeracja `001 / AGENT-NATIVE`.

Faktury:
- szachownica 4 × 4 px z `repeating-conic-gradient` (biel 22%) na ramkach paneli,
- w ciemnych sekcjach ledwo widoczne znaki mono w tle.

### Mechanika przejścia pikselowego

Ustalone z serii scrolla i ze struktury DOM:
- Każde przejście to **jeden `<canvas>`** pozycjonowany absolutnie na górze sekcji, pełna szerokość, wysokość ok. 546 px przy viewporcie 900 px (ok. 60% wysokości ekranu).
- Canvas rysuje komórki w kolorze **sąsiedniej** sekcji, więc krawędź nie jest linią, tylko „panoramą” ze schodków.
- Efekt jest **przypięty do scrolla**: w tym samym miejscu strony udział ciemnych komórek rósł 16% → 34% → 51% przy trzech kolejnych pozycjach scrolla (co 150 px). Przy scrollu w górę cofa się.
- Gęstość rośnie w stronę następnej sekcji: przy jej krawędzi komórki są zwarte, dalej pojedyncze i rozproszone.
- Układ komórek jest stały między klatkami (te same komórki w tych samych miejscach), czyli progi są deterministyczne, nic nie migocze.
- Komórki są drobne: ok. 14 px wysokości (siatka znaków mono), szerokości jako wielokrotności ok. 12 px. W części komórek są litery.

Co bierzemy:
- Dokładnie ten model: jeden canvas na przejście, stałe progi z seeda, gradient progów w stronę następnej sekcji, postęp liczony ze scrolla, odwracalność.
- Jasny/ciemny rytm sekcji i brak akcentu.
- Etykiety mono wersalikami z numeracją.

Czym się różnimy (świadomie):
- Kwadratowe piksele bez liter. Litery w komórkach to znak rozpoznawczy tamtej strony, a nie mechanika.
- Rozmiar piksela: SPEC zakłada 24 × 6 (piksel 60 px przy 1440). Referencja ma komórki ok. 4× drobniejsze. Komponent ma parametry `cols` i `rows`; domyślnie zostaje 24 × 6 ze SPEC, a w `/styleguide` jest też wariant drobny 48 × 10 do porównania.
- Zamiast szachownicy 4 px i liter w tle: statyczna siatka kropek ze SPEC.

## subduxion.com — typografia

Fonty (computed + `document.fonts`):
- **Archivo** (variable, 100–900) — nagłówki i tekst.
- **IBM Plex Mono** (400, 500) — etykiety.

Oba są w Google Fonts na licencji **SIL Open Font License**, czyli darmowe także komercyjnie. Nie ma nic do kupienia.

Metryki:

| Element | 1440 px | 390 px |
|---|---|---|
| h1 | 60 px, 500, lh 1.0, tracking -0.06em | 36 px, 500, lh 1.1, tracking -0.03em |
| h2 | 48–56 px, 500, lh 1.0, tracking -0.045 do -0.06em | 40 px, 500, lh 1.0 |
| h3 | 40 px, 500, lh 1.05, tracking -0.06em | bez zmian |
| lead | 24 px, 400, lh 1.4 | 18 px, lh 1.4 |
| tekst | 20 px, 400, lh 1.45 | 16 px, lh 1.45 |
| etykieta | IBM Plex Mono 12 px, uppercase, tracking 0.04em, lh 20 px | bez zmian |
| nawigacja | 14 px, 500 | — |

Charakter: jedna rodzina w dwóch wagach (500 w nagłówkach, 400 w tekście), bardzo ciasny tracking, interlinia 1.0 w nagłówkach, kolor tekstu to nie czysta czerń.

Co bierzemy:
- **Archivo** jako font nagłówków i tekstu, waga 500 / 400. Pliki z pakietu npm `@fontsource-variable/archivo`, podpięte przez `next/font/local` (hostowane lokalnie, zero zapytań do Google).
- Ciasny tracking i interlinię 0.95–1.0 w nagłówkach. SPEC podaje -0.03em; przy Archivo w dużych rozmiarach używamy -0.045em (referencja ma -0.06em, co przy polskich ogonkach i długich słowach jest za ciasne).
- Etykiety mono: zostaje **Geist Mono** ze SPEC (12 px, uppercase, 0.08em). IBM Plex Mono byłby bliżej referencji, ale SPEC wskazuje Geist Mono wprost.

Polskie znaki: Archivo i Geist Mono mają pełny zestaw latin-ext; test `ą ę ł ś ż ź ć ń ó` jest na `/styleguide`.

## Propozycja odcieni

SPEC: czerń `#0B0B0B`, biel `#EFEEE9`. Referencja: `#232323` i `#F1EEE7`.

Zostaję przy wartościach ze SPEC. Głębsza czerń daje mocniejszy kontrast przejść pikselowych, a `#EFEEE9` jest praktycznie tym samym odcieniem co `#F1EEE7`. Jeśli strona na żywo wyda się zbyt twarda, alternatywą jest ciemne tło `#161616`; to jedna zmienna w `globals.css`.
