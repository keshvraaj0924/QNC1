'use client';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PageWrapper from '@/components/layout/PageWrapper/PageWrapper';
import { motion } from 'framer-motion';
import styles from './Legal.module.css';

import { useLanguage } from '@/context/LanguageContext';
import { privacyPolicySections } from '@/data/legal';

export default function PrivacyPolicyPage() {
  const { language, t } = useLanguage();
  const lang = language as 'en' | 'ar';

  return (
    <main className={styles.main}>
      <Header />
      <PageWrapper>
        <section className={styles.heroSection}>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className={styles.title}
          >
            {t('nav_privacy')}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className={styles.metaData}
          >
            <p className={styles.lastUpdated}>Effective Date: 18/05/2025</p>
          </motion.div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.container}>
            <motion.div 
              className={styles.introductionBlock}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
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
                  className={styles.policySection}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                >
                  <motion.h2 
                    initial={{ color: "var(--foreground)" }}
                    whileInView={{ color: "var(--gold)" }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    {section.title[lang]}
                  </motion.h2>
                  <div className={styles.textContent}>
                    {section.content[lang].split('\n').map((line, i) => (
                      <p key={i}>
                        {line.startsWith('•') ? <span className={styles.bullet}>{line}</span> : line}
                      </p>
                    ))}
                  </div>
                  <div className={styles.divider} />
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
