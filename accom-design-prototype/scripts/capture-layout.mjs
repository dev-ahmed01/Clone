import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const output = new URL('../screenshots/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
const target = 'http://127.0.0.1:4173/';
const failures = [];
const results = [];
try {
  for (const [label, width, height] of [
    ['desktop', 1440, 900],
    ['laptop', 1280, 800],
    ['mobile', 390, 844],
    ['small-mobile', 360, 800]
  ]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.goto(target, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const g = await page.locator('.gallery-shell').boundingBox();
    const nav = await page.locator('.section-nav').boundingBox();
    const toolbar = await page.locator('.gallery-actions').boundingBox();
    const rail = await page.locator('.desktop-cta').boundingBox();
    const mobileRail = await page.locator('.mobile-cta').boundingBox();
    const dimensions = await page.evaluate(() => ({
      bodyScroll: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
      title: document.querySelector('#property-title').getBoundingClientRect().top
    }));
    await page.screenshot({ path: new URL(`./client-${label}-opening.png`, output).pathname });
    if (width > 1024) {
      assert.ok(g && rail, `${label}: gallery and CTA must both render`);
      assert.ok(rail.x >= g.x + g.width - 2, `${label}: CTA must be beside, not overlapping/below gallery`);
      assert.ok(nav && g && nav.y < g.y, `${label}: section navigation should be above gallery`);
      assert.ok(toolbar && toolbar.y >= g.y + g.height - 1, `${label}: Save and Compare bar must be below images`);
      assert.ok(Math.abs(g.y - rail.y) <= 4, `${label}: gallery and CTA should start together: ${g.y}, ${rail.y}`);
      const begin = rail.y;
      await page.evaluate(() => window.scrollTo(0, 900));
      await page.waitForTimeout(180);
      const after = await page.locator('.desktop-cta').boundingBox();
      assert.ok(after && after.y >= -2 && after.y <= 26, `${label}: CTA failed to stick, y=${after?.y}`);
      if (label === 'desktop') {
        await page.screenshot({ path: new URL('./client-desktop-scrolled-sticky.png', output).pathname });
        for (const colour of ['midnight', 'ocean', 'ivory']) {
          await page.evaluate(() => scrollTo(0,0));
          await page.locator(`[data-cta-colour="${colour}"]`).click();
          assert.equal(await page.locator('.cta-card').getAttribute('data-cta-theme'), colour);
          await page.screenshot({ path: new URL(`./client-cta-${colour}.png`, output).pathname });
        }
        await page.evaluate(() => scrollTo(0, 0));
        await page.locator('.gallery-main').click();
        await page.locator('#gallery-dialog').waitFor({state: 'visible'});
        await page.screenshot({path: new URL('./client-gallery-lightbox.png', output).pathname});
        await page.keyboard.press('Escape');
        await page.locator('#save-property').click();
        assert.equal(await page.locator('#save-property').getAttribute('aria-pressed'), 'true', 'Save should switch on');
        await page.locator('#save-property').click();
        assert.equal(await page.locator('#save-property').getAttribute('aria-pressed'), 'false', 'Save should switch off');
        await page.locator('#open-compare').click();
        assert.ok(await page.evaluate(() => scrollY > 400), 'Compare without two selections should lead to room list');
        await page.locator('[data-compare-room="bronze-ensuite"]').check();
        await page.locator('[data-compare-room="silver-ensuite"]').check();
        assert.match(await page.locator('#open-compare').getAttribute('aria-label'), /Compare the two selected rooms/);
        await page.locator('#open-compare').click();
        assert.ok(await page.locator('#compare-dialog').isVisible(), 'Compare must open after selecting two rooms');
        await page.keyboard.press('Escape');
      }
      results.push({label, navTop:nav.y, galleryTop:g.y, toolbarTop:toolbar.y, ctaTop:begin, stickyTop:after.y});
    } else {
      assert.equal(rail, null, `${label}: desktop CTA should be hidden`);
      assert.ok(mobileRail, `${label}: bottom CTA missing`);
      assert.ok(dimensions.title < height, `${label}: property name should appear in first viewport`);
      results.push({label, propertyTitleTop:dimensions.title, mobileCtaTop:mobileRail.y});
    }
    assert.ok(dimensions.bodyScroll <= dimensions.viewport + 1, `${label}: horizontal overflow ${dimensions.bodyScroll} > ${dimensions.viewport}`);
    assert.deepEqual(errors, [], `${label}: page JavaScript errors`);
    await page.close();
  }
} catch (error) {
  failures.push(error.stack || String(error));
} finally {
  await browser.close();
  console.log(JSON.stringify({results, failures},null,2));
  if (failures.length) process.exitCode=1;
}
