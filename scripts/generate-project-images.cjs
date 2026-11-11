// Generuje plakaty projektów demo (1600 x 1000) w palecie strony.
// Motyw: ta sama schodkowa krawędź pikseli, co w przejściach między sekcjami.
// Uruchom: node scripts/generate-project-images.cjs
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, '..', 'public', 'images', 'projects');
const mono = 'file://' + path.join(__dirname, '..', 'node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2');
const sans = 'file://' + path.join(__dirname, '..', 'src/fonts/archivo-latin-wght-normal.woff2');
const INK = '#0b0b0b', PAPER = '#efeee9';

function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

const base = [
  { slug: 'migracja-hurtowni-b2b-na-magento-2', word: 'B2B', tag: 'deploy.staging', n: '01', dark: false, seed: 23, side: 'top' },
  { slug: 'integracja-erp-ksef-allegro', word: 'ERP', tag: 'sync.run', n: '02', dark: true, seed: 67, side: 'right' },
  { slug: 'audyt-bezpieczenstwa-sklepu', word: 'SEC', tag: 'owasp.check', n: '03', dark: true, seed: 37, side: 'top' },
  { slug: 'asystent-dokumentacji-technicznej', word: 'RAG', tag: 'index.build', n: '04', dark: false, seed: 11, side: 'right' },
  { slug: 'hyva-i-przyspieszenie-sklepu', word: 'CWV', tag: 'cwv.measure', n: '05', dark: true, seed: 41, side: 'right' },
  { slug: 'panel-klienta-b2b', word: 'APP', tag: 'ui.build', n: '06', dark: false, seed: 53, side: 'top' },
];
// Każdy projekt: plakat główny + 2 obrazy galerii (odwrócone tło i inna krawędź).
const items = base.flatMap((it) => [
  it,
  { ...it, slug: `${it.slug}-2`, dark: !it.dark, side: it.side === 'top' ? 'right' : 'top', seed: it.seed + 100, tag: `${it.tag} / 02` },
  { ...it, slug: `${it.slug}-3`, seed: it.seed + 200, side: it.side, word: it.n, tag: `${it.tag} / 03` },
]);

// Pole pikseli erodujące od jednej krawędzi: przy krawędzi pełne, dalej coraz rzadsze.
function cells(item) {
  const r = rng(item.seed); const fg = item.dark ? PAPER : INK; const C = 50; const cols = 32, rows = 20; let out = '';
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const d = item.side === 'right' ? (cols - 1 - x) / 13 : y / 9; // 0 przy krawędzi
    if (d >= 1) continue;
    if (r() > d * 0.62 + 0.38 * r() * 0 + (d < 0.25 ? -1 : 0) && r() > d * 1.15) out += `<rect x="${x * C}" y="${y * C}" width="${C}" height="${C}" fill="${fg}"/>`;
  }
  return out;
}

function html(item) {
  const bg = item.dark ? INK : PAPER, fg = item.dark ? PAPER : INK, mute = item.dark ? '#8c8c8c' : '#5e5e5e';
  const label = item.side === 'top' ? 'bottom:56px' : 'top:56px';
  return `<!doctype html><html><head><style>
  @font-face{font-family:M;src:url(${mono})}@font-face{font-family:S;src:url(${sans});font-weight:100 900}
  *{margin:0;box-sizing:border-box}body{width:1600px;height:1000px;background:${bg};color:${fg};position:relative;overflow:hidden}
  svg{position:absolute;inset:0}
  .word{position:absolute;left:44px;bottom:${item.side === 'top' ? 96 : 8}px;font:500 520px/0.8 S;letter-spacing:-0.07em}
  .t{position:absolute;font:400 22px/1 M;letter-spacing:.08em;text-transform:uppercase;color:${mute};left:56px;${label}}
  </style></head><body><svg viewBox="0 0 1600 1000">${cells(item)}</svg>
  <div class="t">${item.n} &nbsp;/&nbsp; [${item.tag}] &nbsp;/&nbsp; projekt demo</div>
  <div class="word">${item.word}</div></body></html>`;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
  for (const item of items) {
    const file = path.join(OUT, '_tmp.html');
    fs.writeFileSync(file, html(item));
    await page.goto('file://' + file);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, `${item.slug}.png`) });
    fs.unlinkSync(file);
  }
  await browser.close();
})();
