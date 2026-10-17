'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useBorrowHubStore } from '@/lib/store';
import { StudentAccount } from '@/lib/types';
import {
  ShieldCheck,
  Check,
  X,
  Search,
  UserCheck,
  AlertCircle,
  FileText,
  Phone,
  Mail,
  Building,
  Users,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function StudentVerificationPage() {
  const { students, verifyStudent } = useBorrowHubStore();
  const [filter, setFilter] = useState<'pending' | 'verified' | 'all'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const filteredStudents = students.filter((s) => {
    const matchesFilter = filter === 'all' || s.verificationStatus === filter;
    const matchesSearch =
      s.fullNameAr.includes(searchQuery) ||
      s.studentIdNumber.includes(searchQuery) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.college.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const selectedStudent =
    filteredStudents.find((s) => s.id === selectedStudentId) || filteredStudents[0] || null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              اعتماد هويات وحسابات الطلاب (Student Account Verification)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            مراجعة البطاقات الجامعية وإعطاء صلاحيات الاستعارة الأكاديمية للطلاب والباحثين
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition shadow-xs min-h-[44px]"
          >
            <span>شاشة تسجيل طالب جديد ←</span>
          </Link>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالاسم، الرقم الجامعي، أو البريد..."
            className="w-full ps-9 pe-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none min-h-[40px]"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'pending', label: 'بانتظار الاعتماد', count: students.filter((s) => s.verificationStatus === 'pending').length },
            { id: 'verified', label: 'الحسابات المعتمدة' },
            { id: 'all', label: 'كافة الطلاب' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition min-h-[38px] ${
                filter === tab.id
                  ? 'bg-purple-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className="ms-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-purple-200 text-purple-900 font-mono">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Student list + Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left col: Student list (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          {filteredStudents.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="text-xs font-bold">لا توجد حسابات معلقة في هذا التصنيف</p>
            </div>
          ) : (
            filteredStudents.map((std) => {
              const isSelected = selectedStudent?.id === std.id;
              const isPending = std.verificationStatus === 'pending';
              return (
                <div
                  key={std.id}
                  onClick={() => setSelectedStudentId(std.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50/40 shadow-xs ring-1 ring-purple-500'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      {std.studentIdNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isPending ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {isPending ? 'طلب توثيق جديد' : 'معتمد رسمياً'}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 mt-1">
                    {std.fullNameAr}
                  </h4>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {std.college} - {std.department}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right col: Dossier & ID Card Preview (7 cols) */}
        <div className="lg:col-span-7">
          {selectedStudent ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">
                    {selectedStudent.fullNameAr}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    {selectedStudent.fullNameEn} | الرقم الجامعي: {selectedStudent.studentIdNumber}
                  </p>
                </div>

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    selectedStudent.verificationStatus === 'verified'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {selectedStudent.verificationStatus === 'verified' ? 'حساب نشط ومعتمد' : 'قيد المراجعة والتدقيق'}
                </span>
              </div>

              {/* ID Card Visual */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-2">
                  صورة البطاقة الجامعية المرفقة:
                </span>
                <div className="relative w-full h-52 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                  <Image
                    src={selectedStudent.idCardPhotoUrl}
                    alt="البطاقة الجامعية"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 start-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded font-mono backdrop-blur-xs">
                    مستند رسمي معتمد
                  </div>
                </div>
              </div>

              {/* Academic Profile Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                <div>
                  <span className="text-slate-400 block">الكلية والقسم:</span>
                  <strong className="text-slate-800">{selectedStudent.college}</strong>
                  <div className="text-slate-600">{selectedStudent.department}</div>
                </div>
                <div>
                  <span className="text-slate-400 block">المرحلة الأكاديمية:</span>
                  <strong className="text-slate-800">{selectedStudent.academicYear}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">البريد الإلكتروني الجامعي:</span>
                  <strong className="text-slate-800 font-mono">{selectedStudent.email}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">رقم الجوال:</span>
                  <strong className="text-slate-800 font-mono" dir="ltr">{selectedStudent.phone}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={() => verifyStudent(selectedStudent.id, 'verified')}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-xs min-h-[44px]"
                >
                  <Check className="w-4 h-4" />
                  <span>اعتماد وتفعيل صلاحيات الاستعارة</span>
                </button>

                <button
                  onClick={() => verifyStudent(selectedStudent.id, 'rejected')}
                  className="py-3 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs transition min-h-[44px]"
                >
                  رفض التوثيق
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
              اختر طالباً من القائمة لمراجعة ملفه
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
