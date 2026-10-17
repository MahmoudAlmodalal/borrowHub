'use client';

import React from 'react';
import { useBorrowHubStore } from '@/lib/store';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, dismissToast } = useBorrowHubStore();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 start-4 sm:start-auto sm:end-6 z-50 flex flex-col gap-2 max-w-sm sm:max-w-md w-[calc(100%-2rem)] sm:w-auto pointer-events-none"
      dir="rtl"
    >
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
          error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />,
          info: <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />,
        };

        const borderColors = {
          success: 'border-emerald-300 bg-white',
          warning: 'border-amber-300 bg-white',
          error: 'border-rose-300 bg-white',
          info: 'border-sky-300 bg-white',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg transition-all duration-200 animate-in slide-in-from-bottom-2 ${borderColors[toast.type]}`}
          >
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 leading-tight">
                {toast.title}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100 transition shrink-0"
              aria-label="إغلاق الإشعار"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
