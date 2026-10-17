# 05. ORDERED IMPLEMENTATION TASKS: BorrowHub Next.js

This document specifies the complete, ordered, independently verifiable task breakdown for executing the BorrowHub Next.js project. Each task is self-contained and formatted for direct execution by an AI Coding Agent.

---

## Phase 1: Foundation & Design Tokens

### TASK-01-01: Next.js App Router Architecture & Tailwind Setup
- **Objective**: Configure Next.js project scaffolding, TypeScript strict settings, and Tailwind CSS plugins.
- **Scope**: Initialize package dependencies, `tsconfig.json`, `next.config.mjs`, and Tailwind CSS configuration.
- **Relevant Screens**: Global foundation (all screens).
- **Files to Modify/Create**: `package.json`, `tailwind.config.ts`, `postcss.config.js`, `tsconfig.json`.
- **Dependencies**: None.
- **Implementation Steps**:
  1. Add Next.js, React, React-DOM, TypeScript, `@types/react`, `@types/node` to `package.json`.
  2. Configure `tailwind.config.ts` with color tokens (`#00236f`, `#1e3a8a`, `#0284c7`, `#f59e0b`, `#f7f9fb`), font families (`IBM Plex Sans Arabic`, `Inter`), and custom shadow tiers.
  3. Ensure `"scripts": { "dev": "next dev -p 3000 -H 0.0.0.0", "build": "next build" }`.
- **Expected Result**: Next.js app boots cleanly on port 3000.
- **Acceptance Criteria**: Running `npm run build` succeeds without configuration errors.
- **Verification Method**: `compile_applet`.
- **Priority**: Critical (P0).

---

### TASK-01-02: Global Styles, Arabic Typography & Theme Tokens
- **Objective**: Implement the font loader, RTL root HTML structure, and baseline typography styles.
- **Scope**: Create `src/styles/globals.css` and configure Google Fonts for `IBM Plex Sans Arabic` and `Inter`.
- **Relevant Screens**: Global foundation.
- **Files to Create**: `src/styles/globals.css`, `src/app/layout.tsx`.
- **Dependencies**: `TASK-01-01`.
- **Implementation Steps**:
  1. Import `@import "tailwindcss";` or standard Tailwind directives.
  2. Configure `<html dir="rtl" lang="ar">` with CSS variables for primary and surface colors.
  3. Set base body styles: background `#f7f9fb`, text `#191c1e`, smooth font rendering.
- **Expected Result**: Arabic text renders with correct cursive ligatures and proper line height.
- **Acceptance Criteria**: Text renders with zero horizontal overflow; font weights 400, 600, 700 are distinct.
- **Verification Method**: Browser inspection and dev server test.
- **Priority**: P0.

---

### TASK-01-03: TypeScript Domain Interfaces & Seed Fixtures
- **Objective**: Declare complete TypeScript interfaces and mock datasets for laboratory equipment, loans, and users.
- **Scope**: Create `src/lib/types.ts` and `src/lib/mockData.ts`.
- **Relevant Screens**: All screens.
- **Files to Create**: `src/lib/types.ts`, `src/lib/mockData.ts`.
- **Dependencies**: `TASK-01-01`.
- **Implementation Steps**:
  1. Define types: `Equipment`, `LoanRecord`, `StudentAccount`, `ReturnInspection`, `OverdueIncident`.
  2. Populate `mockData.ts` with 14 real laboratory items (oscilloscopes, 3D printers, spectrum analyzers, drone kits, cameras), 6 loan requests across different statuses, 4 student accounts, and 3 overdue cases.
- **Expected Result**: Type-safe domain models ready for component consumption.
- **Acceptance Criteria**: TypeScript compiles with zero errors under `strict: true`.
- **Verification Method**: `npx tsc --noEmit`.
- **Priority**: P0.

---

## Phase 2: Shared UI Primitives & Global Layouts

### TASK-02-01: Atomic Button, Input & Select Components
- **Objective**: Build core form controls strictly following Academic Focus styling.
- **Scope**: Reusable Button, TextInput, SelectDropdown, Textarea, and Checkbox primitives.
- **Relevant Screens**: All screens.
- **Files to Create**: `src/components/ui/Button.tsx`, `src/components/ui/Input.tsx`, `src/components/ui/Select.tsx`, `src/components/ui/Checkbox.tsx`.
- **Dependencies**: `TASK-01-02`.
- **Implementation Steps**:
  1. Implement `Button` with variants: `primary`, `secondary`, `accent`, `destructive`, `ghost`.
  2. Enforce `whitespace-nowrap shrink-0` and 4px radius (`rounded`).
  3. Implement `Input` with 40px height, 1px border `#cbd5e1`, focus ring `#0284c7`.
- **Expected Result**: Accessible, keyboard-navigable form primitives.
- **Acceptance Criteria**: Form controls support disabled, error, and focused states; 44px touch target on mobile.
- **Verification Method**: Component test render.
- **Priority**: P0.

---

### TASK-02-02: Modal, Drawer & StatusBadge Components
- **Objective**: Build overlay containers and functional status indicators.
- **Scope**: Accessible modal dialog, side drawer, and color-coded status badge.
- **Relevant Screens**: SCR-02, SCR-03, SCR-06, SCR-07, SCR-08, SCR-09, SCR-11.
- **Files to Create**: `src/components/ui/Modal.tsx`, `src/components/ui/Drawer.tsx`, `src/components/ui/StatusBadge.tsx`.
- **Dependencies**: `TASK-02-01`.
- **Implementation Steps**:
  1. Build `Modal` with backdrop blur, smooth scale transition, and focus trap.
  2. Build `Drawer` sliding in from start/end.
  3. Build `StatusBadge` for statuses: `available`, `pending`, `active`, `overdue`, `cleared`.
- **Expected Result**: Modals open/close smoothly without body scroll leaks.
- **Acceptance Criteria**: Pressing ESC closes the modal; badges follow unboxed or subtle border styling.
- **Verification Method**: Interactive verification.
- **Priority**: P1.

---

### TASK-02-03: Brand Logo & Navigation Shells (Student, Admin, Desk)
- **Objective**: Build the vector brand lockup and shared layout headers.
- **Scope**: `BrandLogo.tsx`, `Header.tsx`, `AdminSidebar.tsx`, `QuickNavSwitcher.tsx`.
- **Relevant Screens**: All screens.
- **Files to Create**: `src/components/common/BrandLogo.tsx`, `src/components/common/Header.tsx`, `src/components/common/Sidebar.tsx`, `src/components/common/QuickNav.tsx`.
- **Dependencies**: `TASK-02-01`.
- **Implementation Steps**:
  1. Recreate the BorrowHub 3D cube SVG lockup in vector format with bilingual text.
  2. Build top navigation conforming to the 3-zone contract (Brand mark — 4 clean links — 1 primary action).
  3. Build collapsible admin sidebar with active link highlights.
- **Expected Result**: Consistent branded header across desktop and mobile.
- **Acceptance Criteria**: Header height $\le 64\text{px}$, responsive mobile hamburger menu.
- **Verification Method**: Visual inspection across viewports.
- **Priority**: P1.

---

### TASK-02-04: Centralized State Store with LocalStorage Persistence
- **Objective**: Implement client-side reactive store for cross-screen data sharing.
- **Scope**: Create `src/lib/store.ts` managing equipment stock, loans, verification, and inspection records.
- **Relevant Screens**: All screens.
- **Files to Create**: `src/lib/store.ts`.
- **Dependencies**: `TASK-01-03`.
- **Implementation Steps**:
  1. Initialize state from `mockData.ts` or `localStorage`.
  2. Implement mutations: `createLoanRequest`, `approveLoan`, `rejectLoan`, `dispatchPickup`, `completeInspection`, `verifyStudent`.
  3. Export custom React hook `useBorrowHubStore()`.
- **Expected Result**: State updates survive browser refresh and route navigation.
- **Acceptance Criteria**: Dispatching a loan immediately decrements available equipment quantity.
- **Verification Method**: State mutation unit check.
- **Priority**: P0.

---

## Phase 3: Student Experience Screens

### TASK-03-01: Academic Equipment Catalog (SCR-01)
- **Objective**: Implement the equipment discovery marketplace with live category and stock filtering.
- **Scope**: Catalog page layout, category filter bar, search input, and responsive card grid.
- **Relevant Screens**: `borrowhub_equipment_catalog/` (SCR-01).
- **Files to Create**: `src/app/(student)/catalog/page.tsx`, `src/components/catalog/EquipmentCard.tsx`, `src/components/catalog/CatalogFilters.tsx`.
- **Dependencies**: `TASK-02-01`, `TASK-02-04`.
- **Implementation Steps**:
  1. Render sticky search and category filter strip (Computing, Robotics, Electronics, Media).
  2. Build `EquipmentCard` with model image, lab location, availability status, and duration chip.
  3. Wire search input to filter items in real time.
- **Expected Result**: Responsive 3-column grid displaying all laboratory items with instant filtering.
- **Acceptance Criteria**: Empty search displays friendly academic fallback; cards link to `/catalog/[id]`.
- **Verification Method**: Interactive filter test.
- **Priority**: P1.

---

### TASK-03-02: Equipment Technical Details & Booking Drawer (SCR-02)
- **Objective**: Implement the technical specification sheet, accessory inventory, and loan reservation modal.
- **Scope**: Two-column detail page, image gallery, specs table, and booking submission flow.
- **Relevant Screens**: `borrowhub_equipment_details_page/` (SCR-02).
- **Files to Create**: `src/app/(student)/catalog/[id]/page.tsx`, `src/components/catalog/SpecTable.tsx`, `src/components/catalog/BookingDrawer.tsx`.
- **Dependencies**: `TASK-03-01`.
- **Implementation Steps**:
  1. Display high-res photo gallery with thumbnail switcher.
  2. Render technical specifications table with alternating zebra rows.
  3. Render checklist of included accessories and lab safety precautions.
  4. Build booking drawer with date picker, project title input, supervisor email, and submit button.
- **Expected Result**: Submitting reservation adds request to state store and generates pickup reference code.
- **Acceptance Criteria**: Date picker validates maximum allowed days; confirmation toast triggers on submit.
- **Verification Method**: Form submission test.
- **Priority**: P1.

---

### TASK-03-03: Student Loans & Requests Portal (SCR-03)
- **Objective**: Build the student personal dashboard for active loans, ready pickups, and history.
- **Scope**: Metric summary ribbon, active loan cards, pickup barcode generator, and extension modal.
- **Relevant Screens**: `borrowhub_student_loans_portal/` (SCR-03).
- **Files to Create**: `src/app/(student)/loans/page.tsx`, `src/components/loans/LoanCard.tsx`, `src/components/loans/PickupBarcodeModal.tsx`, `src/components/loans/ExtensionModal.tsx`.
- **Dependencies**: `TASK-03-02`.
- **Implementation Steps**:
  1. Display metrics: Active Loans (3), Ready for Pickup (1), Returned (14), Overdue (0).
  2. Render active loan cards with remaining countdown timer (`tabular-nums`).
  3. Build modal displaying pickup barcode token (`LOAN-XXXX`) for scanning at counter desk.
  4. Build loan extension request dialog.
- **Expected Result**: Complete self-service portal for student equipment management.
- **Acceptance Criteria**: Countdown timer updates; barcode modal renders clearly.
- **Verification Method**: Interactive UI test.
- **Priority**: P1.

---

## Phase 4: Authentication & Onboarding Screens

### TASK-04-01: Academic Sign-In & Demo Switcher (SCR-04)
- **Objective**: Implement university credentials login with fast-track role switcher.
- **Scope**: Two-column authentication layout, credentials form, and demo role buttons.
- **Relevant Screens**: `borrowhub_sign_in/` (SCR-04).
- **Files to Create**: `src/app/(auth)/signin/page.tsx`, `src/components/auth/AuthSplitLayout.tsx`.
- **Dependencies**: `TASK-02-01`.
- **Implementation Steps**:
  1. Build brand showcase column with 3D cube illustration, security badges, and university notice.
  2. Build login form with student ID / email and password fields.
  3. Add 3 demo role shortcut buttons: "دخول كطالب" -> `/student/loans`, "دخول كمشرف معمل" -> `/admin/review`, "دخول كفني شباك" -> `/counter/pickups`.
- **Expected Result**: Functional authentication portal with instant role navigation for evaluators.
- **Acceptance Criteria**: Form validates required fields; demo buttons redirect to respective portals.
- **Verification Method**: Route transition test.
- **Priority**: P1.

---

### TASK-04-02: Student Account Registration Flow (SCR-05)
- **Objective**: Build multi-step student onboarding wizard with student card upload preview.
- **Scope**: 3-step registration wizard, file upload simulation, and academic charter checkbox.
- **Relevant Screens**: `borrowhub_student_registration/` (SCR-05).
- **Files to Create**: `src/app/(auth)/register/page.tsx`, `src/components/auth/RegistrationWizard.tsx`.
- **Dependencies**: `TASK-04-01`.
- **Implementation Steps**:
  1. Implement Step 1: Personal & Academic Info (Name, Student ID, College, Major).
  2. Implement Step 2: Student Card Upload (Drag-and-drop preview with placeholder card).
  3. Implement Step 3: Liability Terms & Final Submit.
  4. Append submitted account to verification queue in state store.
- **Expected Result**: Registration completes and redirects to confirmation with reference number.
- **Acceptance Criteria**: Validation blocks next step if required fields are missing; submission updates store.
- **Verification Method**: Wizard step progression test.
- **Priority**: P1.

---

## Phase 5: Laboratory Administration Desks

### TASK-05-01: Student Account Verification Desk (SCR-06)
- **Objective**: Implement master-detail split screen for reviewing student registrations.
- **Scope**: Queue sidebar, side-by-side student card inspector, approval and rejection actions.
- **Relevant Screens**: `borrowhub_student_account_verification/` (SCR-06).
- **Files to Create**: `src/app/(admin)/verification/page.tsx`, `src/components/admin/VerificationMasterDetail.tsx`.
- **Dependencies**: `TASK-04-02`.
- **Implementation Steps**:
  1. Render list of pending student accounts on the right pane.
  2. Render selected student's uploaded ID card with zoom controls and SIS matching data on the left.
  3. Wire "اعتماد وتفعيل الحساب" button to update account to `verified`.
  4. Wire "رفض الطلب" modal with reason dropdown.
- **Expected Result**: Immediate removal of verified student from queue and success notification.
- **Acceptance Criteria**: Approving student updates account status in store; rejection logs reason.
- **Verification Method**: Approval workflow test.
- **Priority**: P2.

---

### TASK-05-02: Loan Requests Review Queue (SCR-07)
- **Objective**: Build the supervisor queue for reviewing and approving borrowing applications.
- **Scope**: Data table of pending requests, priority filters, batch actions, and review modal.
- **Relevant Screens**: `borrowhub_admin_requests_review_queue/` (SCR-07).
- **Files to Create**: `src/app/(admin)/review/page.tsx`, `src/components/admin/ReviewQueueTable.tsx`, `src/components/admin/RequestDetailsModal.tsx`.
- **Dependencies**: `TASK-03-02`, `TASK-02-04`.
- **Implementation Steps**:
  1. Render high-density table: Request ID, Student Name, Equipment Name, Dates, Course Code, Actions.
  2. Implement Quick Approve button with single click confirmation.
  3. Build modal showing full request justification, project details, and student borrowing history.
- **Expected Result**: Approving request transitions status to `approved_ready_for_pickup`.
- **Acceptance Criteria**: Approved requests appear immediately in the Counter Pickups Desk (SCR-08).
- **Verification Method**: End-to-end state sync test.
- **Priority**: P2.

---

## Phase 6: Physical Counter Service Desks

### TASK-06-01: Approved Pickups Counter Desk (SCR-08)
- **Objective**: Build the physical dispatch counter interface for lab technicians.
- **Scope**: Barcode lookup bar, student identity verification, accessory checklist, and dispatch confirmation.
- **Relevant Screens**: `borrowhub_approved_pickups_counter/` (SCR-08).
- **Files to Create**: `src/app/(counter)/pickups/page.tsx`, `src/components/counter/PickupTicketCard.tsx`, `src/components/counter/AccessoryChecklist.tsx`.
- **Dependencies**: `TASK-05-02`.
- **Implementation Steps**:
  1. Build barcode input simulating hardware scanner for student ID or pickup token.
  2. Render verified pickup ticket: student photo, equipment serial assignment field.
  3. Render mandatory checklist of included accessories (power supply, probes, manuals).
  4. Wire "تأكيد التسليم" button to mark loan as `active_in_possession`.
- **Expected Result**: Dispatch updates loan record and decrements available inventory.
- **Acceptance Criteria**: Dispatch button is disabled until all required accessories are checked.
- **Verification Method**: Handover checklist validation test.
- **Priority**: P2.

---

### TASK-06-02: Returns & Technical Inspection Counter (SCR-09)
- **Objective**: Build the hardware return protocol, condition testing, and clearance screen.
- **Scope**: Return lookup, accessory audit checklist, condition rating (A–F), and digital clearance certificate.
- **Relevant Screens**: `borrowhub_returns_inspection_counter/` (SCR-09).
- **Files to Create**: `src/app/(counter)/returns/page.tsx`, `src/components/counter/ReturnInspectionSheet.tsx`, `src/components/counter/ClearanceCertificateModal.tsx`.
- **Dependencies**: `TASK-06-01`.
- **Implementation Steps**:
  1. Barcode scan input to look up active loans in student possession.
  2. Technical inspection workflow: functional tests, returned accessories checklist, cosmetic grade selector.
  3. Action "إبراء ذمة الطالب بالكامل" resets student liability and increments available inventory.
  4. Generate and display printable clearance certificate.
- **Expected Result**: Loan transitions to `returned_cleared`; equipment returns to active stock.
- **Acceptance Criteria**: Student account in SCR-03 reflects zero active liability after clearance.
- **Verification Method**: Return cycle verification test.
- **Priority**: P2.

---

## Phase 7: Inventory & Overdue Governance

### TASK-07-01: Overdue Loans & Escalations Dashboard (SCR-10)
- **Objective**: Build the incident monitoring panel for overdue hardware and academic holds.
- **Scope**: Severity tier cards (1–3 days, 4–7 days, >7 days), overdue ledger table, and reminder actions.
- **Relevant Screens**: `borrowhub_overdue_loans_dashboard/` (SCR-10).
- **Files to Create**: `src/app/(admin)/overdue/page.tsx`, `src/components/admin/OverdueSeverityBar.tsx`, `src/components/admin/OverdueIncidentTable.tsx`, `src/components/admin/EscalationModal.tsx`.
- **Dependencies**: `TASK-02-04`.
- **Implementation Steps**:
  1. Render severity metric cards with tabular counts.
  2. Render table with overdue days, student phone/email, and equipment value.
  3. Build modal for sending multi-channel reminder notices (SMS/Email) with canned academic warnings.
  4. Implement "Place Academic Hold" toggle with confirmation dialog.
- **Expected Result**: Complete governance tool for overdue loan risk management.
- **Acceptance Criteria**: Sending reminder appends to contact attempt log; hold toggle updates state.
- **Verification Method**: Escalation modal interaction test.
- **Priority**: P2.

---

### TASK-07-02: Master Inventory & Asset Management (SCR-11)
- **Objective**: Build the master laboratory asset inventory and new equipment creation modal.
- **Scope**: Master inventory table, search & department filters, serial tracking, and "Add Equipment" drawer.
- **Relevant Screens**: `borrowhub_inventory_management/` (SCR-11).
- **Files to Create**: `src/app/(admin)/inventory/page.tsx`, `src/components/admin/InventoryTable.tsx`, `src/components/admin/AddEquipmentDrawer.tsx`.
- **Dependencies**: `TASK-03-01`, `TASK-02-04`.
- **Implementation Steps**:
  1. Render inventory summary cards: Total Assets, In Circulation, In Storage, In Maintenance.
  2. Build data table with serial numbers, lab rooms, purchase years, and condition chips.
  3. Build "إضافة معدة جديدة" drawer with form fields for model, category, serial, and stock quantity.
  4. Submitting new equipment appends to master catalog in SCR-01.
- **Expected Result**: Administrators can manage and expand laboratory inventory.
- **Acceptance Criteria**: Newly added equipment immediately appears in the student catalog.
- **Verification Method**: Inventory creation and catalog sync test.
- **Priority**: P2.

---

## Phase 8: Global Navigation Hub & Continuity

### TASK-08-01: Interactive Screen Launcher & Global Hub (`/`)
- **Objective**: Create the unified BorrowHub landing portal linking all 11 modules with live embedded preview.
- **Scope**: Root page (`src/app/page.tsx`), role filters, search bar, KPI strip, and embedded iframe preview.
- **Relevant Screens**: Global launcher.
- **Files to Create**: `src/app/page.tsx`.
- **Dependencies**: All preceding tasks.
- **Implementation Steps**:
  1. Header with BorrowHub 3D cube mark, bilingual title, and quick catalog link.
  2. Live inventory and loan KPI counters (142 available, 9 pending, 38 active, 4 overdue).
  3. Role filter tabs (All, Student, Counter, Admin, Auth).
  4. 11 rich screen cards with direct link and embedded preview toggle.
  5. Responsive sandbox preview container with Desktop, Tablet, and Mobile viewport buttons.
- **Expected Result**: Central showcase connecting all BorrowHub capabilities in one intuitive interface.
- **Acceptance Criteria**: Clicking any module opens it in preview or navigates cleanly without 404s.
- **Verification Method**: End-to-end navigation test.
- **Priority**: P1.

---

## Phase 9: QA, Bidirectional Audit & Final Polish

### TASK-09-01: Responsive Layout & Anti-Slop Audit
- **Objective**: Audit all 11 screens across 1440px desktop, 768px tablet, and 390px mobile viewports.
- **Scope**: CSS audit, touch target verification ($\ge 44\text{px}$), and anti-slop compliance checks.
- **Relevant Screens**: All screens.
- **Files to Audit**: All files in `src/`.
- **Dependencies**: `TASK-08-01`.
- **Implementation Steps**:
  1. Verify zero horizontal scrollbars on mobile.
  2. Ensure all buttons use `whitespace-nowrap shrink-0` and never break into two lines.
  3. Verify unboxed metadata styling (zero pill sandwiches on cards).
  4. Verify bidirectional RTL mirroring using logical properties.
- **Expected Result**: Flawless visual presentation across all device sizes.
- **Acceptance Criteria**: Zero layout shifts or clipping; WCAG AA contrast compliance verified.
- **Verification Method**: Browser viewport tests.
- **Priority**: P1.

---

### TASK-09-02: Production Compilation & Lint Verification
- **Objective**: Verify type safety, run build scripts, and ensure zero lint or compilation errors.
- **Scope**: TypeScript compilation, ESLint validation, Next.js production build.
- **Relevant Screens**: All screens.
- **Dependencies**: `TASK-09-01`.
- **Implementation Steps**:
  1. Run `npx tsc --noEmit` and fix any type warnings.
  2. Run `npm run lint` and verify zero errors.
  3. Run `compile_applet` and verify build succeeds.
- **Expected Result**: Production-ready Next.js application ready for deployment.
- **Acceptance Criteria**: `compile_applet` reports successful build.
- **Verification Method**: `compile_applet`.
- **Priority**: P0.
