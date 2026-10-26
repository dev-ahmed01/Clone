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
    assert.deepEqual(errors, [], `${label}: JavaScript failed during page initialization`);
    const g = await page.locator('.gallery-shell').boundingBox();
    const nav = await page.locator('.section-nav').boundingBox();
    const galleryGridSize = await page.locator('.gallery-grid').boundingBox();
    assert.ok(galleryGridSize, `${label}: gallery missing`);
    if (width <= 768) {
      assert.ok(galleryGridSize.height <= 301, `${label}: overly tall mobile gallery blocks student decisions`);
    } else if (width > 1024) {
      assert.ok(galleryGridSize.height <= 391, `${label}: oversized desktop gallery crowds sections`);
    }

    const toolbar = await page.locator('.gallery-actions').boundingBox();
    const intro = await page.locator('.property-intro').boundingBox();
    const identity = await page.locator('.property-identity').boundingBox();
    assert.ok(intro && intro.y < g.y, `${label}: property title must precede gallery`);

    assert.equal(await page.locator('.property-headline-stats').count(),0,`${label}: duplicate top rating/rent should be removed`);
    const nameStyle = await page.locator('#property-title').evaluate(el => ({
      transform: getComputedStyle(el).textTransform,
      font: getComputedStyle(el).fontFamily
    }));
    assert.equal(nameStyle.transform,'uppercase',`${label}: property title must be visually uppercase`);
    assert.ok(nameStyle.font.includes('Bricolage Grotesque'),`${label}: Bricolage heading missing`);
    assert.equal(await page.locator('.cta-rating').count(),1,`${label}: sidebar rating removed`);
    assert.equal(await page.locator('.cta-price-hero').count(),1,`${label}: sidebar price removed`);
    const landmarkElements = page.locator('.landmark-card');
    assert.equal(await landmarkElements.count(), 7, `${label}: seven nearby landmarks expected`);
    const bounds = await Promise.all((await landmarkElements.all()).map(element => element.boundingBox()));
    const widths = bounds.map(box => box.width), heights = bounds.map(box => box.height);
    assert.ok(Math.max(...widths) - Math.min(...widths) <= 2, `${label}: landmark widths differ`);
    assert.ok(Math.max(...heights) - Math.min(...heights) <= 2, `${label}: landmark heights differ`);
    const rail = await page.locator('.desktop-cta').boundingBox();
    const mobileRail = await page.locator('.mobile-cta').boundingBox();
    const dimensions = await page.evaluate(() => ({
      bodyScroll: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
      title: document.querySelector('#property-title').getBoundingClientRect().top
    }));
    assert.equal(await page.locator('#cta-selected-details').isHidden(), true, `${label}: a room is incorrectly preselected`);
    await page.screenshot({ path: new URL(`./client-${label}-opening.png`, output).pathname });
    if (width > 1024) {
      assert.ok(g && rail, `${label}: gallery and CTA must both render`);
      assert.ok(rail.x >= g.x + g.width - 2, `${label}: CTA must be beside, not overlapping/below gallery`);
      assert.ok(nav && g && nav.y >= g.y + g.height - 1, `${label}: section menu must follow gallery`);
      assert.ok(toolbar && toolbar.y < g.y, `${label}: Save and Compare must be beside property heading`);
      assert.ok(rail.y >= intro.y - 15 && rail.y <= g.y - 28, `${label}: sidebar should begin alongside property heading, above gallery: ${rail.y}, ${intro.y}, ${g.y}`);
      console.log('FIRST_FOLD_GEOMETRY',JSON.stringify({label,height,hero:intro, gallery:g, navigation:nav, sidebar:rail}));
      assert.ok(nav.y < height - 55, `${label}: overview tabs should be visible above the fold`);
      const begin = rail.y;
      await page.screenshot({ path: new URL(`./reference-${label}-hero.png`, output).pathname });
      await page.evaluate(() => window.scrollTo({top:900, behavior:'instant'}));
      await page.waitForTimeout(120);
      const after = await page.locator('.desktop-cta').boundingBox();
      assert.ok(after && after.y >= -2 && after.y <= 82, `${label}: CTA failed to stick below floating menu, y=${after?.y}`);
      const googleMap = page.locator('.cta-google-map');
      assert.equal(await googleMap.count(), 1, `${label}: missing Google Maps location iframe`);
      assert.match(await googleMap.getAttribute('src'), /maps\.google\.com\/maps\?q=.*output=embed/);
      assert.equal(await googleMap.getAttribute('loading'), 'lazy');
      const googleMapBox = await googleMap.boundingBox();
      assert.ok(googleMapBox && googleMapBox.width >= 220 && googleMapBox.height >= 140, `${label}: location map too small`);
      const googleMapLink = page.locator('.cta-google-map-caption > a');
      assert.ok((await googleMapLink.getAttribute('href')).includes('www.google.com/maps/search/?api=1'));
      const ctaSize = await page.locator('.cta-card').evaluate(el => ({
        height: el.getBoundingClientRect().height,
        overflowY: getComputedStyle(el).overflowY,
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight
      }));
      assert.notEqual(ctaSize.overflowY, 'auto', `${label}: sticky CTA must not scroll internally`);
      assert.notEqual(ctaSize.overflowY, 'scroll', `${label}: sticky CTA must not scroll internally`);
      assert.ok(ctaSize.height <= height - 14, `${label}: sticky CTA should fit viewport (${ctaSize.height}px vs ${height}px)`);

      if (label === 'desktop') {
        const sectionNesting = await page.evaluate(() => ({
          containsLandmarks: Boolean(document.querySelector('#overview .nearby-landmarks')),
          containsPhoto: Boolean(document.querySelector('#overview .overview-photo')),
          rulesNav: Boolean(document.querySelector('.section-nav a[href="#house-rules"]')),
          houseRules: document.querySelectorAll('.house-rule-card').length
        }));
        assert.ok(sectionNesting.containsLandmarks && !sectionNesting.containsPhoto, 'overview must combine all student priorities and landmarks without another photo');
        assert.ok(sectionNesting.rulesNav && sectionNesting.houseRules === 6, 'six example house rules and navigation expected');
        const landmarks = await Promise.all((await page.locator('.landmark-card').all()).map(el => el.boundingBox()));
        assert.ok(landmarks[0].y === landmarks[3].y && landmarks[4].y > landmarks[0].y, 'desktop landmarks should form a 4+3 layout');
        const stickyNav = await page.locator('.section-nav').boundingBox();
        assert.ok(stickyNav && stickyNav.y >= -1 && stickyNav.y <= 25, 'section navigation should stick to top while scrolling');
        await page.screenshot({ path: new URL('./client-desktop-scrolled-sticky.png', output).pathname });
        await page.evaluate(() => window.scrollTo({ top: 660, behavior: 'instant' }));
        await page.waitForTimeout(100);
        await page.screenshot({ path: new URL('./client-intro-and-landmarks.png', output).pathname });
        await page.locator('#house-rules').scrollIntoViewIfNeeded();
        await page.waitForTimeout(180);
        assert.equal(await page.locator('.section-nav a.active').getAttribute('href'), '#house-rules', 'House rules pill should be selected while reading house rules');
        await page.screenshot({ path: new URL('./client-house-rules.png', output).pathname });
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
        await page.waitForFunction(() => window.scrollY > 400, null, { timeout: 3500 });
        await page.locator('[data-select-room="silver-ensuite"]').click();
        assert.equal(await page.locator('#cta-selected-details').isVisible(), true, 'room choice must update sidebar');
        assert.equal(await page.locator('#cta-first-visit').isHidden(), true, 'first-visit summary must hide after selection');
        await page.locator('[data-compare-room="bronze-ensuite"]').check();
        await page.locator('[data-compare-room="silver-ensuite"]').check();
        assert.match(await page.locator('#open-compare').getAttribute('aria-label'), /Compare 2\/2 rooms selected/);
        await page.locator('#open-compare').click();
        assert.ok(await page.locator('#compare-dialog').isVisible(), 'Compare must open after selecting two rooms');
        await page.keyboard.press('Escape');
      }
      results.push({label, navTop:nav.y, galleryTop:g.y, toolbarTop:toolbar.y, ctaTop:begin, stickyTop:after.y});
    } else {
      assert.equal(rail, null, `${label}: desktop CTA should be hidden`);
      assert.ok(mobileRail, `${label}: bottom CTA missing`);
      assert.ok(dimensions.title < height, `${label}: property name should appear in first viewport`);
      assert.ok(nav && nav.y < mobileRail.y, `${label}: section navigation should begin above the bottom CTA`);

      assert.ok(identity && g.y - (identity.y+identity.height) < 105, `${label}: gallery should closely follow property title`);
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
