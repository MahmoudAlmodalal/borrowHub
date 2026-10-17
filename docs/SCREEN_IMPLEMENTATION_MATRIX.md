# 06. SCREEN IMPLEMENTATION MATRIX & TRACEABILITY

This document provides the complete mapping of every Stitch screen to its Next.js route, layout group, component dependencies, implementation phase, task IDs, and end-to-end requirement traceability.

---

## 1. Master Screen-to-Route Mapping Table

| Screen ID | Stitch Screen Name & Directory | Next.js App Route | Layout Group | Primary Components | Phase | Task IDs | Dependencies | Status |
|:---|:---|:---|:---|:---|:---:|:---|:---|:---:|
| **SCR-01** | `borrowhub_equipment_catalog` / `borrowhub_1` | `/catalog` | `(student)` | `EquipmentCard`, `CatalogFilters`, `SearchInput` | Phase 3 | `TASK-03-01` | `TASK-02-01`, `TASK-02-04` | Planned |
| **SCR-02** | `borrowhub_equipment_details_page` | `/catalog/[id]` | `(student)` | `SpecTable`, `BookingDrawer`, `GalleryViewer` | Phase 3 | `TASK-03-02` | `TASK-03-01` | Planned |
| **SCR-03** | `borrowhub_student_loans_portal` | `/student/loans` | `(student)` | `LoanCard`, `PickupBarcodeModal`, `ExtensionModal` | Phase 3 | `TASK-03-03` | `TASK-03-02` | Planned |
| **SCR-04** | `borrowhub_sign_in` | `/auth/signin` | `(auth)` | `AuthSplitLayout`, `CredentialsForm`, `RoleDemoSwitcher` | Phase 4 | `TASK-04-01` | `TASK-02-01` | Planned |
| **SCR-05** | `borrowhub_student_registration` | `/auth/register` | `(auth)` | `RegistrationWizard`, `IDCardUploader`, `TermsCheckbox` | Phase 4 | `TASK-04-02` | `TASK-04-01` | Planned |
| **SCR-06** | `borrowhub_student_account_verification` | `/admin/verification` | `(admin)` | `VerificationMasterDetail`, `IDInspector`, `ApprovalToast` | Phase 5 | `TASK-05-01` | `TASK-04-02` | Planned |
| **SCR-07** | `borrowhub_admin_requests_review_queue` | `/admin/review` | `(admin)` | `ReviewQueueTable`, `BatchActionBar`, `RequestModal` | Phase 5 | `TASK-05-02` | `TASK-03-02`, `TASK-02-04` | Planned |
| **SCR-08** | `borrowhub_approved_pickups_counter` | `/counter/pickups` | `(counter)` | `BarcodeScannerInput`, `HandoverChecklist`, `TicketCard` | Phase 6 | `TASK-06-01` | `TASK-05-02` | Planned |
| **SCR-09** | `borrowhub_returns_inspection_counter` / `borrowhub_2` | `/counter/returns` | `(counter)` | `ReturnInspectionSheet`, `ConditionGrader`, `Certificate` | Phase 6 | `TASK-06-02` | `TASK-06-01` | Planned |
| **SCR-10** | `borrowhub_overdue_loans_dashboard` | `/admin/overdue` | `(admin)` | `OverdueSeverityBar`, `OverdueIncidentTable`, `SMSModal` | Phase 7 | `TASK-07-01` | `TASK-02-04` | Planned |
| **SCR-11** | `borrowhub_inventory_management` | `/admin/inventory` | `(admin)` | `InventoryTable`, `StockFilterBar`, `AddEquipmentDrawer` | Phase 7 | `TASK-07-02` | `TASK-03-01`, `TASK-02-04` | Planned |
| **HUB** | Global Launcher & Sandbox | `/` | Root | `BrandHero`, `KpiRibbon`, `ModuleDirectory`, `IframePreview` | Phase 8 | `TASK-08-01` | All Modules | Planned |

---

## 2. Requirement Traceability Matrix

### Journey 1: Student Equipment Discovery to Return
$$\text{Catalog (SCR-01)} \longrightarrow \text{Technical Specs (SCR-02)} \longrightarrow \text{Submit Request} \longrightarrow \text{Student Loans (SCR-03)}$$

1. **Stitch Screen**: `borrowhub_equipment_catalog` (SCR-01)
   - **Requirement**: Student browses lab equipment, filters by department and availability, searches for items.
   - **Component**: `EquipmentCard`, `CatalogFilters`
   - **Route**: `/catalog`
   - **Task**: `TASK-03-01`
   - **Acceptance Criteria**: Grid displays 12+ items with dynamic search; clicking item navigates to `/catalog/[id]`.

2. **Stitch Screen**: `borrowhub_equipment_details_page` (SCR-02)
   - **Requirement**: Inspect electrical specs, included accessories, required lab safety training, and submit reservation.
   - **Component**: `SpecTable`, `BookingDrawer`
   - **Route**: `/catalog/[id]`
   - **Task**: `TASK-03-02`
   - **Acceptance Criteria**: Form submission stores request in `pending_approval` state and displays confirmation toast.

3. **Stitch Screen**: `borrowhub_student_loans_portal` (SCR-03)
   - **Requirement**: View active loans with countdown due date, access pickup QR code, request extension.
   - **Component**: `LoanCard`, `PickupBarcodeModal`, `ExtensionModal`
   - **Route**: `/student/loans`
   - **Task**: `TASK-03-03`
   - **Acceptance Criteria**: Active loans show remaining days counter; pickup token modal renders barcode.

---

### Journey 2: Staff Verification, Approval & Counter Operations
$$\text{Registration (SCR-05)} \longrightarrow \text{Verification Desk (SCR-06)} \longrightarrow \text{Review Queue (SCR-07)} \longrightarrow \text{Pickup Desk (SCR-08)} \longrightarrow \text{Return Desk (SCR-09)}$$

1. **Stitch Screen**: `borrowhub_student_registration` (SCR-05)
   - **Requirement**: New student submits registration with university ID and student card photo.
   - **Component**: `RegistrationWizard`, `IDCardUploader`
   - **Route**: `/auth/register`
   - **Task**: `TASK-04-02`
   - **Acceptance Criteria**: Generates registration tracking code and appends to verification queue.

2. **Stitch Screen**: `borrowhub_student_account_verification` (SCR-06)
   - **Requirement**: Lab administrator compares student card with SIS records and approves borrowing privilege.
   - **Component**: `VerificationMasterDetail`, `ApprovalToast`
   - **Route**: `/admin/verification`
   - **Task**: `TASK-05-01`
   - **Acceptance Criteria**: Approving student moves status to `verified` and removes item from pending queue.

3. **Stitch Screen**: `borrowhub_admin_requests_review_queue` (SCR-07)
   - **Requirement**: Supervisor reviews academic project justification and approves pickup.
   - **Component**: `ReviewQueueTable`, `BatchActionBar`
   - **Route**: `/admin/review`
   - **Task**: `TASK-05-02`
   - **Acceptance Criteria**: Approving request moves it to `approved_ready_for_pickup`.

4. **Stitch Screen**: `borrowhub_approved_pickups_counter` (SCR-08)
   - **Requirement**: Counter technician scans barcode, assigns hardware serial, checks accessories, and dispatches.
   - **Component**: `BarcodeScannerInput`, `HandoverChecklist`
   - **Route**: `/counter/pickups`
   - **Task**: `TASK-06-01`
   - **Acceptance Criteria**: Dispatch button is enabled only when all accessories are checked; updates loan to `active_in_possession`.

5. **Stitch Screen**: `borrowhub_returns_inspection_counter` (SCR-09)
   - **Requirement**: Hardware return inspection, accessory audit, cosmetic grading, and student clearance sign-off.
   - **Component**: `ReturnInspectionSheet`, `ClearanceCertificateModal`
   - **Route**: `/counter/returns`
   - **Task**: `TASK-06-02`
   - **Acceptance Criteria**: Full clearance returns equipment to active stock and clears student record.

---

### Journey 3: Asset Governance & Risk Management
$$\text{Overdue Incident (SCR-10)} \longleftrightarrow \text{Master Inventory (SCR-11)}$$

1. **Stitch Screen**: `borrowhub_overdue_loans_dashboard` (SCR-10)
   - **Requirement**: Monitor overdue loans by severity tier, log contact attempts, and trigger academic holds.
   - **Component**: `OverdueSeverityBar`, `OverdueIncidentTable`, `EscalationModal`
   - **Route**: `/admin/overdue`
   - **Task**: `TASK-07-01`
   - **Acceptance Criteria**: Multi-channel notice logs attempt; academic hold toggle updates student status.

2. **Stitch Screen**: `borrowhub_inventory_management` (SCR-11)
   - **Requirement**: Manage equipment catalog, track serial numbers, update maintenance conditions, and add new assets.
   - **Component**: `InventoryTable`, `AddEquipmentDrawer`
   - **Route**: `/admin/inventory`
   - **Task**: `TASK-07-02`
   - **Acceptance Criteria**: Newly created equipment immediately appears in the catalog (SCR-01).

---

## 3. Coverage Certification

- **Total Stitch Screens Discovered**: 11 unique production screens (plus 2 full-screen variants).
- **Total Planned Routes**: 12 Next.js App Router endpoints.
- **Coverage Ratio**: **100%**. Every screen is assigned a dedicated route, layout group, component hierarchy, phase, and testable tasks.
