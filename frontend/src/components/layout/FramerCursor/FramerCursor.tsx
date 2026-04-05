'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './FramerCursor.module.css';

export default function FramerCursor() {
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for the mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // High-damping, low-stiffness springs to create the 'lag'/antigravity effect
  const springConfigRing = { damping: 25, stiffness: 120, mass: 0.5 };
  const springConfigDot = { damping: 50, stiffness: 800, mass: 0.1 };

  const cursorXSpring = useSpring(mouseX, springConfigRing);
  const cursorYSpring = useSpring(mouseY, springConfigRing);
  const dotXSpring = useSpring(mouseX, springConfigDot);
  const dotYSpring = useSpring(mouseY, springConfigDot);

  useEffect(() => {
    // Hide standard cursor globally
    document.body.classList.add(styles.hideNativeCursor);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Detect if hovering over interactives to trigger the grow state
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursorHover === 'true'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove(styles.hideNativeCursor);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <style>{`
        body *, a, button {
          cursor: none !important;
        }
      `}</style>

      {/* 40px Outer Ring */}
      <motion.div
        className={styles.outerRing}
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{
          scale: isHovered ? 2.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />

      {/* 8px Inner Dot */}
      <motion.div
        className={styles.innerDot}
        style={{ x: dotXSpring, y: dotYSpring }}
        animate={{
          opacity: isHovered ? 0 : 1,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
