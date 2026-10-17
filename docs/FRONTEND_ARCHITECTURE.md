# 03. FRONTEND ARCHITECTURE: Next.js App Router

This document defines the structural architecture, component hierarchy, state management, and mock persistence strategy for the BorrowHub Next.js frontend application.

---

## 1. Architectural Principles

- **Framework**: Next.js 14/15 App Router (`src/app/`).
- **Language**: TypeScript with strict typing.
- **Rendering Model**:
  - *Server Components* by default for static chrome, metadata, and initial page scaffolds.
  - *Client Components* (`'use client'`) for interactive forms, search filters, barcode scanners, modal dialogs, and state synchronization.
- **State Management**: Centralized typed state store (`Zustand` or React Context + `localStorage`) providing full cross-screen persistence for loans, approvals, pickups, and inventory updates.
- **Zero-Backend Requirement**: Self-contained client-side storage adapter with seeded university fixtures simulating a production database.

---

## 2. Directory & Route Hierarchy

```
src/
├── app/
│   ├── layout.tsx                     # Root HTML layout, IBM Plex Sans Arabic font, RTL provider
│   ├── page.tsx                       # Root Landing & Screen Navigation Hub
│   │
│   ├── (student)/                     # Route Group: Student Services
│   │   ├── layout.tsx                 # Student layout with top academic navigation
│   │   ├── catalog/
│   │   │   ├── page.tsx               # SCR-01: Equipment Catalog
│   │   │   └── [id]/
│   │   │       └── page.tsx           # SCR-02: Equipment Technical Details & Booking
│   │   └── loans/
│   │       └── page.tsx               # SCR-03: Student Loans & Requests Portal
│   │
│   ├── (auth)/                        # Route Group: Authentication
│   │   ├── layout.tsx                 # Split-screen Academic Brand layout
│   │   ├── signin/
│   │   │   └── page.tsx               # SCR-04: Sign In & Single Sign-On
│   │   └── register/
│   │       └── page.tsx               # SCR-05: Student Registration Flow
│   │
│   ├── (admin)/                       # Route Group: Lab & Inventory Administration
│   │   ├── layout.tsx                 # Admin workspace layout with side rail
│   │   ├── verification/
│   │   │   └── page.tsx               # SCR-06: Student Account Verification Desk
│   │   ├── review/
│   │   │   └── page.tsx               # SCR-07: Loan Requests Review Queue
│   │   ├── overdue/
│   │   │   └── page.tsx               # SCR-10: Overdue Loans & Escalations Dashboard
│   │   └── inventory/
│   │       └── page.tsx               # SCR-11: Inventory & Asset Management
│   │
│   └── (counter)/                     # Route Group: Physical Dispatch & Return Counters
│       ├── layout.tsx                 # Desk counter station layout with barcode scanner
│       ├── pickups/
│       │   └── page.tsx               # SCR-08: Approved Pickups Counter Desk
│       └── returns/
│           └── page.tsx               # SCR-09: Returns & Technical Inspection Counter
│
├── components/
│   ├── ui/                            # Primitives (Button, Input, Card, Modal, Table, Badge)
│   ├── common/                        # BrandLogo, Header, Sidebar, QuickNav, LanguageToggle
│   ├── catalog/                       # EquipmentCard, CatalogFilters, SpecTable, BookingDrawer
│   ├── loans/                         # LoanCard, LoanExtensionModal, PickupBarcodeModal
│   ├── counter/                       # BarcodeScannerInput, HandoverChecklist, InspectionSheet
│   └── admin/                         # VerificationPane, ReviewQueueTable, OverdueEscalationRow
│
├── lib/
│   ├── types.ts                       # Complete TypeScript domain interfaces
│   ├── store.ts                       # Centralized persistent state store (localStorage)
│   ├── mockData.ts                    # Seed fixtures (equipment, users, loans, incidents)
│   ├── utils.ts                       # Formatting (Arabic dates, currency, barcode generation)
│   └── i18n.ts                        # Arabic & English string dictionaries
│
└── styles/
    └── globals.css                    # Tailwind imports, font definitions, scrollbar styles
```

---

## 3. Data Strategy & State Management

### 3.1 Domain Model Interfaces (`src/lib/types.ts`)
```typescript
export type EquipmentCategory = 
  | 'computing_ai' 
  | 'robotics_iot' 
  | 'electronics_measurement' 
  | 'optics_media' 
  | 'mechanical_fabrication';

export type EquipmentStatus = 
  | 'available' 
  | 'reserved' 
  | 'borrowed' 
  | 'maintenance' 
  | 'retired';

export interface Equipment {
  id: string;
  code: string; // e.g. "EQ-OSC-01"
  nameAr: string;
  nameEn: string;
  category: EquipmentCategory;
  model: string;
  manufacturer: string;
  labLocation: string; // e.g. "معمل الإلكترونيات 204"
  totalQuantity: number;
  availableQuantity: number;
  imageUrl: string;
  maxLoanDays: number;
  requiresSupervisorApproval: boolean;
  specs: { label: string; value: string }[];
  accessories: string[];
  safetyGuidelines: string[];
}

export type LoanStatus = 
  | 'pending_approval' 
  | 'approved_ready_for_pickup' 
  | 'active_in_possession' 
  | 'returned_cleared' 
  | 'overdue' 
  | 'rejected';

export interface LoanRecord {
  id: string;
  token: string; // Barcode e.g. "LOAN-2026-9841"
  studentId: string;
  studentNameAr: string;
  studentNameEn: string;
  college: string;
  equipmentId: string;
  equipmentNameAr: string;
  assignedSerial: string; // Physical unit serial
  requestDate: string;
  pickupDate?: string;
  dueDate: string;
  returnDate?: string;
  status: LoanStatus;
  projectTitle: string;
  supervisorName: string;
  handedOverBy?: string;
  inspectedBy?: string;
  inspectionNotes?: string;
  conditionGrade?: 'A' | 'B' | 'C' | 'Damaged';
}

export interface StudentAccount {
  id: string;
  studentIdNumber: string; // e.g. "441029384"
  fullNameAr: string;
  fullNameEn: string;
  email: string;
  college: string;
  department: string;
  academicYear: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  idCardPhotoUrl: string;
  activeLoansCount: number;
}
```

### 3.2 State Store Capabilities (`src/lib/store.ts`)
- **Action Dispatchers**:
  - `submitLoanRequest(data)`: Appends new loan record in `pending_approval` state.
  - `approveLoanRequest(loanId)`: Advances request to `approved_ready_for_pickup`.
  - `rejectLoanRequest(loanId, reason)`: Moves request to `rejected` with explanation.
  - `dispatchLoanPickup(loanId, serialNumber, verifiedAccessories)`: Advances to `active_in_possession`.
  - `processReturnInspection(loanId, inspectionDetails)`: Clears loan and increments available stock.
  - `requestLoanExtension(loanId, additionalDays)`: Updates due date pending supervisor confirmation.
  - `verifyStudentAccount(studentId, approved)`: Activates or rejects student registration.
- **Automatic Storage Sync**:
  Every mutation serializes to `localStorage.getItem('borrowhub_state')` with fallbacks to initial mock fixtures on first load.

---

## 4. Layout & Navigation Matrix

```
┌────────────────────────────────────────────────────────────────────────┐
│ Global Root (`app/layout.tsx`): Direction Provider, Fonts, Toast Stack  │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  [Student Sub-tree]           [Admin Sub-tree]       [Counter Sub-tree]│
│  Top Navbar with brand,       Collapsible Side Rail  Desk Header with  │
│  catalog search, active       with approval queue,   station selector  │
│  loans counter & profile      inventory & overdue    & barcode scanner │
│                                                                        │
│  • /catalog                   • /admin/review        • /counter/pickups│
│  • /catalog/[id]              • /admin/verification  • /counter/returns│
│  • /student/loans             • /admin/inventory                       │
│                               • /admin/overdue                         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Accessibility & Performance Strategy

1. **Accessibility (WCAG 2.1 AA)**:
   - High-contrast text ratio $\ge 4.5:1$ against `#ffffff` and `#f7f9fb`.
   - Distinctive visible focus rings (`focus-visible:ring-2 focus-visible:ring-[#0284c7]`).
   - Screen-reader tags on non-text icons (`aria-label`, `aria-hidden="true"` on symbols).
   - Keyboard accessible dropdowns and modal drawers with ESC listeners.
2. **Performance**:
   - Zero-layout-shift (CLS) via explicit aspect ratios on equipment media cards.
   - Client bundle optimization: No heavy charting libraries; lightweight SVG rendering for KPI indicators.
   - Smooth transitions with CSS transforms only.
