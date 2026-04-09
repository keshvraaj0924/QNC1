import { LocalizedString } from './content';

export interface Certificate {
  name: string; // usually standard names like ISO 9001
  desc: LocalizedString;
}

export const certificates: Certificate[] = [
  { 
    name: 'ISO 14001:2015', 
    desc: { en: 'Environmental Management System', ar: 'نظام إدارة البيئة' } 
  },
  { 
    name: 'ISO 9001:2015', 
    desc: { en: 'Quality Management System', ar: 'نظام إدارة الجودة' } 
  },
  { 
    name: 'ISO 45001:2018', 
    desc: { en: 'Health & Safety Management System', ar: 'نظام إدارة الصحة والسلامة' } 
  },
  { 
    name: 'ISO 45001:2018', 
    desc: { en: 'Facility Management system', ar: 'نظام إدارة المرافق' } 
  },
  { 
    name: 'ISO 22000:2018', 
    desc: { en: 'Food Safety Management system', ar: 'نظام إدارة سلامة الغذاء' } 
  },
  { 
    name: 'BICSc', 
    desc: { en: 'The British Institute of Cleaning Science', ar: 'المعهد البريطاني لعلوم التنظيف' } 
  },
  { 
    name: 'SFMA', 
    desc: { en: 'Saudi Facility Management Association', ar: 'الجمعية السعودية لادارة المرافق' } 
  },
  { 
    name: 'Saudi Aramco', 
    desc: { en: 'Saudi Aramco', ar: 'أرامكو السعودية' } 
  },
  { 
    name: 'Achilles', 
    desc: { en: 'Achilles 2025', ar: 'أكيليس 2025' } 
  },
  { 
    name: 'HACCP', 
    desc: { en: 'HACCP Certified', ar: 'شهادة الهاسيب (HACCP)' } 
  }
];
