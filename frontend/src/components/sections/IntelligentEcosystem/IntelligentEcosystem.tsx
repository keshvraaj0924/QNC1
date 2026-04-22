'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import styles from './IntelligentEcosystem.module.css';

export default function IntelligentEcosystem() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={containerRef} className={styles.ecosystemSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
              <div className={styles.header}>
                <h2 className={styles.title}>{t('section_ecosystem_title')}</h2>
                <h3 className={styles.subtitle}>{t('section_ecosystem_subtitle')}</h3>
              </div>
              
              <p className={styles.description}>
                {t('ecosystem_desc')}
              </p>
          </div>
          
          <div className={styles.imageContainer}>
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <Image 
                src="/assets/NewsEvents/NewsInformationPhotosForWebsite/News information & Photos for Website/DisruptXStrategicAgreement/QNC-DisruptXStrategicAgreement.jpg"
                alt="Intelligent Ecosystem CAFM"
                fill
                className={styles.image}
              />
              <div className={styles.imageOverlay} />
            </div>
            <div className={styles.disruptxLogo}>
              {t('partner_disruptx')} CAFM
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
