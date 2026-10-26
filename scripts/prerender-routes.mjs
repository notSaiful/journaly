import { createServer } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { BUSINESS, DESIGN_MOCKUP, UNDER_MINIMUM_NOTE, parentBrandLink } from '../src/config/business.js';

const root = process.cwd();
const dist = path.join(root, 'dist');
const templatePath = path.join(dist, 'index.html');
const template = fs.readFileSync(templatePath, 'utf8');

const vite = await createServer({
  root,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error'
});

const { renderRoute } = await vite.ssrLoadModule('/src/prerender/entry.jsx');
const { prerenderPaths, sitemapPaths } = await vite.ssrLoadModule('/src/seo/metadata.js');

function destination(routePath) {
  if (routePath === '/') return path.join(dist, 'index.html');
  if (routePath === '/404') return path.join(dist, '404.html');
  return path.join(dist, routePath.replace(/^\//, ''), 'index.html');
}

function apply(html, headHtml, appHtml) {
  const headPattern = /<!--journaly-head:start-->[\s\S]*?<!--journaly-head:end-->/;
  if (!headPattern.test(html)) {
    throw new Error('Built index.html is missing journaly head markers');
  }
  const withHead = html.replace(
    headPattern,
    `<!--journaly-head:start-->\n    ${headHtml}\n    <!--journaly-head:end-->`
  );
  if (!withHead.includes('<div id="root"></div>')) {
    throw new Error('Built index.html is missing an empty root');
  }
  return withHead.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

const paths = prerenderPaths();
for (const routePath of paths) {
  const { appHtml, headHtml } = await renderRoute(routePath);
  const file = destination(routePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const html = apply(template, headHtml, appHtml);
  const headings = html.match(/<h1\b/gi) || [];
  if (headings.length !== 1) {
    throw new Error(`${routePath} has ${headings.length} h1 elements; expected 1`);
  }
  fs.writeFileSync(file, html);
  console.log('prerendered', routePath);
}

const today = '2026-10-26';
const urls = sitemapPaths().map((routePath) => {
  const loc = routePath === '/' ? 'https://journaly.in/' : `https://journaly.in${routePath}`;
  return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod></url>`;
});
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), sitemap);

await vite.close();

const home = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const about = fs.readFileSync(path.join(dist, 'about', 'index.html'), 'utf8');
const missing = fs.readFileSync(path.join(dist, '404.html'), 'utf8');
const quote = fs.readFileSync(path.join(dist, 'business', 'index.html'), 'utf8');
if (home.includes('aggregateRating')) throw new Error('homepage still has aggregateRating');
if (about.includes('aggregateRating')) throw new Error('about still has aggregateRating');
if (!about.includes('SAZO Management Private Limited')) throw new Error('legal entity missing from about HTML');
if (parentBrandLink() || BUSINESS.parentBrand.enabled) throw new Error('parent brand rendered while disabled');
if (home.includes('50 units') === false) throw new Error('minimum order is not shown on the homepage');
if (home.includes('Across India') === false) throw new Error('pan-India delivery is not shown on the homepage');
if (!home.includes(DESIGN_MOCKUP)) throw new Error('design mockup line missing from the homepage');
if (!quote.includes(UNDER_MINIMUM_NOTE)) throw new Error('under-minimum note missing from the quote form');
if (!quote.includes('50–99') || quote.includes('25–50') || quote.includes('25 – 50')) {
  throw new Error('quote quantity options are not the approved ranges');
}
if (!home.includes('Custom branded journals for businesses in India')) throw new Error('homepage H1 missing');
if (!home.includes('<meta name="google-site-verification" content="UhL-YYs63e_knmyZiiIXdbjbn1AvC3PuI8oR4_OyFVo" />')) {
  throw new Error('Google site verification meta missing from prerendered homepage');
}
const verificationFile = path.join(dist, 'google8d15317021744866.html');
const verificationBody = fs.readFileSync(verificationFile, 'utf8');
if (verificationBody !== 'google-site-verification: google8d15317021744866.html') {
  throw new Error('Google site verification file missing or altered in dist');
}
const contact = fs.readFileSync(path.join(dist, 'contact', 'index.html'), 'utf8');
const privacy = fs.readFileSync(path.join(dist, 'privacy-policy', 'index.html'), 'utf8');
const llms = fs.readFileSync(path.join(dist, 'llms.txt'), 'utf8');
const llmsFull = fs.readFileSync(path.join(dist, 'llms-full.txt'), 'utf8');
const emailPages = [home, about, quote, contact, privacy, missing, llms, llmsFull];
if (emailPages.some((file) => !file.includes(BUSINESS.contactEmail))) {
  throw new Error('business email missing from a public page');
}
if (emailPages.some((file) => file.includes('gmail.com'))) {
  throw new Error('old gmail address still published');
}
if (!home.includes(`"email":"${BUSINESS.contactEmail}"`)) {
  throw new Error('organization email missing from homepage JSON-LD');
}
if (!missing.includes('noindex')) throw new Error('404 is indexable');
if (home.match(/<title>[^<]+<\/title>/)[0] === quote.match(/<title>[^<]+<\/title>/)[0]) {
  throw new Error('homepage and quote titles are identical');
}
console.log('prerender checks passed', paths.length);
