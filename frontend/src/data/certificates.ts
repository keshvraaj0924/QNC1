import { LocalizedString } from './content';

export interface Certificate {
  name: string; 
  desc: LocalizedString;
  image: string;
}

export const certificates: Certificate[] = [
  { 
    name: 'ISO 14001:2015', 
    desc: { en: 'Environmental Management System', ar: 'نظام إدارة البيئة' },
    image: '/assets/images/certificates/iso_14001.png'
  },
  { 
    name: 'ISO 9001:2015', 
    desc: { en: 'Quality Management System', ar: 'نظام إدارة الجودة' },
    image: '/assets/images/certificates/iso_9001.png'
  },
  { 
    name: 'ISO 45001:2018', 
    desc: { en: 'Health & Safety Management System', ar: 'نظام إدارة الصحة والسلامة' },
    image: '/assets/images/certificates/iso_45001.png'
  },
  { 
    name: 'ISO 41001:2018', 
    desc: { en: 'Facility Management system', ar: 'نظام إدارة المرافق' },
    image: '/assets/images/certificates/iso_41001.png'
  },
  { 
    name: 'ISO 22000:2018', 
    desc: { en: 'Food Safety Management system', ar: 'نظام إدارة سلامة الغذاء' },
    image: '/assets/images/certificates/iso_22000.png'
  },
  { 
    name: 'BICSc', 
    desc: { en: 'The British Institute of Cleaning Science', ar: 'المعهد البريطاني لعلوم التنظيف' },
    image: '/assets/images/certificates/bicsc.png'
  },
  { 
    name: 'SFMA', 
    desc: { en: 'Saudi Facility Management Association', ar: 'الجمعية السعودية لادارة المرافق' },
    image: '/assets/images/certificates/sfma.png'
  },
  { 
    name: 'Saudi Aramco', 
    desc: { en: 'Saudi Aramco', ar: 'أرامكو السعودية' },
    image: '/assets/images/certificates/saudi_aramco.png'
  },
  { 
    name: 'Achilles', 
    desc: { en: 'Achilles 2025', ar: 'أكيليس 2025' },
    image: '/assets/images/certificates/achilles.png'
  },
  { 
    name: 'HACCP', 
    desc: { en: 'HACCP Certified', ar: 'شهادة الهاسيب (HACCP)' },
    image: '/assets/images/certificates/haccp.png'
  }
];
