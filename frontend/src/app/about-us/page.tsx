'use client';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PageWrapper from '@/components/layout/PageWrapper/PageWrapper';
import Image from 'next/image';
import styles from './AboutUs.module.css'; 
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  Zap, 
  Heart, 
  Users, 
  Star,
  HeartPulse,
  Factory,
  Hotel,
  Building2,
  GraduationCap,
  ShoppingCart,
  Home
} from 'lucide-react';
import ScrollReveal from '@/components/modern/ScrollReveal';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function AboutUs() {
  const { language, t, isRTL } = useLanguage();

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const coreValues = [
    { name: t('value_integrity'), icon: ShieldCheck },
    { name: t('value_excellence'), icon: Star },
    { name: t('value_safety'), icon: Heart },
    { name: t('value_innovation'), icon: Zap },
    { name: t('value_people'), icon: Users },
  ];

  const industries = [
    { name: t('industry_healthcare'), icon: HeartPulse },
    { name: t('industry_industrial'), icon: Factory },
    { name: t('industry_hospitality'), icon: Hotel },
    { name: t('industry_financial'), icon: Building2 },
    { name: t('industry_education'), icon: GraduationCap },
    { name: t('industry_retail'), icon: ShoppingCart },
    { name: t('industry_residential'), icon: Home },
    { name: t('industry_mixed'), icon: Zap },
  ];

  return (
    <main className={`${styles.main} ${isRTL ? styles.rtl : ''}`} ref={containerRef}>
      <Header />
      <PageWrapper noPadding={true}>
        {/* Hero Section */}
        <section className={styles.heroBlock}>
          <div className={styles.imageOverlay}></div>
          <motion.div style={{ y, scale }} className={styles.heroImageContainer}>
            <Image 
              src="/assets/images/qnc_corporate_hero.png" 
              alt={t('nav_about')} 
              fill 
              className={styles.heroImage}
              priority
            />
          </motion.div>
          <motion.div 
            className={styles.heroContent}
            style={{ opacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className={styles.heroTitle}>{t('nav_about')}</h1>
          </motion.div>
        </section>

        {/* Legacy Section */}
        <section className={styles.contentBlock}>
          <div className={styles.container}>
            <ScrollReveal direction="up" duration={0.8}>
              <span className={styles.label}>{t('about_label')}</span >
              <h2 className={styles.subtitle}>{t('about_headline')}</h2>
              <p className={styles.description}>
                {t('about_description')}
              </p>

              {/* Mission, Vision & Values Grid */}
              <div className={styles.missionVisionGrid}>
                <ScrollReveal direction="up" delay={0.2} className={styles.mvCard}>
                  <Target className={styles.mvIcon} size={48} />
                  <h3 className={styles.mvTitle}>{t('about_mission_title')}</h3>
                  <p className={styles.mvText}>{t('about_mission_desc')}</p>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.4} className={styles.mvCard}>
                  <Eye className={styles.mvIcon} size={48} />
                  <h3 className={styles.mvTitle}>{t('about_vision_title')}</h3>
                  <p className={styles.mvText}>{t('about_vision_desc')}</p>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.6} className={styles.mvCard}>
                  <ShieldCheck className={styles.mvIcon} size={48} />
                  <h3 className={styles.mvTitle}>{t('about_values_title')}</h3>
                  <p className={styles.mvText}>{t('about_values_desc')}</p>
                </ScrollReveal>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Industries We Serve */}
        <section className={styles.industriesSection}>
          <div className={styles.container}>
            <ScrollReveal direction="up">
              <span className={styles.label}>{t('industries_label')}</span>
              <h2 className={styles.subtitle}>{t('industries_label')}</h2>
              <p className={styles.description} style={{ margin: '0 auto' }}>
                {t('industries_subtitle')}
              </p>
            </ScrollReveal>

            <div className={styles.industriesGrid}>
              {industries.map((item, idx) => (
                <ScrollReveal key={idx} direction="up" delay={idx * 0.05} className={styles.industryItem}>
                  <div className={styles.industryIconWrapper}>
                    <item.icon size={48} strokeWidth={1.5} />
                  </div>
                  <span className={styles.industryName}>{item.name}</span>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="up" className={styles.industriesFooter}>
              <Star className={styles.footerStar} size={20} fill="currentColor" />
              <span>{t('industries_footer')}</span>
              <Star className={styles.footerStar} size={20} fill="currentColor" />
            </ScrollReveal>
          </div>
        </section>

        {/* Values Section */}
        <section className={styles.valuesSection}>
          <div className={styles.container}>
            <ScrollReveal direction="up" style={{ textAlign: 'center' }}>
              <span className={styles.label}>{t('about_values_title')}</span>
              <h2 className={styles.subtitle} style={{ fontSize: '3rem' }}>
                {language === 'en' ? 'What Drives Us' : 'ما يدفعنا للتميز'}
              </h2>
              <p className={styles.description} style={{ margin: '0 auto', opacity: 0.7 }}>
                {t('about_values_desc')}
              </p>
            </ScrollReveal>

            <div className={styles.valuesGrid}>
              {coreValues.map((value, idx) => (
                <ScrollReveal key={idx} direction="up" delay={idx * 0.1} className={styles.valueItem}>
                  <value.icon className={styles.valueIcon} size={40} />
                  <h4 className={styles.valueName}>{value.name}</h4>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Synergy Section */}
        <section className={styles.contentBlock}>
          <div className={styles.container} style={{ textAlign: 'center' }}>
            <ScrollReveal direction="up">
              <span className={styles.label}>{t('section_group_label')}</span>
              <h2 className={styles.subtitle}>{t('group_title')}</h2>
              <p className={styles.description} style={{ margin: '0 auto' }}>
                {t('group_desc')}
              </p>
            </ScrollReveal>
          </div>
        </section>
      </PageWrapper>

      <Footer />
    </main>
  );
}
