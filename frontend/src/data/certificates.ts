import { LocalizedString } from './content';

export interface Certificate {
  name: string; // usually standard names like ISO 9001
  desc: LocalizedString;
}

export const certificates: Certificate[] = [
  { 
    name: 'ISO 9001:2015', 
    desc: { en: 'Quality Management Systems Standard', ar: 'معيار أنظمة إدارة الجودة' } 
  },
  { 
    name: 'ISO 14001:2015', 
    desc: { en: 'Environmental Management Systems Standard', ar: 'معيار أنظمة الإدارة البيئية' } 
  },
  { 
    name: 'ISO 45001:2018', 
    desc: { en: 'Occupational Health and Safety', ar: 'الصحة والسلامة المهنية' } 
  },
  { 
    name: 'ISO 22000:2018', 
    desc: { en: 'Food Safety Management Systems', ar: 'أنظمة إدارة سلامة الأغذية' } 
  },
];
