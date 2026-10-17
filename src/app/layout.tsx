import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Header } from '@/components/common/Header';
import { QuickNav } from '@/components/common/QuickNav';
import { ToastContainer } from '@/components/common/ToastContainer';

export const metadata: Metadata = {
  title: 'BorrowHub | استعارة - منصة استعارة وإدارة المعدات الجامعية',
  description: 'منصة استعارة وإدارة المعدات الجامعية - University Equipment Borrowing & Management Platform with Academic Focus design system.',
  openGraph: {
    title: 'BorrowHub | استعارة',
    description: 'منصة استعارة وإدارة المعدات الجامعية والعهد المعملية',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased font-sans flex flex-col pb-16">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <QuickNav />
        <ToastContainer />
      </body>
    </html>
  );
}
