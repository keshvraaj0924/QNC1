'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './LogoPreloader.module.css';

const LogoPreloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if preloader has already run in this session
    const hasRun = sessionStorage.getItem('qnc_preloader_run');
    if (hasRun === 'true') {
      setIsVisible(false);
      return;
    }

    // Lock scroll when preloader is active
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      // Explicitly try to play the video to bypass some browser autoPlay quirks
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // If play fails (e.g. strict policy), the backup timer will handle it
        });
      }
    } else {
      document.body.style.overflow = '';
      sessionStorage.setItem('qnc_preloader_run', 'true');
    }

    // Backup timer in case video fails to fire onEnded or hangs
    // Increased to 20s to prioritize full playback as requested by user
    const backupTimer = setTimeout(() => {
      handleTransition();
    }, 20000); 

    return () => {
      document.body.style.overflow = '';
      clearTimeout(backupTimer);
    };
  }, [isVisible]);

  const handleTransition = () => {
    if (!isFading && isVisible) {
      setIsFading(true);
      document.body.style.overflow = '';
      setTimeout(() => {
        setIsVisible(false);
      }, 800); 
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`${styles.preloader} ${isFading ? styles.fadeOut : ''}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleTransition}
        onError={handleTransition} 
        className={styles.video}
        aria-hidden="true"
      >
        <source src="/videos/Branding_Logo_Animation_processed.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default LogoPreloader;
