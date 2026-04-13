'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  cmsMode: boolean;
  toggleCmsMode: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [cmsMode, setCmsMode] = useState<boolean>(false);

  // Initialize from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('qnc_cms_mode');
    if (saved !== null) {
      setCmsMode(saved === 'true');
    }
  }, []);

  const toggleCmsMode = () => {
    const newState = !cmsMode;
    setCmsMode(newState);
    localStorage.setItem('qnc_cms_mode', String(newState));
  };

  return (
    <SettingsContext.Provider value={{ cmsMode, toggleCmsMode }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
