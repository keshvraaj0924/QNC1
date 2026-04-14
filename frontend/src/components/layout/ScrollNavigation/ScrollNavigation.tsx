'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import styles from './ScrollNavigation.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function ScrollNavigation() {
  const { isRTL } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToHero = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToFooter = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className={`${styles.container} ${isRTL ? styles.rtl : styles.ltr}`}
          initial={{ opacity: 0, x: isRTL ? -100 : 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isRTL ? -100 : 100 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.button
            onClick={scrollToHero}
            className={styles.navBtn}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            data-cursor="hover"
            title="Scroll to Top"
          >
            <ArrowUp size={20} />
          </motion.button>

          <div className={styles.divider} />

          <motion.button
            onClick={scrollToFooter}
            className={styles.navBtn}
            whileHover={{ scale: 1.1, y: 5 }}
            whileTap={{ scale: 0.9 }}
            data-cursor="hover"
            title="Scroll to Bottom"
          >
            <ArrowDown size={20} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
