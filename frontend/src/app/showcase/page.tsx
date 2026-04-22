'use client';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PageWrapper from '@/components/layout/PageWrapper/PageWrapper';
import { motion } from 'framer-motion';
import DomeGallery from '@/components/modern/DomeGallery';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteLogo } from '@/hooks/useSiteLogo';
import styles from './Showcase.module.css';


const domeImages = [
  '/Dome/C0437T01.JPG',
  '/Dome/C0440T01.JPG',
  '/Dome/C0442T01.JPG',
  '/Dome/C0443T01.JPG',
  '/Dome/C0448T01.JPG',
  '/Dome/C0450T01.JPG',
  '/Dome/C0451T01.JPG',
  '/Dome/C0458T01.JPG',
  '/Dome/C0462T01.JPG',
  '/Dome/C0463T01.JPG',
  '/Dome/C0467T01.JPG',
  '/Dome/C0471T01.JPG',
  '/Dome/C0476T01.JPG',
  '/Dome/C0482T01.JPG',
  '/Dome/C0484T01.JPG',
  '/Dome/DSC03873.JPG',
  '/Dome/DSC03880.JPG',
  '/Dome/DSC03882.JPG',
  '/Dome/DSC03886.JPG'
];

const allImages = [...domeImages];
const heroImages = [
  '/assets/PhotoGallery/1-569x320.png',
  '/assets/PhotoGallery/2-569x320.png',
  '/assets/PhotoGallery/2.-Camp-services-569x369.png',
  '/assets/PhotoGallery/2.-Production-team-569x369.png',
  '/assets/PhotoGallery/3.-Production-team-569x380.png',
  '/assets/PhotoGallery/4-569x320.png',
  '/assets/PhotoGallery/5-569x320.png',
  '/assets/PhotoGallery/6-569x320.png'
];

export default function ShowcasePage() {
  const { language, t } = useLanguage();
  const logoSrc = useSiteLogo();
  const isRTL = language === 'ar';

  return (
    <main className={styles.main}>
      <Header />
      <PageWrapper>
        <section className={styles.heroSection}>
          {/* Authentic Hero Background: Real QNC images in a grid */}
          <div className={styles.bgGrid}>
            {heroImages.map((src, i) => (
              <img key={i} src={src} className={styles.bgImage} alt="" />
            ))}
          </div>
          
          <div className={styles.heroAtmosphere} />
          
          {/* Official QNC Logo Motif */}
          <img src={logoSrc} alt="" className={styles.logoMotif} aria-hidden="true" />

          <div className={styles.heroContent}>
            <motion.span 
              className={styles.subtitle}
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ duration: 1.5 }}
            >
              {t('nav_showcase')}
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              className={styles.title}
            >
              {language === 'en' ? 'Operational Excellence' : 'التميز التشغيلي'}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className={styles.description}
            >
              {language === 'en' 
                ? 'Witness the human energy and technical precision that powers Qudrat National across the Kingdom. Every frame tells a story of reliability, safety, and unwavering commitment to Vision 2030.'
                : 'شاهد الطاقة البشرية والدقة التقنية التي تدفع قدرات الوطنية في جميع أنحاء المملكة. كل لقطة تحكي قصة الموثوقية والسلامة والالتزام الراسخ برؤية 2030.'}
            </motion.p>
          </div>
        </section>

        <section className={styles.interactiveGallery}>
          <div className={styles.sectionHeader}>
            <div className="preHeader">
              <div className="preHeaderLine" />
              <span>{t('dome_label')}</span>
            </div>
            <h2 className={styles.sectionTitle}>{t('dome_title')}</h2>
          </div>
          <div className={styles.galleryWindow}>
          <DomeGallery images={domeImages} />
          </div>
        </section>

        <section className={styles.gallerySection}>
          <div className={styles.sectionHeader}>
            <div className="preHeader">
              <div className="preHeaderLine" />
              <span>{language === 'en' ? 'OPERATIONAL FOOTPRINT' : 'البصمة التشغيلية'}</span>
            </div>
            <h2 className={styles.sectionTitle}>
              {language === 'en' ? 'Project Documentation' : 'توثيق المشاريع'}
            </h2>
          </div>
          <div className={styles.container}>
            {domeImages.map((src, idx) => (
              <motion.div 
                key={idx}
                className={styles.imageCard}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, delay: (idx % 3) * 0.15, ease: [0.76, 0, 0.24, 1] }}
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src={src} 
                  alt={language === 'en' ? `Qudrat Operations ${idx + 1}` : `عمليات قدرات ${idx + 1}`} 
                  className={styles.image} 
                />
              </motion.div>
            ))}
          </div>
        </section>
      </PageWrapper>
      <Footer />
    </main>
  );
}
