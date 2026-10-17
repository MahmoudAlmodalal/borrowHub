'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useBorrowHubStore } from '@/lib/store';
import { UserRole } from '@/lib/types';
import { BrandLogo } from './BrandLogo';
import {
  X,
  GraduationCap,
  ClipboardCheck,
  ShieldAlert,
  Settings2,
  Box,
  Layers,
  FileCheck,
  AlertTriangle,
  RotateCcw,
  Check,
  ArrowRight,
  LogOut,
  QrCode,
} from 'lucide-react';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentRole, setRole, loans, students, overdue, resetDemoState } = useBorrowHubStore();

  if (!isOpen) return null;

  const pendingApprovalsCount = loans.filter((l) => l.status === 'pending_approval').length;
  const readyPickupsCount = loans.filter((l) => l.status === 'approved_ready_for_pickup').length;
  const overdueCount = overdue.length;
  const pendingStudentsCount = students.filter((s) => s.verificationStatus === 'pending').length;

  const handleRoleChange = (role: UserRole, targetRoute: string) => {
    setRole(role);
    router.push(targetRoute);
    onClose();
  };

  const roleConfigs = [
    {
      id: 'student' as UserRole,
      title: 'بوابة الطلاب والباحثين',
      icon: GraduationCap,
      color: 'text-sky-600 bg-sky-50 border-sky-200',
      defaultRoute: '/catalog',
      sections: [
        { href: '/catalog', label: 'كتالوج الأجهزة والعتاد', icon: Box },
        { href: '/loans', label: 'لوحة استعاراتي وباركود الاستلام', icon: QrCode, badge: readyPickupsCount > 0 ? `${readyPickupsCount} جاهز` : undefined },
        { href: '/register', label: 'تسجيل وتوثيق الحساب الجامعي', icon: FileCheck },
      ],
    },
    {
      id: 'counter_tech' as UserRole,
      title: 'شباك تسليم واستلام المعامل',
      icon: ClipboardCheck,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      defaultRoute: '/pickups',
      sections: [
        { href: '/pickups', label: 'شباك تسليم العهد (Pickups)', icon: ClipboardCheck, badge: readyPickupsCount > 0 ? `${readyPickupsCount} للتسليم` : undefined },
        { href: '/returns', label: 'فحص واستلام المرتجعات', icon: Layers },
        { href: '/inventory', label: 'مستودع الأجهزة المتوفرة', icon: Box },
      ],
    },
    {
      id: 'supervisor' as UserRole,
      title: 'إشراف المعامل والمشاريع',
      icon: ShieldAlert,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      defaultRoute: '/review',
      sections: [
        { href: '/review', label: 'طابور مراجعة واعتماد الطلبات', icon: ShieldAlert, badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount} جديد` : undefined },
        { href: '/overdue', label: 'لوحة المتأخرات والإشعار', icon: AlertTriangle, badge: overdueCount > 0 ? `${overdueCount} متأخر` : undefined },
        { href: '/catalog', label: 'استعراض مواصفات العتاد', icon: Box },
      ],
    },
    {
      id: 'admin' as UserRole,
      title: 'إدارة النظام والاعتمادات',
      icon: Settings2,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      defaultRoute: '/inventory',
      sections: [
        { href: '/inventory', label: 'إدارة المخزون والعهد المعملية', icon: Box },
        { href: '/verification', label: 'اعتماد هويات الطلاب', icon: FileCheck, badge: pendingStudentsCount > 0 ? `${pendingStudentsCount} طلب` : undefined },
        { href: '/review', label: 'مراجعة كافة الطلبات', icon: ShieldAlert },
        { href: '/overdue', label: 'المتأخرات والحجز الأكاديمي', icon: AlertTriangle },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" dir="rtl">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="fixed inset-y-0 start-0 max-w-xs sm:max-w-sm w-full bg-white shadow-2xl flex flex-col z-10 transition-transform">
        {/* Header */}
        <div className="p-4 bg-[#00236f] text-white flex items-center justify-between border-b border-[#1e3a8a]">
          <BrandLogo showSubtitle={false} />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
            aria-label="إغلاق القائمة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Quick Selector Banner */}
        <div className="p-3 bg-slate-50 border-b border-slate-200">
          <div className="text-[11px] font-bold text-slate-500 mb-1.5">
            الدور الأكاديمي النشط (اضغط للتبديل والربط الفوري):
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: 'student', label: 'طالب / باحث', icon: GraduationCap },
              { id: 'counter_tech', label: 'فني الشباك', icon: ClipboardCheck },
              { id: 'supervisor', label: 'مشرف المعمل', icon: ShieldAlert },
              { id: 'admin', label: 'مسؤول النظام', icon: Settings2 },
            ].map((r) => {
              const isCurrent = currentRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => handleRoleChange(r.id as UserRole, r.id === 'student' ? '/catalog' : r.id === 'counter_tech' ? '/pickups' : r.id === 'supervisor' ? '/review' : '/inventory')}
                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-semibold text-start border transition ${
                    isCurrent
                      ? 'bg-[#00236f] text-white border-[#00236f]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <r.icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{r.label}</span>
                  {isCurrent && <Check className="w-3 h-3 ms-auto text-[#5bb8fe]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Nav Clusters */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {roleConfigs.map((group) => {
            const isRoleActive = currentRole === group.id;
            return (
              <div
                key={group.id}
                className={`rounded-xl border transition-all ${
                  isRoleActive ? 'border-sky-300 bg-sky-50/40 p-3' : 'border-slate-200 p-2.5'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`p-1.5 rounded-md ${group.color}`}>
                      <group.icon className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-bold text-slate-800">{group.title}</span>
                  </div>
                  {isRoleActive && (
                    <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                      الدور الحالي
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  {group.sections.map((link) => {
                    const isLinkActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={onClose}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                          isLinkActive
                            ? 'bg-[#00236f] text-white font-bold'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <link.icon className="w-3.5 h-3.5 opacity-70" />
                          <span>{link.label}</span>
                        </div>
                        {link.badge && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                            isLinkActive ? 'bg-sky-500 text-white' : 'bg-rose-100 text-rose-700'
                          }`}>
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
          <button
            onClick={() => {
              resetDemoState();
              onClose();
            }}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-semibold p-2 rounded-lg hover:bg-slate-200 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة ضبط البيانات</span>
          </button>

          <Link
            href="/signin"
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs bg-[#00236f] text-white font-semibold px-3 py-2 rounded-lg hover:bg-[#001b55] transition"
          >
            <span>شاشة الدخول</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
