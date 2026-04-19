'use client';

import { useLanguage } from '@/context/LanguageContext';
import { NewsItem, newsData } from '@/data/newsData';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Calendar, Tag, Share2 } from 'lucide-react';
import styles from './NewsArticle.module.css';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

export default function NewsArticleClient({ newsItem }: { newsItem: NewsItem }) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  // Recent news (excluding current)
  const recentNews = newsData
    .filter(n => n.id !== newsItem.id)
    .slice(0, 3);

  return (
    <main className={styles.main} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />

      {/* Hero Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
           <Link href="/news" className={styles.backLink}>
             {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
             {isRTL ? 'العودة للأخبار' : 'BACK TO NEWS'}
           </Link>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className={styles.meta}
           >
              <span className={styles.categoryBadge}>
                <Tag size={12} />
                {newsItem.category[language]}
              </span>
              <span className={styles.date}>
                <Calendar size={14} />
                {newsItem.date[language]}
              </span>
           </motion.div>

           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className={styles.title}
           >
             {newsItem.title[language]}
           </motion.h1>
        </div>
      </header>

      {/* Main Image */}
      <section className={styles.heroImageSection}>
        <div className={styles.heroImageWrapper}>
          <img src={newsItem.mainImage} alt={newsItem.title[language]} className={styles.heroImage} />
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.contentSection}>
        <div className={styles.articleContainer}>
          <div className={styles.articleBody}>
            {newsItem.content[language].split('\n\n').map((paragraph, idx) => (
              <p key={idx} className={styles.paragraph}>{paragraph}</p>
            ))}
            
            {/* Conditional Gallery for items like QNC Contracts */}
            {newsItem.gallery && newsItem.gallery.length > 0 && (
              <div className={styles.gallery}>
                <h3 className={styles.galleryTitle}>
                  {isRTL ? 'معرض الصور' : 'Visual Highlights'}
                </h3>
                <div className={styles.galleryGrid}>
                  {newsItem.gallery.map((img, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className={styles.galleryItem}
                    >
                      <img src={img} alt={`Gallery ${idx}`} className={styles.galleryImg} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Related News */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarContent}>
               <h3 className={styles.sidebarTitle}>{isRTL ? 'أخبار ذات صلة' : 'Related News'}</h3>
               <div className={styles.relatedList}>
                 {recentNews.map((news) => (
                   <Link key={news.slug} href={`/news/${news.slug}`} className={styles.relatedCard}>
                     <img src={news.mainImage} alt={news.title[language]} className={styles.relatedImg} />
                     <div className={styles.relatedInfo}>
                       <span className={styles.relatedDate}>{news.date[language]}</span>
                       <h4 className={styles.relatedTitle}>{news.title[language]}</h4>
                     </div>
                   </Link>
                 ))}
               </div>
               
               <div className={styles.shareBox}>
                 <span>{isRTL ? 'مشاركة الخبر' : 'Share Article'}</span>
                 <div className={styles.shareIcons}>
                   <button className={styles.shareBtn}><Share2 size={18} /></button>
                 </div>
               </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
