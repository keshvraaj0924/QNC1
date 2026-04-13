'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import styles from './PageTransition.module.css';

const curtainVariants = {
  initial: {
    // Start covering the whole screen
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  },
  animate: {
    // Reveal by sliding top
    clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
    transition: {
      duration: 1.0,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    // Cover screen from bottom for outgoing page
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const contentVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.5, ease: 'easeInOut' } }
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className={styles.transitionWrapper}>
        {/* The Curtain Overlay Effect */}
        <motion.div 
          className={styles.curtain}
          variants={curtainVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        />

        {/* The Actual Page Content */}
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
