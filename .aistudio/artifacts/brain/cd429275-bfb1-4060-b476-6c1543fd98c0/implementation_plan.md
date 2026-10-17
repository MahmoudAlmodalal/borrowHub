# BorrowHub (استعارة) — Next.js Frontend Architecture & Stitch Implementation Plan

A comprehensive, production-grade implementation blueprint for converting the entire Google Stitch design system for **BorrowHub** into a modern **Next.js App Router** application with native Arabic RTL support, Academic Focus design tokens, and stateful cross-screen continuity.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The architectural direction has been aligned based on confirmed project choices:
> - **Framework & Rendering**: Next.js App Router utilizing React Server Components for initial shell/metadata and Client Components for interactive forms, search filters, and modal workflows.
> - **Locale & Typography**: Native Arabic RTL (`dir="rtl"`) pairing `IBM Plex Sans Arabic` with `Inter`, with toggleable English LTR support.
> - **State & Persistence**: Centralized typed state store (`localStorage`) simulating a real-time university database without external backend dependencies, ensuring student requests, admin approvals, counter dispatches, and inventory counts stay synchronized across screens.

---

## 1. Overview & Core Concept

**BorrowHub (استعارة)** is a university laboratory equipment borrowing, asset tracking, and service desk platform. It digitizes the academic borrowing lifecycle across three distinct stakeholder environments:
1. **Student Self-Service Portal**: Equipment discovery, detailed technical review, loan reservations for academic projects, active loan due-date tracking, and pickup barcode generation.
2. **Laboratory Administration Desks**: Student account verification from SIS records, academic project review queue, overdue loan escalations, and master equipment inventory management.
3. **Physical Counter Service Desks**: Real-time barcode dispatching, accessory handover audits, technical inspection sheets, and clearance certificate issuance.

---

## 2. User Experience & Visual Design

### Design System: Modern Academic Clarity
Adhering to `academic_focus/DESIGN.md`, the platform balances institutional gravitas with digital precision:
- **Color Palette (60-30-10 Rule)**:
  - Dominant Canvas (60%): `#f7f9fb` (Paper Slate) reducing ocular fatigue during extended research sessions.
  - Structural Surfaces (30%): `#ffffff` (Crisp White) with 1px hairline borders (`#cbd5e1`).
  - Accent Budget (10%): `#00236f` (Deep Academic Navy) for primary branding, `#0284c7` (Electric Sky) for interactive links/focus states, and `#f59e0b` (Warm Amber) for alerts and pending statuses.
- **Typography & Formatting**:
  - Arabic Display & Body: `IBM Plex Sans Arabic` (weights 400, 600, 700) with `letter-spacing: 0` to preserve cursive ligatures and line-height $\ge 1.6$.
  - Latin Display & Body: `Inter` (weights 400, 600, 700) with tight tracking on headings.
  - Tabular Numerals: `font-mono tabular-nums` for all asset codes, serials, countdown timers, and dates.
- **Anti-Slop Discipline**:
  - Zero-pill metadata: informational tags use clean unboxed text with `·` separators.
  - Single-elevation card geometry: no nested cards within cards.
  - Single-line controls: button and nav labels use `whitespace-nowrap shrink-0`.
  - Zero fake telemetry tickers or arbitrary AI scoreboards.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Next.js App Router with Route Groups**
  - *Chosen Approach*: Grouping routes into `(student)`, `(admin)`, `(counter)`, and `(auth)`.
  - *Why*: Allows specialized shared layouts (e.g. side rail for admin, station bar for counter desk, top nav for students) without URL nesting penalties.
- **Decision 2: Client-Side Typed Persistence Store**
  - *Chosen Approach*: Centralized reactive store initialized with realistic university mock records and persisted to browser `localStorage`.
  - *Why*: Delivers an end-to-end interactive demonstration where submitting a request in the catalog immediately appears in the supervisor review queue and counter desk without requiring an external database.
- **Decision 3: Global Interactive Screen Hub (`/`)**
  - *Chosen Approach*: Root landing page acting as both an institutional showcase and an evaluator launchpad with live stats, search, and embedded responsive sandbox preview.
  - *Why*: Enables instant testing of all 11 Stitch screens in desktop, tablet, and mobile viewport modes directly in preview.

---

## 4. Technical Architecture & System Flow

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                    Root Layout (`app/layout.tsx`)                            │
│           IBM Plex Sans Arabic + Inter · RTL Provider · Toast Provider       │
└──────────────────────────────────────┬───────────────────────────────────────┘
                                       │
     ┌─────────────────────────────────┼────────────────────────────────┐
     ▼                                 ▼                                ▼
┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐
│ Student Group `(student)`│  │ Admin Group `(admin)`   │  │ Counter Group `(counter)`│
│ Layout: Top Nav Bar     │  │ Layout: Side Rail Nav    │  │ Layout: Station Scanner │
├─────────────────────────┤  ├─────────────────────────┤  ├─────────────────────────┤
│ • /catalog (SCR-01)     │  │ • /admin/review (SCR-07) │  │ • /counter/pickups (SCR-08)
│ • /catalog/[id] (SCR-02)│  │ • /admin/verify (SCR-06) │  │ • /counter/returns (SCR-09)
│ • /student/loans (SCR-03)│ │ • /admin/inv (SCR-11)    │  └────────────┬────────────┘
└───────────┬─────────────┘  │ • /admin/overdue (SCR-10)│               │
            │                └────────────┬─────────────┘               │
            │                             │                             │
            ▼                             ▼                             ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│            Centralized Typed State Store (`src/lib/store.ts`)                │
│    • Equipment Catalog  • Loan Records Queue  • Student Verification Registry │
│    • LocalStorage Sync  • Reactive Event Dispatchers                          │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Complete Screen-to-Route Mapping

| Screen ID | Stitch Screen Name | Next.js App Router Route | Layout Group | Role |
|:---|:---|:---|:---:|:---:|
| **SCR-01** | `borrowhub_equipment_catalog` | `/catalog` | `(student)` | Student |
| **SCR-02** | `borrowhub_equipment_details_page` | `/catalog/[id]` | `(student)` | Student |
| **SCR-03** | `borrowhub_student_loans_portal` | `/student/loans` | `(student)` | Student |
| **SCR-04** | `borrowhub_sign_in` | `/auth/signin` | `(auth)` | Public / Auth |
| **SCR-05** | `borrowhub_student_registration` | `/auth/register` | `(auth)` | Student |
| **SCR-06** | `borrowhub_student_account_verification` | `/admin/verification` | `(admin)` | Admin Desk |
| **SCR-07** | `borrowhub_admin_requests_review_queue` | `/admin/review` | `(admin)` | Supervisor |
| **SCR-08** | `borrowhub_approved_pickups_counter` | `/counter/pickups` | `(counter)` | Desk Tech |
| **SCR-09** | `borrowhub_returns_inspection_counter` | `/counter/returns` | `(counter)` | Inspection Tech |
| **SCR-10** | `borrowhub_overdue_loans_dashboard` | `/admin/overdue` | `(admin)` | Administration |
| **SCR-11** | `borrowhub_inventory_management` | `/admin/inventory` | `(admin)` | Asset Manager |
| **HUB** | Global Launcher & Interactive Sandbox | `/` | Root | All Users |

---

## 5. Execution Roadmap & Tasks Summary

The implementation is broken into 9 sequential, independently verifiable phases:
- **Phase 1: Foundation & Tokens** (`TASK-01-01` to `TASK-01-03`): Next.js App Router, Tailwind configuration, Arabic fonts, and TypeScript domain models.
- **Phase 2: Core Primitives & Layouts** (`TASK-02-01` to `TASK-02-04`): Shared buttons, inputs, modals, brand logo, and persistent state store.
- **Phase 3: Student Experience** (`TASK-03-01` to `TASK-03-03`): Catalog, Technical Specs, Booking Drawer, and Student Loans Portal.
- **Phase 4: Authentication** (`TASK-04-01` to `TASK-04-02`): SSO Login with role switcher and 3-step student onboarding wizard.
- **Phase 5: Laboratory Administration** (`TASK-05-01` to `TASK-05-02`): Account verification desk and supervisor review queue.
- **Phase 6: Counter Service Desks** (`TASK-06-01` to `TASK-06-02`): Barcode pickup dispatch and technical return inspection.
- **Phase 7: Governance & Inventory** (`TASK-07-01` to `TASK-07-02`): Overdue escalation tiers and master laboratory inventory.
- **Phase 8: Global Navigation Hub** (`TASK-08-01`): Interactive root showcase linking all screens with embedded responsive preview.
- **Phase 9: QA & Verification** (`TASK-09-01` to `TASK-09-02`): Responsive audit, WCAG AA contrast check, and production compilation.

Detailed task specifications are archived in `docs/FRONTEND_TASKS.md`.
