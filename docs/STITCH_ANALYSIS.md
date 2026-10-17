# 01. STITCH DESIGN ANALYSIS: BorrowHub Platform

**Project Name**: BorrowHub (استعارة) — University Equipment Borrowing & Management Platform  
**Source Repository**: `MahmoudAlmodalal/borrowHub`  
**Design Reference**: Academic Focus Design System (`DESIGN.md`)  
**Target Architecture**: Next.js 14/15 App Router, React 19, TypeScript, Tailwind CSS v3/v4  
**Primary Locale & Direction**: Arabic (`dir="rtl"`), IBM Plex Sans Arabic + Inter, Dual LTR/RTL support  

---

## 1. Executive Summary & Design Inventory

The BorrowHub project is a comprehensive university equipment loan, asset governance, and laboratory counter system designed according to the **Academic Focus Design System**. The system serves two primary stakeholder groups:
1. **Students & Researchers**: Browse equipment catalog, review detailed technical specs, submit loan requests for academic projects, and track active loans and return due dates.
2. **Laboratory Staff & Academic Administrators**: Verify student accounts, review loan requests, operate the physical Pickup & Delivery Counter, conduct return inspections, monitor overdue escalations, and manage master inventory.

All screens share a cohesive visual language defined by deep academic indigo (`#00236f` / `#1e3a8a`), electric sky accents (`#0284c7`), amber alert highlights (`#f59e0b`), crisp white surface cards (`#ffffff`), and soft paper slate backgrounds (`#f7f9fb`).

---

## 2. Comprehensive Screen-by-Screen Stitch Analysis

### Screen 01: Academic Equipment Catalog (SCR-01)
- **Stitch Directory**: `borrowhub_equipment_catalog/` (and `borrowhub_1/`)
- **Stitch Files**: `code.html`, `screen.png`
- **Target Route**: `/catalog` or `/(student)/catalog/page.tsx`
- **User Role**: Student, Researcher, Faculty Guest
- **Purpose**: High-density, searchable, and filterable marketplace of university laboratory hardware, measurement tools, cameras, robotics, and computing kits.
- **Layout & Structure**:
  - Top Navigation: Dual-brand lockup, search bar, active loan indicator, student profile pill.
  - Category Filter Strip: All, Computing & AI, Robotics & IoT, Electronics & Measurement, Optics & Photography, Mechanical & Fabrication.
  - Sidebar Filters: Faculty/College, Department Lab, Availability Status (Available Now, Reserved, Maintenance), Max Loan Duration (3 days, 7 days, 14 days), Equipment Level (Undergraduate, Graduate Research Only).
  - Main Grid: 3-column responsive card matrix featuring high-resolution photography, equipment model, lab room tag, availability badge, quick specifications chips, and primary "طلب استعارة" (Borrow Request) action.
- **Key Interactivity**:
  - Live client-side text search (Arabic & English model names).
  - Multi-facet category and availability filtering with instant count updates.
  - Equipment quick preview drawer / modal.
  - Direct navigation to `/catalog/[id]`.
- **States**:
  - *Loaded*: 12+ items with live availability tags.
  - *Empty Search*: "لا توجد معدات مطابقة للبحث" with reset filters CTA.
  - *Loading*: Skeleton grid mimicking card geometry.

---

### Screen 02: Equipment Technical Details & Borrow Request (SCR-02)
- **Stitch Directory**: `borrowhub_equipment_details_page/`
- **Stitch Files**: `code.html`, `screen.png`
- **Target Route**: `/catalog/[id]` or `/(student)/catalog/[id]/page.tsx`
- **User Role**: Student, Faculty Researcher
- **Purpose**: Detailed technical evaluation of an item, accessory audit, loan eligibility rules, calendar reservation slot picker, and formal borrowing application submission.
- **Layout & Structure**:
  - Breadcrumbs: `الرئيسية / الكتالوج / أجهزة القياس / راسم الإشارة الرقمي Tektronix TBS1102B`
  - Two-Column Detailed Split:
    - Left/Center: High-res gallery (main photo + thumbnail selector), full technical specifications table, included accessories checklist (cables, probes, power brick, protective case), laboratory safety requirements, supervisor approval requirement flags.
    - Right (Sticky Booking Rail): Live stock status (e.g., "3 أجهزة متوفرة في معمل الإلكترونيات 204"), date picker for pickup and return, academic justification text area, project/course code selection, supervisor email input, and primary submit button.
- **Key Interactivity**:
  - Image gallery thumbnail switcher with zoom preview.
  - Dynamic date range validation (enforces 7-day or 14-day policy limit).
  - Interactive "تأكيد طلب الاستعارة" submission drawer with instant success confirmation and barcode generation.
- **States**:
  - *Available*: Active reservation rail with blue CTA.
  - *Waitlist / Out of Stock*: Secondary amber CTA "إشعار عند التوفر".
  - *Submitting*: Button spinner with disabled inputs.

---

### Screen 03: Student Loans & Requests Portal (SCR-03)
- **Stitch Directory**: `borrowhub_student_loans_portal/`
- **Stitch Files**: `code.html`, `screen.png`
- **Target Route**: `/student/loans` or `/(student)/loans/page.tsx`
- **User Role**: Authenticated Student
- **Purpose**: Personal academic account hub displaying active equipment in possession, upcoming deadlines, pickup pickup QR/barcodes, and request history.
- **Layout & Structure**:
  - Metric Header Ribbon: Active Loans (3), Pending Approvals (1), Returned (14), Overdue Alerts (0).
  - Tabbed Views:
    1. *العهد الحالية (Active Loans)*: Cards with remaining days counter (e.g. "متبقي يومان"), pickup date, expected return location, and "طلب تمديد" (Request Extension) modal trigger.
    2. *الطلبات المعتمدة بانتظار الاستلام (Ready for Pickup)*: Shows pickup authorization QR/barcode, desk location (e.g. "شباك المعامل - مبنى ب"), and deadline to pickup.
    3. *الطلبات قيد المراجعة (Pending Review)*: Status pipeline indicator (Submitted -> Supervisor Review -> Ready).
    4. *سجل العهد السابقة (History)*: Searchable archive with inspection clearance receipts.
- **Key Interactivity**:
  - Loan extension request dialog with reason and date picker.
  - Pickup barcode modal for scanning at physical desk.
  - Filter by status and date range.

---

### Screen 04: Academic Sign-In & Single Sign-On (SCR-04)
- **Stitch Directory**: `borrowhub_sign_in/`
- **Stitch Files**: `code.html`, `screen.png`
- **Target Route**: `/auth/signin` or `/(auth)/signin/page.tsx`
- **User Role**: Public / All Roles (Student, Lab Staff, Inventory Admin)
- **Purpose**: University credentials authentication with role-based routing and Single Sign-On (SSO) integration.
- **Layout & Structure**:
  - Two-Column Academic Split Layout:
    - Brand Showcase Column (Deep Indigo `#00236f`): BorrowHub 3D Cube mark, academic governance description, security badge, institutional hotline.
    - Form Column (Crisp Surface): Single Sign-On university portal login, university email / student ID input, password field, "تذكر بياناتي" checkbox, "نسيت كلمة المرور", and secondary link to register new account.
    - Role Demo Quick-Select Switcher: Allows evaluators to log in instantly as Student, Lab Counter Tech, or System Admin.
- **Key Interactivity**:
  - Form validation with inline error states.
  - Fast-track role demo buttons for evaluation.
  - Redirection to role-specific default view (`/student/loans` vs `/admin/review`).

---

### Screen 05: Student Account Registration (SCR-05)
- **Stitch Directory**: `borrowhub_student_registration/`
- **Stitch Files**: `code.html`, `screen.png`
- **Target Route**: `/auth/register` or `/(auth)/register/page.tsx`
- **User Role**: New Student / Applicant
- **Purpose**: Student onboarding, university ID verification, college and department affiliation, and digital student card upload.
- **Layout & Structure**:
  - Multi-step progress tracker: (1) البيانات الشخصية والأكاديمية, (2) إثبات القيد والهوية, (3) ميثاق العهدة والإقرار الأكاديمي.
  - Step 1 Form: Full Arabic Name, English Name, University ID Number, College, Major, Academic Year, University Email, Phone.
  - Step 2 Form: File uploader for student university card (front and back), selfie verification option.
  - Step 3 Form: Academic equipment liability terms, agreement checkbox, and submit button.
- **Key Interactivity**:
  - Multi-step wizard with step validation before progression.
  - Drag-and-drop file upload preview with image thumbnail.
  - Success submission modal with request tracking reference code (e.g. `REG-2026-9812`).

---

### Screen 06: Student Account Verification Desk (SCR-06)
- **Stitch Directory**: `borrowhub_student_account_verification/`
- **Stitch Files**: `code.html`, `screen.png`
- **Target Route**: `/admin/verification` or `/(admin)/verification/page.tsx`
- **User Role**: Academic Affairs / Lab Administration Desk
- **Purpose**: Reviewing pending student registration requests, comparing uploaded ID photos against university records, and activating borrowing privileges.
- **Layout & Structure**:
  - Header: Verification Queue Counter (e.g., "18 طالب بانتظار التحقق"), filter by college/faculty.
  - Master-Detail Split Pane:
    - Right Pane (List): List of pending student requests with submission timestamp, student ID, college, and status chip.
    - Left Pane (Detail View): Selected student dossier: full details, side-by-side display of uploaded ID card with zoom controls, university SIS matching indicator, approval button ("اعتماد وتفعيل الحساب"), and rejection button with canned reason selector.
- **Key Interactivity**:
  - Instant selection of student from queue updating detail pane.
  - Interactive approval workflow with toast notification and queue item removal.
  - Rejection modal with reason selection (e.g. "صورة البطاقة غير واضحة", "عدم تطابق الرقم الجامعي").

---

### Screen 07: Loan Requests Review Queue (SCR-07)
- **Stitch Directory**: `borrowhub_admin_requests_review_queue/`
- **Stitch Files**: `code.html`, `screen.png`
- **Target Route**: `/admin/review` or `/(admin)/review/page.tsx`
- **User Role**: Lab Supervisor / Department Head
- **Purpose**: Queue for evaluating borrowing justifications, verifying course project prerequisites, risk assessment, and granting formal approval for pickup.
- **Layout & Structure**:
  - Filter Tabs: All Pending (9), High Priority / Research (3), Standard Labs (6), Flagged for Review (0).
  - High-Density Data Table / Request Cards:
    - Columns: Request ID, Student Name & ID, Equipment Model & Tag, Required Duration, Project Title & Course Code, Supervisor Endorsement, Stock Level, Actions.
  - Quick Action Buttons: Quick Approve, Reject, or Open Full Review Sheet.
- **Key Interactivity**:
  - Batch selection and approval of multiple requests.
  - Detailed request sheet modal with student borrowing history and risk score.
  - Rejection with comments sent to student notification center.

---

### Screen 08: Approved Pickups Counter Desk (SCR-08)
- **Stitch Directory**: `borrowhub_approved_pickups_counter/`
- **Stitch Files**: `code.html`, `screen.png`
- **Target Route**: `/counter/pickups` or `/(counter)/pickups/page.tsx`
- **User Role**: Counter Service Technician (Lab Dispatch Desk)
- **Purpose**: Physical desk operations screen for scanning student pickup tokens, verifying hardware serials, conducting handovers, and issuing digital receipts.
- **Layout & Structure**:
  - Top Bar: Desk Station Selector (e.g. "شباك تسليم مبنى الهندسة A - محطة 1"), quick barcode scan input.
  - Dispatch Workspace:
    - Search / Scan Bar: Live input for typing or barcode scanning student ID or reservation code (`LOAN-XXXX`).
    - Handover Active Ticket: Student photo, verified status, equipment serial assignment input (auto-fill or barcode scan), checklist of accessories handed over (e.g. Power cord [x], Probes [x], Carrying bag [x]).
    - Digital Signature / Handover Acknowledgment: Confirmation button "تأكيد التسليم وطباعة الإيصال".
  - Today's Pickup Schedule: Upcoming scheduled pickups with time slots and status.
- **Key Interactivity**:
  - Simulated barcode scanner input with instant ticket lookup.
  - Interactive checklist requiring all mandatory accessories checked before dispatch.
  - Print receipt trigger and instant transition to "Dispatched / في عهدة الطالب".

---

### Screen 09: Returns & Technical Inspection Counter (SCR-09)
- **Stitch Directory**: `borrowhub_returns_inspection_counter/` (and `borrowhub_2/`)
- **Stitch Files**: `code.html`, `screen.png`
- **Target Route**: `/counter/returns` or `/(counter)/returns/page.tsx`
- **User Role**: Lab Inspection Officer / Maintenance Tech
- **Purpose**: Formal hardware return protocol, serial verification, functional electrical/mechanical testing, cosmetic grading, and student clearance sign-off.
- **Layout & Structure**:
  - Lookup Bar: Barcode scan of returned device or student card.
  - Technical Inspection Workflow Sheet:
    1. *مطابقة العهدة (Asset Match)*: Serial number check, original condition baseline.
    2. *فحص الملحقات (Accessories Audit)*: Checkbox list of returned cables, probes, memory cards, manuals.
    3. *الحالة الفنية والتشغيلية (Operational Test)*: "يعمل بكفاءة بدون ملاحظات", "يحتاج صيانة طفيفة", "تالف / مفقود".
    4. *التقييم الظاهري (Cosmetic Rating)*: 5-star or grade selection (A, B, C, F) + photo upload for damage evidence.
    5. *القرار النهائي وإبراء الذمة (Clearance Decision)*: "إبراء ذمة الطالب بالكامل" (Full Clearance) or "إحالة للتحقيق / غرامة مالية" (Flagged for Damage Assessment).
- **Key Interactivity**:
  - Dynamic inspection checklist with condition scoring.
  - Instant clearance calculation and release of student record.
  - Print/download "شهادة استلام وإبراء ذمة عهدة" (Clearance Certificate).

---

### Screen 10: Overdue Loans & Escalations Dashboard (SCR-10)
- **Stitch Directory**: `borrowhub_overdue_loans_dashboard/`
- **Stitch Files**: `code.html`, `screen.png`
- **Target Route**: `/admin/overdue` or `/(admin)/overdue/page.tsx`
- **User Role**: Laboratory Administrator / Dean of Academic Affairs
- **Purpose**: Critical incident monitoring for unreturned hardware, escalating notifications (SMS, Email, Department Alert), tracking academic holds, and calculating late penalty fees.
- **Layout & Structure**:
  - Escalation Severity Counters:
    - Tier 1: 1–3 Days Overdue (Friendly Reminder) — 2 Cases
    - Tier 2: 4–7 Days Overdue (Academic Warning & Phone Call) — 1 Case
    - Tier 3: >7 Days Overdue (Academic Hold & Dean Escalation) — 1 Case
  - Incident Ledger: Table with Student Name, ID, College, Phone, Equipment Name, Asset Value, Due Date, Days Overdue, Escalation Tier, Last Contact Log.
  - Quick Actions Bar: Send Multi-Channel Reminder (SMS + Email), Place Academic Hold on SIS, Schedule Physical Recovery.
- **Key Interactivity**:
  - Direct trigger to open modal for logging contact attempts or sending automated SMS/email alerts.
  - Academic hold toggle with confirm dialog.
  - Export overdue report as CSV / PDF.

---

### Screen 11: Inventory & Equipment Management (SCR-11)
- **Stitch Directory**: `borrowhub_inventory_management/`
- **Stitch Files**: `code.html`, `screen.png`
- **Target Route**: `/admin/inventory` or `/(admin)/inventory/page.tsx`
- **User Role**: Asset Manager / Master Lab Technician
- **Purpose**: Full lifecycle inventory administration: stock counts, serial numbers, maintenance logs, QR code generation, adding new lab units.
- **Layout & Structure**:
  - Inventory Metrics: Total Assets (184), In Circulation (38), In Storage (132), In Maintenance (14).
  - Search & Category Filter Toolbar: Search by serial number, model, lab shelf location.
  - Inventory Data Grid:
    - Columns: Asset Barcode, Equipment Name, Department/Lab, Serial Number, Purchase Year, Current Condition, Status (Available, Loaned, Calibration, Maintenance), Actions.
  - "إضافة معدة جديدة" (Add Equipment) Modal / Drawer: Form for equipment title, model, manufacturer, category, lab room, serial number, accessories list, borrowing duration rules.
- **Key Interactivity**:
  - Add New Equipment dialog with live validation.
  - Status change dropdown with instant row update.
  - Print barcode label generator.
  - CSV export and import.

---

## 3. Brand & Design Assets Inventory

1. **Logo SVG Lockup**:
   - Source: `borrowhub_single_line_lockup/code.html` (Base64 SVG).
   - Elements: 3D Isometric Exchange Cube in gradients of Sky Blue (`#0284c7`) and Academic Navy (`#1e3a8a`), central amber focal dot (`#f59e0b`), English wordmark `BorrowHub`, vertical separator, Arabic subtitle `منصة استعارة وإدارة المعدات الجامعية`.
2. **Typography**:
   - Arabic Font: `IBM Plex Sans Arabic` (weights: 300, 400, 500, 600, 700).
   - Latin Font: `Inter` (weights: 400, 500, 600, 700).
   - Monospace Numerals: `font-mono tabular-nums` for asset codes, dates, and inventory serials.
3. **Color Tokens**:
   - `primary`: `#00236f` (Deep Academic Navy)
   - `primary-container`: `#1e3a8a` (Academic Indigo)
   - `secondary`: `#0284c7` (Electric Sky)
   - `secondary-container`: `#5bb8fe` (Light Sky)
   - `tertiary`: `#f59e0b` (Warm Amber Accent)
   - `surface`: `#ffffff` (Crisp White Card)
   - `background`: `#f7f9fb` (Soft Paper Slate)
   - `outline`: `#cbd5e1` (Muted Slate Border)
   - `error`: `#ba1a1a` / `#ffdad6` (Warning / Late Alert)
4. **Imagery**:
   - Real high-resolution equipment photographs already cataloged in the Stitch assets (oscilloscopes, 3D printers, digital multimeters, robotic arms, drone kits, mirrorless cameras).
