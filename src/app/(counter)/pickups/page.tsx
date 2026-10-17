'use client';

import React, { useState } from 'react';
import { useBorrowHubStore } from '@/lib/store';
import { LoanRecord } from '@/lib/types';
import { 
  Scan, CheckCircle2, User, ShieldCheck, Printer, Check, 
  Search, ArrowLeft, AlertCircle, Box
} from 'lucide-react';

export default function PickupsCounterPage() {
  const { loans, dispatchLoanPickup } = useBorrowHubStore();
  const readyLoans = loans.filter((l) => l.status === 'approved_ready_for_pickup');

  const [scanQuery, setScanQuery] = useState('');
  const [selectedLoan, setSelectedLoan] = useState<LoanRecord | null>(readyLoans[0] || null);
  const [assignedSerial, setAssignedSerial] = useState('SN-DEV-88910');
  const [checkedAccessories, setCheckedAccessories] = useState<Record<string, boolean>>({
    cables: true,
    manual: true,
    bag: true,
  });
  const [dispatchSuccess, setDispatchSuccess] = useState(false);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanQuery) return;
    const found = readyLoans.find(
      (l) => l.token.toLowerCase().includes(scanQuery.toLowerCase()) || l.studentNameAr.includes(scanQuery)
    );
    if (found) {
      setSelectedLoan(found);
      setDispatchSuccess(false);
    }
  };

  const handleSelectLoan = (loan: LoanRecord) => {
    setSelectedLoan(loan);
    setDispatchSuccess(false);
  };

  const handleDispatch = () => {
    if (!selectedLoan) return;
    dispatchLoanPickup(selectedLoan.id, assignedSerial);
    setDispatchSuccess(true);
  };

  const allAccessoriesChecked = checkedAccessories.cables && checkedAccessories.manual && checkedAccessories.bag;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Counter Desk Header */}
      <div className="bg-[#00236f] text-white rounded-xl p-6 mb-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0284c7]/20 border border-[#0284c7]/40 text-[#5bb8fe] text-xs font-semibold mb-2">
            <span>SCR-08</span>
            <span>·</span>
            <span>شباك تسليم واستلام المعدات المعتمدة</span>
          </div>
          <h1 className="text-2xl font-bold">شباك تسليم العهد المعملية (محطة 1)</h1>
          <p className="text-xs text-slate-300 mt-1">
            التحقق من بطاقة الطالب، مطابقة الأرقام التسلسلية، وتسليم العهد المعتمدة رسمياً
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur p-3 rounded-lg border border-white/15 text-xs text-slate-200">
          <div>محطة الخدمة: <strong className="text-white">شباك الهندسة الكهربائية A</strong></div>
          <div className="mt-1">فني المعمل المسؤول: <strong className="text-[#5bb8fe]">سامي الحارثي</strong></div>
        </div>
      </div>

      {/* Barcode Search & Fast-Lookup Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6 shadow-sm">
        <form onSubmit={handleLookup} className="flex gap-3">
          <div className="relative flex-1">
            <Scan className="w-4 h-4 text-[#0284c7] absolute start-3 top-3" />
            <input
              type="text"
              placeholder="امسح باركود الطالب أو اكتب رمز الاستلام (مثال: LOAN-2026-9044)..."
              value={scanQuery}
              onChange={(e) => setScanQuery(e.target.value)}
              className="w-full ps-9 pe-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs sm:text-sm font-mono focus:ring-1 focus:ring-[#0284c7] outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-[#00236f] hover:bg-[#0284c7] text-white text-xs font-bold px-5 py-2 rounded transition flex items-center gap-1.5 shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>بحث بالباركود</span>
          </button>
        </form>
      </div>

      {/* Two Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Right Column: Queue of Approved Pickups */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 p-4 shadow-sm h-[600px] flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <h2 className="text-xs font-bold text-[#00236f]">الطلبات المعتمدة للاستلام اليوم ({readyLoans.length})</h2>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
              جاهزة للشباك
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pe-1">
            {readyLoans.length > 0 ? (
              readyLoans.map((loan) => {
                const isSelected = selectedLoan?.id === loan.id;
                return (
                  <div
                    key={loan.id}
                    onClick={() => handleSelectLoan(loan)}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition ${
                      isSelected
                        ? 'bg-[#00236f] text-white border-[#00236f]'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono font-bold text-[11px]">{loan.token}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? 'bg-white/20' : 'bg-slate-200'}`}>
                        {loan.dueDate}
                      </span>
                    </div>
                    <div className="font-bold mb-0.5">{loan.equipmentNameAr}</div>
                    <div className={`text-[11px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      المستعير: {loan.studentNameAr}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 text-slate-400 text-xs">
                لا توجد طلبات معتمدة بانتظار الاستلام حالياً
              </div>
            )}
          </div>
        </div>

        {/* Left Column: Active Handover Ticket */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          {selectedLoan ? (
            <div>
              {/* Ticket Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-slate-100 gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-sm bg-slate-100 text-[#00236f] px-2.5 py-0.5 rounded">
                      {selectedLoan.token}
                    </span>
                    <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      معتمد من المشرف الأكاديمي
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-[#00236f]">{selectedLoan.equipmentNameAr}</h2>
                </div>

                <div className="text-xs text-slate-500 text-end">
                  <div>تاريخ الاستحقاق: <strong className="text-slate-800 font-mono">{selectedLoan.dueDate}</strong></div>
                  <div>المشرف: {selectedLoan.supervisorName}</div>
                </div>
              </div>

              {/* Success Notification */}
              {dispatchSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center my-6">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-emerald-900 mb-1">
                    تم تأكيد تسليم العهدة للطالب بنجاح!
                  </h3>
                  <p className="text-xs text-emerald-700 mb-4">
                    تم خصم الجهاز من المخزون المتاح، وتحديث حالة العهدة إلى &quot;في حيازة الطالب&quot;.
                  </p>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 bg-[#00236f] hover:bg-[#0284c7] text-white text-xs font-bold px-5 py-2 rounded transition"
                  >
                    <Printer className="w-4 h-4" />
                    <span>طباعة إيصال استلام العهدة الرسمي</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Student Dossier Quick Strip */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-[#00236f] text-sm">{selectedLoan.studentNameAr}</div>
                        <div className="text-slate-500">{selectedLoan.college} · {selectedLoan.department}</div>
                      </div>
                    </div>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 text-[11px]">
                      بطاقة الطالب مطابقة
                    </span>
                  </div>

                  {/* Serial Number Assignment */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      الرقم التسلسلي للوحدة المسلّمة (Serial Number / Barcode):
                    </label>
                    <input
                      type="text"
                      value={assignedSerial}
                      onChange={(e) => setAssignedSerial(e.target.value)}
                      placeholder="امسح باركود الجهاز الفعلي المسلم..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold text-[#00236f] focus:ring-1 focus:ring-[#0284c7] outline-none"
                    />
                  </div>

                  {/* Handover Checklist */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h3 className="text-xs font-bold text-[#00236f] mb-3 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#0284c7]" />
                      <span>قائمة فحص الملحقات الإلزامية قبل التسليم:</span>
                    </h3>
                    <div className="space-y-2 text-xs text-slate-700">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checkedAccessories.cables}
                          onChange={(e) =>
                            setCheckedAccessories({ ...checkedAccessories, cables: e.target.checked })
                          }
                          className="w-4 h-4 rounded text-[#00236f]"
                        />
                        <span>كوابل التغذية والمجسات الكهربائية الأصلية سليمة وخالية من القطع</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checkedAccessories.manual}
                          onChange={(e) =>
                            setCheckedAccessories({ ...checkedAccessories, manual: e.target.checked })
                          }
                          className="w-4 h-4 rounded text-[#00236f]"
                        />
                        <span>دليل السلامة وبطاقة المعايرة الدورية سارية المفعول</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checkedAccessories.bag}
                          onChange={(e) =>
                            setCheckedAccessories({ ...checkedAccessories, bag: e.target.checked })
                          }
                          className="w-4 h-4 rounded text-[#00236f]"
                        />
                        <span>حقيبة الحماية المبطنة والإسفنج الداخلي متكامل</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400 text-xs">
              حدد طلباً من القائمة أو امسح الباركود للبدء
            </div>
          )}

          {/* Action Footer */}
          {selectedLoan && !dispatchSuccess && (
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {!allAccessoriesChecked && 'يجب تحديد جميع بنود الفحص لتفعيل التسليم'}
              </span>

              <button
                onClick={handleDispatch}
                disabled={!allAccessoriesChecked}
                className={`text-xs font-bold px-6 py-2.5 rounded transition flex items-center gap-2 shadow ${
                  allAccessoriesChecked
                    ? 'bg-[#00236f] hover:bg-[#0284c7] text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>تأكيد التسليم وتسجيل العهدة رسمياً</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
