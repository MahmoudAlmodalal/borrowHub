# 07. FRONTEND QUALITY ASSURANCE & FIDELITY CHECKLIST

This document provides the definitive verification checklist for certifying the implementation of the BorrowHub Next.js application against the approved Stitch designs.

---

## 1. Route Navigation & Compilation Verification

| Check Item | Acceptance Standard | Method | Status |
|:---|:---|:---:|:---:|
| **App Build** | `npm run build` succeeds with zero errors | `compile_applet` | [ ] |
| **TypeScript Validation** | `npx tsc --noEmit` exits with 0 warnings | Terminal | [ ] |
| **ESLint Validation** | `npm run lint` passes with no rule breaks | `lint_applet` | [ ] |
| **Port & Host** | Server listens on `0.0.0.0:3000` | Dev Server | [ ] |
| **Root Hub Route (`/`)** | Loads landing portal and screen directory | HTTP 200 | [ ] |
| **Catalog Route (`/catalog`)** | Loads SCR-01 equipment catalog | HTTP 200 | [ ] |
| **Detail Route (`/catalog/[id]`)** | Loads SCR-02 technical specifications | HTTP 200 | [ ] |
| **Student Loans (`/student/loans`)** | Loads SCR-03 student dashboard | HTTP 200 | [ ] |
| **Sign-In (`/auth/signin`)** | Loads SCR-04 credentials form | HTTP 200 | [ ] |
| **Register (`/auth/register`)** | Loads SCR-05 onboarding wizard | HTTP 200 | [ ] |
| **Verification (`/admin/verification`)** | Loads SCR-06 student verification desk | HTTP 200 | [ ] |
| **Review Queue (`/admin/review`)** | Loads SCR-07 supervisor queue | HTTP 200 | [ ] |
| **Pickups Desk (`/counter/pickups`)** | Loads SCR-08 dispatch counter | HTTP 200 | [ ] |
| **Returns Desk (`/counter/returns`)** | Loads SCR-09 inspection counter | HTTP 200 | [ ] |
| **Overdue Dashboard (`/admin/overdue`)** | Loads SCR-10 escalations dashboard | HTTP 200 | [ ] |
| **Inventory (`/admin/inventory`)** | Loads SCR-11 asset management table | HTTP 200 | [ ] |

---

## 2. Design Fidelity & Visual Token Checks

### A. Color Discipline (Academic Focus Palette)
- [ ] Primary Deep Navy (`#00236f`) applied to top headers, key branding, and primary CTAs.
- [ ] Academic Indigo (`#1e3a8a`) applied to secondary headers and active accents.
- [ ] Electric Sky (`#0284c7`) applied to interactive links, active tabs, and focus rings.
- [ ] Warm Amber (`#f59e0b`) reserved strictly for alerts, pending states, and focal nodes.
- [ ] Paper Slate Canvas (`#f7f9fb`) applied as background to prevent reading fatigue.
- [ ] Crisp White (`#ffffff`) applied to active content cards with 1px border (`#cbd5e1`).
- [ ] 60-30-10 Rule: 60% neutral canvas, 30% white structural cards, 10% high-intent color accents.

### B. Typography & Font Hierarchy
- [ ] Arabic text renders in `IBM Plex Sans Arabic` with natural cursive ligatures (`letter-spacing: 0`).
- [ ] Latin text renders in `Inter` with tight tracking (`tracking-tight` on headings).
- [ ] Tabular Numerals: All serials, barcodes, dates, and metrics enforce `tabular-nums` or `font-mono`.
- [ ] No orphan words on display headlines (`text-wrap: balance` or `max-w-2xl`).
- [ ] Line height $\ge 1.6$ on Arabic prose to accommodate tall ascenders and descenders.

### C. Anti-Slop & Restraint Governance
- [ ] **Zero Pill Sandwiches**: No static metadata wrapped in rounded capsule badges. Metadata uses clean unboxed text with `·` or `/` separators.
- [ ] **No Code Comments**: No headings starting with `//`, `/*`, or `>_`.
- [ ] **No Fake Telemetry**: No pulsing green dots (`animate-pulse`) or fake latency tickers.
- [ ] **No Thick Left Borders**: No `border-l-4` asymmetric stripes on cards.
- [ ] **Single-Elevation Depth**: Clean 1px solid hairline borders; no nested cards within cards.
- [ ] **Single-Line Controls**: All button labels and nav links use `whitespace-nowrap shrink-0`.

---

## 3. Responsive & Device Integrity Checks

- [ ] **Desktop (1440px)**:
  - Max-width container $1280\text{px}$–$1440\text{px}$ centered with 2rem margins.
  - Multi-column grids (3 columns for catalog, 2 columns for detail split).
  - Top navigation bar conforms strictly to the 3-zone contract.
- [ ] **Tablet (768px – 1024px)**:
  - Side-by-side research panes transition into stacked or tabbed views.
  - 2-column card matrix.
- [ ] **Mobile (375px – 420px)**:
  - Single-column stacked layouts with fluid padding (`1rem`).
  - Persistent sticky top bars capped at $\le 15\%$ of mobile viewport height.
  - Touch targets $\ge 44\text{px}$ on all buttons, select inputs, and toggles.
  - Zero horizontal page overflow or clipping.

---

## 4. Cross-Screen State & Continuity Checks

- [ ] **Student Flow Continuity**: Submitting a borrow request in SCR-02 creates a new loan record in `pending_approval` state.
- [ ] **Admin Queue Sync**: The newly submitted request immediately appears in the SCR-07 supervisor review queue.
- [ ] **Approval Transition**: Approving the request in SCR-07 moves it to `approved_ready_for_pickup`.
- [ ] **Counter Handover**: In SCR-08, searching by the student's ID or pickup barcode displays the approved ticket. Completing the handover checklist dispatches the hardware.
- [ ] **Student Portal Update**: In SCR-03, the student's personal portal now displays the equipment under "العهد الحالية" (Active Loans) with an active countdown timer.
- [ ] **Inventory Count Sync**: In SCR-11, the available inventory count for that equipment model decrements by 1.
- [ ] **Return & Clearance**: Conducting the return inspection in SCR-09 clears the loan and restores available inventory.
- [ ] **LocalStorage Persistence**: Refreshing the browser or navigating between routes preserves all modified states.

---

## 5. Accessibility Checks (WCAG 2.1 AA)

- [ ] Text contrast meets minimum $4.5:1$ against backgrounds.
- [ ] Visible focus rings on all interactive elements (`focus-visible:ring-2 focus-visible:ring-[#0284c7]`).
- [ ] All icon-only buttons include descriptive `aria-label` attributes.
- [ ] Modals and drawers feature focus trap and close upon pressing ESC.
- [ ] Screen reader tags identify tab lists, roles, and status changes.
- [ ] `prefers-reduced-motion` respected (animations disable or simplify).
