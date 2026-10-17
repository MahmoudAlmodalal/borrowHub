'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useBorrowHubStore } from '@/lib/store';
import { Equipment, EquipmentCategory } from '@/lib/types';
import {
  Plus,
  Search,
  Box,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  SlidersHorizontal,
  ExternalLink,
  MapPin,
  X,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function InventoryManagementPage() {
  const { equipment, addEquipment, updateEquipment } = useBorrowHubStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New equipment form state
  const [newNameAr, setNewNameAr] = useState('');
  const [newNameEn, setNewNameEn] = useState('');
  const [newCode, setNewCode] = useState('EQ-NEW-' + Math.floor(1000 + Math.random() * 9000));
  const [newCategory, setNewCategory] = useState<EquipmentCategory>('electronics_measurement');
  const [newTotalQty, setNewTotalQty] = useState(4);
  const [newLabLocation, setNewLabLocation] = useState('معمل الإلكترونيات - قاعة 101');
  const [newManufacturer, setNewManufacturer] = useState('Tektronix');
  const [newMaxDays, setNewMaxDays] = useState(14);
  const [newDescAr, setNewDescAr] = useState('');

  const filteredItems = equipment.filter((eq) => {
    const matchesCat = categoryFilter === 'all' || eq.category === categoryFilter;
    const matchesSearch =
      eq.nameAr.includes(searchQuery) ||
      eq.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.labLocation.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  const handleCreateEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    addEquipment({
      code: newCode,
      nameAr: newNameAr,
      nameEn: newNameEn || newNameAr,
      category: newCategory,
      categoryLabelAr:
        newCategory === 'electronics_measurement'
          ? 'الإلكترونيات والقياس'
          : newCategory === 'robotics_iot'
          ? 'الروبوتات والإنترنت الذكي'
          : newCategory === 'mechanical_fabrication'
          ? 'الميكانيكا والتصنيع'
          : newCategory === 'computing_ai'
          ? 'الحوسبة والذكاء الاصطناعي'
          : 'البصريات والوسائط',
      model: 'Model-' + newCode,
      manufacturer: newManufacturer,
      labLocation: newLabLocation,
      totalQuantity: Number(newTotalQty),
      availableQuantity: Number(newTotalQty),
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxTUeTJ0Ki5nyvJ-tbfcl0zqZsS7_UaagqOYodEAka-SCzte-vZ-6VwEBIOcvlJwNXruN6a3TpurTq9ZdbrDBZM-BUfiGp91I7cII--05MW833fcUOBD8T1uUjUe4CWSXrVchLNMwCM5ce2zRw6EHivUBmuLtZbauYBkU4zDzxppwkYUV5HFSXrMOlDnjTEtJbNYiRVr8VbLJFvN-qcjkvsDChPgST3CNoQmdXu9SG6PHLOQAj84lZ_g',
      maxLoanDays: Number(newMaxDays),
      requiresSupervisorApproval: true,
      specs: [
        { label: 'سنة التوريد', value: '2026' },
        { label: 'فئة الضمان الأكاديمي', value: 'معتمد 3 سنوات' },
      ],
      accessories: ['كابل التغذية الثلاثي', 'دليل الاستخدام المعملي'],
      safetyGuidelines: ['فحص الجهد الكهربائي قبل التوصيل', 'إعادة الجهاز للحقيبة المخصصة'],
      descriptionAr: newDescAr || 'عتاد معملي متطور مخصص لمشاريع التخرج والأبحاث الجامعية.',
      descriptionEn: 'Advanced lab equipment for academic research.',
    });

    setShowAddModal(false);
    setNewNameAr('');
    setNewNameEn('');
    setNewCode('EQ-NEW-' + Math.floor(1000 + Math.random() * 9000));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              إدارة المخزون والعهد المعملية (Inventory Management)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            جرد الأصول، إدارة الكميات المتوفرة، وإضافة معدات وأجهزة معملية جديدة
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#00236f] hover:bg-[#001b55] text-white transition shadow-xs min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة جهاز معملي جديد</span>
          </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بكود الأصل، اسم الجهاز، أو المعمل..."
            className="w-full ps-9 pe-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#00236f] focus:outline-none min-h-[40px]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'electronics_measurement', label: 'إلكترونيات' },
            { id: 'robotics_iot', label: 'روبوتات' },
            { id: 'mechanical_fabrication', label: 'ميكانيكا' },
            { id: 'computing_ai', label: 'ذكاء اصطناعي' },
            { id: 'optics_media', label: 'بصريات' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition min-h-[36px] ${
                categoryFilter === cat.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Items List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="p-3.5 text-start">كود الأصل</th>
                <th className="p-3.5 text-start">اسم الجهاز والنوع</th>
                <th className="p-3.5 text-start">مقر المعمل</th>
                <th className="p-3.5 text-center">الرصيد الكلي</th>
                <th className="p-3.5 text-center">المتاح للإعارة</th>
                <th className="p-3.5 text-center">حالة التوفر</th>
                <th className="p-3.5 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => {
                const isAvailable = item.availableQuantity > 0;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {item.code}
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{item.nameAr}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{item.manufacturer} - {item.categoryLabelAr}</div>
                    </td>
                    <td className="p-3.5 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[200px]">{item.labLocation}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-center font-mono font-bold text-slate-700">
                      {item.totalQuantity}
                    </td>
                    <td className="p-3.5 text-center font-mono font-bold text-slate-900">
                      {item.availableQuantity}
                    </td>
                    <td className="p-3.5 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                          isAvailable
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {isAvailable ? 'متاح للاستعارة' : 'محجوز بالكامل'}
                      </span>
                    </td>
                    <td className="p-3.5 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/catalog/${item.id}`}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#00236f] hover:bg-slate-100 transition"
                          title="عرض في الكتالوج كطالب"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() =>
                            updateEquipment(item.id, {
                              availableQuantity: Math.min(item.totalQuantity, item.availableQuantity + 1),
                            })
                          }
                          className="px-2 py-1 text-[11px] font-bold rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                          title="زيادة الكمية المتاحة (+1)"
                        >
                          +1 متاح
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Equipment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs" dir="rtl">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-600" />
                <span>إضافة عهدة معملية جديدة للمستودع</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEquipment} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">اسم الجهاز بالعربية:</label>
                <input
                  type="text"
                  value={newNameAr}
                  onChange={(e) => setNewNameAr(e.target.value)}
                  required
                  placeholder="مثال: مجهر إلكتروني ماسح ثلاثي الأبعاد"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none min-h-[40px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">كود الأصل (Serial/Code):</label>
                  <input
                    type="text"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none min-h-[40px]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">القسم المعملي:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none min-h-[40px]"
                  >
                    <option value="electronics_measurement">الإلكترونيات والقياس</option>
                    <option value="robotics_iot">الروبوتات والإنترنت الذكي</option>
                    <option value="mechanical_fabrication">الميكانيكا والتصنيع</option>
                    <option value="computing_ai">الحوسبة والذكاء الاصطناعي</option>
                    <option value="optics_media">البصريات والوسائط</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">الكمية الإجمالية:</label>
                  <input
                    type="number"
                    min={1}
                    value={newTotalQty}
                    onChange={(e) => setNewTotalQty(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm font-mono min-h-[40px]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">الشركة المصنعة:</label>
                  <input
                    type="text"
                    value={newManufacturer}
                    onChange={(e) => setNewManufacturer(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm min-h-[40px]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">أقصى مدة (أيام):</label>
                  <input
                    type="number"
                    min={1}
                    value={newMaxDays}
                    onChange={(e) => setNewMaxDays(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm font-mono min-h-[40px]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">مقر المعمل والقاعة:</label>
                <input
                  type="text"
                  value={newLabLocation}
                  onChange={(e) => setNewLabLocation(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm min-h-[40px]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm transition min-h-[44px]"
                >
                  حفظ وتسجيل الأصل في المستودع
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 min-h-[44px]"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
