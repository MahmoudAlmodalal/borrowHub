import { Equipment, LoanRecord, StudentAccount, OverdueIncident } from './types';

export const INITIAL_EQUIPMENT: Equipment[] = [
  {
    id: 'eq-1',
    code: 'EQ-OSC-01',
    nameAr: 'راسم الإشارة الرقمي Tektronix TBS1102B',
    nameEn: 'Tektronix TBS1102B Digital Oscilloscope',
    category: 'electronics_measurement',
    categoryLabelAr: 'الإلكترونيات والقياس',
    model: 'TBS1102B (100 MHz, 2GS/s)',
    manufacturer: 'Tektronix Inc.',
    labLocation: 'معمل الإلكترونيات - مبنى الهندسة (قاعة 204)',
    totalQuantity: 8,
    availableQuantity: 5,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxTUeTJ0Ki5nyvJ-tbfcl0zqZsS7_UaagqOYodEAka-SCzte-vZ-6VwEBIOcvlJwNXruN6a3TpurTq9ZdbrDBZM-BUfiGp91I7cII--05MW833fcUOBD8T1uUjUe4CWSXrVchLNMwCM5ce2zRw6EHivUBmuLtZbauYBkU4zDzxppwkYUV5HFSXrMOlDnjTEtJbNYiRVr8VbLJFvN-qcjkvsDChPgST3CNoQmdXu9SG6PHLOQAj84lZ_g',
    maxLoanDays: 7,
    requiresSupervisorApproval: true,
    specs: [
      { label: 'عرض النطاق الترددي', value: '100 MHz' },
      { label: 'معدل أخذ العينات', value: '2.0 GS/s على كل قناة' },
      { label: 'عدد القنوات', value: 'قناتان تناظريتان (Dual Channel)' },
      { label: 'دقة الشاشة', value: 'شاشة WVGA ملونة قياس 7 بوصة' },
      { label: 'الاتصال', value: 'منفذ USB أمامي وخلفي لحفظ النتائج' },
      { label: 'المعايرة', value: 'معاير رسمياً حتى ديسمبر 2026' },
    ],
    accessories: [
      'مجسات قياس سلبية TPP0201 عدد 2',
      'كابل تغذية كهربائية معتمد',
      'دليل السلامة وإجراءات المعمل',
      'حقيبة حماية مبطنة مضادة للصدمات'
    ],
    safetyGuidelines: [
      'يمنع توصيل المجسات بجهد يتجاوز 300V RMS Cat II.',
      'التأكد من التأريض السليم للطرف الأرضي قبل القياس.',
      'إبلاغ مشرف المعمل فوراً في حال ظهور أي رسائل تحذيرية أثناء المعايرة.'
    ],
    descriptionAr: 'جهاز راسم إشارة تعليمي وبحثي عالي الدقة مزود بواجهة قياس متقدمة، مناسب لمشاريع التخرج وتحليل الإشارات الترددية والدوائر الرقمية والتناظرية.',
    descriptionEn: 'High-precision educational and research oscilloscope with advanced waveform measurement interface.'
  },
  {
    id: 'eq-2',
    code: 'EQ-PRN-02',
    nameAr: 'طابعة ثلاثية الأبعاد Creality K1 Max الفائقة',
    nameEn: 'Creality K1 Max High-Speed 3D Printer',
    category: 'mechanical_fabrication',
    categoryLabelAr: 'الميكانيكا والتصنيع',
    model: 'K1 Max AI-Camera Edition',
    manufacturer: 'Creality 3D',
    labLocation: 'معمل النمذجة والتصنيع الرقمي (قاعة 108)',
    totalQuantity: 4,
    availableQuantity: 2,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwuEFVvhX6UBmLJZ9sQmoW5cmu_oS8wGeZ3U0sePh2xm3kknoqE1gi83EOAbeHxImwJxurVUj1WSvmVosxOWHboRnGxqq4fJ_tUnIPTYHpUmZz8YLl2d6ydMGXxHNyNznciR-R-ew9fFqhAUKzbJQiFKO_3tOBStNLMrvLvhlvQraLWSuiqV6ldraslHYrzf1jKKOouUGDnMHmGgm3GleOFNt7Nf3olveYv4bqkSgKk1NqNo3yFBX1Ig',
    maxLoanDays: 14,
    requiresSupervisorApproval: true,
    specs: [
      { label: 'سرعة الطباعة القصوى', value: '600 mm/s' },
      { label: 'حجم البناء', value: '300 × 300 × 300 مم' },
      { label: 'دقة الطباعة', value: '0.1 - 0.35 مم' },
      { label: 'درجة حرارة الفوهة', value: 'حتى 300° مئوية' },
      { label: 'مستشعر الذكاء الاصطناعي', value: 'كاميرا LiDAR مدمجة لفحص الطبقة الأولى' }
    ],
    accessories: [
      'فوهات احتياطية من الفولاذ الصلب عدد 2',
      'طقم مفاتيح صيانة وأدوات إزالة المطبوعات',
      'كابل طاقة + ذاكرة USB مهيأة بالسوفتوير'
    ],
    safetyGuidelines: [
      'استخدام مواد PLA وPETG فقط؛ يمنع استخدام ABS دون موافقة مشرف التهوية.',
      'عدم لمس الفوهة أو السطح الساخن أثناء التشغيل.'
    ],
    descriptionAr: 'طابعة صناعية سريعة مجهزة بغرفة مغلقة ومستشعر ليزري لمراقبة جودة طباعة نماذج المشاريع الهندسية والطبية.',
    descriptionEn: 'Industrial enclosed high-speed 3D printer for engineering prototypes and rapid prototyping.'
  },
  {
    id: 'eq-3',
    code: 'EQ-ROB-03',
    nameAr: 'منصة الروبوتات الذكية TurtleBot 4 ROS2',
    nameEn: 'TurtleBot 4 Mobile Robotics Platform',
    category: 'robotics_iot',
    categoryLabelAr: 'الروبوتات والإنترنت الذكي',
    model: 'TurtleBot 4 Standard (ROS 2 Jazzy)',
    manufacturer: 'Clearpath Robotics / Open Robotics',
    labLocation: 'معمل الذكاء الاصطناعي والروبوتيكس (قاعة 312)',
    totalQuantity: 6,
    availableQuantity: 4,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPDx8wC2642l0mYLjqynmZ06bEkcdp3aygXpkkM1VeOQim-oYJuFr3YrxVWQ-5dZFywlZ0kh6c-GshxDGeukeMC2tCHwTGnB0cukHNbDMsjKheWGkeghdAWF7JF-tiMdTSl91gmah9YnHSUyhjpBupXeft77F8md6zVsOb18kpdnQ08h7ZMAq2csSv11FgD7J3nhMReFTAHWEPhIvLQm27mO0C5AsuwWlGO-C-eHP6MVzoHbxQ_6Urkg',
    maxLoanDays: 14,
    requiresSupervisorApproval: true,
    specs: [
      { label: 'الحاسوب المدمج', value: 'Raspberry Pi 4B (4GB RAM)' },
      { label: 'نظام الاستشعار الليزري', value: 'RPLIDAR A1M8 2D Laser Scanner' },
      { label: 'الكاميرا الفراغية', value: 'OAK-D-PRO Spatial AI Depth Camera' },
      { label: 'نظام القيادة', value: 'قاعدة iRobot Create 3 مع مستشعرات سقوط' }
    ],
    accessories: [
      'قاعدة شحن أوتوماتيكية Docking Station',
      'محول تيار سريع 19V 3.42A',
      'هوائي Wi-Fi ممتد المدى'
    ],
    safetyGuidelines: [
      'فصل البطارية عند النقل خارج مسار الاختبار المعملي.',
      'معايرة مستشعرات الـ LiDAR قبل تشغيل الملاحة التلقائية SLAM.'
    ],
    descriptionAr: 'المنصة المعيارية الأولى عالمياً لتعليم وأبحاث الملاحة الذاتية، رسم الخرائط، ورؤية الحاسوب ثلاثية الأبعاد.',
    descriptionEn: 'The world standard mobile robotics platform for autonomous navigation and SLAM research.'
  },
  {
    id: 'eq-4',
    code: 'EQ-AI-04',
    nameAr: 'وحدة حوسبة الحافة NVIDIA Jetson AGX Orin 64GB',
    nameEn: 'NVIDIA Jetson AGX Orin 64GB Developer Kit',
    category: 'computing_ai',
    categoryLabelAr: 'الحوسبة والذكاء الاصطناعي',
    model: 'AGX Orin DevKit (275 TOPS)',
    manufacturer: 'NVIDIA Corp.',
    labLocation: 'مركز الحوسبة الفائقة ومعامل البرمجيات (قاعة 401)',
    totalQuantity: 5,
    availableQuantity: 3,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXUuJYCxYcZElWMAxErWCTp3QONW_M4nDdiE56lI_4RlMTGzCKC07Vwz4EkpXZ3ia-MsK5Lht55zrSaDaQPn3tOXePBl6a4h08lpBnrdsWRUQbyFSkJ1urG2PILd85XtK6dYnwRsz0jaPb7De5wywJHolhUFzcVGOUhUy-ejlXCIkDighnOL1OeAJdMp9a2VLiqFplBY6-v8ifnAp2beIy4tz_YvVziqPniHtjV0UpCRxLNqNPhNfmgw',
    maxLoanDays: 14,
    requiresSupervisorApproval: true,
    specs: [
      { label: 'أداء الذكاء الاصطناعي', value: '275 TOPS (Dense INT8)' },
      { label: 'معالج الرسومات', value: '2048-core NVIDIA Ampere مع 64 Tensor Cores' },
      { label: 'الذاكرة العشوائية', value: '64GB 256-bit LPDDR5 (204.8 GB/s)' },
      { label: 'التخزين', value: '64GB eMMC 5.1 + فتحة M.2 NVMe' }
    ],
    accessories: [
      'محول طاقة جداري 90W Type-C',
      'كابل USB-C to USB-A لبرمجة الفلاش',
      'علبة تبريد ألومنيوم مجهزة بمروحة PWM'
    ],
    safetyGuidelines: [
      'استخدام شريط تأريض كهرومغناطيسي ESD عند توصيل الكاميرات أو بطاقات PCIe.',
      'عدم تشغيل خوارزميات التدريب دون مراقبة درجات حرارة الأنوية.'
    ],
    descriptionAr: 'أقوى حاسوب ذكاء اصطناعي مدمج للأنظمة المستقلة، معالجة الفيديو بالزمن الحقيقي ونماذج المحولات متعددة الوسائط.',
    descriptionEn: 'Flagship edge AI platform delivering 275 TOPS for autonomous machines and multimodal AI.'
  },
  {
    id: 'eq-5',
    code: 'EQ-CAM-05',
    nameAr: 'كاميرا سينمائية سوني Sony FX30 مع عدسة G Master',
    nameEn: 'Sony FX30 Cinema Line Camera Kit',
    category: 'optics_media',
    categoryLabelAr: 'البصريات والوسائط',
    model: 'ILME-FX30B + FE 24-70mm F2.8 GM II',
    manufacturer: 'Sony Corporation',
    labLocation: 'استوديو الإنتاج الإعلامي والتوثيق البحثي (قاعة 115)',
    totalQuantity: 3,
    availableQuantity: 1,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBUSLT5vLz0sMfp_NxHluQGu-u3A_ObZ7KL62Zj_LBV3lklZKuwzFEbjcxwZVtRJTGe6fTdjZhUiSXmowSOIXbPNPM0--Pvwkv4i57axCGL_pUzHA-aUxmEn5fNpfBC2gowXS7D0C38VGr6gwOTbklF_vzru5lGPE6y7vRbDn5dHsRLCw1TgcnrkElcoHqOKhORjqBJMbB-Y70jQRvNChaYXMYLVdEOh-nA6bozw1wgoO03mnuT11bNg',
    maxLoanDays: 3,
    requiresSupervisorApproval: true,
    specs: [
      { label: 'المستشعر', value: 'APS-C Exmor R BSI CMOS بدقة 26.0 ميجابكسل' },
      { label: 'تسجيل الفيديو', value: '4K حتى 120 إطار بالثانية (10-bit 4:2:2 All-Intra)' },
      { label: 'النطاق الديناميكي', value: '+14 وقفة عبر منحنى S-Log3' },
      { label: 'التبريد', value: 'مروحة داخلية للتشغيل المتواصل دون انقطاع' }
    ],
    accessories: [
      'مقبض علوي صوتي XLR مع مدخلين احترافيين',
      'بطاريتان Sony NP-FZ100 مع شاحن مزدوج',
      'بطاقة ذاكرة CFexpress Type A سعة 160GB',
      'حقيبة أمان مضادة للماء Pelican 1510'
    ],
    safetyGuidelines: [
      'فحص العدسة قبل الاستلام للتأكد من خلوها من الخدوش.',
      'تأمين الكاميرا بحزام الرقبة أو الحامل الثلاثي طوال فترة التصوير الميداني.'
    ],
    descriptionAr: 'طاقم كاميرا احترافي لتوثيق التجارب العلمية الدقيقة، تصوير الحركة السريعة، وتغطية الفعاليات والمؤتمرات الجامعية.',
    descriptionEn: 'Compact Cinema Line camera with XLR audio handle and G Master fast standard zoom lens.'
  },
  {
    id: 'eq-6',
    code: 'EQ-DRN-06',
    nameAr: 'طائرة استطلاع DJI Mavic 3 Enterprise لمسح المواقع',
    nameEn: 'DJI Mavic 3 Enterprise Thermal Drone Kit',
    category: 'robotics_iot',
    categoryLabelAr: 'الروبوتات والإنترنت الذكي',
    model: 'Mavic 3E RTK Edition',
    manufacturer: 'DJI Enterprise',
    labLocation: 'معمل الاستشعار عن بعد والمساحة الجيوتقنية (قاعة 220)',
    totalQuantity: 2,
    availableQuantity: 1,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOvtmomah0UiquUa8CuMO2csgS9F53aUVklvM-Nc0ZCfPgF_Ew6mrNUgNv9DRgO7x_JZ5oXSkL0YgUY9S7llxocwW544oPPz5G7DhoIC3TCx5gmYEmrVCykwg_SnYrEqo6P0Hkm_ZK1AiypZJdcCBBWQcmh2-QCNjATpExk1STkEqXptG2hwDk3D6d-N2XMNN9ju2uR1jaOUN0jurzvcT-5eipRhWO0dgxSlufigsKB_P4hho8mgKOMQ',
    maxLoanDays: 3,
    requiresSupervisorApproval: true,
    specs: [
      { label: 'كاميرا المسح الجوي', value: 'مستشعر 4/3 CMOS بدقة 20 ميجابكسل وشتر ميكانيكي' },
      { label: 'زمن الطيران', value: 'حتى 45 دقيقة لكل بطارية' },
      { label: 'دقة تحديد المواقع', value: 'سنتيمترية بدعم وحدة RTK المدمجة' },
      { label: 'نطاق الإرسال', value: '15 كم عبر تقنية DJI O3 Enterprise' }
    ],
    accessories: [
      'جهاز تحكم ذكي DJI RC Pro Enterprise',
      '3 بطاريات طيران ذكية مع منصة شحن 100W',
      'وحدة RTK المساحية عالية الدقة',
      'مجموعة مراوح احتياطية ومصدات أمان'
    ],
    safetyGuidelines: [
      'يتطلب تقديم رخصة طيران مسيرات معتمدة وموافقة الأمن الجامعي.',
      'الالتزام الصارم بمناطق الطيران المصرح بها داخل الحرم الجامعي.'
    ],
    descriptionAr: 'طائرة بدون طيار متقدمة للمسح الطبوغرافي ونمذجة المنشآت الهندسية ومشاريع التخرج الجيومعلوماتية.',
    descriptionEn: 'Commercial survey and photogrammetry drone equipped with mechanical shutter and RTK module.'
  }
];

export const INITIAL_LOANS: LoanRecord[] = [
  {
    id: 'loan-1',
    token: 'LOAN-2026-8910',
    studentId: 'std-101',
    studentNameAr: 'عمر خالد المنصور',
    studentNameEn: 'Omar Khalid Al-Mansour',
    college: 'كلية الهندسة',
    department: 'الهندسة الكهربائية والحاسبات',
    equipmentId: 'eq-1',
    equipmentNameAr: 'راسم الإشارة الرقمي Tektronix TBS1102B',
    assignedSerial: 'SN-TK-90812',
    requestDate: '2026-10-14',
    pickupDate: '2026-10-15',
    dueDate: '2026-10-22',
    status: 'active_in_possession',
    projectTitle: 'تصميم ومعايرة عاكس تيار شمسي ثلاثي الطور للمنازل الذكية',
    supervisorName: 'د. عبد الله الشمري',
    handedOverBy: 'فني الشباك: أحمد الزهراني',
    notes: 'تم فحص المجسات وتسليم الجهاز بحالة ممتازة.'
  },
  {
    id: 'loan-2',
    token: 'LOAN-2026-9044',
    studentId: 'std-102',
    studentNameAr: 'سارة محمد العتيبي',
    studentNameEn: 'Sarah Mohammed Al-Otaibi',
    college: 'كلية علوم الحاسب والمعلومات',
    department: 'الذكاء الاصطناعي وعلوم البيانات',
    equipmentId: 'eq-4',
    equipmentNameAr: 'وحدة حوسبة الحافة NVIDIA Jetson AGX Orin 64GB',
    assignedSerial: 'SN-NV-77401',
    requestDate: '2026-10-16',
    pickupDate: '2026-10-17',
    dueDate: '2026-10-24',
    status: 'approved_ready_for_pickup',
    projectTitle: 'نظام كشف العيوب البصرية في خطوط الإنتاج الدوائية',
    supervisorName: 'د. ريم الغامدي',
    notes: 'الطلب معتمد وجاهز للاستلام من شباك مبنى الحاسب B.'
  },
  {
    id: 'loan-3',
    token: 'LOAN-2026-9128',
    studentId: 'std-103',
    studentNameAr: 'فيصل نايف القحطاني',
    studentNameEn: 'Faisal Naif Al-Qahtani',
    college: 'كلية الهندسة',
    department: 'الهندسة الميكانيكية',
    equipmentId: 'eq-2',
    equipmentNameAr: 'طابعة ثلاثية الأبعاد Creality K1 Max الفائقة',
    assignedSerial: 'لم يخصص بعد',
    requestDate: '2026-10-17',
    dueDate: '2026-10-31',
    status: 'pending_approval',
    projectTitle: 'تصنيع أطراف صناعية تعويضية خفيفة الوزن بألياف الكربون',
    supervisorName: 'د. طارق السبيعي',
    notes: 'الطلب بانتظار مراجعة مشرف المعمل وتأكيد التوفر.'
  },
  {
    id: 'loan-4',
    token: 'LOAN-2026-7782',
    studentId: 'std-104',
    studentNameAr: 'ريان عبد العزيز الدوسري',
    studentNameEn: 'Rayan Abdulaziz Al-Dossary',
    college: 'كلية العمارة والتخطيط',
    department: 'العمارة الرقمية',
    equipmentId: 'eq-6',
    equipmentNameAr: 'طائرة استطلاع DJI Mavic 3 Enterprise لمسح المواقع',
    assignedSerial: 'SN-DJI-44109',
    requestDate: '2026-10-02',
    pickupDate: '2026-10-04',
    dueDate: '2026-10-11',
    status: 'overdue',
    projectTitle: 'التوثيق الرقمي للمباني التراثية وإعادة بنائها عبر المسح التصويري',
    supervisorName: 'د. وليد البسام',
    handedOverBy: 'فني الشباك: سامي الحارثي',
    notes: 'تأخر عن موعد الإرجاع 6 أيام وتم إرسال إنذارين هاتفياً.'
  }
];

export const INITIAL_STUDENTS: StudentAccount[] = [
  {
    id: 'std-101',
    studentIdNumber: '442109823',
    fullNameAr: 'عمر خالد المنصور',
    fullNameEn: 'Omar Khalid Al-Mansour',
    email: 'o.almansour@student.edu.sa',
    phone: '+966 50 123 4567',
    college: 'كلية الهندسة',
    department: 'الهندسة الكهربائية والحاسبات',
    academicYear: 'السنة الرابعة (سنة التخرج)',
    verificationStatus: 'verified',
    idCardPhotoUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1Wr24Ts5_n0FZQBOWgw5rKO7QzGO-xETRnjMslxRLDS7xgSqrcOJdNm0JX4H41vIi8qF0ztxUnsQSlVWkB-KtpynNAy7jC0dr1dqEZh4YPyFK9bRmAlF1KtZnBRp909EcomLva2ABeoifvCuU7oK21Fep_bb7Oqr9mXfeEoy6ExyeivNIxqwSh2dwp-3PmplazY4wcdd0xf2q99LzevUj8JtfCUhB-rMou-xmwbnjPY4MyPSafUslbNP7c7',
    activeLoansCount: 1,
    submissionDate: '2026-09-01'
  },
  {
    id: 'std-105',
    studentIdNumber: '443105672',
    fullNameAr: 'ماجد بن فهد السبيعي',
    fullNameEn: 'Majed Fahad Al-Subaie',
    email: 'm.alsubaie@student.edu.sa',
    phone: '+966 55 987 6543',
    college: 'كلية الهندسة',
    department: 'هندسة الميكاترونكس والتحكم',
    academicYear: 'السنة الثالثة',
    verificationStatus: 'pending',
    idCardPhotoUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1Wr24Ts5_n0FZQBOWgw5rKO7QzGO-xETRnjMslxRLDS7xgSqrcOJdNm0JX4H41vIi8qF0ztxUnsQSlVWkB-KtpynNAy7jC0dr1dqEZh4YPyFK9bRmAlF1KtZnBRp909EcomLva2ABeoifvCuU7oK21Fep_bb7Oqr9mXfeEoy6ExyeivNIxqwSh2dwp-3PmplazY4wcdd0xf2q99LzevUj8JtfCUhB-rMou-xmwbnjPY4MyPSafUslbNP7c7',
    activeLoansCount: 0,
    submissionDate: '2026-10-16'
  }
];

export const INITIAL_OVERDUE: OverdueIncident[] = [
  {
    id: 'ovd-1',
    loanId: 'loan-4',
    studentNameAr: 'ريان عبد العزيز الدوسري',
    studentIdNumber: '441098451',
    studentPhone: '+966 54 881 2290',
    college: 'كلية العمارة والتخطيط',
    equipmentNameAr: 'طائرة استطلاع DJI Mavic 3 Enterprise لمسح المواقع',
    assignedSerial: 'SN-DJI-44109',
    dueDate: '2026-10-11',
    daysOverdue: 6,
    severityTier: 'tier2_warning',
    assetValueSar: 24500,
    contactAttempts: [
      { date: '2026-10-12', method: 'sms', note: 'إشعار تلقائي بتجاوز موعد الإرجاع بيوم واحد.' },
      { date: '2026-10-14', method: 'phone', note: 'تم الاتصال ولم يرد الطالب، تم ترك رسالة نصية ثانية.' }
    ],
    academicHoldPlaced: false
  }
];
