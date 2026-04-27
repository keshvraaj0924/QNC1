'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import styles from './MissionVision.module.css';
import { useLanguage } from '@/context/LanguageContext';
import LogoBeam from '@/components/modern/LogoBeam';
import MotionCurve from '@/components/modern/MotionCurve';
import BlurText from '@/components/modern/BlurText';
import { useTheme } from '@/context/ThemeContext';
import CardSwap, { Card } from './CardSwap';
import OrbitImages from '@/components/modern/OrbitImages';
import ScrollReveal from '@/components/modern/ScrollReveal';

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
    color: '#3F8E43' // Success Green
  },
  {
    id: 'values',
    number: '03',
    title: { en: 'Values', ar: 'قيمنا' },
    content: { 
      en: 'Delivering safe, high-quality, and innovative FM solutions that consistently exceed client expectations.',
      ar: 'تقديم حلول إدارة مرافق آمنة وعالية الجودة ومبتكرة تفوق توقعات العملاء باستمرار.'
    },
    color: '#6658A6' // Purple Accent
  }
];

export default function MissionVision({ content }: { content?: any }) {
  const { language, isRTL, t } = useLanguage();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        color: item.color || (index === 0 ? '#1A75BB' : index === 1 ? '#3F8E43' : '#6658A6')
      }))
    : DEFAULT_PURPOSES;

  return (
    <section ref={sectionRef} className={`${styles.section} ${isRTL ? styles.rtl : ''}`} data-theme={theme}>
      {/* Background Animated Vision 2030 Lines */}
      <motion.div className={styles.backgroundCurves} style={{ opacity }}>
        <motion.div style={{ y: y1 }} className={styles.curveWrapper}>
          <MotionCurve 
            d={isRTL ? "M1400 300 Q 1050 500, 700 300 T 0 300" : "M0 300 Q 350 100, 700 300 T 1400 300"} 
            viewBox="0 0 1400 600"
            duration={5}
            opacity={0.08}
            strokeWidth={1.5}
          />
        </motion.div>
        <motion.div style={{ y: y2 }} className={styles.curveWrapperOffset}>
          <MotionCurve 
            d={isRTL ? "M1400 100 C 1200 400, 900 0, 700 200 C 500 400, 200 0, 0 100" : "M0 100 C 200 -100, 500 300, 700 100 C 900 -100, 1200 300, 1400 100"} 
            viewBox="0 0 1400 400"
            duration={8}
            delay={1}
            opacity={0.05}
            strokeWidth={1}
          />
        </motion.div>
        <motion.div style={{ y: y3 }} className={styles.curveWrapperFloating}>
          <MotionCurve 
            d="M0 400 C 350 450, 700 350, 1050 450 C 1400 350, 1400 400, 1400 400" 
            viewBox="0 0 1400 600"
            duration={10}
            opacity={0.03}
            strokeWidth={0.8}
          />
        </motion.div>
      </motion.div>

      <div className={styles.container}>
        <div className={styles.headerRow}>
          <ScrollReveal direction="up" duration={0.8}>
            <div className={styles.sectionHeader}>
              <div className={styles.preHeader}>
                <LogoBeam width="80px" />
                <span className={styles.labelSpan}>{language === 'ar' ? 'رسالتنا وقيمنا' : 'OUR PURPOSE'}</span>
              </div>
              <h2 className={styles.mainTitle}>
                {language === 'ar' ? 'القيم التي تقودنا' : 'VALUES THAT DRIVE US'}
              </h2>
            </div>
          </ScrollReveal>
        </div>

        <div className={styles.contentLayout}>
          {/* Left Column: About Us Interlink */}
          <ScrollReveal direction="left" delay={0.2} className={styles.aboutBoxColumn}>
            <Link href="/about-us" className={styles.aboutLinkWrapper}>
              <div className={`${styles.talentExcellence}`}>
                <div className={styles.talentVisual}>
                  <img 
                    src="/images/vision/leadership.png" 
                    alt="About Qudrat National" 
                    className={styles.talentImg}
                  />
                  <div className={styles.talentGlow} />
                </div>
                <div className={styles.talentInfo}>
                  <div className={styles.talentTag}>
                    <span className={styles.leadershipLabel}>
                      {language === 'ar' ? 'اكتشف إرثنا' : 'DISCOVER OUR LEGACY'}
                    </span>
                  </div>
                  <h3 className={styles.talentTitle}>
                    {language === 'ar' ? 'عن قدرات الوطنية' : 'About QNC'}
                  </h3>
                  <p className={styles.talentText}>
                    {language === 'ar' 
                      ? 'اكتشف إرثنا والتزامنا بالتميز في إدارة المرافق.'
                      : 'Discover our legacy and commitment to facility management excellence.'}
                  </p>
                  <div className={styles.learnMoreLink}>
                    <span>{language === 'ar' ? 'تعرف على المزيد' : 'Learn More'}</span>
                    <span className={styles.arrow}>→</span>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Right Column: Moving Swap Cards */}
          <ScrollReveal direction="right" delay={0.4} className={styles.cardsColumn}>
            <div className={styles.swapContainer}>
              <CardSwap
                width={isMobile ? "90%" : 480}
                height={isMobile ? 380 : 400}
                cardDistance={isMobile ? 12 : 50}
                verticalDistance={isMobile ? 15 : 60}
                delay={6000}
                pauseOnHover={true}
                skewAmount={isMobile ? 0 : 1}
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
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
