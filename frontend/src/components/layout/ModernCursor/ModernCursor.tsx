'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './ModernCursor.module.css';

export default function ModernCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Standard high-end lerp following
    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };
    const ratio = 0.15;
    const dotRatio = 0.25;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const updateCursor = () => {
      // Smoothly follow the mouse with LERP
      pos.x += (mouse.x - pos.x) * ratio;
      pos.y += (mouse.y - pos.y) * ratio;
      
      dotPos.x += (mouse.x - dotPos.x) * dotRatio;
      dotPos.y += (mouse.y - dotPos.y) * dotRatio;

      gsap.set(cursor, { x: pos.x, y: pos.y });
      gsap.set(dot, { x: dotPos.x, y: dotPos.y });
      
      requestAnimationFrame(updateCursor);
    };

    const onMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = target.closest('a, button, [data-cursor="hover"]');
      const isMagnetic = target.closest('[data-cursor="magnetic"]');

      if (isHoverable) {
        gsap.to(cursor, {
          scale: 2.5,
          duration: 0.4,
          ease: 'power3.out',
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        });
        gsap.to(dot, { scale: 0, duration: 0.2 });
      }

      if (isMagnetic) {
        // Simple magnetic pull logic can be added here if needed, 
        // but often handled by specific component hooks
      }
    };

    const onMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = target.closest('a, button, [data-cursor="hover"]');
      
      if (isHoverable) {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.4,
          ease: 'power3.out',
          backgroundColor: 'transparent'
        });
        gsap.to(dot, { scale: 1, duration: 0.2 });
      }
    };

    const onMouseDown = () => {
      gsap.to(cursor, { scale: 0.8, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseEnter);
    window.addEventListener('mouseout', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    
    const animationFrame = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseEnter);
      window.removeEventListener('mouseout', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animationFrame);
    };
  }, [isVisible]);

  return (
    <div className={styles.cursorWrapper} style={{ opacity: isVisible ? 1 : 0 }}>
      <div ref={cursorRef} className={styles.cursorRing} />
      <div ref={dotRef} className={styles.cursorDot} />
    </div>
  );
}
