import { LocalizedString } from './content';

export interface NavLink {
  name: LocalizedString;
  path: string;
  subPages: { name: LocalizedString; path: string }[];
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
    name: { en: 'Services', ar: 'الخدمات' }, 
    path: '/services', 
    subPages: [
      { name: { en: 'Facilities Management', ar: 'إدارة المرافق' }, path: '/services/facilities-management' },
      { name: { en: 'Manpower Head Hunting', ar: 'استقطاب القوى العاملة' }, path: '/services/manpower-head-hunting' },
      { name: { en: 'Water & Fuel Supply', ar: 'توريد المياه والوقود' }, path: '/services/water-and-fuel-supply' },
      { name: { en: 'Logistics & Transportation', ar: 'الخدمات اللوجستية والنقل' }, path: '/services/logistics-and-transportation' },
      { name: { en: 'Pest Control', ar: 'مكافحة الحشرات' }, path: '/services/pest-control-management' },
      { name: { en: 'Water & Sanitation', ar: 'المياه والصرف الصحي' }, path: '/services/water-and-sanitation-solutions' },
      { name: { en: 'Laundry Services', ar: 'خدمات المغاسل' }, path: '/services/laundry-services' },
      { name: { en: 'Housekeeping', ar: 'النظافة والصيانة' }, path: '/services/housekeeping-and-maintenance' },
      { name: { en: 'Catering Services', ar: 'خدمات الإعاشة' }, path: '/services/catering-services' },
      { name: { en: 'Health Risk Assessment', ar: 'تقييم المخاطر الصحية' }, path: '/services/health-risk-assessment' },
      { name: { en: 'Medical Services', ar: 'الخدمات الطبية' }, path: '/services/medical-services-health-care' }
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
