import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import HackerText from './HackerText';

const Hero: React.FC = () => {
  const [imgSrc, setImgSrc] = useState("https://lh3.googleusercontent.com/d/1J3mIINjzKX2Eb7AaxlStPM76sWIr35Ny=s1000");
  const fallbackSrc = "https://avatars.githubusercontent.com/srinath52";

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-20 theme-transition">
      
      {/* Background Grid Animation */}
      <div className="absolute inset-0 z-0 bg-grid-pattern-light dark:bg-grid-pattern bg-[size:40px_40px] opacity-[0.1] dark:opacity-[0.05]" />
      
      <SectionWrapper className="z-10 flex flex-col items-center text-center px-4 w-full">
        
        {/* Profile Image Container */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 mb-10 flex items-center justify-center group">
          
          {/* Rotating Rings */}
          <div className="absolute inset-0 rounded-full border border-neon-cyan/30 animate-spin-slow" />
          <div className="absolute -inset-2 rounded-full border border-neon-purple/20 animate-spin-slow shadow-[0_0_15px_rgba(189,0,255,0.1)]" style={{ animationDirection: 'reverse' }} />
          
          {/* Image Container */}
          <motion.div 
            className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-gray-200 dark:border-white/10 relative z-10 bg-gray-100 dark:bg-zinc-900"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
             <img 
               src={imgSrc}
               onError={() => setImgSrc(fallbackSrc)}
               alt="Mohanasrinath K" 
               className="w-full h-full object-cover"
               loading="eager"
               referrerPolicy="no-referrer"
             />
          </motion.div>
          
        </div>

        {/* Text Content with Hacker Effect */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-6 relative z-10 font-mono">
          <HackerText 
            text="MOHANASRINATH K" 
            className="bg-clip-text text-transparent bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-100 dark:to-gray-500 drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] cursor-default"
          />
        </h1>

        <div className="h-px w-32 bg-gradient-to-r from-neon-cyan via-accent-day dark:via-neon-gold to-neon-purple my-6" />

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-base sm:text-lg md:text-2xl text-gray-700 dark:text-gray-300 font-mono tracking-wide max-w-3xl px-2"
        >
          <span className="text-neon-cyan">&lt;</span> Prompt Engineer <span className="text-accent-day dark:text-neon-gold px-2">+</span> UI/UX Designer <span className="text-neon-cyan">/&gt;</span>
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-6 text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed border border-gray-200 dark:border-white/5 p-4 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm shadow-sm dark:shadow-none"
        >
          Specializing in deploying LLMs, Stable Diffusion, and creating user-centered AI solutions. 
          Innovating at the intersection of Design and Artificial Intelligence.
        </motion.p>

      </SectionWrapper>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-xs font-mono tracking-[0.2em] uppercase text-accent-day dark:text-neon-gold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-accent-day dark:via-neon-gold to-transparent" />
      </motion.div>

    </section>
  );
};

export default Hero;