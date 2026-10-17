'use client';

import React, { useState } from 'react';
import { useBorrowHubStore } from '@/lib/store';
import { Equipment, EquipmentCategory } from '@/lib/types';
import { 
  Plus, Search, Filter, Box, Wrench, CheckCircle2, Clock, 
  ArrowUpRight, AlertCircle, X, ShieldCheck
} from 'lucide-react';

export default function InventoryManagementPage() {
  const { equipment, addEquipment } = useBorrowHubStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Equipment Form State
  const [nameAr, setNameAr] = useState('');
  const [model, setModel] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [category, setCategory] = useState<EquipmentCategory>('electronics_measurement');
  const [labLocation, setLabLocation] = useState('معمل الإلكترونيات - قاعة 204');
  const [totalQuantity, setTotalQuantity] = useState(5);
  const [maxLoanDays, setMaxLoanDays] = useState(7);
  const [descriptionAr, setDescriptionAr] = useState('');

  const filteredEquipment = equipment.filter(
    (e) =>
      e.nameAr.includes(searchQuery) ||
      e.model.includes(searchQuery) ||
      e.code.includes(searchQuery) ||
      e.labLocation.includes(searchQuery)
  );

  const totalAssetsCount = equipment.reduce((sum, e) => sum + e.totalQuantity, 0);
  const availableAssetsCount = equipment.reduce((sum, e) => sum + e.availableQuantity, 0);
  const loanedAssetsCount = totalAssetsCount - availableAssetsCount;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAr || !model) return;

    addEquipment({
      code: `EQ-NEW-${Math.floor(10 + Math.random() * 90)}`,
      nameAr,
      nameEn: model,
      category,
      categoryLabelAr: 'أجهزة المعامل المضافة حديثاً',
      model,
      manufacturer: manufacturer || 'معتمد للأغراض الأكاديمية',
      labLocation,
      totalQuantity: Number(totalQuantity),
      availableQuantity: Number(totalQuantity),
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxTUeTJ0Ki5nyvJ-tbfcl0zqZsS7_UaagqOYodEAka-SCzte-vZ-6VwEBIOcvlJwNXruN6a3TpurTq9ZdbrDBZM-BUfiGp91I7cII--05MW833fcUOBD8T1uUjUe4CWSXrVchLNMwCM5ce2zRw6EHivUBmuLtZbauYBkU4zDzxppwkYUV5HFSXrMOlDnjTEtJbNYiRVr8VbLJFvN-qcjkvsDChPgST3CNoQmdXu9SG6PHLOQAj84lZ_g',
      maxLoanDays: Number(maxLoanDays),
      requiresSupervisorApproval: true,
      specs: [
        { label: 'الموديل', value: model },
        { label: 'المصنع', value: manufacturer || 'جامعي' },
      ],
      accessories: ['كابل التغذية الكهربائية', 'حقيبة الحماية المخصصة'],
      safetyGuidelines: ['الالتزام بتعليمات المشرف وفصل الجهاز بعد الاستخدام'],
      descriptionAr: descriptionAr || 'معدة معملية جديدة مضافة حديثاً لمستودعات الكلية.',
      descriptionEn: 'Newly added university laboratory equipment.',
    });

    setIsAddModalOpen(false);
    setNameAr('');
    setModel('');
    setDescriptionAr('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold mb-1">
            <span>SCR-11</span>
            <span>·</span>
            <span>إدارة المستودعات وكتالوج الأصول المعملية</span>
          </div>
          <h1 className="text-2xl font-bold text-[#00236f]">إدارة كتالوج ومخزون المعدات (SCR-10)</h1>
          <p className="text-xs text-slate-500">
            جرد الأصول المعملية، ضبط كميات التوفر، وتحديث مواعيد الصيانة الدورية والمعايرة
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 bg-[#00236f] hover:bg-[#0284c7] text-white text-xs font-bold px-4 py-2.5 rounded transition shadow-sm whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة معدة معملية جديدة</span>
        </button>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium mb-1">إجمالي الأصول المعملية</div>
          <div className="text-2xl font-bold text-[#00236f] font-mono">{totalAssetsCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">عبر كافة الكليات والمعامل</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium mb-1">المتوفر في المستودع</div>
          <div className="text-2xl font-bold text-emerald-600 font-mono">{availableAssetsCount}</div>
          <div className="text-[11px] text-emerald-600 mt-1">جاهز للإعارة فوراً</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium mb-1">في عهدة الطلاب حالياً</div>
          <div className="text-2xl font-bold text-[#0284c7] font-mono">{loanedAssetsCount}</div>
          <div className="text-[11px] text-[#0284c7] mt-1">قيد الاستخدام الأكاديمي</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium mb-1">قيد الصيانة والمعايرة</div>
          <div className="text-2xl font-bold text-amber-600 font-mono">2</div>
          <div className="text-[11px] text-amber-600 mt-1">مختبر القياس المركزي</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute start-3 top-2.5" />
          <input
            type="text"
            placeholder="بحث في المخزون بالاسم، الموديل، كود الأصل، أو المعمل..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ps-9 pe-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0284c7] outline-none"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <th className="py-3 px-4 text-start">كود الأصل</th>
                <th className="py-3 px-4 text-start">اسم المعدة والموديل</th>
                <th className="py-3 px-4 text-start">المعمل والكلية</th>
                <th className="py-3 px-4 text-start">إجمالي الأجهزة</th>
                <th className="py-3 px-4 text-start">المتوفر للإعارة</th>
                <th className="py-3 px-4 text-start">أقصى مدة</th>
                <th className="py-3 px-4 text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEquipment.map((eq, idx) => (
                <tr
                  key={eq.id}
                  className={`hover:bg-slate-50 transition ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-[#f7f9fb]/40'
                  }`}
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-[#00236f]">
                    {eq.code}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800">{eq.nameAr}</div>
                    <div className="text-[11px] font-mono text-slate-400">{eq.model}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {eq.labLocation}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                    {eq.totalQuantity} أجهزة
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded text-[11px] ${
                        eq.availableQuantity > 0
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>{eq.availableQuantity} متوفر</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">
                    {eq.maxLoanDays} أيام
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <a
                      href={`/catalog/${eq.id}`}
                      className="text-[#0284c7] hover:text-[#00236f] font-semibold text-xs inline-flex items-center gap-1"
                    >
                      <span>عرض</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Equipment Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 end-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-[#00236f] mb-1">إضافة معدة معملية جديدة للكتالوج</h3>
            <p className="text-xs text-slate-500 mb-4">
              تسجيل أصل معملي جديد وربطه بالمستودع لإتاحته لاستعارات الطلاب والباحثين
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">اسم المعدة (عربي)</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: جهاز محطة لحام دقيقة Hakko FX-888D"
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0284c7] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">الموديل الفني</label>
                  <input
                    type="text"
                    required
                    placeholder="FX-888D"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0284c7] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">الشركة المصنعة</label>
                  <input
                    type="text"
                    placeholder="Hakko Corporation"
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0284c7] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">التصنيف المعملي</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as EquipmentCategory)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0284c7] outline-none"
                >
                  <option value="electronics_measurement">الإلكترونيات وأجهزة القياس</option>
                  <option value="mechanical_fabrication">الميكانيكا والتصنيع الرقمي</option>
                  <option value="robotics_iot">الروبوتات والإنترنت الذكي</option>
                  <option value="computing_ai">الحوسبة والذكاء الاصطناعي</option>
                  <option value="optics_media">البصريات والتوثيق الإعلامي</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">المعمل والمقر</label>
                  <input
                    type="text"
                    required
                    value={labLocation}
                    onChange={(e) => setLabLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0284c7] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">الكمية المسجلة</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={totalQuantity}
                    onChange={(e) => setTotalQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0284c7] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">الوصف العام والأغراض</label>
                <textarea
                  rows={2}
                  placeholder="وصف مختصر لمجال استخدام الجهاز في المعامل..."
                  value={descriptionAr}
                  onChange={(e) => setDescriptionAr(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0284c7] outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#00236f] hover:bg-[#0284c7] text-white text-xs font-bold py-2 rounded transition"
                >
                  إضافة الأصل للمخزون
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2 rounded"
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
