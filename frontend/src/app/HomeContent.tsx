'use client';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import Hero from '@/components/sections/Hero/Hero';
import About from '@/components/sections/About/About';
import NationalVision from '@/components/sections/NationalVision/NationalVision';
import Capabilities from '@/components/sections/Capabilities/Capabilities';
import IntelligentEcosystem from '@/components/sections/IntelligentEcosystem/IntelligentEcosystem';
import PartnersGroup from '@/components/sections/PartnersGroup/PartnersGroup';
import RegionalPresence from '@/components/sections/ProjectLocations/RegionalPresence';
import MajorClients from '@/components/sections/MajorClients/MajorClients';
import MissionVision from '@/components/sections/MissionVision/MissionVision';
import Alef360 from '@/components/sections/Alef360/Alef360';
import Stats from '@/components/sections/Stats/Stats';
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

        <ScrollReveal delay={0.2}>
          <IntelligentEcosystem />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <PartnersGroup />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Alef360 />
        </ScrollReveal>
        
        <ScrollReveal delay={0.3}>
          <MajorClients content={clients} />
        </ScrollReveal>
      </div>

      <Footer />
    </main>
  );
}
