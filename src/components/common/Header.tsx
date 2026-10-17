'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BrandLogo } from './BrandLogo';
import { MobileNavDrawer } from './MobileNavDrawer';
import { useBorrowHubStore } from '@/lib/store';
import { 
  Search, Globe, RotateCcw, Menu, User, ChevronDown, Check,
  GraduationCap, ShieldAlert, ClipboardCheck, Settings2
} from 'lucide-react';

const ROLES = [
  {
    id: 'student' as const,
    labelAr: 'طالب / باحث',
    labelEn: 'Student',
    icon: GraduationCap,
    badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-400/30',
    defaultRoute: '/catalog',
    navLinks: [
      { href: '/catalog', label: 'كتالوج الأجهزة', labelEn: 'Catalog' },
      { href: '/student/loans', label: 'لوحة استعاراتي', labelEn: 'My Loans' },
      { href: '/auth/register', label: 'تفعيل الحساب', labelEn: 'Verify Account' },
    ],
  },
  {
    id: 'supervisor' as const,
    labelAr: 'مشرف معمل',
    labelEn: 'Supervisor',
    icon: ShieldAlert,
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    defaultRoute: '/admin/review',
    navLinks: [
      { href: '/admin/review', label: 'طابور المراجعة', labelEn: 'Review Queue' },
      { href: '/catalog', label: 'أجهزة المعامل', labelEn: 'Lab Equipment' },
      { href: '/admin/overdue', label: 'إنذارات التأخير', labelEn: 'Overdue' },
    ],
  },
  {
    id: 'counter_tech' as const,
    labelAr: 'فني الشباك',
    labelEn: 'Counter Tech',
    icon: ClipboardCheck,
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    defaultRoute: '/counter/pickups',
    navLinks: [
      { href: '/counter/pickups', label: 'شباك التسليم', labelEn: 'Pickups' },
      { href: '/counter/returns', label: 'شباك الإرجاع والفحص', labelEn: 'Returns' },
      { href: '/admin/inventory', label: 'جرد العهد', labelEn: 'Inventory' },
    ],
  },
  {
    id: 'admin' as const,
    labelAr: 'مسؤول النظام',
    labelEn: 'System Admin',
    icon: Settings2,
    badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
    defaultRoute: '/admin/inventory',
    navLinks: [
      { href: '/admin/review', label: 'مراجعة الطلبات', labelEn: 'Review' },
      { href: '/admin/verification', label: 'اعتماد الطلاب', labelEn: 'Verification' },
      { href: '/admin/inventory', label: 'إدارة المخزون', labelEn: 'Inventory' },
      { href: '/admin/overdue', label: 'إنذارات التأخير', labelEn: 'Overdue' },
    ],
  },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { currentRole, setRole, lang, toggleLanguage, resetDemoState } = useBorrowHubStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const activeRoleConfig = ROLES.find((r) => r.id === currentRole) || ROLES[0];

  const handleRoleSelect = (roleId: typeof currentRole, defaultRoute: string) => {
    setRole(roleId);
    setRoleDropdownOpen(false);
    router.push(defaultRoute);
  };

  return (
    <>
      <header className="bg-[#00236f] text-white border-b border-[#1e3a8a] sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-6">
          {/* Zone 1: Brand Wordmark */}
          <div className="shrink-0 flex items-center gap-3">
            <BrandLogo />
          </div>

          {/* Zone 2: Role-Driven Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-200">
            {activeRoleConfig.navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                    isActive
                      ? 'text-white font-bold border-b-2 border-[#5bb8fe]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {lang === 'ar' ? link.label : link.labelEn}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Interactive Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition min-h-[38px] ${activeRoleConfig.badgeBg}`}
                title="تغيير الدور الأكاديمي النشط"
              >
                <activeRoleConfig.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {lang === 'ar' ? activeRoleConfig.labelAr : activeRoleConfig.labelEn}
                </span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute top-11 end-0 w-56 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[11px] font-bold text-slate-400 px-2 py-1 border-b border-slate-100 mb-1">
                    تبديل الدور الأكاديمي (الربط المباشر):
                  </div>
                  {ROLES.map((role) => {
                    const isSelected = role.id === currentRole;
                    return (
                      <button
                        key={role.id}
                        onClick={() => handleRoleSelect(role.id, role.defaultRoute)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition text-start ${
                          isSelected
                            ? 'bg-[#00236f] text-white font-bold'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <role.icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#0284c7]'}`} />
                          <span>{lang === 'ar' ? role.labelAr : role.labelEn}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#5bb8fe]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              title="تبديل اللغة (Arabic / English)"
              className="hidden sm:flex p-2 rounded text-slate-300 hover:text-white hover:bg-white/10 transition items-center gap-1 text-xs font-semibold min-h-[38px]"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Reset Demo State Button */}
            <button
              onClick={resetDemoState}
              title="إعادة تعيين البيانات الأولية للمشروع"
              className="hidden md:flex p-2 rounded text-slate-300 hover:text-white hover:bg-white/10 transition text-xs items-center gap-1 min-h-[38px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[11px]">إعادة ضبط</span>
            </button>

            {/* Role Action Button */}
            <Link
              href={activeRoleConfig.defaultRoute}
              className="hidden xs:inline-flex items-center gap-1.5 bg-[#0284c7] hover:bg-[#0369a1] text-white px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap shrink-0 shadow-sm min-h-[38px]"
            >
              <Search className="w-3.5 h-3.5" />
              <span>
                {currentRole === 'student'
                  ? 'طلب استعارة'
                  : currentRole === 'supervisor'
                  ? 'طابور المراجعة'
                  : currentRole === 'counter_tech'
                  ? 'شباك التسليم'
                  : 'إدارة المستودع'}
              </span>
            </Link>

            {/* Mobile Drawer Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden flex items-center justify-center p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition min-w-[40px] min-h-[40px]"
              aria-label="فتح قائمة التنقل الرئيسية"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
