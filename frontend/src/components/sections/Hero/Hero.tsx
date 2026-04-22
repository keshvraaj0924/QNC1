'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import styles from './Hero.module.css';
import { useLanguage } from '@/context/LanguageContext';
import BlurText from '@/components/modern/BlurText';
import MagnetButton from '@/components/modern/MagnetButton';

/**
 * Enhanced Modern Hero Component
 * Featuring parallax effects, cinematic transitions, and responsive design
 */
export default function Hero({ content }: { content?: any }) {
  const { language, isRTL, t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Content mapping from CMS props
  const videoUrl = content?.video_url || '/assets/videos/Industrial_Documentary_Video_Prompt_Generation.mp4';
  const title = language === 'en' 
    ? (content?.title_en || t('hero_title')) 
    : (content?.title_ar || t('hero_title'));
    
  const label = language === 'en' 
    ? (content?.label_en || t('hero_label')) 
    : (content?.label_ar || t('hero_label'));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax and Scroll Effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  // Spring physics for mouse interaction
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) / 25;
      const moveY = (clientY - window.innerHeight / 2) / 25;
      mouseX.set(moveX);
      mouseY.set(moveY);
      setMousePos({ x: clientX, y: clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={containerRef} className={`${styles.heroSection} ${isRTL ? styles.rtl : ''}`}>
      {/* Cinematic Background Layer */}
      <motion.div 
        className={styles.bgContainer}
        style={{ scale, filter: useTransform(blur, (b) => `blur(${b}px)`) }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.bgVideo}
          src={videoUrl}
        />
        <div className={styles.overlay} />
      </motion.div>

      {/* Interactive Light Layer */}
      <motion.div 
        className={styles.mouseGlow}
        style={{ 
          x: mousePos.x - 400, 
          y: mousePos.y - 400 
        }}
      />

      {/* Content Layer */}
      <motion.div 
        className={styles.contentWrapper}
        style={{ y, opacity }}
      >
        <div className={styles.content}>
          <motion.div 
            className={styles.labelWrapper}
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className={styles.labelLine} />
            <span className={styles.label}>{label}</span>
          </motion.div>

          <motion.div
            style={{ x: mouseX, y: mouseY }}
            className={styles.titleContainer}
          >
            <h1 className={styles.title}>
              <BlurText 
                text={title}
                delay={50}
                animateBy="words"
                direction="top"
              />
            </h1>
          </motion.div>

          <motion.div 
            className={styles.ctaWrapper}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <MagnetButton>
              <button className={styles.exploreBtn}>
                <span>{t('hero_explore')}</span>
                <div className={styles.btnLine} />
              </button>
            </MagnetButton>
          </motion.div>
        </div>

        {/* Floating Side Info */}
        <motion.div 
          className={styles.sideInfo}
          initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className={styles.sideItem}>
            <span className={styles.sideLabel}>01</span>
            <span className={styles.sideText}>{t('hero_innovation')}</span>
          </div>
          <div className={styles.sideItem}>
            <span className={styles.sideLabel}>02</span>
            <span className={styles.sideText}>{t('hero_quality')}</span>
          </div>
          <div className={styles.sideItem}>
            <span className={styles.sideLabel}>03</span>
            <span className={styles.sideText}>{t('hero_sustainability')}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className={styles.scrollText}>{t('hero_scroll')}</span>
        <div className={styles.scrollLine}>
          <motion.div 
            className={styles.scrollProgress}
            animate={{ y: [0, 50, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
