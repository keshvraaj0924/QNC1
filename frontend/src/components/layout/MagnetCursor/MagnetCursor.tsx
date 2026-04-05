'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import styles from './MagnetCursor.module.css';

export default function MagnetCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [magnetLevel, setMagnetLevel] = useState(0);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsVisible(false);
      return;
    }

    let activeTarget: HTMLElement | null = null;
    let targetRect: DOMRect | null = null;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      const mouseXVal = e.clientX;
      const mouseYVal = e.clientY;

      const target = e.target as HTMLElement;
      const magnetElement = target.closest('[data-cursor="hover"]') as HTMLElement | null;
      
      if (magnetElement) {
        setIsHovering(true);
        
        // Cache the rect to avoid reflows on every single move within the same element
        if (activeTarget !== magnetElement) {
          activeTarget = magnetElement;
          targetRect = magnetElement.getBoundingClientRect();
        }

        if (targetRect) {
          const centerX = targetRect.left + targetRect.width / 2;
          const centerY = targetRect.top + targetRect.height / 2;
          
          // Magnetic pull logic
          mouseX.set(centerX + (mouseXVal - centerX) * 0.35);
          mouseY.set(centerY + (mouseYVal - centerY) * 0.35);
        }
      } else {
        setIsHovering(false);
        activeTarget = null;
        targetRect = null;
        mouseX.set(mouseXVal);
        mouseY.set(mouseYVal);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  return (
    <motion.div
      ref={cursorRef}
      className={styles.cursor}
      style={{
        left: cursorX,
        top: cursorY,
        opacity: isVisible ? 1 : 0,
        scale: isHovering ? 2.5 : 1,
      }}
      transition={{ scale: { type: 'spring', ...springConfig } }}
    >
      <div className={styles.dot} />
      <div className={styles.ring} />
    </motion.div>
  );
}
