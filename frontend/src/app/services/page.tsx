'use client';

import { servicesData } from '@/data/content';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PageWrapper from '@/components/layout/PageWrapper/PageWrapper';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ServicesIndex.module.css';

import { useLanguage } from '@/context/LanguageContext';

export default function ServicesIndexPage() {
  const { language, t } = useLanguage();

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const fadeInUp: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
  };

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
            {t('nav_services')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className={styles.subtitle}
          >
            {language === 'en' 
              ? 'Delivering paramount Facilities Management and Logistics across the Kingdom of Saudi Arabia.'
              : 'تقديم خدمات متميزة في إدارة المرافق والخدمات اللوجستية في جميع أنحاء المملكة العربية السعودية.'}
          </motion.p>
        </section>

        <section className={styles.gridSection}>
          <motion.div 
            className={styles.container}
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {servicesData.map((service, idx) => (
              <motion.div key={idx} variants={fadeInUp} className={styles.cardWrapper}>
                <Link href={`/services/${service.slug}`} className={styles.card}>
                  <div className={styles.imageContainer}>
                    <div className={styles.imageOverlay} />
                    <Image 
                      src={service.image} 
                      alt={service.title[language]} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={styles.serviceImage} 
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{service.title[language]}</h3>
                    <p>{service.description[language].substring(0, 100)}...</p>
                    <span className={styles.readMore}>{t('btn_read_more')} {language === 'en' ? '→' : '←'}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </PageWrapper>
      <Footer />
    </main>
  );
}
