import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('page exposes the required decision and dialog controls', async () => {
  const html = await readFile(new URL('../public/index.html', import.meta.url), 'utf8');
  for (const fragment of [
    '<main id="main-content"',
    'id="gallery-dialog"',
    'id="compare-dialog"',
    'id="enquiry-dialog"',
    'id="rooms"',
    'id="included"',
    'id="house-rules"',
    'id="policies"',
    'aria-live="polite"',
  ]) assert.ok(html.includes(fragment), `Missing ${fragment}`);
});

test('comparison and mobile commitment retain accessible decision context', async () => {
  const [html, script, styles] = await Promise.all([
    readFile(new URL('../public/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../public/app.js', import.meta.url), 'utf8'),
    readFile(new URL('../public/styles.css', import.meta.url), 'utf8'),
  ]);
  assert.ok(html.includes('id="mobile-commitment"'));
  assert.ok(script.includes('<table class="comparison-grid">'));
  assert.ok(script.includes('scope="row"'));
  assert.ok(script.includes('scope="col"'));
  assert.ok(styles.includes('.room-type-explainer[hidden] { display: none; }'));
  assert.ok(!html.includes('class="enquiry-step"'));
});

test('client design contract and reachable mobile help are represented', async () => {
  const [html, styles] = await Promise.all([
    readFile(new URL('../public/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../public/styles.css', import.meta.url), 'utf8'),
  ]);
  assert.match(html, /data-open-enquiry>Get help<\/button>/);
  assert.match(html, /Bricolage\+Grotesque/);
  assert.match(html, /Montserrat/);
  assert.match(styles, /--red:\s*#ed2024/i);
  assert.match(styles, /grid-template-columns:\s*minmax\(0,\s*3fr\)\s+minmax\(290px,\s*1fr\)/);
  assert.match(styles, /\.desktop-cta\s*\{[^}]*position:\s*sticky/s);
  assert.match(styles, /\.section-nav\s*\{[^}]*position:\s*sticky/s);
  assert.match(styles, /\.gallery-dialog\s*\{[^}]*width:\s*100vw/s);
  assert.match(styles, /backdrop-filter:\s*blur\(/);
});


test('chosen concept has property actions above gallery and six pill tabs below', async () => {
  const html = await readFile(new URL('../public/index.html', import.meta.url), 'utf8');
  const hero = html.indexOf('class="hero-topline"');
  const title = html.indexOf('id="property-title"', hero);
  const actions = html.indexOf('class="gallery-actions"', hero);
  const gallery = html.indexOf('id="top" class="gallery-shell"', actions);
  const tabs = html.indexOf('class="section-nav glass-panel"', gallery);
  const landmarks = html.indexOf('class="nearby-landmarks overview-landmarks"', tabs);
  assert.ok(hero < title && title < actions && actions < gallery && gallery < tabs && tabs < landmarks);
  assert.equal((html.match(/id="save-property"/g)||[]).length, 1);
  assert.equal((html.match(/id="open-compare"/g)||[]).length, 1);
  assert.ok(html.includes('View all 4 photos'));
  assert.ok(html.includes('site.css'));
  assert.ok(!html.includes('href="concept-one.css"'));
});
test('first visit is unselected and location tiles have seven consistent entries', async () => {
  const [html, css, script] = await Promise.all([
    readFile(new URL('../public/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../public/styles.css', import.meta.url), 'utf8'),
    readFile(new URL('../public/app.js', import.meta.url), 'utf8')
  ]);
  assert.ok(!html.includes('class="breadcrumbs"'));
  assert.ok(html.includes('id="landmarks-title"'));
  assert.ok(html.includes('Nearby landmarks'));
  assert.equal((html.match(/class="landmark-card /g) || []).length, 7);
  const selectedCSS = await readFile(new URL('../public/concept-one.css', import.meta.url), 'utf8');
  assert.ok(selectedCSS.includes('flex: 0 0 calc((100% - 27px)/4)'));
  assert.ok(selectedCSS.includes('max-height: none'));
  assert.ok(selectedCSS.includes('overflow: clip')); // Clipping a glow without creating a scrollable box
  assert.ok(html.includes('class="verified-mark"'));
  assert.ok(html.includes('11 reviews²'));
  assert.ok(html.includes('id="cta-selected-details" hidden'));
  assert.ok(html.includes('Choose a room to see its tenancy total.'));
  assert.ok(script.includes('selectedRoomId: null'));
  assert.ok(html.includes('From · demo'));
  assert.ok(!html.includes('Student accommodation · Kingston'));
});

test('student-first sections use a coherent design and no simulated map', async () => {
  const [html, css, app] = await Promise.all([
    readFile(new URL('../public/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../public/concept-one.css', import.meta.url), 'utf8'),
    readFile(new URL('../public/app.js', import.meta.url), 'utf8')
  ]);
  assert.equal((html.match(/class="landmark-card /g)||[]).length, 7);
  assert.equal((html.match(/class="overview-highlight"/g)||[]).length, 4);
  assert.ok(!html.includes('class="overview-photo"'));
  assert.ok(html.includes('class="house-rules-grid"'));
  assert.ok(!html.includes('class="map-card"'));
  assert.ok(!html.includes('328 reviews'));
  assert.ok(!html.includes('47 photos'));
  assert.ok(!html.includes('10,000+ students'));
  assert.ok(css.includes('.section-nav.glass-panel'));
  assert.ok(css.includes('.section-nav.glass-panel'));
  assert.ok(app.includes('selectedRoomId: null'));
  assert.ok(!app.includes('setupCompactSectionNavigation'));
});

test('source-like facts and demo disclaimers remain visible', async () => {
  const html = await readFile(new URL('../public/index.html', import.meta.url), 'utf8');
  assert.ok(html.includes('11 reviews²'));
  assert.ok(html.includes('15 min walk'));
  assert.ok(html.includes('From · demo'));
  assert.ok(html.includes('Illustrative room images') || html.includes('Illustrative rates and media'));
  assert.ok(html.includes('No room selected') || html.includes('Choose a room to see its tenancy total.'));
});


test('approved design retains strict palette, visible glass tabs and functional showcase', async () => {
  const [html, css, data, js] = await Promise.all([
    readFile(new URL('../public/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../public/approved-glass.css', import.meta.url), 'utf8'),
    readFile(new URL('../public/data.js', import.meta.url), 'utf8'),
    readFile(new URL('../public/app.js', import.meta.url), 'utf8')
  ]);
  assert.ok(html.includes('site.css'));
  assert.match(css,/--red:\s*#ed2024/i);
  assert.match(css,/--yellow:\s*#ffb900/i);
  assert.ok(css.includes('grid-template-columns: minmax(0,3fr) minmax(305px,1fr)'));
  assert.ok(css.includes('.section-nav.glass-panel'));
  assert.ok(css.includes('overflow: clip'));
  assert.ok(css.includes('max-height: none'));
  assert.equal((html.match(/class="cta-benefit"/g)||[]).length,3);
  assert.equal((html.match(/data-open-gallery/g)||[]).length,0);
  assert.equal((html.match(/class="section-nav glass-panel"/g)||[]).length,1);
  assert.equal((html.match(/class="overview-highlight"/g)||[]).length,4);
  assert.ok(html.includes('View all 4 photos'));
  assert.ok(html.includes('Illustrative rates and media'));
  assert.ok(html.includes('Choose a room to see its tenancy total'));
  assert.ok(!js.includes("$('[data-open-gallery]')"));
  assert.ok(data.includes("src: 'assets/ensuite.webp'"));
});

test('merged student overview keeps landmarks as nested decision content and uses example house rules', async () => {
  const html = await readFile(new URL('../public/index.html', import.meta.url),'utf8');
  const css = await readFile(new URL('../public/site.css', import.meta.url),'utf8');
  const overview = html.indexOf('id="overview"');
  const highlights = html.indexOf('class="overview-highlights"', overview);
  const landmarks = html.indexOf('class="nearby-landmarks overview-landmarks"', highlights);
  const overviewClose = html.indexOf('</section>', overview);
  const rooms = html.indexOf('id="rooms"', overviewClose);
  assert.ok(overview < highlights && highlights < landmarks && landmarks < overviewClose && overviewClose < rooms);
  assert.ok(!html.includes('class="overview-photo"'));
  assert.ok(!html.includes('id="location"'));
  assert.ok(html.includes('href="#house-rules"'));
  assert.equal((html.match(/class="house-rule-card"/g)||[]).length, 6);
  assert.ok(html.includes('not verified iQ Kingston house rules'));
  assert.ok(css.includes('.house-rules-grid'));
  assert.equal((html.match(/class="landmark-card /g)||[]).length,7);
});

test('section scroll tracking observes house-rules and keeps the correct active pill',async()=>{
 const js=await readFile(new URL('../public/app.js',import.meta.url),'utf8');
 assert.ok(js.includes('getBoundingClientRect().top <= readingLine'));
 assert.ok(js.includes("window.addEventListener('scroll', schedule"));
});

test('Bricolage headings and Montserrat metric captions have clear demo/source labelling', async () => {
 const [html,css] = await Promise.all([
   readFile(new URL('../public/index.html',import.meta.url),'utf8'),
   readFile(new URL('../public/site.css',import.meta.url),'utf8')
 ]);
 assert.match(html,/Bricolage\+Grotesque/);
 assert.match(html,/Montserrat/);
 assert.equal((html.match(/class="headline-stat headline-/g)||[]).length,0);
 assert.ok(html.includes('class="cta-rating"'));
 assert.ok(html.includes('class="cta-price-hero"'));
 assert.ok(html.includes('id="cta-from-price"'));
 assert.ok(html.includes('11 reviews²'));
 assert.ok(html.includes('From · demo'));
 assert.ok(css.includes('text-transform: uppercase'));
 assert.ok(css.includes('font: 800 35px/.98 var(--font-heading)'));
});

test('sticky property card embeds actual Google Maps address and keeps a direct full-map link', async () => {
  const [html, css] = await Promise.all([
    readFile(new URL('../public/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../public/site.css', import.meta.url), 'utf8'),
  ]);
  assert.ok(html.includes('class="cta-area cta-google-map-card"'));
  assert.ok(html.includes('class="cta-google-map"'));
  assert.ok(html.includes('maps.google.com/maps?q=iQ%20Kingston'));
  assert.ok(html.includes('15%20Wood%20Street'));
  assert.ok(html.includes('output=embed'));
  assert.ok(html.includes('loading="lazy"'));
  assert.ok(html.includes('title="Google Maps location of iQ Kingston'));
  assert.ok(html.includes('www.google.com/maps/search/?api=1'));
  assert.ok(!html.includes('class="cta-area-decoration"'));
  assert.ok(css.includes('.cta-panel-bottom .cta-google-map-card'));
  assert.ok(css.includes('grid-template-rows: 151px auto'));
});

test('design-board pass keeps the first screen decision-focused and readable',async()=>{
 const [css,html]=await Promise.all([
   readFile(new URL('../public/site.css',import.meta.url),'utf8'),
   readFile(new URL('../public/index.html',import.meta.url),'utf8')
 ]);
 assert.ok(css.includes('Design Board pass'));
 assert.ok(css.includes('height: clamp(265px, 36vh, 315px)'));
 assert.ok(css.includes('.cta-panel-top .cta-address { font-size: 11px; }'));
 assert.ok(css.includes('.section-nav a { min-height: 44px; }'));
 assert.ok(html.includes('href="#rooms"'));
 assert.ok(html.includes('class="section-nav glass-panel"'));
 assert.ok(html.includes('class="cta-google-map"'));
 assert.ok(html.includes('11 reviews²'));
 assert.ok(html.includes('From · demo'));
});

test('compact first fold places Save and Compare by uppercase property name, removes duplicate metric cards',async()=>{
 const [html,css,js]=await Promise.all([
  readFile(new URL('../public/index.html',import.meta.url),'utf8'),
  readFile(new URL('../public/site.css',import.meta.url),'utf8'),
  readFile(new URL('../public/app.js',import.meta.url),'utf8')
 ]);
 const hero=html.indexOf('class="hero-topline"'), name=html.indexOf('id="property-title"',hero), actions=html.indexOf('class="gallery-actions"',hero);
 const gallery=html.indexOf('id="top" class="gallery-shell"',actions);
 assert.ok(hero<name && name<actions && actions<gallery);
 assert.ok(!html.includes('class="property-headline-stats"'));
 assert.ok(!html.includes('id="intro-start-price"'));
 assert.ok(!js.includes("$('#intro-start-price')"));
 assert.ok(html.includes('id="cta-from-price"')); // sidebar remains the place for pricing
 assert.ok(css.includes('text-transform: uppercase'));
 assert.ok(css.includes('grid-row: 1 / 3'));
 assert.ok(css.includes('margin-top: 8px'));
});

test('client polish: two-font brand, no Compare counter, and map as final panel section',async()=>{
 const [html,js,css]=await Promise.all([
   readFile(new URL('../public/index.html',import.meta.url),'utf8'),
   readFile(new URL('../public/app.js',import.meta.url),'utf8'),
   readFile(new URL('../public/rail-refinement.css',import.meta.url),'utf8')
 ]);
 assert.equal((html.match(/class="brand-lockup"/g)||[]).length,2);
 assert.ok(html.includes('class="brand-name">accom</span>'));
 assert.ok(html.includes('class="brand-byline">BY EMLEN</small>'));
 assert.ok(!html.includes('compare-count'));
 assert.ok(!js.includes("$('#compare-count')"));
 assert.ok(js.includes("ready ? 'Compare selected rooms' : 'Compare rooms'"));
 assert.equal((html.match(/class="cta-benefit"/g)||[]).length,3);
 const panel=html.slice(html.indexOf('class="cta-panel-bottom"'),html.indexOf('</aside>'));
 assert.ok(panel.indexOf('class="cta-footnote"')<panel.indexOf('class="cta-area cta-google-map-card"'));
 assert.ok(panel.includes('Open Google Maps'));
 assert.ok(css.includes('height:min(650px, calc(100dvh - 145px))'));
 assert.ok(css.includes('cta-card:has(#cta-selected-details:not([hidden])) .cta-quickfacts'));
 assert.ok(css.includes('var(--font-heading)') && css.includes('var(--font-body)'));
});
