'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBorrowHubStore } from '@/lib/store';
import { LoanRecord } from '@/lib/types';
import {
  Check,
  X,
  Eye,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  ClipboardCheck,
  User,
  Building,
  Calendar,
} from 'lucide-react';

export default function RequestsReviewQueuePage() {
  const { loans, approveLoan, rejectLoan, setRole } = useBorrowHubStore();
  const [filterStatus, setFilterStatus] = useState<'pending' | 'approved' | 'all'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLoan, setSelectedLoan] = useState<LoanRecord | null>(null);
  const [assignedSerial, setAssignedSerial] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const pendingCount = loans.filter((l) => l.status === 'pending_approval').length;

  const filteredLoans = loans.filter((l) => {
    if (filterStatus === 'pending') return l.status === 'pending_approval';
    if (filterStatus === 'approved') return l.status === 'approved_ready_for_pickup' || l.status === 'active_in_possession';
    return true;
  }).filter((l) => {
    return (
      l.studentNameAr.includes(searchQuery) ||
      l.equipmentNameAr.includes(searchQuery) ||
      l.token.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.college.includes(searchQuery)
    );
  });

  const handleOpenReview = (loan: LoanRecord) => {
    setSelectedLoan(loan);
    setAssignedSerial(
      loan.assignedSerial && loan.assignedSerial !== 'لم يخصص بعد' && !loan.assignedSerial.includes('قيد')
        ? loan.assignedSerial
        : 'SN-ENG-' + Math.floor(1000 + Math.random() * 9000)
    );
  };

  const handleApprove = () => {
    if (!selectedLoan) return;
    approveLoan(selectedLoan.id, assignedSerial);
    setSelectedLoan(null);
  };

  const handleReject = () => {
    if (!selectedLoan) return;
    rejectLoan(selectedLoan.id, rejectionReason);
    setShowRejectModal(false);
    setSelectedLoan(null);
    setRejectionReason('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              طابور مراجعة واعتماد طلبات الاستعارة (Supervisor Review Queue)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            صلاحيات مشرف المعمل واللجنة الأكاديمية للموافقة على المشاريع وتعيين الأرقام التسلسلية
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/overdue"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition shadow-xs min-h-[44px]"
          >
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            <span>لوحة المتأخرات</span>
          </Link>
        </div>
      </div>

      {/* Role Connection Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-amber-950">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
          <span>
            بمجرد اعتمادك لأي طلب، ينتقل آلياً إلى <strong>شباك التسليم (Pickups Counter)</strong> ليتمكن فني المعمل من تسليمه للطالب فور حضوره.
          </span>
        </div>
        <button
          onClick={() => {
            setRole('counter_tech');
            window.location.href = '/pickups';
          }}
          className="text-xs font-bold text-amber-900 bg-amber-200/70 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition whitespace-nowrap self-start sm:self-auto min-h-[36px] flex items-center"
        >
          معاينة شباك التسليم ←
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم الطالب، الجهاز، أو كود الطلب..."
            className="w-full ps-9 pe-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none min-h-[40px]"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'pending', label: 'بانتظار الاعتماد', count: pendingCount },
            { id: 'approved', label: 'الطلبات المعتمدة' },
            { id: 'all', label: 'كافة الطلبات' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id as any)}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition min-h-[38px] ${
                filterStatus === tab.id
                  ? 'bg-[#00236f] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className="ms-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-amber-400 text-slate-900 font-mono">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Requests Table / Cards */}
      {filteredLoans.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 space-y-2">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
          <h3 className="font-bold text-sm text-slate-800">طابور المراجعة فارغ تماماً</h3>
          <p className="text-xs text-slate-400">
            لا توجد طلبات جديدة معلقة حالياً بانتظار الاعتماد.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <tr>
                  <th className="p-3.5 text-start">رمز الطلب</th>
                  <th className="p-3.5 text-start">الطالب والكلية</th>
                  <th className="p-3.5 text-start">الجهاز المطلوب</th>
                  <th className="p-3.5 text-start">مشروع التخرج / المشرف</th>
                  <th className="p-3.5 text-start">الحالة</th>
                  <th className="p-3.5 text-center">الإجراء الأكاديمي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLoans.map((loan) => {
                  const isPending = loan.status === 'pending_approval';
                  return (
                    <tr key={loan.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-slate-900 whitespace-nowrap">
                        {loan.token}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="font-bold text-slate-900">{loan.studentNameAr}</div>
                        <div className="text-[11px] text-slate-400">{loan.college}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold text-slate-900">{loan.equipmentNameAr}</div>
                        <div className="text-[11px] text-slate-400 font-mono">تاريخ الإرجاع: {loan.dueDate}</div>
                      </td>
                      <td className="p-3.5 max-w-xs">
                        <div className="text-xs text-slate-700 line-clamp-1">{loan.projectTitle}</div>
                        <div className="text-[11px] text-slate-400">المشرف: {loan.supervisorName}</div>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        {isPending ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                            <Clock className="w-3 h-3" />
                            بانتظار المشرف
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            <CheckCircle2 className="w-3 h-3" />
                            معتمد
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-center whitespace-nowrap">
                        {isPending ? (
                          <button
                            onClick={() => handleOpenReview(loan)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00236f] hover:bg-[#001b55] text-white text-xs font-bold transition shadow-xs min-h-[38px]"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>مراجعة واعتماد</span>
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 font-mono">
                            {loan.assignedSerial}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200" dir="rtl">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-mono font-bold text-amber-600 block">
                  طلب رقم: {selectedLoan.token}
                </span>
                <h3 className="font-bold text-base text-slate-900">
                  مراجعة طلب استعارة: {selectedLoan.equipmentNameAr}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLoan(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <div className="flex justify-between">
                <span className="text-slate-500">الطالب:</span>
                <strong className="text-slate-900">{selectedLoan.studentNameAr} ({selectedLoan.college})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">مشروع التخرج:</span>
                <strong className="text-slate-900 max-w-[260px] text-end">{selectedLoan.projectTitle}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">المشرف الأكاديمي:</span>
                <strong className="text-slate-900">{selectedLoan.supervisorName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">تاريخ الإرجاع المطلوب:</span>
                <strong className="text-slate-900 font-mono">{selectedLoan.dueDate}</strong>
              </div>
              {selectedLoan.notes && (
                <div className="border-t border-slate-200 pt-2 text-slate-600">
                  ملاحظات الطالب: {selectedLoan.notes}
                </div>
              )}
            </div>

            {/* Serial Assignment */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                تخصيص الرقم التسلسلي الفيزيائي للجهاز (Serial Number):
              </label>
              <input
                type="text"
                value={assignedSerial}
                onChange={(e) => setAssignedSerial(e.target.value)}
                required
                placeholder="مثال: SN-OSC-4091-A"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none min-h-[42px]"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                سيتم تدبيج هذا السيريال على بطاقة التسليم في شباك فني المعمل.
              </span>
            </div>

            {/* Action CTAs */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={handleApprove}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-xs min-h-[44px]"
              >
                <Check className="w-4 h-4" />
                <span>اعتماد الطلب وتحويله للشباك</span>
              </button>

              <button
                onClick={() => setShowRejectModal(true)}
                className="py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs transition min-h-[44px]"
              >
                رفض
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/70" dir="rtl">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <h3 className="font-bold text-sm text-slate-900">تأكيد رفض طلب الاستعارة</h3>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="اكتب سبب الرفض الأكاديمي (مثال: تعارض مواعيد، عدم اكتمال موافقات القسم)..."
              rows={3}
              className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={handleReject}
                className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition"
              >
                تأكيد الرفض
              </button>
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-3 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
