'use client';

import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const SmoothScroll = dynamic(() => import('./SmoothScroll/SmoothScroll'), { ssr: false });
const ModernCursor = dynamic(() => import('./ModernCursor/ModernCursor'), { ssr: false });

export default function ClientWrappers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Scroll logic moved to SmoothScroll component for Lenis integration

  return (
    <SmoothScroll>
      <ModernCursor />
      {children}
    </SmoothScroll>
  );
}
