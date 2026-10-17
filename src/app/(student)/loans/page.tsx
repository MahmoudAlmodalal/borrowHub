'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBorrowHubStore } from '@/lib/store';
import { LoanRecord, LoanStatus } from '@/lib/types';
import {
  Clock,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Calendar,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Search,
  X,
  Printer,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Building,
  User,
  Plus,
} from 'lucide-react';

export default function StudentLoansPage() {
  const { loans, requestExtension, currentRole, setRole } = useBorrowHubStore();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'ready' | 'pending' | 'history'>('all');
  const [selectedLoanForBarcode, setSelectedLoanForBarcode] = useState<LoanRecord | null>(null);

  const filteredLoans = loans.filter((loan) => {
    if (activeTab === 'active') return loan.status === 'active_in_possession';
    if (activeTab === 'ready') return loan.status === 'approved_ready_for_pickup';
    if (activeTab === 'pending') return loan.status === 'pending_approval';
    if (activeTab === 'history') return loan.status === 'returned_inspected';
    return true;
  });

  const readyLoans = loans.filter((l) => l.status === 'approved_ready_for_pickup');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6" dir="rtl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            لوحة استعاراتي وتذاكر الاستلام الأكاديمية
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            تابع حالة طلباتك المعملية، أظهر باركود الاستلام عند الشباك، وقدم طلبات التمديد
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#00236f] hover:bg-[#001b55] text-white transition shadow-xs min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>طلب جهاز جديد من الكتالوج</span>
          </Link>
        </div>
      </div>

      {/* Role Link Notice: If Ready Pickups exist */}
      {readyLoans.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-emerald-950">
                لديك {readyLoans.length} جهاز معتمد بانتظار استلامك من الشباك المعملي!
              </h3>
              <p className="text-xs text-emerald-800 mt-0.5">
                توجّه إلى شباك المعمل وقدم الباركود أو رمز الطلب (Token) الموضح أدناه لفني الشباك.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setSelectedLoanForBarcode(readyLoans[0])}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-xs min-h-[40px]"
            >
              <QrCode className="w-4 h-4" />
              <span>عرض باركود الاستلام</span>
            </button>

            {currentRole !== 'counter_tech' && (
              <button
                onClick={() => {
                  setRole('counter_tech');
                  window.location.href = '/pickups';
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white text-emerald-800 border border-emerald-300 text-xs font-semibold hover:bg-emerald-100/50 transition min-h-[40px]"
                title="التبديل إلى دور فني الشباك لتسليم هذه العهدة فوراً"
              >
                <span>شاهد كفني شباك ←</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200">
        {[
          { id: 'all', label: 'كافة الطلبات', count: loans.length },
          { id: 'ready', label: 'جاهز للاستلام', count: readyLoans.length, highlight: readyLoans.length > 0 },
          { id: 'active', label: 'في حيازتي حالياً', count: loans.filter((l) => l.status === 'active_in_possession').length },
          { id: 'pending', label: 'قيد مراجعة المشرف', count: loans.filter((l) => l.status === 'pending_approval').length },
          { id: 'history', label: 'سجل العهد المكتملة', count: loans.filter((l) => l.status === 'returned_inspected').length },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition whitespace-nowrap min-h-[44px] ${
                isActive
                  ? 'border-[#00236f] text-[#00236f] font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                tab.highlight ? 'bg-emerald-100 text-emerald-800 font-bold' : 'bg-slate-100 text-slate-600'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Loans List */}
      {filteredLoans.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">لا توجد طلبات في هذا التبويب</h3>
          <p className="text-xs text-slate-500">
            يمكنك تصفح كتالوج الأجهزة وحجز أجهزة ومعدات جديدة لمشاريعك وأبحاثك.
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00236f] text-white text-xs font-bold hover:bg-[#001b55] transition"
          >
            <span>استعراض الكتالوج الأكاديمي</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLoans.map((loan) => {
            const isReady = loan.status === 'approved_ready_for_pickup';
            const isActive = loan.status === 'active_in_possession';
            const isPending = loan.status === 'pending_approval';
            const isOverdue = loan.status === 'overdue';
            const isReturned = loan.status === 'returned_inspected';

            return (
              <div
                key={loan.id}
                className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all shadow-xs ${
                  isReady
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : isOverdue
                    ? 'border-rose-300 bg-rose-50/20'
                    : isPending
                    ? 'border-amber-200'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Info block */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
                        {loan.token}
                      </span>

                      {/* Status Badges */}
                      {isReady && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          معتمد - جاهز للاستلام من الشباك
                        </span>
                      )}

                      {isActive && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-300">
                          <Clock className="w-3.5 h-3.5" />
                          قيد الاستعارة (في حيازتك)
                        </span>
                      )}

                      {isPending && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                          <Clock className="w-3.5 h-3.5" />
                          قيد مراجعة المشرف المعملي
                        </span>
                      )}

                      {isOverdue && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          متأخر عن موعد الإرجاع
                        </span>
                      )}

                      {isReturned && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          تم الإرجاع وإخلاء الطرف
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {loan.equipmentNameAr}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-slate-600 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>موعد التسليم المقرر: <strong className="font-mono text-slate-800">{loan.dueDate}</strong></span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>المشرف: <strong className="text-slate-800">{loan.supervisorName}</strong></span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-slate-400">SN:</span>
                        <span>السيريال: <strong className="font-mono text-slate-800">{loan.assignedSerial}</strong></span>
                      </div>
                    </div>

                    {loan.projectTitle && (
                      <p className="text-xs text-slate-500 italic">
                        مشروع: {loan.projectTitle}
                      </p>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap lg:flex-col items-center gap-2 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
                    {/* View Barcode for Pickup */}
                    {isReady && (
                      <button
                        onClick={() => setSelectedLoanForBarcode(loan)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition min-h-[44px]"
                      >
                        <QrCode className="w-4 h-4" />
                        <span>إظهار باركود الاستلام</span>
                      </button>
                    )}

                    {/* Extension request */}
                    {isActive && (
                      <button
                        onClick={() => requestExtension(loan.id, 7)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition border border-slate-200 min-h-[44px]"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-[#0284c7]" />
                        <span>طلب تمديد (7 أيام)</span>
                      </button>
                    )}

                    {/* If pending, supervisor quick link */}
                    {isPending && currentRole === 'supervisor' && (
                      <Link
                        href="/review"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition min-h-[44px]"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>اعتماد في طابور المشرف</span>
                      </Link>
                    )}

                    {/* Link to equipment specifications */}
                    <Link
                      href={`/catalog/${loan.equipmentId}`}
                      className="text-xs text-[#0284c7] hover:underline px-2 py-1"
                    >
                      مواصفات الجهاز
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Barcode / QR Pickup Modal */}
      {selectedLoanForBarcode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200" dir="rtl">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">تذكرة الاستلام الرقمية</h3>
                  <span className="text-[11px] text-slate-400">قدم هذا الرمز لفني الشباك المعملي</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedLoanForBarcode(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stylized Barcode Graphic */}
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-6 text-center space-y-3">
              <div className="font-mono text-xl font-bold tracking-widest text-slate-900 bg-white py-2 px-4 rounded border inline-block">
                {selectedLoanForBarcode.token}
              </div>

              {/* Barcode lines simulation */}
              <div className="h-14 flex items-center justify-center gap-1 px-4 overflow-hidden select-none" aria-hidden="true">
                {[4, 2, 6, 1, 8, 3, 2, 7, 5, 2, 4, 1, 9, 3, 5, 2, 8, 4, 2, 6, 3, 1, 7, 2, 5, 8, 2].map((h, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-800 w-1 rounded-xs"
                    style={{ height: `${h * 5 + 10}px` }}
                  />
                ))}
              </div>

              <div className="text-[11px] text-slate-500 font-mono">
                كود التخصيص: {selectedLoanForBarcode.assignedSerial}
              </div>
            </div>

            <div className="space-y-1 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg">
              <div>الجهاز: <strong className="text-slate-900">{selectedLoanForBarcode.equipmentNameAr}</strong></div>
              <div>المستعير: <strong className="text-slate-900">{selectedLoanForBarcode.studentNameAr}</strong></div>
              <div>الموعد النهائي: <strong className="text-slate-900 font-mono">{selectedLoanForBarcode.dueDate}</strong></div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setRole('counter_tech');
                  window.location.href = '/pickups';
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-xs flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                <span>الانتقال لشباك التسليم لإتمام الاستلام ←</span>
              </button>

              <button
                onClick={() => setSelectedLoanForBarcode(null)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition min-h-[44px]"
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
