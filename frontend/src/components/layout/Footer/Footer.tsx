'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import styles from './Footer.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteLogo } from '@/hooks/useSiteLogo';
import { Mail, Phone, MapPin, Globe, Smartphone, ArrowUpRight } from 'lucide-react';

const navLinks = {
  company: [
    { label: 'Home', href: '/', key: 'nav_home' },
    { label: 'About Us', href: '/about-us', key: 'nav_about' },
    { label: 'Photo Gallery', href: '/showcase', key: 'nav_showcase' },
    { label: 'Careers', href: '/careers', key: 'nav_careers' },
    { label: 'Contact Us', href: '/contact', key: 'nav_contact' },
    { label: 'Privacy Policy', href: '/privacy-policy', key: 'nav_privacy' },
  ],
  services: {
    hard: [
      { label: 'HVAC Services', href: '/services/hvac-services', key: 'nav_hvac' },
      { label: 'MEP Engineering', href: '/services/mep-engineering', key: 'nav_mep' },
      { label: 'Civil Works', href: '/services/civil-construction', key: 'nav_civil' },
      { label: 'Low Current', href: '/services/low-current-systems', key: 'nav_low_current' },
      { label: 'Renovation', href: '/services/renovation-and-fitout', key: 'nav_renovation' },
      { label: '3rd Party Management', href: '/services/third-party-management', key: 'nav_third_party' },
    ],
    soft: [
      { label: 'Housekeeping', href: '/services/housekeeping-and-maintenance', key: 'nav_housekeeping' },
      { label: 'Catering Services', href: '/services/catering-services', key: 'nav_catering' },
      { label: 'Facade Cleaning', href: '/services/facade-cleaning', key: 'nav_facade' },
      { label: 'Landscaping', href: '/services/landscaping-services', key: 'nav_landscaping' },
      { label: 'Pest Control', href: '/services/pest-control-management', key: 'nav_pest_control' },
      { label: '24/7 Helpdesk', href: '/services/facility-help-desk', key: 'nav_helpdesk' },
    ]
  }
};

const socials = [
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.737-8.835L1.254 2.25H8.08l4.713 5.958 5.45-5.958zM17.083 20.75h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

const AnimatedLink = ({ href, children, isRTL, small }: { href: string; children: React.ReactNode; isRTL?: boolean; small?: boolean }) => {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`${styles.navLink} ${small ? styles.small : ''}`}
    >
      <Link href={href} style={{ textDecoration: 'none' }}>
        <motion.span
          className={styles.linkText}
          variants={{
            rest: { y: 0 },
            hover: { y: '-100%' },
          }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] as any }}
        >
          {children}
        </motion.span>
        <motion.span
          className={styles.linkTextClone}
          aria-hidden
          style={{ 
            left: isRTL ? 'auto' : 0, 
            right: isRTL ? 0 : 'auto',
            textAlign: isRTL ? 'right' : 'left'
          }}
          variants={{
            rest: { y: '100%' },
            hover: { y: 0 },
          }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] as any }}
        >
          {children}
        </motion.span>
      </Link>
    </motion.div>
  );
}

function MarqueeText({ language }: { language: string }) {
  const itemsEn = ['FACILITIES MANAGEMENT', 'LOGISTICS & TRANSPORT', 'MANPOWER SUPPLY', 'SECURITY SERVICES', 'TOTAL FM PARTNER', 'SAUDI VISION 2030'];
  const itemsAr = ['إدارة المرافق', 'الخدمات اللوجستية والنقل', 'توفير القوى العاملة', 'الخدمات الأمنية', 'شريك إدارة المرافق المتكاملة', 'رؤية السعودية 2030'];
  const items = language === 'ar' ? itemsAr : itemsEn;

  return (
    <div className={styles.marqueeOuter}>
      <div className={styles.marqueeTrack}>
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className={styles.marqueeItem}>
            {item} <span className={styles.marqueeDot}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  const { t, language, isRTL } = useLanguage();
  const logoSrc = useSiteLogo();
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-100px' });
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  const bigTextY = useTransform(scrollYProgress, [0, 1], ['20%', '0%']);
  const bigTextOpacity = useTransform(scrollYProgress, [0, 0.4], [0.1, 1]);


  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as any } },
  };

  return (
    <footer className={`${styles.footerSection} ${isRTL ? styles.rtl : ''}`} ref={footerRef}>
      {/* 3D Revolving Logo Background Element */}
      <div className={styles.revolvingBrandingContainer}>
        <motion.div 
          className={styles.revolvingSymbolWrapper}
          animate={{ rotateY: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <img 
            src="/assets/images/FinalQNCLogo.svg" 
            alt="QNC Revolving" 
            className={styles.revolvingSymbol}
          />
        </motion.div>
      </div>

      {/* Marquee Band */}
      <MarqueeText language={language} />

      {/* Big Scroll-reveal CTA */}
      <div className={styles.bigCtaWrapper}>
        <motion.div
          className={styles.bigCta}
          style={{ y: bigTextY, opacity: bigTextOpacity }}
        >
          <div className={styles.ctaHeaderRows}>
            <p className={styles.bigCtaLabel}>{language === 'ar' ? 'هل أنت مستعد للشراكة؟' : 'READY TO PARTNER?'}</p>
            <h2 className={styles.bigCtaText}>
              {language === 'ar' ? (
                <>لنقم بالبناء<br />معاً.</>
              ) : (
                <>Let's Build<br />Together.</>
              )}
            </h2>
          </div>
          <Link href="/contact">
            <motion.button
              className={styles.ctaBtn}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>{t('nav_contact')}</span>
              <motion.span
                className={styles.ctaBtnArrow}
                initial={{ x: 0 }}
                whileHover={{ x: isRTL ? -6 : 6 }}
                style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }}
              >
                →
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Main Grid */}
      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className={styles.topGrid}>
          {/* Brand Column */}
          <motion.div className={styles.brandCol} variants={itemVariants}>
            <motion.img
              src={logoSrc}
              alt="QNC Logo"
              className={styles.logoImage}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <p className={styles.tagline}>
              {t('footer_tagline')}
            </p>

            {/* Social Icons */}
            <div className={styles.socials}>
              {socials.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  onHoverStart={() => setHoveredSocial(s.name)}
                  onHoverEnd={() => setHoveredSocial(null)}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  title={s.name}
                >
                  {s.icon}
                  <AnimatePresence>
                    {hoveredSocial === s.name && (
                      <motion.span
                        className={styles.socialTooltip}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2 }}
                      >
                        {s.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Nav Columns */}
          <motion.div className={styles.linksCol} variants={itemVariants}>
            <h4 className={styles.colHeading}>{language === 'ar' ? 'الشركة' : 'COMPANY'}</h4>
            {navLinks.company.map((l) => (
              <AnimatedLink key={l.href} href={l.href} isRTL={isRTL}>{t(l.key) || l.label}</AnimatedLink>
            ))}
          </motion.div>

          <motion.div className={styles.linksCol} variants={itemVariants}>
            <h4 className={styles.colHeading}>{language === 'ar' ? 'الخدمات' : 'SERVICES'}</h4>
            
            {/* Hard Services Sub-group */}
            <div className={styles.subCategoryHeading}>
              {t('nav_hard_services')}
            </div>
            {navLinks.services.hard.map((l) => (
              <AnimatedLink key={l.href} href={l.href} isRTL={isRTL} small>{t(l.key) || l.label}</AnimatedLink>
            ))}

            {/* Soft Services Sub-group */}
            <div className={styles.subCategoryHeading} style={{ marginTop: '1.5rem' }}>
              {t('nav_soft_services')}
            </div>
            {navLinks.services.soft.map((l) => (
              <AnimatedLink key={l.href} href={l.href} isRTL={isRTL} small>{t(l.key) || l.label}</AnimatedLink>
            ))}
          </motion.div>

          {/* Contact Details Column */}
          <motion.div className={styles.contactCol} variants={itemVariants}>
            <h4 className={styles.colHeading}>{language === 'ar' ? 'معلومات التواصل' : 'CONTACT DETAILS'}</h4>
            
            <div className={styles.contactList}>
              <a href={`mailto:${t('footer_email')}`} className={styles.contactItem}>
                <Mail size={16} className={styles.contactIcon} />
                <span className={styles.contactText} dir="ltr">{t('footer_email')}</span>
              </a>
              
              <a href={`tel:${t('footer_phone_office').split(' ')[0]}`} className={styles.contactItem}>
                <Phone size={16} className={styles.contactIcon} />
                <span className={styles.contactText} dir="ltr">{t('footer_phone_office')}</span>
              </a>
              
              <a href={`tel:${t('footer_phone_mobile').replace(/\s/g, '')}`} className={styles.contactItem}>
                <Smartphone size={16} className={styles.contactIcon} />
                <span className={styles.contactText} dir="ltr">{t('footer_phone_mobile')}</span>
              </a>
              
              <a href={`https://${t('footer_website')}`} target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                <Globe size={16} className={styles.contactIcon} />
                <span className={styles.contactText} dir="ltr">{t('footer_website')}</span>
              </a>

              {/* Stylized Map Marker Action */}
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Qudrat+National+Company+Al+Khobar" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.mapActionLink}
              >
                <div className={styles.pulseContainer}>
                  <MapPin size={22} className={styles.markerIcon} />
                  <div className={styles.pulseCircle}></div>
                </div>
                <div className={styles.mapLabelContainer}>
                  <span className={styles.mapLabelMain}>{t('nav_map_location')}</span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div className={styles.divider} variants={itemVariants} />
        
        <div className={styles.bottom}>
          <p className={styles.bottomCopy}>
            © {new Date().getFullYear()} Qudrat National. {t('footer_rights')}
          </p>
          
          <div className={styles.bottomLinks}>
            <Link href="/privacy-policy" className={styles.bottomLink}>{t('nav_privacy')}</Link>
            <span className={styles.bottomSep}>|</span>
            <Link href="/terms" className={styles.bottomLink}>{t('nav_terms')}</Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
