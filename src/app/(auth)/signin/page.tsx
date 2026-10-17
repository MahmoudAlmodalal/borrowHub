'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBorrowHubStore } from '@/lib/store';
import { UserRole } from '@/lib/types';
import { BrandLogo } from '@/components/common/BrandLogo';
import {
  GraduationCap,
  ClipboardCheck,
  ShieldAlert,
  Settings2,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  KeyRound,
} from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const { setRole } = useBorrowHubStore();
  const [email, setEmail] = useState('s441012891@student.edu.sa');
  const [password, setPassword] = useState('••••••••••••');

  const handleRoleQuickLogin = (role: UserRole, targetRoute: string) => {
    setRole(role);
    router.push(targetRoute);
  };

  const handleStandardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole('student');
    router.push('/catalog');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6" dir="rtl">
      <div className="max-w-xl w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-block p-2 rounded-2xl bg-[#00236f] shadow-md mb-2">
            <BrandLogo showSubtitle={false} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            تسجيل الدخول عبر النفاذ الأكاديمي الموحد
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            منظومة إدارة واستعارة الأجهزة والمعامل الجامعية
          </p>
        </div>

        {/* Quick Role-Linked Demo Switcher */}
        <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-900">
            <Sparkles className="w-4 h-4 text-[#0284c7]" />
            <span>تسجيل الدخول السريع المباشر حسب الدور (One-Click Role Access):</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              onClick={() => handleRoleQuickLogin('student', '/catalog')}
              className="flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-sky-100/50 border border-sky-200 text-start transition shadow-xs group min-h-[48px]"
            >
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-xs text-slate-900">حساب طالب / باحث</div>
                <div className="text-[10px] text-slate-500 truncate">تصفح الكتالوج وحجز الأجهزة</div>
              </div>
            </button>

            <button
              onClick={() => handleRoleQuickLogin('counter_tech', '/pickups')}
              className="flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-start transition shadow-xs group min-h-[48px]"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <ClipboardCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-xs text-slate-900">فني الشباك المعملي</div>
                <div className="text-[10px] text-slate-500 truncate">تسليم واستلام وفحص العهد</div>
              </div>
            </button>

            <button
              onClick={() => handleRoleQuickLogin('supervisor', '/review')}
              className="flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 text-start transition shadow-xs group min-h-[48px]"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-xs text-slate-900">مشرف المعامل والمشاريع</div>
                <div className="text-[10px] text-slate-500 truncate">اعتماد الطلبات وتعيين السيريال</div>
              </div>
            </button>

            <button
              onClick={() => handleRoleQuickLogin('admin', '/inventory')}
              className="flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-purple-50 border border-purple-200 text-start transition shadow-xs group min-h-[48px]"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Settings2 className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-xs text-slate-900">مسؤول النظام والعمادة</div>
                <div className="text-[10px] text-slate-500 truncate">إدارة المخزون واعتماد الطلاب</div>
              </div>
            </button>
          </div>
        </div>

        {/* Traditional Credentials Form */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <form onSubmit={handleStandardSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                البريد الإلكتروني الجامعي أو الرقم الأكاديمي:
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full ps-9 pe-3 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm font-mono focus:ring-2 focus:ring-[#00236f] focus:outline-none min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                كلمة المرور الجامعية:
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full ps-9 pe-3 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#00236f] focus:outline-none min-h-[44px]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#00236f] hover:bg-[#001b55] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-xs min-h-[48px]"
            >
              <span>تسجيل الدخول والمتابعة</span>
              <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
            </button>
          </form>

          <div className="text-center pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500">
              طالب مستجد ولم توثق حسابك بعد؟{' '}
            </span>
            <Link
              href="/register"
              className="text-xs font-bold text-[#0284c7] hover:underline"
            >
              توثيق الحساب ورفع البطاقة الجامعية ←
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
