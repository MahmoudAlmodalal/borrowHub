'use client';

import React, { useState } from 'react';
import { useBorrowHubStore } from '@/lib/store';
import { EquipmentCard } from '@/components/catalog/EquipmentCard';
import { EquipmentCategory } from '@/lib/types';
import { Search, Filter, Cpu, Wrench, Camera, Bot, Layers, Sparkles } from 'lucide-react';

const CATEGORIES: { id: EquipmentCategory | 'all'; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'كافة الأجهزة والمعامل', icon: <Layers className="w-4 h-4" /> },
  { id: 'electronics_measurement', label: 'الإلكترونيات والقياس', icon: <Cpu className="w-4 h-4" /> },
  { id: 'mechanical_fabrication', label: 'الميكانيكا والتصنيع', icon: <Wrench className="w-4 h-4" /> },
  { id: 'robotics_iot', label: 'الروبوتات والإنترنت الذكي', icon: <Bot className="w-4 h-4" /> },
  { id: 'computing_ai', label: 'الحوسبة والذكاء الاصطناعي', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'optics_media', label: 'البصريات والوسائط', icon: <Camera className="w-4 h-4" /> },
];

export default function CatalogPage() {
  const { equipment } = useBorrowHubStore();
  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const filteredEquipment = equipment.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.labLocation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStock = !onlyAvailable || item.availableQuantity > 0;
    return matchesCategory && matchesSearch && matchesStock;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#00236f] to-[#1e3a8a] text-white rounded-xl p-6 sm:p-8 mb-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0284c7]/20 border border-[#0284c7]/40 text-[#5bb8fe] text-xs font-semibold mb-3">
            <span>SCR-01</span>
            <span>·</span>
            <span>بوابة استكشاف الأجهزة الأكاديمية</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            كتالوج المعدات والأجهزة المعملية
          </h1>
          <p className="text-sm text-slate-200 leading-relaxed">
            استعرض أحدث أجهزة القياس، الروبوتات، طابعات النماذج ثلاثية الأبعاد، وحواسيب الذكاء الاصطناعي المتاحة للاستعارة الأكاديمية لمشاريع التخرج والأبحاث العلمية.
          </p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute start-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث باسم الجهاز، الموديل، المعمل أو الرقم الكودي..."
            className="w-full ps-9 pe-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs sm:text-sm focus:ring-1 focus:ring-[#0284c7] focus:border-[#0284c7] outline-none"
          />
        </div>

        {/* Stock Filter Checkbox */}
        <div className="flex items-center gap-4 shrink-0">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="w-4 h-4 rounded text-[#00236f] focus:ring-[#0284c7] border-slate-300"
            />
            <span>المعدات المتوفرة للاستلام الفوري فقط</span>
          </label>
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                isSelected
                  ? 'bg-[#00236f] text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
        <span>عرض {filteredEquipment.length} من أصل {equipment.length} معدة مسجلة</span>
      </div>

      {/* Equipment Grid */}
      {filteredEquipment.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 text-center py-16 px-4">
          <Filter className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">لا توجد معدات مطابقة للبحث</h3>
          <p className="text-xs text-slate-500 mb-4">
            جرب تعديل كلمات البحث أو إلغاء تحديد التصفية لعرض جميع الأجهزة المتاحة.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setOnlyAvailable(false);
            }}
            className="inline-flex items-center gap-1.5 bg-[#00236f] hover:bg-[#0284c7] text-white text-xs font-semibold px-4 py-2 rounded transition"
          >
            إعادة تعيين عوامل التصفية
          </button>
        </div>
      )}
    </div>
  );
}
