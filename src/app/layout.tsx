import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Header } from '@/components/common/Header';
import { QuickNav } from '@/components/common/QuickNav';

export const metadata: Metadata = {
  title: 'BorrowHub | استعارة - منصة استعارة وإدارة المعدات الجامعية',
  description: 'منصة استعارة وإدارة المعدات الجامعية - University Equipment Borrowing & Management Platform with Academic Focus design system.',
  openGraph: {
    title: 'BorrowHub | استعارة - منصة استعارة وإدارة المعدات الجامعية',
    description: 'منصة استعارة وإدارة المعدات الجامعية - University Equipment Borrowing & Management Platform with Academic Focus design system.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f7f9fb] text-[#191c1e] font-sans antialiased">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <QuickNav />
        <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#00236f]">BorrowHub</span>
              <span>•</span>
              <span>منصة استعارة وإدارة المعدات الجامعية</span>
              <span>•</span>
              <span>نظام Academic Focus للواجهات الأكاديمية</span>
            </div>
            <div className="flex items-center gap-4">
              <span>جميع الحقوق محفوظة للأكاديمية والجامعة © 2026</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
