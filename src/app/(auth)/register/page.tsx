'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useBorrowHubStore } from '@/lib/store';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  FileCheck,
  ShieldCheck,
  UserPlus,
  Info,
  Sparkles,
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { students, showToast, setRole } = useBorrowHubStore();

  const [step, setStep] = useState<1 | 2>(1);
  const [fullNameAr, setFullNameAr] = useState('ريان عبد العزيز العبدلي');
  const [fullNameEn, setFullNameEn] = useState('Rayan Abdulaziz Al-Abdali');
  const [studentIdNumber, setStudentIdNumber] = useState('443015522');
  const [email, setEmail] = useState('s443015522@student.edu.sa');
  const [phone, setPhone] = useState('+966 54 991 3321');
  const [college, setCollege] = useState('كلية الهندسة');
  const [department, setDepartment] = useState('الهندسة الميكانيكية');
  const [academicYear, setAcademicYear] = useState('السنة الثالثة');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    showToast({
      type: 'success',
      title: 'تم إرسال طلب اعتماد الحساب الأكاديمي',
      message: 'تم إرسال بيانات البطاقة الجامعية إلى عمادة الكلية ولجنة التحقق للمراجعة.',
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6" dir="rtl">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-sky-100 text-[#0284c7] flex items-center justify-center mx-auto mb-2">
          <UserPlus className="w-6 h-6" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          توثيق الحساب الأكاديمي الجامعي للطلاب
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          يتطلب الحصول على صلاحيات استعارة الأجهزة المعملية رفع صورة البطاقة الجامعية للتحقق من القيد
        </p>
      </div>

      {/* Success banner after submission */}
      {isSubmitted ? (
        <div className="bg-white rounded-2xl border border-emerald-200 p-8 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            تم استلام طلب التوثيق بنجاح!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
            الطلب الآن معروض في شاشة <strong>اعتماد هويات الطلاب (Verification)</strong> لدى مسؤول النظام.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setRole('admin');
                router.push('/verification');
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs transition shadow-xs min-h-[44px]"
            >
              الانتقال لشاشة اعتماد الطلاب (كمسؤول نظام) ←
            </button>

            <Link
              href="/catalog"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition min-h-[44px] flex items-center justify-center"
            >
              تصفح الكتالوج كطالب
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  الاسم الكامل بالعربية:
                </label>
                <input
                  type="text"
                  value={fullNameAr}
                  onChange={(e) => setFullNameAr(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#00236f] focus:outline-none min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  الاسم بالإنجليزية (مطابق للبطاقة):
                </label>
                <input
                  type="text"
                  value={fullNameEn}
                  onChange={(e) => setFullNameEn(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm font-mono focus:ring-2 focus:ring-[#00236f] focus:outline-none min-h-[42px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  الرقم الجامعي (Student ID):
                </label>
                <input
                  type="text"
                  value={studentIdNumber}
                  onChange={(e) => setStudentIdNumber(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm font-mono focus:ring-2 focus:ring-[#00236f] focus:outline-none min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  البريد الجامعي المعتمد:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm font-mono focus:ring-2 focus:ring-[#00236f] focus:outline-none min-h-[42px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">الكلية:</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">القسم:</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">المرحلة:</label>
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm min-h-[42px]"
                >
                  <option value="السنة الأولى">السنة الأولى</option>
                  <option value="السنة الثانية">السنة الثانية</option>
                  <option value="السنة الثالثة">السنة الثالثة</option>
                  <option value="السنة الرابعة">السنة الرابعة</option>
                  <option value="السنة الخامسة (تخرج)">السنة الخامسة (تخرج)</option>
                  <option value="دراسات عليا / ماجستير">دراسات عليا / ماجستير</option>
                </select>
              </div>
            </div>

            {/* University ID Card Upload Box */}
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-5 text-center space-y-3 bg-slate-50">
              <Upload className="w-8 h-8 text-[#0284c7] mx-auto" />
              <div>
                <span className="font-bold text-xs sm:text-sm text-slate-800 block">
                  صورة البطاقة الجامعية (الوجه الأمامي)
                </span>
                <span className="text-[11px] text-slate-400">
                  تم إرفاق مستند تجريبي تلقائياً للمحاكاة الفورية
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                <FileCheck className="w-4 h-4" />
                <span>student_id_card_verified.jpg (مرفق)</span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#00236f] hover:bg-[#001b55] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-xs min-h-[48px]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>إرسال طلب التحقق إلى عمادة الكلية</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
