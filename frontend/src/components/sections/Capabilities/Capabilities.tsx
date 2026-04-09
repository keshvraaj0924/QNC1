'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './Capabilities.module.css';
import { useLanguage } from '@/context/LanguageContext';
import SpotlightCard from '@/components/modern/SpotlightCard';
import LogoBeam from '@/components/modern/LogoBeam';
import MotionCurve from '@/components/modern/MotionCurve';
import BlurText from '@/components/modern/BlurText';

/**
 * Subcomponent for 3D Tilt Logic
 */
function BentoCard({ service, idx }: { service: any, idx: number }) {
  const { language, t } = useLanguage();
  
  const imageUrl = service.image?.startsWith('http') 
    ? service.image 
    : `http://localhost:4000${service.image}`;

  const sizeClass = idx === 0 ? styles.tall : (idx === 3 ? styles.wide : '');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: idx * 0.1 }}
      className={`${styles.gridItem} ${sizeClass}`}
    >
      <SpotlightCard className={styles.bentoCardWrapper} glowColor="rgba(203, 161, 82, 0.1)">
        <Link 
          href={`/services/${service.id}`} 
          className={styles.bentoCard}
          data-cursor="hover"
        >
          <div className={styles.cardOverlay} />
          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <span className={styles.id}>0{idx + 1}</span>
              <span className={styles.category}>{t('cap_label')}</span>
            </div>
            <h3 className={styles.capTitle}>
              {language === 'en' ? (service.title?.en || service.id.replace(/-/g, ' ')) : (service.title?.ar || service.id.replace(/-/g, ' '))}
            </h3>
            <div className={styles.cardFooter}>
               <span className={styles.exploreText}>{t('cap_expertise')}</span>
               <div className={styles.icon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div 
            className={styles.cardBg} 
            style={{ 
              backgroundImage: service.image ? `url(${imageUrl})` : 'none' 
            }}
          />
        </Link>
      </SpotlightCard>
    </motion.div>
  );
}

const DEFAULT_SERVICES = [
  {
    id: 'facility-management',
    title: { en: 'Total Facility Management', ar: 'إدارة المرافق المتكاملة' },
    image: '/assets/images/services/fm.jpg'
  },
  {
    id: 'operations-maintenance',
    title: { en: 'Operations & Maintenance', ar: 'التشغيل والصيانة' },
    image: '/assets/images/services/om.jpg'
  },
  {
    id: 'security-services',
    title: { en: 'Security Solutions', ar: 'الحلول الأمنية' },
    image: '/assets/images/services/security.jpg'
  },
  {
    id: 'janitorial-services',
    title: { en: 'Janitorial & Sanitation', ar: 'النظافة والتعقيم' },
    image: '/assets/images/services/cleaning.jpg'
  },
  {
    id: 'landscaping',
    title: { en: 'Landscaping & Irrigation', ar: 'تنسيق الحدائق والري' },
    image: '/assets/images/services/landscape.jpg'
  }
];

/**
 * Premium Capabilities Section
 * Dynamic: Fetches all pillars directly from the CMS services collection.
 */
export default function Capabilities({ content }: { content?: any }) {
  const { language, t } = useLanguage();

  const services = content && Object.keys(content).length > 0
    ? Object.entries(content).map(([id, data]: [string, any]) => ({
        id,
        title: { en: data.title_en, ar: data.title_ar },
        image: data.image
      }))
    : DEFAULT_SERVICES;

  const titleText = t('cap_title');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          className="preHeader"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <LogoBeam width="80px" delay={0.2} />
          <span>{t('cap_preheader')}</span>
        </motion.div>

        <div className={styles.title}>
          <BlurText 
            text={titleText}
            delay={50}
            animateBy="words"
            direction="top"
          />
        </div>

        <MotionCurve 
          d="M0 100 C 150 0, 250 200, 400 100" 
          width="100%" 
          height="120px" 
          viewBox="0 0 400 200"
          opacity={0.15} 
          delay={0.4}
        />

        <div style={{ marginBottom: '2rem' }}>
          <LogoBeam width="100%" height="1px" delay={0.6} />
        </div>

        <motion.div 
          className={styles.bentoGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service: any, idx: number) => (
            <BentoCard key={service.id} service={service} idx={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
