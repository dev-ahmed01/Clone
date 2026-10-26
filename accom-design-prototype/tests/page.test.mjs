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
