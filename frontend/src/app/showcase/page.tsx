'use client';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PageWrapper from '@/components/layout/PageWrapper/PageWrapper';
import { motion } from 'framer-motion';
import styles from './Showcase.module.css';

const images = [
  'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200',
];

import { useLanguage } from '@/context/LanguageContext';

export default function ShowcasePage() {
  const { language, t } = useLanguage();
  const lang = language as 'en' | 'ar';

  return (
    <main className={styles.main}>
      <Header />
      <PageWrapper>
        <section className={styles.heroSection}>
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className={styles.title}
          >
            {t('nav_showcase')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className={styles.subtitle}
          >
            {t('showcase_subtitle')}
          </motion.p>
        </section>

        <section className={styles.gallerySection}>
          <div className={styles.container}>
            {images.map((src, idx) => (
              <motion.div 
                key={idx}
                className={styles.imageCard}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, delay: (idx % 3) * 0.15, ease: [0.76, 0, 0.24, 1] }}
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src={src} 
                  alt={lang === 'en' ? `Qudrat Operations ${idx + 1}` : `عمليات قدرات ${idx + 1}`} 
                  className={styles.image} 
                />
              </motion.div>
            ))}
          </div>
        </section>
      </PageWrapper>
      <Footer />
    </main>
  );
}
