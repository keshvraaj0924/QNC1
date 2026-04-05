'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
import styles from './ServicesGrid.module.css';

const services = [
  {
    id: 'catering',
    title: 'Industrial Catering',
    desc: 'High-volume culinary operations maintaining spotless hygiene and premium nutrition for remote workforces.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'logistics',
    title: 'Manpower & Logistics',
    desc: 'Precision deployment of highly trained personnel and robust supply chain infrastructure across the Kingdom.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'facilities',
    title: 'Total Facility Management',
    desc: 'Comprehensive lifecycle management ensuring 24/7 operational continuity and asset preservation.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1600'
  }
];

export default function ServicesGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section className={styles.servicesSection}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Core Services
        </motion.h2>

        <div className={styles.grid}>
          {services.map(i => (
            <motion.div 
              layoutId={`card-${i.id}`}
              onClick={() => setSelectedId(i.id)} 
              key={i.id}
              className={styles.card}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-cursor="hover"
              data-cursor-text="View"
            >
              <div className={styles.imageWrapper}>
                <Image src={i.image} alt={i.title} fill className={styles.cardImage} />
                <div className={styles.cardOverlay} />
              </div>
              <motion.h3 layoutId={`title-${i.id}`} className={styles.cardTitle}>
                {i.title}
              </motion.h3>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedId && (
            <>
              <motion.div 
                className={styles.backdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
              />
              
              <div className={styles.modalViewport}>
                {services.filter(s => s.id === selectedId).map(s => (
                  <motion.div 
                    layoutId={`card-${s.id}`} 
                    key={s.id}
                    className={styles.modal}
                  >
                    <div className={styles.modalImageWrapper}>
                      <Image src={s.image} alt={s.title} fill className={styles.modalImage} />
                    </div>
                    
                    <button 
                      className={styles.closeBtn} 
                      onClick={() => setSelectedId(null)}
                      data-cursor="hover"
                    >
                      <X size={24} color="#0A192F" strokeWidth={2} />
                    </button>

                    <div className={styles.modalContent}>
                      <motion.h3 layoutId={`title-${s.id}`} className={styles.modalTitle}>
                        {s.title}
                      </motion.h3>
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={styles.modalDesc}
                      >
                        {s.desc}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
