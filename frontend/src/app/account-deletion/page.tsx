'use client';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PageWrapper from '@/components/layout/PageWrapper/PageWrapper';
import { motion } from 'framer-motion';
import styles from '../privacy-policy/Legal.module.css'; // Shared across legal pages

import { useLanguage } from '@/context/LanguageContext';
import { accountDeletionContent } from '@/data/legal';

export default function AccountDeletionPage() {
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
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className={styles.title}
          >
            {accountDeletionContent.title[lang]}
          </motion.h1>
          <p className={styles.lastUpdated}>{accountDeletionContent.desc[lang]}</p>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.container}>
            <div className={styles.prose}>
              {accountDeletionContent.sections.map((section, idx) => (
                <div key={idx}>
                  <h2>{section.title[lang]}</h2>
                  <p>{section.content[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </PageWrapper>
      <Footer />
    </main>
  );
}
