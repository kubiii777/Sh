import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/config/site";
import { seededRandom } from "@/lib/seeded-random";

export const alt = `${site.name}: oprogramowanie, które myśli i się broni`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fonts = join(process.cwd(), "src/assets/fonts");
const [archivo, archivoExt, mono] = await Promise.all([
  readFile(join(fonts, "archivo-latin-500-normal.woff")),
  readFile(join(fonts, "archivo-latin-ext-500-normal.woff")),
  readFile(join(fonts, "GeistMono-Regular.ttf")),
]);

// Pas pikseli jak w przejściach między sekcjami: 32 kolumny, schodkowa krawędź z seeda.
const COLS = 32;
const ROWS = 4;
const CELL = size.width / COLS;
const rand = seededRandom(7);
const cells: { x: number; y: number }[] = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const threshold = ((ROWS - 1 - r) / (ROWS - 1)) * 0.62 + rand() * 0.38;
    if (threshold < 0.55) cells.push({ x: c * CELL, y: size.height - (ROWS - r) * CELL });
  }
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#0b0b0b", color: "#efeee9", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "48px 56px 0", fontFamily: "Geist Mono", fontSize: 20, letterSpacing: 2, textTransform: "uppercase", color: "#8c8c8c" }}>
          <span>{site.name}</span>
          <span>Magento / Web / Automatyzacje / Safe Control</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", padding: "56px 56px 0", fontFamily: "Archivo", fontSize: 96, lineHeight: 0.95, letterSpacing: -4.5 }}>
          <span>Budujemy oprogramowanie,</span>
          <span>które myśli i się broni.</span>
        </div>
        {cells.map((cell, i) => (
          <div key={i} style={{ position: "absolute", left: cell.x, top: cell.y, width: CELL + 1, height: CELL + 1, background: "#efeee9" }} />
        ))}
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivo, weight: 500, style: "normal" },
        { name: "Archivo", data: archivoExt, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
