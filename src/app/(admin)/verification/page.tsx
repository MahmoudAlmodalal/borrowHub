'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useBorrowHubStore } from '@/lib/store';
import { StudentAccount } from '@/lib/types';
import { 
  ShieldCheck, Check, X, Search, UserCheck, AlertCircle, 
  ExternalLink, FileText, Phone, Mail, Building
} from 'lucide-react';

export default function StudentVerificationPage() {
  const { students, verifyStudent } = useBorrowHubStore();
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [filterCollege, setFilterCollege] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const pendingStudents = students.filter((s) => s.verificationStatus === 'pending');
  const allFiltered = students.filter((s) => {
    const matchCollege = filterCollege === 'all' || s.college === filterCollege;
    const matchSearch =
      s.fullNameAr.includes(searchQuery) ||
      s.studentIdNumber.includes(searchQuery) ||
      s.email.includes(searchQuery);
    return matchCollege && matchSearch;
  });

  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  const handleApprove = (id: string) => {
    verifyStudent(id, true);
    setActionNotice(`تم اعتماد وتفعيل صلاحيات الاستعارة بنجاح للطالب: ${selectedStudent?.fullNameAr}`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleReject = (id: string) => {
    verifyStudent(id, false, 'عدم وضوح صورة بطاقة القيد الجامعي');
    setActionNotice(`تم رفض طلب اعتماد الطالب: ${selectedStudent?.fullNameAr}`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-1">
            <span>SCR-06</span>
            <span>·</span>
            <span>شباك إدارة واعتماد حسابات الطلاب</span>
          </div>
          <h1 className="text-2xl font-bold text-[#00236f]">مراجعة وتفعيل هويات المستعيرين</h1>
          <p className="text-xs text-slate-500">
            مطابقة البطاقات الجامعية مع سجلات عمادة القبول ومنح تراخيص الاستعارة للطلبة المستجدين
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full font-bold">
            {pendingStudents.length} طلبات قيد الانتظار
          </span>
        </div>
      </div>

      {actionNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg text-xs font-bold mb-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="text-emerald-600">✕</button>
        </div>
      )}

      {/* Master Detail Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Right Master List Pane */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col h-[650px]">
          {/* Search & Filter */}
          <div className="mb-3 space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute start-2.5 top-2.5" />
              <input
                type="text"
                placeholder="بحث بالرقم الجامعي أو الاسم..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full ps-8 pe-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-[#0284c7]"
              />
            </div>
            <select
              value={filterCollege}
              onChange={(e) => setFilterCollege(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-700 outline-none"
            >
              <option value="all">كافة الكليات الأكاديمية</option>
              <option value="كلية الهندسة">كلية الهندسة</option>
              <option value="كلية علوم الحاسب والمعلومات">كلية علوم الحاسب والمعلومات</option>
            </select>
          </div>

          {/* Student Items List */}
          <div className="flex-1 overflow-y-auto space-y-2 pe-1">
            {allFiltered.map((student) => {
              const isSelected = student.id === selectedStudent?.id;
              return (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudentId(student.id)}
                  className={`p-3 rounded-lg border text-xs cursor-pointer transition ${
                    isSelected
                      ? 'bg-[#00236f] text-white border-[#00236f]'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-[11px]">{student.studentIdNumber}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        student.verificationStatus === 'verified'
                          ? isSelected ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-800'
                          : student.verificationStatus === 'pending'
                          ? isSelected ? 'bg-amber-400 text-slate-900' : 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {student.verificationStatus === 'verified'
                        ? 'معتمد'
                        : student.verificationStatus === 'pending'
                        ? 'بانتظار التحقق'
                        : 'مرفوض'}
                    </span>
                  </div>
                  <div className="font-bold text-sm mb-0.5">{student.fullNameAr}</div>
                  <div className={`text-[11px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {student.college} · {student.department}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Left Detail Pane: Student Dossier & Card Inspection */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          {selectedStudent ? (
            <div>
              {/* Dossier Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-[#00236f]">{selectedStudent.fullNameAr}</h2>
                    <span className="font-mono text-xs text-slate-500">({selectedStudent.fullNameEn})</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    الرقم الجامعي المعتمد:{' '}
                    <span className="font-mono font-bold text-[#00236f]">{selectedStudent.studentIdNumber}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {selectedStudent.verificationStatus === 'verified' ? (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                      <ShieldCheck className="w-4 h-4" />
                      <span>الحساب معتمد ونشط</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-xs font-bold border border-amber-200">
                      <AlertCircle className="w-4 h-4" />
                      <span>بانتظار قرار الشباك</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Two-Column Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Uploaded Card Preview */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">
                    صورة بطاقة الطالب المرفوعة للتحقق:
                  </span>
                  <div className="relative w-full h-56 bg-slate-100 rounded-lg overflow-hidden border border-slate-300 shadow-inner">
                    <Image
                      src={selectedStudent.idCardPhotoUrl}
                      alt="Student ID card"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center justify-between px-1">
                    <span>تاريخ الرفع: {selectedStudent.submissionDate}</span>
                    <span className="text-emerald-700 font-semibold">تطابق ميكانيكي 98%</span>
                  </div>
                </div>

                {/* SIS Match Record */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-xs space-y-3">
                  <div className="font-bold text-[#00236f] pb-2 border-b border-slate-200">
                    بيانات السجل الأكاديمي المربوط (SIS Database):
                  </div>
                  <div className="space-y-2 text-slate-700">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-slate-400" />
                      <span><strong>الكلية:</strong> {selectedStudent.college}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span><strong>التخصص:</strong> {selectedStudent.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span><strong>البريد الجامعي:</strong> {selectedStudent.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span><strong>الجوال:</strong> {selectedStudent.phone}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                      العهد الحالية في الحساب: <span className="font-bold text-[#00236f]">{selectedStudent.activeLoansCount} أجهزة</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">حدد طالباً من القائمة لمراجعته</div>
          )}

          {/* Action Footer */}
          {selectedStudent && (
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => handleReject(selectedStudent.id)}
                className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold px-4 py-2 rounded transition flex items-center gap-1.5"
              >
                <X className="w-4 h-4" />
                <span>رفض الطلب</span>
              </button>
              <button
                onClick={() => handleApprove(selectedStudent.id)}
                className="bg-[#00236f] hover:bg-[#0284c7] text-white text-xs font-bold px-6 py-2 rounded transition flex items-center gap-1.5 shadow"
              >
                <Check className="w-4 h-4" />
                <span>اعتماد وتفعيل الحساب فوراً</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
