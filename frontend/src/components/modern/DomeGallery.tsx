'use client';

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import styles from './DomeGallery.module.css';
import { useLanguage } from '@/context/LanguageContext';

interface ImageObject {
  src: string;
  alt?: string;
  title?: string;
  description?: string;
}

interface DomeGalleryProps {
  images?: (string | ImageObject)[];
  fit?: number;
  minRadius?: number;
  maxRadius?: number;
  segments?: number;
  grayscale?: boolean;
  openedImageWidth?: string;
  openedImageHeight?: string;
}

export default function DomeGallery({
  images = [],
  minRadius = 600,
  grayscale = true,
  openedImageWidth = '600px',
  openedImageHeight = '600px'
}: DomeGalleryProps) {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mouse/Touch tracking for rotation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const processedImages = useMemo(() => {
    return images.map(img => typeof img === 'string' ? { src: img } : img);
  }, [images]);

  // Calculate 3D positions for a dome (hemisphere)
  const items = useMemo(() => {
    const radius = minRadius;
    const count = processedImages.length;
    
    return processedImages.map((img, i) => {
      // Golden spiral distribution on a hemisphere
      const offset = 1 / count;
      const phi = Math.acos(1 - (i + 0.5) * offset);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      // Rotation to face the center
      const rotY = (theta * 180) / Math.PI + 90;
      const rotX = (phi * 180) / Math.PI - 90;

      return {
        ...img,
        x: Number(x.toFixed(3)),
        y: Number(y.toFixed(3)),
        z: Number(z.toFixed(3)),
        rotX: Number(rotX.toFixed(3)),
        rotY: Number(rotY.toFixed(3))
      };
    });
  }, [processedImages, minRadius]);

  const handleDrag = (_: any, info: any) => {
    mouseX.set(mouseX.get() + info.delta.x * 0.15);
    mouseY.set(mouseY.get() - info.delta.y * 0.15);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.instruction}>
        {selectedImage ? '' : t('dome_instruction')}
      </div>

      <motion.div 
        className={styles.scene}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
        onDrag={handleDrag}
      >
        <motion.div 
          className={styles.dome}
          style={{
            rotateY: springX,
            rotateX: springY,
            transformStyle: 'preserve-3d'
          }}
        >
          {mounted && items.map((item, i) => (
            <motion.div
              key={i}
              className={`${styles.item} ${grayscale ? styles.grayscale : ''}`}
              style={{
                x: item.x,
                y: item.y,
                z: item.z,
                rotateY: item.rotY,
                rotateX: item.rotX,
                transformStyle: 'preserve-3d'
              }}
              whileHover={{ scale: 1.1, z: item.z + 40 }}
              onClick={() => {
                if (!isDragging) setSelectedImage(item.src);
              }}
            >
              <img src={item.src} alt={item.alt || 'Gallery image'} className={styles.image} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Atmospheric lighting */}
      <div className={styles.vignette} />
      <div className={styles.glow} />

      {/* Selected Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className={styles.modal}
              initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 20 }}
              style={{ width: openedImageWidth, height: openedImageHeight }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage} alt="Selected" className={styles.modalImage} />
              <button className={styles.closeBtn} onClick={() => setSelectedImage(null)}>✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
