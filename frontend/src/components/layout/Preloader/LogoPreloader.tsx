'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './LogoPreloader.module.css';

const LogoPreloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Lock scroll when preloader is active
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Backup timer in case video fails to fire onEnded (e.g. browser policy)
    const backupTimer = setTimeout(() => {
      handleTransition();
    }, 6000); // Most logo animations are 3-5s

    return () => {
      document.body.style.overflow = '';
      clearTimeout(backupTimer);
    };
  }, [isVisible]);

  const handleTransition = () => {
    if (!isFading) {
      setIsFading(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 1000); // Match CSS transition duration
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
        onEnded={handleTransition}
        className={styles.video}
        aria-hidden="true"
      >
        <source src="/videos/Branding_Logo_Animation_processed.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default LogoPreloader;
