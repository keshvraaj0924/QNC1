'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function BackgroundBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Dynamic Animated Beams */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: '1px',
            height: '100vh',
            background: 'linear-gradient(to bottom, transparent, rgba(203, 161, 82, 0.1), transparent)',
            left: `${15 + i * 15}%`,
            top: '-50%',
            rotate: '15deg',
          }}
          animate={{
            y: ['0%', '100%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.5,
          }}
        />
      ))}
      
      {/* Ambient Glows */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(203, 161, 82, 0.03) 0%, transparent 70%)',
          top: '10%',
          left: '-20%',
          filter: 'blur(80px)',
        }}
      />
      <div 
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(203, 161, 82, 0.02) 0%, transparent 60%)',
          bottom: '20%',
          right: '-10%',
          filter: 'blur(100px)',
        }}
      />
    </div>
  );
}
