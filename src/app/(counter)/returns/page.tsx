'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBorrowHubStore } from '@/lib/store';
import { LoanRecord } from '@/lib/types';
import {
  Scan,
  CheckCircle2,
  Check,
  Printer,
  FileCheck,
  Layers,
  ClipboardList,
  AlertTriangle,
  Search,
  ShieldCheck,
  User,
  Box,
} from 'lucide-react';

export default function ReturnsInspectionPage() {
  const { loans, returnLoan } = useBorrowHubStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'loans' | 'inspect'>('loans');

  // Inspection form state
  const [physicalCondition, setPhysicalCondition] = useState('سليم 100% وبحالة المصنع');
  const [accessoriesIntact, setAccessoriesIntact] = useState(true);
  const [cleanedAndCalibrated, setCleanedAndCalibrated] = useState(true);
  const [inspectionNotes, setInspectionNotes] = useState('');

  const activeLoans = loans.filter(
    (l) =>
      (l.status === 'active_in_possession' || l.status === 'overdue') &&
      (l.studentNameAr.includes(searchQuery) ||
        l.token.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.equipmentNameAr.includes(searchQuery) ||
        l.assignedSerial.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedLoan =
    activeLoans.find((l) => l.id === selectedLoanId) || activeLoans[0] || null;

  const handleExecuteReturn = () => {
    if (!selectedLoan) return;
    returnLoan(selectedLoan.id, physicalCondition, inspectionNotes);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              شباك فحص واستلام المرتجعات وإخلاء الطرف
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            فحص الحالة الفيزيائية للأجهزة، مطابقة الملحقات، وإعادة العهدة إلى رصيد المستودع
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/inventory"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition shadow-xs min-h-[44px]"
          >
            <Box className="w-4 h-4 text-[#0284c7]" />
            <span>مستودع الأجهزة المعملية</span>
          </Link>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex rounded-xl bg-slate-200 p-1">
        <button
          onClick={() => setMobileTab('loans')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
            mobileTab === 'loans' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
          }`}
        >
          العهد المفتوحة ({activeLoans.length})
        </button>
        <button
          onClick={() => setMobileTab('inspect')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
            mobileTab === 'inspect' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
          }`}
        >
          محضر الفحص والإخلاء
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Active Loans awaiting return (5 cols) */}
        <div className={`lg:col-span-5 space-y-4 ${mobileTab === 'inspect' ? 'hidden lg:block' : 'block'}`}>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث باسم الطالب، كود العهدة، أو السيريال..."
                className="w-full ps-9 pe-3 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#0284c7] focus:outline-none min-h-[44px]"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>العهد النشطة بالمعامل: <strong className="text-slate-800 font-mono">{activeLoans.length}</strong></span>
              <span className="text-[11px] text-sky-600 font-semibold">بانتظار الإرجاع</span>
            </div>
          </div>

          <div className="space-y-2.5">
            {activeLoans.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <p className="text-xs font-semibold">كافة العهد المعملية مستلمة ولا توجد أجهزة قيد الإرجاع!</p>
              </div>
            ) : (
              activeLoans.map((loan) => {
                const isSelected = selectedLoan?.id === loan.id;
                const isOverdue = loan.status === 'overdue';
                return (
                  <div
                    key={loan.id}
                    onClick={() => {
                      setSelectedLoanId(loan.id);
                      setMobileTab('inspect');
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#0284c7] bg-sky-50/40 shadow-xs ring-1 ring-[#0284c7]'
                        : isOverdue
                        ? 'border-rose-200 bg-rose-50/30'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                        {loan.token}
                      </span>
                      {isOverdue ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700">
                          متأخر
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-mono">
                          حتى: {loan.dueDate}
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 mt-1">
                      {loan.equipmentNameAr}
                    </h4>

                    <div className="text-xs text-slate-600 mt-0.5 flex items-center justify-between">
                      <span>الطالب: <strong>{loan.studentNameAr}</strong></span>
                      <span className="font-mono text-[11px] text-slate-500">{loan.assignedSerial}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Col: Inspection Sheet & Discharge (7 cols) */}
        <div className={`lg:col-span-7 ${mobileTab === 'loans' ? 'hidden lg:block' : 'block'}`}>
          {selectedLoan ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-6">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-sky-100 text-sky-800 text-[11px] font-bold mb-1">
                    <ClipboardList className="w-3.5 h-3.5" />
                    <span>محضر فحص الاسترجاع وإخلاء الطرف المعملي</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {selectedLoan.equipmentNameAr}
                  </h2>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    الرقم التسلسلي: {selectedLoan.assignedSerial} | الطلب: {selectedLoan.token}
                  </p>
                </div>

                <div className="text-end">
                  <span className="text-[11px] text-slate-400 block">المستعير</span>
                  <span className="text-xs font-bold text-slate-900">
                    {selectedLoan.studentNameAr}
                  </span>
                </div>
              </div>

              {/* Physical Condition Selector */}
              <div className="space-y-3">
                <label className="block text-xs sm:text-sm font-bold text-slate-900">
                  حالة العهدة بعد الفحص الفيزيائي:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { label: 'سليم 100% وبحالة المصنع', desc: 'لا توجد أي خدوش أو مشاكل تشغيلية' },
                    { label: 'خدوش سطحية طفيفة', desc: 'استخدام طبيعي دون تأثير على الدقة' },
                    { label: 'يحتاج إعادة معايرة دورية', desc: 'إرسال الجهاز لفريق الصيانة للمعايرة' },
                    { label: 'تلف مادي أو كسر في الهيكل', desc: 'يتطلب رفع تقرير للجنة الإتلاف والمعمل' },
                  ].map((cond) => {
                    const isSelected = physicalCondition === cond.label;
                    return (
                      <button
                        type="button"
                        key={cond.label}
                        onClick={() => setPhysicalCondition(cond.label)}
                        className={`p-3 rounded-xl border text-start transition min-h-[44px] ${
                          isSelected
                            ? 'border-[#00236f] bg-sky-50 text-slate-900 ring-1 ring-[#00236f]'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="font-bold text-xs">{cond.label}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{cond.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Accessories and Cleaning Checkboxes */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer select-none transition">
                  <input
                    type="checkbox"
                    checked={accessoriesIntact}
                    onChange={(e) => setAccessoriesIntact(e.target.checked)}
                    className="rounded text-[#0284c7] focus:ring-[#0284c7] w-4 h-4"
                  />
                  <span className="text-xs text-slate-800 font-medium">
                    تم استلام كافة الكوابل، المحولات، والمجسات المرفقة دون نقص
                  </span>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer select-none transition">
                  <input
                    type="checkbox"
                    checked={cleanedAndCalibrated}
                    onChange={(e) => setCleanedAndCalibrated(e.target.checked)}
                    className="rounded text-[#0284c7] focus:ring-[#0284c7] w-4 h-4"
                  />
                  <span className="text-xs text-slate-800 font-medium">
                    تم مسح البيانات التخزينية وإعادة ضبط إعدادات المصنع للجهاز
                  </span>
                </label>
              </div>

              {/* Inspection Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ملاحظات الفني المعملي (تُسجل في سجل الأصل):
                </label>
                <textarea
                  value={inspectionNotes}
                  onChange={(e) => setInspectionNotes(e.target.value)}
                  placeholder="مثال: تم فحص دقة القياس وتعمل القنوات بكفاءة..."
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleExecuteReturn}
                  className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-[#00236f] hover:bg-[#001b55] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition shadow-sm min-h-[48px]"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>إتمام الإرجاع وإصدار إخلاء الطرف الرقمي</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition min-h-[48px]"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة الشهادة</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 space-y-3">
              <Layers className="w-12 h-12 mx-auto text-slate-300" />
              <h3 className="font-bold text-slate-700 text-sm">اختر عهدة من القائمة لبدء الفحص والاستلام</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
