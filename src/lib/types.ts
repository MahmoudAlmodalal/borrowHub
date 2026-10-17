export type EquipmentCategory =
  | 'electronics_measurement'
  | 'robotics_iot'
  | 'mechanical_fabrication'
  | 'computing_ai'
  | 'optics_media';

export interface EquipmentSpec {
  label: string;
  value: string;
}

export interface Equipment {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  category: EquipmentCategory;
  categoryLabelAr: string;
  model: string;
  manufacturer: string;
  labLocation: string;
  totalQuantity: number;
  availableQuantity: number;
  imageUrl: string;
  maxLoanDays: number;
  requiresSupervisorApproval: boolean;
  specs: EquipmentSpec[];
  accessories: string[];
  safetyGuidelines: string[];
  descriptionAr: string;
  descriptionEn: string;
}

export type LoanStatus =
  | 'pending_approval'
  | 'approved_ready_for_pickup'
  | 'active_in_possession'
  | 'returned_inspected'
  | 'overdue'
  | 'rejected';

export interface LoanRecord {
  id: string;
  token: string;
  studentId: string;
  studentNameAr: string;
  studentNameEn: string;
  college: string;
  department: string;
  equipmentId: string;
  equipmentNameAr: string;
  assignedSerial: string;
  requestDate: string;
  pickupDate?: string;
  dueDate: string;
  returnDate?: string;
  status: LoanStatus;
  projectTitle: string;
  supervisorName: string;
  handedOverBy?: string;
  receivedBy?: string;
  notes?: string;
}

export interface StudentAccount {
  id: string;
  studentIdNumber: string;
  fullNameAr: string;
  fullNameEn: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  academicYear: string;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  idCardPhotoUrl: string;
  activeLoansCount: number;
  submissionDate: string;
}

export interface ContactAttempt {
  date: string;
  method: 'sms' | 'email' | 'phone';
  note: string;
}

export interface OverdueIncident {
  id: string;
  loanId: string;
  studentNameAr: string;
  studentIdNumber: string;
  studentPhone: string;
  college: string;
  equipmentNameAr: string;
  assignedSerial: string;
  dueDate: string;
  daysOverdue: number;
  severityTier: 'tier1_warning' | 'tier2_dean_letter' | 'tier3_hold';
  assetValueSar: number;
  contactAttempts: ContactAttempt[];
  academicHoldPlaced: boolean;
}

export type UserRole = 'student' | 'supervisor' | 'counter_tech' | 'admin';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  duration?: number;
}
