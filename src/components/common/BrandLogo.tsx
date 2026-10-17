import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export function BrandLogo({ className = '', showSubtitle = true }: BrandLogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 group ${className}`}>
      {/* 3D Cube Icon */}
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1e3a8a] to-[#00236f] p-1.5 flex items-center justify-center border border-white/20 shadow-sm shrink-0 transition-transform group-hover:scale-105">
        <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Top Face */}
          <polygon points="40,10 70,26 40,38 10,26" fill="#0284c7" />
          {/* Left Face */}
          <polygon points="10,28 38,40 38,70 10,54" fill="#1e3a8a" />
          {/* Right Face */}
          <polygon points="42,40 70,28 70,54 42,70" fill="#00236f" />
          {/* Exchange Portal Line */}
          <line x1="40" y1="40" x2="40" y2="68" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          {/* Cyclic Curved Arc */}
          <path d="M 22,46 Q 40,58 58,46" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="3,2.5" strokeLinecap="round" />
          {/* Amber Central Core */}
          <circle cx="40" cy="32" r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-white font-['Inter']">
            Borrow<span className="text-[#5bb8fe]">Hub</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
          <span className="text-sm font-semibold text-slate-200">استعارة</span>
        </div>
        {showSubtitle && (
          <p className="text-[11px] text-slate-300 font-medium hidden sm:block">
            منصة استعارة وإدارة المعدات الجامعية
          </p>
        )}
      </div>
    </Link>
  );
}
