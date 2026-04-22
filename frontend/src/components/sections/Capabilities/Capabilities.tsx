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

const ALL_SERVICES: Service[] = [
  { id: '01', slug: 'hvac-services', titleEn: 'HVAC', titleAr: 'التكييف والتهوية', descEn: 'Maintenance and servicing of heating, ventilation, and air conditioning systems.', descAr: 'صيانة أنظمة التكييف والتهوية.', type: 'HARD', icon: 'Thermometer', image: '/assets/QNCHardandSoft/Gemini_Generated_Image_rdhr24rdhr24rdhr.png' },
  { id: '02', slug: 'mep-engineering', titleEn: 'MEP', titleAr: 'الكهروميكانيكية', descEn: 'Integrated maintenance for Mechanical, Electrical, and Plumbing systems.', descAr: 'صيانة الأنظمة الميكانيكية والكهربائية والسباكة.', type: 'HARD', icon: 'Zap', image: '/assets/QNCHardandSoft/Gemini_Generated_Image_5wljv05wljv05wlj.png' },
  { id: '03', slug: 'civil-construction', titleEn: 'Civil Works', titleAr: 'الأعمال المدنية', descEn: 'General repair and maintenance to keep building structures safe.', descAr: 'الإصلاح العام للحفاظ على هياكل المباني.', type: 'HARD', icon: 'HardHat', image: '/assets/QNCHardandSoft/Gemini_Generated_Image_gqph12gqph12gqph.png' },
  { id: '04', slug: 'low-current-systems', titleEn: 'Low Current', titleAr: 'التيار المنخفض', descEn: 'Support for CCTV, access control, and fire alarm systems.', descAr: 'دعم أنظمة الدوائر التلفزيونية والإنذار.', type: 'HARD', icon: 'Radio', image: '/assets/QNCHardandSoft/Gemini_Generated_Image_d84ktdd84ktdd84k.png' },
  { id: '05', slug: 'renovation-and-fitout', titleEn: 'Renovation', titleAr: 'التجديد والتجهيز', descEn: 'Upgrade and interior modification works.', descAr: 'أعمال الترقية والتعديل الداخلي.', type: 'HARD', icon: 'Hammer', image: '/assets/QNCHardandSoft/Gemini_Generated_Image_vlm0khvlm0khvlm0.png' },
  { id: '06', slug: 'third-party-management', titleEn: '3rd Party', titleAr: 'إدارة الموردين', descEn: 'Coordination and oversight of specialized external vendors.', descAr: 'التنسيق والإشراف على الموردين الخارجيين.', type: 'HARD', icon: 'Users', image: '/assets/QNCHardandSoft/Gemini_Generated_Image_7r05vk7r05vk7r05.png' },
  { id: '07', slug: 'housekeeping-and-maintenance', titleEn: 'Housekeeping', titleAr: 'التنظيف والدعم', descEn: 'Daily cleaning and office support services.', descAr: 'خدمات التنظيف اليومي والدعم المكتبي.', type: 'SOFT', icon: 'Sparkles', image: '/assets/QNCHardandSoft/Gemini_Generated_Image_j529vdj529vdj529.png' },
  { id: '08', slug: 'catering-services', titleEn: 'Catering', titleAr: 'خدمات الإعاشة', descEn: 'Quality food services and hospitality catering.', descAr: 'خدمات غذائية وضيافة مخصصة.', type: 'SOFT', icon: 'Coffee', image: '/assets/QNCHardandSoft/Gemini_Generated_Image_p1kxf7p1kxf7p1kx.png' },
  { id: '09', slug: 'facade-cleaning', titleEn: 'Facade Clean', titleAr: 'تنظيف الواجهات', descEn: 'Specialized high-rise and glass cleaning.', descAr: 'تنظيف النوافذ والواجهات الزجاجية.', type: 'SOFT', icon: 'Wind', image: '/assets/QNCHardandSoft/Gemini_Generated_Image_1aoqjk1aoqjk1aoq.png' },
  { id: '10', slug: 'landscaping-services', titleEn: 'Landscaping', titleAr: 'تنسيق الحدائق', descEn: 'Design and maintenance of greenery outdoor spaces.', descAr: 'تصميم وصيانة المساحات الخضراء.', type: 'SOFT', icon: 'TreePine', image: '/assets/QNCHardandSoft/Gemini_Generated_Image_pz9pukpz9pukpz9p.png' },
  { id: '11', slug: 'pest-control-management', titleEn: 'Pest Control', titleAr: 'مكافحة الحشرات', descEn: 'Expert treatment and prevention services.', descAr: 'خدمات العلاج والوقاية المتخصصة.', type: 'SOFT', icon: 'ShieldAlert', image: '/assets/QNCHardandSoft/Gemini_Generated_Image_g1rmqug1rmqug1rm.png' },
  { id: '12', slug: 'facility-help-desk', titleEn: 'Help Desk', titleAr: 'مكتب المساعدة', descEn: 'Central hub for tracking all facility requests.', descAr: 'مركز لتسجيل ومتابعة طلبات المنشأة.', type: 'SOFT', icon: 'Headphones', image: '/assets/QNCHardandSoft/Gemini_Generated_Image_2r7fg2r7fg2r7fg2.png' }
];

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
