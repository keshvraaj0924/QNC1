'use client';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PageWrapper from '@/components/layout/PageWrapper/PageWrapper';
import { motion } from 'framer-motion';
import styles from './Certificates.module.css';

import { useLanguage } from '@/context/LanguageContext';
import { certificates } from '@/data/certificates';

export default function CertificatesPage() {
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
            {t('nav_certificates')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className={styles.subtitle}
          >
            {t('cert_subtitle')}
          </motion.p>
        </section>

        <section className={styles.listSection}>
          <div className={styles.container}>
            {certificates.map((cert, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: lang === 'en' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                className={styles.certRow}
                data-cursor="hover"
              >
                <div className={styles.certIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div className={styles.certContent}>
                  <h3 className={styles.certName}>{cert.name}</h3>
                  <p className={styles.certDesc}>{cert.desc[lang]}</p>
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
