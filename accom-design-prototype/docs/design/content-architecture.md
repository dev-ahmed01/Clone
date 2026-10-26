# Content Architecture and Data Provenance

## Decision sequence

1. **Global header:** Accom identity, property discovery, saved state and help.
2. **Immersive gallery:** four category-labelled illustrative images, full-screen lightbox, thumbnails and keyboard controls.
3. **Property overview:** name, address, source/check date, three verified decision facts.
4. **Room selection:** category filter, room-type explanation, compact room rows, tenancy/total selection and two-room comparison.
5. **Included and extra costs:** included, paid separately and confirm-first facts.
6. **Location and commute:** university-first schematic with published walking times.
7. **Policies and fees:** concise, accessible accordions that expose missing/current-term dependencies.
8. **FAQs:** student questions with verified answers or explicit unknowns.
9. **Accessibility route:** physical access details are unknown, with a topic-specific enquiry action.
10. **Related-property decision:** no unverified alternatives; adviser route instead of fabricated cards.
11. **Enquiry:** selected-room summary, validation and local pending confirmation.

The desktop page uses a 75:25 content-to-CTA split after the gallery. The section navigation and CTA remain sticky while left content scrolls. Below 1024 px, the CTA becomes a compact bottom bar and content receives safe-area/scroll padding.

## Provenance model

`public/data.js` uses three source kinds:

| Kind | Meaning | Examples |
|---|---|---|
| `provider-verified` | Stated on the official iQ page and checked on the recorded date | Address, room categories, walking times, Wi-Fi/electricity/water, gym/cinema/study/terrace |
| `dated-demo` | Designed for interaction demonstration and not live inventory | Weekly prices, 2027/28 dates, durations, availability label and totals |
| `illustrative` | Authored media/content that demonstrates form, not property fact | Four AI-generated images and related visual labels |

Room sizes are explicitly approximate demo content. Current price, availability, accessible-room detail, booking fee amount, heating/insurance inclusion, cancellation/visa conditions, payment schedule and guarantor rules require direct provider confirmation.

## Reviews and offers

No review score, testimonial or Accom offer is shown. Although third-party/operator reviews exist, this prototype has no authorisation or verified integration method for republishing them. A production version should separate property-level, operator-selected and independent reviews and explain provenance/moderation. Offers need an owner, terms, eligibility and expiry before they appear.

## Enquiry semantics

The form stores nothing externally and sends nothing. Its confirmation is labelled “saved locally” and “pending”; it states no room is held and no booking is confirmed. Production work would add consent/retention policy, server submission, support ownership, response timing and a traceable status model.
