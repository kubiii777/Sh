// Faza 0: mechanika przejsc pikselowych na contentarchitecture.dev
// 1) szuka granic sekcji jasna/ciemna, 2) robi serie screenshotow co 150 px wokol dwoch z nich,
// 3) zapisuje, jakie elementy (canvas/svg/div) leza w strefie przejscia.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'docs', 'research', 'pixels');
fs.mkdirSync(OUT, { recursive: true });
const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;

(async () => {
  const browser = await chromium.launch({ proxy });
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await page.goto('https://www.contentarchitecture.dev', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 100)); } scrollTo(0, 0); });
  await page.waitForTimeout(800);

  const info = await page.evaluate(() => {
    const lum = (c) => { const m = c.match(/[\d.]+/g); if (!m || (m[3] !== undefined && +m[3] === 0)) return null; return (0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]); };
    const blocks = [...document.querySelectorAll('section, main > div, main > *')].map((e) => {
      const r = e.getBoundingClientRect(); const l = lum(getComputedStyle(e).backgroundColor);
      return { top: Math.round(r.top + scrollY), h: Math.round(r.height), w: Math.round(r.width), l, cls: (e.className || '').toString().slice(0, 80), tag: e.tagName };
    }).filter((b) => b.l !== null && b.w > innerWidth * 0.9 && b.h > 300).sort((a, b) => a.top - b.top);
    const canv = [...document.querySelectorAll('canvas, svg, [class*="pixel" i], [class*="dither" i], [class*="transition" i], [style*="mask"]')].map((e) => {
      const r = e.getBoundingClientRect(); const s = getComputedStyle(e);
      return { tag: e.tagName, cls: (e.className.baseVal ?? e.className ?? '').toString().slice(0, 100), top: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height),
        pos: s.position, mask: (s.maskImage || s.webkitMaskImage || '').slice(0, 120), bgImg: s.backgroundImage.slice(0, 160), bgSize: s.backgroundSize, children: e.children.length };
    }).filter((c) => c.w > 300 && c.h > 20);
    return { blocks, canv, total: document.documentElement.scrollHeight };
  });
  fs.writeFileSync(path.join(OUT, 'structure.json'), JSON.stringify(info, null, 2));
  const edges = [];
  for (let i = 1; i < info.blocks.length; i++) {
    const a = info.blocks[i - 1], b = info.blocks[i];
    if ((a.l > 128) !== (b.l > 128) && !edges.some((e) => Math.abs(e - b.top) < 400)) edges.push(b.top);
  }
  console.log('edges', edges, 'canvases', info.canv.length);
  for (const [n, edge] of edges.slice(0, 2).entries()) {
    for (let k = 0; k < 9; k++) {
      const y = Math.max(0, edge - 900 + k * 150);
      await page.evaluate((yy) => scrollTo(0, yy), y);
      await page.waitForTimeout(450);
      await page.screenshot({ path: path.join(OUT, `edge${n + 1}-${String(k).padStart(2, '0')}-y${y}.png`) });
    }
  }
  await browser.close();
})();
