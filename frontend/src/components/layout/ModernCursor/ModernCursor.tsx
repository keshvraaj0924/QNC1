'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './ModernCursor.module.css';

export default function ModernCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Standard high-end lerp following using GSAP QuickSetter for performance
    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const ratio = 0.12; // Damping ratio (lag effect)

    const xSetter = gsap.quickSetter(cursor, "x", "px");
    const ySetter = gsap.quickSetter(cursor, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const updateCursor = () => {
      // Damped lag follower logic
      pos.x += (mouse.x - pos.x) * ratio;
      pos.y += (mouse.y - pos.y) * ratio;

      xSetter(pos.x);
      ySetter(pos.y);
      
      requestAnimationFrame(updateCursor);
    };

    const onMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = target.closest('a, button, [data-cursor="hover"], .hover-reveal');

      if (isHoverable) {
        gsap.to(cursor, {
          scale: 2.2,
          duration: 0.4,
          ease: 'power3.out',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(2px)'
        });
      }
    };

    const onMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = target.closest('a, button, [data-cursor="hover"], .hover-reveal');
      
      if (isHoverable) {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.4,
          ease: 'power3.out',
          backgroundColor: 'white',
          backdropFilter: 'blur(0px)'
        });
      }
    };

    const onMouseDown = () => {
      gsap.to(cursor, { 
        scale: 0.7, 
        duration: 0.2,
        ease: 'power2.out'
      });
    };

    const onMouseUp = () => {
      gsap.to(cursor, { 
        scale: 1, 
        duration: 0.4,
        ease: 'elastic.out(1, 0.75)'
      });
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
      {/* Follower Circle */}
      <div ref={cursorRef} className={styles.cursorCircle} />
    </div>
  );
}
