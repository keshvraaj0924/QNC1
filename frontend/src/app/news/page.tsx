'use client';

import { useLanguage } from '@/context/LanguageContext';
import { newsData } from '@/data/newsData';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './NewsHub.module.css';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

import ScrollReveal from '@/components/modern/ScrollReveal';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function NewsHub() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <main className={styles.main} dir={isRTL ? 'rtl' : 'ltr'} ref={containerRef}>
      <Header />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.imageOverlay} />
        <motion.div style={{ y, scale }} className={styles.heroImageContainer}>
          <Image 
            src="/assets/images/alef360.png"
            alt="News"
            fill
            className={styles.heroImage}
            priority
          />
        </motion.div>
        <motion.div style={{ opacity }} className={styles.heroContent}>
          <ScrollReveal direction="up" duration={0.8}>
            <span className={styles.kicker}>
              {isRTL ? 'آخر التحديثات' : 'LATEST UPDATES'}
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1} duration={0.8}>
            <h1 className={styles.title}>
              {isRTL ? 'الأخبار والفعاليات' : 'News & Events'}
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2} duration={0.8}>
            <p className={styles.description}>
              {isRTL 
                ? 'ابق على اطلاع بآخر التطورات والشراكات والإنجازات في شركة قدرات الوطنية.' 
                : 'Stay updated with the latest developments, partnerships, and milestones at Qudrat National Company.'}
            </p>
          </ScrollReveal>
        </motion.div>
        <div className={styles.heroGradient} />
      </section>

      {/* News Grid */}
      <section className={styles.gridSection}>
        <div className={styles.container}>
          <div className={styles.newsGrid}>
            {newsData.map((item, idx) => (
              <ScrollReveal 
                key={item.slug}
                direction="up"
                delay={idx * 0.1}
                className={styles.newsCard}
              >
                <Link href={`/news/${item.slug}`} className={styles.cardLink}>
                  <div className={styles.imageWrapper}>
                    <img src={item.mainImage} alt={item.title[language]} className={styles.image} />
                    <div className={styles.categoryBadge}>
                      <Tag size={12} />
                      {item.category[language]}
                    </div>
                  </div>
                  
                  <div className={styles.content}>
                    <div className={styles.meta}>
                      <span className={styles.date}>
                        <Calendar size={14} />
                        {item.date[language]}
                      </span>
                    </div>
                    <h2 className={styles.cardTitle}>{item.title[language]}</h2>
                    <p className={styles.cardExcerpt}>{item.description[language]}</p>
                    
                    <span className={styles.readMore}>
                      {isRTL ? 'اقرأ المزيد' : 'Read More'}
                      <ArrowRight size={16} className={isRTL ? styles.rotate180 : ''} />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
