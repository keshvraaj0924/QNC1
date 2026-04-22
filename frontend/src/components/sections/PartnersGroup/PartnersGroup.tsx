'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import styles from './PartnersGroup.module.css';

export default function PartnersGroup() {
  const { t, language } = useLanguage();

  const partners = [
    {
      id: 'lamar',
      name: t('partner_lamar'),
      role: language === 'en' ? 'Group Parent Company' : 'الشركة الأم للمجموعة',
      image: '/assets/images/QNC_About.jpg', // Professional placeholder for Lamar bg
      logo: '/assets/images/ClienstSVG/LAMAR.svg'
    },
    {
      id: 'audio-tech',
      name: t('partner_audio_tech'),
      role: language === 'en' ? 'Strategic Partner' : 'شريك استراتيجي',
      image: '/assets/NewsEvents/NewsInformationPhotosForWebsite/News information & Photos for Website/AudioTechnologyPartenership/QNC-AudioTechnologyParteneship.jpg',
      logo: null // No standalone logo available
    },
    {
      id: 'gardenia',
      name: t('partner_gardenia'),
      role: language === 'en' ? 'Strategic Partner' : 'شريك استراتيجي',
      image: '/assets/NewsEvents/NewsInformationPhotosForWebsite/News information & Photos for Website/GardeniaPartenership/QNC-GardeniaParteneship.jpg',
      logo: null
    }
  ];

  return (
    <section className={styles.groupSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>
            {t('section_group_label')}
          </span>
          <h2 className={styles.title}>
            {t('group_title')}
          </h2>
          <p className={styles.description}>
            {t('group_desc')}
          </p>
        </div>

        <div className={styles.grid}>
          {partners.map((partner, index) => (
            <div 
              key={partner.id}
              className={styles.partnerCard}
            >
              <div className={styles.imageWrapper}>
                <Image 
                  src={partner.image}
                  alt={partner.name}
                  fill
                  className={styles.partnerImage}
                />
                {partner.logo && (
                  <div className={styles.logoWrapper}>
                    <Image 
                      src={partner.logo}
                      alt={`${partner.name} Logo`}
                      fill
                      className={styles.lamarLogo}
                    />
                  </div>
                )}
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{partner.name}</h3>
                <span className={styles.roleText}>{partner.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
