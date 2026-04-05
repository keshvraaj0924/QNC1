'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import styles from './StatCounters.module.css';

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const springValue = useSpring(0, {
    mass: 1,
    stiffness: 50,
    damping: 15,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  // Round output to nearest whole number so it displays cleanly during animation
  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function StatCounters() {
  const stats = [
    { label: 'Projects Completed', value: 350, suffix: '+' },
    { label: 'Meals Served Annually', value: 12, suffix: 'M+' },
    { label: 'Professionals Deployed', value: 8500, suffix: '+' },
    { label: 'Years of Excellence', value: 25, suffix: '' },
  ];

  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx} 
            className={styles.statCard}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
          >
            <h3 className={styles.statNumber}>
              <AnimatedNumber value={stat.value} />
              <span className={styles.statSuffix}>{stat.suffix}</span>
            </h3>
            <p className={styles.statLabel}>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
