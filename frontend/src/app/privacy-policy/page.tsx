'use client';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PageWrapper from '@/components/layout/PageWrapper/PageWrapper';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Legal.module.css';

import { useLanguage } from '@/context/LanguageContext';
import { privacyPolicySections } from '@/data/legal';

export default function PrivacyPolicyPage() {
  const { language, t } = useLanguage();
  const lang = language as 'en' | 'ar';
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  // Track active section for sidebar
  useEffect(() => {
    const observers = privacyPolicySections.map((section) => {
      const element = document.getElementById(`section-${section.id}`);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id);
          }
        },
        { threshold: 0.5, rootMargin: "-100px 0px -40% 0px" }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, []);

  const scrollToSection = (id: number) => {
    const element = document.getElementById(`section-${id}`);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className={styles.main} ref={containerRef}>
      <Header />
      <PageWrapper noPadding={true}>
        <section className={styles.heroSection}>
          <div className={styles.imageOverlay} />
          <motion.div style={{ y, scale }} className={styles.heroImageContainer}>
            <Image 
              src="/assets/images/qnc_legacy_branding.png"
              alt="Privacy Policy"
              fill
              className={styles.heroImage}
              priority
            />
          </motion.div>
          <motion.div style={{ opacity }} className={styles.heroContent}>
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
              className={styles.title}
            >
              {t('nav_privacy')}
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className={styles.metaData}
            >
              <span className={styles.lastUpdated}>{t('last_updated')}: 18/05/2025</span>
            </motion.div>
          </motion.div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.container}>
            {/* Sticky Sidebar */}
            <aside className={styles.sidebar}>
              <ul className={styles.navList}>
                {privacyPolicySections.map((section) => (
                  <li 
                    key={section.id} 
                    className={`${styles.navItem} ${activeSection === section.id ? styles.activeNavItem : ''}`}
                    onClick={() => scrollToSection(section.id)}
                  >
                    <span className={styles.navDot} />
                    {section.title[lang]}
                  </li>
                ))}
              </ul>
            </aside>

            {/* Main Content */}
            <div className={styles.content}>
              <motion.div 
                className={styles.introductionBlock}
                initial={{ opacity: 0, x: lang === 'en' ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              >
                <p className={styles.introPara}>
                  {lang === 'en' 
                    ? 'This Privacy Policy applies to the official digital architecture and core operational services of Qudrat National Company (“QNC”, “we,” “our,” or “us”).'
                    : 'تنطبق سياسة الخصوصية هذه على المنصة الرقمية الرسمية والعمليات الأساسية لشركة قدرات الوطنية.'}
                </p>
                <p className={styles.introPara}>
                  {lang === 'en' 
                    ? 'As a paramount contractor in Total Facilities Management within the Kingdom of Saudi Arabia, we are stringently committed to defending the privacy and absolute confidentiality of the data provided.'
                    : 'بصفتنا متعاقداً رئيسياً في الإدارة المتكاملة للمرافق في المملكة العربية السعودية، نحن نلتزم بصرامة بحماية خصوصية وسرية البيانات.'}
                </p>
              </motion.div>

              <div className={styles.prose}>
                {privacyPolicySections.map((section, idx) => (
                  <motion.div 
                    key={section.id}
                    id={`section-${section.id}`}
                    className={styles.policySection}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: idx * 0.1, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <motion.h2 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                    >
                      {section.title[lang]}
                    </motion.h2>
                    <div className={styles.textContent}>
                      {section.content[lang].split('\n').map((line, i) => (
                        <p key={i}>
                          {line.startsWith('•') ? (
                            <span className={styles.bullet}>{line.substring(1).trim()}</span>
                          ) : line}
                        </p>
                      ))}
                    </div>
                    <div className={styles.divider} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
      <Footer />
    </main>
  );
}

