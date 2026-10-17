'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Equipment } from '@/lib/types';
import { MapPin, Clock, ShieldCheck, ArrowLeft, Cpu } from 'lucide-react';

interface EquipmentCardProps {
  equipment: Equipment;
}

export function EquipmentCard({ equipment }: EquipmentCardProps) {
  const isAvailable = equipment.availableQuantity > 0;

  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Visual Media Header */}
        <div className="relative w-full h-48 bg-slate-100 overflow-hidden border-b border-slate-100">
          <Image
            src={equipment.imageUrl}
            alt={equipment.nameAr}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badge: Category */}
          <div className="absolute top-3 start-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#00236f]/90 text-white backdrop-blur-xs">
              <Cpu className="w-3 h-3 text-[#5bb8fe]" />
              {equipment.categoryLabelAr}
            </span>
          </div>

          {/* Badge: Availability */}
          <div className="absolute top-3 end-3">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold shadow-xs ${
                isAvailable
                  ? 'bg-emerald-500 text-white'
                  : 'bg-rose-500 text-white'
              }`}
            >
              {isAvailable ? `${equipment.availableQuantity} متاح` : 'غير متاح حالياً'}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-mono font-medium">{equipment.code}</span>
            <span className="text-slate-400">{equipment.manufacturer}</span>
          </div>

          <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 group-hover:text-[#0284c7] transition-colors">
            {equipment.nameAr}
          </h3>

          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
            {equipment.nameEn}
          </p>

          {/* Lab location */}
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{equipment.labLocation}</span>
          </div>

          {/* Max loan days & approval requirement */}
          <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              أقصى مدة: {equipment.maxLoanDays} يوم
            </span>
            {equipment.requiresSupervisorApproval && (
              <span className="inline-flex items-center gap-1 text-amber-600">
                <ShieldCheck className="w-3.5 h-3.5" />
                يتطلب موافقة المشرف
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-4 pt-0">
        <Link
          href={`/catalog/${equipment.id}`}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition bg-slate-100 hover:bg-[#00236f] text-slate-800 hover:text-white border border-slate-200 hover:border-[#00236f] min-h-[44px]"
        >
          <span>عرض المواصفات وطلب الحجز</span>
          <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
        </Link>
      </div>
    </div>
  );
}
