# Design System Document

## 1. Overview & Creative North Star: "The Digital Concierge"

The creative objective of this design system is to move away from the "industrial" look of traditional AI tools and toward a "Digital Concierge" experience. For co-parents navigating separation, the platform must feel like a sophisticated, calm, and highly capable partner. We achieve this by rejecting rigid, boxy layouts in favor of **Organic Glassmorphism**—a style that blends the futuristic precision of AI with the grounded, earthy warmth of Sage and Cream.

The "Template Look" is our enemy. We will break the grid using intentional asymmetry, where content "floats" on varying planes of depth. Overlapping elements and high-contrast typography scales (the juxtaposition of the technical *Space Grotesk* with the humanistic *Manrope*) create an editorial feel that signals premium quality and intentionality.

---

## 2. Colors & Tonal Depth

This palette is designed to be "Luminous Neutral." We avoid harsh blacks and stark whites to reduce cognitive load, using the Sage Green (`#67794A`) to represent growth and stability.

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders for sectioning or containment.
Structure must be defined through:
- **Background Shifts:** Placing a `surface-container-low` component on a `surface` background.
- **Tonal Transitions:** Using the `outline-variant` at 10% opacity only when a boundary is functionally required.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. We use a "Nested Depth" model:
1. **Base Layer:** `surface` (#FFFEFB) – The canvas.
2. **Mid Layer:** `surface-container-low` (#f4f2ef) – For secondary content zones.
3. **Top Layer:** `surface-container-highest` (#e2e0dd) – For active interaction zones or high-priority cards.

### The "Glass & Glow" Rule
To emphasize the AI-first nature, floating elements (modals, floating action buttons, navigation) must use **Glassmorphism**.
- **Recipe:** `surface-container-lowest` at 70% opacity + `backdrop-filter: blur(20px)`.
- **The Glow:** Use a subtle radial gradient of `primary-fixed` (#d4e8b0) at 5% opacity behind AI-driven insights to give them a "living" presence.

---

## 3. Typography: The Technical & The Human

We use a dual-typeface system to balance the high-tech AI capabilities with the grounded, human nature of co-parenting.

* **Display & Headlines (Space Grotesk):** A technical, wide-aperture sans-serif. Use `display-lg` (3.5rem) for hero moments to create an authoritative, editorial impact. This font represents the "AI" intelligence.
* **Body & Labels (Manrope):** A modern, highly legible sans-serif with a warm, human touch. This represents the human side of the platform—approachable and clear.

**Hierarchy Strategy:**
Maintain a high-contrast ratio. A `display-md` headline should often be paired with a `body-sm` label to create significant white space, making the interface feel "breathable" and premium.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved through **Tonal Layering** rather than shadows.
- To lift a card, do not reach for a shadow first; change its background to `surface-container-lowest`.
- Only use **Ambient Shadows** for elements that physically "hover" over the interface (e.g., dropdowns). Shadows must use the `on-surface` color at 4% alpha with a 40px blur—never use pure black.

### Ghost Borders
If accessibility requires a container edge, use the **Ghost Border**: 1px width using `outline-variant` at 15% opacity. This provides a "hint" of a container without breaking the seamless, fluid aesthetic.

---

## 5. Components

### Buttons (The "Pill" Shape)
- **Primary:** Background `primary-container`, text `on-primary-container`. Shape: `full` (9999px).
- **Secondary:** Background `secondary-container`, text `on-secondary-container`. Shape: `full`.
- **The AI Action:** A special button variant using a subtle gradient from `primary` to `tertiary`. This signifies an AI-generated suggestion.

### Cards & Lists
- **No Dividers:** Forbid the use of horizontal lines. Use `spacing-6` (2rem) of vertical white space to separate list items.
- **Card Styling:** Use `rounded-lg` (2rem) for all cards. Background should be `surface-container-low`. For AI-active cards, add a 1px `outline` at 20% opacity to suggest a "powered" state.

### Chips
Selection chips should use `surface-container-high` for the unselected state and `primary-container` with a subtle glow for the selected state. Shape: `full`.

### AI Input Fields
Text inputs should not look like boxes. Use a `surface-container-lowest` background with a `full` (9999px) radius. When focused, the "Ghost Border" should transition to `primary` at 40% opacity with a soft 8px outer glow.

---

## 6. Do’s and Don’ts

### Do:
- **Do** embrace asymmetry. If you have a two-column layout, make one column 60% and the other 30% with a 10% gap to create an editorial flow.
- **Do** use `primary-fixed-dim` for subtle accents in data visualization.
- **Do** ensure all interactive elements have a minimum touch target of 48px, even if the visual "pill" is smaller.

### Don’t:
- **Don’t** use 100% opaque borders. They create "visual noise" that contradicts the sleek, futuristic goal.
- **Don’t** use standard "Drop Shadows." Use the Ambient Shadow recipe provided in section 4.
- **Don’t** crowd the layout. If you feel a section is too busy, double the padding using the `spacing-12` or `spacing-16` tokens.
- **Don’t** use pure black (#000000) for text. Always use `on-surface` (#1c1b18) to maintain the sophisticated, soft-touch palette.