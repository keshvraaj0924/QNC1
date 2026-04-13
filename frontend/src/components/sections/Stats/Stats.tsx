'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Stats.module.css';

interface StatItemProps {
  target: number;
  suffix?: string;
  label: string;
  delay?: number;
}

const AnimatedNumber = ({ target, suffix = '', label, delay = 0 }: StatItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 40,
    damping: 30,
  });

  const displayValue = useTransform(spring, (current) => 
    Math.floor(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        spring.set(target);
      }, delay * 1000);
    }
  }, [isInView, target, spring, delay]);

  return (
    <motion.div 
      ref={ref} 
      className={styles.statBox}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: delay }}
    >
      <div className={styles.numberRow}>
        <motion.span className={styles.number}>{displayValue}</motion.span>
        <span className={styles.suffix}>{suffix}</span>
      </div>
      <span className={styles.label}>{label.toUpperCase()}</span>
      <div className={styles.glow} />
    </motion.div>
  );
};

const Stats = () => {
  const { t } = useLanguage();

  const statsData = [
    { target: 6800, suffix: '+', label: t('stats_workforce'), delay: 0.1 },
    { target: 450, suffix: '+', label: t('stats_projects'), delay: 0.2 },
    { target: 12, suffix: 'M+', label: t('stats_sqm'), delay: 0.3 },
    { target: 25, suffix: '+', label: t('stats_years'), delay: 0.4 },
  ];

  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {statsData.map((stat, index) => (
            <AnimatedNumber key={index} {...stat} />
          ))}
        </div>
      </div>
      
      {/* Dynamic Background Elements */}
      <div className={styles.bgLine} />
    </section>
  );
};

export default Stats;
