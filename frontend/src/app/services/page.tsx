'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PageWrapper from '@/components/layout/PageWrapper/PageWrapper';
import { servicesData } from '@/data/content';
import { useLanguage } from '@/context/LanguageContext';
import styles from './ServicesIndex.module.css';
import MotionCurve from '@/components/modern/MotionCurve';

export default function ServicesPage() {
  const { language, t } = useLanguage();

  return (
    <main className={styles.main}>
      <Header />
      <PageWrapper>
        <section className={styles.heroSection}>
          <div className={styles.heroBackground}>
            <Image 
              src="/assets/images/services/renovation.png" 
              alt="QNC Services Excellence" 
              fill 
              priority
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay} />
          </div>
          <div className={styles.heroContent}>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
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
                ? 'Engineering Excellence in Integrated Facility Management.'
                : 'التميز الهندسي في إدارة المرافق المتكاملة.'}
            </motion.p>
          </div>
        </section>

        <div className={styles.curveDivider}>
          <MotionCurve 
            d="M0 100 C 150 0, 250 200, 400 100" 
            width="100%" 
            height="150px"
            opacity={0.2}
            delay={0.8}
            duration={3}
          />
        </div>

        <section className={styles.gridSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.categoryLabel}>
                {language === 'en' ? 'Hard Services' : 'الخدمات الصلبة'}
              </h2>
              <div className={styles.headerLine} />
            </div>
            
            <div className={styles.servicesGrid}>
              {servicesData.filter(s => s.category === 'hard').map((service, idx) => (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={styles.cardWrapper}
                >
                  <Link 
                    href={`/services/${service.slug}`} 
                    className={styles.card} 
                    style={{ '--accent-glow': 'var(--qnc-blue-rgb)' } as any}
                  >
                    <div className={styles.imageContainer}>
                      <Image 
                        src={service.image} 
                        alt={service.title[language]} 
                        fill 
                        className={styles.serviceImage}
                      />
                      <div className={styles.imageOverlay} />
                    </div>
                    <div className={styles.cardContent}>
                      <h3>{service.title[language]}</h3>
                      <p>{service.description[language]}</p>
                      <span className={styles.readMore}>
                        {t('btn_read_more')} →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.curveDivider}>
          <MotionCurve 
            d="M400 100 C 250 200, 150 0, 0 100" 
            width="100%" 
            height="150px"
            opacity={0.2}
            delay={0.4}
            duration={3}
          />
        </div>

        <section className={styles.gridSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.softLabel}>
                {language === 'en' ? 'Soft Services' : 'الخدمات اللينة'}
              </h2>
              <div className={styles.headerLine} />
            </div>
            
            <div className={styles.servicesGrid}>
              {servicesData.filter(s => s.category === 'soft').map((service, idx) => (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={styles.cardWrapper}
                >
                  <Link 
                    href={`/services/${service.slug}`} 
                    className={styles.card} 
                    style={{ '--accent-glow': 'var(--qnc-green-rgb)' } as any}
                  >
                    <div className={styles.imageContainer}>
                      <Image 
                        src={service.image} 
                        alt={service.title[language]} 
                        fill 
                        className={styles.serviceImage}
                      />
                      <div className={styles.imageOverlay} />
                    </div>
                    <div className={styles.cardContent}>
                      <h3>{service.title[language]}</h3>
                      <p>{service.description[language]}</p>
                      <span className={styles.readMore}>
                        {t('btn_read_more')} →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.curveDivider}>
          <MotionCurve 
            d="M0 100 Q 200 0, 400 100" 
            width="100%" 
            height="100px"
            opacity={0.15}
            delay={0.2}
            duration={2.5}
          />
        </div>
      </PageWrapper>
      <Footer />
    </main>
  );
}
