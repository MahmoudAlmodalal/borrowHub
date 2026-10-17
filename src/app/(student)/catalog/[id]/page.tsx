'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useBorrowHubStore } from '@/lib/store';
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  User,
  BookOpen,
  Send,
  Sparkles,
  QrCode,
  FileCheck,
} from 'lucide-react';

export default function EquipmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const equipmentId = params.id as string;
  const { equipment, requestLoan, currentRole, setRole } = useBorrowHubStore();

  const item = equipment.find((eq) => eq.id === equipmentId) || equipment[0];

  // Request form state
  const [studentName, setStudentName] = useState('عمر خالد المنصور');
  const [studentIdNumber, setStudentIdNumber] = useState('441012891');
  const [college, setCollege] = useState('كلية الهندسة');
  const [department, setDepartment] = useState('الهندسة الكهربائية والحاسبات');
  const [projectTitle, setProjectTitle] = useState('مشروع التخرج: تصميم نظام تحكم ذكي بالطاقة');
  const [supervisorName, setSupervisorName] = useState('د. عبد الله الشمري');
  const [notes, setNotes] = useState('');
  const [daysCount, setDaysCount] = useState(item.maxLoanDays || 14);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAvailable = item.availableQuantity > 0;

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const due = new Date();
    due.setDate(due.getDate() + Number(daysCount));
    const dueDateStr = due.toISOString().split('T')[0];

    setTimeout(() => {
      requestLoan({
        studentId: 'std-101',
        studentNameAr: studentName,
        studentNameEn: 'Omar Khalid',
        college,
        department,
        equipmentId: item.id,
        equipmentNameAr: item.nameAr,
        dueDate: dueDateStr,
        projectTitle,
        supervisorName,
        notes: notes || undefined,
      });

      setIsSubmitting(false);
      // Route user to loans portal to observe the created request
      router.push('/loans');
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6" dir="rtl">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-[#00236f] transition">
          الرئيسية
        </Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-[#00236f] transition">
          كتالوج الأجهزة
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold truncate max-w-xs sm:max-w-md">
          {item.nameAr}
        </span>
      </nav>

      {/* Role Notice Banner */}
      {currentRole === 'supervisor' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between gap-4 text-xs sm:text-sm text-amber-900">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              أنت تستعرض هذا العتاد بصفتك <strong>مشرف معمل</strong>. يمكنك مراجعة طلبات الاستعارة واعتمادها من طابور المراجعة.
            </span>
          </div>
          <Link
            href="/review"
            className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition whitespace-nowrap min-h-[36px] flex items-center"
          >
            الانتقال لطابور المراجعة
          </Link>
        </div>
      )}

      {currentRole === 'counter_tech' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between gap-4 text-xs sm:text-sm text-emerald-900">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              أنت تستعرض العتاد بصفتك <strong>فني شباك</strong>. يمكنك التحقق من توفر الأجهزة وشباك التسليم بالباركود.
            </span>
          </div>
          <Link
            href="/pickups"
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition whitespace-nowrap min-h-[36px] flex items-center"
          >
            الانتقال لشباك التسليم
          </Link>
        </div>
      )}

      {/* Main Grid: Details + Booking Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left/Main Column: Specs, Image, Guidelines (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Hero Card */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="relative w-full h-64 sm:h-80 bg-slate-100">
              <Image
                src={item.imageUrl}
                alt={item.nameAr}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute top-4 start-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-[#00236f]/90 text-white backdrop-blur-xs">
                  {item.categoryLabelAr}
                </span>
                <span
                  className={`px-3 py-1 rounded-md text-xs font-bold text-white ${
                    isAvailable ? 'bg-emerald-600' : 'bg-rose-600'
                  }`}
                >
                  {isAvailable ? `${item.availableQuantity} وحدات متاحة` : 'محجوز بالكامل'}
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span className="font-mono bg-slate-100 px-2 py-1 rounded">
                  كود الأصل: {item.code}
                </span>
                <span>المُصنّع: {item.manufacturer}</span>
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {item.nameAr}
                </h1>
                <p className="text-sm text-slate-500 font-mono mt-1">
                  {item.nameEn}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {item.descriptionAr}
              </p>

              {/* Lab Location & Duration Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                  <MapPin className="w-4 h-4 text-[#0284c7] shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">المقر المعملي:</span>
                    <strong className="text-slate-800">{item.labLocation}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                  <Clock className="w-4 h-4 text-[#0284c7] shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">المدة القصوى المسموحة:</span>
                    <strong className="text-slate-800">{item.maxLoanDays} يوماً دراسياً</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-3">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0284c7]" />
              <span>المواصفات الفنية المعتمدة</span>
            </h3>

            <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
              {item.specs.map((spec, i) => (
                <div key={i} className="flex items-center justify-between p-3 text-xs sm:text-sm">
                  <span className="text-slate-500">{spec.label}</span>
                  <span className="font-semibold text-slate-900 font-mono" dir="ltr">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Included Accessories */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-3">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>الملحقات المشمولة مع العهدة (يتم مطابقتها عند الفحص)</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
              {item.accessories.map((acc, i) => (
                <li key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{acc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Safety Guidelines */}
          <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 sm:p-6 space-y-3 text-amber-950">
            <h3 className="font-bold text-sm sm:text-base flex items-center gap-2 text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>إرشادات السلامة والمسؤولية الأكاديمية</span>
            </h3>
            <ul className="space-y-2 text-xs leading-relaxed text-amber-900/90 list-disc list-inside">
              {item.safetyGuidelines.map((guide, i) => (
                <li key={i}>{guide}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Loan Request Booking Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-md sticky top-20">
            <div className="border-b border-slate-100 pb-4 mb-4">
              <span className="text-[11px] font-bold text-[#0284c7] uppercase tracking-wider block">
                بوابة الحجز الذاتي للطلاب
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                تقديم طلب استعارة معملية
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                يتطلب موافقة المشرف الأكاديمي ثم استلام العهدة من الشباك المعملي.
              </p>
            </div>

            <form onSubmit={handleSubmitBooking} className="space-y-4">
              {/* Student info fields */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  اسم الطالب / الباحث:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-3" />
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                    className="w-full ps-9 pe-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#0284c7] focus:outline-none min-h-[42px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    الرقم الجامعي:
                  </label>
                  <input
                    type="text"
                    value={studentIdNumber}
                    onChange={(e) => setStudentIdNumber(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm font-mono focus:ring-2 focus:ring-[#0284c7] focus:outline-none min-h-[42px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    مدة الاستعارة (أيام):
                  </label>
                  <select
                    value={daysCount}
                    onChange={(e) => setDaysCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#0284c7] focus:outline-none min-h-[42px]"
                  >
                    <option value={3}>3 أيام</option>
                    <option value={7}>7 أيام (أسبوع)</option>
                    <option value={14}>14 يوماً (أسبوعان)</option>
                    <option value={21}>21 يوماً (3 أسابيع)</option>
                    <option value={30}>30 يوماً (شهر كامل)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    الكلية:
                  </label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#0284c7] focus:outline-none min-h-[42px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    القسم الأكاديمي:
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#0284c7] focus:outline-none min-h-[42px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  عنوان مشروع التخرج / البحث المدعوم:
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  required
                  placeholder="اكتب عنوان البحث الأكاديمي أو المقرر..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#0284c7] focus:outline-none min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  المشرف الأكاديمي على المشروع:
                </label>
                <input
                  type="text"
                  value={supervisorName}
                  onChange={(e) => setSupervisorName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#0284c7] focus:outline-none min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ملاحظات أو ملحقات إضافية مطلوبة:
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="اكتب أي متطلبات خاصة للتجربة المعملية..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting || !isAvailable}
                className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition shadow-sm min-h-[48px] ${
                  isAvailable
                    ? 'bg-[#00236f] hover:bg-[#001b55] text-white cursor-pointer'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <span>جاري إرسال الطلب...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>تأكيد إرسال طلب الاستعارة للمشرف</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-slate-400 text-center leading-normal">
                بإرسال الطلب أنت تقر بالالتزام بلائحة المحافظة على الأجهزة الجامعية وإرجاعها في الموعد المحدد.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
