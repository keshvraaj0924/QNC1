'use client';

import { use, useState, useEffect } from 'react';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PageWrapper from '@/components/layout/PageWrapper/PageWrapper';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from './ServicePage.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { useSettings } from '@/context/SettingsContext';
import { adminApi } from '@/services/adminApi';
import { servicesData } from '@/data/content';

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { language, t } = useLanguage();
  const { cmsMode } = useSettings();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const lang = language as 'en' | 'ar';

  useEffect(() => {
    const loadService = async () => {
      setLoading(true);
      
      // 1. Try Local Content first if CMS Mode is off
      if (!cmsMode) {
        const local = servicesData.find(s => s.slug === resolvedParams.slug);
        if (local) {
          // Map local ServiceDetails to the structure expected by the page
          setService({
            title_en: local.title.en,
            title_ar: local.title.ar,
            description_en: local.description.en,
            description_ar: local.description.ar,
            features: local.features,
            image: local.image
          });
          setLoading(false);
          return;
        }
      }

      // 2. Try CMS if Mode is on OR local not found
      try {
        const data = await adminApi.getPublicService(resolvedParams.slug);
        if (data) {
          setService(data);
        } else {
          // Fallback to local if CMS returned null
          const localFallback = servicesData.find(s => s.slug === resolvedParams.slug);
          if (localFallback) {
             setService({
               title_en: localFallback.title.en,
               title_ar: localFallback.title.ar,
               description_en: localFallback.description.en,
               description_ar: localFallback.description.ar,
               features: localFallback.features,
               image: localFallback.image
             });
          }
        }
      } catch (err) {
        console.error('Service load error, checking local fallback:', err);
        const localFallback = servicesData.find(s => s.slug === resolvedParams.slug);
        if (localFallback) {
           setService({
             title_en: localFallback.title.en,
             title_ar: localFallback.title.ar,
             description_en: localFallback.description.en,
             description_ar: localFallback.description.ar,
             features: localFallback.features,
             image: localFallback.image
           });
        }
      } finally {
        setLoading(false);
      }
    };
    loadService();
  }, [resolvedParams.slug, cmsMode]);

  if (loading) return <div style={{height: '100vh', background: 'black'}} />;
  if (!service) notFound();

  // Unified physics variables
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } }
  };

  const title = lang === 'en' ? service.title_en : service.title_ar;
  const description = lang === 'en' ? service.description_en : service.description_ar;

  // Defensive Image Logic
  const placeholderImage = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80';
  const isValidImage = service.image && typeof service.image === 'string' && !service.image.includes('undefined');
  const imageSrc = isValidImage ? service.image : placeholderImage;

  return (
    <main className={styles.main}>
      <Header />
      <PageWrapper>
      
      <section className={styles.heroBlock}>
        <div className={styles.imageOverlay}></div>
        <Image 
          src={imageSrc} 
          alt={title} 
          fill 
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroContent}>
          <motion.h1 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] as const }}
             className={styles.heroTitle} 
             data-cursor="hover"
          >
             {title}
          </motion.h1>
        </div>
      </section>

      <section className={styles.contentBlock}>
        <div className={styles.container}>
          <motion.div 
            className={styles.textColumn}
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={fadeInUp} className={styles.label}>
              {lang === 'en' ? 'Group Expertise' : 'خبرة المجموعة'}
            </motion.span>
            <motion.h2 variants={fadeInUp} className={styles.subtitle}>{title}</motion.h2>
            <motion.p variants={fadeInUp} className={styles.description}>{description}</motion.p>
            
            <motion.ul className={styles.featureList} variants={staggerContainer as any}>
              {service.features && service.features.map((feature: any, idx: number) => (
                <motion.li key={idx} variants={fadeInUp} className={styles.featureItem}>
                  <div className={styles.checkIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--qnc-blue)" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <span>{lang === 'en' ? feature.en : feature.ar}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
          <motion.div 
            className={styles.metaColumn}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
          >
            <div className={styles.featureBox}>
              <h4>{t('section_vision_title')}</h4>
              <p>
                {lang === 'en' 
                  ? 'Fully compliant with Saudi Aramco matrix parameters and international safety benchmarks required by the Kingdom of Saudi Arabia.'
                  : 'متوافق تماماً مع معايير أرامكو السعودية ومقاييس السلامة الدولية المطلوبة في المملكة العربية السعودية.'}
              </p>
            </div>
            <button className={styles.ctaBtn} data-cursor="hover">
              {t('btn_request_proposal')} {lang === 'en' ? '→' : '←'}
            </button>
          </motion.div>
        </div>
      </section>

      </PageWrapper>
      <Footer />
    </main>
  );
}
