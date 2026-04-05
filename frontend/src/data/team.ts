import { LocalizedString } from './content';

export interface Executive {
  name: LocalizedString;
  title: LocalizedString;
  image: string;
}

export const executives: Executive[] = [
  { 
    name: { en: 'Khaled Al-Dossari', ar: 'خالد الدوسري' }, 
    title: { en: 'Chairman & Founder', ar: 'رئيس مجلس الإدارة والمؤسس' }, 
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    name: { en: 'Dr. Faisal Al-Rashid', ar: 'د. فيصل الراشد' }, 
    title: { en: 'Chief Executive Officer', ar: 'الرئيس التنفيذي' }, 
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    name: { en: 'Nawaf Al-Mutairi', ar: 'نواف المطيري' }, 
    title: { en: 'VP of Operations', ar: 'نائب الرئيس للعمليات' }, 
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    name: { en: 'Sarah Al-Saud', ar: 'سارة آل سعود' }, 
    title: { en: 'Director of Human Capital', ar: 'مديرة الموارد البشرية' }, 
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800' 
  },
];
