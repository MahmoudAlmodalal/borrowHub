'use client';

import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  showSubtitle?: boolean;
}

export function BrandLogo({ showSubtitle = true }: BrandLogoProps) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group">
      {/* Brand Monogram Icon */}
      <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#0284c7] to-[#5bb8fe] flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
        <span>B</span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-base sm:text-lg tracking-tight text-white leading-none">
            BorrowHub
          </span>
          <span className="text-[#5bb8fe] font-bold text-sm leading-none">
            استعارة
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] text-slate-300 font-medium tracking-normal hidden xs:inline mt-0.5">
            المنصة الأكاديمية لإدارة العهد
          </span>
        )}
      </div>
    </Link>
  );
}
