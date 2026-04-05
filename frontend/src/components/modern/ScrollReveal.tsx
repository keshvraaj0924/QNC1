'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 50,
  duration = 0.8,
  className = '',
  once = true,
}: ScrollRevealProps) {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        filter: 'blur(10px)',
        ...directions[direction]
      }}
      whileInView={{ 
        opacity: 1, 
        filter: 'blur(0px)',
        x: 0, 
        y: 0 
      }}
      viewport={{ once }}
      transition={{
        duration,
        delay,
        ease: [0.21, 1.11, 0.81, 0.99], // Custom premium cubic-bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
