'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface LogoBeamProps {
  width?: string;
  height?: string;
  vertical?: boolean;
  delay?: number;
  className?: string;
}

export default function LogoBeam({
  width = "100px",
  height = "1px",
  vertical = false,
  delay = 0,
  className = "",
}: LogoBeamProps) {
  const { isRTL } = useLanguage();

  return (
    <div 
      className={className} 
      style={{ 
        width: vertical ? height : width, 
        height: vertical ? width : height,
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <motion.div
        initial={{ 
          scaleX: 0, 
          originX: isRTL ? 1 : 0 
        }}
        whileInView={{ 
          scaleX: 1 
        }}
        viewport={{ once: true }}
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, #1A75BB, #3F8E43, #CBA152, #1A75BB)',
          backgroundSize: '300% 100%'
        }}
        animate={{
          backgroundPosition: isRTL ? ['100% 0%', '0% 0%'] : ['0% 0%', '100% 0%']
        }}
        transition={{ 
          backgroundPosition: {
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          },
          scaleX: {
            duration: 1.5,
            delay,
            ease: [0.16, 1, 0.3, 1]
          }
        }}
      />
    </div>
  );
}
