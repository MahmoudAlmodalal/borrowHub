# 04. FRONTEND IMPLEMENTATION ROADMAP: BorrowHub Next.js

This document defines the multi-phase implementation roadmap for building the complete BorrowHub frontend in Next.js, covering all 11 Stitch screens, shared layouts, typed state persistence, and responsive fidelity.

---

## Roadmap Overview

```
Phase 1: Project Setup, Fonts & Design System Tokens
   │
   ▼
Phase 2: Core Primitives, Brand Layouts & Global Navigation Hub
   │
   ▼
Phase 3: Student Flow (Catalog, Equipment Details & Loans Portal)
   │
   ▼
Phase 4: Authentication Flow (Academic Sign-In & Student Registration)
   │
   ▼
Phase 5: Laboratory Administration (Account Verification & Review Queue)
   │
   ▼
Phase 6: Counter Desk (Approved Pickups & Returns Inspection)
   │
   ▼
Phase 7: Inventory & Governance (Overdue Escalations & Master Inventory)
   │
   ▼
Phase 8: State Store & Cross-Screen Interactive Continuity
   │
   ▼
Phase 9: Comprehensive QA, Bidirectional Audit & Verification
```

---

## Phase Breakdown & Milestone Criteria

### Phase 1: Foundation, Dependencies & Token System
- **Scope**: Configure Next.js App Router, install essential dependencies (`lucide-react` or Material Symbols integration, `@tailwindcss/forms`, `@tailwindcss/container-queries`), configure fonts (`IBM Plex Sans Arabic`, `Inter`), and declare theme tokens in `tailwind.config.ts`.
- **Key Deliverables**:
  - `tailwind.config.ts` with Academic Focus color tokens (`#00236f`, `#1e3a8a`, `#0284c7`, `#f59e0b`, `#f7f9fb`).
  - `src/styles/globals.css` with font imports, base typography styles, and scrollbar rules.
  - `src/lib/types.ts` containing all TypeScript interfaces for equipment, loans, students, and inspections.
- **Completion Criteria**: App compiles cleanly; custom color classes and font families render as expected.

---

### Phase 2: Shared Component Library & Global Hub
- **Scope**: Build the reusable Atomic UI primitives and the root portal landing page.
- **Key Deliverables**:
  - `src/components/ui/`: `Button`, `Input`, `Select`, `Card`, `Badge`, `Modal`, `Drawer`, `DataTable`, `Tabs`.
  - `src/components/common/`: `BrandLogo` (vector SVG 3D cube), `Header`, `Sidebar`, `QuickNavSwitcher`, `LanguageToggle`.
  - `src/app/page.tsx`: Global interactive hub and screen launcher with embedded preview and live stats ribbon.
- **Completion Criteria**: All UI primitives render with correct hover/focus states, zero-pill metadata formatting, and full RTL compatibility.

---

### Phase 3: Student Experience Module
- **Scope**: Implement the end-to-end student equipment discovery, technical review, and loan management journey.
- **Screens Covered**:
  - **SCR-01**: Academic Equipment Catalog (`src/app/(student)/catalog/page.tsx`)
  - **SCR-02**: Equipment Technical Details & Booking (`src/app/(student)/catalog/[id]/page.tsx`)
  - **SCR-03**: Student Loans & Requests Portal (`src/app/(student)/loans/page.tsx`)
- **Key Deliverables**:
  - Multi-facet search and filter bar (department, stock availability, duration).
  - High-density responsive equipment card grid.
  - Two-column technical specification view with interactive booking rail.
  - Student loans portal with active loan count-downs, barcode modals, and loan extension triggers.
- **Completion Criteria**: Students can browse 12+ items, view specs, submit a borrow request, and view the active ticket in their personal portal.

---

### Phase 4: Authentication & Onboarding Module
- **Scope**: Build academic authentication, Single Sign-On, and student account registration.
- **Screens Covered**:
  - **SCR-04**: Academic Sign-In & SSO (`src/app/(auth)/signin/page.tsx`)
  - **SCR-05**: Student Account Registration (`src/app/(auth)/register/page.tsx`)
- **Key Deliverables**:
  - Split-screen academic brand showcase with university credentials form.
  - Role switcher shortcuts for evaluation (Student / Desk Tech / Supervisor).
  - 3-step student onboarding wizard with university ID upload preview and academic agreement checkbox.
- **Completion Criteria**: Users can log in via demo credentials or submit an onboarding registration that generates a tracking reference number.

---

### Phase 5: Laboratory Administration & Review Module
- **Scope**: Administrative desks for verifying students and approving borrowing requests.
- **Screens Covered**:
  - **SCR-06**: Student Account Verification Desk (`src/app/(admin)/verification/page.tsx`)
  - **SCR-07**: Loan Requests Review Queue (`src/app/(admin)/review/page.tsx`)
- **Key Deliverables**:
  - Master-detail split layout for reviewing student cards side-by-side with SIS records.
  - Approval and rejection workflows with canned academic feedback.
  - High-density request queue with batch approval actions and project evaluation modals.
- **Completion Criteria**: Staff can approve/reject student registrations and review/approve equipment loan requests with instant toast feedback.

---

### Phase 6: Physical Counter Service Desk Module
- **Scope**: Physical laboratory dispatch and return counter screens for desk technicians.
- **Screens Covered**:
  - **SCR-08**: Approved Pickups Counter Desk (`src/app/(counter)/pickups/page.tsx`)
  - **SCR-09**: Returns & Technical Inspection Counter (`src/app/(counter)/returns/page.tsx`)
- **Key Deliverables**:
  - Fast barcode/student ID lookup with simulated scanner input.
  - Dispatch checklist requiring hardware serial assignment and mandatory cable/accessory verification.
  - Comprehensive return inspection sheet: functional check, cosmetic grade (A–F), damage photo upload, and student clearance sign-off.
- **Completion Criteria**: Handover ticket transitions to "In Possession" upon dispatch, and clearance certificate generates upon return.

---

### Phase 7: Inventory Governance & Risk Management Module
- **Scope**: Overdue loan escalations and master laboratory asset inventory.
- **Screens Covered**:
  - **SCR-10**: Overdue Loans & Escalations Dashboard (`src/app/(admin)/overdue/page.tsx`)
  - **SCR-11**: Inventory & Asset Management (`src/app/(admin)/inventory/page.tsx`)
- **Key Deliverables**:
  - Overdue severity tier breakdown (Warning -> Restrictions -> Academic Hold).
  - Multi-channel notification modal (SMS/Email logs) and academic hold confirmation dialog.
  - Master asset data table with live filters, stock counters, and "Add New Equipment" modal drawer.
- **Completion Criteria**: Administrators can trigger overdue notices, filter by risk level, add new equipment to stock, and update unit maintenance status.

---

### Phase 8: Centralized State Store & Interactive Continuity
- **Scope**: Wire all screens to the centralized typed state store (`src/lib/store.ts`).
- **Key Deliverables**:
  - Full synchronization between student requests, admin approvals, counter dispatches, and inventory counts.
  - LocalStorage persistence preserving changes across page reloads and route navigation.
  - Reset Demo State utility button in global footer/quicknav.
- **Completion Criteria**: Submitting a request in SCR-02 immediately appears in SCR-07 review queue; approving it makes it ready for pickup in SCR-08; dispatching it updates SCR-03 student portal and decrements inventory in SCR-11.

---

### Phase 9: Quality Assurance & Bidirectional Audit
- **Scope**: Cross-browser responsive testing, RTL/LTR layout verification, accessibility audit, and build compilation.
- **Key Deliverables**:
  - Responsive audit across 1440px desktop, 768px tablet, and 390px mobile viewports.
  - Zero layout overflows, clipped buttons, or two-line navigation wrapping.
  - Run `compile_applet` and `lint_applet` with zero build or typing errors.
- **Completion Criteria**: Production build succeeds; visual comparison against original Stitch designs verifies fidelity.
