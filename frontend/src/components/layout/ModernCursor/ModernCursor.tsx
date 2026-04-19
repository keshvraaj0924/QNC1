'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './ModernCursor.module.css';

export default function ModernCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // High-precision tracking refs
    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const ratio = 0.15; // Refined damping for a crisp yet fluid feel

    const xSetter = gsap.quickSetter(cursor, "x", "px");
    const ySetter = gsap.quickSetter(cursor, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // Movement engine using GSAP Ticker for sub-pixel smoothness and zero jitter
    const updateCursor = () => {
      const dt = 1.0 - Math.pow(1.0 - ratio, gsap.ticker.deltaRatio());
      
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;

      xSetter(pos.x);
      ySetter(pos.y);
    };

    const onMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = target.closest('a, button, [data-cursor="hover"], .hover-reveal');

      if (isHoverable) {
        gsap.to(cursor, {
          scale: 2.5,
          duration: 0.3,
          ease: 'power2.out',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          filter: 'none',
          backdropFilter: 'none',
          overwrite: true
        });
      }
    };

    const onMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = target.closest('a, button, [data-cursor="hover"], .hover-reveal');
      
      if (isHoverable) {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
          backgroundColor: 'white',
          filter: 'none',
          backdropFilter: 'none',
          overwrite: true
        });
      }
    };

    const onMouseDown = () => {
      gsap.to(cursor, { 
        scale: 0.8, 
        duration: 0.2,
        ease: 'power2.out',
        overwrite: true
      });
    };

    const onMouseUp = () => {
      gsap.to(cursor, { 
        scale: 1, 
        duration: 0.3,
        ease: 'back.out(2)',
        overwrite: true
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseEnter);
    window.addEventListener('mouseout', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    
    gsap.ticker.add(updateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseEnter);
      window.removeEventListener('mouseout', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      gsap.ticker.remove(updateCursor);
    };
  }, [isVisible]);

  return (
    <div className={styles.cursorWrapper} style={{ opacity: isVisible ? 1 : 0 }}>
      {/* Follower Circle */}
      <div ref={cursorRef} className={styles.cursorCircle} />
    </div>
  );
}
