'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  cmsMode: boolean;
  toggleCmsMode: () => void;
  siteLogo: string;
}

const FALLBACK_LOGO = '/assets/images/FinalQNCLogo.svg';

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [cmsMode, setCmsMode] = useState<boolean>(false);
  const [siteLogo, setSiteLogo] = useState<string>(FALLBACK_LOGO);

  // Initialize from localStorage and fetch logo once
  useEffect(() => {
    const saved = localStorage.getItem('qnc_cms_mode');
    if (saved !== null) {
      setCmsMode(saved === 'true');
    }

    const fetchLogo = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      try {
        const res = await fetch(`${baseUrl}/api/v1/public/content`);
        if (!res.ok) return;
        const data = await res.json();
        const cmsLogo = data?.settings?.logo || data?.site?.logo;
        if (cmsLogo && cmsLogo.trim() !== '') {
          setSiteLogo(cmsLogo.startsWith('http') ? cmsLogo : `${baseUrl}${cmsLogo}`);
        }
      } catch (err) {
        // Fallback to static asset
      }
    };
    fetchLogo();
  }, []);

  const toggleCmsMode = () => {
    const newState = !cmsMode;
    setCmsMode(newState);
    localStorage.setItem('qnc_cms_mode', String(newState));
  };

  return (
    <SettingsContext.Provider value={{ cmsMode, toggleCmsMode, siteLogo }}>
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
