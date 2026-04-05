'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './GsapCursor.module.css';

export default function GsapCursor() {
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);

  const [isTouch, setIsTouch] = useState(false);

  // Mouse coordinates
  const mouse = useRef({ x: 0, y: 0 });
  const delayedMouse = useRef({ x: 0, y: 0 });

  // Hover target states
  const hoverTarget = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    // Force hide native cursors
    document.body.classList.add(styles.globalHideCursor);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!primaryRef.current) return;

      // Primary dot moves instantly (0.1s lag for smoothness)
      gsap.to(primaryRef.current, {
        x: mouse.current.x,
        y: mouse.current.y,
        duration: 0.1,
        ease: 'power2.out',
      });
    };

    const detectMagneticHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverble = target.closest('[data-cursor]') as HTMLElement;

      if (hoverble && hoverble !== hoverTarget.current) {
        hoverTarget.current = hoverble;
        
        // Context text optionally provided by data attribute
        const hoverText = hoverble.getAttribute('data-cursor-text');
        if (cursorTextRef.current && hoverText) {
          cursorTextRef.current.innerText = hoverText;
        } else if (cursorTextRef.current) {
          cursorTextRef.current.innerText = '';
        }

        // Animate up
        gsap.to(secondaryRef.current, {
          width: 80,
          height: 80,
          backgroundColor: 'rgba(255,255,255,0)',
          border: '1px solid rgba(255,255,255,0.8)',
          duration: 0.4,
          ease: 'power3.out',
        });
        
        gsap.to(primaryRef.current, {
          scale: 0.5,
          opacity: 0,
          duration: 0.2
        });

      } else if (!hoverble && hoverTarget.current) {
        hoverTarget.current = null;
        if (cursorTextRef.current) cursorTextRef.current.innerText = '';

        // Animate back down
        gsap.to(secondaryRef.current, {
          width: 40,
          height: 40,
          backgroundColor: 'transparent',
          border: '1px solid rgba(255,255,255,0.4)',
          duration: 0.4,
          ease: 'power3.out',
        });
        
        gsap.to(primaryRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.2
        });
      }
    };

    const onClick = () => {
      gsap.to(secondaryRef.current, {
        scale: 0.8,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousemove', detectMagneticHover);
    window.addEventListener('mousedown', onClick);

    return () => {
      document.body.classList.remove(styles.globalHideCursor);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousemove', detectMagneticHover);
      window.removeEventListener('mousedown', onClick);
    };
  }, []);

  // 60fps TICKER LOOP FOR THE SECONDARY LAGGING CURSOR + MAGNETIC PULL
  useGSAP(() => {
    if (isTouch) return;

    const tickerFactor = 0.15; // lerp weight (antigravity lag control)

    const ticker = () => {
      if (!secondaryRef.current) return;

      let targetX = mouse.current.x;
      let targetY = mouse.current.y;

      // Magnetic Pull Override
      if (hoverTarget.current) {
        const rect = hoverTarget.current.getBoundingClientRect();
        // Exact center of the hovered element
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // The cursor orbits 30% of the distance from the center to the mouse (magnetic pull)
        const dx = mouse.current.x - centerX;
        const dy = mouse.current.y - centerY;
        
        targetX = centerX + dx * 0.3;
        targetY = centerY + dy * 0.3;
      }

      // Linear Interpolation (lerp)
      delayedMouse.current.x += (targetX - delayedMouse.current.x) * tickerFactor;
      delayedMouse.current.y += (targetY - delayedMouse.current.y) * tickerFactor;

      // Direct GPU hardware-accelerated set
      gsap.set(secondaryRef.current, {
        x: delayedMouse.current.x,
        y: delayedMouse.current.y,
      });
    };

    gsap.ticker.add(ticker);
    return () => gsap.ticker.remove(ticker);
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div 
        ref={secondaryRef} 
        className={styles.secondaryCursor}
      >
        <span ref={cursorTextRef} className={styles.cursorText}></span>
      </div>
      <div 
        ref={primaryRef} 
        className={styles.primaryCursor} 
      />
    </>
  );
}
