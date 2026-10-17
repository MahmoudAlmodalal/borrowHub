'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useBorrowHubStore } from '@/lib/store';
import { UserRole } from '@/lib/types';
import {
  GraduationCap,
  ClipboardCheck,
  ShieldAlert,
  Settings2,
  ChevronUp,
  ChevronDown,
  Layers,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export function QuickNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentRole, setRole, loans, overdue, students } = useBorrowHubStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const pendingApprovalsCount = loans.filter((l) => l.status === 'pending_approval').length;
  const readyPickupsCount = loans.filter((l) => l.status === 'approved_ready_for_pickup').length;
  const activeLoansCount = loans.filter((l) => l.status === 'active_in_possession').length;
  const overdueCount = overdue.length;
  const pendingStudentsCount = students.filter((s) => s.verificationStatus === 'pending').length;

  const roleScreens = {
    student: [
      { href: '/catalog', label: 'كتالوج الأجهزة' },
      { href: '/loans', label: 'لوحة استعاراتي', count: activeLoansCount + readyPickupsCount },
      { href: '/register', label: 'تسجيل وتوثيق الحساب' },
      { href: '/signin', label: 'تسجيل الدخول' },
    ],
    counter_tech: [
      { href: '/pickups', label: 'شباك التسليم (Pickups)', count: readyPickupsCount, highlight: true },
      { href: '/returns', label: 'شباك الإرجاع والفحص', count: activeLoansCount },
      { href: '/inventory', label: 'مستودع العهد' },
    ],
    supervisor: [
      { href: '/review', label: 'طابور المراجعة والاعتماد', count: pendingApprovalsCount, highlight: true },
      { href: '/catalog', label: 'كتالوج المعامل' },
      { href: '/overdue', label: 'المتأخرات المعملية', count: overdueCount },
    ],
    admin: [
      { href: '/inventory', label: 'إدارة المستودع والجرد' },
      { href: '/verification', label: 'اعتماد هويات الطلاب', count: pendingStudentsCount, highlight: true },
      { href: '/review', label: 'مراجعة كافة الطلبات', count: pendingApprovalsCount },
      { href: '/overdue', label: 'إنذارات التأخير والحجز', count: overdueCount },
    ],
  };

  const rolesList: { id: UserRole; label: string; icon: typeof GraduationCap; defaultRoute: string; color: string }[] = [
    { id: 'student', label: 'طالب / باحث', icon: GraduationCap, defaultRoute: '/catalog', color: 'border-sky-500 text-sky-700 bg-sky-50' },
    { id: 'counter_tech', label: 'فني الشباك', icon: ClipboardCheck, defaultRoute: '/pickups', color: 'border-emerald-500 text-emerald-700 bg-emerald-50' },
    { id: 'supervisor', label: 'مشرف المعمل', icon: ShieldAlert, defaultRoute: '/review', color: 'border-amber-500 text-amber-700 bg-amber-50' },
    { id: 'admin', label: 'مسؤول النظام', icon: Settings2, defaultRoute: '/inventory', color: 'border-purple-500 text-purple-700 bg-purple-50' },
  ];

  return (
    <aside
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-xl transition-all"
      dir="rtl"
      aria-label="شريط التنقل السريع وربط الشاشات"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Collapsed top bar */}
        <div className="h-12 flex items-center justify-between gap-2">
          {/* Active Role and Connected Screen links */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap hidden sm:inline">
              ربط الشاشات حسب الدور:
            </span>

            {/* Quick role tabs */}
            <div className="flex items-center gap-1.5 shrink-0">
              {rolesList.map((r) => {
                const isActive = currentRole === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      setRole(r.id);
                      router.push(r.defaultRoute);
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border transition shrink-0 ${
                      isActive
                        ? 'bg-[#00236f] text-white border-[#00236f] shadow-xs'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    <r.icon className="w-3.5 h-3.5" />
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Sub-links for the active role */}
            <div className="hidden md:flex items-center gap-1 border-s border-slate-200 ps-2.5 ms-1">
              {roleScreens[currentRole].map((s) => {
                const isCurrent = pathname === s.href;
                return (
                  <Link
                    key={s.href}
                    href={s.href}
                    className={`text-xs px-2 py-0.5 rounded transition whitespace-nowrap flex items-center gap-1 ${
                      isCurrent
                        ? 'bg-sky-100 text-sky-800 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <span>{s.label}</span>
                    {s.count !== undefined && s.count > 0 && (
                      <span className={`text-[10px] px-1 rounded font-bold ${
                        s.highlight ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {s.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Toggle details drawer */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-[#00236f] font-semibold hidden lg:inline-flex items-center gap-1"
            >
              <span>خريطة المنصة الكاملة</span>
            </Link>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition"
              title="عرض مصفوفة الشاشات الكاملة"
            >
              <span className="hidden xs:inline">كل الشاشات</span>
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Expanded Grid Panel */}
        {isExpanded && (
          <div className="py-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-150">
            {rolesList.map((r) => {
              const isCurrent = currentRole === r.id;
              return (
                <div
                  key={r.id}
                  className={`p-3 rounded-xl border text-xs transition ${
                    isCurrent ? 'border-sky-400 bg-sky-50/50 shadow-xs' : 'border-slate-200 bg-slate-50/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <button
                      onClick={() => {
                        setRole(r.id);
                        router.push(r.defaultRoute);
                      }}
                      className="flex items-center gap-1.5 font-bold text-slate-900 hover:text-[#00236f]"
                    >
                      <r.icon className="w-4 h-4 text-[#0284c7]" />
                      <span>{r.label}</span>
                    </button>
                    {isCurrent && (
                      <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-1.5 py-0.5 rounded">
                        نشط الآن
                      </span>
                    )}
                  </div>

                  <ul className="space-y-1">
                    {roleScreens[r.id].map((link) => {
                      const isScreen = pathname === link.href;
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => {
                              if (currentRole !== r.id) setRole(r.id);
                              setIsExpanded(false);
                            }}
                            className={`w-full flex items-center justify-between py-1 px-2 rounded transition ${
                              isScreen
                                ? 'bg-[#00236f] text-white font-bold'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                          >
                            <span>{link.label}</span>
                            {link.count !== undefined && link.count > 0 && (
                              <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                                isScreen ? 'bg-sky-400 text-white' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {link.count}
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
