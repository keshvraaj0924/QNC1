import { LocalizedString } from './content';

export interface NavLink {
  name: LocalizedString;
  path: string;
  subPages: { 
    name: LocalizedString; 
    path: string;
    group?: LocalizedString; 
  }[];
}

export const menuLinks: NavLink[] = [
  { 
    name: { en: 'Home', ar: 'الرئيسية' }, 
    path: '/', 
    subPages: [] 
  },
  { 
    name: { en: 'About Us', ar: 'من نحن' }, 
    path: '/about-us', 
    subPages: [
      { name: { en: 'Certificates', ar: 'الشهادات' }, path: '/certificates' }, 
      { name: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' }, path: '/privacy-policy' },
      { name: { en: 'Account Deletion', ar: 'حذف الحساب' }, path: '/account-deletion' }
    ] 
  },
  { 
    name: { en: 'News & Events', ar: 'الأخبار والفعاليات' }, 
    path: '/news', 
    subPages: [] 
  },
  { 
    name: { en: 'Services', ar: 'الخدمات' }, 
    path: '/services', 
    subPages: [
      // HARD SERVICES
      { group: { en: 'Hard Services', ar: 'الخدمات الصلبة' }, name: { en: 'HVAC Services', ar: 'التكييف والتهوية' }, path: '/services/hvac-services' },
      { group: { en: 'Hard Services', ar: 'الخدمات الصلبة' }, name: { en: 'MEP Engineering', ar: 'الهندسة الكهروميكانيكية' }, path: '/services/mep-engineering' },
      { group: { en: 'Hard Services', ar: 'الخدمات الصلبة' }, name: { en: 'Civil Works', ar: 'الأعمال المدنية' }, path: '/services/civil-construction' },
      { group: { en: 'Hard Services', ar: 'الخدمات الصلبة' }, name: { en: 'Low Current', ar: 'التيار المنخفض' }, path: '/services/low-current-systems' },
      { group: { en: 'Hard Services', ar: 'الخدمات الصلبة' }, name: { en: 'Renovation', ar: 'التجديد والتجهيز' }, path: '/services/renovation-and-fitout' },
      { group: { en: 'Hard Services', ar: 'الخدمات الصلبة' }, name: { en: '3rd Party Management', ar: 'إدارة الموردين' }, path: '/services/third-party-management' },
      
      // SOFT SERVICES
      { group: { en: 'Soft Services', ar: 'الخدمات الناعمة' }, name: { en: 'Housekeeping', ar: 'النظافة والصيانة' }, path: '/services/housekeeping-and-maintenance' },
      { group: { en: 'Soft Services', ar: 'الخدمات الناعمة' }, name: { en: 'Catering Services', ar: 'الخدمات الغذائية' }, path: '/services/catering-services' },
      { group: { en: 'Soft Services', ar: 'الخدمات الناعمة' }, name: { en: 'Facade Cleaning', ar: 'تنظيف الواجهات' }, path: '/services/facade-cleaning' },
      { group: { en: 'Soft Services', ar: 'الخدمات الناعمة' }, name: { en: 'Landscaping', ar: 'تنسيق الحدائق' }, path: '/services/landscaping-services' },
      { group: { en: 'Soft Services', ar: 'الخدمات الناعمة' }, name: { en: 'Pest Control', ar: 'مكافحة الحشرات' }, path: '/services/pest-control-management' },
      { group: { en: 'Soft Services', ar: 'الخدمات الناعمة' }, name: { en: '24/7 Helpdesk', ar: 'مكتب مساعدة 24/7' }, path: '/services/facility-help-desk' }
    ] 
  },
  { 
    name: { en: 'Photo Gallery', ar: 'معرض الصور' }, 
    path: '/showcase', 
    subPages: [] 
  },
  { 
    name: { en: 'Careers', ar: 'الوظائف' }, 
    path: '/careers', 
    subPages: [] 
  },
  { 
    name: { en: 'Contact', ar: 'اتصل بنا' }, 
    path: '/contact', 
    subPages: [] 
  },
];
