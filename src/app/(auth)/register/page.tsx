'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBorrowHubStore } from '@/lib/store';
import { 
  CheckCircle2, ArrowRight, ArrowLeft, Upload, FileCheck, 
  ShieldCheck, UserPlus, Info
} from 'lucide-react';

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [studentId, setStudentId] = useState('');
  const [fullNameAr, setFullNameAr] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('كلية الهندسة');
  const [department, setDepartment] = useState('الهندسة الكهربائية');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!studentId || !fullNameAr || !email) return;
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (!termsAccepted) return;
      const refCode = `REG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedCode(refCode);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0284c7]/10 text-[#0284c7] text-xs font-semibold mb-2">
          <span>SCR-05</span>
          <span>·</span>
          <span>تسجيل حساب طالب جديد</span>
        </div>
        <h1 className="text-2xl font-bold text-[#00236f]">تفعيل صلاحيات استعارة العهد الجامعية</h1>
        <p className="text-xs text-slate-500 mt-1">
          تسجيل الطلاب المستجدين وربط بطاقة القيد لتسهيل حجز الأجهزة المعملية
        </p>
      </div>

      {/* Step Progress Indicators */}
      <div className="flex items-center justify-between mb-8 max-w-lg mx-auto">
        <div className={`flex items-center gap-2 text-xs font-semibold ${step >= 1 ? 'text-[#00236f]' : 'text-slate-400'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${step >= 1 ? 'bg-[#00236f] text-white' : 'bg-slate-200 text-slate-600'}`}>
            1
          </div>
          <span>البيانات الأكاديمية</span>
        </div>
        <div className="flex-1 h-0.5 bg-slate-200 mx-2" />
        <div className={`flex items-center gap-2 text-xs font-semibold ${step >= 2 ? 'text-[#00236f]' : 'text-slate-400'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${step >= 2 ? 'bg-[#00236f] text-white' : 'bg-slate-200 text-slate-600'}`}>
            2
          </div>
          <span>إثبات الهوية</span>
        </div>
        <div className="flex-1 h-0.5 bg-slate-200 mx-2" />
        <div className={`flex items-center gap-2 text-xs font-semibold ${step >= 3 ? 'text-[#00236f]' : 'text-slate-400'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${step >= 3 ? 'bg-[#00236f] text-white' : 'bg-slate-200 text-slate-600'}`}>
            3
          </div>
          <span>الإقرار والاعتماد</span>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
        {submittedCode ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-[#00236f] mb-2">تم استلام طلب التسجيل بنجاح!</h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
              طلبك الآن قيد المراجعة لدى شباك اعتماد حسابات الطلاب (SCR-06). سيتم تفعيل حسابك ومطابقته مع سجلات عمادة القبول والتسجيل خلال 24 ساعة.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-xs mx-auto mb-6">
              <span className="text-[11px] text-slate-400 block mb-1">رقم مرجع التسجيل:</span>
              <span className="font-mono text-base font-bold text-[#00236f]">{submittedCode}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/auth/signin"
                className="w-full sm:w-auto bg-[#00236f] hover:bg-[#0284c7] text-white text-xs font-bold px-6 py-2.5 rounded transition"
              >
                العودة لصفحة تسجيل الدخول
              </Link>
              <Link
                href="/catalog"
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-6 py-2.5 rounded transition"
              >
                تصفح كتالوج الأجهزة كزائر
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleNextStep}>
            {/* Step 1: Academic Info */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">الرقم الجامعي</label>
                    <input
                      type="text"
                      required
                      placeholder="441000000"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0284c7] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">الاسم الرباعي (باللغة العربية)</label>
                    <input
                      type="text"
                      required
                      placeholder="محمد بن عبد الله آل سعود"
                      value={fullNameAr}
                      onChange={(e) => setFullNameAr(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0284c7] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">البريد الجامعي الرسمي (@student.edu.sa)</label>
                    <input
                      type="email"
                      required
                      placeholder="s441000000@student.edu.sa"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0284c7] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">رقم الهاتف الجوال</label>
                    <input
                      type="tel"
                      required
                      placeholder="+966 50 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0284c7] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">الكلية</label>
                    <select
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0284c7] outline-none"
                    >
                      <option value="كلية الهندسة">كلية الهندسة</option>
                      <option value="كلية علوم الحاسب والمعلومات">كلية علوم الحاسب والمعلومات</option>
                      <option value="كلية العلوم">كلية العلوم</option>
                      <option value="كلية العمارة والتخطيط">كلية العمارة والتخطيط</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">القسم والتخصص</label>
                    <input
                      type="text"
                      required
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0284c7] outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#00236f] hover:bg-[#0284c7] text-white text-xs font-bold px-6 py-2.5 rounded transition"
                  >
                    <span>المتابعة لرفع إثبات القيد</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: ID Card Upload */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="bg-[#e0f2fe]/40 border border-[#bae6fd] p-4 rounded-lg flex items-start gap-2.5 text-xs text-[#0369a1]">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    يرجى تصوير البطاقة الجامعية بوضوح مع التأكد من قراءة الرقم الجامعي وتاريخ الصلاحية بوضوح لتسريع وتيرة الاعتماد الأكاديمي.
                  </span>
                </div>

                {/* Upload Drag Drop Area */}
                <div className="border-2 border-dashed border-slate-300 hover:border-[#0284c7] rounded-xl p-8 text-center bg-slate-50 cursor-pointer transition">
                  <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-700">اسحب صورة البطاقة الجامعية هنا أو انقر للتصفح</p>
                  <p className="text-[11px] text-slate-400 mt-1">يدعم صيغ JPG و PNG بحد أقصى 5 ميجابايت</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded border border-emerald-200">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>تم التعرف التلقائي على نموذج بطاقة الجامعة</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-semibold"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>الرجوع للخطوة السابقة</span>
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#00236f] hover:bg-[#0284c7] text-white text-xs font-bold px-6 py-2.5 rounded transition"
                  >
                    <span>المتابعة لميثاق العهدة</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Terms & Agreement */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-700 max-h-56 overflow-y-auto space-y-2">
                  <div className="font-bold text-[#00236f] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#00236f]" />
                    <span>ميثاق أمانة العهد المعملية ومسؤولية الحفظ:</span>
                  </div>
                  <p>1. يقر الطالب بأنه مسؤول مسؤولية مدنية وأكاديمية كاملة عن أي جهاز يستلمه من المعامل بمجرد التوقيع على إيصال الاستلام.</p>
                  <p>2. يلتزم الطالب بإرجاع الجهاز بكافة ملحقاته قبل انتهاء مهلة الاستعارة المحددة في النظام.</p>
                  <p>3. يترتب على التأخر في إرجاع العهدة إيقاف خدمات التسجيل ووضع قيد أكاديمي (Hold) في البوابة الأكاديمية SIS حتى إبراء الذمة.</p>
                  <p>4. في حال تلف العهدة نتيجة سوء الاستخدام، يتحمل الطالب تكاليف الصيانة أو القيمة الدفترية المعتمدة للجهاز.</p>
                </div>

                <label className="flex items-start gap-2.5 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-4 h-4 rounded text-[#00236f] border-slate-300 mt-0.5"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    أقر بأنني اطلعت على ميثاق استعارة العهد المعملية وأتعهد بالالتزام بكافة الشروط المذكورة أعلاه.
                  </span>
                </label>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-semibold"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>الرجوع للخطوة السابقة</span>
                  </button>
                  <button
                    type="submit"
                    disabled={!termsAccepted}
                    className={`inline-flex items-center gap-2 text-xs font-bold px-6 py-2.5 rounded transition ${
                      termsAccepted
                        ? 'bg-[#00236f] hover:bg-[#0284c7] text-white shadow'
                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>إرسال طلب التسجيل والاعتماد</span>
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
