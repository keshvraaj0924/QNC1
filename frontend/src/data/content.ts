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
}

export const servicesData: ServiceDetails[] = [
  {
    slug: 'facilities-management',
    title: { en: 'Facilities Management', ar: 'إدارة المرافق' },
    description: { 
      en: 'Full site construction and services (Camps & Tents). Qudrat accelerates through maintaining facilities and managing projects.', 
      ar: 'بناء المواقع والخدمات الكاملة (المخيمات والخيام). شركة قدرات تتفوق في صيانة المرافق وإدارة المشاريع الإنشائية.' 
    },
    features: [
      { en: 'Kingdom-wide Camp Logistics', ar: 'الخدمات اللوجستية للمخيمات على مستوى المملكة' },
      { en: 'Preventative Maintenance', ar: 'بروتوكولات الصيانة الوقائية' }
    ],
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80'
  },
  {
    slug: 'catering-services',
    title: { en: 'Catering Services', ar: 'خدمات الإعاشة' },
    description: { 
      en: 'Qudrat National provides smart and proficient catering services for mega-projects across KSA.', 
      ar: 'تقدم قدرات الوطنية خدمات إعاشة ذكية ومحترفة للمشاريع العملاقة في جميع أنحاء المملكة.' 
    },
    features: [
      { en: 'Large-scale Workforce Feeding', ar: 'حلول إطعام القوى العاملة واسعة النطاق' },
      { en: 'ISO Hygiene Compliance', ar: 'الامتثال لمعايير الجودة والآيزو' }
    ],
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1600&q=80'
  },
  {
    slug: 'housekeeping-and-maintenance',
    title: { en: 'Housekeeping & Maintenance', ar: 'النظافة والصيانة' },
    description: { 
      en: 'Professional housekeeping activities effectively aligned with Saudi Quality marks.', 
      ar: 'أنشطة تدبير منزلي احترافية تتماشى بفعالية مع علامات الجودة السعودية.' 
    },
    features: [
      { en: 'Industrial Deep Cleaning', ar: 'التنظيف العميق للمنشآت الصناعية' },
      { en: 'Janitorial Operations', ar: 'عمليات النظافة التخصصية' }
    ],
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1600&q=80'
  },
  {
    slug: 'laundry-services',
    title: { en: 'Laundry Services', ar: 'خدمات المغاسل' },
    description: { 
      en: 'Industrial laundry services providing extra-care for remote outposts.', 
      ar: 'خدمات غسيل صناعية توفر رعاية فائقة للمواقع البعيدة والنائية.' 
    },
    features: [
      { en: 'Industrial Wash Cycles', ar: 'دورات غسيل صناعية عالية الطاقة' },
      { en: 'Daily Camp Delivery', ar: 'شبكات التوصيل اليومية للمخيمات' }
    ],
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1600&q=80'
  },
  {
    slug: 'water-and-sanitation-solutions',
    title: { en: 'Water & Sanitation Solutions', ar: 'حلول المياه والصرف الصحي' },
    description: { 
      en: 'Meeting Catering Hygiene Standard (CHS) requirements across Saudi Arabia.', 
      ar: 'تلبية متطلبات معايير نظافة الإعاشة (CHS) في جميع أنحاء المملكة العربية السعودية.' 
    },
    features: [
      { en: 'Potable Water Supply', ar: 'خطوط إمداد المياه الصالحة للشرب' },
      { en: 'Waste Pumping', ar: 'ضخ النفايات في المواقع النائية' }
    ],
    image: 'https://images.unsplash.com/photo-1584486650955-eedaeef23f05?auto=format&fit=crop&w=1600&q=80'
  },
  {
    slug: 'pest-control-management',
    title: { en: 'Pest Control Management', ar: 'إدارة مكافحة الحشرات' },
    description: { 
      en: 'Best practices treatments and safe correct use of pesticides.', 
      ar: 'أفضل ممارسات العلاج والاستخدام الآمن والصحيح لمبيدات الآفات.' 
    },
    features: [
      { en: 'Desert Eradication', ar: 'استراتيجيات الإبادة في البيئة الصحراوية' },
      { en: 'Infrastructure Audits', ar: 'عمليات تدقيق روتينية للبنية التحتية' }
    ],
    image: 'https://images.unsplash.com/photo-1616422285623-149ebadfc7ea?auto=format&fit=crop&w=1600&q=80'
  },
  {
    slug: 'manpower-head-hunting',
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
    slug: 'water-and-fuel-supply',
    title: { en: 'Water and Fuel Supply', ar: 'توريد المياه والوقود' },
    description: { 
      en: 'Ensuring water and fuel delivery right at the doorstep of your project.', 
      ar: 'ضمان توصيل المياه والوقود مباشرة إلى عتبة مشروعك.' 
    },
    features: [
      { en: 'Bulk Fuel Delivery', ar: 'تسليم الوقود بالجملة' },
      { en: 'Emergency Resupplies', ar: 'إعادة التموين في حالات الطوارئ' }
    ],
    image: 'https://images.unsplash.com/photo-1560706834-eea2c63efb72?auto=format&fit=crop&w=1600&q=80'
  },
  {
    slug: 'health-risk-assessment',
    title: { en: 'Health Risk Assessment', ar: 'تقييم المخاطر الصحية' },
    description: { 
      en: 'Comprehensive site-specific hazard mapping and crisis management structuring.', 
      ar: 'رسم خرائط شاملة للمخاطر الخاصة بالموقع وهيكلة إدارة الأزمات.' 
    },
    features: [
      { en: 'Hazard Mapping', ar: 'رسم خرائط المخاطر' },
      { en: 'Crisis Management', ar: 'هيكلة إدارة الأزمات' }
    ],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80'
  },
  {
    slug: 'medical-services-health-care',
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

