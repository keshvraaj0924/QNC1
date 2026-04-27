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
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { language, t } = useLanguage();
  const { cmsMode } = useSettings();
  const lang = language as 'en' | 'ar';

  // Find local data to get category synchronously
  const localData = servicesData.find(s => s.slug === resolvedParams.slug);
  const category = localData?.category || 'hard';
  const accentColor = category === 'soft' ? 'var(--qnc-green)' : 'var(--qnc-purple)';

  // Initialize synchronously if not in CMS mode
  const [service, setService] = useState<any>(!cmsMode && localData ? {
    title_en: localData.title.en,
    title_ar: localData.title.ar,
    description_en: localData.description.en,
    description_ar: localData.description.ar,
    longDescription_en: localData.longDescription?.en,
    longDescription_ar: localData.longDescription?.ar,
    industryFocus_en: localData.industryFocus?.en,
    industryFocus_ar: localData.industryFocus?.ar,
    features: localData.features,
    technicalScope: localData.technicalScope,
    benefits: localData.benefits,
    image: localData.image,
    secondaryImage: localData.secondaryImage
  } : null);

  const [loading, setLoading] = useState(cmsMode);
  


  useEffect(() => {
    // If cmsMode is off, just use localData and disable loading immediately
    if (!cmsMode) {
      if (localData) {
        setService({
          title_en: localData.title.en,
          title_ar: localData.title.ar,
          description_en: localData.description.en,
          description_ar: localData.description.ar,
          longDescription_en: localData.longDescription?.en,
          longDescription_ar: localData.longDescription?.ar,
          industryFocus_en: localData.industryFocus?.en,
          industryFocus_ar: localData.industryFocus?.ar,
          features: localData.features,
          technicalScope: localData.technicalScope,
          benefits: localData.benefits,
          image: localData.image,
          secondaryImage: localData.secondaryImage
        });
      }
      setLoading(false);
      return;
    }

    // CMS Mode is ON: Try fetching from CMS
    let isMounted = true;
    const fetchCMS = async () => {
      try {
        const data = await adminApi.getPublicService(resolvedParams.slug);
        if (isMounted && data) {
          setService(data);
        } else if (isMounted && localData) {
           // Fallback to local
           setService({
             title_en: localData.title.en,
             title_ar: localData.title.ar,
             description_en: localData.description.en,
             description_ar: localData.description.ar,
             longDescription_en: localData.longDescription?.en,
             longDescription_ar: localData.longDescription?.ar,
             industryFocus_en: localData.industryFocus?.en,
             industryFocus_ar: localData.industryFocus?.ar,
             features: localData.features,
             technicalScope: localData.technicalScope,
             benefits: localData.benefits,
             image: localData.image,
             secondaryImage: localData.secondaryImage
           });
        }
      } catch (err) {
        if (isMounted && localData) {
           setService({
             title_en: localData.title.en,
             title_ar: localData.title.ar,
             description_en: localData.description.en,
             description_ar: localData.description.ar,
             longDescription_en: localData.longDescription?.en,
             longDescription_ar: localData.longDescription?.ar,
             industryFocus_en: localData.industryFocus?.en,
             industryFocus_ar: localData.industryFocus?.ar,
             features: localData.features,
             technicalScope: localData.technicalScope,
             benefits: localData.benefits,
             image: localData.image,
             secondaryImage: localData.secondaryImage
           });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchCMS();
    return () => { isMounted = false; };
  }, [resolvedParams.slug, cmsMode, localData]);

  if (loading) return <div style={{height: '100vh', background: 'var(--background)'}} />;
  if (!service) notFound();

  const title = lang === 'en' ? service.title_en : service.title_ar;
  const description = lang === 'en' ? service.description_en : service.description_ar;
  const longDescription = lang === 'en' ? service.longDescription_en : service.longDescription_ar;
  const technicalScope = service.technicalScope || [];
  const benefits = service.benefits || [];
  const placeholderImage = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80';
  const isValidImage = service.image && typeof service.image === 'string' && !service.image.includes('undefined');
  const imageSrc = isValidImage ? service.image : placeholderImage;

  // Define global scroll reveal animation
  const scrollReveal: any = {
    hidden: { opacity: 0, y: 80, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const staggerScroll: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <main className={styles.main} ref={containerRef}>
      <Header />
      <PageWrapper noPadding={true}>
      
      {/* 1. HERO SECTION */}
      <section className={styles.heroBlock}>
        <div className={styles.imageOverlay}></div>
        <motion.div style={{ y, scale }} className={styles.heroImageContainer}>
          <Image 
            src={imageSrc} 
            alt={title} 
            fill 
            priority
            className={styles.heroImage}
          />
        </motion.div>
        <motion.div style={{ opacity }} className={styles.heroContent}>
          <div className={styles.heroContainer}>
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1 }}
               className={styles.heroCategoryBadge}
               style={{ background: accentColor, boxShadow: `0 0 20px ${accentColor}80` }}
            >
               {category === 'soft' ? (lang === 'en' ? 'Soft Services' : 'الخدمات اللينة') : (lang === 'en' ? 'Hard Services' : 'الخدمات الصلبة')}
            </motion.div>
            <motion.h1 
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
               className={styles.heroTitle} 
               data-cursor="hover"
            >
               {title}
            </motion.h1>
            <motion.p
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.3 }}
               className={styles.heroDescription}
            >
               {description}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* MULTI-COLOR LINE ANIMATION DIVIDER */}
      <motion.div 
         initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={scrollReveal}
         className={styles.qncLineDivider}
      >
         <div className={styles.qncLineAnimated}></div>
      </motion.div>

      {/* 2. THE NARRATIVE */}
      <section className={styles.narrativeSection}>
         <div className={styles.narrativeWatermark}>{lang === 'en' ? 'PHILOSOPHY' : 'الفلسفة'}</div>
         <div className={styles.container}>
            <div className={styles.narrativeGrid} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
               <motion.div 
                  className={styles.narrativeBox}
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, margin: "-100px" }} 
                  variants={scrollReveal}
               >
                  <h2 className={styles.narrativeLabel} style={{ color: accentColor }}>
                     {lang === 'en' ? 'Operational Philosophy' : 'الفلسفة التشغيلية'}
                  </h2>
                  <p className={styles.longDescriptionText}>
                     {longDescription || description}
                  </p>
               </motion.div>

               {/* New Industry Focus Image Block */}
               {service.secondaryImage && (
                  <motion.div 
                     className={styles.industryExcellenceBox}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, margin: "-100px" }}
                     variants={scrollReveal}
                  >
                     <div className={styles.secondaryImageWrapper}>
                        <Image 
                           src={service.secondaryImage} 
                           alt={`${title} Excellence`} 
                           fill 
                           className={styles.secondaryImage}
                        />
                        <div className={styles.imageOverlayGradient}></div>
                        <div className={styles.qncWatermark}>
                           <Image 
                              src="/assets/images/QLogoSymbol/TransaparentQ.png" 
                              alt="QNC Logo" 
                              width={80} 
                              height={80} 
                              className={styles.watermarkLogo}
                           />
                        </div>
                     </div>
                     <div className={styles.industryContent}>
                        <h3 style={{ color: accentColor }}>
                           {lang === 'en' ? 'Industry Excellence' : 'التميز الصناعي'}
                        </h3>
                        <p>{lang === 'en' ? service.industryFocus_en : service.industryFocus_ar}</p>
                     </div>
                  </motion.div>
               )}
            </div>
         </div>
      </section>

      {/* 3. THE PREMIUM MATRIX */}
      <section className={styles.matrixSection}>
         <div className={styles.container}>
            <motion.div 
               className={styles.bentoGrid}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-100px" }}
               variants={staggerScroll}
            >
               
               {/* Pillar Box */}
               <motion.div 
                  className={`${styles.bentoCard} ${styles.bentoPillars}`} 
                  variants={scrollReveal}
                  style={{ '--accent': accentColor, '--accent-rgb': category === 'soft' ? 'var(--qnc-green-rgb)' : 'var(--qnc-purple-rgb)' } as any}
               >
                  <div className={styles.bentoWatermark}>01</div>
                  <div className={styles.bentoHeader}>
                     <div className={styles.headerGlow} style={{ background: accentColor }}></div>
                     <h3>{lang === 'en' ? 'Core Pillars' : 'الأركان الأساسية'}</h3>
                  </div>
                  <ul className={styles.featureList}>
                    {service.features?.map((f: any, i: number) => (
                       <li key={i} className={styles.premiumListItem}>
                          <div className={styles.bulletBox} style={{ borderColor: accentColor }}>
                             <div className={styles.bulletInner} style={{ background: accentColor }}></div>
                          </div>
                          <span>{lang === 'en' ? f.en : f.ar}</span>
                       </li>
                    ))}
                  </ul>
               </motion.div>

               {/* Tech Scope Box */}
               {technicalScope?.length > 0 && (
               <motion.div 
                  className={`${styles.bentoCard} ${styles.bentoTech}`} 
                  variants={scrollReveal}
                  style={{ '--accent': 'var(--qnc-blue)', '--accent-rgb': 'var(--qnc-blue-rgb)' } as any}
               >
                  <div className={styles.bentoWatermark}>02</div>
                  <div className={styles.bentoHeader}>
                     <div className={styles.headerGlow} style={{ background: 'var(--qnc-blue)' }}></div>
                     <h3>{lang === 'en' ? 'Technical Specifications' : 'المواصفات الفنية'}</h3>
                  </div>
                  <div className={styles.techPillContainer}>
                    {technicalScope.map((t: any, i: number) => (
                       <div key={i} className={styles.techPill}>
                          <span className={styles.techDot}></span>
                          {lang === 'en' ? t.en : t.ar}
                       </div>
                    ))}
                  </div>
               </motion.div>
               )}

               {/* Benefits Box */}
               {benefits?.length > 0 && (
               <motion.div 
                  className={`${styles.bentoCard} ${styles.bentoBenefits}`} 
                  variants={scrollReveal}
                  style={{ '--accent': 'var(--qnc-green)', '--accent-rgb': 'var(--qnc-green-rgb)' } as any}
               >
                  <div className={styles.bentoWatermark}>03</div>
                  <div className={styles.bentoHeader}>
                     <div className={styles.headerGlow} style={{ background: 'var(--qnc-green)' }}></div>
                     <h3>{lang === 'en' ? 'Strategic Value' : 'القيمة الاستراتيجية'}</h3>
                  </div>
                  <div className={styles.benefitCardsContainer}>
                    {benefits.map((b: any, i: number) => (
                       <div key={i} className={styles.premiumBenefitItem}>
                          <div className={styles.benefitIconBox}>✦</div>
                          <span className={styles.benefitText}>{lang === 'en' ? b.en : b.ar}</span>
                       </div>
                    ))}
                  </div>
               </motion.div>
               )}
               
               {/* Vision Box */}
               <motion.div 
                  className={`${styles.bentoCard} ${styles.bentoVision}`} 
                  variants={scrollReveal}
                  style={{ '--accent': accentColor, '--accent-rgb': category === 'soft' ? 'var(--qnc-green-rgb)' : 'var(--qnc-purple-rgb)' } as any}
               >
                 <div className={styles.visionContent}>
                    <h3>{t('section_vision_title')}</h3>
                    <p>{lang === 'en' 
                      ? 'Fully compliant with Saudi Aramco parameters and international benchmarks required by Vision 2030.' 
                      : 'متوافق تماماً مع معايير أرامكو السعودية والمقاييس الدولية المطلوبة لرؤية 2030.'}
                    </p>
                 </div>
                 <div className={styles.visionGlow} style={{ background: accentColor }}></div>
               </motion.div>

            </motion.div>
         </div>
      </section>

      {/* MULTI-COLOR LINE ANIMATION DIVIDER */}
      <motion.div 
         initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={scrollReveal}
         className={styles.qncLineDivider}
      >
         <div className={styles.qncLineAnimatedReverse}></div>
      </motion.div>

      {/* 4. CTA SECTION */}
      <section className={styles.ctaSection}>
         <div className={styles.container}>
            <motion.div 
               className={styles.ctaBox}
               initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scrollReveal}
               style={{ borderImage: `linear-gradient(to right, ${accentColor}, transparent) 1` }}
            >
               <div className={styles.ctaGlow} style={{ background: accentColor }}></div>
               <h2>{lang === 'en' ? 'Ready to elevate your facility operations?' : 'هل أنت مستعد للارتقاء بعمليات منشأتك؟'}</h2>
               <p>{lang === 'en' ? 'Partner with QNC for uncompromising quality and precision.' : 'شراكة مع قدرات الوطنية لجودة ودقة لا هوادة فيها.'}</p>
               <button className={styles.ctaBtn} style={{ borderColor: accentColor, color: accentColor }}>
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
