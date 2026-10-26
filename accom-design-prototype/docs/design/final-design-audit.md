# Final design audit

Date: 26 October 2026  
Scope: one local Accom by Emlen property-detail prototype  
Method: internal heuristic review and browser QA, not student usability testing

## First-pass jury

Scores use a 1–10 internal heuristic scale. They are design-team judgements, not real student ratings and are not averaged into a claim of quality.

| Reviewer | First impression | Visual identity | Layout | Typography | Information hierarchy | Student relevance | Room comparison | Trust & clarity | Mobile | Accessibility | Interaction | Overall polish |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Product designer | 9 | 9 | 8 | 8 | 8 | 8 | 6 | 8 | 8 | 7 | 8 | 8 |
| UX researcher | 8 | 8 | 8 | 8 | 8 | 9 | 7 | 9 | 8 | 8 | 8 | 8 |
| International student lens | 8 | 8 | 8 | 8 | 9 | 9 | 8 | 9 | 8 | 8 | 8 | 8 |
| Undergraduate student lens | 9 | 9 | 8 | 8 | 8 | 9 | 7 | 8 | 8 | 8 | 8 | 8 |
| Accessibility reviewer | 8 | 8 | 8 | 7 | 8 | 8 | 8 | 9 | 8 | 7 | 8 | 8 |
| Frontend engineer | 8 | 8 | 8 | 8 | 8 | 8 | 7 | 9 | 8 | 8 | 8 | 8 |

### 1. Product designer

**Strongest:** immersive editorial gallery; recognisable red/cobalt/mint identity; selective glass and varied composition avoid a generic card wall.  
**Major weaknesses:** comparison images initially dominated the dialog; some metadata was too small; the warm paper palette can feel conservative if repeated across a larger platform.  
**Remove:** oversized imagery inside the decision-focused comparison view.  
**Add:** a stronger compact selected-room cue in comparison and CTA states.  
**Specific fixes:** cap comparison image height; raise functional type sizes; preserve one primary red action per viewport.  
**Highest priority:** make comparison scannable without scrolling past photography.

### 2. UX researcher

**Strongest:** decision facts precede marketing; room-type differences are explicit; missing policy details are not fabricated.  
**Major weaknesses:** room/filter/dialog state is not encoded in the URL; related alternatives are intentionally sparse; current full policy documents cannot be opened because no authorised source content was available.  
**Remove:** any repeated prototype caveat once production data supplies equivalent confidence.  
**Add:** provider-owned full policy links and a production availability timestamp.  
**Specific fixes:** keep comparison and enquiry states legible; retain the source labels; test the core tasks with students next.  
**Highest priority:** validate room comparison and total-rent comprehension with real participants.

### 3. International student lens

**Strongest:** no payment request; weekly and total contract cost sit together; the next step is clearly an enquiry rather than confirmation.  
**Major weaknesses:** visa-delay and cancellation details remain unknown; accessible-room facts require contact; the prototype does not explain foreign-payment considerations.  
**Remove:** promotional urgency unless Accom can prove it.  
**Add:** verified visa, cancellation, guarantor, instalment, and deposit terms.  
**Specific fixes:** preserve plain-English policy summaries; provide a named support route; localise currency guidance in production.  
**Highest priority:** replace the honest policy gaps with verified operator terms before launch.

### 4. Undergraduate student lens

**Strongest:** mobile CTA stays reachable; filters reduce the room list; media categories make room and communal-space imagery easy to distinguish.  
**Major weaknesses:** the page is necessarily long; only a small demo room set exists; there is no populated related-property comparison.  
**Remove:** any future large recommendation carousel.  
**Add:** two or three genuinely comparable alternatives after the decision content.  
**Specific fixes:** keep sticky navigation compact; retain one-tap category filters; persist the selected tenancy in the CTA.  
**Highest priority:** protect the fast mobile room-selection path as content grows.

### 5. Accessibility reviewer

**Strongest:** semantic headings and native dialogs; visible focus and keyboard gallery controls; reduced-motion and mobile safe-area handling.  
**Major weaknesses:** no real NVDA, JAWS, or VoiceOver session was completed; property-specific access information is unavailable; some non-essential provenance labels remain at 11px.  
**Remove:** reliance on swipe as the only navigation method (already avoided with visible buttons).  
**Add:** verified lift, step-free route, accessible-room, hearing-loop, and emergency-egress facts.  
**Specific fixes:** correct action-red contrast; increase small functional labels; confirm focus restoration and dialog errors in browser.  
**Highest priority:** conduct assistive-technology testing with the final production content.

### 6. Frontend engineer

**Strongest:** dependency-free local prototype; predictable typed demo-data boundary; no console errors or horizontal overflow in tested viewports.  
**Major weaknesses:** optimized imagery still has further byte-saving potential; the local server has no production caching policy; there is no full end-to-end regression suite.  
**Remove:** source PNGs from the served asset path (completed).  
**Add:** production `srcset`/AVIF delivery, cache headers, and focused browser regression tests.  
**Specific fixes:** serve WebP derivatives; add an inline favicon; verify every requested viewport and interaction state.  
**Highest priority:** use a production image pipeline before deployment.

## Corrections made

| Problem found | Correction | Evidence |
|---|---|---|
| Comparison photography pushed decision rows below the fold | Reduced comparison media height and tightened the comparison grid | `screenshots/room-comparison.png` |
| Primary red with white text missed AA in some uses | Added a darker semantic action red while retaining `#ED2024` as the brand primary | Lighthouse accessibility audit: 100 after correction |
| Small functional/provenance labels reduced readability | Raised key labels to 11–12px and increased contrast | Desktop and mobile recaptures |
| Browser requested a missing favicon | Added a tiny inline SVG favicon | Clean browser console |
| Source PNGs caused avoidable transfer cost | Served provenance-carrying WebP derivatives instead | Post-change local trace |
| Tenancy changes replaced the room list and lost disclosure/focus context | Updated the affected row and persistent CTA in place | `screenshots/open-tenancy.png`; browser check retained `open=true` and radio focus |
| Mobile CTA showed weekly price without contract commitment | Added weeks, illustrative total, and demo status | `screenshots/small-mobile-360.png` and `screenshots/tablet-768.png` |
| Comparison was a visual div grid with weak mobile scanning | Rebuilt it as a scoped-header table; both rooms fit side by side at 390px | `screenshots/mobile-comparison.png` |
| Room explainer’s CSS overrode the native `hidden` state | Added an explicit `[hidden]` rule | Computed display checked in browser |
| Desktop opening delayed the price/action context | Lifted the existing sticky CTA into the reserved right edge of the first viewport | `screenshots/desktop-first-fold.png`; full action measured at y=846–896 in a 900px viewport |

## Second-pass jury

| Reviewer | First impression | Visual identity | Layout | Typography | Information hierarchy | Student relevance | Room comparison | Trust & clarity | Mobile | Accessibility | Interaction | Overall polish |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Product designer | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 |
| UX researcher | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 |
| International student lens | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 8 | 9 | 9 |
| Undergraduate student lens | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 |
| Accessibility reviewer | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 8 | 9 | 8 |
| Frontend engineer | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 8 |

The second pass improved every material issue identified in the first pass, but it does not imply perfection. The lower accessibility and engineering totals reflect missing real assistive-technology testing and remaining production image-delivery work.

## Independent finish gate

A fresh design reviewer assessed the rendered captures and source as an expert heuristic review. Its first disposition was **FIX**, identifying tenancy focus loss, incomplete mobile cost context, comparison semantics/mobile scanning, first-viewport decision context, the explainer hidden-state bug, and two decorative craft-floor elements. After one correction batch it marked five findings resolved and the first-viewport issue partial. A second focused correction exposed the complete selected-room price, tenancy, total, demo disclaimer, and enquiry action at 1440×900. The reviewer’s final disposition was **SHIP**.

This was an internal independent review, not user testing and not evidence that the design outperforms Amber in measured student outcomes.

## Browser validation

- Viewports: 1440×900, 1280×800, 768px tablet, 390×844, and 360×800.
- Captures: desktop fold/full page, mobile full page, gallery lightbox, room comparison, scrolled navigation/CTA, and enquiry dialog.
- Layout: no horizontal overflow at the tested widths; sticky content did not obscure the final sections.
- Gallery: previous/next, Arrow keys, Escape, close-focus restoration, and touch-swipe path checked.
- Rooms: category filtering, tenancy update, weekly/total price reflection, and comparison state checked.
- Enquiry: required-field errors, focus placement, consent validation, simulated pending confirmation, and explicit non-booking message checked.
- Save: pressed state and local-storage persistence checked.
- Console: zero errors or warnings after the favicon correction.
- Automated: four Node tests pass.
- Lighthouse: Accessibility 100, Best Practices 100, SEO 100, and Agentic Browsing 100 in desktop and mobile local audits.
- Local unthrottled performance trace: LCP 420ms and CLS 0.00. These are local laboratory observations, not production Core Web Vitals or field data.

## Remaining limitations

- Gallery media is clearly labelled AI-generated illustration, not authorised photography of iQ Kingston.
- Prices, dates, room areas, and availability are dated prototype data and must be replaced through an approved production feed.
- Full cancellation, visa, instalment, deposit, visitor, and accessibility terms were not available from a verified source; the UI does not invent them.
- No live enquiry is submitted, no availability is reserved, and no booking is confirmed.
- No real student usability study, screen-reader test session, production network test, or backend/security assessment was performed.
- WebP images remain larger than an ideal production responsive-image set; production should add `srcset`, AVIF where suitable, and CDN transformation/caching.
