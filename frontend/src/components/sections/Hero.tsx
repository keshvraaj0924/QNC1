"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  bgImageUrl: string;
  lang: 'en' | 'ar';
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaText, bgImageUrl, lang }) => {
  const isRtl = lang === 'ar';
  
  return (
    <section 
      className={styles.hero} 
      style={{ backgroundImage: `url(${bgImageUrl})` }} 
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className={styles.overlay}></div>
      
      <motion.div 
        className={styles.contentContainer}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
      >
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {title}
        </motion.h1>
        
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          {subtitle}
        </motion.p>
        
        <motion.button 
          className={styles.primaryButton}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <span className={styles.btnText}>{ctaText}</span>
          <span className={styles.arrowIcon}>
            {isRtl ? '←' : '→'}
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
