'use client';

import { motion } from 'framer-motion';
import styles from './InfiniteTicker.module.css';

const textItems = [
  "Reach 172 Million+ people",
  "Operating in 7 languages",
  "30+ Unique Brands",
  "Global Media Group",
];

export default function InfiniteTicker() {
  return (
    <section className={styles.tickerSection}>
      <div className={styles.tickerContainer}>
        <motion.div 
          className={styles.tickerContent}
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {/* Double array to create seamless loop */}
          {[...textItems, ...textItems, ...textItems, ...textItems].map((item, index) => (
            <span key={index} className={styles.tickerItem}>
              {item} 
              <span className={styles.separator}>•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
