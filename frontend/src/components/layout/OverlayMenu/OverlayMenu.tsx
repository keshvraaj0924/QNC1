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
import { useSettings } from '@/context/SettingsContext';

import { newsData } from '@/data/newsData';

const featuredNews = newsData.slice(0, 2);

export default function OverlayMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { language, t } = useLanguage();
  const { cmsMode, toggleCmsMode } = useSettings();
  const logoSrc = useSiteLogo();
  const [activeLink, setActiveLink] = useState('Services');

  const overlayVariants: any = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const staggerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  const activeMenuLink = menuLinks.find((l) => l.name.en === activeLink);
  const activeSubpages = activeMenuLink?.subPages || [];

  // Group subpages by their 'group' property
  const groupedSubpages = activeSubpages.reduce((acc: any, sub) => {
    const groupName = sub.group ? sub.group[language] : 'General';
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(sub);
    return acc;
  }, {});

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
            <div className={styles.headerActions}>
              <div className={styles.cmsToggleWrapper} onClick={toggleCmsMode} data-cursor="hover">
                <span className={styles.cmsLabel}>{cmsMode ? 'CMS MODE' : 'LOCAL MODE'}</span>
                <div className={`${styles.toggleTrack} ${cmsMode ? styles.active : ''}`}>
                  <motion.div 
                    className={styles.toggleThumb}
                    animate={{ x: cmsMode ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
              </div>
              <MagnetButton strength={0.3}>
                <button onClick={onClose} className={styles.closeBtn} data-cursor="hover">
                  <X size={36} strokeWidth={1.5} />
                </button>
              </MagnetButton>
            </div>
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
                    Object.entries(groupedSubpages).map(([groupName, subs]: [string, any]) => (
                      <div key={groupName} className={styles.groupSection}>
                        {groupName !== 'General' && (
                          <motion.h4 variants={itemVariants} className={styles.groupTitle}>
                            {groupName}
                          </motion.h4>
                        )}
                        <div className={styles.groupLinks}>
                          {subs.map((sub: any, idx: number) => (
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
                          ))}
                        </div>
                      </div>
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
                       {activeLink === 'Careers' && (
                         <>
                           <h4 className={styles.contextTitle}>{t('nav_careers')}</h4>
                           <p className={styles.contextDesc}>{language === 'en' ? 'Join our elite team of facility management professionals and shape the future of operational excellence.' : 'انضم إلى فريقنا المتميز من محترفي إدارة المرافق وساهم في تشكيل مستقبل التميز التشغيلي.'}</p>
                           <Link href="/careers" className={styles.contextLink} onClick={onClose}>{t('nav_careers')} ↗</Link>
                         </>
                       )}
                       {activeLink === 'About Us' && (
                         <>
                           <h4 className={styles.contextTitle}>{t('nav_about')}</h4>
                           <p className={styles.contextDesc}>{t('section_about_desc')}</p>
                           <Link href="/about-us" className={styles.contextLink} onClick={onClose}>{t('nav_about')} ↗</Link>
                         </>
                       )}
                       {activeLink === 'News & Events' && (
                         <>
                           <h4 className={styles.contextTitle}>{t('nav_news')}</h4>
                           <p className={styles.contextDesc}>{language === 'en' ? 'Stay updated with the latest insights, project milestones, and corporate events from QNC.' : 'ابق على اطلاع بآخر الرؤى، وإنجازات المشاريع، وفعاليات الشركة من قدرات الوطنية.'}</p>
                           <Link href="/news" className={styles.contextLink} onClick={onClose}>{t('nav_news')} ↗</Link>
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
                      <Link href={`/news/${news.slug}`} onClick={onClose} className={styles.newsCardLink}>
                        <div className={styles.newsImageWrapper}>
                          <img src={news.mainImage} alt={news.title[language]} className={styles.newsImage} />
                        </div>
                        <div className={styles.newsContent}>
                          <div className={styles.newsMeta}>
                            <span className={styles.newsKicker}>{news.category[language]}</span>
                            <span className={styles.newsSeparator}>•</span>
                            <span className={styles.newsDate}>{news.date[language]}</span>
                          </div>
                          <h4 className={styles.newsHeadline}>{news.title[language]}</h4>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <motion.div variants={itemVariants} className={styles.viewAllWrapper}>
                   <MagnetButton strength={0.1}>
                     <Link href="/news" className={styles.viewAllBtn} onClick={onClose} data-cursor="hover">
                       {language === 'en' ? 'VIEW ALL NEWS & EVENTS' : 'عرض جميع الأخبار والفعاليات'} ↗
                     </Link>
                   </MagnetButton>
                </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
