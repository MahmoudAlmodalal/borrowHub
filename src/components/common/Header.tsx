'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from './BrandLogo';
import { useBorrowHubStore } from '@/lib/store';
import { Search, Globe, RotateCcw } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const { lang, toggleLanguage, resetDemoState } = useBorrowHubStore();

  const navLinks = [
    { href: '/catalog', label: 'الكتالوج', labelEn: 'Catalog' },
    { href: '/student/loans', label: 'استعاراتي', labelEn: 'My Loans' },
    { href: '/counter/pickups', label: 'شباك التسليم', labelEn: 'Pickups' },
    { href: '/counter/returns', label: 'شباك الإرجاع', labelEn: 'Returns' },
    { href: '/admin/review', label: 'مراجعة الطلبات', labelEn: 'Review Queue' },
    { href: '/admin/inventory', label: 'المخزون', labelEn: 'Inventory' },
  ];

  return (
    <header className="bg-[#00236f] text-white border-b border-[#1e3a8a] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="shrink-0">
          <BrandLogo />
        </div>

        {/* Zone 2: 4-6 Clean Single-Line Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
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
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            title="تبديل اللغة (Arabic / English)"
            className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-white/10 transition flex items-center gap-1 text-xs font-semibold"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">{lang === 'ar' ? 'English' : 'العربية'}</span>
          </button>

          {/* Reset Demo State Button */}
          <button
            onClick={resetDemoState}
            title="إعادة تعيين البيانات الأولية للمشروع"
            className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-white/10 transition text-xs flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden xl:inline text-[11px]">إعادة ضبط</span>
          </button>

          {/* Primary Action Button */}
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 bg-[#0284c7] hover:bg-[#0369a1] text-white px-3.5 py-1.5 rounded text-xs sm:text-sm font-semibold transition whitespace-nowrap shrink-0 shadow-sm"
          >
            <Search className="w-4 h-4" />
            <span>{lang === 'ar' ? 'طلب استعارة' : 'Borrow Item'}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
