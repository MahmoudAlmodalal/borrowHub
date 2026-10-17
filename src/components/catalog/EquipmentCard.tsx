'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Equipment } from '@/lib/types';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

interface EquipmentCardProps {
  item: Equipment;
}

export function EquipmentCard({ item }: EquipmentCardProps) {
  const isAvailable = item.availableQuantity > 0;

  return (
    <div className="bg-white rounded-lg border border-slate-200 hover:border-[#0284c7] hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Media Frame */}
        <div className="relative w-full h-48 bg-slate-100 overflow-hidden border-b border-slate-100">
          <Image
            src={item.imageUrl}
            alt={item.nameAr}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Availability Status Tag */}
          <div className="absolute top-2.5 start-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold shadow-sm ${
                isAvailable
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-600 text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>{isAvailable ? `متوفر (${item.availableQuantity})` : 'محجوز بالكامل'}</span>
            </span>
          </div>

          <div className="absolute top-2.5 end-2.5">
            <span className="bg-slate-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[11px] font-mono">
              {item.code}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4">
          {/* Metadata unboxed kicker */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
            <span>{item.categoryLabelAr}</span>
            <span aria-hidden="true">·</span>
            <span>{item.labLocation}</span>
          </div>

          <h3 className="text-base font-bold text-[#00236f] group-hover:text-[#0284c7] transition-colors line-clamp-1 mb-1">
            {item.nameAr}
          </h3>
          <p className="text-xs text-slate-500 font-mono mb-3 line-clamp-1">{item.model}</p>

          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
            {item.descriptionAr}
          </p>

          {/* Quick Specifications list */}
          <div className="space-y-1 pt-2 border-t border-slate-100 mb-2">
            {item.specs.slice(0, 2).map((s, idx) => (
              <div key={idx} className="flex items-center justify-between text-[11px] text-slate-600">
                <span className="text-slate-400">{s.label}:</span>
                <span className="font-medium text-slate-700">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-4 pt-0">
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>أقصى مدة {item.maxLoanDays} أيام</span>
          </div>

          <Link
            href={`/catalog/${item.id}`}
            className="inline-flex items-center gap-1 bg-[#00236f] hover:bg-[#0284c7] text-white text-xs font-semibold px-3 py-1.5 rounded transition whitespace-nowrap"
          >
            <span>تفاصيل وطلب</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
