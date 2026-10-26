# Accom Property Detail Design System

## Direction

The page uses a **student move-in field guide** aesthetic: warm, editorial and practical. Immersive imagery answers “could I live here?”, while open rules, compact labels and comparison cells answer “what am I committing to?”. Accom red signals action; it does not flood every surface.

## Colour tokens

| Token | Value | Use |
|---|---:|---|
| Brand red | `#ED2024` | Brand mark, visual signal, non-text accents |
| Action red | `#C4141D` | Text-bearing primary buttons; passes AA with white |
| Action hover | `#B70F19` | Hover/pressed emphasis |
| Ink | `#111B2D` | Primary text and dark surfaces |
| Ink soft | `#354052` | Secondary text on paper |
| Paper | `#F6F1E8` | Page ground |
| Paper deep | `#EBE1D2` | Grouped secondary surface |
| White | `#FFFDF9` | Room rows, dialog fields and dark-surface text |
| Cobalt | `#1F47C7` | Focus, guidance and enquiry editorial panel |
| Mint | `#B9E4D0` | Included/reassurance surface |
| Sand | `#E9D2AA` | Paid/confirm-first surface |
| Error | `#A50F18` | Inline validation with text |
| Success | `#12633F` | Verified/success status with text |

Functional meaning is never carried by colour alone. `#ED2024` remains the brand primary, while the darker action token protects small white button labels.

## Typography

- **Headings:** Bricolage Grotesque, optical-size variable, 700–800. Display tracking no tighter than `-0.035em`; maximum `6rem`.
- **Body and controls:** Montserrat, 400–700, minimum 16 px for mobile input text.
- **Data:** tabular numerals for prices and totals.
- **Measure:** body copy stays near 65–75 characters where it is read as prose.

## Spacing and layout

- 4/8 px base rhythm; common increments: 8, 12, 16, 24, 32, 48, 56, 72.
- Desktop content width: `1320px`.
- Desktop decision layout: `3fr / 1fr` (75:25) with a 56 px gutter.
- Tablet/mobile collapse at `1024px`; the CTA becomes a safe-area bottom action.
- Cards use 12–14 px radii; pills are reserved for compact controls and filters.
- Sections use open space and rules; nested cards are avoided.

## Elevation and glass

- `0 18px 48px rgba(17,27,45,.14)` for sticky surfaces.
- `0 28px 90px rgba(17,27,45,.24)` for modal focus.
- Glass is limited to gallery metadata, sticky section navigation and CTA surfaces where it signifies persistence over content.

## Controls and state

- Minimum interactive height: 44 px; primary actions use 50 px.
- `:focus-visible`: 3 px cobalt outline with 3 px offset.
- Hover increases contrast; press uses a small non-layout-changing scale.
- Disabled compare action is visibly muted and genuinely disabled.
- Errors sit next to the field, preserve values and move focus to the first invalid input.
- Success is announced politely, focused, and names the pending/non-booking status.
- Motion is short, interruptible, uses explicit properties and is removed under `prefers-reduced-motion`.

## Icon and imagery rules

- Icons use one authored 1.8 px outline language; no emoji or font glyph icons.
- Meaningful images have descriptive alt text and explicit dimensions; thumbnails are decorative when their labelled button provides the name.
- All gallery imagery is AI-generated illustrative media, never presented as the actual iQ Kingston room.
- Shipped WebP derivatives are used in the page; source PNGs are retained outside the public serving path.

## Accessibility floor

Semantic landmarks and headings; skip link; native buttons, details and dialogs; labelled inputs; keyboard gallery controls; visible focus; Escape close; focus restoration; 360 px reflow; safe-area spacing; no disabled zoom; 4.5:1 body/control text contrast; 3:1 non-text control contrast; reduced motion.
