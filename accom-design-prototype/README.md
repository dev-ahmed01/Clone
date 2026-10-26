# Accom by Emlen — property-detail prototype

A high-fidelity, student-first property-detail concept for iQ Kingston. It is deliberately limited to one local front-end page: no production booking, authentication, payment, database, or live enquiry submission is included.

## Run

```powershell
npm start
```

Open **http://127.0.0.1:4173**.

If Windows PowerShell blocks the `npm.ps1` shim, use `npm.cmd start` or `node server.mjs`.

Run the automated checks with:

```powershell
npm test
```

The direct test command is `node --test`.

## What is implemented

- Responsive editorial gallery with full-screen keyboard-operable lightbox and touch swipe.
- Scroll-linked section navigation and a desktop 75:25 decision/CTA layout.
- Room filters, tenancy choices, total-rent calculation, and two-room comparison.
- Included bills, amenities, verified commute information, policies, FAQs, and access-support callout.
- Local favourite state and an enquiry dialog with validation, errors, a **demo-only on-screen confirmation**, and explicit non-booking language. No personal enquiry is submitted or stored.
- Compact mobile bottom CTA with safe-area spacing.

The interface separates verified provider facts, dated demonstration values, and illustrative prototype media. See [content architecture](docs/design/content-architecture.md), [research evidence](docs/ux-research/evidence.md), and the [final audit](docs/design/final-design-audit.md).

## Why it is student-centred

The page treats choosing a room as the primary task. Price per week, total contract cost, privacy, kitchen/bathroom setup, bills, dates, commute, and the next step remain easy to find. Unknown policies are labelled as unknown, and the enquiry flow explains that Accom will follow up rather than implying that a room has been booked.

## Media

Gallery images are AI-generated illustrative prototype media, not photographs of iQ Kingston. Source PNGs are retained in `source-assets/`; optimized WebP derivatives and provenance sidecars are in `public/assets/`.

## Client brief compliance

- **Gallery:** full-width four-image mosaic; each tile opens the full-viewport lightbox with keyboard, thumbnail and swipe navigation.
- **Desktop:** `3fr 1fr` content/CTA tracks (75:25 of occupied tracks) below the gallery, separated by a 56px gutter. The right CTA stays sticky; the section pill menu sticks within the left column.
- **Responsive:** at 1024px and below, the split stacks into content with a compact mobile enquiry bar.
- **Visual language:** selective translucent glass for gallery metadata, section navigation and CTA; frosted room-type filter pills. Bricolage Grotesque headings, Montserrat body, and `#ED2024` primary brand red (with an AA-friendly darker action shade).

For complete tokens and interaction rules, see [DESIGN.md](DESIGN.md) and [the design sidecar](.impeccable/design.json).

## Validation after the 26 October polish patch

Run `npm test` from this directory. The suite includes a regression for browser form-control name collisions and an explicit client-brief structural check. Before sending to the client, perform another hands-on enquiry test and capture new Lighthouse runs **after** the CTA/CSS adjustments. Earlier audit scores are historical and are not evidence for the latest commit.

For a local Lighthouse report (requires Chrome and a network-enabled one-time Lighthouse install):

```powershell
npm.cmd start
# In a separate shell:
npx.cmd lighthouse http://127.0.0.1:4173 --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless" --output=html --output-path=./screenshots/lighthouse-post-fix.html
```

The local server is not a public deployment and cannot be reached from other devices without separate hosting or network forwarding.
