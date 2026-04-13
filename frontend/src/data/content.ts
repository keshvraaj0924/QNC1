export interface LocalizedString {
  en: string;
  ar: string;
}

export interface ServiceDetails {
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  features: LocalizedString[];
  image: string;
  category: 'hard' | 'soft' | 'specialized';
}

export const servicesData: ServiceDetails[] = [
  // HARD SERVICES
  {
    slug: 'hvac-services',
    category: 'hard',
    title: { en: 'HVAC Services', ar: 'خدمات التكييف والتهوية' },
    description: { 
      en: 'Complete maintenance and servicing of heating, ventilation, and air conditioning systems for industrial and commercial facilities.', 
      ar: 'صيانة وخدمة كاملة لأنظمة التدفئة والتهوية وتكييف الهواء للمنشآت الصناعية والتجارية.' 
    },
    features: [
      { en: 'System Audits', ar: 'تدقيق الأنظمة' },
      { en: 'Preventative Maintenance', ar: 'الصيانة الوقائية' }
    ],
    image: '/assets/images/services/hvac.png'
  },
  {
    slug: 'mep-engineering',
    category: 'hard',
    title: { en: 'MEP Engineering', ar: 'الهندسة الكهروميكانيكية' },
    description: { 
      en: 'Integrated support for Mechanical, Electrical, and Plumbing systems, ensuring seamless operational flow.', 
      ar: 'دعم متكامل للأنظمة الميكانيكية والكهربائية والسباكة، مما يضمن تدفقاً تشغيلياً سلساً.' 
    },
    features: [
      { en: 'Electrical Infrastructure', ar: 'البنية التحتية الكهربائية' },
      { en: 'Plumbing Solutions', ar: 'حلول السباكة' }
    ],
    image: '/assets/images/services/mep.png'
  },
  {
    slug: 'civil-construction',
    category: 'hard',
    title: { en: 'Civil Works', ar: 'الأعمال المدنية' },
    description: { 
      en: 'Expert civil engineering and structural repair services to maintain the longevity of your industrial assets.', 
      ar: 'خدمات الهندسة المدنية المتخصصة وإصلاح الهياكل للحفاظ على طول عمر أصولك الصناعية.' 
    },
    features: [
      { en: 'Structural Repairs', ar: 'إصلاحات هيكلية' },
      { en: 'Facility Upgrades', ar: 'تطوير المرافق' }
    ],
    image: '/assets/images/services/civil.png'
  },
  {
    slug: 'low-current-systems',
    category: 'hard',
    title: { en: 'Low Current Systems', ar: 'أنظمة التيار المنخفض' },
    description: { 
      en: 'Advanced support for security, fire alarms, and communication networks across large-scale projects.', 
      ar: 'دعم متقدم للأنظمة الأمنية وإنذار الحريق وشبكات الاتصال في المشاريع الكبرى.' 
    },
    features: [
      { en: 'CCTV & Security', ar: 'الدوائر التلفزيونية المغلقة والأمن' },
      { en: 'Fire Alarm Maintenance', ar: 'صيانة إنذار الحريق' }
    ],
    image: '/assets/images/services/lowcurrent.png'
  },
  {
    slug: 'renovation-and-fitout',
    category: 'hard',
    title: { en: 'Renovation & Fit-out', ar: 'التجديد والتجهيز' },
    description: { 
      en: 'Comprehensive interior modification and architectural upgrade works tailored to modern standards.', 
      ar: 'أعمال التعديل الداخلي الشاملة والترقية المعمارية المصممة لتناسب المعايير الحديثة.' 
    },
    features: [
      { en: 'Interior Design', ar: 'التصميم الداخلي' },
      { en: 'Space Optimization', ar: 'تحسين المساحات' }
    ],
    image: '/assets/images/services/renovation.png'
  },
  {
    slug: 'third-party-management',
    category: 'hard',
    title: { en: '3rd Party Management', ar: 'إدارة الموردين' },
    description: { 
      en: 'Professional coordination and oversight of specialized external vendors to deliver seamless project execution.', 
      ar: 'تنسيق وإشراف احترافي على الموردين الخارجيين المتخصصين لضمان تنفيذ المشاريع بسلاسة.' 
    },
    features: [
      { en: 'Vendor Oversight', ar: 'الإشراف على الموردين' },
      { en: 'Service Level Agreements', ar: 'اتفاقيات مستوى الخدمة' }
    ],
    image: '/assets/images/services/3rdparty.png'
  },

  // SOFT SERVICES
  {
    slug: 'housekeeping-and-maintenance',
    category: 'soft',
    title: { en: 'Housekeeping & Maintenance', ar: 'النظافة والصيانة' },
    description: { 
      en: 'Professional housekeeping activities effectively aligned with Saudi Quality marks.', 
      ar: 'أنشطة تدبير منزلي احترافية تتماشى بفعالية مع علامات الجودة السعودية.' 
    },
    features: [
      { en: 'Industrial Deep Cleaning', ar: 'التنظيف العميق للمنشآت الصناعية' },
      { en: 'Janitorial Operations', ar: 'عمليات النظافة التخصصية' }
    ],
    image: '/assets/images/services/housekeeping.png'
  },
  {
    slug: 'catering-services',
    category: 'soft',
    title: { en: 'Catering Services', ar: 'خدمات الإعاشة' },
    description: { 
      en: 'Qudrat National provides smart and proficient catering services for mega-projects across KSA.', 
      ar: 'تقدم قدرات الوطنية خدمات إعاشة ذكية ومحترفة للمشاريع العملاقة في جميع أنحاء المملكة.' 
    },
    features: [
      { en: 'Large-scale Workforce Feeding', ar: 'حلول إطعام القوى العاملة واسعة النطاق' },
      { en: 'ISO Hygiene Compliance', ar: 'الامتثال لمعايير الجودة والآيزو' }
    ],
    image: '/assets/images/services/catering.png'
  },
  {
    slug: 'facade-cleaning',
    category: 'soft',
    title: { en: 'Facade Cleaning', ar: 'تنظيف الواجهات' },
    description: { 
      en: 'Specialized high-rise and glass cleaning services maintaining the aesthetic and integrity of your facility.', 
      ar: 'خدمات تنظيف واجهات المباني المرتفعة والزجاجية المتخصصة للحفاظ على المظهر وسلامة منشأتك.' 
    },
    features: [
      { en: 'High-Rise Access', ar: 'الوصول للمباني المرتفعة' },
      { en: 'Eco-Friendly Solutions', ar: 'حلول صديقة للبيئة' }
    ],
    image: '/assets/images/services/facade.png'
  },
  {
    slug: 'landscaping-services',
    category: 'soft',
    title: { en: 'Landscaping Services', ar: 'تنسيق الحدائق' },
    description: { 
      en: 'Design, creation, and ongoing maintenance of green outdoor spaces and industrial environments.', 
      ar: 'تصميم وإنشاء وصيانة مستمرة للمساحات الخضراء الخارجية والبيئات الصناعية.' 
    },
    features: [
      { en: 'Garden Design', ar: 'تصميم الحدائق' },
      { en: 'Irrigation Systems', ar: 'أنظمة الري' }
    ],
    image: '/assets/images/services/landscaping.png'
  },
  {
    slug: 'pest-control-management',
    category: 'soft',
    title: { en: 'Pest Control Management', ar: 'إدارة مكافحة الحشرات' },
    description: { 
      en: 'Best practices treatments and safe correct use of pesticides across project sites.', 
      ar: 'أفضل ممارسات العلاج والاستخدام الآمن والصحيح لمبيدات الآفات في مواقع المشاريع.' 
    },
    features: [
      { en: 'Desert Eradication', ar: 'استراتيجيات الإبادة في البيئة الصحراوية' },
      { en: 'Infrastructure Audits', ar: 'عمليات تدقيق روتينية للبنية التحتية' }
    ],
    image: '/assets/images/services/pestcontrol.png'
  },
  {
    slug: 'facility-help-desk',
    category: 'soft',
    title: { en: '24/7 Helpdesk', ar: 'مكتب مساعدة 24/7' },
    description: { 
      en: 'A central hub for tracking and managing all facility requests, ensuring rapid response times.', 
      ar: 'مركز مركزي لتتبع وإدارة جميع طلبات المرافق، مما يضمن أوقات استجابة سريعة.' 
    },
    features: [
      { en: '24/7 Ticketing', ar: 'نظام تذاكر على مدار الساعة' },
      { en: 'Performance Reporting', ar: 'تقارير الأداء' }
    ],
    image: '/assets/images/services/helpdesk.png'
  },

  // SPECIALIZED SERVICES (Existing from original data)
  {
    slug: 'manpower-head-hunting',
    category: 'specialized',
    title: { en: 'Manpower Head Hunting', ar: 'استقطاب القوى العاملة' },
    description: { 
      en: 'Sourcing out multi-nationalities supporting Vision 2030 development.', 
      ar: 'توظيف جنسيات متعددة لدعم تطوير رؤية 2030.' 
    },
    features: [
      { en: 'International Sourcing', ar: 'توفير العمالة الدولية' },
      { en: 'Saudization Compliance', ar: 'استشارات الامتثال لنطاقات (السعودة)' }
    ],
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=80'
  },
  {
    slug: 'logistics-and-transportation',
    category: 'specialized',
    title: { en: 'Logistics And Transportation', ar: 'الخدمات اللوجستية والنقل' },
    description: { 
      en: 'End-to-End supply chain management for diversified sectors across the Kingdom.', 
      ar: 'إدارة سلاسل الإمداد الشاملة لمختلف القطاعات في جميع أنحاء المملكة.' 
    },
    features: [
      { en: 'Machinery Transport', ar: 'أساطيل نقل المعدات الثقيلة' },
      { en: 'Remote Access Networks', ar: 'شبكات الوصول للمواقع النائية' }
    ],
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1600&q=80'
  },
  {
    slug: 'medical-services-health-care',
    category: 'specialized',
    title: { en: 'Medical Services & Health Care', ar: 'الخدمات الطبية والرعاية الصحية' },
    description: { 
      en: 'Experience and skills to manage the daily care in remote operational zones.', 
      ar: 'الخبرة والمهارات لإدارة الرعاية اليومية في مناطق العمليات النائية.' 
    },
    features: [
      { en: 'Remote Clinics', ar: 'نشر العيادات الميدانية' },
      { en: '24/7 EMT Services', ar: 'خدمات الطوارئ الطبية على مدار الساعة' }
    ],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80'
  }
];
