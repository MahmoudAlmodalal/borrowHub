'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useBorrowHubStore } from '@/lib/store';
import { EquipmentCard } from '@/components/catalog/EquipmentCard';
import { AcademicSkeleton } from '@/components/common/AcademicSkeleton';
import { EquipmentCategory } from '@/lib/types';
import { Search, X, Filter, QrCode, Sparkles, SlidersHorizontal } from 'lucide-react';

const CATEGORIES: { id: EquipmentCategory | 'all'; labelAr: string }[] = [
  { id: 'all', labelAr: 'كافة الأقسام المعملية' },
  { id: 'electronics_measurement', labelAr: 'الإلكترونيات والقياس' },
  { id: 'robotics_iot', labelAr: 'الروبوتات والإنترنت الذكي' },
  { id: 'mechanical_fabrication', labelAr: 'الميكانيكا والتصنيع' },
  { id: 'computing_ai', labelAr: 'الحوسبة والذكاء الاصطناعي' },
  { id: 'optics_media', labelAr: 'البصريات والوسائط' },
];

export default function CatalogPage() {
  const { equipment, loans, currentRole } = useBorrowHubStore();
  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Ready loans counter for student
  const readyForPickupCount = loans.filter((l) => l.status === 'approved_ready_for_pickup').length;

  const filteredEquipment = useMemo(() => {
    return equipment.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.labLocation.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAvailability = !onlyAvailable || item.availableQuantity > 0;
      return matchesCategory && matchesSearch && matchesAvailability;
    });
  }, [equipment, selectedCategory, searchQuery, onlyAvailable]);

  const handleCategorySelect = (catId: EquipmentCategory | 'all') => {
    setIsLoading(true);
    setSelectedCategory(catId);
    setTimeout(() => setIsLoading(false), 200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6" dir="rtl">
      {/* Role-Linked Notification Bar */}
      {readyForPickupCount > 0 && currentRole === 'student' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between gap-3 text-emerald-900 text-xs sm:text-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-bold">
              لديك {readyForPickupCount} جهاز معتمد وجاهز للاستلام الفوري من الشباك!
            </span>
          </div>
          <Link
            href="/loans"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition shadow-xs text-xs whitespace-nowrap min-h-[36px]"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>عرض تذكرة الاستلام والباركود</span>
          </Link>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            كتالوج الأجهزة والعتاد المعملي
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            استعرض وتصفح أجهزة القياس، الروبوتات، والأنظمة المضمنة المتاحة للاستعارة الأكاديمية
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/loans"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition shadow-xs min-h-[44px]"
          >
            <QrCode className="w-4 h-4 text-[#0284c7]" />
            <span>لوحة استعاراتي</span>
          </Link>

          {currentRole !== 'student' && (
            <Link
              href={currentRole === 'counter_tech' ? '/pickups' : '/review'}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-[#00236f] text-white hover:bg-[#001b55] transition shadow-xs min-h-[44px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#5bb8fe]" />
              <span>{currentRole === 'counter_tech' ? 'العودة لشباك التسليم' : 'العودة لطابور المراجعة'}</span>
            </Link>
          )}
        </div>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
        {/* Search Bar + Toggle */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم الجهاز، الموديل، كود الأصل، أو قاعة المعمل..."
              className="w-full ps-10 pe-10 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent min-h-[44px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute top-1/2 -translate-y-1/2 end-3 text-slate-400 hover:text-slate-600 p-1"
                aria-label="مسح البحث"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-lg cursor-pointer transition select-none min-h-[44px]">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="rounded text-[#0284c7] focus:ring-[#0284c7] w-4 h-4"
            />
            <span>الأجهزة المتاحة حالياً فقط</span>
          </label>
        </div>

        {/* Category Horizontal Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`whitespace-nowrap px-3.5 py-2 rounded-lg text-xs font-semibold transition shrink-0 min-h-[40px] ${
                  isSelected
                    ? 'bg-[#00236f] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.labelAr}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          عرض <strong className="text-slate-900 font-mono">{filteredEquipment.length}</strong> جهاز معملي
        </span>
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setOnlyAvailable(false);
            }}
            className="text-[#0284c7] hover:underline"
          >
            إعادة تعيين الفلاتر
          </button>
        )}
      </div>

      {/* Catalog Grid */}
      {isLoading ? (
        <AcademicSkeleton type="card" count={6} />
      ) : filteredEquipment.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">لا توجد أجهزة مطابقة للمعايير المحددة</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            جرّب تغيير كلمات البحث أو إلغاء تحديد خيار الأجهزة المتاحة فقط لرؤية الأجهزة قيد الإعارة.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setOnlyAvailable(false);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284c7] bg-sky-50 px-3.5 py-2 rounded-lg hover:bg-sky-100 transition min-h-[40px]"
          >
            مسح كافة الفلاتر
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <EquipmentCard key={item.id} equipment={item} />
          ))}
        </div>
      )}
    </div>
  );
}
