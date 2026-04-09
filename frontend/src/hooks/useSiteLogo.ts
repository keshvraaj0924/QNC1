'use client';

import { useEffect, useState } from 'react';

const FALLBACK_LOGO = '/assets/images/QLogoSymbol/QNCLogoBg removed.png';

/**
 * Returns the site logo URL — from CMS if set, otherwise falls back to the
 * static SVG asset. This means any component using this hook automatically
 * respects the CMS-configured logo without any hardcoded paths.
 */
export function useSiteLogo(): string {
  const [logo, setLogo] = useState<string>(FALLBACK_LOGO);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/v1/public/content', {
          next: { revalidate: 60 }
        } as RequestInit);
        if (!res.ok) return;
        const data = await res.json();
        // Check both site.logo and settings.logo for flexibility
        const cmsLogo = data?.settings?.logo || data?.site?.logo;
        if (cmsLogo && cmsLogo.trim() !== '') {
          setLogo(cmsLogo.startsWith('http') ? cmsLogo : `http://localhost:4000${cmsLogo}`);
        }
      } catch {
        // silently fall back to static SVG
      }
    };
    fetchLogo();
  }, []);

  return logo;
}
