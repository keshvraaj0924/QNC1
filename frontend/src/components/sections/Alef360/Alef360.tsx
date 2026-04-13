import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import ScrollReveal from '@/components/modern/ScrollReveal';
import styles from './Alef360.module.css';

const UI_CARDS = [
  { id: 'energy', labelEn: 'Energy Usage', labelAr: 'استهلاك الطاقة', value: '84%', trend: 'down', color: '#CBA152' },
  { id: 'health', labelEn: 'System Health', labelAr: 'سلامة النظام', value: '98', trend: 'up', color: '#1A75BB' },
  { id: 'alerts', labelEn: 'Maintenance Alerts', labelAr: 'تنبيهات الصيانة', value: '0', trend: 'neutral', color: '#3F8E43' },
  { id: 'sensors', labelEn: 'IoT Assets', labelAr: 'أصول إنترنت الأشياء', value: '1,240', trend: 'up', color: '#6658A6' }
];

const Alef360 = () => {
  const { language, isRTL } = useLanguage();
  const { theme } = useTheme();
  const sectionRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Dynamic Parallax for modern open look
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const panelY1 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const panelY2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const [mounted, setMounted] = React.useState(false);
  const [sparkHeights, setSparkHeights] = React.useState<number[]>([]);

  React.useEffect(() => {
    setMounted(true);
    setSparkHeights([...Array(5)].map(() => 20 + Math.random() * 80));
  }, []);

  return (
    <section ref={sectionRef} className={styles.modernSection} id="alef360" data-theme={theme}>
      <div className={styles.mainGrid}>
        
        {/* Visual Layer - Immersive Background */}
        <div className={styles.visualColumn}>
          <motion.div style={{ y: visualY }} className={styles.imageRevealContainer}>
            <div className={styles.imageAtmosphere} />
            <Image 
              src="/assets/images/alef360_final.png"
              alt="ALEF 360 Ecosystem"
              width={1400}
              height={1000}
              className={styles.immersiveImage}
              priority
            />
            
            {/* Floating Data Overlays (Integrated into image space) */}
            <motion.div 
              className={styles.integratedPanel}
              style={{ y: panelY1, top: '20%', right: isRTL ? 'auto' : '10%', left: isRTL ? '10%' : 'auto' }}
            >
              <div className={styles.modernGlass}>
                <div className={styles.glassLabel}>{UI_CARDS[0].labelEn.toUpperCase()}</div>
                <div className={styles.glassValue}>{UI_CARDS[0].value}</div>
                <div className={styles.glassMarker} style={{ background: UI_CARDS[0].color }} />
              </div>
            </motion.div>

            <motion.div 
              className={styles.integratedPanel}
              style={{ y: panelY2, bottom: '25%', left: isRTL ? 'auto' : '5%', right: isRTL ? '5%' : 'auto' }}
            >
              <div className={styles.modernGlass}>
                <div className={styles.glassLabel}>{UI_CARDS[1].labelEn.toUpperCase()}</div>
                <div className={styles.glassValue}>{UI_CARDS[1].value}</div>
                <div className={styles.miniSpark}>
                  {mounted && sparkHeights.map((h, i) => (
                    <div key={i} className={styles.sparkCol} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Content Layer - Elegant Overlap */}
        <div className={styles.contentColumn}>
          <motion.div style={{ y: textY }} className={styles.textStack}>
            <ScrollReveal direction={isRTL ? 'right' : 'left'}>
              <div className="preHeader">
                <div className="preHeaderLine" />
                <span>INTELLIGENT ECOSYSTEM</span>
              </div>
              <h2 className={styles.sectionTitle}>
                {language === 'en' ? 'CAFM | CMMS-Enabled Service Delivery' : 'إدارة الخدمات المدعومة بنظام CAFM | CMMS'}
              </h2>
              <p className={styles.mainDescription}>
                {language === 'en' 
                  ? 'Through the Disrupt-X ALEF 360 digital ecosystem and its Integrated CAFM | CMMS platform, QNC enhances operational visibility, streamlines service delivery, and enables smarter, data-driven outcomes across every environment.'
                  : 'من خلال منظومة ALEF 360 الرقمية من Disrupt-X ومنصة CAFM | CMMS المتكاملة، تعزز QNC الرؤية التشغيلية وتسهم في تبسيط تقديم الخدمات وتمكين النتائج الذكية القائمة على البيانات عبر جميع البيئات.'}
              </p>

              <div className={styles.capabilityGrid}>
                {[
                  { en: 'Real-time Monitoring', ar: 'مراقبة فورية' },
                  { en: 'AI Fault Detection', ar: 'كشف الأعطال بالذكاء' },
                  { en: 'Asset Lifecycle', ar: 'دورة حياة الأصول' },
                  { en: 'Central Control', ar: 'التحكم المركزي' }
                ].map((item, idx) => (
                  <div key={idx} className={styles.capabilityItem}>
                    <span className={styles.capabilityDot} />
                    <span>{language === 'en' ? item.en : item.ar}</span>
                  </div>
                ))}
              </div>

              <motion.button 
                className={styles.modernCta}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'en' ? 'Learn More About ALEF 360' : 'تعرف على المزيد حول ALEF 360'}
                <span className={styles.ctaArrow}>→</span>
              </motion.button>
            </ScrollReveal>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Alef360;
