// Faza 0: research referencji. Uruchom: node scripts/research.cjs
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'docs', 'research');
const SITES = [
  { id: 'ethiack', url: 'https://ethiack.com' },
  { id: 'contentarchitecture', url: 'https://www.contentarchitecture.dev' },
  { id: 'subduxion', url: 'https://subduxion.com' },
];
const ONLY = process.argv[2];
const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;

const styleProbe = () => {
  const pick = (el) => {
    const s = getComputedStyle(el);
    return {
      tag: el.tagName.toLowerCase(),
      text: (el.innerText || '').trim().slice(0, 60),
      fontFamily: s.fontFamily, fontSize: s.fontSize, fontWeight: s.fontWeight,
      lineHeight: s.lineHeight, letterSpacing: s.letterSpacing, textTransform: s.textTransform,
      color: s.color, background: s.backgroundColor, border: s.border, borderRadius: s.borderRadius,
      padding: s.padding,
    };
  };
  const first = (sel, n = 3) => [...document.querySelectorAll(sel)]
    .filter((e) => e.offsetParent !== null && (e.innerText || '').trim()).slice(0, n).map(pick);
  // etykiety: krotkie elementy uppercase albo mono
  const labels = [...document.querySelectorAll('span,p,div,small,li')]
    .filter((e) => e.children.length === 0 && e.offsetParent !== null)
    .filter((e) => { const t = (e.innerText || '').trim(); const s = getComputedStyle(e);
      return t.length > 1 && t.length < 40 && (s.textTransform === 'uppercase' || /mono/i.test(s.fontFamily)); })
    .slice(0, 5).map(pick);
  const bgs = {};
  document.querySelectorAll('section,main,header,footer,body,div').forEach((e) => {
    const b = getComputedStyle(e).backgroundColor;
    if (b && b !== 'rgba(0, 0, 0, 0)' && e.offsetWidth > innerWidth * 0.8 && e.offsetHeight > 200) bgs[b] = (bgs[b] || 0) + 1;
  });
  const fonts = [...document.fonts].map((f) => `${f.family} ${f.weight} ${f.style} [${f.status}]`);
  return { h1: first('h1'), h2: first('h2'), h3: first('h3', 2), body: pick(document.body), p: first('p', 3),
    labels, buttons: first('button, a[class*="btn"], a[class*="button"], [role="button"]', 5),
    navLinks: first('nav a', 3), sectionBackgrounds: bgs, fonts: [...new Set(fonts)] };
};

async function settle(page) {
  // przewin cala strone, zeby odpalic lazy-loading, i wroc na gore
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
}

(async () => {
  const browser = await chromium.launch({ proxy });
  const jsonPath = path.join(OUT, 'styles.json');
  const report = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : {};
  for (const site of SITES.filter((s) => !ONLY || s.id === ONLY)) {
    report[site.id] = {};
    for (const width of [1440, 390]) {
      const ctx = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, deviceScaleFactor: 1, ignoreHTTPSErrors: false });
      const page = await ctx.newPage();
      const fontUrls = new Set();
      page.on('response', (r) => { const u = r.url(); if (/\.(woff2?|otf|ttf)(\?|$)/i.test(u) || /fonts\.(googleapis|gstatic)|typekit|use\.typekit/.test(u)) fontUrls.add(u); });
      try {
        const res = await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
        await settle(page);
        const info = { status: res && res.status(), title: await page.title(), height: await page.evaluate(() => document.documentElement.scrollHeight) };
        await page.screenshot({ path: path.join(OUT, `${site.id}-${width}-full.png`), fullPage: true });
        await page.screenshot({ path: path.join(OUT, `${site.id}-${width}-top.png`) });
        info.styles = await page.evaluate(styleProbe);
        info.fontRequests = [...fontUrls];
        report[site.id][width] = info;
        console.log(site.id, width, info.status, info.title, info.height);
      } catch (e) {
        report[site.id][width] = { error: String(e).slice(0, 300) };
        console.log(site.id, width, 'ERROR', String(e).slice(0, 200));
      }
      await ctx.close();
    }
  }
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  await browser.close();
})();
