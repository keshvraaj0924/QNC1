'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import OverlayMenu from '../OverlayMenu/OverlayMenu';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useSiteLogo } from '@/hooks/useSiteLogo';
import { usePathname } from 'next/navigation';
import { Sun, Moon } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '/en' || pathname === '/ar' || pathname === '/en/' || pathname === '/ar/';
  
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const logoSrc = useSiteLogo();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClass = `${styles.header} ${scrolled || isHome ? styles.scrolled : ''} ${isHome ? styles.homeHeader : ''}`;



  return (
    <>
      <header className={headerClass}>
        <div className={styles.container}>
          <div className={styles.logo} data-cursor="hover">
            <Link href="/">
              <img src={logoSrc} alt="Qudrat National Company" className={styles.logoImage} />
            </Link>
          </div>

          <div className={styles.actions}>
            <button 
              className={styles.langBtn} 
              onClick={toggleLanguage}
              data-cursor="hover"
            >
              <span 
                className={styles.langText}
                style={{ 
                  fontFamily: language === 'en' ? 'var(--font-cairo)' : 'var(--font-inter)' 
                }}
              >
                {language === 'en' ? 'عربي' : 'EN'}
              </span>
            </button>

            <button 
              className={styles.themeBtn} 
              onClick={toggleTheme}
              data-cursor="hover"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button className={styles.menuBtn} onClick={() => setMenuOpen(true)} data-cursor="hover" data-cursor-text={t('btn_menu')}>
              <svg width="28" height="12" viewBox="0 0 28 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="28" height="1.5" fill="currentColor"/>
                <rect x={language === 'ar' ? '8' : '0'} y="10.5" width="20" height="1.5" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      {/* Fullscreen Navigation Menu */}
      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
