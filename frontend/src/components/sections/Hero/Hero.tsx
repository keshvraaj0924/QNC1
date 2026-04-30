'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useCallback, useEffect } from 'react';
import styles from './Hero.module.css';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import BlurText from '@/components/modern/BlurText';
import MagnetButton from '@/components/modern/MagnetButton';

/**
 * Enhanced Modern Hero Component
 * Featuring parallax effects, cinematic transitions, and responsive design.
 * Performance-optimized: no dynamic blur, throttled mouse, GPU-composited layers.
 */
export default function Hero({ content }: { content?: any }) {
  const { language, isRTL, t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Content mapping from CMS props
  const videoUrl = content?.video_url || '/assets/videos/qnc-hero-montage.mp4';
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

  // GPU-friendly transforms (translate + opacity only, no blur/filter)
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  // Spring physics for mouse interaction — throttled via RAF
  const springConfig = { damping: 30, stiffness: 120 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const rafId = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafId.current) return; // Skip if RAF pending
    rafId.current = requestAnimationFrame(() => {
      const moveX = (e.clientX - window.innerWidth / 2) / 30;
      const moveY = (e.clientY - window.innerHeight / 2) / 30;
      mouseX.set(moveX);
      mouseY.set(moveY);
      rafId.current = 0;
    });
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove]);

  return (
    <section ref={containerRef} className={`${styles.heroSection} ${isRTL ? styles.rtl : ''}`}>
      {/* Cinematic Background Layer — GPU composited, no dynamic filters */}
      <motion.div
        className={styles.bgContainer}
        style={{ opacity: videoOpacity }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={styles.bgVideo}
          src={videoUrl}
        />
        <div className={styles.overlay} />
      </motion.div>

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
            <Link href="/about-us">
              <MagnetButton>
                <button className={styles.exploreBtn}>
                  <span>{t('hero_explore')}</span>
                  <div className={styles.btnLine} />
                </button>
              </MagnetButton>
            </Link>
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
