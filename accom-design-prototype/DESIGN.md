---
name: "Accom by Emlen — Property Detail"
description: "An immersive, trustworthy move-in field guide for student room decisions"
colors:
  brand-red: "#ED2024"
  action-red: "#C4141D"
  action-hover: "#B70F19"
  ink: "#111B2D"
  ink-soft: "#354052"
  paper: "#F6F1E8"
  paper-deep: "#EBE1D2"
  white: "#FFFDF9"
  cobalt: "#1F47C7"
  mint: "#B9E4D0"
  sand: "#E9D2AA"
  line: "#D7CDBF"
  error: "#A50F18"
  success: "#12633F"
typography:
  display:
    fontFamily: "'Bricolage Grotesque', 'Trebuchet MS', sans-serif"
    fontSize: "clamp(3.4rem, 6vw, 5.4rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Bricolage Grotesque', 'Trebuchet MS', sans-serif"
    fontSize: "clamp(2.4rem, 4.4vw, 4.15rem)"
    fontWeight: 700
    lineHeight: 0.98
  body:
    fontFamily: "'Montserrat', 'Segoe UI', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Montserrat', 'Segoe UI', sans-serif"
    fontSize: "12px"
    fontWeight: 600
rounded:
  surface: "14px"
  image: "10px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "72px"
components:
  button-primary:
    backgroundColor: "{colors.action-red}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    height: "50px"
    padding: "0 20px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
  pill-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
---

# Design System: Accom by Emlen — Property Detail

## Overview

**Creative North Star: "The Student Move-In Field Guide"**

The property page should look like a high-quality editorial guide made for a student preparing to live somewhere new. Immersive photography creates a sense of place; crisp room information, open spacing and comparative details help students make decisions. This is an assistance-led accommodation experience, not a hotel checkout or an Amber clone.

**Key Characteristics:** Full-width gallery; open editorial hierarchy; warm paper background; confident Accom red; cobalt/mint supporting details; distinctive headings; selective translucent glass; clear contract and cost information.

## Colors

**The One Red Action Rule.** The primary #ED2024 conveys brand identity. Use the darker #C4141D for small white-on-red control labels to maintain contrast, and reserve large red areas for genuine decisions rather than decoration.

- **Accom Red** (#ED2024): brand and decorative action signalling.
- **Action Red** (#C4141D): primary enquiry control with white text.
- **Midnight Ink** (#111B2D): headings, dark facts, base for dark glass.
- **Soft Ink** (#354052): readable secondary descriptions.
- **Warm Paper** (#F6F1E8) and **Ivory White** (#FFFDF9): calm, warm backgrounds.
- **Cobalt** (#1F47C7): focus indication and enquiry-introduction panel.
- **Mint** (#B9E4D0): positive inclusions and reassurance.
- **Sand** (#E9D2AA): secondary caution/information surfaces.
- **Line** (#D7CDBF): dividers, room and form outlines.
- **Error** (#A50F18) and **Success** (#12633F): semantic feedback with text.

## Typography

**Display Font:** Bricolage Grotesque, fallback Trebuchet MS / sans-serif.
**Body Font:** Montserrat, fallback Segoe UI / sans-serif.

- **Display:** 700 at clamp(3.4rem, 6vw, 5.4rem), line-height .98, tracking -.035em.
- **Section headlines:** 700 at clamp(2.4rem, 4.4vw, 4.15rem).
- **Body:** 400, 16px/1.6; aim for readable 65–75 character paragraphs.
- **Metadata and labels:** 600–700 at 12–13px; small 11px provenance labels are a prototype limitation and should not become core navigation.
- **Prices:** tabular figures and explicit GBP/week, with total tenancy commitment alongside the selected period.

**The Decision-Type Rule.** Never let oversized art-direction headlines push the room, price and action entirely out of context.

## Layout

The gallery fills the left content track of the opening 75:25 layout, beside a visible property-information/CTA rail from the very first viewport. Clicking a gallery tile opens the full-viewport lightbox. The content area has a maximum width of 1320px, 24px horizontal container padding and a `3fr / 1fr` grid with 28px gutter—75:25 of occupied grid tracks. After the left-side gallery, property details and scroll-linked section navigation continue in the same column while the right CTA stays sticky. The earlier full-browser-width gallery followed by a negatively lifted CTA is superseded.

The left column owns section navigation, property facts, rooms, inclusions, location, policies and FAQs. The right-hand CTA is sticky at 22px from the viewport top, with no negative margin or overlay hack; the first-fold CTA occupies the right grid track naturally.

At 1024px and below, the layout stacks and uses a fixed safe-area-aware bottom action. At 768px and below, the gallery uses a 58vh-capped layout (480px maximum, 360px minimum) so the property identity appears sooner. Sections use 72px vertical spacing on desktop, reducing responsively. The section navigation stays within the left column and remains keyboard reachable.

## Elevation & Depth

Use shadows where elements float (CTA, media controls and dialogs); keep ordinary editorial content flat and separated by whitespace/rules.

- **Floating surfaces:** `0 18px 48px rgba(17,27,45,.14)`.
- **Dialogs:** `0 28px 90px rgba(17,27,45,.24)`.
- **Glass:** dark translucent ink with 18px blur and moderate saturation; apply to gallery metadata, section navigation and CTA. Room filter pills use warm frosted paper. Confirm text contrast even when media behind them changes.

**The Selective Glass Rule.** Do not wrap every paragraph or amenity in another frosted card.

## Shapes

14px rounds for principal surfaces; roughly 10px for room thumbnails; full pills for navigation, room filters and primary actions. Long content sections stay open. Avoid giant soft-corner cards that flatten content hierarchy.

## Components

### Buttons
- **Primary:** action red with white at 50px minimum height and 999px radius; hover darkens, active uses non-layout-changing scale.
- **Secondary:** dark outline, transparent surface, 46px minimum height.
- **Focus:** 3px cobalt outline, offset 3px.
- **Mobile action:** compact floating bottom pill; preserve room, weekly rate and total-contract context.

### Chips
- **Section navigation:** ink-coloured glass pill, 44px target links; active item is high-contrast ivory.
- **Room filters:** frosted ivory pill strip; selected category is ink on ivory contrast reversal.
- **Status:** colours alone do not encode availability, success or error.

### Cards / Containers
- **Gallery:** asymmetric photograph mosaic, full-width dark wrapper and a full-viewport image lightbox.
- **CTA:** dark glass, named room, weekly price, tenancy dates, total commitment, honest demo status and one clear enquiry action.
- **Room list:** open white rows with restrained borders and collapsible tenancy details.

### Inputs / Fields
Use labelled native controls. Validation appears next to the relevant field; keep focus on the first invalid field; reset errors on a fresh enquiry. A demo confirmation must clearly say that no message was transmitted.

### Navigation
Section links reflect active content via `aria-current="location"`. A mobile help control opens the enquiry dialog directly; do not link to a desktop-only hidden sidebar.

## Do's and Don'ts

### Do:
- **Do** make the full-width gallery open a keyboard-accessible lightbox.
- **Do** keep the right CTA visible while scrolling desktop content.
- **Do** keep the 75:25 structure throughout the opening gallery and lower listing on desktop, then adapt it on mobile.
- **Do** make prices, room privacy, tenancy length and enquiry outcomes explicit.
- **Do** state when room values or imagery are illustrative and require verification.
- **Do** use Bricolage Grotesque and Montserrat in their intended roles.

### Don't:
- **Don't** reproduce Amber's visual composition or fill the page with repeated promotions.
- **Don't** use unverified reviews, offers, availability, policy promises or photography.
- **Don't** turn a simulated enquiry into a claimed booking or contact request.
- **Don't** hide essential navigation or enquiry controls under sticky surfaces.
- **Don't** let frosted glass obscure core text or keyboard focus.
