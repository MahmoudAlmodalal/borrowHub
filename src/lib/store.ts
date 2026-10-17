'use client';

import { useSyncExternalStore } from 'react';
import { Equipment, LoanRecord, StudentAccount, OverdueIncident, ToastMessage, UserRole } from './types';
import { INITIAL_EQUIPMENT, INITIAL_LOANS, INITIAL_STUDENTS, INITIAL_OVERDUE } from './mockData';

interface BorrowHubState {
  currentRole: UserRole;
  lang: 'ar' | 'en';
  equipment: Equipment[];
  loans: LoanRecord[];
  students: StudentAccount[];
  overdue: OverdueIncident[];
  toasts: ToastMessage[];
}

let state: BorrowHubState = {
  currentRole: 'student',
  lang: 'ar',
  equipment: [...INITIAL_EQUIPMENT],
  loans: [...INITIAL_LOANS],
  students: [...INITIAL_STUDENTS],
  overdue: [...INITIAL_OVERDUE],
  toasts: [],
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function getState(): BorrowHubState {
  return state;
}

function updateState(updater: (prev: BorrowHubState) => BorrowHubState) {
  state = updater(state);
  notify();
}

export const storeActions = {
  setRole(role: UserRole) {
    updateState((prev) => ({
      ...prev,
      currentRole: role,
    }));
    const roleLabels: Record<UserRole, string> = {
      student: 'طالب / باحث',
      supervisor: 'مشرف المعمل',
      counter_tech: 'فني الشباك',
      admin: 'مسؤول النظام',
    };
    storeActions.showToast({
      type: 'info',
      title: 'تم التبديل إلى دور ' + roleLabels[role],
      message: 'تم تفعيل صلاحيات وعروض ' + roleLabels[role] + ' بنجاح',
    });
  },

  toggleLanguage() {
    updateState((prev) => ({
      ...prev,
      lang: prev.lang === 'ar' ? 'en' : 'ar',
    }));
  },

  showToast(toast: Omit<ToastMessage, 'id'>) {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { ...toast, id };
    updateState((prev) => ({
      ...prev,
      toasts: [...prev.toasts.slice(-4), newToast],
    }));

    const duration = toast.duration || 4500;
    setTimeout(() => {
      storeActions.dismissToast(id);
    }, duration);
  },

  dismissToast(id: string) {
    updateState((prev) => ({
      ...prev,
      toasts: prev.toasts.filter((t) => t.id !== id),
    }));
  },

  requestLoan(data: {
    studentId: string;
    studentNameAr: string;
    studentNameEn: string;
    college: string;
    department: string;
    equipmentId: string;
    equipmentNameAr: string;
    dueDate: string;
    projectTitle: string;
    supervisorName: string;
    notes?: string;
  }) {
    const id = 'loan-' + (state.loans.length + 10);
    const token = 'LOAN-2026-' + Math.floor(1000 + Math.random() * 9000);
    const newRecord: LoanRecord = {
      id,
      token,
      ...data,
      assignedSerial: 'قيد الاعتماد من المشرف',
      requestDate: new Date().toISOString().split('T')[0],
      status: 'pending_approval',
    };

    updateState((prev) => ({
      ...prev,
      loans: [newRecord, ...prev.loans],
    }));

    storeActions.showToast({
      type: 'success',
      title: 'تم إرسال طلب الاستعارة',
      message: `رقم الطلب الأكاديمي ${token}. الطلب معروض الآن في طابور مراجعة المشرف.`,
    });

    return newRecord;
  },

  approveLoan(loanId: string, assignedSerial?: string) {
    let affectedLoan: LoanRecord | undefined;
    updateState((prev) => {
      const nextLoans = prev.loans.map((l) => {
        if (l.id === loanId) {
          affectedLoan = l;
          return {
            ...l,
            status: 'approved_ready_for_pickup' as const,
            assignedSerial: assignedSerial || l.assignedSerial || 'SN-LAB-' + Math.floor(1000 + Math.random() * 9000),
          };
        }
        return l;
      });

      return {
        ...prev,
        loans: nextLoans,
      };
    });

    storeActions.showToast({
      type: 'success',
      title: 'تم اعتماد طلب الاستعارة بنجاح',
      message: `تم تحويل الطلب (${affectedLoan?.token || loanId}) إلى شباك الاستلام للتسليم الفعلي.`,
    });
  },

  rejectLoan(loanId: string, reason?: string) {
    updateState((prev) => ({
      ...prev,
      loans: prev.loans.map((l) =>
        l.id === loanId
          ? {
              ...l,
              status: 'rejected' as const,
              notes: (l.notes ? l.notes + ' | ' : '') + 'سبب الرفض: ' + (reason || 'عدم استيفاء الاشتراطات المعملية'),
            }
          : l
      ),
    }));

    storeActions.showToast({
      type: 'warning',
      title: 'تم رفض طلب الاستعارة',
      message: reason ? `السبب: ${reason}` : 'تم إشعار الطالب بالرفض الأكاديمي',
    });
  },

  handoverLoan(loanId: string, staffName = 'سامي الحارثي') {
    let targetEqId: string | undefined;
    let loanToken: string = '';

    updateState((prev) => {
      const nextLoans = prev.loans.map((l) => {
        if (l.id === loanId) {
          targetEqId = l.equipmentId;
          loanToken = l.token;
          return {
            ...l,
            status: 'active_in_possession' as const,
            pickupDate: new Date().toISOString().split('T')[0],
            handedOverBy: staffName,
          };
        }
        return l;
      });

      const nextEquipment = prev.equipment.map((eq) => {
        if (eq.id === targetEqId && eq.availableQuantity > 0) {
          return { ...eq, availableQuantity: eq.availableQuantity - 1 };
        }
        return eq;
      });

      return {
        ...prev,
        loans: nextLoans,
        equipment: nextEquipment,
      };
    });

    storeActions.showToast({
      type: 'success',
      title: 'تم تأكيد تسليم العهدة للطالب',
      message: `تم تسليم الجهاز وتوثيق العهدة بالرقم ${loanToken}. بدأت فترة الاستعارة الرسمية.`,
    });
  },

  returnLoan(loanId: string, condition = 'سليم 100%', notes?: string) {
    let targetEqId: string | undefined;
    let token: string = '';

    updateState((prev) => {
      const nextLoans = prev.loans.map((l) => {
        if (l.id === loanId) {
          targetEqId = l.equipmentId;
          token = l.token;
          return {
            ...l,
            status: 'returned_inspected' as const,
            returnDate: new Date().toISOString().split('T')[0],
            receivedBy: 'فني الشباك: سامي الحارثي',
            notes: (l.notes ? l.notes + ' | ' : '') + `فحص الإرجاع: ${condition}. ${notes || ''}`,
          };
        }
        return l;
      });

      const nextEquipment = prev.equipment.map((eq) => {
        if (eq.id === targetEqId) {
          return { ...eq, availableQuantity: Math.min(eq.totalQuantity, eq.availableQuantity + 1) };
        }
        return eq;
      });

      // Clear from overdue if present
      const nextOverdue = prev.overdue.filter((ov) => ov.loanId !== loanId);

      return {
        ...prev,
        loans: nextLoans,
        equipment: nextEquipment,
        overdue: nextOverdue,
      };
    });

    storeActions.showToast({
      type: 'success',
      title: 'تم استلام وفحص العهدة بنجاح',
      message: `تم إخلاء طرف الطالب عن السجل ${token} وإعادة الجهاز للمخزون المتاح.`,
    });
  },

  requestExtension(loanId: string, additionalDays = 7) {
    updateState((prev) => ({
      ...prev,
      loans: prev.loans.map((l) => {
        if (l.id === loanId) {
          const currentDue = new Date(l.dueDate);
          currentDue.setDate(currentDue.getDate() + additionalDays);
          const nextDueDate = currentDue.toISOString().split('T')[0];
          return {
            ...l,
            dueDate: nextDueDate,
            notes: (l.notes ? l.notes + ' | ' : '') + `تم تمديد الاستعارة ${additionalDays} أيام إضافية`,
          };
        }
        return l;
      }),
    }));

    storeActions.showToast({
      type: 'info',
      title: 'تم تمديد فترة الاستعارة',
      message: `تمت إضافة ${additionalDays} أيام إلى الموعد النهائي للاستعارة.`,
    });
  },

  verifyStudent(studentId: string, status: 'verified' | 'rejected') {
    updateState((prev) => ({
      ...prev,
      students: prev.students.map((s) => (s.id === studentId ? { ...s, verificationStatus: status } : s)),
    }));

    storeActions.showToast({
      type: status === 'verified' ? 'success' : 'error',
      title: status === 'verified' ? 'تم اعتماد الحساب الجامعي' : 'تم رفض الحساب الجامعي',
      message: status === 'verified' ? 'أصبح بإمكان الطالب تقديم طلبات استعارة فورية' : 'تم رفض الاعتماد لعدم وضوح الوثائق',
    });
  },

  placeAcademicHold(incidentId: string) {
    updateState((prev) => ({
      ...prev,
      overdue: prev.overdue.map((ov) =>
        ov.id === incidentId
          ? {
              ...ov,
              academicHoldPlaced: true,
              severityTier: 'tier3_hold',
              contactAttempts: [
                ...ov.contactAttempts,
                {
                  date: new Date().toISOString().split('T')[0],
                  method: 'email',
                  note: 'تم إيقاف الخدمات الأكاديمية (تسجيل المقررات ووثيقة التخرج) رسمياً.',
                },
              ],
            }
          : ov
      ),
    }));

    storeActions.showToast({
      type: 'error',
      title: 'تم تطبيق الحجز الأكاديمي',
      message: 'تم إيقاف الخدمات الجامعية للطالب في البوابة الأكاديمية نظراً لعدم إرجاع العهدة.',
    });
  },

  removeAcademicHold(incidentId: string) {
    updateState((prev) => ({
      ...prev,
      overdue: prev.overdue.map((ov) => (ov.id === incidentId ? { ...ov, academicHoldPlaced: false } : ov)),
    }));

    storeActions.showToast({
      type: 'info',
      title: 'تم رفع الحجز الأكاديمي',
      message: 'تم إلغاء الإيقاف وإعادة تفعيل الخدمات الأكاديمية للطالب.',
    });
  },

  sendOverdueReminder(incidentId: string, method: 'sms' | 'email' | 'phone') {
    const labels = { sms: 'رسالة SMS نصية', email: 'بريد إلكتروني رسمي', phone: 'اتصال هاتفي' };
    updateState((prev) => ({
      ...prev,
      overdue: prev.overdue.map((ov) =>
        ov.id === incidentId
          ? {
              ...ov,
              contactAttempts: [
                ...ov.contactAttempts,
                {
                  date: new Date().toISOString().split('T')[0],
                  method,
                  note: `إشعار فوري وتذكير بسرعة إرجاع العهدة المعملية عبر ${labels[method]}.`,
                },
              ],
            }
          : ov
      ),
    }));

    storeActions.showToast({
      type: 'success',
      title: `تم إرسال ${labels[method]}`,
      message: 'تم تسجيل محاولة التواصل في سجل المتابعة القانونية والأكاديمية.',
    });
  },

  addEquipment(newEquip: Omit<Equipment, 'id'>) {
    const id = 'eq-' + (state.equipment.length + 10);
    const equip: Equipment = { ...newEquip, id };
    updateState((prev) => ({
      ...prev,
      equipment: [equip, ...prev.equipment],
    }));

    storeActions.showToast({
      type: 'success',
      title: 'تمت إضافة عهدة جديدة',
      message: `تم تسجيل الجهاز ${equip.nameAr} بكود ${equip.code} في المعمل.`,
    });
  },

  updateEquipment(id: string, updates: Partial<Equipment>) {
    updateState((prev) => ({
      ...prev,
      equipment: prev.equipment.map((eq) => (eq.id === id ? { ...eq, ...updates } : eq)),
    }));

    storeActions.showToast({
      type: 'info',
      title: 'تم تحديث بيانات العهدة',
      message: 'تم حفظ التعديلات بنجاح في قاعدة بيانات المستودع المعملي.',
    });
  },

  resetDemoState() {
    state = {
      currentRole: 'student',
      lang: 'ar',
      equipment: [...INITIAL_EQUIPMENT],
      loans: [...INITIAL_LOANS],
      students: [...INITIAL_STUDENTS],
      overdue: [...INITIAL_OVERDUE],
      toasts: [],
    };
    notify();
    storeActions.showToast({
      type: 'info',
      title: 'تمت استعادة البيانات الافتراضية',
      message: 'تمت إعادة ضبط المستودع والطلبات والإنذارات للحالة الأولية.',
    });
  },
};

export function useBorrowHubStore() {
  const currentState = useSyncExternalStore(
    (callback) => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    getState,
    getState
  );

  return {
    ...currentState,
    ...storeActions,
  };
}
