'use client';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PageWrapper from '@/components/layout/PageWrapper/PageWrapper';
import { motion } from 'framer-motion';
import styles from './Team.module.css';

import { useLanguage } from '@/context/LanguageContext';
import { executives } from '@/data/team';

export default function TeamPage() {
  const { language, t } = useLanguage();
  const lang = language as 'en' | 'ar';

  return (
    <main className={styles.main}>
      <Header />
      <PageWrapper>
        <section className={styles.heroSection}>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className={styles.title}
          >
            {t('nav_team')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className={styles.subtitle}
          >
            {t('team_subtitle')}
          </motion.p>
        </section>

        <section className={styles.gridSection}>
          <div className={styles.container}>
            {executives.map((exec, idx) => (
              <motion.div 
                key={idx}
                className={styles.card}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: idx * 0.1, ease: [0.76, 0, 0.24, 1] }}
                whileHover={{ y: -10 }}
              >
                <div className={styles.imageWrapper}>
                  <img src={exec.image} alt={exec.name[lang]} className={styles.image} />
                  <div className={styles.imageOverlay} />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.execName}>{exec.name[lang]}</h3>
                  <p className={styles.execTitle}>{exec.title[lang]}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </PageWrapper>
      <Footer />
    </main>
  );
}
