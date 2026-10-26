# Design Board — Accom listing: 26 October 2026

**Status:** agent-guided heuristic inspection and code correction; **not** six actual human designers or student participants. The six names below identify lenses defined by `Chosen9115/design-board`. Evidence: current `public/index.html`, `site.css`, `DESIGN.md`, research personas, automated browser screenshots at 1440×900 and 390×844, and GitHub Action layout/interaction tests.

## Findings by design lens

| Lens | Evidence-based issue | Decision |
| --- | --- | --- |
| Reduction and precision | Long first-fold gallery plus four competing sidebar highlights; 9–10px metadata made the composition visually busier than necessary | Reduce gallery height moderately, maintain restrained brand accents |
| Calm and task focus | At 390px, the navigation isn't seen before the fixed mobile CTA; students cannot immediately jump to Rooms | Bring the six-section menu nearer to the first fold without removing photos |
| Simplicity | Multiple first-fold CTAs compete, but Save/Compare and Room options are distinct tasks the client requested | Preserve flows; make section navigation discoverable sooner rather than deleting controls |
| Trust and reassurance | Sidebar source/context labels are 8–10px, while price, rating, and map are much larger; this hides caveats | Increase caption size and preserve explicit sample price/review sourcing |
| Systems and accessibility | 43px section-pill targets and six cascading years-of-iteration CSS chunks create fragile consistency | Bring hit area to 44px and make scoped fixes; plan stylesheet consolidation separately |
| User agency | Room comparison and filter tools are strong; mobile users must be able to find them rather than scroll blindly | Preserve both flows, make menu accessible earlier |

## Implemented in this review
1. Changed desktop gallery visual height ceiling from 440px to 405px, retaining the asymmetric hero and lightbox.
2. Reduced mobile gallery to a 265–315px responsive range (roughly 300px at 390×844), making navigation visible sooner above the bottom CTA.
3. Set pill navigation height to at least 44px.
4. Increased main Overview description and the sidebar's crucial price-source/address/feature captions. Kept Google Maps and no-inner-scroll design unchanged.
5. Added automated layout and screenshot guards for first-fold gallery size and mobile tab visibility.

## Remaining design/system debt
- `public/site.css` is large and made up of successive design overrides; consolidate into well-scoped tokens/components after the client signs off the visual direction. Don't do a high-risk rewrite before handoff.
- Ratings, gallery images, room availability, map/route verification and house rules are not production-current. Replace with authorised operator data.
- Lighthouse synthetic scores are not student usability or screen-reader testing. Perform real task-based student trials and assistive-technology verification before production.
- If the user selects a new visual direction, create a separate mockup/branch; don't silently replace these client-approved constraints.
