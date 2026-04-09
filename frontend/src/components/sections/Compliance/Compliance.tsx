'use client';

import { motion } from 'framer-motion';
import styles from './Compliance.module.css';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '@/components/modern/ScrollReveal';

const CERTIFICATIONS = [
  { id: 'iso-14001', name: 'cert_iso_14001', icon: '🌱' },
  { id: 'iso-9001', name: 'cert_iso_9001', icon: '🏆' },
  { id: 'iso-45001-hs', name: 'cert_iso_45001_hs', icon: '🛡️' },
  { id: 'iso-45001-fm', name: 'cert_iso_45001_fm', icon: '🏢' },
  { id: 'iso-22000', name: 'cert_iso_22000', icon: '🍎' },
  { id: 'bicsc', name: 'cert_bicsc', icon: '🧼' },
  { id: 'sfma', name: 'cert_sfma', icon: '🤝' },
  { id: 'aramco', name: 'cert_aramco', icon: '🛢️' },
  { id: 'achilles', name: 'cert_achilles', icon: '🏹' },
  { id: 'haccp', name: 'cert_haccp', icon: '✅' },
];

export default function Compliance() {
  const { t, isRTL } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: 'spring' as const,
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isRTL ? styles.rtl : ''}`}>
          <div className="preHeader">
            <div className="preHeaderLine" />
            <span>{t('compliance_label')}</span>
          </div>
          <h2 className={styles.title}>{t('compliance_title')}</h2>
        </div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {CERTIFICATIONS.map((cert) => (
            <motion.div 
              key={cert.id} 
              className={styles.card}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                backgroundColor: 'rgba(203, 161, 82, 0.05)',
                borderColor: 'var(--gold)'
              }}
            >
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{cert.icon}</span>
              </div>
              <p className={styles.name}>{t(cert.name)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
