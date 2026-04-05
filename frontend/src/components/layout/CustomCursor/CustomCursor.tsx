'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // SRMG uses an extremely tight spring for the hollow ring to trail perfectly
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over a clickable or interactive element
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <style>{`
        body *, a, button {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className={styles.cursorRing}
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{
          width: isHovered ? 80 : 20,
          height: isHovered ? 80 : 20,
          border: isHovered ? '2px solid rgba(255, 255, 255, 1)' : '1.5px solid rgba(255, 255, 255, 0.6)',
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)',
          mixBlendMode: isHovered ? 'difference' : 'normal',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </>
  );
}
