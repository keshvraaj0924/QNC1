'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface BlurRevealProps {
  children: string;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function BlurReveal({ 
  children, 
  delay = 0, 
  duration = 0.8, 
  className = "" 
}: BlurRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const words = children.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.05, 
        delayChildren: delay 
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
  };

  const charVariants = {
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
       transition: {
        duration: duration,
        ease: [0.22, 1, 0.36, 1]
      } as const,
    },
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
    },
  };

  return (
    <motion.div
      ref={ref}
      style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        justifyContent: "inherit", 
        gap: "0.2em 0.25em",
        direction: "inherit"
      }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          variants={wordVariants}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={charVariants}
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.div>
  );
}
