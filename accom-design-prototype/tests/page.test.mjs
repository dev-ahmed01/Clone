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
    'id="location"',
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


test('reference design: headline and right-aligned pills sit above gallery and sticky rail', async () => {
  const [html, styles] = await Promise.all([
    readFile(new URL('../public/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../public/styles.css', import.meta.url), 'utf8'),
  ]);
  const top = html.indexOf('class="hero-topline"');
  const intro = html.indexOf('class="property-intro"', top);
  const nav = html.indexOf('class="section-nav glass-panel"', top);
  const content = html.indexOf('class="content-column"', nav);
  const gallery = html.indexOf('class="gallery-shell"', content);
  const aside = html.indexOf('class="desktop-cta"', gallery);
  assert.ok(top < intro && intro < nav && nav < content && content < gallery && gallery < aside);
  assert.match(styles, /\.desktop-cta\s*\{[^}]*position:\s*sticky/s);
  assert.match(styles, /\.gallery-main\s*\{[^}]*grid-column:\s*1/s);
  assert.match(html, /id="cta-enquire-button">Ask about this property<\/button>/);
});

test('gallery action bar holds unique Save / Compare, hero nav comes first and concept disclosure leaves photo', async () => {
  const [html, script] = await Promise.all([
    readFile(new URL('../public/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../public/app.js', import.meta.url), 'utf8')
  ]);
  const nav = html.indexOf('class="section-nav glass-panel"');
  const gallery = html.indexOf('id="top" class="gallery-shell"');
  const toolbar = html.indexOf('class="gallery-actions"');
  const intro = html.indexOf('class="property-intro"');
  assert.ok(intro < nav && nav < gallery && gallery < toolbar);
  assert.equal((html.match(/id="save-property"/g) || []).length, 1);
  assert.equal((html.match(/id="open-compare"/g) || []).length, 1);
  assert.ok(html.includes('View all photos'));
  assert.ok(!html.includes('Illustrative media</strong>'));
  assert.ok(!html.includes('Concept imagery for design review'));
  assert.ok(script.includes('Select two rooms in the room list to compare them.'));
  assert.ok(html.includes('data-cta-colour="ocean"'));
  assert.ok(html.includes('data-cta-colour="ivory"'));
});

test('first visit is unselected and location tiles have seven consistent entries', async () => {
  const [html, css, script] = await Promise.all([
    readFile(new URL('../public/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../public/styles.css', import.meta.url), 'utf8'),
    readFile(new URL('../public/app.js', import.meta.url), 'utf8')
  ]);
  assert.ok(!html.includes('class="breadcrumbs"'));
  assert.ok(html.includes('id="landmarks-title"'));
  assert.ok(html.includes('Nearby Landmarks'));
  assert.equal((html.match(/class="landmark-card /g) || []).length, 7);
  assert.ok(css.includes('flex: 0 0 calc((100% - 30px)/4)'));
  assert.ok(html.includes('class="verified-mark"'));
  assert.ok(html.includes('11 reviews²'));
  assert.ok(html.includes('id="cta-selected-details" hidden'));
  assert.ok(html.includes('nothing selected yet'));
  assert.ok(script.includes('selectedRoomId: null'));
  assert.ok(html.includes('From · demo'));
  assert.ok(!html.includes('Student accommodation · Kingston'));
});

test('updated hero keeps accessible Save and Compare and actual product overview', async () => {
  const html = await readFile(new URL('../public/index.html', import.meta.url), 'utf8');
  assert.ok(html.includes('class="hero-topline"'));
  assert.ok(html.includes('class="overview-highlights"'));
  assert.equal((html.match(/class="overview-highlight"/g)||[]).length,4);
  assert.equal((html.match(/class="cta-benefit"/g)||[]).length,4);
  assert.ok(html.includes('id="cta-first-visit"'));
  assert.ok(html.includes('id="cta-selected-details" hidden'));
  assert.equal((html.match(/id="save-property"/g)||[]).length,1);
  assert.equal((html.match(/id="open-compare"/g)||[]).length,1);
});

test('reference hero has seven desktop one-row landmarks and persistent scroll navigation', async () => {
  const [css, script] = await Promise.all([
    readFile(new URL('../public/styles.css', import.meta.url), 'utf8'),
    readFile(new URL('../public/app.js', import.meta.url), 'utf8')
  ]);
  assert.match(css, /grid-template-columns: repeat\(7,minmax\(0,1fr\)\)/);
  assert.match(css, /\.cta-card \.cta-benefit-copy \{[^}]*text-align: left/s);
  assert.match(script, /function setupCompactSectionNavigation/);
});
