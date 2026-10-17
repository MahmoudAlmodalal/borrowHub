---
name: Academic Focus Design System
description: Comprehensive design system for a modern bilingual (Arabic/English) educational platform prioritizing focus, accessibility (WCAG AA/AAA), and RTL-first UX.
tokens:
  colors:
    primary:
      default: "#1E3A8A"
      hover: "#172554"
      active: "#1E3A8A"
      subtle: "#EFF6FF"
      contrast: "#FFFFFF"
    secondary:
      default: "#0284C7"
      hover: "#0369A1"
      active: "#075985"
      subtle: "#F0F9FF"
      contrast: "#FFFFFF"
    accent:
      default: "#F59E0B"
      hover: "#D97706"
      subtle: "#FFFBEB"
      contrast: "#78350F"
    neutral:
      background: "#F8FAFC"
      surface: "#FFFFFF"
      surface-subtle: "#F1F5F9"
      surface-muted: "#E2E8F0"
      border: "#CBD5E1"
      border-subtle: "#E2E8F0"
      text-primary: "#0F172A"
      text-secondary: "#475569"
      text-muted: "#94A3B8"
      text-inverse: "#FFFFFF"
    semantic:
      success:
        base: "#10B981"
        surface: "#ECFDF5"
        border: "#A7F3D0"
        text: "#065F46"
      warning:
        base: "#F59E0B"
        surface: "#FFFBEB"
        border: "#FDE68A"
        text: "#92400E"
      error:
        base: "#EF4444"
        surface: "#FEF2F2"
        border: "#FECACA"
        text: "#991B1B"
      info:
        base: "#3B82F6"
        surface: "#EFF6FF"
        border: "#BFDBFE"
        text: "#1E40AF"
  typography:
    fontFamilies:
      arabic: "'IBM Plex Sans Arabic', 'Cairo', system-ui, sans-serif"
      english: "'Inter', 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif"
      code: "'JetBrains Mono', 'Fira Code', monospace"
    fontWeights:
      regular: 400
      medium: 500
      semibold: 600
      bold: 700
    scales:
      display:
        size: "36px"
        lineHeight: "44px"
        letterSpacing: "-0.02em"
      h1:
        size: "30px"
        lineHeight: "38px"
        letterSpacing: "-0.01em"
      h2:
        size: "24px"
        lineHeight: "32px"
        letterSpacing: "-0.01em"
      h3:
        size: "20px"
        lineHeight: "28px"
        letterSpacing: "0em"
      body-lg:
        size: "18px"
        lineHeight: "28px"
        letterSpacing: "0em"
      body:
        size: "16px"
        lineHeight: "24px"
        letterSpacing: "0em"
      caption:
        size: "14px"
        lineHeight: "20px"
        letterSpacing: "0.01em"
      tiny:
        size: "12px"
        lineHeight: "16px"
        letterSpacing: "0.02em"
  spacing:
    1: "4px"
    2: "8px"
    3: "12px"
    4: "16px"
    6: "24px"
    8: "32px"
    12: "48px"
    16: "64px"
  radii:
    none: "0px"
    sm: "6px"
    md: "10px"
    lg: "16px"
    xl: "24px"
    full: "9999px"
  shadows:
    none: "none"
    sm: "0 1px 2px 0 rgba(15, 23, 42, 0.05)"
    md: "0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)"
    lg: "0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)"
    focus-ring: "0 0 0 3px rgba(30, 58, 138, 0.25)"
  breakpoints:
    sm: "640px"
    md: "768px"
    lg: "1024px"
    xl: "1280px"
    2xl: "1536px"
---

# Academic Focus Design System — Documentation & Architecture

## 1. Overview
The **Academic Focus Design System** is an enterprise-grade UI foundation tailored for modern digital learning environments, accredited courseware, and university/corporate educational platforms. It is optimized for cognitive endurance, reducing visual fatigue during extended learning sessions while maintaining high academic prestige and authority.

### Key Tenets
1. **Focus & Cognitive Clarity:** Uncluttered layouts, calm background tones, and deliberate contrast hierarchies that keep attention squarely on learning material.
2. **True Bilingual Parity (RTL/LTR First):** Symmetric typography and layout mirroring that treats Arabic and English as equal primary citizens without visual distortion.
3. **Rigorous Accessibility (WCAG 2.1 AA/AAA):** High-contrast color pairings (minimum 4.5:1 for body copy and 3:1 for large text/interactive components), comprehensive keyboard navigation, and explicit semantic feedback.

---

## 2. Colors

### Palette Rationale & Functional Roles
* **Primary (`#1E3A8A` / Deep Indigo):** Represents institutional credibility, academic rigor, and depth. Used for primary calls-to-action, active navigation states, key metric highlights, and authoritative branding.
* **Secondary (`#0284C7` / Electric Sky):** Injects modern vitality and clarity. Used for secondary CTAs, hyperlinks, active filters, and interactive informational indicators.
* **Accent (`#F59E0B` / Warm Amber):** Serves as an achievement and motivation trigger. Used sparingly for rewards, progress milestones, streak counters, and urgent callouts.
* **Neutral Background (`#F8FAFC` / Soft Slate):** A tinted, glare-free off-white surface that mitigates eye strain during prolonged reading and video watching.
* **Surface (`#FFFFFF`):** Crisp pure white applied to elevated content cards, modular lesson sections, and dropdown menus.
* **Surface Subtle (`#F1F5F9`):** Neutral container fill for form input controls, inactive tabs, and table headers.

### Semantic Status Matrix
| Semantic Token | Base Color | Light Surface | Dark Text | Intended Context |
| :--- | :--- | :--- | :--- | :--- |
| **Success** | `#10B981` | `#ECFDF5` | `#065F46` | Quiz passed, certificate issued, completed module |
| **Warning** | `#F59E0B` | `#FFFBEB` | `#92400E` | Upcoming assignment deadline, expiring subscription |
| **Error** | `#EF4444` | `#FEF2F2` | `#991B1B` | Form validation failure, failed exam attempt, payment issue |
| **Info** | `#3B82F6` | `#EFF6FF` | `#1E40AF` | System announcements, prerequisite recommendations |

---

## 3. Typography

### Typefaces
* **Arabic Primary:** `IBM Plex Sans Arabic` (Fallback: `Cairo`, `system-ui`). Chosen for its balanced open counters, consistent baseline, and outstanding readability across Arabic diacritics and technical prose.
* **English Primary:** `Inter` (Fallback: `IBM Plex Sans`, `-apple-system`). Provides tall x-height, neutral geometric proportions, and optical alignment with Arabic letter heights.

### Typographic Hierarchy Rules
* **Display / Hero (`36px` / `44px` line-height):** Reserved for course landing headers, certificate titles, and main dashboard greetings.
* **H1 (`30px` / `38px`):** Top-level page titles and module header names.
* **H2 (`24px` / `32px`):** Section headers within cards, quiz topic divisions.
* **H3 (`20px` / `28px`):** Lesson titles, modal titles, card headers.
* **Body Regular (`16px` / `24px`):** Core instructional content, lecture descriptions, forum discussions.
* **Caption (`14px` / `20px`):** Timestamps, instructor bylines, duration tags, form field helper labels.
* **Tiny (`12px` / `16px`):** Badges, pill counters, metadata tags, micro-legal copy.

---

## 4. Layout & Spacing

### 4px Baseline Rhythm
All margins, padding, and dimensional heights are anchored to multiples of 4px:
* **`space-1` (4px):** Micro gaps between icons and labels, badge internal vertical padding.
* **`space-2` (8px):** Compact gaps between related list items, inline badge arrays.
* **`space-3` (12px):** Form field vertical internal padding, compact card insets.
* **`space-4` (16px):** Standard card padding, gutters on mobile viewports.
* **`space-6` (24px):** Standard grid gap between course tiles, section inner margins.
* **`space-8` (32px):** Major vertical spacing between dashboard rows.
* **`space-12` (48px+) & `space-16` (64px+):** Page section divisions, hero spacing.

### Responsive Breakpoints
* **Mobile (`sm` < 768px):** 1-column layouts, sticky bottom navigation or simplified drawer, full-width buttons (`min-height: 48px` for touch targets).
* **Tablet (`md` 768px – 1023px):** 2-column course grids, collapsible side navigation.
* **Desktop (`lg` 1024px – 1279px):** Persistent sidebar navigation (`width: 260px`), 3-column dashboard grids, fixed top app bar.
* **Wide Desktop (`xl` 1280px+):** Max container width `1280px` or `1440px`, centered with fluid auto-margins.

### RTL / LTR Mirroring Guidelines
* **Horizontal Inversion:** All flexbox and grid orders naturally flip using logical CSS properties (`margin-inline-start`, `padding-inline-end`).
* **Directional Icons:** Next/previous chevron buttons, back arrows, and breadcrumb dividers MUST be mirrored in RTL mode (`transform: scaleX(-1)` or localized icon SVGs).
* **Non-Directional Icons:** Universal media playback controls (Play, Pause, Fast-forward), numerical clocks, and checkmarks remain un-mirrored.
* **Code & Numerical Formats:** Math equations, code blocks, and timestamps remain LTR even within RTL sentences (`dir="ltr"`).

---

## 5. Elevation & Depth

* **Level 0 (Flat):** Page canvas background (`#F8FAFC`).
* **Level 1 (`shadow-sm`):** Standard course cards, tabular list rows, static containers with subtle borders (`1px solid #CBD5E1`).
* **Level 2 (`shadow-md`):** Hovered course cards, floating action toolbars, dropdown popovers.
* **Level 3 (`shadow-lg`):** Modal dialogs, student grading drawers, persistent floating toast notifications.
* **Modal Backdrop:** `background-color: rgba(15, 23, 42, 0.6)` combined with `backdrop-filter: blur(4px)` to minimize cognitive distraction from background content.

---

## 6. Shapes & Geometry

* **`radius-sm` (6px):** Status badges, course level tags, interactive checkboxes.
* **`radius-md` (10px):** Primary/Secondary buttons, form input fields, tabs, search bars.
* **`radius-lg` (16px):** Course cards, lecture video frames, quiz container sheets, modal surfaces.
* **`radius-full` (9999px):** Student profile avatars, notification count indicators, filter chips.

---

## 7. Component Specifications

### Buttons
* **Primary Button:** High visual weight, filled with `#1E3A8A`, white text. Used for main action per screen (e.g., "Start Lesson", "Enroll Now").
* **Secondary Button:** Outlined or soft filled (`#EFF6FF` background with `#1E3A8A` text). Used for secondary alternatives (e.g., "Preview Syllabus", "Download Materials").
* **States:**
  - *Default:* Full opacity, standard elevation.
  - *Hover:* Background darkens 8%, slight shadow expansion.
  - *Focus:* High-contrast outer double-ring (`ring-2 ring-primary ring-offset-2`).
  - *Disabled:* Background `#E2E8F0`, text `#94A3B8`, `cursor: not-allowed`, no pointer events.
  - *Loading:* Text replaced with centered SVG spinner, fixed width retained to eliminate layout shift.

### Form Inputs
* Height `44px` (minimum accessible target size), radius `10px`, background `#FFFFFF` or `#F8FAFC`.
* Default border `1px solid #CBD5E1`. On focus: `border-color: #1E3A8A` with `ring-3 ring-blue-500/20`.
* Error state: `border-color: #EF4444`, with error message and warning icon displayed underneath in `#991B1B`.

### Course Cards
* Structured with thumbnail image on top (16:9 ratio, `rounded-t-2xl`), badge overlay (Category / Level).
* Middle section: Title in H3 bold, instructor name, rating star indicator, duration pill.
* Bottom section: Progress bar (Linear height 6px, filled in `#10B981` or `#1E3A8A`) and "Continue" CTA button.

### Navigation
* **Top Bar:** Fixed `68px` height with platform logo, unified search bar, language toggle (AR/EN), notification bell with unread dot, and user avatar.
* **Sidebar:** Clean grouping into "Learn" (Dashboard, My Courses, Assignments), "Community" (Forums, Study Groups), and "Account" (Certificates, Settings).

---

## 8. Do’s and Don’ts

### Do:
- **Do** maintain a strict 4.5:1 contrast ratio for all educational text and quiz questions.
- **Do** test RTL layouts with real Arabic copy to verify that line breaks and font ascenders/descenders do not clip.
- **Do** provide clear keyboard focus indicators on all interactive elements (video player controls, quiz choices).
- **Do** reserve the Warm Amber accent color strictly for achievements, streaks, and warnings to preserve its urgency and value.

### Don’t:
- **Don't** use pure black (`#000000`) for text on pure white (`#FFFFFF`); use `#0F172A` to prevent high-frequency visual vibration during long reading sessions.
- **Don't** mirror universal media control icons (Play, Pause, Volume) in RTL mode.
- **Don't** rely on color alone to communicate test results; always combine color with an icon and clear text (e.g., green checkmark with "Passed").
- **Don't** introduce random border radii; always map directly to the defined `radius-sm`, `radius-md`, or `radius-lg` tokens.
