// Screenshoty stron w 390, 768 i 1440 px. Wymaga działającego serwera (domyślnie http://localhost:3000).
// Uruchom: node scripts/screenshots.cjs / /styleguide      (argumenty: ścieżki; --dir=nazwa podkatalogu)
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const dirArg = args.find((a) => a.startsWith('--dir='));
const paths = args.filter((a) => !a.startsWith('--'));
const BASE = process.env.BASE_URL || 'http://localhost:3000';
const OUT = path.join(__dirname, '..', 'docs', 'screenshots', dirArg ? dirArg.slice(6) : '');
const WIDTHS = [390, 768, 1440];
const { execFileSync } = require('child_process');
const TMP = fs.mkdtempSync(path.join(require('os').tmpdir(), 'shots-'));
const STITCH = `
import sys, json
from PIL import Image
tiles = json.loads(sys.argv[2])
parts = [Image.open(t['file']).convert('RGB') for t in tiles]
parts = [im.crop((0, t['crop'], im.width, im.height)) for im, t in zip(parts, tiles)]
out = Image.new('RGB', (parts[0].width, sum(p.height for p in parts)))
y = 0
for p in parts:
    out.paste(p, (0, y)); y += p.height
out.save(sys.argv[1])
`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  for (const p of paths.length ? paths : ['/']) {
    const name = p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '-');
    for (const width of WIDTHS) {
      const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 900 }, deviceScaleFactor: 1 });
      await page.goto(BASE + p, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      // powolny scroll, żeby odpalić fade-in, PixelReveal i przejścia
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < height; y += 300) { await page.evaluate((v) => scrollTo(0, v), y); await page.waitForTimeout(60); }
      await page.waitForTimeout(900);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      // Zrzut sklejany z kafli viewportu: przejścia pikselowe zależą od scrolla,
      // więc zwykły fullPage pokazałby je wszystkie w stanie początkowym.
      const vh = page.viewportSize().height;
      const header = 65; // 64 px + linia 1 px
      const tiles = [];
      for (let y = 0, k = 0; y < height; y += vh - header, k++) {
        const top = Math.min(y, Math.max(0, height - vh));
        await page.evaluate((v) => scrollTo(0, v), top);
        await page.waitForTimeout(250);
        const file = path.join(TMP, `${name}-${width}-${k}.png`);
        await page.screenshot({ path: file });
        // z kafla bierzemy pas [crop, vh): pierwszy cały, kolejne bez nagłówka, ostatni tylko brakującą resztę
        const crop = k === 0 ? 0 : header + (y - top);
        tiles.push({ file, crop });
        if (top !== y) break;
      }
      execFileSync('python3', ['-c', STITCH, path.join(OUT, `${name}-${width}.png`), JSON.stringify(tiles)]);
      tiles.forEach((t) => fs.unlinkSync(t.file));
      console.log(`${name}-${width}.png  wysokość ${height}px  poziomy overflow ${overflow}px`);
      await page.close();
    }
  }
  await browser.close();
})();
