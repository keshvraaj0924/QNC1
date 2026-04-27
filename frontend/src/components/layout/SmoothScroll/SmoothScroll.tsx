'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Reduced from 1.8 for a snappier, more responsive feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0, 
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      // Save scroll position for Home page
      if (window.location.pathname === '/') {
        sessionStorage.setItem('qnc_last_scroll', e.scroll.toString());
      }
    });

    // Handle initial scroll restoration and top-scroll
    const handleInitialScroll = () => {
      if (window.location.pathname === '/') {
        const savedScroll = sessionStorage.getItem('qnc_last_scroll');
        if (savedScroll) {
          lenis.scrollTo(parseInt(savedScroll), { immediate: true });
        }
      } else {
        lenis.scrollTo(0, { immediate: true });
      }
    };

    // Run on mount
    setTimeout(handleInitialScroll, 100);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return <>{children}</>;
}
