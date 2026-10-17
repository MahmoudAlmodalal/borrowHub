'use client';

import { useState, useEffect } from 'react';
import { Equipment, LoanRecord, StudentAccount, OverdueIncident } from './types';
import { INITIAL_EQUIPMENT, INITIAL_LOANS, INITIAL_STUDENTS, INITIAL_OVERDUE } from './mockData';

const STORAGE_KEY = 'borrowhub_state_v1';

interface AppState {
  equipment: Equipment[];
  loans: LoanRecord[];
  students: StudentAccount[];
  overdue: OverdueIncident[];
  currentRole: 'student' | 'supervisor' | 'counter_tech' | 'admin';
  lang: 'ar' | 'en';
}

function getInitialState(): AppState {
  if (typeof window === 'undefined') {
    return {
      equipment: INITIAL_EQUIPMENT,
      loans: INITIAL_LOANS,
      students: INITIAL_STUDENTS,
      overdue: INITIAL_OVERDUE,
      currentRole: 'student',
      lang: 'ar',
    };
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.warn('Error reading from localStorage', err);
  }

  return {
    equipment: INITIAL_EQUIPMENT,
    loans: INITIAL_LOANS,
    students: INITIAL_STUDENTS,
    overdue: INITIAL_OVERDUE,
    currentRole: 'student',
    lang: 'ar',
  };
}

export function useBorrowHubStore() {
  const [state, setState] = useState<AppState>(getInitialState);

  // Sync to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (err) {
        console.warn('Error saving to localStorage', err);
      }
    }
  }, [state]);

  const setRole = (role: AppState['currentRole']) => {
    setState((prev) => ({ ...prev, currentRole: role }));
  };

  const toggleLanguage = () => {
    setState((prev) => ({ ...prev, lang: prev.lang === 'ar' ? 'en' : 'ar' }));
  };

  const submitLoanRequest = (data: {
    equipmentId: string;
    projectTitle: string;
    supervisorName: string;
    durationDays: number;
    studentNameAr?: string;
  }) => {
    const eq = state.equipment.find((e) => e.id === data.equipmentId);
    if (!eq) return null;

    const newLoan: LoanRecord = {
      id: `loan-${Date.now()}`,
      token: `LOAN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: 'std-101',
      studentNameAr: data.studentNameAr || 'عمر خالد المنصور',
      studentNameEn: 'Omar Khalid Al-Mansour',
      college: 'كلية الهندسة',
      department: 'الهندسة الكهربائية والحاسبات',
      equipmentId: eq.id,
      equipmentNameAr: eq.nameAr,
      assignedSerial: 'لم يخصص بعد',
      requestDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + data.durationDays * 86400000).toISOString().split('T')[0],
      status: eq.requiresSupervisorApproval ? 'pending_approval' : 'approved_ready_for_pickup',
      projectTitle: data.projectTitle,
      supervisorName: data.supervisorName,
      notes: 'طلب استعارة جديد قيد المتابعة.',
    };

    setState((prev) => ({
      ...prev,
      loans: [newLoan, ...prev.loans],
    }));

    return newLoan;
  };

  const approveLoanRequest = (loanId: string) => {
    setState((prev) => ({
      ...prev,
      loans: prev.loans.map((loan) =>
        loan.id === loanId
          ? {
              ...loan,
              status: 'approved_ready_for_pickup',
              pickupDate: new Date().toISOString().split('T')[0],
              notes: 'تمت الموافقة من المشرف، العهدة بانتظار الاستلام بالشباك.',
            }
          : loan
      ),
    }));
  };

  const rejectLoanRequest = (loanId: string, reason: string) => {
    setState((prev) => ({
      ...prev,
      loans: prev.loans.map((loan) =>
        loan.id === loanId
          ? {
              ...loan,
              status: 'rejected',
              notes: `تم رفض الطلب: ${reason}`,
            }
          : loan
      ),
    }));
  };

  const dispatchLoanPickup = (loanId: string, serial: string) => {
    setState((prev) => {
      const targetLoan = prev.loans.find((l) => l.id === loanId);
      const updatedLoans = prev.loans.map((loan) =>
        loan.id === loanId
          ? {
              ...loan,
              status: 'active_in_possession' as const,
              assignedSerial: serial || 'SN-DEF-001',
              handedOverBy: 'فني الشباك: سامي الحارثي',
              pickupDate: new Date().toISOString().split('T')[0],
              notes: 'تم تسليم العهدة وفحص الملحقات مع الطالب.',
            }
          : loan
      );

      // Decrement available quantity for the equipment
      const updatedEquipment = prev.equipment.map((eq) =>
        targetLoan && eq.id === targetLoan.equipmentId
          ? { ...eq, availableQuantity: Math.max(0, eq.availableQuantity - 1) }
          : eq
      );

      return {
        ...prev,
        loans: updatedLoans,
        equipment: updatedEquipment,
      };
    });
  };

  const completeInspection = (
    loanId: string,
    grade: 'A' | 'B' | 'C' | 'Damaged',
    notes: string
  ) => {
    setState((prev) => {
      const targetLoan = prev.loans.find((l) => l.id === loanId);
      const updatedLoans = prev.loans.map((loan) =>
        loan.id === loanId
          ? {
              ...loan,
              status: 'returned_cleared' as const,
              returnDate: new Date().toISOString().split('T')[0],
              conditionGrade: grade,
              inspectedBy: 'فني الفحص: طارق العمري',
              inspectionNotes: notes,
              notes: 'تم إرجاع العهدة وإبراء ذمة الطالب بنجاح.',
            }
          : loan
      );

      // Restore equipment available quantity
      const updatedEquipment = prev.equipment.map((eq) =>
        targetLoan && eq.id === targetLoan.equipmentId
          ? { ...eq, availableQuantity: Math.min(eq.totalQuantity, eq.availableQuantity + 1) }
          : eq
      );

      // Remove from overdue if it was overdue
      const updatedOverdue = prev.overdue.filter((ov) => ov.loanId !== loanId);

      return {
        ...prev,
        loans: updatedLoans,
        equipment: updatedEquipment,
        overdue: updatedOverdue,
      };
    });
  };

  const verifyStudent = (studentId: string, approved: boolean, reason?: string) => {
    setState((prev) => ({
      ...prev,
      students: prev.students.map((std) =>
        std.id === studentId
          ? {
              ...std,
              verificationStatus: approved ? 'verified' : 'rejected',
              rejectionReason: reason,
            }
          : std
      ),
    }));
  };

  const toggleAcademicHold = (incidentId: string) => {
    setState((prev) => ({
      ...prev,
      overdue: prev.overdue.map((ov) =>
        ov.id === incidentId
          ? { ...ov, academicHoldPlaced: !ov.academicHoldPlaced }
          : ov
      ),
    }));
  };

  const addContactAttempt = (incidentId: string, method: 'sms' | 'email' | 'phone', note: string) => {
    setState((prev) => ({
      ...prev,
      overdue: prev.overdue.map((ov) =>
        ov.id === incidentId
          ? {
              ...ov,
              contactAttempts: [
                ...ov.contactAttempts,
                { date: new Date().toISOString().split('T')[0], method, note },
              ],
            }
          : ov
      ),
    }));
  };

  const addEquipment = (newEq: Omit<Equipment, 'id'>) => {
    const created: Equipment = {
      ...newEq,
      id: `eq-${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      equipment: [created, ...prev.equipment],
    }));
  };

  const resetDemoState = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    setState({
      equipment: INITIAL_EQUIPMENT,
      loans: INITIAL_LOANS,
      students: INITIAL_STUDENTS,
      overdue: INITIAL_OVERDUE,
      currentRole: 'student',
      lang: 'ar',
    });
  };

  return {
    ...state,
    setRole,
    toggleLanguage,
    submitLoanRequest,
    approveLoanRequest,
    rejectLoanRequest,
    dispatchLoanPickup,
    completeInspection,
    verifyStudent,
    toggleAcademicHold,
    addContactAttempt,
    addEquipment,
    resetDemoState,
  };
}
