'use client';

import React, { useState } from 'react';
import { useBorrowHubStore } from '@/lib/store';
import { LoanRecord } from '@/lib/types';
import { 
  Check, X, Eye, FileText, Search, Filter, CheckCircle2, 
  Clock, ShieldAlert, ArrowUpRight
} from 'lucide-react';

export default function RequestsReviewQueuePage() {
  const { loans, approveLoanRequest, rejectLoanRequest } = useBorrowHubStore();
  const [activeFilter, setActiveFilter] = useState<'pending' | 'approved' | 'all'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLoan, setSelectedLoan] = useState<LoanRecord | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const pendingLoans = loans.filter((l) => l.status === 'pending_approval');
  const filteredLoans = loans.filter((l) => {
    const matchStatus =
      activeFilter === 'all'
        ? true
        : activeFilter === 'pending'
        ? l.status === 'pending_approval'
        : l.status === 'approved_ready_for_pickup';
    const matchSearch =
      l.studentNameAr.includes(searchQuery) ||
      l.equipmentNameAr.includes(searchQuery) ||
      l.token.includes(searchQuery) ||
      l.projectTitle.includes(searchQuery);
    return matchStatus && matchSearch;
  });

  const handleApprove = (loanId: string, title: string) => {
    approveLoanRequest(loanId);
    setActionMessage(`تمت الموافقة بنجاح على طلب استعارة: ${title}`);
    setTimeout(() => setActionMessage(null), 4000);
  };

  const handleReject = (loanId: string, title: string) => {
    rejectLoanRequest(loanId, 'تعارض مع جدول الصيانة المجدول');
    setActionMessage(`تم رفض طلب استعارة: ${title}`);
    setTimeout(() => setActionMessage(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-1">
            <span>SCR-07</span>
            <span>·</span>
            <span>طابور مراجعة وإقرار طلبات الاستعارة</span>
          </div>
          <h1 className="text-2xl font-bold text-[#00236f]">إدارة عهد المعامل والطلبات المعلقة</h1>
          <p className="text-xs text-slate-500">
            مراجعة مسوغات المشاريع الأكاديمية والموافقة على تسليم العهد المعملية للطلاب
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3 text-xs">
            <span className="text-slate-500">طلبات بانتظار إقرارك:</span>
            <span className="font-mono font-bold text-base text-[#00236f] bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded">
              {pendingLoans.length}
            </span>
          </div>
        </div>
      </div>

      {actionMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg text-xs font-bold mb-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{actionMessage}</span>
          </div>
          <button onClick={() => setActionMessage(null)}>✕</button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute start-3 top-2.5" />
          <input
            type="text"
            placeholder="بحث باسم الطالب، الجهاز، رمز الطلب، أو عنوان المشروع..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ps-9 pe-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0284c7] outline-none"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveFilter('pending')}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
              activeFilter === 'pending'
                ? 'bg-[#00236f] text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            المعلقة ({pendingLoans.length})
          </button>
          <button
            onClick={() => setActiveFilter('approved')}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
              activeFilter === 'approved'
                ? 'bg-[#00236f] text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            المعتمدة للشباك
          </button>
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
              activeFilter === 'all'
                ? 'bg-[#00236f] text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            الكل
          </button>
        </div>
      </div>

      {/* High-Density Requests Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <th className="py-3 px-4 text-start">رمز الطلب</th>
                <th className="py-3 px-4 text-start">الطالب المستعير</th>
                <th className="py-3 px-4 text-start">المعدة المطلوبة</th>
                <th className="py-3 px-4 text-start">مشروع التخرج / المسوغ</th>
                <th className="py-3 px-4 text-start">تاريخ التقديم</th>
                <th className="py-3 px-4 text-start">الحالة</th>
                <th className="py-3 px-4 text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLoans.length > 0 ? (
                filteredLoans.map((loan, idx) => {
                  const isPending = loan.status === 'pending_approval';
                  return (
                    <tr
                      key={loan.id}
                      className={`hover:bg-slate-50 transition-colors ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-[#f7f9fb]/40'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-[#00236f]">
                        {loan.token}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-800">{loan.studentNameAr}</div>
                        <div className="text-[11px] text-slate-500">{loan.college}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#00236f]">{loan.equipmentNameAr}</div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          الاستحقاق: {loan.dueDate}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate" title={loan.projectTitle}>
                        <div className="text-slate-700 truncate">{loan.projectTitle}</div>
                        <div className="text-[11px] text-slate-400">إشراف: {loan.supervisorName}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-500 whitespace-nowrap">
                        {loan.requestDate}
                      </td>
                      <td className="py-3.5 px-4">
                        {isPending ? (
                          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded text-[11px] font-bold border border-amber-200">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>بانتظار الاعتماد</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-bold border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>معتمد للشباك</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setSelectedLoan(loan)}
                            title="عرض التفاصيل الكاملة"
                            className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {isPending && (
                            <>
                              <button
                                onClick={() => handleApprove(loan.id, loan.equipmentNameAr)}
                                className="bg-[#00236f] hover:bg-[#0284c7] text-white text-[11px] font-bold px-3 py-1.5 rounded transition flex items-center gap-1 shadow-sm"
                              >
                                <Check className="w-3 h-3" />
                                <span>موافقة</span>
                              </button>
                              <button
                                onClick={() => handleReject(loan.id, loan.equipmentNameAr)}
                                className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-[11px] font-bold px-2 py-1.5 rounded transition"
                              >
                                رفض
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    لا توجد طلبات استعارة مطابقة لمعايير البحث الحالية
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Details Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setSelectedLoan(null)}
              className="absolute top-4 end-4 text-slate-400 hover:text-slate-600 text-lg"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded font-bold">
                {selectedLoan.token}
              </span>
              <span className="text-xs text-slate-400">تاريخ التقديم: {selectedLoan.requestDate}</span>
            </div>

            <h3 className="text-base font-bold text-[#00236f] mb-3">تفاصيل مسوغ الاستعارة الأكاديمية</h3>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs mb-4">
              <div>
                <span className="text-slate-400 block mb-0.5">الجهاز المطلوب:</span>
                <span className="font-bold text-[#00236f]">{selectedLoan.equipmentNameAr}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">اسم الطالب المستعير:</span>
                <span className="font-bold text-slate-800">{selectedLoan.studentNameAr} ({selectedLoan.college})</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">عنوان المشروع / التجربة المعملية:</span>
                <span className="text-slate-700 leading-relaxed font-medium">{selectedLoan.projectTitle}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">المشرف الأكاديمي المسؤول:</span>
                <span className="text-slate-800 font-semibold">{selectedLoan.supervisorName}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">ملاحظات النظام:</span>
                <span className="text-slate-600">{selectedLoan.notes}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              {selectedLoan.status === 'pending_approval' && (
                <button
                  onClick={() => {
                    handleApprove(selectedLoan.id, selectedLoan.equipmentNameAr);
                    setSelectedLoan(null);
                  }}
                  className="bg-[#00236f] hover:bg-[#0284c7] text-white text-xs font-bold px-4 py-2 rounded transition flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>اعتماد الطلب فوراً</span>
                </button>
              )}
              <button
                onClick={() => setSelectedLoan(null)}
                className="bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2 rounded"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
