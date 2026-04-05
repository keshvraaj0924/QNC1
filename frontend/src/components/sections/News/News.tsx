'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fetchLatestNews, NewsItem } from '../../../services/api';
import styles from './News.module.css';

import { useLanguage } from '@/context/LanguageContext';

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const { language, t } = useLanguage();

  useEffect(() => {
    fetchLatestNews().then((data) => setNews(data));
  }, []);

  return (
    <section className={styles.newsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.div 
            className="preHeader"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="preHeaderLine"></span>
            <span>{t('section_news_title')}</span>
          </motion.div>
          
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {language === 'en' ? 'Latest Perspectives' : 'آخر المستجدات'}
          </motion.h2>
        </div>

        <div className={styles.masonryGrid}>
          {news.map((item, index) => (
            <motion.article 
              key={item.id}
              className={`${styles.card} ${index % 3 === 0 ? styles.tall : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              data-cursor="hover"
            >
              <div className={styles.imageWrapper}>
                <Image src={item.image} alt={item.title[language]} fill className={styles.image} />
                <div className={styles.cardOverlay} />
              </div>
              
              <div className={styles.cardContent}>
                <div className={styles.meta}>
                  <span className={styles.category}>{item.category[language]}</span>
                  <span className={styles.dot}>•</span>
                  <span className={styles.date}>{item.date}</span>
                </div>
                <h4 className={styles.cardTitle}>{item.title[language]}</h4>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div 
          className={styles.footer}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <button className={styles.seeAllBtn} data-cursor="hover">
            <span>{t('btn_see_all')}</span>
            <span className={styles.btnIcon}>{language === 'en' ? '→' : '←'}</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
