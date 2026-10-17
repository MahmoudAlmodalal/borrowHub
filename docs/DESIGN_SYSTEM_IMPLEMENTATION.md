# 02. DESIGN SYSTEM IMPLEMENTATION: Academic Focus

This document defines how the **Academic Focus Design System** (`academic_focus/DESIGN.md`) is implemented in Next.js using Tailwind CSS, TypeScript, and accessible component architectures.

---

## 1. Design Philosophy: Modern Academic Clarity

The Academic Focus design system is engineered for rigorous, distraction-free educational environments, laboratory portals, and bilingual (Arabic/English) university administration. It balances institutional authority with contemporary digital precision.

### Core Principles
1. **High Typographic Discipline**: Perfect parity between `IBM Plex Sans Arabic` and `Inter`. Tabular figures for all serials, dates, and metrics.
2. **Dense, Structured Information Architecture**: Suited for technical specifications, lab schedules, serial audits, and inspection checklists.
3. **Restraint & Anti-Slop Discipline**: No arbitrary purple gradients, no static pill badge sandwiches, no fake telemetry tickers, no code-comment headings (`// 01`).
4. **Natural Bidirectionality (RTL / LTR)**: Built with CSS logical properties (`margin-inline-start`, `padding-inline-end`) ensuring flawless mirroring between Arabic and English.

---

## 2. Color Tokens & Theme Configuration

### Tailwind Color Mapping (`tailwind.config.ts`)
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00236f', // Deep Academic Navy
          container: '#1e3a8a', // Deep Academic Indigo
          hover: '#001a54',
          fixed: '#dce1ff',
          'fixed-dim': '#b6c4ff',
        },
        secondary: {
          DEFAULT: '#0284c7', // Electric Sky
          container: '#5bb8fe', // Sky Container
          hover: '#0369a1',
          fixed: '#cce5ff',
        },
        tertiary: {
          DEFAULT: '#f59e0b', // Warm Amber Accent
          container: '#5c3800',
          hover: '#d97706',
          fixed: '#ffddb8',
        },
        surface: {
          DEFAULT: '#ffffff', // Pure White Resting Card
          bright: '#f7f9fb',
          dim: '#d8dadc',
          container: '#eceef0',
          'container-low': '#f2f4f6',
          'container-high': '#e6e8ea',
          'container-highest': '#e0e3e5',
        },
        on: {
          surface: '#191c1e', // Slate 900 typography
          'surface-variant': '#444651', // Slate 600 secondary text
          primary: '#ffffff',
          secondary: '#ffffff',
        },
        outline: {
          DEFAULT: '#cbd5e1', // Slate 300 structural borders
          variant: '#e2e8f0', // Slate 200 hairline dividers
        },
        status: {
          success: '#16a34a', // Emerald Green (Available / Approved)
          'success-bg': '#dcfce7',
          warning: '#d97706', // Amber (Due Soon / Under Review)
          'warning-bg': '#fef3c7',
          danger: '#dc2626', // Crimson (Overdue / Damaged)
          'danger-bg': '#fee2e2',
        }
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', 'Inter', 'sans-serif'],
        arabic: ['"IBM Plex Sans Arabic"', 'sans-serif'],
        latin: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.25rem', // 4px (Soft Academic)
        sm: '0.125rem', // 2px
        md: '0.375rem', // 6px
        lg: '0.5rem', // 8px (Cards & Panels)
        xl: '0.75rem', // 12px (Modals & Drawers)
        full: '9999px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(15, 23, 42, 0.05)',
        elevated: '0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        modal: '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.05)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};

export default config;
```

---

## 3. Typography & Bidirectional Layout Rules

### Dual-Script Font Integration
- **Display & Headlines**:
  - Arabic: `IBM Plex Sans Arabic` (`font-bold` 700 / `font-semibold` 600), `letter-spacing: 0` (preserves Arabic cursive ligatures), `line-height: 1.35`.
  - Latin: `Inter` (`font-bold` 700 / `font-semibold` 600), `letter-spacing: -0.02em`.
- **Body & Prose**:
  - Font size: `15px` (`0.9375rem`) to `16px` (`1rem`), line height `1.65` for optimal readability in long academic policies and technical manuals.
- **Tabular Figures & Serials**:
  - Always apply `tabular-nums` (`font-variant-numeric: tabular-nums`) or `font-mono` to:
    - Equipment Serial Numbers (e.g., `SN-TK-88910`)
    - Barcodes / Pickup Tokens (`LOAN-2026-0819`)
    - Loan Dates & Countdown Timers (`02d : 14h : 22m`)
    - Metric Totals & Counts (`142`, `38`, `9`)

### Directional Mirroring (RTL / LTR)
- Use Tailwind logical properties exclusively:
  - `start-0` / `end-0` instead of `left-0` / `right-0`
  - `ms-auto` / `me-3` instead of `ml-auto` / `mr-3`
  - `ps-4` / `pe-4` instead of `pl-4` / `pr-4`
  - `border-s` / `border-e` instead of `border-l` / `border-r`
- Direction container on `<html>`: `<html dir="rtl" lang="ar">` with client-side direction toggle.

---

## 4. Shared Component Specifications

### 4.1 Buttons (`src/components/ui/Button.tsx`)
- **Primary**: Background `#00236f`, hover `#001a54`, text `#ffffff`, radius `rounded` (4px), focus outline `2px solid #0284c7`.
- **Secondary**: Background `#ffffff`, border `1px solid #cbd5e1`, hover `#f1f5f9`, text `#00236f`.
- **Accent (Action)**: Background `#0284c7`, hover `#0369a1`, text `#ffffff`.
- **Destructive**: Background `#dc2626`, hover `#b91c1c`, text `#ffffff`.
- **Ghost**: Background transparent, hover `#f1f5f9`, text `#0284c7`.
- **Single-line rule**: All button text must be `whitespace-nowrap shrink-0`.

### 4.2 Form Controls (`src/components/ui/Input.tsx`, `Select.tsx`, `Textarea.tsx`)
- Height `2.5rem` (`40px`), padding `px-3`, background `#ffffff`, border `1px solid #cbd5e1`, text `#191c1e`, placeholder `#94a3b8`, radius `rounded` (4px).
- Focus state: `border-[#0284c7] ring-1 ring-[#0284c7] outline-none`.
- Error state: `border-[#dc2626] ring-1 ring-[#dc2626]` with inline error message below.

### 4.3 Academic Card (`src/components/ui/Card.tsx`)
- Background `#ffffff`, border `1px solid #cbd5e1`, radius `rounded-lg` (8px), shadow `shadow-card`.
- Padding: Outer padding `p-5` or `p-6` ($\ge 16\text{px}$).
- Header: Subtle horizontal divider `border-b border-slate-100 pb-3 mb-4`.
- Zero-Pill Rule: Card metadata rendered as unboxed typography (`معمل الإلكترونيات · متوفر 3 أجهزة · أقصى مدة 7 أيام`).

### 4.4 Data Table (`src/components/ui/DataTable.tsx`)
- Sticky header with background `#f8fafc` and border `#cbd5e1`.
- Row height: Compact `40px`–`48px`.
- Alternating zebra stripes: `even:bg-[#f8fafc]/60`.
- Hover state: `hover:bg-slate-50 transition-colors`.
- Numeric & status columns right-aligned (in RTL) with `tabular-nums`.

### 4.5 Modals & Drawers (`src/components/ui/Modal.tsx`, `Drawer.tsx`)
- Backdrop: `bg-slate-900/50 backdrop-blur-sm`.
- Container: Background `#ffffff`, border `1px solid #cbd5e1`, radius `rounded-xl` (12px), shadow `shadow-modal`.
- Header with title, subtitle, and accessible close button.
- Focus trap and Escape key listener.

### 4.6 Status Indicator Chips (`src/components/ui/StatusBadge.tsx`)
- Reserved for functional status indication only:
  - **Available / Approved**: Background `#dcfce7`, text `#166534`, border `#bbf7d0`.
  - **Pending Review / Reserved**: Background `#fef3c7`, text `#b45309`, border `#fde68a`.
  - **Overdue / Damaged**: Background `#fee2e2`, text `#991b1b`, border `#fecaca`.
  - **In Possession (Active Loan)**: Background `#e0f2fe`, text `#0369a1`, border `#bae6fd`.
- Rendered with single-line label + small status dot.
