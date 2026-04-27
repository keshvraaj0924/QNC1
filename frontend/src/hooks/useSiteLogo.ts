'use client';

import { useSettings } from '@/context/SettingsContext';

const FALLBACK_LOGO = '/assets/images/FinalQNCLogo.svg';

/**
 * Returns the site logo URL — respects the globally fetched logo from SettingsContext.
 */
export function useSiteLogo(): string {
  const { siteLogo } = useSettings();
  return siteLogo || FALLBACK_LOGO;
}
