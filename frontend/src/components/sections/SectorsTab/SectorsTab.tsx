'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './SectorsTab.module.css';

const sectorsData = [
  {
    id: 'oil-gas',
    label: 'Oil & Gas',
    headline: 'Powering the Core of the Kingdom',
    desc: 'Uncompromising logistics and facility management in remote and highly secure environments.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'defense',
    label: 'Defense & Military',
    headline: 'Mission-Critical Reliability',
    desc: 'Strict protocol adherence and flawless execution for high-security defense sector projects.',
    image: 'https://images.unsplash.com/photo-1544474323-288d6bfecadd?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    headline: 'Clinical Precision',
    desc: 'Spotless environmental services engineered specifically to meet stringent healthcare standards.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1600'
  }
];

export default function SectorsTab() {
  const [activeTab, setActiveTab] = useState(sectorsData[0]);

  return (
    <section className={styles.sectorsWrapper}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <h2 className={styles.sectionTitle}>Sectors We Serve</h2>
          
          <div className={styles.tabList}>
            {sectorsData.map((sector) => (
              <button 
                key={sector.id}
                onClick={() => setActiveTab(sector)}
                className={`${styles.tabBtn} ${activeTab.id === sector.id ? styles.active : ''}`}
                data-cursor="hover"
              >
                {sector.label}
                {activeTab.id === sector.id && (
                  <motion.div layoutId="activeTabIndicator" className={styles.activeIndicator} />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.contentArea}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={styles.tabContent}
            >
              <div className={styles.textContent}>
                <h3 className={styles.tabHeadline}>{activeTab.headline}</h3>
                <p className={styles.tabDesc}>{activeTab.desc}</p>
                <button className={styles.exploreBtn} data-cursor="hover">
                  Explore Capabilities →
                </button>
              </div>
              <div className={styles.imageContainer}>
                <Image 
                  src={activeTab.image} 
                  alt={activeTab.label} 
                  fill 
                  className={styles.tabImage} 
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
