'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import styles from './About.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { useRef } from 'react';
import LogoBeam from '@/components/modern/LogoBeam';
import MotionCurve from '@/components/modern/MotionCurve';

export default function About({ content }: { content?: any }) {
  const { language, t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const DEFAULT_CERTIFICATES = [
    { title: { en: 'ISO 9001:2015', ar: 'آيزو 9001:2015' }, img: '/assets/images/certs/iso_9001.png' },
    { title: { en: 'ISO 14001:2015', ar: 'آيزو 14001:2015' }, img: '/assets/images/certs/iso_14001.png' },
    { title: { en: 'OHSAS 18001:2007', ar: 'أوشاس 18001:2007' }, img: '/assets/images/certs/iso_45001.png' },
  ];

  const certificates = content?.certificates && content.certificates.length > 0 
    ? content.certificates 
    : DEFAULT_CERTIFICATES;
  
  const headline = language === 'en' 
    ? (content?.headline_en || t('about_headline')) 
    : (content?.headline_ar || t('about_headline'));
    
  const description = language === 'en'
    ? (content?.description_en || t('about_description'))
    : (content?.description_ar || t('about_description'));

  const words = headline.split(' ');

  const titleContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants: any = {
    hidden: { y: '100%', opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={containerRef} className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <motion.div 
              className={styles.labelWrapper}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <LogoBeam width="60px" delay={0.2} />
              <span className={styles.label}>{t('about_label')}</span>
            </motion.div>

            <MotionCurve 
              d="M0 50 Q 100 0, 200 50 T 400 50" 
              width="100%" 
              height="80px" 
              opacity={0.15} 
              delay={0.8}
              className={styles.aboutCurve}
            />

            <motion.h2 
              className={styles.headline}
              variants={titleContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
            >
              {words.map((word: string, i: number) => (
                <span key={i + language} className={styles.wordWrapper}>
                  <motion.span variants={wordVariants} className={styles.word}>
                    {word}&nbsp;
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            <motion.p 
              className={styles.description}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {description}
            </motion.p>
          </div>

          <motion.div 
            className={styles.imageContainer}
            style={{ y: imgY }}
          >
            <div className={styles.imageOverlay} />
            <Image
              src="/assets/images/QNC_About.jpg"
              alt="QNC Legacy"
              width={800}
              height={1000}
              className={styles.legacyImage}
              priority
            />
          </motion.div>
        </div>

        <div className={styles.certificatesWrapper}>
          {certificates.map((cert: any, i: number) => (
            <motion.div 
              key={i} 
              className={styles.certCard}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
            >
              <div className={styles.certImgBox}>
                <Image
                  src={cert.img || '/assets/images/certs/placeholder.png'}
                  alt={cert.title?.en || 'Certificate'}
                  width={80}
                  height={80}
                  className={styles.certImg}
                />
              </div>
              <span className={styles.certTitle}>
                {language === 'en' ? (cert.title?.en || cert.name) : (cert.title?.ar || cert.name_ar || cert.name)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
