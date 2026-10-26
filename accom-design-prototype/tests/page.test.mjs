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


test('first-fold gallery sits inside the 75:25 content track with sticky property details beside it', async () => {
  const [html, styles] = await Promise.all([
    readFile(new URL('../public/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../public/styles.css', import.meta.url), 'utf8'),
  ]);
  const layout = html.indexOf('<div class="page-layout">');
  const content = html.indexOf('<div class="content-column">', layout);
  const nav = html.indexOf('class="section-nav glass-panel"', content);
  const gallery = html.indexOf('id="top" class="gallery-shell"', nav);
  const title = html.indexOf('id="property-title"', gallery);
  const closeContent = html.indexOf('</div>\n\n        <aside id="enquiry"', nav);
  const aside = html.indexOf('<aside id="enquiry"', nav);
  assert.ok(layout < content && content < nav && nav < gallery && gallery < title && title < closeContent && closeContent < aside);
  assert.match(styles, /\.desktop-cta\s*\{[^}]*position:\s*sticky;[^}]*top:\s*18px;[^}]*margin:\s*76px 0 0/s);
  assert.doesNotMatch(styles, /margin-top:\s*-320px/);
  assert.match(html, /cta-quickfacts/);
  assert.match(html, /data-open-enquiry>Enquire about this room<\/button>/);
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
  assert.ok(nav < gallery && gallery < toolbar && toolbar < intro);
  assert.equal((html.match(/id="save-property"/g) || []).length, 1);
  assert.equal((html.match(/id="open-compare"/g) || []).length, 1);
  assert.ok(html.includes('View all photos'));
  assert.ok(!html.includes('Illustrative media</strong>'));
  assert.ok(!html.includes('Concept imagery for design review'));
  assert.ok(script.includes('Select two rooms in the room list to compare them.'));
  assert.ok(html.includes('data-cta-colour="ocean"'));
  assert.ok(html.includes('data-cta-colour="ivory"'));
});
