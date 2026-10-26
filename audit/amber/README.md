# Amber public-site audit

Audit date: 2026-10-23 (Asia/Calcutta). Rechecked against the user-provided 92-second `amber.mp4` recording and fresh Chrome DevTools MCP / Playwright MCP sessions on the same date.

Scope: public pages and non-destructive UI states on `https://amberstudent.com/`. No authentication was completed, no credentials were entered, and no enquiry, booking, transaction, or other form was submitted.

## Deliverables

- `findings.md` — concise audit report, issues, coverage, and unverified areas.
- `findings.json` — machine-readable issue list.
- `route-matrix.json` — directly sampled public routes and render outcomes.
- `route-inventory.json` — 280 unique observed internal routes grouped into template families.
- `design-token-inventories.json` — computed CSS frequency inventories and representative element geometry for five templates at desktop and mobile sizes.
- `home-design-inventory.json` — deeper home-page CSS and component sample.
- `font-inventory.json` — observed computed font stacks and accessible font metadata.
- `listing-responsive-layout.json` and `property-responsive-layout.json` — responsive measurements at all four requested viewports.
- `responsive-overflow*.json` — overflow evidence and responsible elements.
- `interaction-trace.json` — search, sort, filters, map, gallery, room, enquiry, and login UI traces.
- `network-metadata.json` — browser-visible asset URLs, resource attributes, host counts, and console metadata.
- `screenshots/` — 69 captures: 34 first-pass images and 35 recheck images.
- `video-contact-sheet.png` and `video-observation-trace.json` — visual index and timestamped recording observations.
- `route-matrix-recheck.json` — current results for the nine routes previously marked empty; this supersedes their first-pass render status.
- `interaction-trace-recheck.json` — verified autocomplete, Grid, University, Bills Included, and Sort states.
- `network-metadata-recheck.json` — sanitized DevTools request statuses and selected response headers.
- `design-token-recheck.json`, `responsive-overflow-recheck.json`, and `screenshot-validation.json` — new-template CSS samples, repeated overflow measurements, and actual image dimensions.

## Viewport coverage

The home, London listing, and iQ Vega property templates were captured at all requested sizes: 1440x900, 1280x800, 390x844, and 360x800. Representative marketing/content templates were additionally captured at 1280x800 and 390x844.

## Tooling note

The first pass used a controller without request-level DevTools access. In the recheck, Chrome DevTools MCP and Playwright MCP exposed request methods, status codes, and selected headers. The original `network-metadata.json` remains first-pass DOM-visible metadata; `network-metadata-recheck.json` supersedes its tooling limitation. Query strings, cookies, credentials, and response bodies were not retained.

This is a sampled public-site audit, not proof that every public route, variant, breakpoint, or component state was exhaustively covered. See `findings.md` for remaining unverified areas.

