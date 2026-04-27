'use client';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PageWrapper from '@/components/layout/PageWrapper/PageWrapper';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import styles from './Certificates.module.css';

import { useLanguage } from '@/context/LanguageContext';
import { certificates } from '@/data/certificates';

export default function CertificatesPage() {
  const { language, t, isRTL } = useLanguage();
  const lang = language as 'en' | 'ar';

  const standards = certificates.filter(c => c.name.startsWith('ISO'));
  const partners = certificates.filter(c => !c.name.startsWith('ISO'));

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <main className={`${styles.main} ${isRTL ? styles.rtl : ''}`} ref={containerRef}>
      <Header />
      <PageWrapper noPadding={true}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.imageOverlay} />
          <motion.div style={{ y, scale }} className={styles.heroImageContainer}>
            <Image 
              src="/assets/images/certificates/compliance_hero.png"
              alt="Compliance"
              fill
              className={styles.heroImage}
              priority
            />
          </motion.div>
          <motion.div style={{ opacity }} className={styles.container}>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={styles.title}
            >
              {t('nav_certificates')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className={styles.subtitle}
            >
              {t('cert_subtitle')}
            </motion.p>
          </motion.div>
        </section>

        {/* Global Standards Grid (ISO) */}
        <section className={styles.standardsSection}>
          <div className={styles.container}>
            <div className={styles.standardsGrid}>
              {standards.map((cert, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className={styles.isoCard}
                  data-cursor="hover"
                >
                  <div className={styles.isoImageWrapper}>
                    <img src={cert.image} alt={cert.name} className={styles.isoImage} />
                  </div>
                  <div className={styles.isoContent}>
                    <h3 className={styles.isoName}>{cert.desc[lang]}</h3>
                    <span className={styles.isoVersion}>{cert.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners & Accreditations */}
        <section className={styles.partnersSection}>
          <div className={styles.container}>
            <div className={styles.partnersGrid}>
              {partners.map((cert, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.6 }}
                  className={styles.partnerLogo}
                  title={cert.name}
                  data-cursor="hover"
                >
                  <img src={cert.image} alt={cert.name} className={styles.partnerImage} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </PageWrapper>
      <Footer />
    </main>
  );
}
