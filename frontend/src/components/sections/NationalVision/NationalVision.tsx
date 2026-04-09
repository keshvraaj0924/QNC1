'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView, useMotionValue, animate } from 'framer-motion';
import styles from './NationalVision.module.css';
import { useLanguage } from '@/context/LanguageContext';
import LogoBeam from '@/components/modern/LogoBeam';
import MotionCurve from '@/components/modern/MotionCurve';
import BlurText from '@/components/modern/BlurText';

export default function NationalVision({ content }: { content?: any }) {
  const { language, t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  // Count up logic for 2030
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, 2030, { duration: 2.5, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, count]);
  
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
              <motion.div 
                className={styles.vision2030Branding}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Saudi_Vision_2030_logo.svg/2560px-Saudi_Vision_2030_logo.svg.png" 
                  alt="Saudi Vision 2030" 
                  className={styles.vision2030Logo}
                />
              </motion.div>
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

            <motion.div 
              className={styles.talentExcellence}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              <div className={styles.talentVisual}>
                <Image 
                  src={imageLeadership} 
                  alt="Saudi Business Leadership" 
                  fill 
                  className={styles.talentImg}
                />
                <div className={styles.talentGlow} />
              </div>
              <div className={styles.talentInfo}>
                <div className={styles.talentTag}>
                  <LogoBeam width="40px" delay={0.3} />
                  <span>{t('about_label')}</span>
                </div>
                <h3 className={styles.talentTitle}>{t('vision_talent_title')}</h3>
                <p className={styles.talentText}>
                  {t('vision_talent_text')}
                </p>
              </div>
              <div className={styles.talentGlow} />
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
              <motion.span className={styles.statNum}>{rounded}</motion.span>
              <span className={styles.statLabel}>{t('vision_shared')}</span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
