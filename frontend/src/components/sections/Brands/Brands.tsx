'use client';

import { motion, Variants } from 'framer-motion';
import styles from './Brands.module.css';

const brands = [
  "Finance News", "Asharq News", "Sayidaty", 
  "Arab News", "The Independent Middle East", "Hia"
];

export default function Brands() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section className={styles.brandsSection}>
      <div className={styles.container}>
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className={styles.grid}
        >
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              className={styles.brandCard}
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            >
              <div style={{ overflow: 'hidden', width: '100%', height: '100%' }}>
                <motion.div
                  initial={{ scale: 1.25 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
                  style={{ width: '100%', height: '100%' }}
                >
                  {/* Dummy text for logos until assets arrive */}
                  <span className={styles.brandName}>{brand}</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
