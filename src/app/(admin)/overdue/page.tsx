'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBorrowHubStore } from '@/lib/store';
import { OverdueIncident } from '@/lib/types';
import {
  AlertTriangle,
  Phone,
  Mail,
  Clock,
  Check,
  Send,
  Ban,
  ShieldAlert,
  Sparkles,
  MessageSquare,
  AlertCircle,
  FileCheck,
  Building,
} from 'lucide-react';

export default function OverdueDashboardPage() {
  const { overdue, sendOverdueReminder, placeAcademicHold, removeAcademicHold } = useBorrowHubStore();
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);

  const selectedIncident =
    overdue.find((ov) => ov.id === selectedIncidentId) || overdue[0] || null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              لوحة متابعة المتأخرات والحجز الأكاديمي (Overdue & Holds)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            متابعة العهد المتأخرة، توثيق الإنذارات، وتطبيق الحجز الأكاديمي على الطلاب المتخلفين عن الإرجاع
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/returns"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition shadow-xs min-h-[44px]"
          >
            <span>شباك إرجاع العهد ←</span>
          </Link>
        </div>
      </div>

      {/* Escalation Policy Banner */}
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs sm:text-sm text-rose-950">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-sm text-rose-900">سياسة التصعيد المعملي المعتمدة بالجامعة:</h3>
            <p className="text-xs text-rose-800 mt-0.5">
              تأخير 1-3 أيام (إنذار SMS) ← تأخير 4-7 أيام (خطاب العمادة الرسمي) ← تأخير &gt; 7 أيام (إيقاف التسجيل وتطبيق الحجز الأكاديمي).
            </p>
          </div>
        </div>

        <span className="font-mono text-xs font-bold text-rose-800 bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200 shrink-0">
          إجمالي الحالات الحرجة: {overdue.length}
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left col: Incident cards list (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {overdue.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 space-y-2">
              <Check className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="text-xs font-bold">لا توجد أي متأخرات معملية مسجلة حالياً</p>
            </div>
          ) : (
            overdue.map((incident) => {
              const isSelected = selectedIncident?.id === incident.id;
              return (
                <div
                  key={incident.id}
                  onClick={() => setSelectedIncidentId(incident.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50/40 shadow-xs ring-1 ring-rose-500'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                      تأخير {incident.daysOverdue} يوماً
                    </span>
                    {incident.academicHoldPlaced && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-600 text-white flex items-center gap-1">
                        <Ban className="w-3 h-3" />
                        حجز أكاديمي نشط
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 mt-1">
                    {incident.studentNameAr}
                  </h4>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {incident.equipmentNameAr}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
                    <span>قيمة الأصل: <strong className="text-slate-700 font-mono">{incident.assetValueSar.toLocaleString()} ر.س</strong></span>
                    <span className="font-mono text-slate-500">استحقاق: {incident.dueDate}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right col: Case Dossier & Escalation Actions (7 cols) */}
        <div className="lg:col-span-7">
          {selectedIncident ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-rose-600">
                    ملف القضية: {selectedIncident.id}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 mt-0.5">
                    {selectedIncident.studentNameAr}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedIncident.college} | الرقم الجامعي: {selectedIncident.studentIdNumber}
                  </p>
                </div>

                <div className="text-end">
                  <span className="text-[11px] text-slate-400 block">فترة التأخير</span>
                  <span className="text-sm font-bold font-mono text-rose-600">
                    {selectedIncident.daysOverdue} يوماً
                  </span>
                </div>
              </div>

              {/* Equipment info */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div>العهدة المحتجزة: <strong className="text-slate-900">{selectedIncident.equipmentNameAr}</strong></div>
                <div>الرقم التسلسلي: <strong className="font-mono text-slate-900">{selectedIncident.assignedSerial}</strong></div>
                <div>قيمة الأصل التقديرية: <strong className="font-mono text-slate-900">{selectedIncident.assetValueSar.toLocaleString()} ريال سعودي</strong></div>
              </div>

              {/* Quick Communication Trigger buttons */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                  إرسال إنذار فوري وتوثيق المحاولة:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => sendOverdueReminder(selectedIncident.id, 'sms')}
                    className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition min-h-[44px]"
                  >
                    <MessageSquare className="w-4 h-4 text-[#0284c7]" />
                    <span>رسالة SMS فورية</span>
                  </button>

                  <button
                    onClick={() => sendOverdueReminder(selectedIncident.id, 'email')}
                    className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition min-h-[44px]"
                  >
                    <Mail className="w-4 h-4 text-amber-600" />
                    <span>إنذار بريد الكتروني</span>
                  </button>

                  <button
                    onClick={() => sendOverdueReminder(selectedIncident.id, 'phone')}
                    className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition min-h-[44px]"
                  >
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>توثيق اتصال هاتفي</span>
                  </button>
                </div>
              </div>

              {/* Academic Hold Action */}
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-rose-950 flex items-center gap-1.5">
                      <Ban className="w-4 h-4 text-rose-600" />
                      <span>الحجز الأكاديمي (إيقاف الخدمات الجامعية):</span>
                    </h4>
                    <p className="text-[11px] text-rose-800 mt-0.5">
                      يمنع الطالب من تسجيل المقررات أو استلام وثيقة التخرج حتى تسليم العهدة.
                    </p>
                  </div>
                </div>

                {selectedIncident.academicHoldPlaced ? (
                  <button
                    onClick={() => removeAcademicHold(selectedIncident.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs transition shadow-xs min-h-[42px]"
                  >
                    إلغاء الحجز الأكاديمي وإعادة تفعيل الخدمات
                  </button>
                ) : (
                  <button
                    onClick={() => placeAcademicHold(selectedIncident.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition shadow-xs min-h-[42px]"
                  >
                    تطبيق الحجز الأكاديمي الفوري في البوابة
                  </button>
                )}
              </div>

              {/* Contact History Log */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-700">
                  سجل الإنذارات والمتابعات الرسمية ({selectedIncident.contactAttempts.length}):
                </h4>
                <div className="space-y-1.5 max-h-44 overflow-y-auto">
                  {selectedIncident.contactAttempts.map((att, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-slate-400">{att.date}</span>
                        <span className="text-slate-700">{att.note}</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#0284c7] bg-sky-50 px-2 py-0.5 rounded">
                        {att.method.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
              اختر حالة متأخرة لمراجعة الإجراءات
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
