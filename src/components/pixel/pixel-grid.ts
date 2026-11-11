import { seededRandom } from "@/lib/seeded-random";

export const COLORS = { dark: "#0b0b0b", light: "#efeee9" } as const;
export type Tone = keyof typeof COLORS;

/**
 * Progi dla pasa przejścia. Rząd przy następnej sekcji (dolny) ma najniższe progi,
 * więc wypełnia się pierwszy, a krawędź rozpada się schodkowo.
 * Wartości w [0, 0.98], żeby przy postępie 1 pas był pełny.
 */
export function bandThresholds(cols: number, rows: number, seed: number) {
  const rand = seededRandom(seed);
  const out = new Float32Array(cols * rows);
  for (let r = 0; r < rows; r++) {
    const distance = rows === 1 ? 0 : (rows - 1 - r) / (rows - 1); // 0 = przy następnej sekcji
    for (let c = 0; c < cols; c++) {
      out[r * cols + c] = (distance * 0.62 + rand() * 0.38) * 0.98;
    }
  }
  return out;
}

/** Progi dla odsłonięcia obrazu: losowe, z lekkim kierunkiem z góry na dół. */
export function revealThresholds(cols: number, rows: number, seed: number) {
  const rand = seededRandom(seed);
  const out = new Float32Array(cols * rows);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      out[r * cols + c] = ((r / rows) * 0.35 + rand() * 0.65) * 0.98;
    }
  }
  return out;
}

/**
 * Rysuje komórki spełniające warunek. Krawędzie zaokrąglane do pikseli urządzenia,
 * żeby między komórkami nie było szczelin.
 */
export function drawCells(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cols: number,
  rows: number,
  thresholds: Float32Array,
  color: string,
  visible: (threshold: number) => boolean,
) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = color;
  for (let r = 0; r < rows; r++) {
    const y0 = Math.round((r * height) / rows);
    const y1 = Math.round(((r + 1) * height) / rows);
    for (let c = 0; c < cols; c++) {
      if (!visible(thresholds[r * cols + c])) continue;
      const x0 = Math.round((c * width) / cols);
      const x1 = Math.round(((c + 1) * width) / cols);
      ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    }
  }
}
