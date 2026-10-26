# Codex instructions — Accom by Emlen

Work on the student accommodation property-detail prototype in `accom-design-prototype/`.

## Design skills
- For a design audit or user request for design-board reviewers, use the checked-in `.agents/skills/design-board/SKILL.md` and the six adjoining critic skills. These are **design lenses**, not actual participation or endorsements by the named designers.
- The upstream skill targets Claude Code and may mention `/design-board`, `browser_navigate` and Pencil APIs. In Codex, use the available terminal/browser/Playwright tools instead. Do not fabricate browser or six-person review results.
- Also use `.agents/skills/impeccable/SKILL.md`, `.agents/skills/ui-ux-pro-max/SKILL.md`, `.agents/skills/frontend-design/SKILL.md`, and `.agents/skills/web-design-guidelines/SKILL.md` as quality reference material.
- Read `accom-design-prototype/PRODUCT.md`, `DESIGN.md`, the persona research and latest design-board audit before editing.

## Non-negotiable client brief
- Desktop property listing is a 75:25 split; the right midnight-navy glass information/CTA card stays sticky **and never scrolls internally**.
- The left menu navigates Overview, Rooms, Included, House rules, Policies and FAQs and sticks in the left column.
- Use **Bricolage Grotesque** headings and **Montserrat** text.
- Primary `#ED2024`; supporting `#FFB900`, warm ivory and restrained complementary colors; subtle glass cards and pills.
- Keep room filters, comparison, Save, image lightbox, keyboard navigation, general enquiry modal and selected-room state functional.
- This is an interactive design prototype. Prices, room images, current availability and house rules are illustrative unless backed by an approved source; no real enquiry, reservation, payment or guaranteed route is implied.
- Prioritize real student decision tasks: can I afford it, how long is the contract, what's included, how do I travel to campus, and what if plans change.

## When auditing and fixing
1. Use each of the six design-board lenses on clarity, hierarchy, consistency, delight and utility; produce a *grounded* ranked set of fixes. Avoid claiming actual celebrities reviewed this UI.
2. Render at 1440×900, 1280×800, 768×1024, 390×844 and 360×800. Check first fold, full-page scroll, selected vs unselected CTA, overflow, gallery and tab states.
3. Make scoped, cohesive improvements; don't change brand rules or invent accommodation facts.
4. Run `cd accom-design-prototype && npm test` and `node scripts/capture-layout.mjs` with the server running; inspect screenshots and fix failures. Include Lighthouse where available.
5. Record fixes, test results and remaining limitations under `accom-design-prototype/docs/design/`. Do not merge unverified fixes.

## Suggested Codex invocation
From the repository root, request: `Use $design-board fix with the Accom project constraints in AGENTS.md. Audit the rendered property-detail page at desktop, tablet and mobile; implement only grounded fixes and run tests.`
