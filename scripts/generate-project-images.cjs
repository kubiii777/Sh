// Generuje abstrakcyjne obrazy projektów demo (1600 x 1000) w palecie strony.
// Uruchom: node scripts/generate-project-images.cjs
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, '..', 'public', 'images', 'projects');
const mono = 'file://' + path.join(__dirname, '..', 'node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2');
const sans = 'file://' + path.join(__dirname, '..', 'src/fonts/archivo-latin-wght-normal.woff2');
const INK = '#0b0b0b', PAPER = '#efeee9';

function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

const items = [
  { slug: 'asystent-dokumentacji-technicznej', word: 'RAG', tag: 'index.build', dark: true, seed: 11, shape: 'rows' },
  { slug: 'migracja-hurtowni-b2b-na-magento-2', word: 'M2', tag: 'deploy.staging', dark: false, seed: 23, shape: 'blocks' },
  { slug: 'audyt-bezpieczenstwa-sklepu', word: 'SEC', tag: 'owasp.check', dark: true, seed: 37, shape: 'scan' },
  { slug: 'optymalizacja-wydajnosci-sklepu', word: 'CWV', tag: 'cwv.measure', dark: false, seed: 41, shape: 'bars' },
  { slug: 'panel-klienta-b2b', word: 'APP', tag: 'ui.build', dark: true, seed: 53, shape: 'blocks' },
  { slug: 'integracja-erp-z-magazynem', word: 'ERP', tag: 'sync.run', dark: false, seed: 67, shape: 'rows' },
];

function cells(item) {
  const r = rng(item.seed); const fg = item.dark ? PAPER : INK; const C = 40; const cols = 1600 / C, rows = 1000 / C; let out = '';
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    if (y < 3) continue; // pas na etykiety
    let p = 0;
    if (item.shape === 'rows') p = (y % 4 === 1 && x > 4 && x < 4 + r() * 34) ? 0.85 : 0.02;
    if (item.shape === 'blocks') p = (x > 22 ? 0.12 + (x - 22) / 30 : 0.02) * (y > 3 && y < 21 ? 1 : 0.2);
    if (item.shape === 'scan') p = Math.abs(x - 26) + Math.abs(y - 12) < 9 ? 0.55 : 0.03;
    if (item.shape === 'bars') p = (x > 20 && x % 3 === 0 && y > 22 - ((x * 7 + item.seed) % 17)) ? 0.95 : 0.015;
    if (r() < p) out += `<rect x="${x * C}" y="${y * C}" width="${C}" height="${C}" fill="${fg}" opacity="${(0.25 + r() * 0.75).toFixed(2)}"/>`;
  }
  return out;
}

function html(item) {
  const bg = item.dark ? INK : PAPER, fg = item.dark ? PAPER : INK, line = item.dark ? '#2a2a2a' : '#d6d5cf', mute = item.dark ? '#8c8c8c' : '#5e5e5e';
  return `<!doctype html><html><head><style>
  @font-face{font-family:M;src:url(${mono})}@font-face{font-family:S;src:url(${sans});font-weight:100 900}
  *{margin:0;box-sizing:border-box}body{width:1600px;height:1000px;background:${bg};color:${fg};position:relative;overflow:hidden}
  .grid{position:absolute;inset:0;background-image:linear-gradient(${line} 1px,transparent 1px),linear-gradient(90deg,${line} 1px,transparent 1px);background-size:200px 200px}
  svg{position:absolute;inset:0}
  .word{position:absolute;left:56px;bottom:20px;font:500 420px/0.8 S;letter-spacing:-0.06em}
  .t{position:absolute;font:400 22px/1 M;letter-spacing:.08em;text-transform:uppercase;color:${mute}}
  </style></head><body><div class="grid"></div><svg viewBox="0 0 1600 1000">${cells(item)}</svg>
  <div class="t" style="left:56px;top:56px">[${item.tag}]</div><div class="t" style="right:56px;top:56px;color:${fg}">Projekt demo</div>
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
    console.log(item.slug);
  }
  await browser.close();
})();
