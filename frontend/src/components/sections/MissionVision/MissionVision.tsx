'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import styles from './MissionVision.module.css';
import { useLanguage } from '@/context/LanguageContext';
import LogoBeam from '@/components/modern/LogoBeam';
import MotionCurve from '@/components/modern/MotionCurve';

const DEFAULT_PURPOSES = [
  {
    id: 'vision',
    number: '01',
    title: { en: 'Vision', ar: 'رؤيتنا' },
    content: { 
      en: 'To be the nationwide premier Total Integrated Facility Management (TIFM) partner in Saudi Arabia, innovating sustainable and efficient solutions that set new industry benchmarks.',
      ar: 'أن نكون الشريك الرائد على مستوى المملكة في الإدارة المتكاملة للمرافق (TIFM) في المملكة العربية السعودية، من خلال ابتكار حلول مستدامة وفعالة تضع معايير جديدة للصناعة.'
    },
    color: '#1A75BB' // QNC Blue
  },
  {
    id: 'mission',
    number: '02',
    title: { en: 'Mission', ar: 'مهمتنا' },
    content: { 
      en: 'Uphold safety standards and quality assurance in delivering services that exceed client expectations.',
      ar: 'الحفاظ على معايير السلامة وضمان الجودة في تقديم الخدمات التي تفوق توقعات العملاء.'
    },
    color: '#3F8E43' // QNC Green
  },
  {
    id: 'values',
    number: '03',
    title: { en: 'Values', ar: 'قيمنا' },
    content: { 
      en: 'Delivering safe, high-quality, and innovative FM solutions that consistently exceed client expectations.',
      ar: 'تقديم حلول إدارة مرافق آمنة وعالية الجودة ومبتكرة تفوق توقعات العملاء باستمرار.'
    },
    color: '#CBA152' // QNC Gold
  }
];

function PurposeCard({ item, index, scrollYProgress, isRTL, language }: any) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  // Scroll-based parallax and reveal effects
  const y = useTransform(scrollYProgress, [0, 1], [100 * (index + 1), -50 * (index + 1)]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [15, 0]);
  
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={cardRef}
      className={styles.pillar}
      style={{
        y: springY,
        opacity,
        scale: springScale,
        rotateX,
        perspective: '1000px',
        '--accent-color': item.color,
      } as any}
      whileHover={{ 
        y: -20,
        scale: 1.02,
        transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] }
      }}
    >
      {/* Background Glow that reacts to scroll */}
      <motion.div 
        className={styles.pillarGlow}
        style={{
          background: `radial-gradient(circle at 50% 100%, ${item.color}33 0%, transparent 70%)`,
          opacity: useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
        }}
      />

      {/* Floating Watermark with Parallax */}
      <motion.div 
        className={styles.watermark}
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [50, -150]),
          opacity: useTransform(scrollYProgress, [0, 0.3], [0, 0.15])
        }}
      >
        {item.number}
      </motion.div>

      <div className={styles.contentWrapper}>
        <div className={styles.headerArea}>
          <div className={styles.titleGroup}>
            <motion.span 
              className={styles.indexNum}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={isInView ? { opacity: 0.7, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              {item.number}
            </motion.span>
            <motion.h3 
              className={styles.pillarTitle}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {item.title[language as 'en' | 'ar']}
            </motion.h3>
          </div>
          <div className={styles.beamWrapper}>
            <LogoBeam height="2px" width="80px" delay={0.5 + index * 0.1} />
          </div>
        </div>

        <div className={styles.bodyArea}>
          <motion.p 
            className={styles.pillarContent}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {item.content[language as 'en' | 'ar']}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export default function MissionVision({ content }: { content?: any }) {
  const { language, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const purposes = content && Array.isArray(content) && content.length > 0 
    ? content.map((item: any, index: number) => ({
        id: item.id || `purpose-${index}`,
        number: `0${index + 1}`,
        title: { en: item.title_en, ar: item.title_ar },
        content: { en: item.content_en, ar: item.content_ar },
        color: item.color || (index === 0 ? '#1A75BB' : index === 1 ? '#3F8E43' : '#CBA152')
      }))
    : DEFAULT_PURPOSES;

  return (
    <section ref={sectionRef} className={`${styles.section} ${isRTL ? styles.rtl : ''}`}>
      <div className={styles.container}>
        {/* Animated Header for the section */}
        <motion.div 
          className={styles.sectionHeader}
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]),
            y: useTransform(scrollYProgress, [0, 0.2], [50, 0])
          }}
        >
          <div className={styles.preHeader}>
            <LogoBeam width="40px" />
            <span>{language === 'ar' ? 'هدفنا' : 'OUR PURPOSE'}</span>
          </div>
          <h2 className={styles.mainTitle}>
            {language === 'ar' ? 'القيم التي تقودنا' : 'VALUES THAT DRIVE US'}
          </h2>
        </motion.div>

        <div className={styles.bentoGrid}>
          {purposes.map((item, index) => (
            <PurposeCard 
              key={item.id}
              item={item}
              index={index}
              scrollYProgress={scrollYProgress}
              isRTL={isRTL}
              language={language}
            />
          ))}
        </div>

        {/* Enhanced Transition Threads */}
        <div className={styles.floatingElements}>
          <motion.div 
            className={styles.bgGlow}
            style={{
              scale: useTransform(scrollYProgress, [0, 1], [0.8, 1.5]),
              opacity: useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 0.1, 0]),
              rotate: useTransform(scrollYProgress, [0, 1], [0, 45])
            }}
          />
          <div className={styles.curveWrapper}>
            <MotionCurve 
              d="M0 100 Q 200 0, 400 100" 
              opacity={0.05}
              duration={10}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
