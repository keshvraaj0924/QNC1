'use client';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import Hero from '@/components/sections/Hero/Hero';
import About from '@/components/sections/About/About';
import NationalVision from '@/components/sections/NationalVision/NationalVision';
import Capabilities from '@/components/sections/Capabilities/Capabilities';
import RegionalPresence from '@/components/sections/ProjectLocations/RegionalPresence';
import MajorClients from '@/components/sections/MajorClients/MajorClients';
import MissionVision from '@/components/sections/MissionVision/MissionVision';
import Alef360 from '@/components/sections/Alef360/Alef360';
import Stats from '@/components/sections/Stats/Stats';
import DomeGallery from '@/components/modern/DomeGallery';
import ScrollReveal from '@/components/modern/ScrollReveal';
import MotionCurve from '@/components/modern/MotionCurve';
import BlurText from '@/components/modern/BlurText';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

export default function HomeContent({ content }: { content: any }) {
  const { t } = useLanguage();
  const home = content?.home || {};
  const about = content?.about || {};
  const clients = content?.clients || [];

  return (
    <main className={styles.main}>
      <Header />
      
      <div className={styles.stickyHero}>
        <Hero content={home.hero} />
      </div>

      <div className={styles.revealContent}>
        <Stats />
        
        <ScrollReveal delay={0.2}>
          <About content={about} />
        </ScrollReveal>

        <MissionVision content={home.mission_vision} />

        <div className={styles.globalThread}>
          <MotionCurve 
            d="M0 100 C 150 0, 250 200, 400 100" 
            width="100%" 
            height="200px" 
            viewBox="0 0 400 200"
            opacity={0.1}
            delay={0.5}
            duration={3}
          />
        </div>

        <ScrollReveal delay={0.3}>
          <NationalVision content={home.vision} />
        </ScrollReveal>

        <Capabilities content={content?.services} />

        <div className={styles.globalThread}>
          <MotionCurve 
            d="M400 100 C 250 200, 150 0, 0 100" 
            width="100%" 
            height="200px" 
            viewBox="0 0 400 200"
            opacity={0.1}
            delay={0.5}
            duration={3}
          />
        </div>

        <RegionalPresence />

        <section className={styles.domeSection}>
          <ScrollReveal delay={0.2}>
            <div className={styles.domeHeader}>
              <div className="preHeader" style={{ justifyContent: 'center' }}>
                <span>{t('dome_label')}</span>
              </div>
              <h2 className={styles.domeTitle}>
                <BlurText 
                  text={t('dome_title')}
                  delay={50}
                  animateBy="words"
                  direction="top"
                />
              </h2>
              <p className={styles.domeDesc}>{t('dome_description')}</p>
            </div>
          </ScrollReveal>
          
          <DomeGallery 
            images={[
              '/Dome/C0437T01.JPG',
              '/Dome/C0440T01.JPG',
              '/Dome/C0442T01.JPG',
              '/Dome/C0443T01.JPG',
              '/Dome/C0448T01.JPG',
              '/Dome/C0450T01.JPG',
              '/Dome/C0451T01.JPG',
              '/Dome/C0458T01.JPG',
              '/Dome/C0462T01.JPG',
              '/Dome/C0463T01.JPG',
              '/Dome/C0467T01.JPG',
              '/Dome/C0471T01.JPG',
              '/Dome/C0476T01.JPG',
              '/Dome/C0482T01.JPG',
              '/Dome/C0484T01.JPG',
              '/Dome/DSC03873.JPG',
              '/Dome/DSC03880.JPG',
              '/Dome/DSC03882.JPG',
              '/Dome/DSC03886.JPG'
            ]} 
          />
        </section>

        <Alef360 />
        
        <ScrollReveal delay={0.3}>
          <MajorClients content={clients} />
        </ScrollReveal>
      </div>

      <Footer />
    </main>
  );
}
