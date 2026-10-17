'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBorrowHubStore } from '@/lib/store';
import { LoanRecord } from '@/lib/types';
import { 
  Clock, QrCode, ArrowUpRight, CheckCircle2, AlertCircle, 
  Layers, Calendar, ShieldCheck, X
} from 'lucide-react';

export default function StudentLoansPortalPage() {
  const { loans } = useBorrowHubStore();
  const [activeTab, setActiveTab] = useState<'active' | 'ready' | 'pending' | 'history'>('active');
  const [selectedBarcodeLoan, setSelectedBarcodeLoan] = useState<LoanRecord | null>(null);
  const [extensionModalLoan, setExtensionModalLoan] = useState<LoanRecord | null>(null);
  const [extensionSuccess, setExtensionSuccess] = useState(false);

  const activeLoans = loans.filter((l) => l.status === 'active_in_possession' || l.status === 'overdue');
  const readyLoans = loans.filter((l) => l.status === 'approved_ready_for_pickup');
  const pendingLoans = loans.filter((l) => l.status === 'pending_approval');
  const historyLoans = loans.filter((l) => l.status === 'returned_cleared' || l.status === 'rejected');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Portal Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0284c7]/10 text-[#0284c7] text-xs font-semibold mb-1">
            <span>SCR-03</span>
            <span>·</span>
            <span>لوحة حساب الطالب</span>
          </div>
          <h1 className="text-2xl font-bold text-[#00236f]">طلبات واستعارات الطالب</h1>
          <p className="text-xs text-slate-500">
            متابعة العهد الشخصية، استلام الأجهزة المعتمدة عبر الباركود، ومتابعة تواريخ الاستحقاق.
          </p>
        </div>

        <Link
          href="/catalog"
          className="inline-flex items-center gap-1.5 bg-[#00236f] hover:bg-[#0284c7] text-white text-xs font-semibold px-4 py-2 rounded transition whitespace-nowrap self-start md:self-auto"
        >
          <span>طلب استعارة جديدة</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* KPI Metrics Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium mb-1">العهد الحالية في حيازتي</div>
          <div className="text-2xl font-bold text-[#00236f] font-mono">{activeLoans.length}</div>
          <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>مسؤولة بالكامل</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium mb-1">جاهزة للاستلام بالشباك</div>
          <div className="text-2xl font-bold text-[#0284c7] font-mono">{readyLoans.length}</div>
          <div className="text-[11px] text-[#0284c7] mt-1 flex items-center gap-1">
            <QrCode className="w-3 h-3" />
            <span>يتطلب مسح الباركود</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium mb-1">طلبات قيد المراجعة</div>
          <div className="text-2xl font-bold text-[#f59e0b] font-mono">{pendingLoans.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">بانتظار موافقة المشرف</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium mb-1">سجل العهد السابقة</div>
          <div className="text-2xl font-bold text-slate-700 font-mono">{historyLoans.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">مكتملة ومبرأة الذمة</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 text-xs font-bold rounded-t transition-all whitespace-nowrap ${
            activeTab === 'active'
              ? 'border-b-2 border-[#00236f] text-[#00236f] bg-white'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          العهد الحالية ({activeLoans.length})
        </button>
        <button
          onClick={() => setActiveTab('ready')}
          className={`px-4 py-2 text-xs font-bold rounded-t transition-all whitespace-nowrap ${
            activeTab === 'ready'
              ? 'border-b-2 border-[#00236f] text-[#00236f] bg-white'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          جاهزة للاستلام ({readyLoans.length})
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 text-xs font-bold rounded-t transition-all whitespace-nowrap ${
            activeTab === 'pending'
              ? 'border-b-2 border-[#00236f] text-[#00236f] bg-white'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          قيد المراجعة ({pendingLoans.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 text-xs font-bold rounded-t transition-all whitespace-nowrap ${
            activeTab === 'history'
              ? 'border-b-2 border-[#00236f] text-[#00236f] bg-white'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          السجل التاريخي ({historyLoans.length})
        </button>
      </div>

      {/* Tab 1: Active Loans */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {activeLoans.length > 0 ? (
            activeLoans.map((loan) => (
              <div
                key={loan.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-[#0284c7] transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                      {loan.assignedSerial}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{loan.token}</span>
                    {loan.status === 'overdue' && (
                      <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded">
                        متأخر عن موعد الإرجاع
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-[#00236f] mb-1">{loan.equipmentNameAr}</h3>
                  <p className="text-xs text-slate-600 mb-2">المشروع: {loan.projectTitle}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#0284c7]" />
                      <span>تاريخ الاستلام: {loan.pickupDate}</span>
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-slate-800">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>تاريخ الاستحقاق: {loan.dueDate}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setExtensionModalLoan(loan);
                      setExtensionSuccess(false);
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3.5 py-2 rounded transition"
                  >
                    طلب تمديد
                  </button>
                  <button
                    onClick={() => setSelectedBarcodeLoan(loan)}
                    className="bg-[#00236f] hover:bg-[#0284c7] text-white text-xs font-semibold px-3.5 py-2 rounded transition flex items-center gap-1.5"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>بطاقة العهدة</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 text-center py-12 px-4">
              <Layers className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">لا توجد عهد نشطة في حيازتك حالياً</p>
              <p className="text-xs text-slate-500 mt-1">تصفح الكتالوج لتقديم طلب استعارة لأجهزتك المعملية</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Ready for Pickup */}
      {activeTab === 'ready' && (
        <div className="space-y-4">
          {readyLoans.length > 0 ? (
            readyLoans.map((loan) => (
              <div
                key={loan.id}
                className="bg-white rounded-xl border-2 border-[#0284c7]/40 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284c7] bg-[#e0f2fe] px-2.5 py-0.5 rounded mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>معتمد من المشرف · جاهز للاستلام الآن</span>
                  </div>
                  <h3 className="text-base font-bold text-[#00236f] mb-1">{loan.equipmentNameAr}</h3>
                  <p className="text-xs text-slate-600 mb-1">المشروع: {loan.projectTitle}</p>
                  <p className="text-xs text-slate-500 font-mono">رمز الاستلام: {loan.token}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedBarcodeLoan(loan)}
                    className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold px-4 py-2.5 rounded transition flex items-center gap-1.5 shadow"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>إظهار باركود الاستلام للشباك</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 text-center py-12 px-4">
              <CheckCircle2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">لا توجد أجهزة بانتظار الاستلام</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Pending Approval */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {pendingLoans.length > 0 ? (
            pendingLoans.map((loan) => (
              <div
                key={loan.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded mb-2">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                    <span>قيد مراجعة المشرف الأكاديمي</span>
                  </div>
                  <h3 className="text-base font-bold text-[#00236f] mb-1">{loan.equipmentNameAr}</h3>
                  <p className="text-xs text-slate-600 mb-1">المشروع: {loan.projectTitle}</p>
                  <p className="text-xs text-slate-500">المشرف: {loan.supervisorName}</p>
                </div>

                <div className="text-xs text-slate-400 font-mono shrink-0">
                  تاريخ التقديم: {loan.requestDate}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 text-center py-12 px-4">
              <p className="text-sm font-bold text-slate-700">لا توجد طلبات معلقة للمراجعة</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {historyLoans.length > 0 ? (
            historyLoans.map((loan) => (
              <div
                key={loan.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm opacity-80 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="text-xs font-mono text-slate-400">{loan.token}</div>
                  <h4 className="text-sm font-bold text-slate-700">{loan.equipmentNameAr}</h4>
                  <div className="text-xs text-slate-500">
                    الحالة: {loan.status === 'returned_cleared' ? 'تم الإرجاع وإبراء الذمة' : 'مرفوض'}
                  </div>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {loan.returnDate || loan.requestDate}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 text-center py-12 px-4">
              <p className="text-sm font-bold text-slate-700">سجل الاستعارات السابقة فارغ</p>
            </div>
          )}
        </div>
      )}

      {/* Barcode Pickup Modal */}
      {selectedBarcodeLoan && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setSelectedBarcodeLoan(null)}
              className="absolute top-4 end-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 bg-[#0284c7]/10 text-[#0284c7] rounded-full flex items-center justify-center mx-auto mb-3">
              <QrCode className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-[#00236f] mb-1">بطاقة استلام العهدة المعملية</h3>
            <p className="text-xs text-slate-500 mb-4">
              قدم هذا الباركود لموظف شباك الاستلام لتأكيد هويتك واستلام الجهاز
            </p>

            {/* Generated Simulated Barcode */}
            <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 mb-4 flex flex-col items-center">
              <div className="h-16 w-56 flex items-center justify-between gap-1 px-2 bg-white rounded border border-slate-300">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-12 ${
                      i % 3 === 0 ? 'w-1 bg-black' : i % 2 === 0 ? 'w-0.5 bg-black' : 'w-1.5 bg-black'
                    }`}
                  />
                ))}
              </div>
              <div className="font-mono font-bold text-sm text-[#00236f] mt-2">
                {selectedBarcodeLoan.token}
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded text-start mb-4 space-y-1">
              <div><strong>الجهاز:</strong> {selectedBarcodeLoan.equipmentNameAr}</div>
              <div><strong>المستعير:</strong> {selectedBarcodeLoan.studentNameAr}</div>
              <div><strong>تاريخ الاستحقاق:</strong> {selectedBarcodeLoan.dueDate}</div>
            </div>

            <button
              onClick={() => setSelectedBarcodeLoan(null)}
              className="w-full bg-[#00236f] hover:bg-[#0284c7] text-white text-xs font-bold py-2 rounded transition"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* Loan Extension Modal */}
      {extensionModalLoan && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setExtensionModalLoan(null)}
              className="absolute top-4 end-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-[#00236f] mb-1">طلب تمديد فترة استعارة العهدة</h3>
            <p className="text-xs text-slate-500 mb-4">
              الجهاز: {extensionModalLoan.equipmentNameAr}
            </p>

            {extensionSuccess ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-800">تم رفع طلب التمديد للمشرف</h4>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  سيتم إشعارك فور اعتماد التمديد عبر البريد الجامعي
                </p>
                <button
                  onClick={() => setExtensionModalLoan(null)}
                  className="bg-[#00236f] text-white text-xs font-semibold px-4 py-2 rounded"
                >
                  حسناً
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    الأيام الإضافية المطلوبة
                  </label>
                  <select className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs">
                    <option value="3">3 أيام إضافية</option>
                    <option value="7">7 أيام إضافية (أسبوع)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    مسوغ التمديد الأكاديمي
                  </label>
                  <textarea
                    rows={3}
                    placeholder="بيان سبب الحاجة لتمديد العهدة ومرحلة المشروع الحالية..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-[#0284c7]"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setExtensionSuccess(true)}
                    className="flex-1 bg-[#00236f] hover:bg-[#0284c7] text-white text-xs font-bold py-2 rounded transition"
                  >
                    إرسال طلب التمديد
                  </button>
                  <button
                    onClick={() => setExtensionModalLoan(null)}
                    className="bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2 rounded"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
