'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import styles from './NationalVision.module.css';
import { useLanguage } from '@/context/LanguageContext';
import LogoBeam from '@/components/modern/LogoBeam';
import MotionCurve from '@/components/modern/MotionCurve';
import BlurText from '@/components/modern/BlurText';

export default function NationalVision({ content }: { content?: any }) {
  const { language, t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);
  
  /* Removed count-up logic for 2030 as it is replaced by logo image */
  
  const title = language === 'en' ? (content?.title_en || t('vision_title')) : (content?.title_ar || t('vision_title'));
  const description = language === 'en' ? (content?.description_en || t('vision_description')) : (content?.description_ar || t('vision_description'));
  const imageArch = content?.image_arch || '/images/vision/architecture.png';
  const imageLeadership = content?.image_leadership || '/images/vision/leadership.png';

  const words = title.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants: any = {
    hidden: { y: '100%', opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const statsY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          <div className={styles.contentCol}>
            <motion.div 
              className="preHeader"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <LogoBeam width="80px" delay={0.2} />
              <span>{t('vision_label')}</span>
            </motion.div>

            <div className={styles.titleWrapper}>
              <div className={styles.title}>
                <BlurText 
                  text={title}
                  delay={50}
                  animateBy="words"
                  direction="top"
                />
              </div>
            </div>

            <motion.p 
              className={styles.description}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {description}
            </motion.p>
            {/* CEO Message Box */}
            <motion.div 
              className={styles.ceoMessage}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              <div className={styles.talentVisual}>
                <Image 
                  src="https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&q=80&w=400" 
                  alt="CEO Qudrat National" 
                  fill 
                  className={styles.talentImg}
                />
                <div className={styles.talentGlow} />
              </div>
              <div className={styles.talentInfo}>
                <div className={styles.talentTag}>
                  <div className={styles.multiLabels}>
                    <span className={styles.leadershipLabel}>{t('vision_leadership_label')}</span>
                    <span className={styles.legacyLabel}>{t('about_label')}</span>
                  </div>
                </div>
                <h3 className={styles.talentTitle}>{t('vision_ceo_label')}</h3>
                <div className={styles.quoteWrapper}>
                  <span className={styles.quoteMark}>"</span>
                  <p className={styles.talentText}>
                    {t('vision_ceo_tagline_main')}
                    <span 
                      className={styles.ceoReadMore} 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsModalOpen(true);
                      }}
                    >
                      {t('vision_ceo_tagline_link')}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Animated Brand Curved Thread */}
            <div className={styles.svgContainer}>
              <MotionCurve 
                d="M10 190 Q 100 10, 200 100 T 390 10" 
                width="100%" 
                height="100%" 
                viewBox="0 0 400 200"
                opacity={0.4}
                delay={0.5}
                duration={2.5}
              />
            </div>
          </div>

          <div className={styles.imageCol}>
            <motion.div 
              className={styles.parallaxContainer}
              style={{ y }}
            >
              <Image 
                src={imageArch} 
                alt="Modern Saudi Architecture" 
                fill 
                className={styles.architectureImg}
              />
              <div className={styles.imageOverlay} />
            </motion.div>
            
            <motion.div 
              className={styles.statsBox}
              style={{ y: statsY }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              <Image 
                src="/images/vision/Vision2030Logo.jpg" 
                alt="Saudi Vision 2030" 
                fill
                className={styles.visionLogoEmbedded}
              />
            </motion.div>
          </div>

        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.closeBtn}
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                ×
              </button>

              <div className={styles.modalWatermark}>
                <Image 
                  src="/assets/images/FinalQNCLogo.svg" 
                  alt="" 
                  width={600} 
                  height={600}
                />
              </div>

              <div className={styles.modalScrollArea}>
                <div className={styles.modalBody}>
                  {t('vision_ceo_full').split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className={styles.modalParagraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className={styles.modalSignature}>
                  <h4 className={styles.sigName}>{t('vision_ceo_name')}</h4>
                  <p className={styles.sigTitle}>{t('vision_ceo_title')}</p>
                  <p className={styles.sigCompany}>{t('vision_ceo_company')}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
