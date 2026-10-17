'use client';

import React, { useState } from 'react';
import { useBorrowHubStore } from '@/lib/store';
import { LoanRecord } from '@/lib/types';
import { 
  Scan, CheckCircle2, ShieldCheck, Star, FileText, Check, 
  Printer, AlertTriangle, ArrowRight, User
} from 'lucide-react';

export default function ReturnsInspectionPage() {
  const { loans, completeInspection } = useBorrowHubStore();
  const activeLoans = loans.filter(
    (l) => l.status === 'active_in_possession' || l.status === 'overdue'
  );

  const [scanQuery, setScanQuery] = useState('');
  const [selectedLoan, setSelectedLoan] = useState<LoanRecord | null>(activeLoans[0] || null);
  const [conditionGrade, setConditionGrade] = useState<'A' | 'B' | 'C' | 'Damaged'>('A');
  const [operationalStatus, setOperationalStatus] = useState('fully_operational');
  const [inspectionNotes, setInspectionNotes] = useState('تم فحص الجهاز وتجريبه كهربائياً، الملحقات كاملة والعمل ممتاز.');
  const [clearanceDone, setClearanceDone] = useState(false);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanQuery) return;
    const found = activeLoans.find(
      (l) =>
        l.token.toLowerCase().includes(scanQuery.toLowerCase()) ||
        l.assignedSerial.toLowerCase().includes(scanQuery.toLowerCase()) ||
        l.studentNameAr.includes(scanQuery)
    );
    if (found) {
      setSelectedLoan(found);
      setClearanceDone(false);
    }
  };

  const handleClearance = () => {
    if (!selectedLoan) return;
    completeInspection(selectedLoan.id, conditionGrade, inspectionNotes);
    setClearanceDone(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-[#00236f] text-white rounded-xl p-6 mb-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0284c7]/20 border border-[#0284c7]/40 text-[#5bb8fe] text-xs font-semibold mb-2">
            <span>SCR-09</span>
            <span>·</span>
            <span>شباك إرجاع وفحص العتاد والمعامل</span>
          </div>
          <h1 className="text-2xl font-bold">شباك فحص الأجهزة وإبراء الذمة (SCR-08)</h1>
          <p className="text-xs text-slate-300 mt-1">
            الفحص الفني الدقيق، مراجعة الأرقام التسلسلية، تقييم الحالة التشغيلية، وإبراء ذمة الطالب
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur p-3 rounded-lg border border-white/15 text-xs text-slate-200">
          <div>محطة الفحص: <strong className="text-white">مختبر الجودة والسلامة 104</strong></div>
          <div className="mt-1">فني الفحص المسؤول: <strong className="text-[#5bb8fe]">طارق العمري</strong></div>
        </div>
      </div>

      {/* Barcode Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6 shadow-sm">
        <form onSubmit={handleLookup} className="flex gap-3">
          <div className="relative flex-1">
            <Scan className="w-4 h-4 text-[#0284c7] absolute start-3 top-3" />
            <input
              type="text"
              placeholder="امسح باركود العهدة أو الرقم التسلسلي للجهاز المسترجع..."
              value={scanQuery}
              onChange={(e) => setScanQuery(e.target.value)}
              className="w-full ps-9 pe-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs sm:text-sm font-mono focus:ring-1 focus:ring-[#0284c7] outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-[#00236f] hover:bg-[#0284c7] text-white text-xs font-bold px-5 py-2 rounded transition flex items-center gap-1.5 shrink-0"
          >
            بحث
          </button>
        </form>
      </div>

      {/* Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Right Pane: Active Loans to Return */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 p-4 shadow-sm h-[640px] flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <h2 className="text-xs font-bold text-[#00236f]">العهد المفتوحة في حيازة الطلاب ({activeLoans.length})</h2>
            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold font-mono">
              في الحيازة
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pe-1">
            {activeLoans.length > 0 ? (
              activeLoans.map((loan) => {
                const isSelected = selectedLoan?.id === loan.id;
                return (
                  <div
                    key={loan.id}
                    onClick={() => {
                      setSelectedLoan(loan);
                      setClearanceDone(false);
                    }}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition ${
                      isSelected
                        ? 'bg-[#00236f] text-white border-[#00236f]'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono font-bold text-[11px]">{loan.assignedSerial}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? 'bg-white/20' : 'bg-slate-200'}`}>
                        استحقاق: {loan.dueDate}
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
                لا توجد عهد نشطة حالياً تستوجب الإرجاع
              </div>
            )}
          </div>
        </div>

        {/* Left Pane: Technical Inspection Protocol Sheet */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          {selectedLoan ? (
            <div>
              {/* Ticket Top */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-sm bg-slate-100 text-[#00236f] px-2.5 py-0.5 rounded">
                      {selectedLoan.assignedSerial}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {selectedLoan.token}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-[#00236f]">{selectedLoan.equipmentNameAr}</h2>
                </div>

                <div className="text-xs text-slate-500 text-end">
                  <div>المستعير: <strong className="text-slate-800">{selectedLoan.studentNameAr}</strong></div>
                  <div>الكلية: {selectedLoan.college}</div>
                </div>
              </div>

              {clearanceDone ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center my-6">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-900 mb-1">
                    تم إبراء ذمة الطالب وإعادة العهدة للمخزون!
                  </h3>
                  <p className="text-xs text-emerald-700 mb-4 max-w-md mx-auto">
                    تم إغلاق ملف الاستعارة رسمياً، تحديث سجلات القيد الأكاديمي، وإعادة إتاحة الجهاز في الكتالوج العام.
                  </p>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 bg-[#00236f] hover:bg-[#0284c7] text-white text-xs font-bold px-5 py-2 rounded transition"
                  >
                    <Printer className="w-4 h-4" />
                    <span>طباعة شهادة إبراء الذمة المعملية</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Step 1: Physical Match */}
                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs">
                    <div className="font-bold text-[#00236f] mb-1">1. مطابقة الرقم التسلسلي واللوحة التعريفية:</div>
                    <div className="flex items-center gap-4 text-slate-700">
                      <span>الرقم المسجل بالعهد: <strong className="font-mono text-[#00236f]">{selectedLoan.assignedSerial}</strong></span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        <span>مطابق للأصل</span>
                      </span>
                    </div>
                  </div>

                  {/* Step 2: Operational Status */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      2. الحالة الفنية والتشغيلية بعد الاختبار:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setOperationalStatus('fully_operational')}
                        className={`p-2.5 rounded text-xs font-bold border transition text-center ${
                          operationalStatus === 'fully_operational'
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        يعمل بكفاءة تامة
                      </button>
                      <button
                        type="button"
                        onClick={() => setOperationalStatus('minor_maintenance')}
                        className={`p-2.5 rounded text-xs font-bold border transition text-center ${
                          operationalStatus === 'minor_maintenance'
                            ? 'bg-amber-50 border-amber-400 text-amber-800'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        يحتاج صيانة خفيفة
                      </button>
                      <button
                        type="button"
                        onClick={() => setOperationalStatus('damaged')}
                        className={`p-2.5 rounded text-xs font-bold border transition text-center ${
                          operationalStatus === 'damaged'
                            ? 'bg-red-50 border-red-400 text-red-800'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        تالف / مفقود جزئياً
                      </button>
                    </div>
                  </div>

                  {/* Step 3: Cosmetic Rating */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      3. التقييم الظاهري وخلو الهيكل من الصدمات:
                    </label>
                    <div className="flex gap-2">
                      {(['A', 'B', 'C', 'Damaged'] as const).map((grade) => (
                        <button
                          key={grade}
                          type="button"
                          onClick={() => setConditionGrade(grade)}
                          className={`flex-1 py-2 rounded text-xs font-bold border transition ${
                            conditionGrade === grade
                              ? 'bg-[#00236f] text-white border-[#00236f]'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {grade === 'A' ? 'ممتاز (A)' : grade === 'B' ? 'جيد جداً (B)' : grade === 'C' ? 'مقبول (C)' : 'متضرر'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 4: Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      4. تقرير الفحص وملاحظات مهندس المعمل:
                    </label>
                    <textarea
                      rows={2}
                      value={inspectionNotes}
                      onChange={(e) => setInspectionNotes(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-[#0284c7]"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-24 text-slate-400 text-xs">
              حدد جهازاً مسترجعاً من القائمة لفحصه وإبراء الذمة
            </div>
          )}

          {/* Action Footer */}
          {selectedLoan && !clearanceDone && (
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                الفاحص: طارق العمري (رئيس فنيي المعامل)
              </span>

              <button
                onClick={handleClearance}
                className="bg-[#00236f] hover:bg-[#0284c7] text-white text-xs font-bold px-6 py-2.5 rounded transition flex items-center gap-2 shadow"
              >
                <Check className="w-4 h-4" />
                <span>إبراء ذمة الطالب واعتماد الاستلام</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
