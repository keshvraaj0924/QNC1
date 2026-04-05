'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';
import styles from './OverlayMenu.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteLogo } from '@/hooks/useSiteLogo';
import { menuLinks } from '@/data/navigation';
import MagnetButton from '@/components/modern/MagnetButton';

const featuredNews = [
  {
    kicker: { en: 'Impact', ar: 'تأثير' },
    title: { en: 'Qudrat National expands Catering Operations to King Abdullah Economic City.', ar: 'قدرات الوطنية توسع عمليات الإعاشة في مدينة الملك عبد الله الاقتصادية.' },
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800',
    date: { en: 'Dec 12, 2025', ar: '12 ديسمبر 2025' }
  },
  {
    kicker: { en: 'Growth', ar: 'نمو' },
    title: { en: 'New Manpower Logistics HQ opens supporting Vision 2030 megaprojects.', ar: 'افتتاح مقر لوجستي جديد للقوى العاملة لدعم مشاريع رؤية 2030.' },
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800',
    date: { en: 'Jan 04, 2026', ar: '04 يناير 2026' }
  }
];

export default function OverlayMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { language, t } = useLanguage();
  const logoSrc = useSiteLogo();
  const [activeLink, setActiveLink] = useState('Services');

  const overlayVariants: any = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const staggerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const activeMenuLink = menuLinks.find((l) => l.name.en === activeLink);
  const activeSubpages = activeMenuLink?.subPages || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.overlay}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
        >
          <div className={styles.overlayHeader}>
            <img src={logoSrc} alt="Qudrat National Company" className={styles.logoImage} />
            <MagnetButton strength={0.3}>
              <button onClick={onClose} className={styles.closeBtn} data-cursor="hover">
                <X size={36} strokeWidth={1.5} />
              </button>
            </MagnetButton>
          </div>

          <div className={styles.menuContainer} data-lenis-prevent="true">
            <motion.div className={styles.primaryLinks} variants={staggerVariants} initial="hidden" animate="visible">
              {menuLinks.map((link) => (
                <motion.div key={link.name.en} variants={itemVariants} className={styles.linkWrapper}>
                  <MagnetButton strength={0.1}>
                    <Link 
                      href={link.path}
                      className={`${styles.primaryLink} ${activeLink === link.name.en ? styles.active : ''}`}
                      onMouseEnter={() => setActiveLink(link.name.en)}
                      onClick={onClose}
                      data-cursor="hover"
                    >
                      {link.name[language]}
                    </Link>
                  </MagnetButton>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className={styles.subPagesColumn}>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeLink}
                  className={styles.subGrid}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={staggerVariants}
                >
                  {activeSubpages.length > 0 ? (
                    activeSubpages.map((sub, idx) => (
                      <motion.div key={idx} variants={itemVariants}>
                        <Link 
                          href={sub.path}
                          className={styles.subLink}
                          data-cursor="hover"
                          onClick={onClose}
                        >
                          {sub.name[language]}
                        </Link>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div variants={itemVariants} className={styles.contextPanel}>
                       {activeLink === 'Home' && (
                         <>
                           <h4 className={styles.contextTitle}>{t('nav_home')}</h4>
                           <p className={styles.contextDesc}>{t('section_vision_desc')}</p>
                           <Link href="/" className={styles.contextLink} onClick={onClose}>{t('btn_read_more')} ↗</Link>
                         </>
                       )}
                       {activeLink === 'Contact' && (
                         <>
                           <h4 className={styles.contextTitle}>{t('nav_contact')}</h4>
                           <p className={styles.contextDesc}>{t('nav_location')}</p>
                           <a href="mailto:info@qudratnational.com" className={styles.contextLink}>info@qudratnational.com</a>
                         </>
                       )}
                       {activeLink === 'Photo Gallery' && (
                         <>
                           <h4 className={styles.contextTitle}>{t('nav_showcase')}</h4>
                           <p className={styles.contextDesc}>{t('footer_tagline')}</p>
                           <Link href="/showcase" className={styles.contextLink} onClick={onClose}>{t('nav_showcase')} ↗</Link>
                         </>
                       )}
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div className={styles.featuredNewsColumn} variants={staggerVariants} initial="hidden" animate="visible">
               <motion.span variants={itemVariants} className={styles.featuredTitle}>{t('section_news_title')}</motion.span>
               <div className={styles.newsGrid}>
                 {featuredNews.map((news, idx) => (
                   <motion.div 
                     key={idx} 
                     variants={itemVariants} 
                     className={styles.newsCard}
                     data-cursor="hover"
                   >
                      <div className={styles.newsImageWrapper}>
                        <img src={news.image} alt={news.title[language]} className={styles.newsImage} />
                      </div>
                      <div className={styles.newsContent}>
                        <div className={styles.newsMeta}>
                          <span className={styles.newsKicker}>{news.kicker[language]}</span>
                          <span className={styles.newsSeparator}>•</span>
                          <span className={styles.newsDate}>{news.date[language]}</span>
                        </div>
                        <h4 className={styles.newsHeadline}>{news.title[language]}</h4>
                      </div>
                   </motion.div>
                 ))}
               </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
