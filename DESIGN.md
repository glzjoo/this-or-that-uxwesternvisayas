---
name: DuoDecide
colors:
  surface: '#f8f9fd'
  surface-dim: '#d9dade'
  surface-bright: '#f8f9fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3f7'
  surface-container: '#edeef2'
  surface-container-high: '#e7e8ec'
  surface-container-highest: '#e1e2e6'
  on-surface: '#191c1f'
  on-surface-variant: '#474555'
  inverse-surface: '#2e3134'
  inverse-on-surface: '#eff1f5'
  outline: '#777586'
  outline-variant: '#c8c4d8'
  surface-tint: '#5444df'
  primary: '#5141dc'
  on-primary: '#ffffff'
  primary-container: '#6b5df6'
  on-primary-container: '#fffbff'
  inverse-primary: '#c5c0ff'
  secondary: '#006875'
  on-secondary: '#ffffff'
  secondary-container: '#00e3fd'
  on-secondary-container: '#00616d'
  tertiary: '#b02700'
  on-tertiary: '#ffffff'
  tertiary-container: '#dc3300'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e3dfff'
  primary-fixed-dim: '#c5c0ff'
  on-primary-fixed: '#130067'
  on-primary-fixed-variant: '#3b23c7'
  secondary-fixed: '#9cf0ff'
  secondary-fixed-dim: '#00daf3'
  on-secondary-fixed: '#001f24'
  on-secondary-fixed-variant: '#004f58'
  tertiary-fixed: '#ffdad2'
  tertiary-fixed-dim: '#ffb4a2'
  on-tertiary-fixed: '#3c0700'
  on-tertiary-fixed-variant: '#8a1d00'
  background: '#f8f9fd'
  on-background: '#191c1f'
  surface-variant: '#e1e2e6'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 20px
  container-max: 1200px
---

## Brand & Style

The design system is built for a "This or That" voting platform, focusing on rapid decision-making and high user engagement. The brand personality is **decisive, vibrant, and modern**. It aims to evoke a sense of playfulness while maintaining the professional polish of a high-end social utility.

The aesthetic follows a **High-Contrast / Modern** style. By utilizing a punchy purple foundation inspired by the UX Western Visayas visual identity, the system emphasizes clarity and binary choices. The interface prioritizes the content (the "options") through generous whitespace and bold typographic hierarchies, ensuring that the "This or That" action is the undisputed center of gravity.

## Colors

The palette is anchored by a vibrant **Primary Purple (#7366FF)**, derived from the reference logo. This is used for primary brand moments and core interactive elements.

- **Primary:** A versatile purple used for buttons, active states, and brand iconography. A linear gradient variant is provided for high-impact surfaces like headers or featured polls.
- **Secondary (Accent):** A bright **Cyan (#00E5FF)** is introduced as a high-visibility accent for "Success" states, progress bars, and selection indicators.
- **Tertiary:** A vivid **Orange-Red (#FF3D00)** is used sparingly for destructive actions or "Hot Take" labels.
- **Neutral:** The background system uses a cool-toned off-white/gray (#F8F9FD) to provide a clean canvas that makes the purple elements and user-generated images pop.

## Typography

This design system utilizes **Hanken Grotesk** across all roles to maintain a clean, sharp, and contemporary feel. Its geometric construction provides the "professional" edge required for a modern SaaS product, while its high legibility supports quick reading during rapid voting sessions.

- **Display levels** use extra-bold weights and tight letter spacing to create impact for "This vs That" headings.
- **Body levels** use a generous line height to ensure readability of poll descriptions.
- **Labels** leverage uppercase styling and increased tracking for metadata, such as vote counts or category tags.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model for desktop and a **Fluid** model for mobile.

- **Desktop:** A 12-column grid with a 1200px max-width. Voting options are typically presented in side-by-side containers (spanning 6 columns each).
- **Mobile:** A single-column vertical stack. The "This" and "That" options occupy the viewport height equally to minimize scrolling.
- **Rhythm:** An 8px base unit drives all spacing. 24px (md) is the standard padding for containers, while 48px (lg) is used to separate distinct poll sections.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layers** and **Ambient Shadows**. 

- **Surface Tiers:** The app background is #F8F9FD. The primary voting cards are pure white (#FFFFFF), creating an immediate "lift" from the base.
- **Shadows:** Use extremely soft, diffused shadows to indicate interactivity. A standard "Resting" card uses a shadow of `0px 4px 20px rgba(115, 102, 255, 0.08)`.
- **Active State:** When a user hovers over or selects an option, the shadow deepens and takes on a subtle purple tint to provide tactile feedback without requiring heavy borders.

## Shapes

The design system uses a **Rounded (2)** shape language. This balances the professional "Grotesk" typography with a friendly, approachable UI.

- **Standard Buttons & Inputs:** 0.5rem (8px) corner radius.
- **Voting Cards:** 1rem (16px) corner radius to emphasize their role as the primary interactive containers.
- **Selection Pills:** Fully rounded (pill-shaped) for tags and category chips.

## Components

### Buttons
- **Primary:** Solid purple background (#7366FF) with white text. High-contrast and bold.
- **Secondary:** Transparent with a 2px purple border.
- **Interactive States:** On press, buttons should scale down slightly (98%) to provide a tactile "click" feel.

### Voting Cards
- These are the core component. They should feature a large image area with the "This" or "That" label overlaid using a semi-transparent blur at the bottom. 
- Upon selection, the card border should animate to the Primary Purple.

### Chips & Tags
- Used for categories (e.g., "Food", "Tech"). Use a light purple wash (10% opacity of primary) with bold purple text.

### Progress Bars (Results)
- After voting, results are shown using horizontal bars. Use the Primary Purple for the leading choice and a Neutral Gray for the trailing choice to maintain clear visual hierarchy.

### Input Fields
- Clean white backgrounds with a subtle 1px gray border that transitions to purple on focus. Labels should use the `label-bold` typographic style.