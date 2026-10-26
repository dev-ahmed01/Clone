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
- Local favourite state and an enquiry dialog with validation, errors, pending confirmation, and explicit non-booking language.
- Compact mobile bottom CTA with safe-area spacing.

The interface separates verified provider facts, dated demonstration values, and illustrative prototype media. See [content architecture](docs/design/content-architecture.md), [research evidence](docs/ux-research/evidence.md), and the [final audit](docs/design/final-design-audit.md).

## Why it is student-centred

The page treats choosing a room as the primary task. Price per week, total contract cost, privacy, kitchen/bathroom setup, bills, dates, commute, and the next step remain easy to find. Unknown policies are labelled as unknown, and the enquiry flow explains that Accom will follow up rather than implying that a room has been booked.

## Media

Gallery images are AI-generated illustrative prototype media, not photographs of iQ Kingston. Source PNGs are retained in `source-assets/`; optimized WebP derivatives and provenance sidecars are in `public/assets/`.
