'use client';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PageWrapper from '@/components/layout/PageWrapper/PageWrapper';
import Image from 'next/image';
import styles from '../services/[slug]/ServicePage.module.css'; 
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

export default function AboutUs() {
  const { language, t, isRTL } = useLanguage();

  return (
    <main className={`${styles.main} ${isRTL ? styles.rtl : ''}`}>
      <Header />
      <PageWrapper>
        <section className={styles.heroBlock} style={{ height: '45vh' }}>
          <div className={styles.imageOverlay}></div>
          <Image 
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1600" 
            alt={t('nav_about')} 
            fill 
            className={styles.heroImage}
            priority
          />
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className={styles.heroTitle}>{t('nav_about')}</h1>
          </motion.div>
        </section>

        <section className={styles.contentBlock}>
          <div className={styles.container}>
            <motion.div 
              className={styles.textColumn}
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className={styles.label}>{t('about_label')}</span>
              <h2 className={styles.subtitle}>{t('about_headline')}</h2>
              <p className={styles.description}>
                {t('about_description')}
              </p>
            </motion.div>
          </div>
        </section>
      </PageWrapper>
      <Footer />
    </main>
  );
}
