import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import styles from './Capabilities.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

import { servicesData } from '@/data/content';

/**
 * Service Data Definition
 */
interface Service {
  id: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  type: 'HARD' | 'SOFT';
  icon: string;
  image: string;
  slug: string;
}

const ICON_MAP: Record<string, string> = {
  'hvac-services': 'Thermometer',
  'mep-engineering': 'Zap',
  'civil-construction': 'HardHat',
  'low-current-systems': 'Radio',
  'renovation-and-fitout': 'Hammer',
  'third-party-management': 'Users',
  'housekeeping-and-maintenance': 'Sparkles',
  'catering-services': 'Coffee',
  'facade-cleaning': 'Wind',
  'landscaping-services': 'TreePine',
  'pest-control-management': 'ShieldAlert',
  'facility-help-desk': 'Headphones'
};

const ALL_SERVICES: Service[] = servicesData.map((s, idx) => ({
  id: (idx + 1).toString().padStart(2, '0'),
  slug: s.slug,
  titleEn: s.title.en,
  titleAr: s.title.ar,
  descEn: s.description.en,
  descAr: s.description.ar,
  type: s.category.toUpperCase() as 'HARD' | 'SOFT',
  icon: ICON_MAP[s.slug] || 'Settings',
  image: s.image
}));

const HARD_SERVICES: Service[] = ALL_SERVICES.filter(s => s.type === 'HARD');
const SOFT_SERVICES: Service[] = ALL_SERVICES.filter(s => s.type === 'SOFT');

export default function Capabilities({ content }: { content?: any }) {
  const { language, isRTL, t } = useLanguage();
  const { theme } = useTheme();
  
  return (
    <>
      <ServiceRail 
        type="HARD" 
        services={HARD_SERVICES} 
        language={language} 
        isRTL={isRTL} 
        t={t} 
        theme={theme} 
      />
      <ServiceRail 
        type="SOFT" 
        services={SOFT_SERVICES} 
        language={language} 
        isRTL={isRTL} 
        t={t} 
        theme={theme} 
        hideMainHeader={true}
      />
    </>
  );
}

function ServiceRail({ type, services, language, isRTL, t, theme, hideMainHeader }: any) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const visualRefs = useRef<(HTMLDivElement | null)[]>([]);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(logoRef.current, {
        rotate: 360,
        duration: 40,
        repeat: -1,
        ease: "none"
      });
      
      gsap.set(logoRef.current, { 
        stroke: "#cba152", 
        filter: "drop-shadow(0 0 50px rgba(203,161,82,0.6))" 
      });
    }, logoRef);
    return () => ctx.revert();
  }, [type]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 80%" : "top top",
          end: isMobile ? "bottom 20%" : `+=${services.length * 80}%`,
          pin: !isMobile,
          pinSpacing: !isMobile,
          snap: !isMobile ? {
            snapTo: 1 / (services.length + 0.5), // Offset for title sequence
            duration: { min: 0.2, max: 0.4 },
            delay: 0.05,
            ease: "power1.inOut"
          } : undefined,
          scrub: 0.5,
          anticipatePin: 1,
        }
      });

      // Center and Hold Phase Title
      tl.fromTo(titleRef.current, 
        { opacity: 0, scale: 0.8, yPercent: 50 },
        { opacity: 1, scale: 1, yPercent: 0, duration: 2, ease: "power2.out" }
      );

      if (!isMobile) {
        // Stay in center for a while
        tl.to(titleRef.current, { duration: 1.5 });
      } else {
        // Shorter hold for mobile flow
        tl.to(titleRef.current, { duration: 0.8 });
      }

      // Fade out as content comes in (Unified for all viewports)
      tl.to(titleRef.current, { 
        opacity: 0, 
        yPercent: -40, 
        scale: 0.95, 
        duration: 0.8,
        ease: "power2.in"
      });

      // Cards
      services.forEach((service: any, index: number) => {
        const frame = frameRefs.current[index];
        const visual = visualRefs.current[index];
        const info = infoRefs.current[index];

        if (!frame || !visual || !info) return;

        // Desktop settled positions: offset left/right
        // Mobile settled positions: perfectly center (handled by simple fade)
        const settleX_Visual = isMobile ? 0 : (isRTL ? 25 : -25);
        const settleX_Info = isMobile ? 0 : (isRTL ? -25 : 25);
        
        // Vertical offsets: disabled for stable flow standard scrolling
        const fromY_Visual = isMobile ? 20 : 0; 
        const fromY_Info = isMobile ? 40 : 0; 

        tl.fromTo(frame, { opacity: 0 }, { opacity: 1, duration: 0.6 }, index === 0 ? "-=1.5" : "-=1.2")
          .fromTo(visual, 
            { 
              xPercent: isMobile ? 0 : (isRTL ? -100 : 100), 
              yPercent: fromY_Visual,
              rotateY: isMobile ? 0 : (isRTL ? 45 : -45), 
              opacity: 0,
              scale: 0.8
            },
            { 
              xPercent: settleX_Visual, 
              yPercent: 0,
              rotateY: 0, 
              opacity: 1, 
              scale: 1,
              duration: 1, 
              ease: "power3.out" 
            },
            index === 0 ? "-=1.5" : "-=0.8"
          )
          .fromTo(info,
            { 
              xPercent: isMobile ? 0 : (isRTL ? 100 : -100), 
              yPercent: fromY_Info,
              opacity: 0 
            },
            { 
              xPercent: settleX_Info, 
              yPercent: 0,
              opacity: 1, 
              duration: 1, 
              ease: "power3.out" 
            },
            "-=0.8"
          )
          .to([visual, info], { duration: 0.8 }) 
          .to(visual, { 
            xPercent: isMobile ? 0 : (isRTL ? 150 : -150), 
            yPercent: isMobile ? -50 : 0,
            opacity: 0, 
            duration: 0.8 
          })
          .to(info, { 
            xPercent: isMobile ? 0 : (isRTL ? -150 : 150), 
            yPercent: isMobile ? 50 : 0,
            opacity: 0, 
            duration: 0.8 
          }, "-=0.8")
          .to(frame, { opacity: 0, duration: 0.3 }, "-=0.3");
      });

      tl.to(progressRef.current, { scaleX: 1, duration: tl.duration(), ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, [isRTL, services.length, type]);

  return (
    <section ref={sectionRef} className={styles.kineticSection} data-theme={theme}>
      <div className={styles.stickyTrack}>
        {!hideMainHeader && (
          <div className={styles.railHeader}>
            <div className={styles.railPreHeader}>
              - {language === 'en' ? 'OUR SERVICES' : 'خدماتنا'}
            </div>
            <div className={styles.scrollHint}>
               {language === 'en' ? 'SCROLL TO EXPLORE' : 'مرر للاستكشاف'}
            </div>
            <h2 className={styles.railMainTitle}>
              {language === 'en' ? 'Kinetic Excellence' : 'التفوق الحركي'}
            </h2>
          </div>
        )}

        <div ref={titleRef} className={styles.railPhaseTitle} style={hideMainHeader ? { top: '35%' } : {}}>
          <div className={styles.glitchText}>
            {type === 'HARD' 
              ? (language === 'en' ? 'HARD SERVICES' : 'الخدمات الصلبة')
              : (language === 'en' ? 'SOFT SERVICES' : 'الخدمات اللينة')}
          </div>
        </div>

        <div className={styles.kineticLogoWrapper}>
          <svg ref={logoRef} viewBox="0 0 100 100" className={styles.kineticSvg} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5">
            <path d="M50 10 L90 50 L50 90 L10 50 Z" />
            <circle cx="50" cy="50" r="30" />
            <path d="M50 20 L80 50 L50 80 L20 50 Z" />
          </svg>
          <img 
            src="/assets/images/QLogoSymbol/TransaparentQ.png" 
            alt="Q Symbol" 
            className={styles.stableQImage} 
          />
        </div>

        <div className={styles.railViewport}>
          {services.map((service: any, idx: number) => (
            <div key={service.id} ref={el => { frameRefs.current[idx] = el; }} className={styles.kineticCardFrame}>
              <div ref={el => { visualRefs.current[idx] = el; }} className={styles.visualPart}>
                <div className={styles.floatingCard}>
                  <div className={styles.cardVisual} style={{ backgroundImage: `url(${service.image})` }} />
                  <div className={styles.cardGlow} />
                </div>
              </div>

              <div ref={el => { infoRefs.current[idx] = el; }} className={styles.infoPart}>
                <Link href={`/services/${service.slug}`} className={styles.modernizedBox}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardId}>{service.id} — REF_{service.id}</span>
                  </div>
                  <h3 className={styles.cardTitle}>
                    {language === 'en' ? service.titleEn : service.titleAr}
                  </h3>
                  <p className={styles.cardDesc}>
                    {language === 'en' ? service.descEn : service.descAr}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.railFooter}>
          <div className={styles.progressBar}>
            <div ref={progressRef} className={styles.progressInner} />
          </div>
          <div className={styles.scrollHint}>
            QNC CORE CAPABILITIES / {type} SOLUTIONS
          </div>
        </div>
      </div>
    </section>
  );
}
