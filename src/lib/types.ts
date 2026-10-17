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
  specs: { label: string; value: string }[];
  accessories: string[];
  safetyGuidelines: string[];
  descriptionAr: string;
  descriptionEn: string;
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
  inspectedBy?: string;
  inspectionNotes?: string;
  conditionGrade?: 'A' | 'B' | 'C' | 'Damaged';
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
  verificationStatus: 'pending' | 'verified' | 'rejected';
  idCardPhotoUrl: string;
  activeLoansCount: number;
  submissionDate: string;
  rejectionReason?: string;
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
  severityTier: 'tier1_warning' | 'tier2_warning' | 'tier3_hold';
  assetValueSar: number;
  contactAttempts: { date: string; method: 'sms' | 'email' | 'phone'; note: string }[];
  academicHoldPlaced: boolean;
}
