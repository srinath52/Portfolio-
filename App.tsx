import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import Hero from './components/Hero';
import SocialDock from './components/SocialDock';
import SkillsMarquee from './components/SkillsMarquee';
import ProjectTimeline from './components/ProjectTimeline';
import EducationContact from './components/EducationContact';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import FluidBackground from './components/FluidBackground';
import ScrollProgress from './components/ScrollProgress';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true); // Default to dark mode
  const [animationState, setAnimationState] = useState<'idle' | 'collapsing' | 'rebuilding'>('idle');

  // Handle Dark Mode
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Handle Time Reverse / System Reboot Effect
  const handleTimeReverse = () => {
    if (animationState !== 'idle') return;

    // 1. Trigger Collapse Animation & CSS Effects
    setAnimationState('collapsing');
    document.body.classList.add('time-reverse'); // Activates the invert/shake CSS defined in index.html

    // 2. Wait for collapse to complete, then scroll to top and rebuild
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      setAnimationState('rebuilding');
      document.body.classList.remove('time-reverse'); // Remove CSS effect for clean rebuild
    }, 1000); // Duration of collapse

    // 3. Reset to idle after rebuild
    setTimeout(() => {
      setAnimationState('idle');
    }, 2500); // Allow time for rebuild animation
  };

  const mainVariants: Variants = {
    idle: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      filter: "blur(0px) hue-rotate(0deg)",
      transition: { duration: 0.5 },
      transitionEnd: { transform: "none" } // CRITICAL: Resets transform so 'fixed' children (SocialDock) position correctly relative to viewport
    },
    collapsing: { 
      opacity: 0, 
      scale: 0.05, // Complete implosion
      rotate: -180, // Spin backwards
      filter: "blur(20px) hue-rotate(180deg)", // Distortion matching the invert effect
      transition: { duration: 1.0, ease: [0.7, 0, 0.84, 0] as [number, number, number, number] }
    },
    rebuilding: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      filter: "blur(0px) hue-rotate(0deg)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } // Smooth expansion
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onLoadingComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.main 
          key="main-content"
          variants={mainVariants}
          initial="idle"
          animate={animationState}
          className="min-h-screen bg-day dark:bg-void text-gray-900 dark:text-white selection:bg-accent-day dark:selection:bg-neon-gold selection:text-white dark:selection:text-black md:cursor-none relative overflow-hidden theme-transition origin-center"
        >
          {/* Interactive Fluid Background */}
          <FluidBackground />
          <ScrollProgress />
          <CustomCursor />
          
          <div className="relative z-10">
            <Hero />
            <SkillsMarquee />
            <ProjectTimeline />
            <EducationContact onScrollTop={handleTimeReverse} />
            <SocialDock />
          </div>
        </motion.main>
      )}
    </>
  );
};

export default App;