'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';
import Image from 'next/image';
import styles from './MajorClients.module.css';
import { useLanguage } from '@/context/LanguageContext';
import BlurText from '@/components/modern/BlurText';

const DEFAULT_CLIENTS = [
  { id: 'c1', logo: '/assets/images/clients/qudrat-clients_0009_secpco.jpg' },
  { id: 'c2', logo: '/assets/images/clients/qudrat-clients_0012_e-a35RhV_400x400.jpg' },
  { id: 'c3', logo: '/assets/images/clients/qudrat-clients_0015_Neom.jpg' },
  { id: 'c4', logo: '/assets/images/clients/CPECC.png' },
  { id: 'c5', logo: '/assets/images/clients/qudrat-clients_0023_saipem.jpg' },
  { id: 'c6', logo: '/assets/images/clients/qudrat-clients_0005_CMCC.jpg' },
  { id: 'c7', logo: '/assets/images/clients/qudrat-clients_0002_SGB-Dabal.jpg' },
  { id: 'c8', logo: '/assets/images/clients/qudrat-clients_0003_Layer-1.jpg' },
  { id: 'c9', logo: '/assets/images/clients/qudrat-clients_0004_StC.jpg' },
  { id: 'c10', logo: '/assets/images/clients/qudrat-clients_0008_nova-water.jpg' },
  { id: 'c11', logo: '/assets/images/clients/qudrat-clients_0010_Arabian-Drilling.jpg' },
  { id: 'c12', logo: '/assets/images/clients/qudrat-clients_0014_Qiddiya-3.jpg' },
];

/**
 * Single Logo Component with Distance Interpolation
 */
function TunnelLogo({ src, index, xOffset, containerWidth, totalLogos }: { src: string, index: number, xOffset: any, containerWidth: number, totalLogos: number }) {
  const logoWidth = 240; // width + margin
  const totalWidth = totalLogos * logoWidth;
  const initialX = index * logoWidth;
  
  // Calculate relative X position with center-clinging infinite wrap
  // This algorithm ensures that each logo always maps to the physical copy
  // closest to the center of the viewport, eliminating "invisible gaps".
  const relativeX = useTransform(xOffset, (latestValue: number) => {
    const rawPos = initialX + latestValue;
    const viewportCenter = containerWidth / 2;
    const itemOffset = logoWidth / 2;
    const targetPos = viewportCenter - itemOffset;
    
    // Map the infinite raw scroll to a range centered around targetPos
    const wrapped = ((rawPos - targetPos + totalWidth / 2) % totalWidth + totalWidth) % totalWidth - totalWidth / 2 + targetPos;
    
    return wrapped;
  });

  // Symmetric visibility and transformation ramps
  const centerPos = containerWidth / 2 - logoWidth / 2;
  const visibilityRange = containerWidth * 0.6; // Wider range for smoother enter/exit
  
  const opacity = useTransform(relativeX, 
    [centerPos - visibilityRange, centerPos, centerPos + visibilityRange], 
    [0, 1, 0]
  );
  
  const scale = useTransform(relativeX, 
    [centerPos - visibilityRange, centerPos, centerPos + visibilityRange], 
    [0.7, 1.25, 0.7]
  );
  
  // Blur removed per user request for global sharpness
  const blur = useMotionValue(0);

  const z = useTransform(relativeX, 
    [centerPos - visibilityRange, centerPos, centerPos + visibilityRange], 
    [-400, 100, -400]
  );

  const rotateY = useTransform(relativeX, 
    [centerPos - visibilityRange, centerPos, centerPos + visibilityRange], 
    [70, 0, -70]
  );

  const yFloating = useTransform(xOffset, (latest: number) => {
    return Math.sin((initialX + latest) * 0.005) * 4;
  });

  return (
    <motion.div 
      className={styles.logoItem}
      style={{ 
        x: relativeX,
        opacity,
        scale,
        z,
        rotateY,
        filter: 'none',
        y: yFloating,
        position: 'absolute',
        transformStyle: 'preserve-3d'
      }}
    >
      <Image 
        src={src} 
        alt="Client Logo" 
        width={160} 
        height={80} 
        className={styles.clientLogo}
        priority={index < 5}
        style={{ height: 'auto', width: 'auto' }}
      />
    </motion.div>
  );
}

export default function MajorClients({ content }: { content?: any[] }) {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1920);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const xOffset = useMotionValue(0);
  
  // Continuous Motion Logic (Direction-aware)
  useAnimationFrame((time, delta) => {
    const moveBy = delta * 0.05; // Speed adjustment
    const direction = language === 'ar' ? 1 : -1;
    xOffset.set(xOffset.get() + (moveBy * direction));
  });

  const label = t('section_partners_label');
  const logos = useMemo(() => {
    return (content && content.length > 0) ? content.map((c, i) => ({
      id: c.id || `p-${i}`,
      logo: c.logo || c.image || c.src
    })) : DEFAULT_CLIENTS;
  }, [content]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>{label}</span>
          <h2 className={styles.title}>
            <BlurText 
              text={t('section_clients_title')}
              delay={50}
            />
          </h2>
        </div>
      </div>

      <div ref={containerRef} className={styles.tunnelContainer}>
        {/* Layer 1 (Bottom): Scroller */}
        <div className={styles.scrollerWrapper}>
          {isMounted && logos.map((client, idx) => (
            <TunnelLogo 
              key={client.id} 
              src={client.logo} 
              index={idx} 
              xOffset={xOffset}
              containerWidth={containerWidth}
              totalLogos={logos.length}
            />
          ))}
        </div>

        {/* Layer 2 (Middle): Depth Overlays */}
        <div className={styles.overlayFaders} />

        {/* Layer 3 (Top): Central Logo Frame */}
        <div className={styles.centralFrame}>
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.7, 0.5],
              rotateX: [0, 5, -5, 0],
              rotateY: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Image 
              src="/assets/images/QLogoSymbol/TransaparentQ.png" 
              alt="QNC Symbol" 
              width={1321} 
              height={794} 
              className={styles.svgSymbol}
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
