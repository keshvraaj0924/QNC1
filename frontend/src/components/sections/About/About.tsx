'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import styles from './About.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { useRef } from 'react';
import LogoBeam from '@/components/modern/LogoBeam';
import MotionCurve from '@/components/modern/MotionCurve';
import BlurText from '@/components/modern/BlurText';

export default function About({ content }: { content?: any }) {
  const { language, t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const headline = language === 'en' 
    ? (content?.headline_en || t('about_headline')) 
    : (content?.headline_ar || t('about_headline'));
    
  const description = language === 'en'
    ? (content?.description_en || t('about_description'))
    : (content?.description_ar || t('about_description'));

  const words = headline.split(' ');

  const titleContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants: any = {
    hidden: { y: '100%', opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={containerRef} className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <motion.div 
              className={styles.labelWrapper}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <LogoBeam width="60px" delay={0.2} />
              <span className={styles.label}>{t('about_label')}</span>
            </motion.div>

            <MotionCurve 
              d="M0 50 Q 100 0, 200 50 T 400 50" 
              width="100%" 
              height="80px" 
              opacity={0.15} 
              delay={0.8}
              className={styles.aboutCurve}
            />

            <div className={styles.headline}>
              <BlurText 
                text={headline}
                delay={50}
                animateBy="words"
                direction="top"
              />
            </div>

            <motion.p 
              className={styles.description}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {description}
            </motion.p>
          </div>

          <motion.div 
            className={styles.imageContainer}
            style={{ y: imgY }}
          >
            <div className={styles.imageOverlay} />
            <Image
              src="/assets/images/qnc_legacy_branding.png"
              alt="QNC Human Values Power Operational Excellence"
              width={800}
              height={1000}
              className={styles.legacyImage}
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
