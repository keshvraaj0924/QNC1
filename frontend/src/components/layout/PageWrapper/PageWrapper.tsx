'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const pageVariants: any = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.05
    } 
  },
  exit: { 
    opacity: 0, 
    y: -15, 
    transition: { duration: 0.3, ease: 'easeInOut' } 
  }
};

export default function PageWrapper({ children, className = '', noPadding = false }: { children: ReactNode, className?: string, noPadding?: boolean }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      className={className}
      style={{ paddingTop: noPadding ? 0 : 'var(--header-clearance)' }}
    >
      {children}
    </motion.div>
  );
}
