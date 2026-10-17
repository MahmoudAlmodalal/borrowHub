'use client';

import React from 'react';

interface AcademicSkeletonProps {
  type?: 'card' | 'row' | 'stat' | 'detail';
  count?: number;
}

export function AcademicSkeleton({ type = 'card', count = 3 }: AcademicSkeletonProps) {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden p-4 space-y-4">
            <div className="w-full h-44 bg-slate-200 rounded-lg" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-5 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-100 rounded w-full" />
            </div>
            <div className="pt-2 flex justify-between items-center border-t border-slate-100">
              <div className="h-4 bg-slate-200 rounded w-20" />
              <div className="h-8 bg-slate-200 rounded w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'row') {
    return (
      <div className="space-y-3 animate-pulse">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4 flex items-center justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-slate-200 rounded w-1/4" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
            </div>
            <div className="h-8 bg-slate-200 rounded w-24 shrink-0" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 animate-pulse space-y-4">
      <div className="h-6 bg-slate-200 rounded w-1/3" />
      <div className="h-4 bg-slate-100 rounded w-full" />
      <div className="h-4 bg-slate-100 rounded w-2/3" />
    </div>
  );
}
