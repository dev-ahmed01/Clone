# Accom by Emlen Property Detail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver one responsive, accessible, interactive iQ Kingston property-detail prototype with research and visual-verification evidence.

**Architecture:** A dependency-free Node static server hosts semantic HTML, one token-driven stylesheet, a typed-by-JSDoc demo dataset, and one ES module for interaction state. Pure calculation and validation functions are covered by Node's test runner; browser automation verifies layouts and interactions.

**Tech Stack:** Node.js 24, HTML5, CSS, ES modules, node:test, browser automation.

**Spec:** `docs/superpowers/specs/2026-10-26-property-detail-design.md`

## Global Constraints

- Primary colour `#ED2024`; Bricolage Grotesque headings and Montserrat body.
- Local demo state only; no live enquiry, payment or booking implication.
- Generated imagery is labelled illustrative; verified and illustrative data remain distinguishable.
- Target WCAG 2.2 AA and viewport widths 1440, 1280, 768, 390 and 360.
- No new runtime dependency.

## Review Focus

- Keyboard focus inside and after closing dialogs.
- 360 px reflow with the fixed mobile CTA and no horizontal overflow.
- Total-rent updates and room context after tenancy changes.
- Error recovery and preserved values in the enquiry form.
- Honest language around availability, imagery, policies and booking status.

---

### Task 1: Project foundation and trusted demo data

**Files:**
- Create: `package.json`, `server.mjs`, `public/data.js`, `tests/data.test.mjs`
- Copy: `public/assets/*.png`

**Interfaces:**
- Produces: `property`, `rooms`, `media`, `formatMoney`, `totalRent`, `validateInquiry` from `public/data.js`.

- [ ] Write failing Node tests for total-rent calculation, category filtering inputs and enquiry validation.
- [ ] Run `node --test` and confirm failures are caused by missing exports.
- [ ] Add the minimal dataset and pure functions with explicit provenance.
- [ ] Run `node --test` and confirm all tests pass.

### Task 2: Responsive interface and interactions

**Files:**
- Create: `public/index.html`, `public/styles.css`, `public/app.js`

**Interfaces:**
- Consumes: Task 1 data/functions.
- Produces: gallery dialog, sticky navigation/CTA, room filter/selection/comparison, accordion, saved state and enquiry dialog.

- [ ] Add a browser-smoke assertion script for required semantic landmarks, controls and dialog states; run it against the absent page and confirm failure.
- [ ] Implement the semantic page and responsive visual system.
- [ ] Implement the required interactions with keyboard, focus and validation behavior.
- [ ] Start the local server and run browser smoke assertions; confirm pass.

### Task 3: Research, design documentation and rendered audit

**Files:**
- Create: `docs/ux-research/evidence.md`, `docs/ux-research/persona-evaluation.md`, `docs/design/competitive-design-decisions.md`, `docs/design/design-system.md`, `docs/design/content-architecture.md`, `docs/design/final-design-audit.md`, `screenshots/*.png`

**Interfaces:**
- Consumes: rendered Task 2 prototype and the dated research register.
- Produces: client-review evidence and final screenshot set.

- [ ] Populate documents without presenting simulations as user testing or dynamic data as current fact.
- [ ] Inspect and capture all requested viewport and interaction states.
- [ ] Run accessibility, console, overflow and performance checks; record only measured results.
- [ ] Perform six first-pass heuristic reviews, fix the highest-severity findings, and record the second-pass scores plus unresolved limitations.
- [ ] Run `node --test`, browser smoke checks and a final rendered pass.
