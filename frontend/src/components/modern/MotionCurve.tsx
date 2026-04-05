'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface MotionCurveProps {
  d: string;
  width?: string;
  height?: string;
  viewBox?: string;
  duration?: number;
  delay?: number;
  className?: string;
  strokeWidth?: number;
  opacity?: number;
  useGradient?: boolean;
}

export default function MotionCurve({
  d,
  width = "100%",
  height = "auto",
  viewBox = "0 0 400 200",
  duration = 2,
  delay = 0.5,
  className = "",
  strokeWidth = 2,
  opacity = 0.3,
  useGradient = true,
}: MotionCurveProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div 
      className={className} 
      style={{ 
        width, 
        height, 
        pointerEvents: 'none', 
        position: 'relative',
        zIndex: 1
      }}
    >
      <svg
        viewBox={viewBox}
        fill="none"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        {useGradient && (
          <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1A75BB" />
              <stop offset="50%" stopColor="#3F8E43" />
              <stop offset="100%" stopColor="#CBA152" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        )}
        
        <motion.path
          ref={ref}
          d={d}
          stroke={useGradient ? "url(#curveGradient)" : "var(--qnc-gold)"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          filter={useGradient ? "url(#glow)" : "none"}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity } : {}}
          transition={{ duration, delay, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
