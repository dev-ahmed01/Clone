# Amber public-site audit findings

## Recheck correction (2026-10-23)

The user-provided 92-second recording was compared with the audit. It shows home-page lower sections, London listing List and Grid views, Budget and Bills Included filter-drawer sections, and the University quick filter. Grid, University, and Bills Included were missing as explicit first-pass interaction states and are now reproduced with exact-size screenshots in `interaction-trace-recheck.json`.

Two first-pass conclusions were disproved by fresh browser checks. London autocomplete suggestions do appear after a short wait, with city, locality, university, and property categories. All nine routes marked empty in `route-matrix.json` rendered on recheck; `/help` redirects to a public knowledge base and `/sitemap` displays XML. Use `route-matrix-recheck.json` for their current status.

Sixteen first-pass screenshots were smaller than the viewport named in their filenames, including an 83x179 mobile Amber+ capture. Correctly sized replacements were added without deleting the originals. See `screenshot-validation.json`. Chrome DevTools MCP also supplied public request statuses and selected response headers, recorded without cookies, query strings, or response bodies in `network-metadata-recheck.json`.

The high-priority overflow findings remain reproducible: Amber+ reached 50,341 px document width at 390 px; iQ Vega reached 451 px at both 390 and 360 px; home reached 409 px at both mobile widths. Counts and prices such as London listing's 226/228 result preview are live data and should not be treated as fixed design tokens.

## Executive summary

The public home, listing, property, company, marketing, news, and article surfaces were inspected in Chrome. Core shopping interactions were exercised without submission: search input, sort, filters, map, property gallery, room details, tenancy expansion, enquiry modal, and login modal.

The strongest implementation risks are responsive overflow on the property and Amber+ templates, carousel content affecting page width, accessibility semantics around nested/unlabelled controls and modals, and recurring third-party console warnings. Routes that appeared empty in the first pass rendered on recheck.

## High-priority findings

### 1. Amber+ has extreme horizontal overflow

- Route: `/plus`
- Observed at 1280x800: `scrollWidth` about 50,316 px.
- Observed at 390x844: `scrollWidth` about 50,389 px.
- Evidence points to a long row of `.partnersSection-module__partnerCard` elements laid out tens of thousands of pixels to the right.
- Impact: horizontal scrolling, broken mobile framing, large off-screen layout surface, and poor keyboard/screen-reader traversal.
- Evidence: `responsive-overflow.json`, `template-screenshots.json`, `screenshots/plus-*.jpg`.

### 2. Property detail overflows mobile viewport

- Route: `/places/iq-vega-london-2101138507106`
- At 390 px viewport, document width reached 451 px; at 360 px it also reached 451 px.
- The element defining the measured edge was a cancellation-policy list item around 452 px right; off-screen carousel/review elements were also present.
- Impact: horizontal pan and clipped content on common mobile sizes.
- Evidence: `property-responsive-layout.json`, `responsive-overflow-exact.json`, `screenshots/property-iq-vega-390x844.jpg`, `screenshots/property-iq-vega-360x800.jpg`.

### 3. Home page has smaller mobile overflow

- At 390 px viewport, document width reached 409 px.
- Edge-defining elements included `PropertyTags-module__soldOutTag`, country pills, partner logos, and desktop-styled contact cards. Long carousel/ticker rows also extend far off-screen, although most are intended to be clipped/scrollable.
- Impact: subtle horizontal page movement and alignment drift.
- Evidence: `design-token-inventories.json`, `responsive-overflow-exact.json`.

### 4. Interactive semantics are inconsistent

- DOM snapshots repeatedly exposed nested buttons, including Sort, filter controls, Enquire, and Book.
- The header Support control surfaced an accessible name of `[object Object]`; several header controls had no accessible name.
- Login, enquiry, gallery, and room overlays were visually modal but their outer containers generally had no `role="dialog"`; close controls were sometimes `role="none"` or generic `div` elements.
- The enquiry form visually marks name, email, code, and phone as required, while inspected native inputs reported `required: false`; validation appears custom and was not submitted.
- Impact: invalid interaction structure, weaker keyboard/screen-reader behavior, and less reliable automated testing.
- Evidence: `interaction-trace.json` and screenshots for login, enquiry, gallery, and room details.

### 5. Search suggestion list — first-pass observation superseded

- Entering `London` by both fill and sequential key events updated the search field.
- No visible `role=option`, suggestion, or autocomplete container appeared during the sampled wait window.
- Recheck: suggestions appeared after a short wait. This is not a confirmed defect. Verified state: `screenshots/home-search-suggestions-verified-1440x900.jpg`.
- First-pass evidence is retained in `interaction-trace.json` and `screenshots/home-search-suggestions-1440x900.jpg`.

## Interaction results

- Sort menu opened and exposed Recommended, Nearest, price ascending/descending, and Newly Added. Selecting Price (Low to High) checked the radio and reordered results; the first observed result changed to a £425/month room.
- Filter drawer exposed University, Locality, Budget, Move-in Month, Stay Duration, Room Type, Guarantor, Availability, Dual Occupancy, Property Type, Distance, Amenities, and Bills Included. The £160–£180 bar acquired its active class, but the preview count remained 228 and the final URL only retained the sort query. Filter-result behavior therefore needs re-verification.
- Map view rendered a Mapbox canvas, property marker, zoom controls, attribution, 3D toggle, and Close Map. Zoom and marker click were exercised; no marker popup was observed.
- Property gallery opened as a full-screen overlay with Overview, Room Types, Amenities, Videos, 3D, Exterior, Common Area, Shot By Residents, and Floor Plans sections.
- Room details opened for Bronze En Suite and exposed room attributes and tenancy choices. Book expanded tenancy rows; a second Book click did not produce a new verified state.
- Enquiry modal opened from the first listing and exposed contact fields, communication-mode checkboxes, consent copy, and Submit. No data was entered and Submit was not pressed.
- Login modal opened with phone, email, Google, Facebook, and Apple paths. No credentials were entered and no authentication action was taken.

## Design-system observations

- Primary application stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`.
- News article content additionally uses `"Open Sauce One", sans-serif`.
- Newly verified templates add `"Instrument Sans"` display headings (partner, scholarship, contact, legal pages), a Geist body stack on `/partner`, and `"Open Sauce One"` on the Essential Kit hero. Representative computed samples are in `design-token-recheck.json`.
- Frequent text colors include `rgb(17, 25, 40)`, `rgb(55, 65, 81)`, `rgb(75, 85, 99)`, `rgb(85, 85, 85)`, white, black, and amber pink `rgb(237, 58, 86)`.
- Dominant text sizes are 16 px, 14 px, 12 px, 11 px, and 10 px; larger display sizes vary by marketing template.
- Common gaps are 4, 8, 12, 16, 24, and 32 px.
- Common radii are 8 px, 20 px, 50%, and pill values such as 999/10000 px.
- Full frequency tables, exact computed styles, bounding boxes, padding, margins, shadows, and responsive differences are in `design-token-inventories.json`.

## Route/template inventory

Observed internal links produced 280 unique routes across these families:

- Home.
- Search/listing routes (`/places/search/:slug-id`): city, country, locality, and university variations.
- Property detail routes (`/places/:property-id`).
- Marketing/company pages: About, How It Works, Media, Ambassador, Referral, Group Booking, List With Us, Partner, University Partnerships, and Careers.
- Content: News index, standard news articles, Amber Reports, Amber Radar, and Podcast.
- Amber+ index and service routes.
- Scholarship, Exams, Help, Contact, Terms, and Privacy.

Counts and examples are in `route-inventory.json`; direct render checks are in `route-matrix.json`.

## Browser-visible network and console observations

- Asset-heavy routes included about 316 DOM-observed assets on home, 207 on listing, 282 on property, and 91 on the sampled article.
- Dominant hosts were `amberstudent.com`, `cdn-static-assets.amberstudent.com`, `prod-static-assets.amberstudent.com`, `prod-assets.amberstudent.com`, and `static-assets.amberstudent.com`; property pages additionally referenced `videos.amberstudent.com`.
- The captured console buffer repeatedly contained a generic `Response error: t`, Meta Pixel invalid-currency warnings, Google Identity/FedCM migration warnings, and a FedCM token NetworkError. Logs were cumulative in the browser tab and should not be interpreted as an isolated count per route.
- Full visible asset URLs and console entries are in `network-metadata.json`.
- Recheck request-level statuses and selected public response headers are in `network-metadata-recheck.json`; query strings, cookies, and bodies were intentionally excluded.

## Unverified areas

- A selected public request/response header sample and HTTP statuses are now verified. Bodies, initiator chains, WebSocket traffic, service-worker internals, and HAR data were not retained or exhaustively audited.
- The nine previously empty routes rendered on recheck, but the complete public XML sitemap was not enumerated. The 280-route inventory is observed links, not an exhaustive route census.
- Applied filter result count, map-marker popup, post-Book transition, video playback, 3D tour behavior, social login handoffs, and any authenticated/account flows remain unverified.
- Only core home/listing/property templates have all four requested viewport captures; representative marketing and newly discovered templates have desktop/mobile pairs. Other route variants and component focus/error states are not exhaustive.
- No form validation was submitted, so server-side validation and error messaging were not tested.
- No payment, booking completion, referral submission, partner/listing submission, download, external affiliate checkout, or authenticated content was exercised.

