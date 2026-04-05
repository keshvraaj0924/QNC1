'use client';

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { adminApi } from '@/services/adminApi';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PageWrapper from '@/components/layout/PageWrapper/PageWrapper';
import Image from 'next/image';
import styles from './Logistics.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function LogisticsPremiumPage() {
  const { language, t } = useLanguage();
  const lang = language as 'en' | 'ar';
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await adminApi.getPublicService('logistics-and-transportation');
        setData(content);
      } catch (err) {
        console.error('Failed to load logistics content:', err);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.4 }
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] as const } 
    }
  };

  // Mock bento items for now, but these could also be dynamic
  const bentoItems = [
    {
      id: 1,
      label: { en: 'Fleet', ar: 'الأسطول' },
      title: { en: 'Heavy Duty Machinery Transport', ar: 'نقل المعدات الثقيلة' },
      image: '/assets/images/logistics_hero_truck_1774678507217.png',
      size: styles.large
    },
    {
      id: 2,
      label: { en: 'Analytics', ar: 'التحليلات' },
      title: { en: 'Real-time GPS Fleet Tracking', ar: 'تتبع الأسطول عبر نظام الـ GPS' },
      image: '/assets/images/logistics_hub_night_1774678547486.png',
      size: styles.medium
    },
    {
      id: 3,
      label: { en: 'Logistics', ar: 'الخدمات اللوجستية' },
      title: { en: 'Vision 2030 Supply Chains', ar: 'سلاسل إمداد رؤية 2030' },
      image: '/assets/images/logistics_heavy_machinery_1774678529568.png',
      size: styles.wide
    },
    {
      id: 4,
      label: { en: 'Sustainability', ar: 'الاستدامة' },
      title: { en: 'Eco-Optimized Routes', ar: 'مسارات محسنة بيئياً' },
      image: data?.image || 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
      size: styles.small
    }
  ];

  if (loading) return <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'black', color: 'white'}}>Loading Experience...</div>;

  return (
    <main className={styles.main}>
      <Header />
      <PageWrapper>
        
        {/* HERO SECTION */}
        <section className={styles.hero}>
          <motion.div 
             className={styles.heroLabel}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
          >
            <span className={styles.dot}></span>
            {lang === 'en' ? '01 LOGISTICS VERTICAL' : '01 قطاع الخدمات اللوجستية'}
          </motion.div>
          
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 }}
          >
            {lang === 'en' ? data?.title_en || 'INDUSTRIAL' : data?.title_ar || 'الخدمات'} <br /> 
            <span className={styles.outlineText}>{lang === 'en' ? 'LOGISTICS' : 'اللوجستية'}</span>
          </motion.h1>

          <motion.p 
            className={styles.heroDesc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            {lang === 'en' 
              ? data?.description_en || 'Qudrat National transforms Kingdom-wide transport...'
              : data?.description_ar || 'شركة قدرات الوطنية تحول خدمات النقل...'}
          </motion.p>
        </section>

        {/* BENTO GRID */}
        <motion.section 
          className={styles.bentoGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
        >
          {bentoItems.map((item) => (
            <motion.div 
              key={item.id} 
              className={`${styles.bentoCard} ${item.size}`}
              variants={fadeInUp}
            >
              <Image 
                src={item.image} 
                alt={item.title[lang]} 
                fill 
                className={styles.cardImage} 
              />
              <div className={styles.cardContent}>
                <span className={styles.cardLabel}>{item.label[lang]}</span>
                <h3 className={styles.cardTitle}>{item.title[lang]}</h3>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* STATS SECTION */}
        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <motion.div 
                className={styles.statValue}
                whileInView={{ opacity: [0, 1], y: [40, 0] }}
                transition={{ duration: 1 }}
              >
                1200+
              </motion.div>
              <div className={styles.statLabel}>{lang === 'en' ? 'VEHICLES' : 'مركبة'}</div>
            </div>
            <div className={styles.statItem}>
              <motion.div 
                className={styles.statValue}
                whileInView={{ opacity: [0, 1], y: [40, 0] }}
                transition={{ duration: 1, delay: 0.1 }}
              >
                99.8%
              </motion.div>
              <div className={styles.statLabel}>{lang === 'en' ? 'ON-TIME DELIVERY' : 'التوصيل في الموعد'}</div>
            </div>
            <div className={styles.statItem}>
              <motion.div 
                className={styles.statValue}
                whileInView={{ opacity: [0, 1], y: [40, 0] }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                24/7
              </motion.div>
              <div className={styles.statLabel}>{lang === 'en' ? 'LIVE TRACKING' : 'تتبع مباشر'}</div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className={styles.ctaSection}>
          <motion.h2 
            className={styles.ctaTitle}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {lang === 'en' ? 'Scale Your Vision' : 'رؤيتك، نطاقنا'}
          </motion.h2>
          <button className={styles.capsuleBtn} data-cursor="hover">
            {t('btn_request_proposal')}
          </button>
        </section>

      </PageWrapper>
      <Footer />
    </main>
  );
}
