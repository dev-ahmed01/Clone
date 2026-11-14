import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const root = new URL('../public/', import.meta.url);

test('all public HTML pages disallow indexing and following', async () => {
  const pages = (await readdir(root)).filter(name => name.endsWith('.html'));
  assert.ok(pages.includes('index.html'));
  assert.ok(pages.includes('listing.html'));
  assert.ok(pages.includes('login.html'));
  for (const page of pages) {
    const html = await readFile(new URL(page, root), 'utf8');
    const matches = [...html.matchAll(/<meta\s+name="robots"\s+content="([^"]+)"/gi)];
    assert.equal(matches.length, 1, page);
    const rules = matches[0][1].split(',').map(rule => rule.trim().toLowerCase());
    for (const rule of ['noindex', 'nofollow', 'noarchive', 'nosnippet', 'noimageindex']) {
      assert.ok(rules.includes(rule), page + ': missing ' + rule);
    }
    assert.ok(!rules.includes('index') && !rules.includes('follow'), page);
  }
});

test('robots.txt blocks all compliant crawlers and does not advertise a sitemap', async () => {
  const robots = await readFile(new URL('robots.txt', root), 'utf8');
  assert.equal(robots, 'User-agent: *\nDisallow: /\n');
  assert.ok(!(await readdir(root)).includes('sitemap.xml'));
});
