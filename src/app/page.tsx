'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBorrowHubStore } from '@/lib/store';
import { UserRole } from '@/lib/types';
import {
  GraduationCap,
  ClipboardCheck,
  ShieldAlert,
  Settings2,
  Box,
  QrCode,
  Layers,
  FileCheck,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { currentRole, setRole, equipment, loans, overdue, students } = useBorrowHubStore();

  const pendingApprovalsCount = loans.filter((l) => l.status === 'pending_approval').length;
  const readyPickupsCount = loans.filter((l) => l.status === 'approved_ready_for_pickup').length;
  const activeLoansCount = loans.filter((l) => l.status === 'active_in_possession').length;
  const overdueCount = overdue.length;
  const pendingStudentsCount = students.filter((s) => s.verificationStatus === 'pending').length;

  const handleRoleSelect = (role: UserRole, targetRoute: string) => {
    setRole(role);
    router.push(targetRoute);
  };

  const roleWorkspaces = [
    {
      role: 'student' as UserRole,
      title: 'بوابة الطالب والباحث',
      titleEn: 'Student & Researcher',
      icon: GraduationCap,
      color: 'sky',
      badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
      activeBorder: 'border-sky-500 ring-2 ring-sky-200',
      description: 'استعراض الأجهزة المعملية، حجز العتاد لمشاريع التخرج، متابعة حالة الطلب وتقديم طلبات التمديد.',
      defaultRoute: '/catalog',
      modules: [
        { href: '/catalog', label: 'كتالوج الأجهزة والعتاد', desc: 'تصفح وفلترة 5 فئات معملية وحجز المعدات' },
        { href: '/loans', label: 'لوحة استعاراتي وتذاكر الاستلام', desc: 'عرض الباركود الرقمي وطلب تمديد فترة الإعارة', badge: readyPickupsCount > 0 ? `${readyPickupsCount} جاهز للاستلام` : undefined },
        { href: '/register', label: 'تسجيل وتوثيق الحساب الأكاديمي', desc: 'رفع البطاقة الجامعية للحصول على تصريح الاستعارة' },
      ],
    },
    {
      role: 'counter_tech' as UserRole,
      title: 'شباك التسليم والاستلام (فني المعمل)',
      titleEn: 'Counter Technician',
      icon: ClipboardCheck,
      color: 'emerald',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-200',
      description: 'تسليم الأجهزة المعتمدة للطلاب بالباركود، فحص الأجهزة المرتجعة، وإخلاء طرف الطالب فوراً.',
      defaultRoute: '/pickups',
      modules: [
        { href: '/pickups', label: 'شباك التسليم (Pickups Counter)', desc: 'مطابقة هوية الطالب وطباعة بطاقة التسليم', badge: readyPickupsCount > 0 ? `${readyPickupsCount} للتسليم` : undefined },
        { href: '/returns', label: 'فحص واستلام المرتجعات', desc: 'فحص الملحقات وسلامة الهيكل وإخلاء الطرف المعملي' },
        { href: '/inventory', label: 'مستودع الأجهزة المتاحة', desc: 'تتبع كميات الأجهزة الجاهزة للإعارة في المعمل' },
      ],
    },
    {
      role: 'supervisor' as UserRole,
      title: 'مشرف المعامل والمشاريع',
      titleEn: 'Lab Supervisor',
      icon: ShieldAlert,
      color: 'amber',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
      activeBorder: 'border-amber-500 ring-2 ring-amber-200',
      description: 'مراجعة طلبات استعارة الأجهزة الحساسة، تعيين الأرقام التسلسلية، ومتابعة متأخرات الطلاب.',
      defaultRoute: '/review',
      modules: [
        { href: '/review', label: 'طابور مراجعة الطلبات (Review Queue)', desc: 'اعتماد أو رفض طلبات الاستعارة مع تخصيص السيريال', badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount} بانتظار الاعتماد` : undefined },
        { href: '/overdue', label: 'لوحة المتأخرات والإشعار', desc: 'إرسال إنذارات SMS وبريد رسمي للمتأخرين', badge: overdueCount > 0 ? `${overdueCount} متأخرات حرجة` : undefined },
        { href: '/catalog', label: 'مواصفات الأجهزة المعملية', desc: 'الاطلاع على قيود وإرشادات السلامة لكل جهاز' },
      ],
    },
    {
      role: 'admin' as UserRole,
      title: 'مسؤول النظام وعمادة الكلية',
      titleEn: 'System Administrator',
      icon: Settings2,
      color: 'purple',
      badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
      activeBorder: 'border-purple-500 ring-2 ring-purple-200',
      description: 'إدارة مخزون الأجهزة المعملية، اعتماد حسابات الطلاب الجدد، وتطبيق الحجز الأكاديمي.',
      defaultRoute: '/inventory',
      modules: [
        { href: '/inventory', label: 'إدارة المخزون والعتاد (Inventory)', desc: 'إضافة أجهزة جديدة وتعديل الكميات والمواقع المعملية' },
        { href: '/verification', label: 'اعتماد حسابات الطلاب (Verification)', desc: 'فحص الهويات والتحقق من القيد الأكاديمي', badge: pendingStudentsCount > 0 ? `${pendingStudentsCount} حساب جديد` : undefined },
        { href: '/review', label: 'طابور المراجعة الشامل', desc: 'الإشراف على كافة تدفقات الاستعارة في الأقسام' },
        { href: '/overdue', label: 'إدارة الحجز الأكاديمي (Academic Hold)', desc: 'إيقاف الخدمات الجامعية عند التخلف عن إرجاع العهد' },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8" dir="rtl">
      {/* Hero Banner with Role Linking Announcement */}
      <section className="bg-gradient-to-br from-[#00236f] via-[#0034a5] to-[#0284c7] text-white rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-xs mb-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-[#5bb8fe]" />
            <span>نظام مترابط بالكامل حسب الأدوار الأكاديمية (Role-Linked Architecture)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            منظومة استعارة وإدارة المعدات الجامعية
          </h1>
          <p className="mt-3 text-sm sm:text-base text-blue-100 leading-relaxed">
            اربط دورة الاستعارة كاملة: من حجز الطالب في الكتالوج، إلى مراجعة المشرف، وتسليم واستلام فني المعمل بالشباك، وحتى إدارة المخزون والحجز الأكاديمي.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleRoleSelect('student', '/catalog')}
              className="inline-flex items-center gap-2 bg-white text-[#00236f] font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm hover:bg-blue-50 transition shadow-sm min-h-[44px]"
            >
              <span>دخول كطالب (كتالوج الأجهزة)</span>
              <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
            </button>

            <button
              onClick={() => handleRoleSelect('counter_tech', '/pickups')}
              className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm hover:bg-emerald-600 transition shadow-sm min-h-[44px]"
            >
              <span>دخول كفني شباك (تسليم واستلام)</span>
              <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
            </button>

            <button
              onClick={() => handleRoleSelect('supervisor', '/review')}
              className="inline-flex items-center gap-2 bg-amber-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm hover:bg-amber-600 transition shadow-sm min-h-[44px]"
            >
              <span>دخول كمشرف (اعتماد الطلبات)</span>
              <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
            </button>
          </div>
        </div>

        {/* Decorative corner element */}
        <div className="absolute -end-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full pointer-events-none blur-2xl" />
      </section>

      {/* Real-time KPI Ribbon */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>الطلبات الجديدة</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {pendingApprovalsCount}
          </div>
          <Link href="/review" className="text-[11px] text-amber-600 font-medium hover:underline mt-1 inline-block">
            طابور المشرف ←
          </Link>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>جاهزة للتسليم</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {readyPickupsCount}
          </div>
          <Link href="/pickups" className="text-[11px] text-emerald-600 font-medium hover:underline mt-1 inline-block">
            شباك الاستلام ←
          </Link>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>عهد نشطة بالمعامل</span>
            <Box className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {activeLoansCount}
          </div>
          <Link href="/returns" className="text-[11px] text-sky-600 font-medium hover:underline mt-1 inline-block">
            فحص المرتجعات ←
          </Link>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>إنذارات التأخير</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {overdueCount}
          </div>
          <Link href="/overdue" className="text-[11px] text-rose-600 font-medium hover:underline mt-1 inline-block">
            لوحة المتأخرات ←
          </Link>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>هويات بانتظار التوثيق</span>
            <FileCheck className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {pendingStudentsCount}
          </div>
          <Link href="/verification" className="text-[11px] text-purple-600 font-medium hover:underline mt-1 inline-block">
            اعتماد الطلاب ←
          </Link>
        </div>
      </section>

      {/* Role-Based Connected Workspaces Matrix */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              مصفوفة الشاشات المترابطة حسب الصلاحيات
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              اختر دورك الأكاديمي للانتقال الفوري إلى الشاشات المخصصة وتجربة تدفق البيانات الحي:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roleWorkspaces.map((ws) => {
            const isCurrent = currentRole === ws.role;
            return (
              <div
                key={ws.role}
                className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all ${
                  isCurrent ? ws.activeBorder + ' shadow-md' : 'border-slate-200 shadow-xs hover:border-slate-300'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      ws.role === 'student' ? 'bg-sky-100 text-sky-700' :
                      ws.role === 'counter_tech' ? 'bg-emerald-100 text-emerald-700' :
                      ws.role === 'supervisor' ? 'bg-amber-100 text-amber-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      <ws.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900">{ws.title}</h3>
                      <span className="text-[11px] text-slate-400 font-medium">{ws.titleEn}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRoleSelect(ws.role, ws.defaultRoute)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition min-h-[36px] ${
                      isCurrent
                        ? 'bg-[#00236f] text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isCurrent ? 'الدور المفعّل حالياً' : 'تفعيل هذا الدور'}
                  </button>
                </div>

                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {ws.description}
                </p>

                {/* Sub-modules list */}
                <div className="space-y-2 border-t border-slate-100 pt-3">
                  {ws.modules.map((m) => (
                    <Link
                      key={m.href}
                      href={m.href}
                      onClick={() => {
                        if (currentRole !== ws.role) setRole(ws.role);
                      }}
                      className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200 min-h-[44px]"
                    >
                      <div className="min-w-0 flex-1 pe-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-800 group-hover:text-[#0284c7] transition-colors">
                            {m.label}
                          </span>
                          {m.badge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                              {m.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {m.desc}
                        </p>
                      </div>

                      <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-[#0284c7] group-hover:-translate-x-0.5 transition-transform shrink-0 rtl:rotate-0 ltr:rotate-180" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* The Lifecycle Interconnection Flow Guide */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#5bb8fe] mb-2">
            <Zap className="w-4 h-4" />
            <span>خارطة تدفق البيانات بين الشاشات (End-to-End Workflow)</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold">
            كيف ترتبط الشاشات ببعضها في الوقت الفعلي؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            جرب تنفيذ عملية حجز واحدة لمشاهدة انعكاسها الفوري في باقي الشاشات:
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-xs font-mono text-sky-400 font-bold mb-1">الخطوة 1: الطالب</div>
            <h4 className="text-sm font-bold">طلب حجز جهاز</h4>
            <p className="text-xs text-slate-300 mt-1">
              يختار الطالب جهازاً من <Link href="/catalog" className="text-sky-300 underline">الكتالوج</Link> ويقدم طلب الاستعارة لمشروع تخرجه.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-xs font-mono text-amber-400 font-bold mb-1">الخطوة 2: المشرف</div>
            <h4 className="text-sm font-bold">مراجعة واعتماد الطلب</h4>
            <p className="text-xs text-slate-300 mt-1">
              يظهر الطلب فوراً في <Link href="/review" className="text-amber-300 underline">طابور المراجعة</Link>. يضغط المشرف اعتماد وتعيين السيريال.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-xs font-mono text-emerald-400 font-bold mb-1">الخطوة 3: فني الشباك</div>
            <h4 className="text-sm font-bold">التسليم بالباركود</h4>
            <p className="text-xs text-slate-300 mt-1">
              يتحول الطلب إلى <Link href="/pickups" className="text-emerald-300 underline">شباك التسليم</Link>. يفحص الفني الباركود ويضغط تسليم العهدة.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-xs font-mono text-purple-400 font-bold mb-1">الخطوة 4: الإرجاع والمخزون</div>
            <h4 className="text-sm font-bold">الفحص وإخلاء الطرف</h4>
            <p className="text-xs text-slate-300 mt-1">
              في <Link href="/returns" className="text-purple-300 underline">شباك الإرجاع</Link> يتم فحص الملحقات وإعادة الجهاز لرصيد <Link href="/inventory" className="text-purple-300 underline">المستودع</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
