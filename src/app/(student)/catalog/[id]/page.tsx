'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useBorrowHubStore } from '@/lib/store';
import { 
  ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, 
  Clock, MapPin, Check, Send, CheckCircle
} from 'lucide-react';

export default function EquipmentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { equipment, submitLoanRequest } = useBorrowHubStore();

  const id = params?.id as string;
  const item = equipment.find((e) => e.id === id) || equipment[0];

  const [projectTitle, setProjectTitle] = useState('');
  const [supervisorName, setSupervisorName] = useState('د. عبد الله الشمري');
  const [durationDays, setDurationDays] = useState(item.maxLoanDays);
  const [studentName, setStudentName] = useState('عمر خالد المنصور');
  const [submittedToken, setSubmittedToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const loan = submitLoanRequest({
        equipmentId: item.id,
        projectTitle,
        supervisorName,
        durationDays,
        studentNameAr: studentName,
      });

      setIsSubmitting(false);
      if (loan) {
        setSubmittedToken(loan.token);
      }
    }, 400);
  };

  const isAvailable = item.availableQuantity > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb Bar */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link href="/catalog" className="hover:text-[#00236f] flex items-center gap-1 font-medium">
          <ArrowRight className="w-3.5 h-3.5" />
          <span>الكتالوج</span>
        </Link>
        <span>/</span>
        <span className="text-slate-400">{item.categoryLabelAr}</span>
        <span>/</span>
        <span className="text-[#00236f] font-semibold">{item.nameAr}</span>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Media, Specifications & Safety */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Photo Card */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="relative w-full h-80 sm:h-96 bg-slate-100">
              <Image
                src={item.imageUrl}
                alt={item.nameAr}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 start-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold shadow ${
                    isAvailable ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>{isAvailable ? `متوفر (${item.availableQuantity} أجهزة)` : 'محجوز بالكامل'}</span>
                </span>
              </div>
              <div className="absolute top-4 end-4">
                <span className="bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 rounded text-xs font-mono">
                  {item.code}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span>{item.manufacturer}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0284c7]" />
                  <span>{item.labLocation}</span>
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-[#00236f] mb-1">{item.nameAr}</h1>
              <p className="text-xs font-mono text-slate-500 mb-4">{item.nameEn}</p>
              <p className="text-sm text-slate-700 leading-relaxed">{item.descriptionAr}</p>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-base font-bold text-[#00236f] mb-4 pb-2 border-b border-slate-100">
              المواصفات الفنية المعتمدة
            </h2>
            <div className="divide-y divide-slate-100">
              {item.specs.map((spec, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-3 py-2.5 px-3 text-xs ${
                    idx % 2 === 0 ? 'bg-[#f7f9fb]/60' : 'bg-white'
                  }`}
                >
                  <span className="text-slate-500 font-medium">{spec.label}</span>
                  <span className="col-span-2 font-semibold text-slate-800 font-mono">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Accessories Checklist */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-base font-bold text-[#00236f] mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>الملحقات المشمولة بحقيبة العهدة</span>
            </h2>
            <p className="text-xs text-slate-500 mb-3">
              يلتزم الطالب بإعادة جميع الملحقات المذكورة أدناه عند انتهاء فترة الاستعارة بحالتها الأصلية:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {item.accessories.map((acc, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded border border-slate-200">
                  <Check className="w-4 h-4 text-[#0284c7] shrink-0" />
                  <span>{acc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Safety Guidelines */}
          <div className="bg-[#fef3c7]/40 rounded-xl border border-[#fde68a] p-5">
            <h3 className="text-xs font-bold text-[#92400e] mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-[#b45309]" />
              <span>تعليمات السلامة المعملية ومسؤولية العهدة</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-[#78350f]">
              {item.safetyGuidelines.map((g, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span>•</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Sticky Booking Rail */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm sticky top-24">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-[#00236f]">حجز طلب استعارة</h2>
              <span className="text-xs bg-[#e0f2fe] text-[#0369a1] px-2 py-0.5 rounded font-mono font-semibold">
                SCR-02
              </span>
            </div>

            {submittedToken ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#00236f] mb-1">تم إرسال طلب الاستعارة!</h3>
                <p className="text-xs text-slate-500 mb-4">
                  تم قيد الطلب بنجاح وهو بانتظار اعتماد المشرف. رمز التتبع الخاص بك هو:
                </p>
                <div className="bg-slate-100 p-3 rounded-lg border border-slate-300 font-mono font-bold text-sm text-[#00236f] mb-4">
                  {submittedToken}
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/student/loans"
                    className="w-full bg-[#00236f] hover:bg-[#0284c7] text-white text-xs font-semibold py-2 rounded transition"
                  >
                    عرض في لوحة استعاراتي
                  </Link>
                  <button
                    onClick={() => setSubmittedToken(null)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium py-2 rounded transition"
                  >
                    تقديم طلب آخر
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Student Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">اسم الطالب المستعير</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0284c7] outline-none"
                  />
                </div>

                {/* Project Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    عنوان المشروع أو مسوغ الاستعارة <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: مشروع تخرج نظم الروبوتات الذكية"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0284c7] outline-none"
                  />
                </div>

                {/* Academic Supervisor */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">المشرف الأكاديمي المعتمد</label>
                  <input
                    type="text"
                    required
                    value={supervisorName}
                    onChange={(e) => setSupervisorName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0284c7] outline-none"
                  />
                </div>

                {/* Duration Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>مدة الاستعارة المطلوبة</span>
                    <span className="font-mono text-[#0284c7]">{durationDays} أيام</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={item.maxLoanDays}
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full accent-[#00236f] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>يوم واحد</span>
                    <span>الحد الأقصى ({item.maxLoanDays} أيام)</span>
                  </div>
                </div>

                {/* Policy Notice */}
                <div className="bg-slate-50 p-3 rounded border border-slate-200 text-[11px] text-slate-600 space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00236f]" />
                    <span>شروط الاستلام والإرجاع:</span>
                  </div>
                  <p>• الاستلام يتم من شباك المعامل ببطاقة الطالب الجامعية.</p>
                  <p>• تأخير الإرجاع يترتب عليه إنذار أكاديمي وغرامة يومية.</p>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={!isAvailable || isSubmitting}
                  className={`w-full py-2.5 rounded text-xs font-bold text-white transition flex items-center justify-center gap-2 ${
                    isAvailable && !isSubmitting
                      ? 'bg-[#00236f] hover:bg-[#0284c7] shadow-sm'
                      : 'bg-slate-300 cursor-not-allowed text-slate-500'
                  }`}
                >
                  {isSubmitting ? (
                    <span>جاري تسجيل الطلب...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>تأكيد طلب الاستعارة</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
