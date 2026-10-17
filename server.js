import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Registry of BorrowHub modules
const SCREENS = [
  {
    id: 'catalog',
    code: 'SCR-01',
    role: 'student',
    roleLabel: 'خدمات الطلاب',
    title: 'كتالوج المعدات والأجهزة الأكاديمية',
    titleEn: 'Academic Equipment Catalog',
    description: 'استعراض أجهزة المعامل، فلترة حسب الفئة والتوفر، والتقديم على طلب استعارة جديد',
    path: '/borrowhub_equipment_catalog/code.html',
    icon: 'category',
    badge: 'أساسي'
  },
  {
    id: 'equipment-details',
    code: 'SCR-02',
    role: 'student',
    roleLabel: 'خدمات الطلاب',
    title: 'تفاصيل المعدة والمواصفات الفنية',
    titleEn: 'Equipment Details & Borrow Request',
    description: 'مواصفات الجهاز، جدول التوفر، شروط العهدة، ونموذج حجز الاستعارة للأغراض الأكاديمية',
    path: '/borrowhub_equipment_details_page/code.html',
    icon: 'info',
    badge: 'تفاصيل'
  },
  {
    id: 'student-loans',
    code: 'SCR-03',
    role: 'student',
    roleLabel: 'خدمات الطلاب',
    title: 'لوحة طلبات واستعارات الطالب',
    titleEn: 'Student Loans & Requests Portal',
    description: 'متابعة حالة الطلبات، مواعيد الاستحقاق، سجل العهد السابقة، وطلبات التمديد',
    path: '/borrowhub_student_loans_portal/code.html',
    icon: 'badge',
    badge: 'حساب الطالب'
  },
  {
    id: 'signin',
    code: 'SCR-04',
    role: 'auth',
    roleLabel: 'الدخول والتسجيل',
    title: 'تسجيل دخول الطلاب والكوادر',
    titleEn: 'Sign In (Single Sign-On)',
    description: 'المصادقة الأكاديمية للطلاب ومشرفي المعامل وأمناء المستودعات عبر البريد الجامعي',
    path: '/borrowhub_sign_in/code.html',
    icon: 'login',
    badge: 'أمان'
  },
  {
    id: 'registration',
    code: 'SCR-05',
    role: 'auth',
    roleLabel: 'الدخول والتسجيل',
    title: 'تسجيل حساب طالب جديد',
    titleEn: 'Student Registration Flow',
    description: 'إدخال الرقم الجامعي، إثبات القيد، اختيار الكلية والتخصص لتفعيل صلاحية الاستعارة',
    path: '/borrowhub_student_registration/code.html',
    icon: 'person_add',
    badge: 'تسجيل'
  },
  {
    id: 'student-verification',
    code: 'SCR-06',
    role: 'admin',
    roleLabel: 'إدارة المعامل',
    title: 'إدارة واعتماد حسابات الطلاب',
    titleEn: 'Student Account Verification Desk',
    description: 'مراجعة الهويات الجامعية، التحقق من بطاقات القيد، وتنشيط الصلاحيات للطلبة المستجدين',
    path: '/borrowhub_student_account_verification/code.html',
    icon: 'verified_user',
    badge: 'إشراف'
  },
  {
    id: 'admin-review',
    code: 'SCR-07',
    role: 'admin',
    roleLabel: 'إدارة المعامل',
    title: 'طابور مراجعة طلبات الاستعارة',
    titleEn: 'Admin Requests Review Queue',
    description: 'مراجعة مسوغات الاستعارة والمشاريع البحثية، الموافقة أو الرفض مع تحديد مهلة التسليم',
    path: '/borrowhub_admin_requests_review_queue/code.html',
    icon: 'rule',
    badge: 'طابور المراجعة'
  },
  {
    id: 'pickups-counter',
    code: 'SCR-08',
    role: 'counter',
    roleLabel: 'شبابيك الخدمة',
    title: 'شباك تسليم واستلام المعدات المعتمدة',
    titleEn: 'Approved Pickups Counter (Desk)',
    description: 'التحقق من هوية الطالب، مسح باركود الجهاز، وتأكيد تسليم العهدة ورقياً وإلكترونياً',
    path: '/borrowhub_approved_pickups_counter/code.html',
    icon: 'front_hand',
    badge: 'شباك التسليم'
  },
  {
    id: 'returns-inspection',
    code: 'SCR-09',
    role: 'counter',
    roleLabel: 'شبابيك الخدمة',
    title: 'شباك إرجاع وفحص العتاد',
    titleEn: 'Returns & Inspection Counter',
    description: 'فحص الحالة الفنية والملحقات، تسجيل الملاحظات وإبراء ذمة الطالب بعد الإرجاع',
    path: '/borrowhub_returns_inspection_counter/code.html',
    icon: 'fact_check',
    badge: 'الفحص والإرجاع'
  },
  {
    id: 'overdue-dashboard',
    code: 'SCR-10',
    role: 'admin',
    roleLabel: 'إدارة المعامل',
    title: 'لوحة إنذارات العتاد المتأخر',
    titleEn: 'Overdue Loans & Escalations Dashboard',
    description: 'رصد فوري للأجهزة المتأخرة، سجل التواصل مع الطلاب، وإرسال إشعارات الحظر الأكاديمي',
    path: '/borrowhub_overdue_loans_dashboard/code.html',
    icon: 'warning',
    badge: 'إنذارات حرجة'
  },
  {
    id: 'inventory-management',
    code: 'SCR-11',
    role: 'admin',
    roleLabel: 'إدارة المعامل',
    title: 'إدارة كتالوج ومخزون المعدات',
    titleEn: 'Inventory & Equipment Management',
    description: 'جرد المستودعات، تحديث الأرقام التسلسلية، صيانة الأجهزة وإضافة عهد جديدة للكتالوج',
    path: '/borrowhub_inventory_management/code.html',
    icon: 'inventory_2',
    badge: 'المخزون'
  }
];

// Floating quick-navigator injected into code.html views
const FLOATING_NAV_SCRIPT = `
<!-- BorrowHub Quick Switcher Floating Bar -->
<div id="borrowhub-quicknav-root" style="position:fixed;bottom:16px;right:16px;z-index:999999;font-family:'IBM Plex Sans Arabic',Inter,sans-serif;direction:rtl;">
  <div style="background:#00236f;color:#ffffff;border-radius:9999px;box-shadow:0 10px 25px -5px rgba(0,35,111,0.4);border:1px solid #1e3a8a;display:flex;align-items:center;padding:4px 8px;gap:8px;">
    <a href="/" style="display:inline-flex;align-items:center;gap:6px;background:#1e3a8a;color:#ffffff;padding:6px 14px;border-radius:9999px;font-size:13px;font-weight:600;text-decoration:none;transition:all 0.2s;" onmouseover="this.style.background='#0284c7'" onmouseout="this.style.background='#1e3a8a'">
      <span style="font-family:'Material Symbols Outlined';font-size:18px;">home</span>
      <span>بوابة BorrowHub</span>
    </a>
    <button id="borrowhub-switcher-btn" style="background:transparent;border:none;color:#ffffff;display:inline-flex;align-items:center;gap:4px;padding:6px 12px;font-size:13px;font-weight:500;cursor:pointer;border-radius:9999px;" onclick="document.getElementById('borrowhub-switcher-panel').style.display = (document.getElementById('borrowhub-switcher-panel').style.display === 'block' ? 'none' : 'block')">
      <span style="font-family:'Material Symbols Outlined';font-size:18px;">apps</span>
      <span>الانتقال لشاشة أخرى</span>
      <span style="font-family:'Material Symbols Outlined';font-size:16px;">expand_less</span>
    </button>
  </div>
  <div id="borrowhub-switcher-panel" style="display:none;position:absolute;bottom:54px;right:0;width:340px;max-height:480px;overflow-y:auto;background:#ffffff;color:#191c1e;border-radius:12px;box-shadow:0 20px 40px rgba(15,23,42,0.2);border:1px solid #cbd5e1;padding:12px;">
    <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:8px;border-bottom:1px solid #e2e8f0;margin-bottom:8px;">
      <span style="font-weight:700;font-size:14px;color:#00236f;">موديولات BorrowHub</span>
      <button style="border:none;background:none;cursor:pointer;color:#64748b;" onclick="document.getElementById('borrowhub-switcher-panel').style.display='none'">✕</button>
    </div>
    <div style="display:flex;flex-direction:column;gap:4px;">
      ${SCREENS.map(s => `
        <a href="${s.path}" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:6px;text-decoration:none;color:#191c1e;font-size:13px;transition:background 0.15s;" onmouseover="this.style.background='#f1f5f9'" onmouseout="this.style.background='transparent'">
          <span style="font-weight:500;">${s.title}</span>
          <span style="font-size:11px;background:#e2e8f0;color:#334155;padding:2px 6px;border-radius:4px;">${s.code}</span>
        </a>
      `).join('')}
    </div>
  </div>
</div>
`;

// Middleware to inject Quick Switcher into HTML responses (except when loaded in iframe preview with query ?raw=1)
app.use((req, res, next) => {
  if (req.path.endsWith('.html') || req.path.includes('code.html')) {
    const rawFilePath = path.join(__dirname, req.path);
    if (fs.existsSync(rawFilePath) && fs.statSync(rawFilePath).isFile()) {
      if (req.query.raw === '1') {
        return res.sendFile(rawFilePath);
      }
      try {
        let content = fs.readFileSync(rawFilePath, 'utf8');
        if (content.includes('</body>')) {
          content = content.replace('</body>', `${FLOATING_NAV_SCRIPT}</body>`);
        } else {
          content += FLOATING_NAV_SCRIPT;
        }
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.send(content);
      } catch (err) {
        return next();
      }
    }
  }
  next();
});

// Friendly aliases
app.get('/signin', (req, res) => res.redirect('/borrowhub_sign_in/code.html'));
app.get('/register', (req, res) => res.redirect('/borrowhub_student_registration/code.html'));
app.get('/catalog', (req, res) => res.redirect('/borrowhub_equipment_catalog/code.html'));
app.get('/details', (req, res) => res.redirect('/borrowhub_equipment_details_page/code.html'));
app.get('/student/loans', (req, res) => res.redirect('/borrowhub_student_loans_portal/code.html'));
app.get('/admin/review', (req, res) => res.redirect('/borrowhub_admin_requests_review_queue/code.html'));
app.get('/admin/verification', (req, res) => res.redirect('/borrowhub_student_account_verification/code.html'));
app.get('/admin/inventory', (req, res) => res.redirect('/borrowhub_inventory_management/code.html'));
app.get('/admin/pickups', (req, res) => res.redirect('/borrowhub_approved_pickups_counter/code.html'));
app.get('/admin/returns', (req, res) => res.redirect('/borrowhub_returns_inspection_counter/code.html'));
app.get('/admin/overdue', (req, res) => res.redirect('/borrowhub_overdue_loans_dashboard/code.html'));

// API endpoint returning screen metadata
app.get('/api/screens', (req, res) => {
  res.json({ screens: SCREENS });
});

// Serve static assets and directories
app.use(express.static(__dirname));

// Default root handler
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start dev server on port 3000, 0.0.0.0
app.listen(PORT, HOST, () => {
  console.log(`BorrowHub Server running on http://${HOST}:${PORT}`);
});
