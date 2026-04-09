'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProjectLocations.module.css';
import { useLanguage } from '@/context/LanguageContext';
import SpotlightCard from '@/components/modern/SpotlightCard';
import MagnetButton from '@/components/modern/MagnetButton';
import LogoBeam from '@/components/modern/LogoBeam';
import MotionCurve from '@/components/modern/MotionCurve';
import BlurText from '@/components/modern/BlurText';
import { Building2, Shield, Fuel, HeartPulse, Activity } from 'lucide-react';

const ICON_MAP: any = {
  Building2,
  Shield,
  Fuel,
  HeartPulse,
  Activity
};

export default function ProjectLocations({ content }: { content?: any }) {
  const { language, t } = useLanguage();
  const [activeLocation, setActiveLocation] = useState<any>(null);

  const locations = content?.locations || [
    { "id": "riyadh", "name": "Riyadh", "nameAr": "الرياض", "x": 57.2, "y": 47.1, "projects": ["Corporate Hub", "Government Infrastructure"] },
    { "id": "jeddah", "name": "Jeddah", "nameAr": "جدة", "x": 21.6, "y": 67.1, "projects": ["Port Logistics", "Aviation Services"] },
    { "id": "dammam", "name": "Dammam", "nameAr": "الدمام", "x": 73.5, "y": 36.3, "projects": ["Eastern Industrial Support", "Oil & Gas Services"] },
  ];

  const defaultSectors = [
    { 
      "id": "gov", "title_en": "Government", "title_ar": "القطاع الحكومي", "icon": "Building2",
      "desc_en": "Trusted operations partner for national logistics and facility maintenance for government departments.",
      "desc_ar": "شريك عمليات موثوق للخدمات اللوجستية الوطنية وصيانة المرافق للإدارات الحكومية."
    },
    { 
      "id": "mil", "title_en": "Military Installations", "title_ar": "المنشآت العسكرية", "icon": "Shield",
      "desc_en": "Specialized field support and infrastructure services for strategic defense and military facilities.",
      "desc_ar": "دعم ميداني متخصص وخدمات بنية تحتية للمنشآت الدفاعية والعسكرية الاستراتيجية."
    },
    { 
      "id": "oil", "title_en": "Oil & Gas", "title_ar": "النفط والغاز", "icon": "Fuel",
      "desc_en": "Precision industrial support and facility management for the upstream and downstream energy sector.",
      "desc_ar": "دعم صناعي دقيق وإدارة مرافق لقطاع الطاقة في مراحل الاستخراج والتكرير."
    },
    { 
      "id": "health", "title_en": "Healthcare Sector", "title_ar": "قطاع الرعاية الصحية", "icon": "HeartPulse",
      "desc_en": "Total facility maintenance and specialized sanitation solutions for modern medical institutions.",
      "desc_ar": "صيانة كاملة للمرافق وحلول تعقيم متخصصة للمؤسسات الطبية الحديثة."
    }
  ];

  const sectors = (content?.sectors && content.sectors.length > 0) ? content.sectors : defaultSectors;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.div 
            className="preHeader"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <LogoBeam width="60px" delay={0.2} />
            <span>{t('footprint_label')}</span>
          </motion.div>
          <div className={styles.title}>
            <BlurText 
              text={t('footprint_title')}
              delay={50}
              animateBy="words"
              direction="top"
            />
          </div>
        </div>

        <div className={styles.mapWrapper}>
          <svg 
            viewBox="0 0 100 100" 
            className={styles.mapSvg}
            preserveAspectRatio="xMidYMid meet"
          >
            <motion.path 
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.15 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: "circOut" }}
              d="M38.7 100.0 L38.1 97.3 L36.7 95.4 L36.3 92.9 L33.9 90.6 L31.3 85.3 L30.0 80.2 L26.7 75.8 L24.6 74.8 L21.4 68.7 L20.9 64.3 L21.1 60.6 L18.4 53.6 L16.1 51.1 L13.6 49.8 L12.0 46.2 L12.2 44.7 L10.9 41.5 L9.5 40.1 L7.7 35.4 L4.8 30.3 L2.4 25.9 L0.0 25.9 L0.7 22.5 L0.9 20.3 L1.5 17.7 L6.8 18.7 L8.9 16.8 L10.0 14.5 L13.7 13.6 L14.4 11.5 L16.0 10.5 L11.3 4.1 L20.8 1.0 L21.7 0.0 L27.4 1.7 L34.5 6.1 L47.9 18.9 L56.7 19.4 L61.0 20.0 L62.2 23.0 L65.5 22.8 L67.4 28.3 L69.7 29.7 L70.5 32.0 L73.8 34.6 L74.1 37.2 L73.6 39.3 L74.2 41.4 L75.6 43.2 L76.2 45.3 L76.9 46.9 L78.3 48.1 L79.7 47.6 L80.6 50.1 L80.8 51.5 L82.6 57.9 L96.9 61.1 L97.8 59.8 L100.0 64.3 L96.8 77.0 L82.6 83.3 L68.8 85.7 L64.4 88.5 L61.0 95.1 L58.8 96.2 L57.6 94.1 L55.8 94.4 L51.2 93.8 L50.3 93.1 L44.8 93.3 L43.5 93.9 L41.6 92.2 L40.3 95.3 L40.8 98.0 L38.7 100.0 Z"
              className={styles.mapPath}
            />
            
            <path 
               d="M38.7 100.0 L38.1 97.3 L36.7 95.4 L36.3 92.9 L33.9 90.6 L31.3 85.3 L30.0 80.2 L26.7 75.8 L24.6 74.8 L21.4 68.7 L20.9 64.3 L21.1 60.6 L18.4 53.6 L16.1 51.1 L13.6 49.8 L12.0 46.2 L12.2 44.7 L10.9 41.5 L9.5 40.1 L7.7 35.4 L4.8 30.3 L2.4 25.9 L0.0 25.9 L0.7 22.5 L0.9 20.3 L1.5 17.7 L6.8 18.7 L8.9 16.8 L10.0 14.5 L13.7 13.6 L14.4 11.5 L16.0 10.5 L11.3 4.1 L20.8 1.0 L21.7 0.0 L27.4 1.7 L34.5 6.1 L47.9 18.9 L56.7 19.4 L61.0 20.0 L62.2 23.0 L65.5 22.8 L67.4 28.3 L69.7 29.7 L70.5 32.0 L73.8 34.6 L74.1 37.2 L73.6 39.3 L74.2 41.4 L75.6 43.2 L76.2 45.3 L76.9 46.9 L78.3 48.1 L79.7 47.6 L80.6 50.1 L80.8 51.5 L82.6 57.9 L96.9 61.1 L97.8 59.8 L100.0 64.3 L96.8 77.0 L82.6 83.3 L68.8 85.7 L64.4 88.5 L61.0 95.1 L58.8 96.2 L57.6 94.1 L55.8 94.4 L51.2 93.8 L50.3 93.1 L44.8 93.3 L43.5 93.9 L41.6 92.2 L40.3 95.3 L40.8 98.0 L38.7 100.0 Z"
               className={styles.mainMapPath}
            />

            {locations.map((loc: any, i: number) => (
              <g 
                key={loc.id} 
                className={styles.locationGroup}
                onMouseEnter={() => setActiveLocation(loc)}
                onMouseLeave={() => setActiveLocation(null)}
              >
                <motion.circle
                  cx={loc.x}
                  cy={loc.y}
                  r="1.5"
                  initial={{ r: 0, opacity: 0.8 }}
                  animate={{ 
                    r: [0, 4.5], 
                    opacity: [0.8, 0] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: i * 0.3 
                  }}
                  className={styles.pulseRing}
                />
                <motion.circle
                  cx={loc.x}
                  cy={loc.y}
                  r="0.8"
                  className={styles.locationPoint}
                  whileHover={{ scale: 1.5 }}
                />
              </g>
            ))}
          </svg>

          <AnimatePresence>
            {activeLocation && (
              <motion.div 
                className={styles.infoCard}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                style={{ 
                  left: `${activeLocation.x}%`, 
                  top: `${activeLocation.y}%`,
                  transform: 'translate(-50%, -120%)'
                }}
              >
                <div className={styles.cardGlow} />
                <h3 className={styles.cardTitle}>
                  {language === 'en' ? activeLocation.name : activeLocation.nameAr}
                </h3>
                {activeLocation.projects && activeLocation.projects.length > 0 && (
                  <ul className={styles.projectList}>
                    {activeLocation.projects.map((p: string, idx: number) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <MotionCurve 
          d="M0 50 C 100 0, 300 100, 400 50" 
          width="100%" 
          height="100px" 
          viewBox="0 0 400 100"
          opacity={0.2} 
          delay={0.6}
          className={styles.mapConnector}
        />

        <div className={styles.mapDivider}>
          <div className={styles.dividerLine} />
          <span className={styles.dividerText}>
            {t('footprint_industries')}
          </span>
          <div className={styles.dividerLine} />
        </div>

        <motion.div 
          className={styles.sectorsGrid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.4
              }
            }
          }}
        >
          {sectors.map((sector: any, idx: number) => {
            const Icon = ICON_MAP[sector.icon] || ICON_MAP.Activity;
            return (
              <motion.div 
                key={sector.id} 
                className={styles.sectorCardWrapper}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                <SpotlightCard className={styles.sectorCard} glowColor="rgba(203, 161, 82, 0.1)">
                  <div className={styles.sectorIconWrapper}>
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <div className={styles.sectorContent}>
                    <h4 className={styles.sectorTitle}>
                      {language === 'en' ? sector.title_en : sector.title_ar}
                    </h4>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
