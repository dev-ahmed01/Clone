# Accom by Emlen Property Detail Design

## Intent

Build one high-fidelity, student-first property-detail prototype for iQ Kingston. It must help a student decide whether the property fits, compare ensuite and studio options, understand the illustrative total cost and tenancy, locate verified commute and inclusion facts, and submit a clearly non-binding enquiry.

## Goals

- Make photography, room comparison, price context, commute, included bills, policy uncertainty and the enquiry next step easy to scan.
- Preserve the requested immersive gallery, 75:25 desktop content/CTA split, sticky section navigation and CTA, glass accents, Bricolage Grotesque headings, Montserrat body, and `#ED2024` primary.
- Provide real local interactions: lightbox, media categories, room filtering, tenancy selection, comparison, accordions, save state, and validated enquiry success.
- Meet a WCAG 2.2 AA-oriented implementation floor and work at 1440, 1280, 768, 390 and 360 CSS pixels.

## Non-goals

No backend, database, authentication, payment, confirmed booking, admin dashboard, student portal, live availability, live enquiry submission, or production analytics.

## Anti-goals

Do not copy Amber's composition, invent reviews/offers/policies, imply imagery shows the exact room, or present demo prices and availability as current facts.

## Constraints

- Isolated project at `accom-design-prototype` because no Accom app exists in the workspace.
- Official iQ page is the preferred source for address, room categories, amenities, inclusions and commute facts.
- Generated gallery images are illustrative and labelled as such.
- Demo prices, dates and availability are dated prototype snapshots with provenance in code and UI.
- Dependency-free Node static app: no package install is required, and browser automation handles rendered verification.

## Approaches considered

1. **Next.js/React prototype.** Familiar component model, but adds package installation, build tooling and framework code that do not improve this single local evaluation surface.
2. **Vite/React prototype.** Lighter than Next.js, but still adds a dependency graph and build step for interactions that the platform already provides.
3. **Dependency-free web app — selected.** Semantic HTML, CSS and small ES modules served by Node. It is the shortest path to the complete interaction and accessibility scope, starts instantly, and remains easy to inspect.

## Experience direction

“Editorial campus living”: warm paper-like surfaces, ink/navy typography, vivid Accom red used as a signal, cobalt and mint accents, oversized editorial headings, subtle linework, asymmetric gallery composition and selective glass controls. Cards are reserved for comparison and grouped decisions; long content uses open sections and rules rather than a rounded container around everything.

## Content order

Header → immersive gallery → overview/decision summary → sticky section navigation → room chooser and comparison → inclusions and paid extras → university-first commute → policy/fee clarity → FAQs and accessibility route → small related-property teaser → enquiry.

## Key interaction decisions

- Room selection persists into the sticky CTA and enquiry modal.
- Tenancy changes recompute total rent from weekly price × duration and display the demo provenance.
- Comparison opens only after two rooms are selected; selection is never color-only.
- Lightbox uses a native dialog, visible close/previous/next controls, thumbnail buttons, Escape support and focus restoration.
- Mobile replaces the desktop sticky card with a safe-area-aware bottom CTA and adds bottom page padding.
- Enquiry validation keeps values, places errors beside fields, focuses the first invalid field, and announces success. Success explicitly says no booking is confirmed.

## What remains for production

Replace illustrative photos and demo room data with authorised property feeds; obtain current policy, accessibility and fee content from iQ/Accom owners; connect enquiry submission with consent, retention and support workflows; conduct representative student usability testing and assistive-technology testing.
