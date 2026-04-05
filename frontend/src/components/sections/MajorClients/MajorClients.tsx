'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './MajorClients.module.css';
import { useLanguage } from '@/context/LanguageContext';
import LogoLoop from '@/components/shared/LogoLoop/LogoLoop';

const DEFAULT_CLIENTS = [
  { id: 1, name: 'Aramco', logo: '/assets/images/clients/aramco.png' },
  { id: 2, name: 'SABIC', logo: '/assets/images/clients/sabic.png' },
  { id: 3, name: 'NEOM', logo: '/assets/images/clients/neom.png' },
  { id: 4, name: 'RCJY', logo: '/assets/images/clients/rcjy.png' },
  { id: 5, name: 'Maaden', logo: '/assets/images/clients/maaden.png' },
  { id: 6, name: 'SEC', logo: '/assets/images/clients/sec.png' },
];

export default function MajorClients({ content }: { content?: any[] }) {
  const { t, language } = useLanguage();
  const rawClients = content && content.length > 0 ? content : DEFAULT_CLIENTS;

  const [logoHeight, setLogoHeight] = useState(85);
  const [gap, setGap] = useState(150);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 2000) {
        setLogoHeight(120);
        setGap(200);
      } else if (width > 1400) {
        setLogoHeight(100);
        setGap(180);
      } else if (width < 768) {
        setLogoHeight(65);
        setGap(100);
      } else {
        setLogoHeight(85);
        setGap(150);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const processedClients = rawClients
    .filter((c: any) => c && (c.logo || c.image || c.src))
    .map((c: any, index: number) => ({
      id: c.id || `partner-${index}`,
      src: c.logo || c.image || c.src,
      name: c.name || c.alt || 'Partner'
    }));

  const label = t('section_partners_label');
  const title = t('section_clients_subtitle');

  const words = title.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants: any = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
        >
          <motion.span variants={wordVariants} className={styles.label}>{label}</motion.span>
          <h2 className={styles.title}>
            {t('section_clients_title').split(' ').map((word: string, i: number) => (
              <span key={i + language} className={styles.wordWrapper}>
                <motion.span
                  className={styles.word}
                  variants={{
                    hidden: { y: '100%', opacity: 0 },
                    show: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                  }}
                >
                  {word}&nbsp;
                </motion.span>
              </span>
            ))}
          </h2>
        </motion.div>

        <motion.div 
          className={styles.loopWrapper}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div dir="ltr" className={styles.ltrWrapper}>
            <LogoLoop 
              logos={processedClients}
              speed={80}
              gap={gap}
              logoHeight={logoHeight}
              direction="left"
              fadeOut
              fadeOutColor="var(--background)"
              scaleOnHover
              ariaLabel="Major Clients of Qudrat National"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
