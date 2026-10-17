'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBorrowHubStore } from '@/lib/store';
import { 
  Search, Eye, ArrowLeft, Laptop, Smartphone, Tablet, X, 
  ExternalLink, Layers, CheckCircle2, AlertTriangle, ShieldCheck,
  Cpu, Wrench, Bot, Camera, UserCheck, Rule, QrCode, ClipboardCheck
} from 'lucide-react';

interface ScreenItem {
  id: string;
  code: string;
  titleAr: string;
  titleEn: string;
  role: 'student' | 'counter' | 'admin' | 'auth';
  roleLabelAr: string;
  route: string;
  descriptionAr: string;
  icon: React.ReactNode;
}

const SCREENS: ScreenItem[] = [
  {
    id: 'catalog',
    code: 'SCR-01',
    titleAr: 'كتالوج المعدات والأجهزة الأكاديمية',
    titleEn: 'Academic Equipment Catalog',
    role: 'student',
    roleLabelAr: 'خدمات الطلاب',
    route: '/catalog',
    descriptionAr: 'استعراض أجهزة المعامل، فلترة حسب الفئة والتوفر، والتقديم على طلب استعارة جديد',
    icon: <Cpu className="w-5 h-5 text-[#0284c7]" />
  },
  {
    id: 'details',
    code: 'SCR-02',
    titleAr: 'تفاصيل المعدة والمواصفات الفنية',
    titleEn: 'Equipment Details & Borrow Request',
    role: 'student',
    roleLabelAr: 'خدمات الطلاب',
    route: '/catalog/eq-1',
    descriptionAr: 'مواصفات الجهاز، جدول التوفر، شروط العهدة، ونموذج حجز الاستعارة للأغراض الأكاديمية',
    icon: <Wrench className="w-5 h-5 text-[#0284c7]" />
  },
  {
    id: 'student-loans',
    code: 'SCR-03',
    titleAr: 'لوحة طلبات واستعارات الطالب',
    titleEn: 'Student Loans & Requests Portal',
    role: 'student',
    roleLabelAr: 'خدمات الطلاب',
    route: '/student/loans',
    descriptionAr: 'متابعة حالة الطلبات، مواعيد الاستحقاق، سجل العهد السابقة، وطلبات التمديد',
    icon: <QrCode className="w-5 h-5 text-[#0284c7]" />
  },
  {
    id: 'signin',
    code: 'SCR-04',
    titleAr: 'تسجيل دخول الطلاب والكوادر (SSO)',
    titleEn: 'Sign In & Single Sign-On',
    role: 'auth',
    roleLabelAr: 'الدخول والتسجيل',
    route: '/auth/signin',
    descriptionAr: 'المصادقة الأكاديمية للطلاب ومشرفي المعامل وأمناء المستودعات مع مبدل أدوار سريع للتقييم',
    icon: <ShieldCheck className="w-5 h-5 text-slate-600" />
  },
  {
    id: 'register',
    code: 'SCR-05',
    titleAr: 'تسجيل حساب طالب جديد',
    titleEn: 'Student Registration Flow',
    role: 'auth',
    roleLabelAr: 'الدخول والتسجيل',
    route: '/auth/register',
    descriptionAr: 'معالج تسجيل من 3 خطوات، إثبات القيد، رفع البطاقة الجامعية وقبول ميثاق العهدة',
    icon: <UserCheck className="w-5 h-5 text-slate-600" />
  },
  {
    id: 'verify',
    code: 'SCR-06',
    titleAr: 'إدارة واعتماد حسابات الطلاب',
    titleEn: 'Student Account Verification Desk',
    role: 'admin',
    roleLabelAr: 'إدارة المعامل',
    route: '/admin/verification',
    descriptionAr: 'شاشة مقسومة لمراجعة بطاقات الطلاب المرفوعة، مطابقتها مع السجلات، وتفعيل الصلاحيات',
    icon: <UserCheck className="w-5 h-5 text-amber-600" />
  },
  {
    id: 'review',
    code: 'SCR-07',
    titleAr: 'طابور مراجعة طلبات الاستعارة',
    titleEn: 'Admin Requests Review Queue',
    role: 'admin',
    roleLabelAr: 'إدارة المعامل',
    route: '/admin/review',
    descriptionAr: 'مراجعة مسوغات المشاريع البحثية، إقرار الموافقة أو الرفض مع تحديد مهلة التسليم',
    icon: <Rule className="w-5 h-5 text-amber-600" />
  },
  {
    id: 'pickups',
    code: 'SCR-08',
    titleAr: 'شباك تسليم واستلام المعدات المعتمدة',
    titleEn: 'Approved Pickups Counter (Desk)',
    role: 'counter',
    roleLabelAr: 'شبابيك الخدمة',
    route: '/counter/pickups',
    descriptionAr: 'واجهة فني الشباك، مسح الباركود، مطابقة الأرقام التسلسلية، وفحص الملحقات الإلزامية',
    icon: <ClipboardCheck className="w-5 h-5 text-emerald-600" />
  },
  {
    id: 'returns',
    code: 'SCR-09',
    titleAr: 'شباك إرجاع وفحص العتاد',
    titleEn: 'Returns & Technical Inspection Counter',
    role: 'counter',
    roleLabelAr: 'شبابيك الخدمة',
    route: '/counter/returns',
    descriptionAr: 'فحص الحالة الفنية والتشغيلية، التقييم الظاهري، وإصدار شهادة إبراء الذمة المعملية',
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />
  },
  {
    id: 'overdue',
    code: 'SCR-10',
    titleAr: 'لوحة إنذارات العتاد المتأخر',
    titleEn: 'Overdue Loans & Escalations Dashboard',
    role: 'admin',
    roleLabelAr: 'إدارة المعامل',
    route: '/admin/overdue',
    descriptionAr: 'رصد فوري لـ 3 مستويات تصعيد للتأخير، إرسال إنذارات SMS/Email، وتطبيق الحظر الأكاديمي',
    icon: <AlertTriangle className="w-5 h-5 text-red-600" />
  },
  {
    id: 'inventory',
    code: 'SCR-11',
    titleAr: 'إدارة كتالوج ومخزون المعدات',
    titleEn: 'Inventory & Equipment Management',
    role: 'admin',
    roleLabelAr: 'إدارة المعامل',
    route: '/admin/inventory',
    descriptionAr: 'جرد المستودعات، تحديث كميات التوفر، إضافة عهد جديدة، ومتابعة مواعيد المعايرة',
    icon: <Layers className="w-5 h-5 text-amber-600" />
  }
];

export default function HomePage() {
  const { equipment, loans, overdue } = useBorrowHubStore();
  const [selectedRole, setSelectedRole] = useState<'all' | 'student' | 'counter' | 'admin' | 'auth'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewRoute, setPreviewRoute] = useState<string | null>(null);
  const [previewSize, setPreviewSize] = useState<'100%' | '768px' | '400px'>('100%');

  const filteredScreens = SCREENS.filter((screen) => {
    const roleMatch = selectedRole === 'all' || screen.role === selectedRole;
    const searchMatch =
      screen.titleAr.includes(searchQuery) ||
      screen.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      screen.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      screen.descriptionAr.includes(searchQuery);
    return roleMatch && searchMatch;
  });

  const activeLoansCount = loans.filter((l) => l.status === 'active_in_possession').length;
  const pendingApprovalsCount = loans.filter((l) => l.status === 'pending_approval').length;
  const totalAssetsAvailable = equipment.reduce((sum, e) => sum + e.availableQuantity, 0);

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#00236f] to-[#1e3a8a] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#00236f]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0284c7]/20 border border-[#0284c7]/40 text-[#5bb8fe] text-xs font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                <span>Next.js 14/15 App Router · نظام Academic Focus للتصميم</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3 leading-tight">
                منصة استعارة وإدارة المعدات الجامعية
              </h1>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                بنية متكاملة مبنية بـ Next.js وفق تصاميم Google Stitch المعتمدة لدورة حياة الأجهزة المعملية من التصفح والحجز، مروراً بالموافقة والتسليم بالشباك، وحتى الفحص وإبراء الذمة.
              </p>
            </div>

            {/* Live Synchronized KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
              <div className="text-center p-2.5 rounded bg-black/20">
                <div className="text-2xl font-bold font-mono text-white">{totalAssetsAvailable}</div>
                <div className="text-[11px] text-slate-300 mt-1">معدة متاحة</div>
              </div>
              <div className="text-center p-2.5 rounded bg-black/20">
                <div className="text-2xl font-bold font-mono text-[#5bb8fe]">{pendingApprovalsCount}</div>
                <div className="text-[11px] text-slate-300 mt-1">طلب معلق</div>
              </div>
              <div className="text-center p-2.5 rounded bg-black/20">
                <div className="text-2xl font-bold font-mono text-white">{activeLoansCount}</div>
                <div className="text-[11px] text-slate-300 mt-1">عهدة نشطة</div>
              </div>
              <div className="text-center p-2.5 rounded bg-black/20">
                <div className="text-2xl font-bold font-mono text-[#f59e0b]">{overdue.length}</div>
                <div className="text-[11px] text-slate-300 mt-1">إنذار تأخير</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="bg-white border-b border-slate-200 sticky top-16 z-40 shadow-sm py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Role Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'كافة الموديولات (11)' },
              { id: 'student', label: 'خدمات الطلاب (3)' },
              { id: 'counter', label: 'شبابيك الخدمة (2)' },
              { id: 'admin', label: 'إدارة المعامل (4)' },
              { id: 'auth', label: 'الدخول والتسجيل (2)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedRole(tab.id as any)}
                className={`px-3.5 py-1.5 rounded text-xs font-bold whitespace-nowrap transition ${
                  selectedRole === tab.id
                    ? 'bg-[#00236f] text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute start-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث في الشاشات والموديولات..."
              className="w-full ps-8 pe-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0284c7] outline-none"
            />
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Interactive Responsive Sandbox Container */}
        {previewRoute && (
          <div className="mb-10 bg-white rounded-xl border border-slate-300 shadow-xl overflow-hidden animate-in fade-in duration-200">
            {/* Sandbox Toolbar */}
            <div className="bg-[#1e3a8a] text-white px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4 text-[#5bb8fe]" />
                <span className="text-xs font-bold">معاينة الشاشة التفاعلية المدمجة</span>
                <span className="font-mono text-[11px] bg-white/20 px-2 py-0.5 rounded text-white">
                  {previewRoute}
                </span>
              </div>

              {/* Viewport Size Switcher */}
              <div className="flex items-center gap-2">
                <div className="flex bg-white/10 rounded p-0.5 border border-white/20">
                  <button
                    onClick={() => setPreviewSize('100%')}
                    className={`p-1.5 rounded transition ${previewSize === '100%' ? 'bg-white/30 text-white' : 'text-slate-300 hover:text-white'}`}
                    title="سطح المكتب (100%)"
                  >
                    <Laptop className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setPreviewSize('768px')}
                    className={`p-1.5 rounded transition ${previewSize === '768px' ? 'bg-white/30 text-white' : 'text-slate-300 hover:text-white'}`}
                    title="جهاز لوحي (768px)"
                  >
                    <Tablet className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setPreviewSize('400px')}
                    className={`p-1.5 rounded transition ${previewSize === '400px' ? 'bg-white/30 text-white' : 'text-slate-300 hover:text-white'}`}
                    title="هاتف ذكي (400px)"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>

                <Link
                  href={previewRoute}
                  target="_blank"
                  className="inline-flex items-center gap-1 bg-[#0284c7] hover:bg-[#0369a1] text-white px-2.5 py-1 rounded text-xs font-bold transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>فتح في لسان جديد</span>
                </Link>

                <button
                  onClick={() => setPreviewRoute(null)}
                  className="text-white hover:text-red-300 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Viewport frame */}
            <div className="bg-slate-100 p-4 flex justify-center min-h-[600px] max-h-[750px] overflow-hidden">
              <iframe
                src={previewRoute}
                className="bg-white rounded-lg shadow border border-slate-300 transition-all duration-300 h-[600px]"
                style={{ width: previewSize }}
              />
            </div>
          </div>
        )}

        {/* Screen Cards Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScreens.map((screen) => (
            <div
              key={screen.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-[#0284c7] hover:shadow-md transition p-5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded border ${
                      screen.role === 'student'
                        ? 'bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]'
                        : screen.role === 'counter'
                        ? 'bg-[#dcfce7] text-[#166534] border-[#bbf7d0]'
                        : screen.role === 'admin'
                        ? 'bg-[#fef3c7] text-[#b45309] border-[#fde68a]'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {screen.icon}
                    <span>{screen.roleLabelAr}</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {screen.code}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#00236f] group-hover:text-[#0284c7] transition-colors mb-1">
                  {screen.titleAr}
                </h3>
                <p className="text-xs text-slate-400 font-mono mb-2">{screen.titleEn}</p>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {screen.descriptionAr}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setPreviewRoute(screen.route)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0284c7] hover:text-[#00236f] transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>معاينة تفاعلية</span>
                </button>

                <Link
                  href={screen.route}
                  className="inline-flex items-center gap-1 text-xs font-semibold bg-slate-100 hover:bg-[#00236f] hover:text-white text-slate-700 px-3 py-1.5 rounded transition"
                >
                  <span>فتح الشاشة</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
