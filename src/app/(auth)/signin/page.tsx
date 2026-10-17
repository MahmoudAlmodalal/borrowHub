'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBorrowHubStore } from '@/lib/store';
import { BrandLogo } from '@/components/common/BrandLogo';
import { LogIn, Shield, User, KeyRound, ArrowLeft, ArrowRight } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const { setRole } = useBorrowHubStore();
  const [email, setEmail] = useState('o.almansour@student.edu.sa');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setRole('student');
      router.push('/student/loans');
    }, 400);
  };

  const handleDemoLogin = (role: 'student' | 'supervisor' | 'counter_tech', path: string) => {
    setRole(role);
    router.push(path);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 sm:p-6 bg-[#f7f9fb]">
      <div className="max-w-4xl w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Brand Showcase Column */}
        <div className="bg-gradient-to-br from-[#00236f] to-[#1e3a8a] text-white p-8 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <BrandLogo showSubtitle={false} />
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0284c7]/20 border border-[#0284c7]/40 text-[#5bb8fe] text-xs font-semibold mb-4">
              <span>SCR-04</span>
              <span>·</span>
              <span>بوابة الدخول الموحد SSO</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mb-3 leading-snug">
              منظومة إعارة الأجهزة والمعامل الجامعية
            </h2>
            <p className="text-xs text-slate-200 leading-relaxed mb-6">
              تسجيل الدخول المركزي للطلاب وأعضاء الهيئة التدريسية وأمناء المعامل لإدارة العهد الأكاديمية وحجز الأجهزة المعملية وفق معايير الأمان الجامعية.
            </p>

            <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#5bb8fe]" />
                <span>مصادقة مشفرة مرتبطة بنظام معلومات الطلاب SIS</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#5bb8fe]" />
                <span>توجيه تلقائي لصلاحيات الطالب أو المشرف أو فني الشباك</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 text-[11px] text-slate-400">
            للمساعدة التقنية يرجى التواصل مع وحدة الدعم المعملي: 9200-8812
          </div>
        </div>

        {/* Form Column */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-[#00236f]">تسجيل الدخول الأكاديمي</h3>
                <p className="text-xs text-slate-500">أدخل بيانات البريد الجامعي أو الرقم الأكاديمي</p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                CAS/SSO
              </span>
            </div>

            {/* Fast-Track Demo Switcher Bar */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mb-6">
              <div className="text-[11px] font-bold text-slate-600 mb-2">الدخول السريع بحساب تجريبي (للتقييم):</div>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('student', '/student/loans')}
                  className="bg-white hover:bg-[#00236f] hover:text-white border border-slate-200 text-slate-700 text-[11px] font-semibold py-1.5 px-2 rounded transition"
                >
                  طالب
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('supervisor', '/admin/review')}
                  className="bg-white hover:bg-[#00236f] hover:text-white border border-slate-200 text-slate-700 text-[11px] font-semibold py-1.5 px-2 rounded transition"
                >
                  مشرف معمل
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('counter_tech', '/counter/pickups')}
                  className="bg-white hover:bg-[#00236f] hover:text-white border border-slate-200 text-slate-700 text-[11px] font-semibold py-1.5 px-2 rounded transition"
                >
                  فني شباك
                </button>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  البريد الجامعي أو الرقم الأكاديمي
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute start-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full ps-9 pe-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0284c7] outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <label className="font-semibold text-slate-700">كلمة المرور</label>
                  <a href="#forgot" className="text-[#0284c7] hover:underline text-[11px]">
                    نسيت كلمة المرور؟
                  </a>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute start-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full ps-9 pe-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0284c7] outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  defaultChecked
                  className="w-4 h-4 rounded text-[#00236f] border-slate-300"
                />
                <label htmlFor="remember" className="text-xs text-slate-600 cursor-pointer">
                  تذكر بيانات الحساب على هذا الجهاز
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#00236f] hover:bg-[#0284c7] text-white text-xs font-bold py-2.5 rounded transition flex items-center justify-center gap-2 shadow"
              >
                {isLoading ? (
                  <span>جاري التحقق والمصادقة...</span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>تسجيل الدخول</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="pt-6 border-t border-slate-100 text-center text-xs text-slate-600">
            طالب جديد ولم تقم بتفعيل حسابك بعد؟{' '}
            <Link href="/auth/register" className="text-[#0284c7] font-bold hover:underline">
              تسجيل حساب طالب جديد
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
