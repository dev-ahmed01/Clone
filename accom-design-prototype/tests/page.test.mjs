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
  const landmarks = html.indexOf('class="nearby-landmarks"', tabs);
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
  assert.ok(html.includes('Demo rate'));
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
  assert.equal((html.match(/class="cta-benefit"/g)||[]).length,4);
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
