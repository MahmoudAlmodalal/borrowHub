'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useBorrowHubStore } from '@/lib/store';
import { LoanRecord } from '@/lib/types';
import {
  Scan,
  CheckCircle2,
  User,
  ShieldCheck,
  Printer,
  Check,
  Search,
  Users,
  ClipboardCheck,
  Clock,
  ArrowRight,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function PickupsCounterPage() {
  const { loans, handoverLoan, currentRole, setRole } = useBorrowHubStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'queue' | 'ticket'>('queue');
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    idVerified: true,
    serialMatched: true,
    cablesIncluded: true,
    safetyAcknowledged: true,
  });

  const readyLoans = loans.filter(
    (l) =>
      l.status === 'approved_ready_for_pickup' &&
      (l.studentNameAr.includes(searchQuery) ||
        l.token.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.equipmentNameAr.includes(searchQuery) ||
        l.studentId.includes(searchQuery))
  );

  const selectedLoan =
    readyLoans.find((l) => l.id === selectedLoanId) || readyLoans[0] || null;

  const handleChecklistToggle = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allChecked = Object.values(checklist).every(Boolean);

  const handleConfirmHandover = () => {
    if (!selectedLoan) return;
    handoverLoan(selectedLoan.id, 'فني الشباك: سامي الحارثي');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              شباك تسليم العهد المعتمدة (Approved Pickups Counter)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            محطة فني المعمل للتحقق من هوية الطالب، مطابقة السيريال، وتأكيد تسليم الأجهزة
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/returns"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition shadow-xs min-h-[44px]"
          >
            <Layers className="w-4 h-4 text-[#0284c7]" />
            <span>الانتقال لشباك الإرجاع والفحص</span>
          </Link>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex rounded-xl bg-slate-200 p-1">
        <button
          onClick={() => setMobileTab('queue')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
            mobileTab === 'queue' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
          }`}
        >
          طابور الاستلام ({readyLoans.length})
        </button>
        <button
          onClick={() => setMobileTab('ticket')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
            mobileTab === 'ticket' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
          }`}
        >
          بطاقة التسليم الفعلي
        </button>
      </div>

      {/* Counter Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Queue of waiting students (5 cols) */}
        <div className={`lg:col-span-5 space-y-4 ${mobileTab === 'ticket' ? 'hidden lg:block' : 'block'}`}>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            {/* Search/Barcode input */}
            <div className="relative">
              <Scan className="w-4 h-4 text-emerald-600 absolute top-1/2 -translate-y-1/2 start-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="امسح الباركود أو ابحث برمز الطلب LOAN..."
                className="w-full ps-9 pe-3 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none min-h-[44px]"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>الطلاب بانتظار الاستلام: <strong className="text-slate-800 font-mono">{readyLoans.length}</strong></span>
              <span className="text-[11px] text-emerald-600 font-semibold">جاهز للتسليم</span>
            </div>
          </div>

          {/* List items */}
          <div className="space-y-2.5">
            {readyLoans.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold">لا توجد طلبات معتمدة بانتظار الاستلام حالياً</p>
                <p className="text-[11px] text-slate-400">
                  عندما يعتمد المشرف طلباً جديداً من طابور المراجعة سيظهر هنا فوراً.
                </p>
                <Link
                  href="/review"
                  className="inline-block text-xs text-[#0284c7] font-bold hover:underline pt-2"
                >
                  الانتقال لطابور مراجعة المشرف ←
                </Link>
              </div>
            ) : (
              readyLoans.map((loan) => {
                const isSelected = selectedLoan?.id === loan.id;
                return (
                  <div
                    key={loan.id}
                    onClick={() => {
                      setSelectedLoanId(loan.id);
                      setMobileTab('ticket');
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/40 shadow-xs ring-1 ring-emerald-500'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                        {loan.token}
                      </span>
                      <span className="text-[11px] text-emerald-700 font-semibold">
                        موثق ومعتمد
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 mt-1">
                      {loan.studentNameAr}
                    </h4>

                    <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                      {loan.equipmentNameAr}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
                      <span>السيريال: <strong className="font-mono text-slate-600">{loan.assignedSerial}</strong></span>
                      <span className="text-emerald-700 font-bold">تسليم الآن ←</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Col: Handover Inspection Ticket (7 cols) */}
        <div className={`lg:col-span-7 ${mobileTab === 'queue' ? 'hidden lg:block' : 'block'}`}>
          {selectedLoan ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-6">
              {/* Ticket Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold mb-1">
                    <ClipboardCheck className="w-3.5 h-3.5" />
                    <span>بطاقة تسليم العهدة المعملية الرسمية</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {selectedLoan.equipmentNameAr}
                  </h2>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    الرمز الأكاديمي: {selectedLoan.token}
                  </p>
                </div>

                <div className="text-end">
                  <span className="text-[11px] text-slate-400 block">الموعد النهائي للإرجاع</span>
                  <span className="font-mono text-sm font-bold text-slate-900">
                    {selectedLoan.dueDate}
                  </span>
                </div>
              </div>

              {/* Student & Equipment Verification Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/70 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold block">بيانات الطالب المستلم:</span>
                  <div className="font-bold text-slate-900 text-sm">{selectedLoan.studentNameAr}</div>
                  <div className="text-slate-600">{selectedLoan.college} - {selectedLoan.department}</div>
                  <div className="text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>الهوية الجامعية مطابقة ومعتمدة</span>
                  </div>
                </div>

                <div className="space-y-1 border-t sm:border-t-0 sm:border-s border-slate-200 sm:ps-4 pt-2 sm:pt-0">
                  <span className="text-slate-400 font-semibold block">بيانات الجهاز المعملي:</span>
                  <div className="font-mono font-bold text-slate-900 text-sm">{selectedLoan.assignedSerial}</div>
                  <div className="text-slate-600">المشرف: {selectedLoan.supervisorName}</div>
                  <div className="text-slate-500 mt-1 line-clamp-1">مشروع: {selectedLoan.projectTitle}</div>
                </div>
              </div>

              {/* Pre-handover physical checklist */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>قائمة التحقق المادي قبل تسليم العهدة للطالب:</span>
                </h4>

                <div className="space-y-2">
                  {[
                    { key: 'idVerified', label: 'التحقق من البطاقة الجامعية الأصلية للطالب الحاضر شخصياً' },
                    { key: 'serialMatched', label: `مطابقة الرقم التسلسلي الفيزيائي للجهاز مع السيريال (${selectedLoan.assignedSerial})` },
                    { key: 'cablesIncluded', label: 'التأكد من اكتمال كافة كوابل التغذية والمجسات والحقيبة الواقية' },
                    { key: 'safetyAcknowledged', label: 'إحاطة الطالب بضوابط السلامة وتوقيت الإرجاع لتجنب الحجز الأكاديمي' },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer select-none transition"
                    >
                      <input
                        type="checkbox"
                        checked={checklist[item.key]}
                        onChange={() => handleChecklistToggle(item.key)}
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                      />
                      <span className="text-xs text-slate-700 font-medium">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Handover Action Footer */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={handleConfirmHandover}
                  disabled={!allChecked}
                  className={`w-full sm:w-auto flex-1 py-3 px-6 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition shadow-sm min-h-[48px] ${
                    allChecked
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>تأكيد تسليم العهدة للطالب (بدء فترة الاستعارة)</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition min-h-[48px]"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة السند</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 space-y-3">
              <ClipboardCheck className="w-12 h-12 mx-auto text-slate-300" />
              <h3 className="font-bold text-slate-700 text-sm">حدد طالباً من قائمة الانتظار لبدء إجراءات التسليم</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                يمكنك أيضاً مسح الباركود المعروض على هاتف الطالب للوصول المباشر إلى بطاقة التسليم.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
