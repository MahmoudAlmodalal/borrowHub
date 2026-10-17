'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, ChevronUp, ChevronDown, Check, Home } from 'lucide-react';

const MODULES = [
  { code: 'SCR-01', title: 'كتالوج المعدات الأكاديمية', href: '/catalog', role: 'Student' },
  { code: 'SCR-02', title: 'تفاصيل المعدة ومواصفاتها', href: '/catalog/eq-1', role: 'Student' },
  { code: 'SCR-03', title: 'لوحة طلبات واستعارات الطالب', href: '/student/loans', role: 'Student' },
  { code: 'SCR-04', title: 'تسجيل الدخول الأكاديمي SSO', href: '/auth/signin', role: 'Auth' },
  { code: 'SCR-05', title: 'تسجيل حساب طالب جديد', href: '/auth/register', role: 'Auth' },
  { code: 'SCR-06', title: 'اعتماد حسابات الطلاب', href: '/admin/verification', role: 'Admin' },
  { code: 'SCR-07', title: 'طابور مراجعة طلبات الاستعارة', href: '/admin/review', role: 'Admin' },
  { code: 'SCR-08', title: 'شباك تسليم العهد المعتمدة', href: '/counter/pickups', role: 'Counter' },
  { code: 'SCR-09', title: 'شباك إرجاع وفحص العتاد', href: '/counter/returns', role: 'Counter' },
  { code: 'SCR-10', title: 'لوحة إنذارات العتاد المتأخر', href: '/admin/overdue', role: 'Admin' },
  { code: 'SCR-11', title: 'إدارة كتالوج ومخزون المعدات', href: '/admin/inventory', role: 'Admin' },
];

export function QuickNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const currentModule = MODULES.find((m) => m.href === pathname || pathname.startsWith(`${m.href}/`));

  return (
    <div className="fixed bottom-4 start-4 z-50 font-sans" dir="rtl">
      {/* Floating Capsule Bar */}
      <div className="bg-[#00236f] text-white rounded-full shadow-xl border border-[#1e3a8a] p-1 flex items-center gap-1.5 backdrop-blur-md">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 bg-[#1e3a8a] hover:bg-[#0284c7] text-white px-3 py-1.5 rounded-full text-xs font-semibold transition"
          title="العودة للبوابة الرئيسية"
        >
          <Home className="w-3.5 h-3.5" />
          <span>الرئيسية</span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-white/10 transition text-slate-200"
        >
          <LayoutGrid className="w-3.5 h-3.5 text-[#5bb8fe]" />
          <span className="hidden sm:inline">
            {currentModule ? `${currentModule.code}: ${currentModule.title}` : 'الانتقال لشاشة أخرى'}
          </span>
          <span className="sm:hidden">الشاشات</span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Drawer Popover */}
      {isOpen && (
        <div className="absolute bottom-14 start-0 w-80 max-h-96 overflow-y-auto bg-white rounded-xl shadow-2xl border border-slate-200 p-2 text-[#191c1e]">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 px-2">
            <span className="text-xs font-bold text-[#00236f]">شاشات وموديولات BorrowHub (11)</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 text-xs p-1"
            >
              ✕
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {MODULES.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.code}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition ${
                    isActive
                      ? 'bg-[#00236f] text-white font-semibold'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'
                      }`}
                    >
                      {item.code}
                    </span>
                    <span>{item.title}</span>
                  </div>
                  {isActive && <Check className="w-3.5 h-3.5 text-[#5bb8fe]" />}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
