'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const pageVariants: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1.2, 
      ease: [0.76, 0, 0.24, 1],
      staggerChildren: 0.1,
      when: "beforeChildren"
    } 
  },
  exit: { 
    opacity: 0, 
    y: -40, 
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
  }
};

export default function PageWrapper({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      className={className}
      style={{ paddingTop: 'var(--header-clearance)' }}
    >
      {children}
    </motion.div>
  );
}
