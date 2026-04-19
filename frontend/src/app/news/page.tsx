'use client';

import { useLanguage } from '@/context/LanguageContext';
import { newsData } from '@/data/newsData';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './NewsHub.module.css';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

export default function NewsHub() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <main className={styles.main} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.kicker}
          >
            {isRTL ? 'آخر التحديثات' : 'LATEST UPDATES'}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={styles.title}
          >
            {isRTL ? 'الأخبار والفعاليات' : 'News & Events'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={styles.description}
          >
            {isRTL 
              ? 'ابق على اطلاع بآخر التطورات والشراكات والإنجازات في شركة قدرات الوطنية.' 
              : 'Stay updated with the latest developments, partnerships, and milestones at Qudrat National Company.'}
          </motion.p>
        </div>
        <div className={styles.heroGradient} />
      </section>

      {/* News Grid */}
      <section className={styles.gridSection}>
        <div className={styles.container}>
          <div className={styles.newsGrid}>
            {newsData.map((item, idx) => (
              <motion.article 
                key={item.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
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
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
