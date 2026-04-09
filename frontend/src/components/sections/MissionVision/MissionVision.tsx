'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import styles from './MissionVision.module.css';
import { useLanguage } from '@/context/LanguageContext';
import LogoBeam from '@/components/modern/LogoBeam';
import MotionCurve from '@/components/modern/MotionCurve';
import BlurText from '@/components/modern/BlurText';
import CardSwap, { Card } from './CardSwap';
import OrbitImages from '@/components/modern/OrbitImages';

const ORBIT_IMAGES = [
  '/assets/images/purpose/purpose_vision_future_1775624699579.png',
  '/assets/images/purpose/purpose_mission_excellence_1775624723120.png',
  '/assets/images/purpose/purpose_values_integrity_1775624743756.png',
  '/assets/images/purpose/purpose_qnc_innovation_1775624762526.png',
  '/assets/images/purpose/purpose_sustainability_green_1775624781405.png',
  '/assets/images/purpose/purpose_community_nodes_1775624802566.png'
];

const DEFAULT_PURPOSES = [
  {
    id: 'vision',
    number: '01',
    title: { en: 'Vision', ar: 'رؤيتنا' },
    content: { 
      en: 'To be the nationwide premier Total Integrated Facility Management (TIFM) partner in Saudi Arabia, innovating sustainable and efficient solutions that set new industry benchmarks.',
      ar: 'أن نكون الشريك الرائد على مستوى المملكة في الإدارة المتكاملة للمرافق (TIFM) في المملكة العربية السعودية، من خلال ابتكار حلول مستدامة وفعالة تضع معايير جديدة للصناعة.'
    },
    color: '#1373B9'
  },
  {
    id: 'mission',
    number: '02',
    title: { en: 'Mission', ar: 'مهمتنا' },
    content: { 
      en: 'Uphold safety standards and quality assurance in delivering services that exceed client expectations.',
      ar: 'الحفاظ على معايير السلامة وضمان الجودة في تقديم الخدمات التي تفوق توقعات العملاء.'
    },
    color: '#3E813E'
  },
  {
    id: 'values',
    number: '03',
    title: { en: 'Values', ar: 'قيمنا' },
    content: { 
      en: 'Delivering safe, high-quality, and innovative FM solutions that consistently exceed client expectations.',
      ar: 'تقديم حلول إدارة مرافق آمنة وعالية الجودة ومبتكرة تفوق توقعات العملاء باستمرار.'
    },
    color: '#6359A6'
  }
];

export default function MissionVision({ content }: { content?: any }) {
  const { language, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const purposes = content && Array.isArray(content) && content.length > 0 
    ? content.map((item: any, index: number) => ({
        id: item.id || `purpose-${index}`,
        number: `0${index + 1}`,
        title: { en: item.title_en, ar: item.title_ar },
        content: { en: item.content_en, ar: item.content_ar },
        color: item.color || (index === 0 ? '#1373B9' : index === 1 ? '#3E813E' : '#6359A6')
      }))
    : DEFAULT_PURPOSES;

  return (
    <section ref={sectionRef} className={`${styles.section} ${isRTL ? styles.rtl : ''}`}>
      {/* Background Animated Vision 2030 Lines */}
      <motion.div className={styles.backgroundCurves} style={{ opacity }}>
        <motion.div style={{ y: y1 }} className={styles.curveWrapper}>
          <MotionCurve 
            d={isRTL ? "M1400 300 Q 1050 500, 700 300 T 0 300" : "M0 300 Q 350 100, 700 300 T 1400 300"} 
            viewBox="0 0 1400 600"
            duration={5}
            opacity={0.12}
            strokeWidth={2}
          />
        </motion.div>
        <motion.div style={{ y: y2 }} className={styles.curveWrapperOffset}>
          <MotionCurve 
            d={isRTL ? "M1400 100 C 1200 400, 900 0, 700 200 C 500 400, 200 0, 0 100" : "M0 100 C 200 -100, 500 300, 700 100 C 900 -100, 1200 300, 1400 100"} 
            viewBox="0 0 1400 400"
            duration={8}
            delay={1}
            opacity={0.08}
            strokeWidth={1.5}
          />
        </motion.div>
        <motion.div style={{ y: y3 }} className={styles.curveWrapperFloating}>
          <MotionCurve 
            d="M0 400 C 350 450, 700 350, 1050 450 C 1400 350, 1400 400, 1400 400" 
            viewBox="0 0 1400 600"
            duration={10}
            opacity={0.05}
            strokeWidth={1}
          />
        </motion.div>
      </motion.div>

      <div className={styles.container}>
        <div className={styles.headerRow}>
          <motion.div 
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.preHeader}>
              <LogoBeam width="80px" />
              <span className={styles.labelSpan}>{language === 'ar' ? 'رسالتنا وقيمنا' : 'OUR PURPOSE'}</span>
            </div>
            <h2 className={styles.mainTitle}>
              <BlurText 
                text={language === 'ar' ? 'القيم التي تقودنا' : 'VALUES THAT DRIVE US'}
                delay={50}
                animateBy="words"
                direction="top"
              />
            </h2>
          </motion.div>
        </div>

        <div className={styles.contentLayout}>
          {/* Left Column: 3D Orbiting Gallery */}
          <motion.div 
            className={styles.orbitColumn}
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <OrbitImages
              images={ORBIT_IMAGES}
              shape="ellipse"
              radiusX={340}
              radiusY={100}
              rotation={isRTL ? 8 : -8}
              duration={35}
              itemSize={100}
              responsive={true}
              radius={160}
              fill
              showPath
              pathColor="rgba(99, 89, 166, 0.4)"
              pathWidth={2}
              centerContent={
                <motion.div
                  className={styles.orbitCenterLogo}
                  animate={{ 
                    scale: [0.95, 1.05, 0.95],
                    rotateY: [0, 10, -10, 0],
                    rotateX: [0, -5, 5, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <img 
                    src="/assets/images/QLogoSymbol/TransaparentQ.png" 
                    alt="QNC Symbol" 
                    className={styles.centerSymbol}
                  />
                  <div className={styles.centerGlow} />
                </motion.div>
              }
            />
          </motion.div>

          {/* Right Column: Moving Swap Cards */}
          <motion.div 
            className={styles.cardsColumn}
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className={styles.swapContainer}>
              <CardSwap
                width="100%"
                height="100%"
                cardDistance={50}
                verticalDistance={60}
                delay={5500}
                pauseOnHover={true}
              >
                {purposes.map((item, index) => (
                  <Card 
                    key={item.id} 
                    className={styles.cardBase}
                    style={{ '--accent-color': item.color } as any}
                  >
                    <div className={styles.cardGlow} />
                    <div className={styles.cardHeader}>
                      <div className={styles.numberBadge}>
                        <span className={styles.indexNum}>{item.number}</span>
                      </div>
                      <h3 className={styles.cardTitle}>
                        {item.title[language as 'en' | 'ar']}
                      </h3>
                    </div>
                    
                    <div className={styles.contentWrapper}>
                      <p className={styles.cardContent}>
                        {item.content[language as 'en' | 'ar']}
                      </p>
                      
                      <div className={styles.cardFooter}>
                        <div 
                          className={styles.underline} 
                          style={{ backgroundColor: item.color }} 
                        />
                        <div className={styles.footerBranding}>
                          <LogoBeam height="2px" width="80px" color={item.color} delay={1} />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
