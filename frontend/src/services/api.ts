export interface LocalizedString {
  en: string;
  ar: string;
}

export interface NewsItem {
  id: number;
  category: LocalizedString;
  date: string;
  title: LocalizedString;
  image: string;
}

export const fetchLatestNews = async (): Promise<NewsItem[]> => {
  // Simulating an API call to a separate Node.js News Microservice
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          category: { en: 'CORPORATE', ar: 'الشركات' },
          date: 'MARCH 26, 2026',
          title: { en: 'QNC launches new sustainable facility management division', ar: 'قدرات تطلق قسماً جديداً لإدارة المرافق المستدامة' },
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
        },
        {
          id: 2,
          category: { en: 'PARTNERSHIP', ar: 'شراكات' },
          date: 'MARCH 20, 2026',
          title: { en: 'Strategic alliance formed with global tech leaders for smart buildings', ar: 'تحالف استراتيجي مع رواد التكنولوجيا للمباني الذكية' },
          image: 'https://images.unsplash.com/photo-1556761175-5973eabc4b1c?auto=format&fit=crop&q=80&w=800',
        },
        {
          id: 3,
          category: { en: 'AWARDS', ar: 'جوائز' },
          date: 'FEBRUARY 15, 2026',
          title: { en: 'Recognized as Top Employer in the Middle East for 2026', ar: 'اختيار الشركة كأفضل صاحب عمل في الشرق الأوسط لعام 2026' },
          image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
        },
      ]);
    }, 500); // 500ms latency simulation
  });
};
