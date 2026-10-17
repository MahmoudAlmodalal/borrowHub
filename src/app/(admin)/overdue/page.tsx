'use client';

import React, { useState } from 'react';
import { useBorrowHubStore } from '@/lib/store';
import { OverdueIncident } from '@/lib/types';
import { 
  AlertTriangle, ShieldAlert, Phone, Mail, Clock, Check, 
  Send, AlertCircle, Ban, History, DollarSign
} from 'lucide-react';

export default function OverdueDashboardPage() {
  const { overdue, toggleAcademicHold, addContactAttempt } = useBorrowHubStore();
  const [selectedIncident, setSelectedIncident] = useState<OverdueIncident | null>(null);
  const [reminderNote, setReminderNote] = useState('يرجى الحضور فوراً إلى شباك المعامل لتسليم العهدة لتفادي الغرامات والحظر الأكاديمي.');
  const [contactMethod, setContactMethod] = useState<'sms' | 'email' | 'phone'>('sms');
  const [notificationSent, setNotificationSent] = useState(false);

  const tier1Count = overdue.filter((o) => o.daysOverdue <= 3).length;
  const tier2Count = overdue.filter((o) => o.daysOverdue > 3 && o.daysOverdue <= 7).length;
  const tier3Count = overdue.filter((o) => o.daysOverdue > 7).length;

  const handleSendReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIncident) return;
    addContactAttempt(selectedIncident.id, contactMethod, reminderNote);
    setNotificationSent(true);
    setTimeout(() => {
      setNotificationSent(false);
      setSelectedIncident(null);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-50 border border-red-200 text-red-800 text-xs font-semibold mb-1">
            <span>SCR-10</span>
            <span>·</span>
            <span>لوحة إنذارات العتاد المتأخر وإدارة المخاطر</span>
          </div>
          <h1 className="text-2xl font-bold text-[#00236f]">رصد العهد المتأخرة وإجراءات التصعيد</h1>
          <p className="text-xs text-slate-500">
            متابعة فورية للأجهزة المتجاوزة لمهلة الإرجاع وتطبيق الإجراءات الأكاديمية والحظر النظامي
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-red-100 text-red-800 px-3 py-1.5 rounded-full font-bold">
            {overdue.length} حالات متأخرة تستوجب التدخل
          </span>
        </div>
      </div>

      {/* Escalation Severity Tiers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-amber-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              المستوى الأول (1–3 أيام)
            </span>
            <span className="font-mono text-xl font-bold text-amber-700">{tier1Count}</span>
          </div>
          <p className="text-xs text-slate-600">
            إشعار تذكيري آلي عبر البريد الجامعي والرسائل النصية SMS
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-orange-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-orange-800 bg-orange-50 px-2 py-0.5 rounded">
              المستوى الثاني (4–7 أيام)
            </span>
            <span className="font-mono text-xl font-bold text-orange-700">{tier2Count}</span>
          </div>
          <p className="text-xs text-slate-600">
            إنذار خطي رسمي، اتصال مباشر بالهاتف، وتجميد حجز أجهزة جديدة
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-red-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-red-800 bg-red-50 px-2 py-0.5 rounded">
              المستوى الثالث (&gt; 7 أيام)
            </span>
            <span className="font-mono text-xl font-bold text-red-700">{tier3Count}</span>
          </div>
          <p className="text-xs text-slate-600">
            حظر أكاديمي SIS، إيقاف نتائج الاختبارات، وتغريم القيمة الدفترية
          </p>
        </div>
      </div>

      {/* Overdue Incident Ledger Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm mb-8">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#00236f]">جدول المتابعة والإنذارات النشطة</h2>
          <span className="text-xs text-slate-400 font-mono">آخر تحديث: قبل دقائق</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <th className="py-3 px-4 text-start">الطالب المستعير</th>
                <th className="py-3 px-4 text-start">المعدة والرقم التسلسلي</th>
                <th className="py-3 px-4 text-start">القيمة الدفترية</th>
                <th className="py-3 px-4 text-start">تاريخ الاستحقاق</th>
                <th className="py-3 px-4 text-start">أيام التأخير</th>
                <th className="py-3 px-4 text-start">الحظر الأكاديمي</th>
                <th className="py-3 px-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {overdue.map((inc, idx) => (
                <tr
                  key={inc.id}
                  className={`hover:bg-slate-50 transition ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-[#f7f9fb]/40'
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800">{inc.studentNameAr}</div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {inc.studentIdNumber} · {inc.studentPhone}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#00236f]">{inc.equipmentNameAr}</div>
                    <div className="text-[11px] font-mono text-slate-400">{inc.assignedSerial}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                    {inc.assetValueSar.toLocaleString()} ر.س
                  </td>
                  <td className="py-3.5 px-4 font-mono text-red-600 font-bold whitespace-nowrap">
                    {inc.dueDate}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded border border-red-200">
                      {inc.daysOverdue} أيام تأخير
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleAcademicHold(inc.id)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded transition flex items-center gap-1 ${
                        inc.academicHoldPlaced
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Ban className="w-3 h-3" />
                      <span>{inc.academicHoldPlaced ? 'قيد الحظر الأكاديمي' : 'تفعيل الحظر'}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => setSelectedIncident(inc)}
                      className="bg-[#00236f] hover:bg-[#0284c7] text-white text-[11px] font-bold px-3 py-1.5 rounded transition inline-flex items-center gap-1 shadow-sm"
                    >
                      <Send className="w-3 h-3" />
                      <span>إرسال إنذار</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Escalation & Notification Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setSelectedIncident(null)}
              className="absolute top-4 end-4 text-slate-400 hover:text-slate-600 text-lg"
            >
              ✕
            </button>

            <h3 className="text-base font-bold text-[#00236f] mb-1">
              إرسال إنذار أكاديمي رسمي للطالب المتأخر
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              الطالب: <strong>{selectedIncident.studentNameAr}</strong> ({selectedIncident.studentPhone})
            </p>

            {notificationSent ? (
              <div className="text-center py-6">
                <Check className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-800">تم إرسال الإنذار بنجاح</h4>
                <p className="text-xs text-slate-500 mt-1">
                  تم توثيق المحاولة في سجل التواصل المعملي
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendReminder} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    قناة التواصل المباشر
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setContactMethod('sms')}
                      className={`p-2 rounded text-xs font-bold border transition ${
                        contactMethod === 'sms'
                          ? 'bg-[#00236f] text-white border-[#00236f]'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      رسالة نصية SMS
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactMethod('email')}
                      className={`p-2 rounded text-xs font-bold border transition ${
                        contactMethod === 'email'
                          ? 'bg-[#00236f] text-white border-[#00236f]'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      بريد جامعي رسمي
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactMethod('phone')}
                      className={`p-2 rounded text-xs font-bold border transition ${
                        contactMethod === 'phone'
                          ? 'bg-[#00236f] text-white border-[#00236f]'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      اتصال هاتفي
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">نص الإنذار:</label>
                  <textarea
                    rows={3}
                    value={reminderNote}
                    onChange={(e) => setReminderNote(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-[#0284c7]"
                  />
                </div>

                {/* Historical Attempts */}
                <div>
                  <div className="text-[11px] font-bold text-slate-500 mb-1">سجل المحاولات السابقة:</div>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto bg-slate-50 p-2 rounded border border-slate-200 text-[11px] text-slate-600">
                    {selectedIncident.contactAttempts.map((att, i) => (
                      <div key={i} className="flex justify-between border-b border-slate-200/60 pb-1">
                        <span>• [{att.method.toUpperCase()}] {att.note}</span>
                        <span className="font-mono text-slate-400">{att.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 rounded transition"
                  >
                    تأكيد إرسال الإشعار وتوثيق السجل
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedIncident(null)}
                    className="bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2 rounded"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
